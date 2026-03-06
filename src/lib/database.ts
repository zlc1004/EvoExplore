/**
 * Database Models and Operations
 */

import { Db, Collection } from 'mongodb';
import { getDb } from './mongodb';
import { PlayerDocument, Achievement, GamePhase } from '@/game/types';

export class PlayerModel {
  private static collection: Collection<PlayerDocument> | null = null;

  private static async getCollection(): Promise<Collection<PlayerDocument>> {
    if (!this.collection) {
      const db = await getDb();
      this.collection = db.collection<PlayerDocument>('players');
      
      // Create indexes
      await this.collection.createIndex({ userId: 1 }, { unique: true });
      await this.collection.createIndex({ username: 1 });
      await this.collection.createIndex({ level: -1 });
    }
    return this.collection;
  }

  static async findByUserId(userId: string): Promise<PlayerDocument | null> {
    const collection = await this.getCollection();
    return await collection.findOne({ userId });
  }

  static async createPlayer(userId: string, username: string): Promise<PlayerDocument> {
    const collection = await this.getCollection();
    
    const newPlayer: PlayerDocument = {
      userId,
      username,
      createdAt: new Date(),
      lastLogin: new Date(),
      
      level: 1,
      experience: 0,
      phase: GamePhase.CELL_ARENA,
      
      petals: [],
      inventory: [],
      coins: 0,
      
      talents: {
        reloadSpeed: 0,
        health: 0,
        damage: 0,
        medic: 0,
        secondChance: 0,
        slot: 0,
        reach: 0
      },
      
      unlockedAbilities: [],
      achievements: [],
      
      totalPlayTime: 0,
      totalKills: 0,
      totalDeaths: 0,
      bossesDefeated: []
    };

    await collection.insertOne(newPlayer as any);
    return newPlayer;
  }

  static async updatePlayer(userId: string, update: Partial<PlayerDocument>): Promise<void> {
    const collection = await this.getCollection();
    await collection.updateOne(
      { userId },
      { $set: { ...update, lastLogin: new Date() } }
    );
  }

  static async updateLastLogin(userId: string): Promise<void> {
    const collection = await this.getCollection();
    await collection.updateOne(
      { userId },
      { $set: { lastLogin: new Date() } }
    );
  }

  static async addAchievement(userId: string, achievementId: string): Promise<void> {
    const collection = await this.getCollection();
    const achievement: Achievement = {
      id: achievementId,
      unlockedAt: new Date()
    };
    
    await collection.updateOne(
      { userId },
      { $push: { achievements: achievement as any } }
    );
  }

  static async getLeaderboard(limit: number = 100): Promise<PlayerDocument[]> {
    const collection = await this.getCollection();
    return await collection
      .find()
      .sort({ level: -1, experience: -1 })
      .limit(limit)
      .toArray();
  }
}

export class GameStateModel {
  private static collection: Collection<any> | null = null;

  private static async getCollection(): Promise<Collection<any>> {
    if (!this.collection) {
      const db = await getDb();
      this.collection = db.collection('game_state');
    }
    return this.collection;
  }

  static async saveServerState(state: any): Promise<void> {
    const collection = await this.getCollection();
    await collection.updateOne(
      { _id: 'server_state' },
      { $set: { ...state, lastUpdate: new Date() } },
      { upsert: true }
    );
  }

  static async getServerState(): Promise<any> {
    const collection = await this.getCollection();
    return await collection.findOne({ _id: 'server_state' });
  }
}
