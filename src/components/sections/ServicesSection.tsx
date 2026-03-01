'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const services = [
  {
    title: 'Performance Marketing',
    desc: 'Data-driven campaigns that maximize ROAS across paid channels.',
    icon: '📈',
  },
  {
    title: 'Social Media Strategy',
    desc: 'Engaging content and community building that grows your audience.',
    icon: '📱',
  },
  {
    title: 'Branding & Creative',
    desc: 'Distinct identities and creative assets that stand out.',
    icon: '🎨',
  },
  {
    title: 'SEO Optimization',
    desc: 'Organic visibility that ranks and converts over time.',
    icon: '🔍',
  },
  {
    title: 'AI Marketing Automation',
    desc: 'Smart workflows and personalization at scale.',
    icon: '🤖',
  },
  {
    title: 'Web & Funnel Development',
    desc: 'High-converting websites and sales funnels built to perform.',
    icon: '🌐',
  },
];

export function ServicesSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-24"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            id="services-heading"
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          >
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            End-to-end digital solutions designed for growth and scale.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 * i }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group glass rounded-2xl p-8 hover:border-cyan-500/30 hover:shadow-glow-cyan/20 transition-all cursor-default"
            >
              <span
                className="text-4xl mb-4 block transform group-hover:scale-110 transition-transform"
                aria-hidden="true"
              >
                {service.icon}
              </span>
              <h3 className="font-heading text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
