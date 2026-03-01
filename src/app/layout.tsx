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
  title: 'Mavix | Marvelous Infinite Experience — Digital Marketing Agency',
  description:
    'Mavix is a cutting-edge digital marketing agency delivering AI-driven performance marketing, branding, SEO, and web development. Marvelous Infinite Experience.',
  keywords: [
    'digital marketing',
    'performance marketing',
    'SEO',
    'branding',
    'AI marketing',
    'Mavix',
  ],
  openGraph: {
    title: 'Mavix | Marvelous Infinite Experience',
    description: 'Cutting-edge digital marketing agency. AI-driven strategies.',
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
