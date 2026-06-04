'use client';

import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const testimonials = [
  {
    quote: 'Mavix made our brand look like it belonged in the next league. The campaigns became clearer, faster, and much easier to measure.',
    author: 'Nadeesha Perera',
    role: 'Marketing Head, Colombo Retail',
    metricValue: '3.1x',
    metricLabel: 'ROAS',
  },
  {
    quote: 'The difference was not just design. They connected creative, ads, and automation into one system that our team could actually use.',
    author: 'Ruvin Fernando',
    role: 'Founder, ScaleUp Lanka',
    metricValue: '42%',
    metricLabel: 'more leads',
  },
  {
    quote: 'Our website now reflects the quality of our business. It feels premium, direct, and much easier for customers to understand.',
    author: 'Chamari Silva',
    role: 'Head of Growth, Ape Gewaththa',
    metricValue: '2x',
    metricLabel: 'engagement',
  },
];

export function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const items = ref.current?.querySelectorAll('.testimonial-reveal');
      if (!items?.length) return;
      gsap.fromTo(items, { opacity: 0, y: 42 }, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.09,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%', toggleActions: 'play none none none' },
      });
    },
    { scope: ref }
  );

  useEffect(() => {
    const timer = window.setInterval(() => setActive((prev) => (prev + 1) % testimonials.length), 5200);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!quoteRef.current) return;
    gsap.fromTo(quoteRef.current, { opacity: 0, y: 18, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power2.out' });
  }, [active]);

  const current = testimonials[active];

  return (
    <section id="testimonials" ref={ref} className="relative overflow-hidden py-24 tech-grid noise" aria-labelledby="testimonials-heading">
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-lime-300/10 blur-[120px]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="testimonial-reveal mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.32em] text-lime-200">Client results</p>
          <h2 id="testimonials-heading" className="font-heading text-3xl font-extrabold leading-tight tracking-[-0.04em] sm:text-4xl md:text-5xl">
            Client feedback that reflects <span className="gradient-text">measurable progress.</span>
          </h2>
        </div>

        <div className="testimonial-reveal grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="premium-card rounded-[1.8rem] p-6 md:p-7">
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-cyan-200">Impact snapshot</p>
            <div className="mt-7">
              <p className="hot-gradient-text break-words text-5xl font-extrabold leading-none md:text-6xl">{current.metricValue}</p>
              <p className="mt-2 text-xl font-extrabold tracking-[-0.02em] text-white md:text-2xl">{current.metricLabel}</p>
            </div>
            <p className="mt-6 text-sm leading-7 text-slate-400 md:text-base">Sustainable growth depends on strong positioning, clear customer journeys, and campaigns that can be measured and improved.</p>
          </div>

          <div ref={quoteRef} key={active} className="premium-card rounded-[1.8rem] p-7 md:p-10">
            <blockquote className="max-w-3xl text-xl font-extrabold leading-snug tracking-[-0.03em] text-white sm:text-2xl md:text-3xl">
              &ldquo;{current.quote}&rdquo;
            </blockquote>
            <footer className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <cite className="not-italic text-base font-extrabold text-white md:text-lg">{current.author}</cite>
                <p className="text-sm text-cyan-200">{current.role}</p>
              </div>
              <div className="flex gap-2">
                {testimonials.map((item, index) => (
                  <button
                    key={item.author}
                    type="button"
                    onClick={() => setActive(index)}
                    className={`h-3 rounded-full transition-all ${active === index ? 'w-10 bg-cyan-300' : 'w-3 bg-white/20 hover:bg-white/40'}`}
                    aria-label={`Show testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}

