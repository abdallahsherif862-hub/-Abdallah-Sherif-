import React from 'react';
import { Language } from '../types.ts';
import { content } from '../translations.ts';
import { ArrowUpRight, Sparkles, ShieldCheck, Clock, UtensilsCrossed } from 'lucide-react';

interface HeroProps {
  lang: Language;
  onRequestQuote: () => void;
  onExploreMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  onRequestQuote,
  onExploreMenu,
}) => {
  const t = content[lang].hero;
  const isArabic = lang === 'ar';

  return (
    <section className="relative overflow-hidden bg-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Proposition, Value & Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Editorial kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-emerald-800 bg-emerald-50/80 px-3 py-1 rounded-md border border-emerald-200/60">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>{t.kicker}</span>
            </div>

            {/* Dominant Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 leading-[1.18] text-balance">
              {t.title}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl font-normal">
              {t.subtitle}
            </p>

            {/* Free Tasting Banner Card */}
            <div className="flex items-center gap-3 p-3.5 bg-emerald-50/90 rounded-xl border border-emerald-200/80 text-emerald-950 text-xs sm:text-sm font-medium">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-800 text-white font-bold text-xs">
                ★
              </span>
              <span>{t.freeTastingBadge}</span>
            </div>

            {/* Primary & Secondary Action Pair */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onRequestQuote}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold text-white bg-emerald-800 hover:bg-emerald-900 active:scale-[0.98] rounded-xl shadow-md shadow-emerald-900/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
              >
                <span>{t.primaryCta}</span>
                <ArrowUpRight className={`w-4 h-4 ${isArabic ? 'rotate-[-90deg]' : ''}`} />
              </button>

              <button
                onClick={onExploreMenu}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 active:scale-[0.98] rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
              >
                <UtensilsCrossed className="w-4 h-4 text-neutral-500" />
                <span>{t.secondaryCta}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-200 shadow-xl bg-neutral-100 group">
              <img
                src="/src/assets/images/hero_corporate_lunch_1794367546943.jpg"
                alt={isArabic ? 'غداء عمل مصري أصيل من بيتي في مقر شركة' : 'Authentic Egyptian corporate lunch spread by Beyti in Cairo office'}
                className="w-full h-[360px] sm:h-[440px] lg:h-[480px] object-cover object-center transform group-hover:scale-102 transition-transform duration-500"
                loading="eager"
                referrerPolicy="no-referrer"
              />

              {/* Discreet Caption Tag */}
              <div className="absolute bottom-4 inset-x-4 p-3 rounded-xl bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-md flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0" />
                  <span className="text-xs font-bold text-neutral-900">
                    {isArabic ? 'وجبات اليوم: طاجن تورلي فخار + ملوخية وأرز مصري' : 'Today: Slow-Cooked Clay Tajin + Fresh Molokhia & Rice'}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-800 whitespace-nowrap">
                  {isArabic ? 'جاهز للتناول' : 'Ready to Serve'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Quantitative KPI Proof Strip */}
        <div className="mt-14 pt-10 border-t border-neutral-200 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-neutral-50 border border-neutral-200/70">
            <div className="p-2.5 rounded-lg bg-emerald-100 text-emerald-900 shrink-0">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-neutral-900 tracking-tight">
                {t.metrics.fresh}
              </div>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                {t.metrics.freshDesc}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-neutral-50 border border-neutral-200/70">
            <div className="p-2.5 rounded-lg bg-emerald-100 text-emerald-900 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-neutral-900 tracking-tight">
                {t.metrics.punctual}
              </div>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                {t.metrics.punctualDesc}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-neutral-50 border border-neutral-200/70">
            <div className="p-2.5 rounded-lg bg-emerald-100 text-emerald-900 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-neutral-900 tracking-tight">
                {t.metrics.clients}
              </div>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                {t.metrics.clientsDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
