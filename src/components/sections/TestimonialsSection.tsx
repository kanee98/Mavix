'use client';

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
    role: 'Head of Growth, Ape Gewaththa',
  },
];

export function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const quoteRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: headingRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      }
    },
    { scope: ref }
  );

  useEffect(() => {
    const t = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!quoteRef.current) return;
    gsap.fromTo(
      quoteRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, [active]);

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative py-24 overflow-hidden tech-grid noise"
      aria-labelledby="testimonials-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className="text-center mb-16">
          <h2
            id="testimonials-heading"
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          >
            What <span className="gradient-text">Clients</span> Say
          </h2>
          <p className="text-gray-400">Trusted by brands across Sri Lanka and beyond.</p>
        </div>

        <div className="relative min-h-[220px] flex items-center justify-center">
          <div
            ref={quoteRef}
            key={active}
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
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? 'bg-cyan-500 w-8' : 'w-2 bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
