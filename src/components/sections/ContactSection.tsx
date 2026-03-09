'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticButton } from '@/components/ui/MagneticButton';

export function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [focused, setFocused] = useState<string | null>(null);

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
      const rows = formRef.current?.querySelectorAll('.contact-row');
      if (rows?.length) {
        gsap.fromTo(
          rows,
          { opacity: 0, x: -24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: { trigger: formRef.current, start: 'top 88%', toggleActions: 'play none none none' },
          }
        );
      }
    },
    { scope: ref }
  );

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-24 tech-grid"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className="text-center mb-12">
          <h2
            id="contact-heading"
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          >
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-gray-400">
            Ready to create something marvelous? Get in touch—we&apos;re here for Sri Lankan businesses and beyond.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Prefer to call or message?{' '}
            <a
              href="tel:+94714074994"
              className="text-cyan-400 hover:text-cyan-300 font-medium"
            >
              +94 71 407 4994
            </a>
            {' · '}
            <a
              href="https://web.facebook.com/MAVIXLk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 font-medium"
            >
              Message us on Facebook
            </a>
          </p>
        </div>

        <form
          ref={formRef}
          className="glass rounded-2xl p-8 md:p-10 space-y-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="contact-row">
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              required
              onFocus={() => setFocused('name')}
              onBlur={() => setFocused(null)}
              className={`w-full px-4 py-3 rounded-xl bg-white/5 border transition-all ${
                focused === 'name'
                  ? 'border-cyan-500/50 shadow-glow-cyan-soft'
                  : 'border-white/10 hover:border-white/20'
              } text-white placeholder-gray-500`}
              placeholder="Your name"
            />
          </div>
          <div className="contact-row">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused(null)}
              className={`w-full px-4 py-3 rounded-xl bg-white/5 border transition-all ${
                focused === 'email'
                  ? 'border-cyan-500/50 shadow-glow-cyan-soft'
                  : 'border-white/10 hover:border-white/20'
              } text-white placeholder-gray-500`}
              placeholder="you@company.com"
            />
          </div>
          <div className="contact-row">
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              onFocus={() => setFocused('message')}
              onBlur={() => setFocused(null)}
              className={`w-full px-4 py-3 rounded-xl bg-white/5 border transition-all resize-none ${
                focused === 'message'
                  ? 'border-cyan-500/50 shadow-glow-cyan-soft'
                  : 'border-white/10 hover:border-white/20'
              } text-white placeholder-gray-500`}
              placeholder="Tell us about your project..."
            />
          </div>
          <div className="contact-row pt-2">
            <MagneticButton strength={0.12}>
              <button
                type="submit"
                className="w-full max-w-xs mx-auto flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold text-sm tracking-wide hover:shadow-glow transition-all duration-200 hover:opacity-95 active:scale-[0.98] border border-white/10"
              >
                <span>Send Message</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </MagneticButton>
          </div>
        </form>
      </div>
    </section>
  );
}
