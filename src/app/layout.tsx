import type { Metadata } from 'next';
import { Manrope, Outfit } from 'next/font/google';
import './globals.css';
import { GSAPInit } from '@/components/GSAPInit';
import { CursorGlow } from '@/components/ui/CursorGlow';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { AppFooter } from '@/components/AppFooter';
import { PageLoader } from '@/components/PageLoader';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-heading',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mavix | Marvelous Infinite Experience - Digital Marketing Agency Sri Lanka',
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
    title: 'Mavix | Marvelous Infinite Experience - Sri Lanka',
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
      <body className={`${manrope.variable} ${outfit.variable} font-sans min-h-screen flex flex-col`}>
        <GSAPInit />
        <PageLoader />
        <ScrollProgress />
        <CursorGlow />
        {children}
        <AppFooter />
      </body>
    </html>
  );
}

