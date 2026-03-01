'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };
    const handleLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  if (typeof window === 'undefined') return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-[99] hidden md:block"
      initial={{ opacity: 0 }}
      animate={{
        x: position.x,
        y: position.y,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 28,
        mass: 0.5,
      }}
      style={{
        left: 0,
        top: 0,
        width: 300,
        height: 300,
        marginLeft: -150,
        marginTop: -150,
      }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 rounded-full bg-cyan-500/20 blur-3xl"
        style={{ filter: 'blur(60px)' }}
      />
    </motion.div>
  );
}
