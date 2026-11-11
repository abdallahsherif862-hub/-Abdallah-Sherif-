import React from 'react';
import { Language } from '../types.ts';
import { content } from '../translations.ts';
import { Quote, Sparkles } from 'lucide-react';

interface TestimonialsProps {
  lang: Language;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ lang }) => {
  const t = content[lang].testimonials;
  const isArabic = lang === 'ar';

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200/60 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t.kicker}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
            {t.title}
          </h2>
          <p className="mt-4 text-base text-neutral-600 leading-relaxed font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.items.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-neutral-50/70 border border-neutral-200/90 flex flex-col justify-between relative shadow-sm hover:border-emerald-300 transition-colors"
            >
              <div>
                <Quote className="w-8 h-8 text-emerald-900/20 mb-4" />
                <p className="text-sm text-neutral-700 leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-200/80 space-y-3">
                {/* Quantified Business Metric Badge */}
                <div className="text-[11px] font-semibold text-emerald-900 bg-emerald-100/70 py-1 px-2.5 rounded-md inline-block">
                  {item.metric}
                </div>

                <div>
                  <h4 className="text-sm font-bold text-neutral-900">
                    {item.author}
                  </h4>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {item.role} · <span className="font-semibold text-neutral-700">{item.company}</span>
                  </p>
                  <div className="text-[11px] text-neutral-400 mt-1 flex items-center gap-1.5">
                    <span>{item.location}</span>
                    <span>·</span>
                    <span className="font-mono">{item.teamSize}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
