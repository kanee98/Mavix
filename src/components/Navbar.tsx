'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { AnimatePresence, motion } from 'framer-motion';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navLinksRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      if (!headerRef.current) return;
      gsap.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.2 }
      );
    },
    { scope: headerRef }
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#why-us', label: 'Why Us' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass py-3' : 'py-5 bg-transparent'
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <Image
            src="/images/logo.jpg"
            alt="Mavix logo"
            width={40}
            height={40}
            className="rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-heading text-xl font-bold gradient-text">
            Mavix
          </span>
        </Link>

        <ul ref={navLinksRef} className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <NavLink href={link.href} label={link.label} />
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <Link
            href="#contact"
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-sm font-medium hover:shadow-glow transition-all hover:scale-105"
          >
            Get Started
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden p-2 text-gray-300 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10 mt-2"
          >
            <ul className="flex flex-col py-4 px-4 gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-2 text-gray-300 hover:text-cyan-400"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="#contact"
                  className="block py-2 text-cyan-400 font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const link = linkRef.current;
      const line = lineRef.current;
      if (!link || !line) return;

      link.addEventListener('mouseenter', () => {
        gsap.to(line, { scaleX: 1, duration: 0.3, ease: 'power2.out' });
      });
      link.addEventListener('mouseleave', () => {
        gsap.to(line, { scaleX: 0, duration: 0.25, ease: 'power2.in', transformOrigin: 'left' });
      });
    },
    { scope: linkRef }
  );

  return (
    <Link
      ref={linkRef}
      href={href}
      className="relative text-gray-300 hover:text-cyan-400 transition-colors text-sm font-medium py-1"
    >
      {label}
      <span
        ref={lineRef}
        className="absolute bottom-0 left-0 w-full h-px bg-cyan-400 scale-x-0 origin-left"
        aria-hidden
      />
    </Link>
  );
}
