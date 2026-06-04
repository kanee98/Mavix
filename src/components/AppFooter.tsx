'use client';

import Image from 'next/image';
import Link from 'next/link';

export function AppFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-white/10 bg-[#030407] py-10" role="contentinfo" aria-label="Site footer">
      <div className="absolute inset-0 campaign-grid opacity-25" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="flex max-w-2xl items-start gap-4">
            <Image
              src="/images/logo_no_bg.png"
              alt="Mavix logo"
              width={72}
              height={72}
              className="mt-1 h-16 w-16 shrink-0 object-contain drop-shadow-[0_14px_30px_rgba(43,224,255,0.18)]"
            />
            <div>
              <p className="text-3xl font-extrabold tracking-[-0.05em] text-white">Mavix</p>
              <p className="mt-2 max-w-xl text-slate-400">Marvelous Infinite Experience for brands that need stronger digital presence, smarter campaigns, and measurable marketing performance.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3" aria-label="Mavix social links">
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
        <div className="flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row">
          <p>&copy; {year} Mavix Digital Marketing, Sri Lanka. All rights reserved.</p>
          <p>Designed and built by <Link href="https://fusionlabz.lk" target="_blank" className="text-cyan-200 hover:text-cyan-100">FusionLabz.lk</Link></p>
        </div>
      </div>
    </footer>
  );
}
