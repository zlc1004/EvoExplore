'use client';

import { useRef, useEffect, useState } from 'react';
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import type { IRefPhaserGame } from '../PhaserGame';

// Dynamic import to avoid SSR issues with Phaser
const PhaserGame = dynamic(() => import('../PhaserGame').then(mod => ({ default: mod.PhaserGame })), {
  ssr: false,
  loading: () => (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      color: 'white',
      fontSize: '2rem'
    }}>
      Loading Game...
    </div>
  )
});

import dynamic from 'next/dynamic';

export default function Home() {
  const phaserRef = useRef<IRefPhaserGame | null>(null);
  const { isLoaded, user } = useUser();

  // Show loading while Clerk is initializing
  if (!isLoaded) {
    return (
      <main style={{ 
        width: '100vw', 
        height: '100vh', 
        margin: 0, 
        padding: 0,
        overflow: 'hidden',
        background: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ color: 'white', fontSize: '2rem' }}>Loading...</div>
      </main>
    );
  }

  return (
    <main style={{ 
      width: '100vw', 
      height: '100vh', 
      margin: 0, 
      padding: 0,
      overflow: 'hidden',
      background: '#000000'
    }}>
      <SignedOut>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          color: 'white',
          fontFamily: 'Arial, sans-serif',
          textAlign: 'center',
          gap: '2rem',
          padding: '2rem'
        }}>
          <h1 style={{ fontSize: '4rem', margin: 0, color: '#00FF88' }}>EvoExplore</h1>
          <p style={{ fontSize: '1.5rem', margin: 0, color: '#AAAAAA' }}>
            Evolution-Based Multiplayer RPG
          </p>
          <p style={{ fontSize: '1.2rem', margin: 0, maxWidth: '600px', lineHeight: '1.6' }}>
            Start as a cell in a petri dish and evolve through multiple phases.
            Fight mobs, collect petals, unlock abilities, and discover the truth.
          </p>
          <div style={{
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            marginTop: '2rem'
          }}>
            <p style={{ fontSize: '1rem', color: '#00AAFF', margin: 0 }}>
              👆 Sign in or sign up in the top right to start playing!
            </p>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <PhaserGame ref={phaserRef} />
      </SignedIn>
    </main>
  );
}
