'use client';

import { FormEvent, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { MagneticButton } from '@/components/ui/MagneticButton';

const fields = [
  { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name', autoComplete: 'name' },
  { id: 'email', label: 'Email', type: 'email', placeholder: 'you@company.com', autoComplete: 'email' },
  { id: 'phone', label: 'Phone number', type: 'tel', placeholder: '+94 77 123 4567', autoComplete: 'tel' },
  { id: 'goal', label: 'Growth goal', type: 'text', placeholder: 'More leads, better brand, higher ROAS...', autoComplete: 'off' },
];

export function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!formRef.current) return;

    setStatus('sending');
    setStatusMessage('Sending your consultation request...');

    try {
      const formData = new FormData(formRef.current);
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          goal: formData.get('goal'),
          message: formData.get('message'),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || 'Unable to submit request.');
      }

      formRef.current.reset();
      setFocused(null);
      setStatus('success');
      setStatusMessage(result?.message || 'Thank you. Your consultation request has been sent to Mavix.');
    } catch (error) {
      setStatus('error');
      setStatusMessage(
        error instanceof Error
          ? error.message
          : 'Sorry, your request could not be sent. Please contact us through WhatsApp or Facebook.'
      );
    }
  }

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden py-24" aria-labelledby="contact-heading">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(43,224,255,0.16),transparent_42rem)]" />
      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="contact-reveal flex flex-col rounded-[2.4rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl md:p-10">
          <div>
            <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.32em] text-amber-200">Book a strategy call</p>
            <h2 id="contact-heading" className="font-heading text-3xl font-extrabold leading-tight tracking-[-0.04em] sm:text-4xl md:text-5xl">
              Ready to elevate your digital presence?
            </h2>
            <p className="mt-7 text-base leading-8 text-slate-300 sm:text-lg">
              Partner with Mavix to build a stronger brand, attract qualified leads, and launch performance-focused campaigns across web, search, social, and paid media.
            </p>
          </div>

          <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-black/20 p-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-cyan-200">Prefer direct contact?</p>
            <div className="mt-4 flex gap-3">
              <a
                href="https://wa.me/94714074994"
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-[#25D366]/50 hover:bg-[#25D366]/10 hover:text-[#25D366]"
                aria-label="Message Mavix on WhatsApp"
                title="WhatsApp"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.5 0 .14 5.36.14 11.95c0 2.1.55 4.15 1.6 5.96L0 24l6.24-1.64a11.94 11.94 0 0 0 5.84 1.49h.01c6.58 0 11.94-5.36 11.94-11.95 0-3.19-1.24-6.19-3.51-8.42ZM12.09 21.83h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.7.97.99-3.61-.23-.37a9.87 9.87 0 0 1-1.52-5.28c0-5.47 4.45-9.93 9.93-9.93a9.86 9.86 0 0 1 7.02 2.91 9.87 9.87 0 0 1 2.91 7.02c-.01 5.48-4.46 9.88-9.98 9.88Zm5.44-7.43c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
                </svg>
              </a>
              <a
                href="https://web.facebook.com/MAVIXLk"
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-[#1877F2]/50 hover:bg-[#1877F2]/10 hover:text-[#1877F2]"
                aria-label="Visit Mavix on Facebook"
                title="Facebook"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.03 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.88v2.27h3.33l-.53 3.49h-2.8V24C19.61 23.08 24 18.09 24 12.07Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <form ref={formRef} className="contact-reveal premium-card rounded-[2.4rem] p-7 md:p-10" onSubmit={handleSubmit}>
          <div className="grid gap-5">
            {fields.map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} className="mb-2 block text-xs font-extrabold uppercase tracking-[0.18em] text-slate-300">{field.label}</label>
                <input
                  id={field.id}
                  type={field.type}
                  name={field.id}
                  required
                  autoComplete={field.autoComplete}
                  onFocus={() => setFocused(field.id)}
                  onBlur={() => setFocused(null)}
                  className={`w-full rounded-2xl border bg-black/20 px-5 py-4 text-white placeholder:text-slate-600 transition ${focused === field.id ? 'border-cyan-300/60 shadow-[0_0_35px_rgba(43,224,255,0.16)]' : 'border-white/10 hover:border-white/20'}`}
                  placeholder={field.placeholder}
                />
              </div>
            ))}
            <div>
              <label htmlFor="message" className="mb-2 block text-xs font-extrabold uppercase tracking-[0.18em] text-slate-300">Project notes</label>
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
              <button
                type="submit"
                disabled={status === 'sending'}
                className="lift-link w-full rounded-2xl border border-cyan-200/40 bg-cyan-300 px-7 py-4 text-sm font-extrabold uppercase tracking-[0.18em] text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'sending' ? 'Submitting...' : 'Request consultation'}
              </button>
            </MagneticButton>

            {statusMessage ? (
              <p
                className={`rounded-2xl border px-4 py-3 text-sm ${
                  status === 'success'
                    ? 'border-lime-300/30 bg-lime-300/10 text-lime-100'
                    : status === 'error'
                      ? 'border-rose-300/30 bg-rose-300/10 text-rose-100'
                      : 'border-cyan-300/30 bg-cyan-300/10 text-cyan-100'
                }`}
                role="status"
                aria-live="polite"
              >
                {statusMessage}
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}
