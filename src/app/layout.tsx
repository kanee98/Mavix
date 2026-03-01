import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
});
import { CursorGlow } from '@/components/ui/CursorGlow';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { AppFooter } from '@/components/AppFooter';

export const metadata: Metadata = {
  title: 'Mavix | Marvelous Infinite Experience — Digital Marketing Agency Sri Lanka',
  description:
    'Mavix is Sri Lanka\'s digital marketing agency delivering AI-driven performance marketing, branding, SEO, and web development. Based in Sri Lanka. Marvelous Infinite Experience.',
  keywords: [
    'digital marketing Sri Lanka',
    'performance marketing',
    'SEO Sri Lanka',
    'branding',
    'AI marketing',
    'Mavix',
    'Colombo',
  ],
  openGraph: {
    title: 'Mavix | Marvelous Infinite Experience — Sri Lanka',
    description: 'Sri Lanka\'s cutting-edge digital marketing agency. AI-driven strategies.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans min-h-screen flex flex-col`}
      >
        <ScrollProgress />
        <CursorGlow />
        {children}
        <AppFooter />
      </body>
    </html>
  );
}
