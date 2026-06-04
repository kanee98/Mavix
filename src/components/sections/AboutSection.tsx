'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { TiltCard } from '@/components/ui/TiltCard';

const cards = [
  {
    kicker: '01 / Strategy',
    title: 'We identify growth opportunities',
    desc: 'Before we design anything, we map your audience, offer, funnel, competitors, and analytics so every creative decision has a clear business purpose.',
  },
  {
    kicker: '02 / Creative',
    title: 'We build premium brand experiences',
    desc: 'Campaign visuals, landing pages, content systems, and brand stories are crafted to strengthen trust, memorability, and customer confidence.',
  },
  {
    kicker: '03 / Performance',
    title: 'We optimize for measurable results',
    desc: 'Ads, SEO, automation, and reporting move together so you can see what is working, what changed, and where the next opportunity sits.',
  },
];

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const items = ref.current?.querySelectorAll('.reveal-item');
      if (!items?.length) return;
      gsap.fromTo(items, { opacity: 0, y: 48 }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%', toggleActions: 'play none none none' },
      });
    },
    { scope: ref }
  );

  return (
    <section id="about" ref={ref} className="relative overflow-hidden py-28 tech-grid noise" aria-labelledby="about-heading">
      <div className="absolute left-0 top-16 h-72 w-72 rounded-full bg-cyan-300/10 blur-[90px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal-item grid items-end gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase tracking-[0.34em] text-amber-200">Strategy, creative, performance</p>
            <h2 id="about-heading" className="font-heading text-3xl font-extrabold leading-tight tracking-[-0.04em] text-white sm:text-4xl md:text-5xl">
              We design digital experiences that build trust and drive action.
            </h2>
          </div>
          <p className="text-lg leading-8 text-slate-300">
            Mavix helps Sri Lankan businesses strengthen credibility, communicate clearly, and compete with confidence. We blend strategy, creative direction, conversion thinking, and marketing technology into one connected growth system.
          </p>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {cards.map((item) => (
            <TiltCard key={item.title} maxRotation={5} className="reveal-item h-full">
              <article className="premium-card group flex h-full min-h-[320px] flex-col rounded-[2rem] p-7">
                <p className="mb-8 text-xs font-black uppercase tracking-[0.28em] text-cyan-200/80">{item.kicker}</p>
                <h3 className="mb-4 text-xl font-extrabold text-white group-hover:text-cyan-100">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
                <div className="mt-auto pt-10">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/8 text-xl text-cyan-200">+</span>
                </div>
              </article>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

