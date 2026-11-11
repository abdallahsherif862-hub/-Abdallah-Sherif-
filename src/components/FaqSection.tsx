import React, { useState } from 'react';
import { Language } from '../types.ts';
import { content } from '../translations.ts';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqSectionProps {
  lang: Language;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ lang }) => {
  const t = content[lang].faq;
  const isArabic = lang === 'ar';
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-neutral-50/50 border-b border-neutral-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200/60 mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t.kicker}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight">
            {t.title}
          </h2>
          <p className="mt-4 text-base text-neutral-600 leading-relaxed font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {t.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-neutral-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 sm:p-6 text-start flex items-center justify-between gap-4 hover:bg-neutral-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-neutral-900 leading-snug">
                    {item.q}
                  </span>
                  <div
                    className={`p-1.5 rounded-lg bg-neutral-100 text-neutral-600 shrink-0 transform transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-emerald-100 text-emerald-900' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
