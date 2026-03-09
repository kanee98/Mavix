'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TiltCard } from '@/components/ui/TiltCard';

const services = [
  { title: 'Performance Marketing', desc: 'Data-driven campaigns that maximize ROAS across paid channels.', icon: '📈' },
  { title: 'Social Media Strategy', desc: 'Engaging content and community building that grows your audience.', icon: '📱' },
  { title: 'Branding & Creative', desc: 'Distinct identities and creative assets that stand out.', icon: '🎨' },
  { title: 'SEO Optimization', desc: 'Organic visibility that ranks and converts over time.', icon: '🔍' },
  { title: 'AI Marketing Automation', desc: 'Smart workflows and personalization at scale.', icon: '🤖' },
  { title: 'Web & Funnel Development', desc: 'High-converting websites and sales funnels built to perform.', icon: '🌐' },
];

export function ServicesSection() {
  const ref = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const heading = headingRef.current;
      const items = gridRef.current?.children;
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
      if (items?.length) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.06,
            ease: 'power3.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 88%', toggleActions: 'play none none none' },
          }
        );
      }
    },
    { scope: ref }
  );

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-24"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className="text-center mb-16">
          <h2
            id="services-heading"
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          >
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            End-to-end digital solutions for Sri Lankan businesses—designed for growth and scale.
          </p>
        </div>

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <TiltCard key={service.title} maxRotation={5} className="h-full">
              <div className="group glass rounded-2xl p-8 hover:border-cyan-500/30 hover:shadow-glow-cyan-soft transition-all cursor-default flex flex-col items-center text-center h-full min-h-[240px]">
                <span
                  className="text-4xl mb-4 block transform group-hover:scale-110 transition-transform shrink-0"
                  aria-hidden="true"
                >
                  {service.icon}
                </span>
                <h3 className="font-heading text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors shrink-0">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm flex-1 min-h-0">{service.desc}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
