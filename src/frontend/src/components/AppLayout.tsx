import { type ReactNode } from 'react';
import PrimaryNav from './PrimaryNav';
import AuthButton from './AuthButton';
import { Heart } from 'lucide-react';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border bg-card">
        <div className="relative h-32 md:h-40 overflow-hidden">
          <img
            src="/assets/generated/nmcbc-banner.dim_1600x600.png"
            alt="Church banner"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/80" />
        </div>
        
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <img
                src="/assets/generated/nmcbc-logo.dim_512x512.png"
                alt="New Mount Carmel Baptist Church"
                className="h-12 w-12 md:h-16 md:w-16"
              />
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-foreground">
                  New Mount Carmel Baptist Church
                </h1>
                <p className="text-sm text-muted-foreground hidden md:block">
                  Live Worship & Community
                </p>
              </div>
            </div>
            <AuthButton />
          </div>
          
          <PrimaryNav />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="border-t border-border bg-card mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2026 New Mount Carmel Baptist Church. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Built with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using{' '}
              <a
                href="https://caffeine.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
