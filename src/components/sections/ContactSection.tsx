'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-24"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
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
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-2xl p-8 md:p-10 space-y-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
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
                  ? 'border-cyan-500/50 shadow-glow-cyan/20'
                  : 'border-white/10 hover:border-white/20'
              } text-white placeholder-gray-500`}
              placeholder="Your name"
            />
          </div>
          <div>
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
                  ? 'border-cyan-500/50 shadow-glow-cyan/20'
                  : 'border-white/10 hover:border-white/20'
              } text-white placeholder-gray-500`}
              placeholder="you@company.com"
            />
          </div>
          <div>
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
                  ? 'border-cyan-500/50 shadow-glow-cyan/20'
                  : 'border-white/10 hover:border-white/20'
              } text-white placeholder-gray-500`}
              placeholder="Tell us about your project..."
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold hover:shadow-glow transition-all"
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
