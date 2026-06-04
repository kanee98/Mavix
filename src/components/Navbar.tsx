'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { AnimatePresence, motion } from 'framer-motion';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#why-us', label: 'Proof' },
  { href: '#portfolio', label: 'Work' },
  { href: '#testimonials', label: 'Clients' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(headerRef.current, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out', delay: 0.2 });
    },
    { scope: headerRef }
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header ref={headerRef} className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 opacity-0 sm:px-5">
      <nav className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-3 transition-all duration-300 ${scrolled ? 'border-white/15 bg-[#05070b]/78 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl' : 'border-white/10 bg-white/[0.035] backdrop-blur-xl'}`} aria-label="Main navigation">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <Image src="/images/logo_no_bg.png" alt="Mavix logo" width={52} height={52} className="h-11 w-11 object-contain drop-shadow-[0_10px_24px_rgba(43,224,255,0.18)] transition-transform duration-300 group-hover:scale-105" />
          <div className="leading-none">
            <span className="block text-lg font-black uppercase tracking-[-0.03em] text-white">Mavix</span>
            <span className="hidden text-[10px] font-bold uppercase tracking-[0.26em] text-cyan-200/70 sm:block">Growth systems</span>
          </div>
        </Link>

        <ul className="hidden items-center gap-1 rounded-full border border-white/10 bg-black/20 p-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-300 transition hover:bg-white/10 hover:text-cyan-100">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="#contact" className="lift-link hidden rounded-full border border-cyan-200/35 bg-cyan-300/95 px-5 py-3 text-xs font-extrabold uppercase tracking-[0.14em] text-slate-950 shadow-[0_14px_35px_rgba(43,224,255,0.16)] md:inline-flex">
          Book Consultation
        </Link>

        <button type="button" className="rounded-full border border-white/10 bg-white/5 p-3 text-white md:hidden" onClick={() => setMobileOpen((open) => !open)} aria-expanded={mobileOpen} aria-label="Toggle menu">
          <span className="block h-0.5 w-5 bg-current transition" />
          <span className="mt-1.5 block h-0.5 w-5 bg-current transition" />
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="mx-auto mt-3 max-w-7xl rounded-[1.8rem] border border-white/10 bg-[#05070b]/92 p-4 backdrop-blur-2xl md:hidden">
            <ul className="grid gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="block rounded-2xl px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] text-slate-200 hover:bg-white/10" onClick={() => setMobileOpen(false)}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="#contact" className="mt-2 block rounded-2xl bg-cyan-300 px-4 py-3 text-center text-sm font-extrabold uppercase tracking-[0.16em] text-slate-950" onClick={() => setMobileOpen(false)}>
                  Book Consultation
                </Link>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

