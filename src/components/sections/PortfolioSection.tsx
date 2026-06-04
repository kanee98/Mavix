'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { TiltCard } from '@/components/ui/TiltCard';

const projects = [
  { title: 'Retail Growth Sprint', category: 'Paid Ads + Landing Page', result: '3.4x ROAS', desc: 'A campaign funnel with sharper offers, retargeting, and conversion-focused page sections.' },
  { title: 'Premium Brand Relaunch', category: 'Branding + Social', result: '2x engagement', desc: 'A new visual system, content rhythm, and trust-building story for a crowded market.' },
  { title: 'Local Search Domination', category: 'SEO + Content', result: 'Top 3 rankings', desc: 'Keyword architecture, technical cleanup, and content clusters for consistent discovery.' },
];

export function PortfolioSection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const items = ref.current?.querySelectorAll('.work-reveal');
      if (!items?.length) return;
      gsap.fromTo(items, { opacity: 0, y: 44 }, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%', toggleActions: 'play none none none' },
      });
    },
    { scope: ref }
  );

  return (
    <section id="portfolio" ref={ref} className="relative overflow-hidden py-28" aria-labelledby="portfolio-heading">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(43,224,255,0.12),transparent_40rem)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="work-reveal mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.34em] text-amber-200">Selected impact</p>
            <h2 id="portfolio-heading" className="font-heading text-3xl font-extrabold leading-tight tracking-[-0.04em] sm:text-4xl md:text-5xl">
              Case-study energy, even before the call.
            </h2>
          </div>
          <Link href="#contact" className="lift-link rounded-full border border-white/15 bg-white/8 px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-white backdrop-blur-xl">Request a plan</Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <TiltCard key={project.title} maxRotation={7} className="work-reveal h-full">
              <article className="premium-card group relative flex h-full min-h-[430px] flex-col overflow-hidden rounded-[2.2rem] p-7">
                <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-300/10 blur-[70px] transition-transform group-hover:scale-125" />
                <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-100/80">{project.category}</p>
                <div className="my-10 flex aspect-video items-center justify-center rounded-[1.6rem] border border-white/10 bg-black/30 scan-line">
                  <span className="text-7xl font-black text-white/10">0{index + 1}</span>
                </div>
                <p className="hot-gradient-text text-4xl font-black">{project.result}</p>
                <h3 className="mt-4 text-xl font-extrabold text-white">{project.title}</h3>
                <p className="mt-3 text-slate-400">{project.desc}</p>
              </article>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

