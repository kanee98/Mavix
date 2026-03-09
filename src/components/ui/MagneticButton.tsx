'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

type Props = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
};

export function MagneticButton({
  children,
  className = '',
  strength = 0.3,
}: Props) {
  const el = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const target = el.current;
      if (!target) return;

      const onMove = (e: MouseEvent) => {
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(target, {
          x: x * strength,
          y: y * strength,
          duration: 0.4,
          ease: 'power2.out',
        });
      };

      const onLeave = () => {
        gsap.to(target, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
      };

      target.addEventListener('mousemove', onMove);
      target.addEventListener('mouseleave', onLeave);
      return () => {
        target.removeEventListener('mousemove', onMove);
        target.removeEventListener('mouseleave', onLeave);
      };
    },
    { scope: el, dependencies: [strength] }
  );

  return (
    <div ref={el} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}
