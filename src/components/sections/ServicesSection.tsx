'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { TiltCard } from '@/components/ui/TiltCard';

const services = [
  { title: 'Performance Ads', metric: 'ROAS', desc: 'Meta, Google, TikTok, and retargeting campaigns built around conversion data, not guesswork.' },
  { title: 'SEO Growth', metric: 'Rank', desc: 'Technical SEO, content maps, local search, and authority building that create compounding visibility.' },
  { title: 'Brand Identity', metric: 'Trust', desc: 'Logos, visual systems, messaging, and creative direction that make your business feel premium.' },
  { title: 'Social Content', metric: 'Reach', desc: 'Content calendars, short-form ideas, hooks, and design systems that make posting feel intentional.' },
  { title: 'Web & Funnels', metric: 'Sales', desc: 'High-converting websites and landing pages with strong copy, motion, and clear customer journeys.' },
  { title: 'AI Automation', metric: 'Speed', desc: 'Lead routing, CRM workflows, reporting dashboards, and smart systems that save hours every week.' },
];

export function ServicesSection() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const items = ref.current?.querySelectorAll('.service-reveal');
      if (!items?.length) return;
      gsap.fromTo(items, { opacity: 0, y: 42 }, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%', toggleActions: 'play none none none' },
      });
    },
    { scope: ref }
  );

  return (
    <section id="services" ref={ref} className="relative overflow-hidden py-28" aria-labelledby="services-heading">
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan-200/30 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="service-reveal mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.34em] text-lime-200">Growth services</p>
            <h2 id="services-heading" className="font-heading text-3xl font-extrabold leading-tight tracking-[-0.04em] sm:text-4xl md:text-5xl">
              One connected engine. <span className="gradient-text">Six sharp moves.</span>
            </h2>
          </div>
          <p className="max-w-md text-slate-400">Hover or tap a card. Each service is designed to support the others, so your brand does not feel scattered across platforms.</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <TiltCard key={service.title} maxRotation={5} className="service-reveal h-full">
              <button
                type="button"
                onMouseEnter={() => setActive(index)}
                onClick={() => setActive(index)}
                className={`premium-card group flex h-full min-h-[285px] w-full flex-col rounded-[2rem] p-7 text-left transition-all ${active === index ? 'border-cyan-200/40 shadow-[0_0_70px_rgba(43,224,255,0.15)]' : ''}`}
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-cyan-100">{service.metric}</span>
                  <span className="text-3xl font-black text-white/20 group-hover:text-cyan-200/80">0{index + 1}</span>
                </div>
                <h3 className="mb-4 text-xl font-extrabold text-white">{service.title}</h3>
                <p className="text-slate-400">{service.desc}</p>
                <div className="mt-auto pt-7">
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className={`h-full rounded-full bg-gradient-to-r from-cyan-300 to-lime-300 transition-all duration-500 ${active === index ? 'w-full' : 'w-1/3'}`} />
                  </div>
                </div>
              </button>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

