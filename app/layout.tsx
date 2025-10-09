import type { Metadata } from 'next';
import Sidebar from '@/components/ui/Sidebar';
import CloudBackground from '@/components/layout/Cloudbackground';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import './globals.css';
import TopInsights from '@/components/TopInsights';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Dream Tale - Interpret Your Dreams',
  description: 'Explore your subconscious mind. Discover hidden patterns. Unlock personal insights.',
 icons: {
     icon: [{ url: "/favicon.ico" }, { url: "/favicon1.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta name="apple-mobile-web-app-title" content="Arterna" />
      <body>
        <CloudBackground />
        <div className="flex min-h-screen">
          <Sidebar />
          <LayoutWrapper>
            {children}
            <TopInsights />
            <Toaster richColors position="top-right" />
          </LayoutWrapper>
        </div>
      </body>
    </html>
  );
}
