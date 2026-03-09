'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type Props = {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  y?: number;
  scrub?: boolean | number;
};

export function SectionReveal({
  children,
  className = '',
  stagger = 0.08,
  delay = 0,
  y = 60,
  scrub = false,
}: Props) {
  const container = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const els = childrenRef.current?.children;
      if (!els?.length) return;

      const targets = Array.from(els);
      gsap.set(targets, { opacity: 0, y });

      const animation = gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger,
        delay,
        ease: 'power3.out',
      });

      ScrollTrigger.create({
        trigger: container.current,
        start: 'top 85%',
        end: 'top 20%',
        onEnter: () => animation.play(),
        onEnterBack: () => animation.play(),
      });
    },
    { scope: container, dependencies: [stagger, delay, y] }
  );

  return (
    <div ref={container} className={className}>
      <div ref={childrenRef}>{children}</div>
    </div>
  );
}
