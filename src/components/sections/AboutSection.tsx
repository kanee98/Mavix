'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2
            id="about-heading"
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="gradient-text">Mavix</span> — Where Innovation
            Meets Impact
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            We are not just another agency. We are architects of digital
            experiences that scale, convert, and inspire. Our mission is to
            empower brands with AI-driven strategies, creative excellence, and
            measurable results.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 mt-16"
        >
          {[
            {
              title: 'Mission',
              desc: 'To deliver marvelous, infinite-scale digital experiences that drive growth and loyalty.',
              icon: '🎯',
            },
            {
              title: 'Vision',
              desc: 'A world where every brand can leverage AI and creativity to connect meaningfully with audiences.',
              icon: '🔮',
            },
            {
              title: 'Innovation',
              desc: 'We constantly evolve with cutting-edge tech, from AI automation to immersive web experiences.',
              icon: '⚡',
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="glass rounded-2xl p-8 hover:border-cyan-500/30 transition-colors"
            >
              <span className="text-4xl mb-4 block" aria-hidden="true">
                {item.icon}
              </span>
              <h3 className="font-heading text-xl font-semibold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
