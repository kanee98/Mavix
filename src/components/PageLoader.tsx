'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

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

          <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
            <div className="relative grid h-[46vmin] w-[46vmin] max-h-[440px] min-h-[300px] min-w-[300px] max-w-[440px] place-items-center">
              <motion.div
                className="absolute inset-0 rounded-full border border-cyan-300/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              >
                <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_30px_rgba(43,224,255,0.9)]" />
                <span className="absolute bottom-8 right-7 h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_24px_rgba(255,183,77,0.8)]" />
              </motion.div>

              <motion.div
                className="absolute h-[70%] w-[70%] rounded-full border border-dashed border-white/15"
                animate={{ rotate: -360 }}
                transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
              />

              <motion.div
                initial={{ scale: 0.72, opacity: 0, filter: 'blur(12px)' }}
                animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="relative grid place-items-center"
              >
                <div className="absolute h-36 w-36 rounded-full bg-cyan-400/20 blur-2xl" />
                <Image
                  src="/images/logo_no_bg.png"
                  alt="Mavix"
                  width={128}
                  height={128}
                  priority
                  className="relative h-28 w-28 object-contain drop-shadow-[0_18px_40px_rgba(43,224,255,0.25)]"
                />
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.55 }}
              className="mt-8 text-xs font-semibold uppercase tracking-[0.55em] text-cyan-200/80"
            >
              Mavix is preparing growth systems
            </motion.p>

            <div className="mt-8 h-1 w-64 overflow-hidden rounded-full bg-white/10">
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
