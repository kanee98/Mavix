'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(false);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow || typeof window === 'undefined') return;

    const pos = { x: 0, y: 0 };
    const quickX = gsap.quickTo(glow, 'x', { duration: 0.4, ease: 'power2.out' });
    const quickY = gsap.quickTo(glow, 'y', { duration: 0.4, ease: 'power2.out' });
    const quickOpacity = gsap.quickTo(glow, 'opacity', { duration: 0.25 });

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX - 150;
      pos.y = e.clientY - 150;
      visibleRef.current = true;
    };
    const onLeave = () => {
      visibleRef.current = false;
    };

    function update() {
      quickX(pos.x);
      quickY(pos.y);
      quickOpacity(visibleRef.current ? 1 : 0);
    }

    gsap.ticker.add(update);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);

    return () => {
      gsap.ticker.remove(update);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed z-[99] hidden md:block w-[300px] h-[300px] rounded-full bg-cyan-500/20"
      style={{
        left: 0,
        top: 0,
        filter: 'blur(60px)',
        opacity: 0,
      }}
      aria-hidden="true"
    />
  );
}
