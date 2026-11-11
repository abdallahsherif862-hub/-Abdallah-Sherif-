import React from 'react';
import { Language } from '../types.ts';
import { content } from '../translations.ts';
import { AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface ProblemSolutionProps {
  lang: Language;
  onRequestQuote: () => void;
}

export const ProblemSolution: React.FC<ProblemSolutionProps> = ({
  lang,
  onRequestQuote,
}) => {
  const t = content[lang].problemSolution;
  const isArabic = lang === 'ar';

  return (
    <section className="py-16 lg:py-24 bg-neutral-50/60 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight">
            {t.sectionTitle}
          </h2>
          <p className="mt-4 text-base text-neutral-600 leading-relaxed">
            {t.sectionSubtitle}
          </p>
        </div>

        {/* 2-Column Comparison Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Column 1: The Problem (Muted Corporate Slate/Stone Aesthetic) */}
          <div className="p-8 sm:p-10 rounded-2xl bg-white border border-neutral-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 pb-6 border-b border-neutral-100">
                <div className="p-2.5 rounded-xl bg-neutral-100 text-neutral-600">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">
                    {t.problemTitle}
                  </h3>
                  <span className="text-xs text-neutral-500 font-semibold">
                    {isArabic ? 'الوضع الراهن غير المنظم' : 'The Fragmented Status Quo'}
                  </span>
                </div>
              </div>

              <div className="mt-8 space-y-6">
                {t.problemPoints.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 text-xs font-bold mt-0.5">
                      ✕
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-neutral-900">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-sm text-neutral-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-100 text-xs text-neutral-500">
              {isArabic
                ? 'النتيجة: إرهاق مستمر للموظفين، فوضى إدارية، وتراجع في تركيز فريق العمل.'
                : 'Result: Wasted work hours, afternoon fatigue, and constant administrative friction.'}
            </div>
          </div>

          {/* Column 2: The Solution (Sophisticated Emerald / Forest Green Hero Card) */}
          <div className="p-8 sm:p-10 rounded-2xl bg-forest-950 text-white shadow-xl flex flex-col justify-between relative overflow-hidden">
            {/* Subtle decorative atmospheric glow */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-emerald-700/20 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 pb-6 border-b border-emerald-800/60">
                <div className="p-2.5 rounded-xl bg-emerald-800/80 text-emerald-200">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {t.solutionTitle}
                  </h3>
                  <span className="text-xs text-emerald-400 font-semibold">
                    {isArabic ? 'الشراكة المؤسسية المعتمدة' : 'The Certified Corporate Solution'}
                  </span>
                </div>
              </div>

              <div className="mt-8 space-y-6">
                {t.solutionPoints.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-emerald-950 text-xs font-bold mt-0.5">
                      ✓
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-emerald-100">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-sm text-emerald-200/80 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-6 border-t border-emerald-800/60 flex items-center justify-between">
              <span className="text-xs text-emerald-300 font-medium">
                {isArabic
                  ? 'جاهز لتجربة هذا التحول في شركتك؟'
                  : 'Ready to elevate your workplace lunches?'}
              </span>
              <button
                onClick={onRequestQuote}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-emerald-200 transition-colors"
              >
                <span>{isArabic ? 'اطلب عرض سعر الآن' : 'Request Quote Now'}</span>
                <ArrowRight className={`w-3.5 h-3.5 ${isArabic ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
