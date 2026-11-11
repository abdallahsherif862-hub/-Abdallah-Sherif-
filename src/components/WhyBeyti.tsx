import React from 'react';
import { Language } from '../types.ts';
import { content } from '../translations.ts';
import { HeartHandshake, Zap, ShieldCheck, Clock, Users, Award } from 'lucide-react';

interface WhyBeytiProps {
  lang: Language;
}

export const WhyBeyti: React.FC<WhyBeytiProps> = ({ lang }) => {
  const t = content[lang].whyBeyti;
  const isArabic = lang === 'ar';

  const icons = [
    <HeartHandshake key="1" className="w-5 h-5" />,
    <Zap key="2" className="w-5 h-5" />,
    <ShieldCheck key="3" className="w-5 h-5" />,
    <Clock key="4" className="w-5 h-5" />,
    <Award key="5" className="w-5 h-5" />,
    <Users key="6" className="w-5 h-5" />,
  ];

  return (
    <section id="why-beyti" className="py-16 lg:py-24 bg-neutral-50/50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200/60 mb-4">
            <span>{t.kicker}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
            {t.title}
          </h2>
          <p className="mt-4 text-base text-neutral-600 leading-relaxed font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* 6-Pillar Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white border border-neutral-200 hover:border-emerald-300 transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800">
                    {icons[idx]}
                  </div>
                  <span className="font-mono text-xs font-bold text-neutral-300">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-neutral-900 leading-snug">
                  {pillar.title}
                </h3>

                <p className="mt-3 text-sm text-neutral-600 leading-relaxed font-normal">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                <span className="font-medium text-emerald-800">
                  {isArabic ? 'معيار بيتي المعتمد' : 'Beyti Standard'}
                </span>
                <span>
                  {isArabic ? 'ضمان بنسبة ١٠٠٪' : '100% Quality Assured'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
