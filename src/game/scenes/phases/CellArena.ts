/**
 * Cell Arena Scene - Phase 1 (Level 1-10)
 * Wave-based arena where the player fights as a cell
 */

import { Scene } from 'phaser';
import { Player, Mob, GamePhase } from '@/game/types';
import { GAME_CONFIG, PLAYER_CONFIG } from '@/game/config';

export class CellArena extends Scene {
  private player?: Phaser.GameObjects.Container;
  private playerData?: Partial<Player>;
  
  private mobs: Phaser.GameObjects.Container[] = [];
  private wave: number = 1;
  private waveText?: Phaser.GameObjects.Text;
  private levelText?: Phaser.GameObjects.Text;
  
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasdKeys?: any;
  
  private healthBar?: Phaser.GameObjects.Graphics;
  private xpBar?: Phaser.GameObjects.Graphics;

  constructor() {
    super('CellArena');
  }

  create() {
    // Create the arena background (microscope slide)
    this.createArena();
    
    // Create player
    this.createPlayer();
    
    // Setup input
    this.setupInput();
    
    // Create UI
    this.createUI();
    
    // Start first wave
    this.startWave(1);
    
    // Setup camera
    this.cameras.main.setBounds(0, 0, 1920, 1080);
    if (this.player) {
      this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    }
  }

  private createArena(): void {
    // Gray/white blurry background
    const bg = this.add.rectangle(960, 540, 1920, 1080, 0xF0F0F0);
    
    // The arena is a sharp white circle (the petri dish)
    const arena = this.add.circle(960, 540, 400, 0xFFFFFF);
    arena.setStrokeStyle(4, 0xCCCCCC);
    
    // Add some subtle grid lines
    const graphics = this.add.graphics();
    graphics.lineStyle(1, 0xDDDDDD, 0.3);
    
    for (let i = 0; i < 10; i++) {
      const x = 560 + (i * 80);
      graphics.lineBetween(x, 140, x, 940);
    }
    
    for (let i = 0; i < 10; i++) {
      const y = 140 + (i * 80);
      graphics.lineBetween(560, y, 1360, y);
    }
    
    // Add title text
    const titleText = this.add.text(960, 100, 'THE MICRO-ARENA', {
      fontFamily: 'Arial',
      fontSize: '32px',
      color: '#666666'
    }).setOrigin(0.5);
  }

  private createPlayer(): void {
    // Initialize player data
    this.playerData = {
      x: 960,
      y: 540,
      level: 1,
      experience: 0,
      health: PLAYER_CONFIG.startingHealth,
      maxHealth: PLAYER_CONFIG.startingHealth,
      rpm: PLAYER_CONFIG.startingRPM,
      phase: GamePhase.CELL_ARENA
    };
    
    // Create player container
    this.player = this.add.container(this.playerData.x, this.playerData.y);
    
    // Core (cell body)
    const core = this.add.circle(0, 0, 20, 0x00FF88);
    core.setStrokeStyle(2, 0x00AA55);
    
    // Add a simple organelle visual
    const nucleus = this.add.circle(0, 0, 8, 0x005533);
    
    this.player.add([core, nucleus]);
    
    // Add physics
    this.physics.add.existing(this.player);
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    body.setCollideWorldBounds(true);
    body.setCircle(20);
  }

