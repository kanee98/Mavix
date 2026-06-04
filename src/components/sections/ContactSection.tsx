'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { MagneticButton } from '@/components/ui/MagneticButton';

const fields = [
  { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
  { id: 'email', label: 'Email', type: 'email', placeholder: 'you@company.com' },
  { id: 'goal', label: 'Growth goal', type: 'text', placeholder: 'More leads, better brand, higher ROAS...' },
];

export function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [focused, setFocused] = useState<string | null>(null);

  useGSAP(
    () => {
      const items = ref.current?.querySelectorAll('.contact-reveal');
      if (!items?.length) return;
      gsap.fromTo(items, { opacity: 0, y: 40 }, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%', toggleActions: 'play none none none' },
      });
    },
    { scope: ref }
  );

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden py-28" aria-labelledby="contact-heading">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(43,224,255,0.16),transparent_42rem)]" />
      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="contact-reveal flex flex-col justify-between rounded-[2.4rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl md:p-10">
          <div>
            <p className="mb-4 text-sm font-black uppercase tracking-[0.34em] text-amber-200">Book a strategy call</p>
            <h2 id="contact-heading" className="font-heading text-3xl font-extrabold leading-tight tracking-[-0.04em] sm:text-4xl md:text-5xl">
              Ready to elevate your digital presence?
            </h2>
            <p className="mt-7 text-lg leading-8 text-slate-300">
              Partner with Mavix to build a stronger brand, attract qualified leads, and launch performance-focused campaigns across web, search, social, and paid media.
            </p>
          </div>
          <div className="mt-10 space-y-3 text-sm text-slate-300">
            <a href="tel:+94714074994" className="block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-200/40 hover:text-cyan-100">Call: +94 71 407 4994</a>
            <a href="https://web.facebook.com/MAVIXLk" target="_blank" rel="noopener noreferrer" className="block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-200/40 hover:text-cyan-100">Message us on Facebook</a>
          </div>
        </div>

        <form ref={formRef} className="contact-reveal premium-card rounded-[2.4rem] p-7 md:p-10" onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-5">
            {fields.map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} className="mb-2 block text-sm font-black uppercase tracking-[0.18em] text-slate-300">{field.label}</label>
                <input
                  id={field.id}
                  type={field.type}
                  name={field.id}
                  required
                  onFocus={() => setFocused(field.id)}
                  onBlur={() => setFocused(null)}
                  className={`w-full rounded-2xl border bg-black/20 px-5 py-4 text-white placeholder:text-slate-600 transition ${focused === field.id ? 'border-cyan-300/60 shadow-[0_0_35px_rgba(43,224,255,0.16)]' : 'border-white/10 hover:border-white/20'}`}
                  placeholder={field.placeholder}
                />
              </div>
            ))}
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-black uppercase tracking-[0.18em] text-slate-300">Project notes</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
                className={`w-full resize-none rounded-2xl border bg-black/20 px-5 py-4 text-white placeholder:text-slate-600 transition ${focused === 'message' ? 'border-cyan-300/60 shadow-[0_0_35px_rgba(43,224,255,0.16)]' : 'border-white/10 hover:border-white/20'}`}
                placeholder="Tell us about your business, goals, current marketing challenges, and the services you are interested in."
              />
            </div>
            <MagneticButton strength={0.1} className="w-full">
              <button type="submit" className="lift-link w-full rounded-2xl border border-cyan-200/40 bg-cyan-300 px-7 py-4 text-sm font-black uppercase tracking-[0.18em] text-slate-950">
                Build my growth plan
              </button>
            </MagneticButton>
          </div>
        </form>
      </div>
    </section>
  );
}

