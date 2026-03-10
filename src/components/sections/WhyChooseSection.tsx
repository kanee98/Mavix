'use client';

import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TiltCard } from '@/components/ui/TiltCard';

const stats = [
  { value: 55, suffix: '+', label: 'Projects Delivered' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 5, suffix: 'x', label: 'Average ROAS' },
  { value: 24, suffix: '/7', label: 'Support' },
];

function AnimatedCounter({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => setCount(Math.round(obj.val)),
    });
  }, [inView, value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function WhyChooseSection() {
  const ref = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useGSAP(
    () => {
      if (!ref.current) return;
      const heading = headingRef.current;
      const cards = cardsRef.current?.children;

      const st = ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 80%',
        onEnter: () => setInView(true),
      });

      if (heading) {
        gsap.fromTo(
          heading,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: heading, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      }
      if (cards?.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, scale: 0.92 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'back.out(1.2)',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 88%', toggleActions: 'play none none none' },
          }
        );
      }
      return () => st.kill();
    },
    { scope: ref }
  );

  return (
    <section
      id="why-us"
      ref={ref}
      className="relative py-24 overflow-hidden tech-grid noise"
      aria-labelledby="why-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/5 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className="text-center mb-16">
          <h2
            id="why-heading"
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          >
            Why Choose <span className="gradient-text">Mavix</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Trusted by brands across Sri Lanka. Numbers that speak—experience that delivers.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <TiltCard key={stat.label} maxRotation={4}>
              <div className="glass rounded-2xl p-8 text-center hover:border-cyan-500/30 transition-colors h-full">
                <p className="font-heading text-4xl md:text-5xl font-bold gradient-text mb-2">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    inView={inView}
                  />
                </p>
                <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
