import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RuneFrame OS™ - Watchtower',
  description: 'A modern, agentic web application with microservices architecture and API gateway preparation',
  keywords: ['agentic', 'microservices', 'API', 'web application', 'Next.js'],
  authors: [{ name: 'RuneFrameOS Team' }],
  creator: 'RuneFrameOS',
  publisher: 'RuneFrameOS',
  robots: 'index, follow',
  openGraph: {
    title: 'RuneFrame OS™ - Watchtower',
    description: 'Agentic Web Application with Microservices Architecture',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RuneFrameOS Core',
    description: 'Agentic Web Application with Microservices Architecture',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#0ea5e9',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-gray-50`}>
        <div className="min-h-full">
          {children}
        </div>
      </body>
    </html>
  );
}
