'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

type Props = {
  children: React.ReactNode;
  className?: string;
  maxRotation?: number;
};

export function TiltCard({
  children,
  className = '',
  maxRotation = 8,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const card = cardRef.current;
      if (!card) return;

      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, {
          rotationY: x * maxRotation,
          rotationX: -y * maxRotation,
          duration: 0.4,
          ease: 'power2.out',
          transformPerspective: 800,
        });
      };

      const onLeave = () => {
        gsap.to(card, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
        });
      };

      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      return () => {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
      };
    },
    { scope: cardRef, dependencies: [maxRotation] }
  );

  return (
    <div className="perspective-[1000px] h-full" style={{ perspective: '1000px' }}>
      <div
        ref={cardRef}
        className={`transform-gpu h-full ${className}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </div>
    </div>
  );
}
