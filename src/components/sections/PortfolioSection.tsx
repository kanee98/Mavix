'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TiltCard } from '@/components/ui/TiltCard';

const projects = [
  {
    title: 'TechFlow SaaS',
    category: 'Performance Marketing',
    description: '3x ROAS in 6 months with data-driven paid campaigns.',
  },
  {
    title: 'Luxe Brand Co',
    category: 'Branding & Social',
    description: 'Full rebrand and social strategy that doubled engagement.',
  },
  {
    title: 'HealthFirst',
    category: 'SEO & Web',
    description: 'Top 3 rankings and high-converting funnel design.',
  },
];

export function PortfolioSection() {
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
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
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
      id="portfolio"
      ref={ref}
      className="relative py-24"
      aria-labelledby="portfolio-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className="text-center mb-16">
          <h2
            id="portfolio-heading"
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          >
            Our <span className="gradient-text">Work</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Selected projects that showcase our impact.
          </p>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <TiltCard key={project.title} maxRotation={10}>
              <div className="group relative rounded-2xl overflow-hidden glass hover:border-cyan-500/30 h-full">
                <div className="aspect-video bg-gradient-to-br from-purple-900/40 to-cyan-900/40 flex items-center justify-center relative overflow-hidden">
                  <span className="text-6xl opacity-50 group-hover:opacity-80 transition-opacity z-10">
                    ✦
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <p className="text-cyan-400 text-sm font-medium mb-1">
                    {project.category}
                  </p>
                  <h3 className="font-heading text-xl font-semibold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{project.description}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <Link
                    href="#contact"
                    className="px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium border border-white/20 hover:bg-white/20 transition-colors"
                  >
                    View Case
                  </Link>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
