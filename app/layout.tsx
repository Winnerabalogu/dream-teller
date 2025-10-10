import type { Metadata } from 'next';
import {AuthProvider} from '@/components/providers/SessionProvider';
import './globals.css';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: "Aeterna's Journal - Interpret Your Dreams",
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
      <head suppressHydrationWarning>
        <meta name="apple-mobile-web-app-title" content="Aeterna's Journal" />
      </head>
      <body
       suppressHydrationWarning={true}
      >
        <AuthProvider>
          {children}
          <Toaster richColors position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
