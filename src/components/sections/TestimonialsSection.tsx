'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const testimonials = [
  {
    quote:
      'Mavix transformed our digital presence in Sri Lanka. ROI exceeded our expectations within the first quarter.',
    author: 'Nadeesha Perera',
    role: 'Marketing Head, Colombo Retail',
  },
  {
    quote:
      'Their AI-driven approach to marketing automation saved us countless hours while boosting conversions. A true partner for Sri Lankan businesses.',
    author: 'Ruvin Fernando',
    role: 'Founder, ScaleUp Lanka',
  },
  {
    quote:
      'Best agency we have worked with. Creative, data-savvy, and truly invested in our success—highly recommend for anyone in Sri Lanka.',
    author: 'Chamari Silva',
    role: 'Head of Growth, Island Brands',
  },
];

export function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative py-24 overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            id="testimonials-heading"
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          >
            What <span className="gradient-text">Clients</span> Say
          </h2>
          <p className="text-gray-400">Trusted by brands across Sri Lanka and beyond.</p>
        </motion.div>

        <div className="relative min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="glass rounded-2xl p-8 md:p-12 text-center"
            >
              <blockquote className="text-xl md:text-2xl text-gray-200 font-medium mb-6">
                &ldquo;{testimonials[active].quote}&rdquo;
              </blockquote>
              <footer>
                <cite className="not-italic font-heading font-semibold text-white">
                  {testimonials[active].author}
                </cite>
                <p className="text-cyan-400 text-sm mt-1">
                  {testimonials[active].role}
                </p>
              </footer>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === active ? 'bg-cyan-500 w-8' : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
