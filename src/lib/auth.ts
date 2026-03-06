/**
 * Clerk Authentication Utilities
 */

import { auth, currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Get the current user's ID from Clerk
 */
export async function getCurrentUserId(): Promise<string | null> {
  const { userId } = await auth();
  return userId;
}

/**
 * Get the current user's full profile from Clerk
 */
export async function getCurrentUserProfile() {
  const user = await currentUser();
  
  if (!user) {
    return null;
  }
  
  return {
    id: user.id,
    username: user.username || user.firstName || 'Player',
    email: user.emailAddresses[0]?.emailAddress || '',
    firstName: user.firstName,
    lastName: user.lastName,
    imageUrl: user.imageUrl
  };
}

/**
 * Middleware wrapper to protect API routes
 */
export async function requireAuth(
  handler: (req: NextRequest, userId: string) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return handler(req, userId);
  };
}

/**
 * Check if user is authenticated (for use in components)
 */
export async function isAuthenticated(): Promise<boolean> {
  const { userId } = await auth();
  return !!userId;
}
