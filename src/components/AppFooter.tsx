'use client';

import Link from 'next/link';

export function AppFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-white/10 bg-[#030407] py-10" role="contentinfo" aria-label="Site footer">
      <div className="absolute inset-0 campaign-grid opacity-25" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-3xl font-black tracking-[-0.05em] text-white">Mavix</p>
            <p className="mt-2 max-w-xl text-slate-400">Marvelous Infinite Experience for brands that need stronger digital presence, smarter campaigns, and measurable marketing performance.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="tel:+94714074994" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-slate-300 transition hover:border-cyan-200/40 hover:text-cyan-100">+94 71 407 4994</a>
            <a href="https://web.facebook.com/MAVIXLk" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-slate-300 transition hover:border-cyan-200/40 hover:text-cyan-100">Facebook</a>
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

