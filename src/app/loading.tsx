'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-[#030407] text-white">
      <div className="absolute inset-0 campaign-grid opacity-50" />
      <motion.div
        className="relative h-36 w-36 rounded-full border border-cyan-300/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      >
        <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_24px_rgba(43,224,255,0.9)]" />
        <span className="absolute inset-8 rounded-full border border-dashed border-white/20" />
      </motion.div>
      <span className="sr-only">Loading Mavix...</span>
    </div>
  );
}

