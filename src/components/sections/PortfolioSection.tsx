'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

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
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="portfolio"
      ref={ref}
      className="relative py-24"
      aria-labelledby="portfolio-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            id="portfolio-heading"
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          >
            Our <span className="gradient-text">Work</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Selected projects that showcase our impact.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl overflow-hidden glass hover:border-cyan-500/30"
            >
              <div className="aspect-video bg-gradient-to-br from-purple-900/40 to-cyan-900/40 flex items-center justify-center">
                <span className="text-6xl opacity-50 group-hover:opacity-80 transition-opacity">
                  ✦
                </span>
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
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6"
                initial={false}
              >
                <Link
                  href="#contact"
                  className="px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium border border-white/20 hover:bg-white/20"
                >
                  View Case
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
