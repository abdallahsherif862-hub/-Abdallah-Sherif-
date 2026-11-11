import React, { useState } from 'react';
import { Language } from '../types.ts';
import { content } from '../translations.ts';
import { Calculator, Check, ArrowRight, Sparkles } from 'lucide-react';

interface PlanCalculatorProps {
  lang: Language;
  onApplyPlanToQuote: (plan: {
    employeeCount: number;
    daysPerWeek: number;
    mealTier: 'essential' | 'executive' | 'balanced';
  }) => void;
}

export const PlanCalculator: React.FC<PlanCalculatorProps> = ({
  lang,
  onApplyPlanToQuote,
}) => {
  const t = content[lang].calculator;
  const isArabic = lang === 'ar';

  const [employeeCount, setEmployeeCount] = useState<number>(35);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5);
  const [tier, setTier] = useState<'essential' | 'executive' | 'balanced'>('essential');

  // Rates in EGP per meal based on tier
  const tierRates = {
    essential: 145,
    executive: 195,
    balanced: 170,
  };

  // 4.33 weeks per month on average
  const monthlyMeals = Math.round(employeeCount * daysPerWeek * 4.33);
  const pricePerMeal = tierRates[tier];
  const monthlyTotal = monthlyMeals * pricePerMeal;

  const handleSendToQuote = () => {
    onApplyPlanToQuote({
      employeeCount,
      daysPerWeek,
      mealTier: tier,
    });
  };

  return (
    <section id="calculator" className="py-16 lg:py-24 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200/60 mb-4">
            <Calculator className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t.kicker}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight">
            {t.title}
          </h2>
          <p className="mt-4 text-base text-neutral-600 leading-relaxed font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* 2-Column Calculator Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-neutral-50/80 p-6 sm:p-10 rounded-3xl border border-neutral-200 shadow-sm">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-8">
            {/* Control 1: Employee Count Slider */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-bold text-neutral-900">
                  {t.teamSizeLabel}
                </label>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-2xl font-extrabold text-emerald-900 tabular-nums">
                    {employeeCount}
                  </span>
                  <span className="text-xs text-neutral-500 font-medium">
                    {isArabic ? 'موظف' : 'employees'}
                  </span>
                </div>
              </div>

              <input
                type="range"
                min="10"
                max="200"
                step="5"
                value={employeeCount}
                onChange={(e) => setEmployeeCount(Number(e.target.value))}
                className="w-full h-2.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-emerald-800"
              />

              <div className="flex justify-between text-[11px] text-neutral-400 font-mono mt-1">
                <span>10</span>
                <span>50</span>
                <span>100</span>
                <span>150</span>
                <span>200+</span>
              </div>
            </div>

            {/* Control 2: Days per Week Segmented Tabs */}
            <div>
              <label className="text-sm font-bold text-neutral-900 block mb-3">
                {t.daysPerWeekLabel}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[3, 4, 5].map((days) => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => setDaysPerWeek(days)}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
                      daysPerWeek === days
                        ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-100'
                    }`}
                  >
                    {isArabic ? `${days} أيام أسبوعياً` : `${days} Days / Week`}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 3: Subscription Tier Cards */}
            <div>
              <label className="text-sm font-bold text-neutral-900 block mb-3">
                {t.tierLabel}
              </label>
              <div className="space-y-3">
                {(['essential', 'executive', 'balanced'] as const).map((tierKey) => {
                  const tierData = t.tiers[tierKey];
                  const isSelected = tier === tierKey;
                  return (
                    <div
                      key={tierKey}
                      onClick={() => setTier(tierKey)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                        isSelected
                          ? 'bg-white border-emerald-800 ring-2 ring-emerald-800/10 shadow-sm'
                          : 'bg-white/70 border-neutral-200 hover:border-neutral-300 hover:bg-white'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected
                            ? 'border-emerald-800 bg-emerald-800 text-white'
                            : 'border-neutral-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-sm font-bold text-neutral-900">
                            {tierData.name}
                          </h4>
                          <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/50">
                            {tierData.badge}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                          {tierData.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Dynamic Budget Summary Card */}
          <div className="lg:col-span-5 bg-white p-7 sm:p-8 rounded-2xl border border-neutral-200 shadow-md space-y-6">
            <div className="border-b border-neutral-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                {isArabic ? 'تقدير الميزانية الشهرية' : 'Monthly Financial Estimate'}
              </span>
              <h3 className="text-xl font-extrabold text-neutral-900 mt-1">
                {t.tiers[tier].name}
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-neutral-600">{t.summary.estimatedTotalMeals}</span>
                <span className="font-mono font-bold text-neutral-900 tabular-nums">
                  ~{monthlyMeals.toLocaleString()} {isArabic ? 'وجبة' : 'meals'}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-neutral-600">{t.summary.estimatedPricePerMeal}</span>
                <span className="font-mono font-bold text-emerald-800 tabular-nums">
                  ~{pricePerMeal} {t.summary.currency}
                </span>
              </div>

              <div className="pt-4 border-t border-neutral-200">
                <span className="text-xs text-neutral-500 block mb-1">
                  {t.summary.estimatedMonthlyBudget}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-3xl font-extrabold text-neutral-900 tabular-nums">
                    {monthlyTotal.toLocaleString()}
                  </span>
                  <span className="text-sm font-bold text-neutral-700">
                    {t.summary.currency}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-neutral-400 leading-relaxed">
              {t.summary.disclaimer}
            </p>

            <button
              onClick={handleSendToQuote}
              className="w-full py-3.5 px-5 text-sm font-bold text-white bg-emerald-800 hover:bg-emerald-900 active:scale-[0.98] rounded-xl shadow-md shadow-emerald-900/10 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>{t.summary.cta}</span>
              <ArrowRight className={`w-4 h-4 ${isArabic ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
