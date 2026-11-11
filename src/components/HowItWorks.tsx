import React from 'react';
import { Language } from '../types.ts';
import { content } from '../translations.ts';
import { Sparkles, CheckCircle, PackageCheck, ThermometerSnowflake, FileText } from 'lucide-react';

interface HowItWorksProps {
  lang: Language;
  onRequestQuote: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({
  lang,
  onRequestQuote,
}) => {
  const t = content[lang].howItWorks;
  const isArabic = lang === 'ar';

  const stepIcons = [
    <Sparkles key="1" className="w-5 h-5" />,
    <FileText key="2" className="w-5 h-5" />,
    <ThermometerSnowflake key="3" className="w-5 h-5" />,
    <PackageCheck key="4" className="w-5 h-5" />,
  ];

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-neutral-50/50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200/60 mb-4">
            <span>{t.kicker}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight">
            {t.title}
          </h2>
          <p className="mt-4 text-base text-neutral-600 leading-relaxed font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {t.steps.map((item, index) => (
            <div
              key={item.step}
              className="relative p-7 rounded-2xl bg-white border border-neutral-200 hover:border-emerald-300 transition-all shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-extrabold text-emerald-900/30 font-mono">
                    {item.step}
                  </span>
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800">
                    {stepIcons[index]}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-neutral-900 leading-snug">
                  {item.title}
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>
                  {index === 0 && (isArabic ? 'بدون التزام مسبق' : 'Zero Commitment')}
                  {index === 1 && (isArabic ? 'قوائم مخصصة بالكامل' : '100% Customized')}
                  {index === 2 && (isArabic ? 'حفظ حرارة مضمون' : 'Heat Retention Guaranteed')}
                  {index === 3 && (isArabic ? 'إدارة مرنة للميزانية' : 'Budget Predictability')}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Packaging & Hygiene Feature Spotlight */}
        <div className="rounded-2xl bg-white border border-neutral-200 overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5 relative h-72 lg:h-full min-h-[300px]">
            <img
              src="/src/assets/images/corporate_meal_box_packaging_1794367562218.jpg"
              alt={isArabic ? 'تغليف وجبات بيتي للشركات في علب حفظ حرارية أنيقة' : 'Beyti corporate meal packaging in thermal insulated dispensers'}
              className="w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:hidden" />
          </div>

          <div className="lg:col-span-7 p-8 sm:p-10 space-y-5">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider">
              <span>{isArabic ? 'معايير الجودة وسلامة الغذاء' : 'Food Safety & Environmental Commitment'}</span>
            </div>

            <h3 className="text-2xl font-extrabold text-neutral-900 tracking-tight">
              {t.packagingTitle}
            </h3>

            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              {t.packagingDesc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
              <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80">
                <span className="text-xs font-bold text-neutral-900 block">
                  {isArabic ? 'أختام أمان معقمة' : 'Tamper-Evident Seals'}
                </span>
                <span className="text-xs text-neutral-500 mt-1 block">
                  {isArabic ? 'ضمان وصول كل وجبة مغلقة ومحكمة من المطبخ لمكتبكم.' : 'Guarantees meals remain sealed from our kitchen to your desk.'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80">
                <span className="text-xs font-bold text-neutral-900 block">
                  {isArabic ? 'علب كرافت قابلة للتحلل' : 'Eco-Friendly Kraft Packaging'}
                </span>
                <span className="text-xs text-neutral-500 mt-1 block">
                  {isArabic ? 'خامات صديقة للبيئة مخصصة لحفظ حرارة وتماسك الأطعمة.' : '100% food-grade compostable materials that keep food hot.'}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onRequestQuote}
                className="px-6 py-3 text-xs sm:text-sm font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-colors shadow-sm"
              >
                {isArabic ? 'احجز جلسة تذوق في مقر شركتكم' : 'Book an Office Tasting Session'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
