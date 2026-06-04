'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticButton } from '@/components/ui/MagneticButton';

const heroStats = [
  { value: '5x', label: 'average ROAS target' },
  { value: '48h', label: 'launch planning' },
  { value: '360', label: 'marketing approach' },
];

const orbitItems = ['SEO', 'ADS', 'CRM', 'AI', 'UX', 'BRAND'];

const particlePositions = [
  [8, 22], [17, 68], [28, 34], [37, 78], [48, 18], [58, 62], [67, 29], [75, 82], [86, 43], [93, 17],
  [12, 88], [22, 12], [33, 55], [43, 42], [51, 91], [61, 9], [72, 57], [81, 26], [90, 73], [96, 51],
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(logoRef.current, { scale: 0.75, opacity: 0, y: 20 }, { scale: 1, opacity: 1, y: 0, duration: 0.75 })
        .fromTo(eyebrowRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.55 }, '-=0.35')
        .fromTo(titleRef.current?.querySelectorAll('.hero-word') || [], { y: 80, opacity: 0, rotateX: 18 }, { y: 0, opacity: 1, rotateX: 0, duration: 0.75, stagger: 0.07 }, '-=0.2')
        .fromTo(copyRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.65 }, '-=0.25')
        .fromTo(ctaRef.current, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.55 }, '-=0.25')
        .fromTo(panelRef.current, { opacity: 0, x: 50, scale: 0.96 }, { opacity: 1, x: 0, scale: 1, duration: 0.8 }, '-=0.65');

      if (sectionRef.current && parallaxRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          onUpdate: (self) => gsap.set(parallaxRef.current, { y: self.progress * 140 }),
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8"
      aria-labelledby="hero-heading"
    >
      <div ref={parallaxRef} className="absolute inset-0 campaign-grid" />
      <div className="absolute left-1/2 top-12 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[120px]" />
      <div className="absolute -right-32 top-36 h-[28rem] w-[28rem] rounded-full bg-amber-300/10 blur-[100px]" />
      <div className="absolute -left-40 bottom-0 h-[34rem] w-[34rem] rounded-full bg-lime-300/10 blur-[110px]" />
      <ParticleField />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div ref={logoRef} className="mb-7 flex items-center gap-4 opacity-0">
            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl bg-cyan-300/20 blur-xl" />
              <Image src="/images/logo.jpg" alt="Mavix" width={72} height={72} priority className="relative h-16 w-16 rounded-2xl border border-white/20 object-cover shadow-2xl" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.45em] text-cyan-200/80">Mavix</p>
              <p className="text-sm text-white/55">Marvelous Infinite Experience</p>
            </div>
          </div>

          <p ref={eyebrowRef} className="mb-5 opacity-0 text-xs font-extrabold uppercase tracking-[0.32em] text-amber-200/90 sm:text-sm">
            Digital marketing agency for ambitious Sri Lankan brands
          </p>

          <h1 id="hero-heading" ref={titleRef} className="font-heading text-4xl font-extrabold leading-[0.96] tracking-[-0.055em] sm:text-5xl md:text-6xl xl:text-7xl">
            <span className="hero-word block">Turn clicks</span>
            <span className="hero-word block gradient-text">into customers</span>
            <span className="hero-word block text-white/90">with style.</span>
          </h1>

          <p ref={copyRef} className="mt-7 max-w-2xl text-base leading-8 text-slate-300 opacity-0 sm:text-lg">
            We create integrated marketing systems across paid media, SEO, content, branding, web design, and automation, helping businesses attract better leads and convert with confidence.
          </p>

          <div ref={ctaRef} className="mt-10 flex flex-wrap items-center gap-4 opacity-0">
            <MagneticButton strength={0.18}>
              <Link href="#contact" className="lift-link inline-flex rounded-full border border-cyan-200/40 bg-cyan-300 px-7 py-4 text-sm font-extrabold uppercase tracking-[0.18em] text-slate-950 shadow-[0_0_50px_rgba(43,224,255,0.28)]">
                Book a strategy call
              </Link>
            </MagneticButton>
            <MagneticButton strength={0.13}>
              <Link href="#portfolio" className="lift-link inline-flex rounded-full border border-white/15 bg-white/8 px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white backdrop-blur-xl">
                View our approach
              </Link>
            </MagneticButton>
          </div>

          <div className="mt-12 grid max-w-2xl grid-cols-3 gap-3">
            {heroStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md">
                <p className="hot-gradient-text text-2xl font-extrabold sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div ref={panelRef} className="relative mx-auto w-full max-w-xl opacity-0">
          <div className="absolute inset-8 rounded-full border border-cyan-200/20 orbital-ring" />
          <div className="absolute inset-20 rounded-full border border-dashed border-amber-200/20 orbital-ring [animation-duration:32s] [animation-direction:reverse]" />
          <div className="premium-card scan-line relative min-h-[540px] rounded-[2.5rem] p-6 backdrop-blur-2xl sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-200">Marketing performance map</p>
                <h2 className="mt-2 text-xl font-extrabold text-white">Growth dashboard</h2>
              </div>
              <span className="rounded-full border border-lime-200/30 bg-lime-300/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-lime-200">Active</span>
            </div>

            <div className="relative mb-6 aspect-square rounded-full border border-white/10 bg-black/20 p-8">
              <div className="absolute inset-8 rounded-full border border-cyan-200/20" />
              <div className="absolute inset-20 rounded-full border border-amber-200/20" />
              <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-cyan-300 via-white to-lime-200 p-1 shadow-[0_0_70px_rgba(43,224,255,0.38)]">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-950 text-center text-sm font-extrabold uppercase tracking-[0.18em] text-white">Growth<br />Core</div>
              </div>
              {orbitItems.map((item, index) => {
                const angle = (index / orbitItems.length) * Math.PI * 2;
                const x = 50 + Math.cos(angle) * 39;
                const y = 50 + Math.sin(angle) * 39;
                return (
                  <span
                    key={item}
                    className="absolute rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-cyan-100 backdrop-blur-md"
                    style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                  >
                    {item}
                  </span>
                );
              })}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Signal label="Lead quality" value="94%" width="94%" />
              <Signal label="Creative velocity" value="8.7" width="87%" />
              <Signal label="Search visibility" value="71%" width="71%" />
              <Signal label="Conversion lift" value="3.2x" width="82%" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Signal({ label, value, width }: { label: string; value: string; width: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="mb-3 flex items-center justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{label}</p>
        <p className="text-sm font-extrabold text-white">{value}</p>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-lime-300" style={{ width }} />
      </div>
    </div>
  );
}

function ParticleField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particlePositions.map(([x, y], index) => (
        <span
          key={`${x}-${y}`}
          className="absolute h-1.5 w-1.5 rounded-full bg-cyan-200/60 shadow-[0_0_18px_rgba(43,224,255,0.8)] animate-pulse"
          style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${index * 0.15}s` }}
        />
      ))}
    </div>
  );
}

