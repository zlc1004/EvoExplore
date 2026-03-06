import { ClerkProvider, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import "../styles/globals.css";

export const metadata = {
  title: "EvoExplore - Evolution RPG",
  description: "An evolution-based multiplayer RPG game",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <header style={{
            position: 'fixed',
            top: 0,
            right: 0,
            zIndex: 9999,
            padding: '1rem',
            display: 'flex',
            gap: '0.5rem',
            background: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '0 0 0 8px'
          }}>
            <SignedOut>
              <SignInButton mode="modal">
                <button style={{
                  padding: '0.5rem 1rem',
                  background: '#00AAFF',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}>
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button style={{
                  padding: '0.5rem 1rem',
                  background: '#00FF88',
                  color: 'black',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}>
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </header>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
