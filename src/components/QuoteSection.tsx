import React, { useState, useEffect } from 'react';
import { Language, QuoteFormData, QuoteSubmissionResult } from '../types.ts';
import { content } from '../translations.ts';
import { Send, CheckCircle2, Building2, User, Mail, Phone, MapPin, Calendar, Clock, MessageSquare, Sparkles, MessageCircle } from 'lucide-react';

interface QuoteSectionProps {
  lang: Language;
  prefilledPlan?: {
    employeeCount: number;
    daysPerWeek: number;
    mealTier: 'essential' | 'executive' | 'balanced';
  } | null;
}

export const QuoteSection: React.FC<QuoteSectionProps> = ({
  lang,
  prefilledPlan,
}) => {
  const t = content[lang].quoteForm;
  const isArabic = lang === 'ar';

  const [formData, setFormData] = useState<QuoteFormData>({
    companyName: '',
    contactName: '',
    workEmail: '',
    phone: '',
    officeLocation: '',
    employeeCount: 30,
    daysPerWeek: 5,
    mealTier: 'essential',
    preferredDeliveryTime: '12:30 PM - 1:00 PM',
    dietaryNotes: '',
    requestTastingSession: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<QuoteSubmissionResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync when plan calculator passes parameters
  useEffect(() => {
    if (prefilledPlan) {
      setFormData((prev) => ({
        ...prev,
        employeeCount: prefilledPlan.employeeCount,
        daysPerWeek: prefilledPlan.daysPerWeek,
        mealTier: prefilledPlan.mealTier,
      }));
    }
  }, [prefilledPlan]);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.companyName.trim()) {
      errs.companyName = isArabic ? 'يرجى كتابة اسم الشركة' : 'Company name is required';
    }
    if (!formData.contactName.trim()) {
      errs.contactName = isArabic ? 'يرجى كتابة اسم المسؤول للتنسيق' : 'Contact name is required';
    }
    if (!formData.workEmail.trim() || !formData.workEmail.includes('@')) {
      errs.workEmail = isArabic ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Valid work email is required';
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      errs.phone = isArabic ? 'يرجى إدخال رقم هاتف صحيح' : 'Valid phone or WhatsApp number is required';
    }
    if (!formData.officeLocation || formData.officeLocation === t.locations[0]) {
      errs.officeLocation = isArabic ? 'يرجى تحديد موقع مقر الشركة' : 'Please select your office location';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const tierRates = { essential: 145, executive: 195, balanced: 170 };
    const pricePerMeal = tierRates[formData.mealTier];
    const estimatedMeals = Math.round(formData.employeeCount * formData.daysPerWeek * 4.33);
    const estimatedMonthly = estimatedMeals * pricePerMeal;
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const quoteRef = `BYT-${new Date().getFullYear()}-${randomCode}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionResult({
        ...formData,
        quoteReference: quoteRef,
        submittedAt: new Date().toLocaleDateString(isArabic ? 'ar-EG' : 'en-US'),
        estimatedPricePerMeal: pricePerMeal,
        estimatedMonthlyTotal: estimatedMonthly,
      });
    }, 700);
  };

  const handleReset = () => {
    setSubmissionResult(null);
    setFormData({
      companyName: '',
      contactName: '',
      workEmail: '',
      phone: '',
      officeLocation: '',
      employeeCount: 30,
      daysPerWeek: 5,
      mealTier: 'essential',
      preferredDeliveryTime: '12:30 PM - 1:00 PM',
      dietaryNotes: '',
      requestTastingSession: true,
    });
    setErrors({});
  };

  return (
    <section id="quote-section" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200/60 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>{isArabic ? 'عرض سعر رسمي فوري' : 'Corporate Inquiries'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight">
            {t.sectionTitle}
          </h2>
          <p className="mt-4 text-base text-neutral-600 leading-relaxed font-normal">
            {t.sectionSubtitle}
          </p>
        </div>

        {submissionResult ? (
          /* Submission Success State */
          <div className="max-w-2xl mx-auto bg-neutral-50 rounded-3xl p-8 sm:p-12 border border-neutral-200 shadow-lg text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-extrabold text-neutral-900 tracking-tight">
              {t.successTitle}
            </h3>

            <p className="mt-3 text-sm text-neutral-600 leading-relaxed max-w-lg mx-auto">
              {t.successDesc}
            </p>

            {/* Reference ID card */}
            <div className="mt-8 p-6 bg-white rounded-2xl border border-neutral-200 shadow-sm text-start space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <span className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">
                  {t.referenceLabel}
                </span>
                <span className="font-mono text-base font-extrabold text-emerald-800">
                  {submissionResult.quoteReference}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs text-neutral-600 pt-1">
                <div>
                  <span className="text-neutral-400 block">{t.companyName}</span>
                  <span className="font-bold text-neutral-900">{submissionResult.companyName}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block">{t.contactName}</span>
                  <span className="font-bold text-neutral-900">{submissionResult.contactName}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block">{t.employeeCount}</span>
                  <span className="font-bold text-neutral-900 font-mono">{submissionResult.employeeCount} {isArabic ? 'موظف' : 'staff'}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block">{t.officeLocation}</span>
                  <span className="font-bold text-neutral-900">{submissionResult.officeLocation}</span>
                </div>
              </div>

              {submissionResult.requestTastingSession && (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs font-semibold text-emerald-900 flex items-center gap-2">
                  <span>★</span>
                  <span>{isArabic ? 'تم طلب جلسة تذوق ساخنة مسبقة في مقر الشركة' : 'Complimentary office tasting session requested'}</span>
                </div>
              )}
            </div>

            {/* Direct WhatsApp Action */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://wa.me/201004567890?text=${encodeURIComponent(
                  `Hello Beyti Corporate Team, I just submitted a quote request #${submissionResult.quoteReference} for ${submissionResult.companyName} (${submissionResult.employeeCount} employees).`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.whatsappDirect}</span>
              </a>

              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-3.5 text-xs sm:text-sm font-semibold text-neutral-700 hover:text-neutral-900 bg-neutral-200/80 hover:bg-neutral-200 rounded-xl transition-colors"
              >
                {t.resetBtn}
              </button>
            </div>
          </div>
        ) : (
          /* Active Form */
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-neutral-50 p-6 sm:p-10 lg:p-12 rounded-3xl border border-neutral-200 shadow-sm"
          >
            {/* Form Fields: 8 columns */}
            <div className="lg:col-span-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Company Name */}
                <div>
                  <label className="text-xs font-bold text-neutral-800 block mb-1.5">
                    {t.companyName} <span className="text-emerald-700 font-bold">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-neutral-400">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder={t.companyNamePlaceholder}
                      className="w-full ps-10 pe-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition-all text-neutral-900"
                    />
                  </div>
                  {errors.companyName && (
                    <span className="text-[11px] text-emerald-800 font-medium mt-1 block">{errors.companyName}</span>
                  )}
                </div>

                {/* Contact Name */}
                <div>
                  <label className="text-xs font-bold text-neutral-800 block mb-1.5">
                    {t.contactName} <span className="text-emerald-700 font-bold">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-neutral-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      placeholder={t.contactNamePlaceholder}
                      className="w-full ps-10 pe-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition-all text-neutral-900"
                    />
                  </div>
                  {errors.contactName && (
                    <span className="text-[11px] text-emerald-800 font-medium mt-1 block">{errors.contactName}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Work Email */}
                <div>
                  <label className="text-xs font-bold text-neutral-800 block mb-1.5">
                    {t.workEmail} <span className="text-emerald-700 font-bold">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-neutral-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      placeholder={t.workEmailPlaceholder}
                      className="w-full ps-10 pe-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition-all text-neutral-900"
                    />
                  </div>
                  {errors.workEmail && (
                    <span className="text-[11px] text-emerald-800 font-medium mt-1 block">{errors.workEmail}</span>
                  )}
                </div>

                {/* Direct Phone / WhatsApp */}
                <div>
                  <label className="text-xs font-bold text-neutral-800 block mb-1.5">
                    {t.phone} <span className="text-emerald-700 font-bold">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-neutral-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={t.phonePlaceholder}
                      className="w-full ps-10 pe-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition-all text-neutral-900"
                    />
                  </div>
                  {errors.phone && (
                    <span className="text-[11px] text-emerald-800 font-medium mt-1 block">{errors.phone}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Office Location */}
                <div>
                  <label className="text-xs font-bold text-neutral-800 block mb-1.5">
                    {t.officeLocation} <span className="text-emerald-700 font-bold">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-neutral-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <select
                      value={formData.officeLocation}
                      onChange={(e) => setFormData({ ...formData, officeLocation: e.target.value })}
                      className="w-full ps-10 pe-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition-all text-neutral-900"
                    >
                      {t.locations.map((loc, i) => (
                        <option key={i} value={i === 0 ? '' : loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.officeLocation && (
                    <span className="text-[11px] text-emerald-800 font-medium mt-1 block">{errors.officeLocation}</span>
                  )}
                </div>

                {/* Delivery Time Window */}
                <div>
                  <label className="text-xs font-bold text-neutral-800 block mb-1.5">
                    {t.preferredDeliveryTime}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-neutral-400">
                      <Clock className="w-4 h-4" />
                    </div>
                    <select
                      value={formData.preferredDeliveryTime}
                      onChange={(e) => setFormData({ ...formData, preferredDeliveryTime: e.target.value })}
                      className="w-full ps-10 pe-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition-all text-neutral-900"
                    >
                      {t.deliveryTimes.map((time, i) => (
                        <option key={i} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Service Specifications Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2 border-t border-neutral-200">
                {/* Employee Count Input */}
                <div>
                  <label className="text-xs font-bold text-neutral-800 block mb-1.5">
                    {t.employeeCount}
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="500"
                    value={formData.employeeCount}
                    onChange={(e) => setFormData({ ...formData, employeeCount: Math.max(5, Number(e.target.value)) })}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 text-neutral-900 font-mono tabular-nums"
                  />
                </div>

                {/* Days Per Week */}
                <div>
                  <label className="text-xs font-bold text-neutral-800 block mb-1.5">
                    {t.daysPerWeek}
                  </label>
                  <select
                    value={formData.daysPerWeek}
                    onChange={(e) => setFormData({ ...formData, daysPerWeek: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 text-neutral-900"
                  >
                    <option value={3}>3 {isArabic ? 'أيام أسبوعياً' : 'Days / Week'}</option>
                    <option value={4}>4 {isArabic ? 'أيام أسبوعياً' : 'Days / Week'}</option>
                    <option value={5}>5 {isArabic ? 'أيام أسبوعياً' : 'Days / Week'}</option>
                  </select>
                </div>

                {/* Meal Tier */}
                <div>
                  <label className="text-xs font-bold text-neutral-800 block mb-1.5">
                    {t.mealTier}
                  </label>
                  <select
                    value={formData.mealTier}
                    onChange={(e) => setFormData({ ...formData, mealTier: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 text-neutral-900"
                  >
                    <option value="essential">{isArabic ? 'الأساسي بلدي (طواجن وأرز)' : 'Essential Baladi'}</option>
                    <option value="executive">{isArabic ? 'التنفيذي المتكامل (وجبة كاملة + حلو)' : 'Executive Feast'}</option>
                    <option value="balanced">{isArabic ? 'متوازن وصحي (مشويات وألياف)' : 'Light & Balanced'}</option>
                  </select>
                </div>
              </div>

              {/* Special Notes */}
              <div>
                <label className="text-xs font-bold text-neutral-800 block mb-1.5">
                  {t.dietaryNotes}
                </label>
                <div className="relative">
                  <div className="absolute top-3 start-3.5 pointer-events-none text-neutral-400">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <textarea
                    rows={3}
                    value={formData.dietaryNotes}
                    onChange={(e) => setFormData({ ...formData, dietaryNotes: e.target.value })}
                    placeholder={t.dietaryNotesPlaceholder}
                    className="w-full ps-10 pe-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 transition-all text-neutral-900"
                  />
                </div>
              </div>

              {/* Free Tasting Checkbox */}
              <label className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50/80 border border-emerald-200/80 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.requestTastingSession}
                  onChange={(e) => setFormData({ ...formData, requestTastingSession: e.target.checked })}
                  className="mt-0.5 h-4 w-4 rounded border-emerald-300 text-emerald-800 focus:ring-emerald-700"
                />
                <span className="text-xs sm:text-sm font-semibold text-emerald-950 leading-relaxed">
                  {t.tastingSessionLabel}
                </span>
              </label>

              {/* Submit Action */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 text-sm sm:text-base font-bold text-white bg-emerald-800 hover:bg-emerald-900 active:scale-[0.99] rounded-xl shadow-md shadow-emerald-900/10 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span>{t.submitting}</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t.submitBtn}</span>
                  </>
                )}
              </button>
            </div>

            {/* Live Parameter Preview: 4 columns */}
            <div className="lg:col-span-4 bg-white p-7 rounded-2xl border border-neutral-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                  {t.estimatedSummaryTitle}
                </span>
                <h4 className="text-lg font-bold text-neutral-900">
                  {formData.companyName || (isArabic ? 'شركتكم الموقرة' : 'Your Organization')}
                </h4>

                <div className="mt-6 space-y-4 text-xs">
                  <div className="flex justify-between py-2 border-b border-neutral-100">
                    <span className="text-neutral-500">{t.employeeCount}</span>
                    <span className="font-mono font-bold text-neutral-900 tabular-nums">
                      {formData.employeeCount} {isArabic ? 'وجبة/يوم' : 'meals/day'}
                    </span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-neutral-100">
                    <span className="text-neutral-500">{t.daysPerWeek}</span>
                    <span className="font-bold text-neutral-900">
                      {formData.daysPerWeek} {isArabic ? 'أيام أسبوعياً' : 'days/week'}
                    </span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-neutral-100">
                    <span className="text-neutral-500">{t.mealTier}</span>
                    <span className="font-bold text-emerald-800">
                      {formData.mealTier === 'essential' && (isArabic ? 'الأساسي بلدي' : 'Essential')}
                      {formData.mealTier === 'executive' && (isArabic ? 'التنفيذي المتكامل' : 'Executive')}
                      {formData.mealTier === 'balanced' && (isArabic ? 'متوازن وصحي' : 'Balanced')}
                    </span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-neutral-100">
                    <span className="text-neutral-500">{t.preferredDeliveryTime}</span>
                    <span className="font-medium text-neutral-800">
                      {formData.preferredDeliveryTime}
                    </span>
                  </div>

                  <div className="pt-4">
                    <span className="text-neutral-500 block mb-1">
                      {isArabic ? 'إجمالي الوجبات التقديري' : 'Est. Monthly Volume'}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-2xl font-extrabold text-neutral-900 tabular-nums">
                        ~{Math.round(formData.employeeCount * formData.daysPerWeek * 4.33).toLocaleString()}
                      </span>
                      <span className="text-xs text-neutral-500">
                        {isArabic ? 'وجبة شهرياً' : 'meals/month'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/60 text-[11px] text-emerald-900 leading-relaxed">
                {isArabic
                  ? 'يتواصل معكم مدير حسابات الشركات لمطابقة تفاصيل العقد والتحقق من التفضيلات وجدولة تجربة التذوق.'
                  : 'An enterprise account specialist will review these parameters, arrange menu samples, and issue your official commercial quote.'}
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
