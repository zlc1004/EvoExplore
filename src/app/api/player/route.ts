/**
 * API Route: Player Profile
 * GET - Get player profile
 * POST - Create player profile
 */

import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { PlayerModel } from '@/lib/database';
import { getCurrentUserProfile } from '@/lib/auth';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const authResult = await auth();
    const userId = authResult?.userId;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const player = await PlayerModel.findByUserId(userId);
    
    if (!player) {
      return NextResponse.json(
        { error: 'Player not found' },
        { status: 404 }
      );
    }

    // Update last login
    await PlayerModel.updateLastLogin(userId);
    
    return NextResponse.json({ player });
  } catch (error) {
    console.error('Get player error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const authResult = await auth();
    const userId = authResult?.userId;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if player already exists
    const existing = await PlayerModel.findByUserId(userId);
    if (existing) {
      return NextResponse.json(
        { error: 'Player already exists' },
        { status: 409 }
      );
    }

    // Get username from Clerk profile or request body
    const userProfile = await getCurrentUserProfile();
    const body = await req.json();
    const username = body.username || userProfile?.username || 'Player';

    // Create new player
    const player = await PlayerModel.createPlayer(userId, username);
    
    return NextResponse.json({ player }, { status: 201 });
  } catch (error) {
    console.error('Create player error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
