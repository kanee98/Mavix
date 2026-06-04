'use client';

import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const stats = [
  { value: 55, suffix: '+', label: 'Projects delivered', note: 'web, campaigns, branding' },
  { value: 98, suffix: '%', label: 'Client satisfaction', note: 'clear communication loops' },
  { value: 5, suffix: 'x', label: 'ROAS ambition', note: 'tracked campaign targets' },
  { value: 24, suffix: '/7', label: 'Growth visibility', note: 'dashboards and support' },
];

const process = ['Audit', 'Position', 'Launch', 'Measure', 'Scale'];

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const obj = { val: 0 };
    gsap.to(obj, { val: value, duration: 1.8, ease: 'power3.out', onUpdate: () => setCount(Math.round(obj.val)) });
  }, [inView, value]);

  return <span>{count}{suffix}</span>;
}

export function WhyChooseSection() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useGSAP(
    () => {
      const st = ScrollTrigger.create({ trigger: ref.current, start: 'top 75%', onEnter: () => setInView(true) });
      const items = ref.current?.querySelectorAll('.why-reveal');
      if (items?.length) {
        gsap.fromTo(items, { opacity: 0, y: 40 }, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 75%', toggleActions: 'play none none none' },
        });
      }
      return () => st.kill();
    },
    { scope: ref }
  );

  return (
    <section id="why-us" ref={ref} className="relative overflow-hidden py-28 tech-grid noise" aria-labelledby="why-heading">
      <div className="absolute right-0 top-10 h-96 w-96 rounded-full bg-amber-300/10 blur-[110px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="why-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-4 text-sm font-black uppercase tracking-[0.34em] text-cyan-200">Why Mavix</p>
          <h2 id="why-heading" className="font-heading text-3xl font-extrabold leading-tight tracking-[-0.04em] sm:text-4xl md:text-5xl">
            Your website should feel like <span className="hot-gradient-text">proof</span>, not a brochure.
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <article key={stat.label} className="why-reveal premium-card rounded-[2rem] p-6 text-center">
              <p className="gradient-text text-3xl font-extrabold md:text-4xl"><AnimatedCounter value={stat.value} suffix={stat.suffix} inView={inView} /></p>
              <h3 className="mt-3 text-base font-black text-white">{stat.label}</h3>
              <p className="mt-2 text-sm text-slate-400">{stat.note}</p>
            </article>
          ))}
        </div>

        <div className="why-reveal mt-14 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {process.map((step, index) => (
              <div key={step} className="flex flex-1 items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cyan-300 text-sm font-black text-slate-950">{index + 1}</span>
                <span className="font-black uppercase tracking-[0.18em] text-white/80">{step}</span>
                {index < process.length - 1 ? <span className="hidden h-px flex-1 bg-gradient-to-r from-cyan-200/50 to-transparent md:block" /> : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

