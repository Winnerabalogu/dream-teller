// src/app/layout.tsx
import type { Metadata } from 'next';
import { DreamProvider } from '@/context/DreamContext';
import Sidebar from '@/components/ui/Sidebar';
import CloudBackground from '@/components/layout/Cloudbackground';
import './globals.css';
import TopInsights from '@/components/TopInsights';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Dream Teller - Interpret Your Dreams',
  description: 'A mystical dream interpretation journal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <DreamProvider>
          <CloudBackground />
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 ml-20 lg:ml-64 relative z-10">
              {children}
              <TopInsights />
                <Toaster richColors position="top-right" />
            </main>
          </div>
        </DreamProvider>
      </body>
    </html>
  );
}