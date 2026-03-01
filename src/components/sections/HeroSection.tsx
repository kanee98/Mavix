'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      aria-labelledby="hero-heading"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-mesh" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(139,92,246,0.15),transparent)]" />
      <ParticleBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <Image
            src="/images/logo.jpg"
            alt="Mavix"
            width={80}
            height={80}
            className="rounded-2xl object-cover shadow-glow"
          />
        </motion.div>

        <motion.h1
          id="hero-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
        >
          <span className="gradient-text">Marvelous Infinite</span>
          <br />
          <span className="text-white">Experience</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="max-w-2xl mx-auto text-gray-400 text-lg sm:text-xl mb-10"
        >
          We are a cutting-edge digital marketing agency that blends AI, creativity,
          and data to deliver extraordinary growth for brands worldwide.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link
            href="#contact"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold hover:shadow-glow transition-all hover:scale-105"
          >
            Get Started
          </Link>
          <Link
            href="#portfolio"
            className="px-8 py-4 rounded-full glass text-gray-200 font-semibold hover:border-cyan-500/50 hover:text-cyan-400 transition-all"
          >
            View Our Work
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-gray-500 flex justify-center pt-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function ParticleBackground() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-cyan-500/40"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}