  private setupInput(): void {
    // Cursor keys
    this.cursors = this.input.keyboard?.createCursorKeys();
    
    // WASD keys
    this.wasdKeys = this.input.keyboard?.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    });
  }

  private createUI(): void {
    // Wave indicator
    this.waveText = this.add.text(20, 20, `Wave: ${this.wave}`, {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#333333'
    }).setScrollFactor(0);
    
    // Level indicator
    this.levelText = this.add.text(20, 60, `Level: ${this.playerData?.level || 1}`, {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#333333'
    }).setScrollFactor(0);
    
    // Health bar
    this.healthBar = this.add.graphics().setScrollFactor(0);
    this.updateHealthBar();
    
    // XP bar
    this.xpBar = this.add.graphics().setScrollFactor(0);
    this.updateXPBar();
  }

  private updateHealthBar(): void {
    if (!this.healthBar || !this.playerData) return;
    
    this.healthBar.clear();
    
    const barWidth = 200;
    const barHeight = 20;
    const x = 20;
    const y = 100;
    
    const healthPercent = this.playerData.health! / this.playerData.maxHealth!;
    
    // Background
    this.healthBar.fillStyle(0x660000);
    this.healthBar.fillRect(x, y, barWidth, barHeight);
    
    // Health
    this.healthBar.fillStyle(0xFF0000);
    this.healthBar.fillRect(x, y, barWidth * healthPercent, barHeight);
    
    // Border
    this.healthBar.lineStyle(2, 0x000000);
    this.healthBar.strokeRect(x, y, barWidth, barHeight);
  }

  private updateXPBar(): void {
    if (!this.xpBar || !this.playerData) return;
    
    this.xpBar.clear();
    
    const barWidth = 200;
    const barHeight = 10;
    const x = 20;
    const y = 130;
    
    // For now, just show a simple progress bar
    // TODO: Calculate actual XP percentage based on level curve
    const xpPercent = 0.5; // Placeholder
    
    // Background
    this.xpBar.fillStyle(0x333333);
    this.xpBar.fillRect(x, y, barWidth, barHeight);
    
    // XP
    this.xpBar.fillStyle(0x00FF00);
    this.xpBar.fillRect(x, y, barWidth * xpPercent, barHeight);
    
    // Border
    this.xpBar.lineStyle(1, 0x000000);
    this.xpBar.strokeRect(x, y, barWidth, barHeight);
  }

  private startWave(waveNumber: number): void {
    this.wave = waveNumber;
    
    if (this.waveText) {
      this.waveText.setText(`Wave: ${this.wave}`);
    }
    
    // Spawn mobs based on wave
    const mobCount = Math.min(5 + (waveNumber * 2), 20);
    
    for (let i = 0; i < mobCount; i++) {
      this.spawnMob();
    }
    
    // Wave announcement
    const announcement = this.add.text(960, 300, `Wave ${waveNumber}`, {
      fontFamily: 'Arial',
      fontSize: '48px',
      color: '#FF0000'
    }).setOrigin(0.5).setScrollFactor(0);
    
    this.tweens.add({
      targets: announcement,
      alpha: 0,
      y: 250,
      duration: 2000,
      onComplete: () => announcement.destroy()
    });
  }

  private spawnMob(): void {
    // Random position around the edge of the arena
    const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
    const distance = 350;
    const x = 960 + Math.cos(angle) * distance;
    const y = 540 + Math.sin(angle) * distance;
    
    // Create mob container
    const mob = this.add.container(x, y);
    
    // Simple cell visual
    const size = Phaser.Math.Between(10, 20);
    const color = Phaser.Math.Between(0xFF0000, 0xFFFFFF);
    const body = this.add.circle(0, 0, size, color);
    body.setStrokeStyle(2, 0x666666);
    
    mob.add(body);
    
    // Add physics
    this.physics.add.existing(mob);
    const mobBody = mob.body as Phaser.Physics.Arcade.Body;
    mobBody.setCircle(size);
    
    this.mobs.push(mob);
    
    // Simple AI: move slowly toward player
    this.time.addEvent({
      delay: 100,
      loop: true,
      callback: () => {
        if (!this.player || !mob.active) return;
        
        const dx = this.player.x - mob.x;
        const dy = this.player.y - mob.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
          const speed = 30;
          mobBody.setVelocity(
            (dx / distance) * speed,
            (dy / distance) * speed
          );
        }
      }
    });
  }

  update(time: number, delta: number): void {
    if (!this.player || !this.playerData) return;
    
    // Player movement
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    const speed = PLAYER_CONFIG.baseSpeed;
    
    let velocityX = 0;
    let velocityY = 0;
    
    if (this.cursors?.left.isDown || this.wasdKeys?.left.isDown) {
      velocityX = -speed;
    } else if (this.cursors?.right.isDown || this.wasdKeys?.right.isDown) {
      velocityX = speed;
    }
    
    if (this.cursors?.up.isDown || this.wasdKeys?.up.isDown) {
      velocityY = -speed;
    } else if (this.cursors?.down.isDown || this.wasdKeys?.down.isDown) {
      velocityY = speed;
    }
    
    body.setVelocity(velocityX, velocityY);
    
    // Check if wave complete
    const aliveMobs = this.mobs.filter(mob => mob.active);
    if (aliveMobs.length === 0 && this.wave < GAME_CONFIG.cellArenaMaxWave) {
      this.time.delayedCall(2000, () => {
        this.startWave(this.wave + 1);
      });
    }
    
    // Check level 10 transition
    if (this.playerData.level && this.playerData.level >= 10) {
      this.transitionToPhase2();
    }
  }

  private transitionToPhase2(): void {
    // Phase transition animation
    const overlay = this.add.rectangle(960, 540, 1920, 1080, 0x000000, 0);
    overlay.setScrollFactor(0);
    
    this.tweens.add({
      targets: overlay,
      alpha: 1,
      duration: 1000,
      onComplete: () => {
        this.scene.start('PhaseTransition', { nextPhase: GamePhase.OPEN_WORLD });
      }
    });
  }
}
