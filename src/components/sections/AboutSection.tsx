'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TiltCard } from '@/components/ui/TiltCard';

const cards = [
  {
    title: 'Mission',
    desc: 'To deliver marvelous, infinite-scale digital experiences that drive growth for Sri Lankan businesses and beyond.',
    icon: '🎯',
  },
  {
    title: 'Vision',
    desc: 'A Sri Lanka where every brand can leverage AI and creativity to connect meaningfully with local and global audiences.',
    icon: '🔮',
  },
  {
    title: 'Innovation',
    desc: 'We constantly evolve with cutting-edge tech—from AI automation to immersive web experiences—tailored for the Sri Lankan market.',
    icon: '⚡',
  },
];

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const heading = headingRef.current;
      const cards = cardsRef.current?.children;
      if (heading) {
        gsap.fromTo(
          heading,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
      if (cards?.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    },
    { scope: ref }
  );

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 overflow-hidden tech-grid noise"
      aria-labelledby="about-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headingRef}
          className="text-center max-w-3xl mx-auto"
        >
          <h2
            id="about-heading"
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="gradient-text">Mavix</span> — Where Innovation
            Meets Impact in Sri Lanka
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            Based in Sri Lanka, we are architects of digital experiences that
            scale, convert, and inspire. Our mission is to empower Sri Lankan
            brands—and those going global—with AI-driven strategies, creative
            excellence, and measurable results.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8 mt-16">
          {cards.map((item) => (
            <TiltCard key={item.title} maxRotation={6} className="h-full">
              <div className="glass rounded-2xl p-8 hover:border-cyan-500/30 transition-colors flex flex-col items-center text-center h-full min-h-[280px]">
                <span className="text-4xl mb-4 shrink-0" aria-hidden="true">
                  {item.icon}
                </span>
                <h3 className="font-heading text-xl font-semibold text-white mb-3 shrink-0">
                  {item.title}
                </h3>
                <p className="text-gray-400 flex-1 min-h-0">{item.desc}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
