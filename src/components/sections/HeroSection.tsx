'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticButton } from '@/components/ui/MagneticButton';

const HERO_LINE1 = 'Marvelous Infinite';
const HERO_LINE2 = 'Experience';

/* First line: single element with gradient so it's always visible in all browsers */
function HeroLine1() {
  const lineRef = useRef<HTMLSpanElement>(null);
  useGSAP(
    () => {
      if (!lineRef.current) return;
      gsap.fromTo(
        lineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.5, ease: 'power3.out' }
      );
    },
    { scope: lineRef }
  );
  return (
    <span
      ref={lineRef}
      className="gradient-text block"
      style={{ opacity: 0 }}
    >
      {HERO_LINE1}
    </span>
  );
}

function SplitLine({ text, className = '', delay = 0.4 }: { text: string; className?: string; delay?: number }) {
  const lineRef = useRef<HTMLSpanElement>(null);
  const chars = text.split('');

  useGSAP(
    () => {
      if (!lineRef.current) return;
      const spans = lineRef.current.querySelectorAll('.char');
      gsap.fromTo(
        spans,
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.03,
          ease: 'power3.out',
          delay,
        }
      );
    },
    { scope: lineRef, dependencies: [delay] }
  );

  return (
    <span ref={lineRef} className={`inline-block ${className}`}>
      {chars.map((char, i) => (
        <span key={i} className="char inline-block" style={{ opacity: 0, transform: 'translateY(12px)' }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const parallaxBgRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(logoRef.current, { scale: 0, opacity: 0, rotation: -20 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.8 })
        .fromTo(taglineRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
        .fromTo(ctaRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.2')
        .fromTo(scrollHintRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.1');
    },
    { scope: sectionRef }
  );

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
        onUpdate: (self) => {
          const progress = self.progress;
          if (parallaxBgRef.current) {
            gsap.set(parallaxBgRef.current, { y: progress * 120 });
          }
          if (particlesRef.current) {
            gsap.set(particlesRef.current, { y: progress * 80 });
          }
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 tech-grid noise"
      aria-labelledby="hero-heading"
    >
      {/* Parallax background layers */}
      <div ref={parallaxBgRef} className="absolute inset-0 bg-gradient-mesh" />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(139,92,246,0.2),transparent_50%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_20%,rgba(6,182,212,0.12),transparent_50%)]"
        aria-hidden
      />
      <ParticleBackground innerRef={particlesRef} />

      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          ref={logoRef}
          className="flex justify-center mb-8"
          style={{ transform: 'scale(0)', opacity: 0 }}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-glow ring-2 ring-white/10 ring-offset-4 ring-offset-[#0A0A0F]">
            <Image
              src="/images/logo.jpg"
              alt="Mavix"
              width={112}
              height={112}
              className="rounded-2xl object-cover w-24 h-24 sm:w-28 sm:h-28"
            />
          </div>
        </div>

        <h1
          id="hero-heading"
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
        >
          <HeroLine1 />
          <span className="block text-white mt-2">
            <SplitLine text={HERO_LINE2} delay={0.85} />
          </span>
        </h1>

        <p
          ref={taglineRef}
          className="max-w-2xl mx-auto text-gray-400 text-lg sm:text-xl mb-12 opacity-0"
        >
          Sri Lanka&apos;s digital marketing partner—blending AI, creativity, and data
          to deliver extraordinary growth for brands across the island and beyond.
        </p>

        <div
          ref={ctaRef}
          className="flex flex-wrap justify-center gap-4 opacity-0 mb-20 sm:mb-28"
        >
          <MagneticButton strength={0.25}>
            <Link
              href="#contact"
              className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold hover:shadow-glow transition-all hover:scale-105"
            >
              Get Started
            </Link>
          </MagneticButton>
          <MagneticButton strength={0.2}>
            <Link
              href="#portfolio"
              className="inline-block px-8 py-4 rounded-full glass text-gray-200 font-semibold hover:border-cyan-500/50 hover:text-cyan-400 transition-all"
            >
              View Our Work
            </Link>
          </MagneticButton>
        </div>
      </div>

      <div
        ref={scrollHintRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
          <ScrollIndicator className="w-6 h-10 rounded-full border-2 border-gray-500/80 flex justify-center pt-2" />
        </div>
      </div>
    </section>
  );
}

function ScrollIndicator({ className }: { className?: string }) {
  const el = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (!el.current) return;
      gsap.to(el.current, {
        y: 8,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    },
    { scope: el }
  );
  return (
    <div ref={el} className={className}>
      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
    </div>
  );
}

function ParticleBackground({ innerRef }: { innerRef?: React.RefObject<HTMLDivElement> }) {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.8,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
  }));

  return (
    <div ref={innerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <ParticleDot key={p.id} {...p} />
      ))}
    </div>
  );
}

function ParticleDot({
  x,
  y,
  size,
  duration,
  delay,
}: {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}) {
  const el = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (!el.current) return;
      gsap.to(el.current, {
        opacity: 0.8,
        scale: 1.3,
        duration: duration * 0.4,
        delay,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    },
    { scope: el }
  );
  return (
    <div
      ref={el}
      className="absolute rounded-full bg-cyan-500/50"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
      }}
    />
  );
}
