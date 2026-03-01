'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0F]">
      <motion.div
        className="h-16 w-16 rounded-full border-2 border-transparent border-t-cyan-500 border-r-purple-500"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
