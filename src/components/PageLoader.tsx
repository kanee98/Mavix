'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const loaderWords = ['Strategy', 'Creative', 'Traffic', 'Conversion'];

export function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), 1800);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[200] overflow-hidden bg-[#030407] text-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          aria-label="Loading Mavix"
        >
          <div className="absolute inset-0 campaign-grid opacity-50" />
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <motion.div
              className="relative h-[46vmin] w-[46vmin] max-h-[440px] max-w-[440px] rounded-full border border-cyan-300/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            >
              <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_30px_rgba(43,224,255,0.9)]" />
              <span className="absolute bottom-8 right-7 h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_24px_rgba(255,183,77,0.8)]" />
            </motion.div>
          </div>
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <motion.div
              className="h-[32vmin] w-[32vmin] max-h-[310px] max-w-[310px] rounded-full border border-dashed border-white/15"
              animate={{ rotate: -360 }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            />
          </div>
          <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
            <motion.div
              initial={{ scale: 0.72, opacity: 0, filter: 'blur(12px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="relative mb-8"
            >
              <div className="absolute -inset-5 rounded-[2rem] bg-cyan-400/20 blur-2xl" />
              <Image
                src="/images/logo.jpg"
                alt="Mavix"
                width={104}
                height={104}
                priority
                className="relative h-24 w-24 rounded-[1.7rem] border border-white/20 object-cover shadow-2xl"
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.55 }}
              className="mb-4 text-xs font-semibold uppercase tracking-[0.55em] text-cyan-200/80"
            >
              Mavix is preparing growth systems
            </motion.p>
            <div className="relative h-14 overflow-hidden">
              {loaderWords.map((word, index) => (
                <motion.span
                  key={word}
                  className="absolute left-1/2 top-0 -translate-x-1/2 text-4xl font-black uppercase tracking-tight sm:text-6xl"
                  initial={{ y: 70, opacity: 0 }}
                  animate={{ y: [70, 0, 0, -70], opacity: [0, 1, 1, 0] }}
                  transition={{
                    delay: 0.2 + index * 0.22,
                    duration: 1.05,
                    ease: [0.76, 0, 0.24, 1],
                    repeat: Infinity,
                    repeatDelay: 0.25,
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
            <div className="mt-10 h-1 w-64 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-amber-300 via-cyan-300 to-lime-300"
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 1.55, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

