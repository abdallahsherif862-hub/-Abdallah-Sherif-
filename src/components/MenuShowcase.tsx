import React, { useState } from 'react';
import { Language, MenuItem } from '../types.ts';
import { content, sampleMenuItems } from '../translations.ts';
import { Sparkles, Utensils, Check, ArrowRight } from 'lucide-react';

interface MenuShowcaseProps {
  lang: Language;
  onRequestQuote: () => void;
}

export const MenuShowcase: React.FC<MenuShowcaseProps> = ({
  lang,
  onRequestQuote,
}) => {
  const t = content[lang].menu;
  const isArabic = lang === 'ar';
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const categories = [
    { id: 'all', label: t.categories.all },
    { id: 'tajin', label: t.categories.tajin },
    { id: 'molokhia', label: t.categories.molokhia },
    { id: 'classics', label: t.categories.classics },
    { id: 'balanced', label: t.categories.balanced },
    { id: 'dessert', label: t.categories.dessert },
  ];

  const filteredItems = activeCategory === 'all'
    ? sampleMenuItems
    : sampleMenuItems.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="py-16 lg:py-24 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
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

        {/* Interactive Segmented Filter Control */}
        <div className="flex items-center gap-2 p-1.5 bg-neutral-100 rounded-xl overflow-x-auto max-w-full scrollbar-none mb-10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/70'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Dishes Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col justify-between rounded-2xl bg-white border border-neutral-200 hover:border-emerald-600 transition-all hover:shadow-lg overflow-hidden"
            >
              <div>
                {/* Visual Image / Fallback Container */}
                <div className="relative h-56 bg-neutral-100 overflow-hidden">
                  {item.imageSrc ? (
                    <img
                      src={item.imageSrc}
                      alt={isArabic ? item.nameAr : item.nameEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-neutral-100 p-6 text-center">
                      <div className="p-3 rounded-full bg-emerald-100 text-emerald-800 mb-2">
                        <Utensils className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-semibold text-neutral-700">
                        {isArabic ? item.nameAr : item.nameEn}
                      </span>
                      <span className="text-[11px] text-neutral-400 mt-1">
                        {isArabic ? 'صورة إرشادية للطبق البلدي' : 'Authentic Egyptian Classic'}
                      </span>
                    </div>
                  )}

                  {/* Single Clean Tag in overlay */}
                  {item.calories && (
                    <div className="absolute top-3 end-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-sm text-white text-[11px] font-mono font-medium">
                      {item.calories}
                    </div>
                  )}
                </div>

                {/* Content Details */}
                <div className="p-6">
                  {/* Clean unboxed metadata tags separated by dots */}
                  <div className="flex items-center gap-2 text-xs font-medium text-emerald-800 mb-2">
                    {(isArabic ? item.tagsAr : item.tagsEn).map((tag: string, idx: number) => (
                      <React.Fragment key={idx}>
                        <span>{tag}</span>
                        {idx < (isArabic ? item.tagsAr : item.tagsEn).length - 1 && (
                          <span aria-hidden="true" className="text-neutral-300">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  <h3 className="text-lg font-bold text-neutral-900 group-hover:text-emerald-800 transition-colors leading-snug">
                    {isArabic ? item.nameAr : item.nameEn}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {isArabic ? item.descriptionAr : item.descriptionEn}
                  </p>

                  {/* Highlights Bullet List */}
                  <ul className="mt-4 space-y-1.5 pt-3 border-t border-neutral-100">
                    {(isArabic ? item.highlightsAr : item.highlightsEn).map((h: string, i: number) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-neutral-600">
                        <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => setSelectedItem(item)}
                  className="w-full py-2.5 px-4 text-xs font-bold text-neutral-800 bg-neutral-100 hover:bg-emerald-100 hover:text-emerald-950 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <span>{isArabic ? 'عرض تفاصيل المكونات والحصة' : 'View Ingredients & Catering Specs'}</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isArabic ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Corporate Menu Banner */}
        <div className="mt-14 p-8 rounded-2xl bg-gradient-to-r from-emerald-900 to-emerald-950 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 max-w-2xl">
            <h4 className="text-xl font-bold text-white">
              {t.ctaBox.title}
            </h4>
            <p className="text-sm text-emerald-200/90 leading-relaxed font-normal">
              {t.ctaBox.desc}
            </p>
          </div>
          <button
            onClick={onRequestQuote}
            className="px-6 py-3 text-xs sm:text-sm font-bold text-emerald-950 bg-emerald-100 hover:bg-white rounded-xl transition-all shadow-sm whitespace-nowrap shrink-0"
          >
            {t.ctaBox.btn}
          </button>
        </div>
      </div>

      {/* Dish Inspection Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-neutral-200">
            {selectedItem.imageSrc && (
              <div className="h-56 relative bg-neutral-100">
                <img
                  src={selectedItem.imageSrc}
                  alt={isArabic ? selectedItem.nameAr : selectedItem.nameEn}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-3 end-3 p-2 rounded-full bg-black/70 hover:bg-black text-white transition-colors"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>
            )}

            <div className="p-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-2">
                <span>{t.itemDetails.servings}</span>
                <span>·</span>
                <span>{t.itemDetails.freshGuarantee}</span>
              </div>

              <h3 className="text-xl font-bold text-neutral-900">
                {isArabic ? selectedItem.nameAr : selectedItem.nameEn}
              </h3>

              <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                {isArabic ? selectedItem.descriptionAr : selectedItem.descriptionEn}
              </p>

              <div className="mt-5 p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
                <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                  {isArabic ? 'مواصفات التقديم والتغليف' : 'Corporate Catering Specifications'}
                </h4>
                <ul className="space-y-1.5 text-xs text-neutral-600">
                  {(isArabic ? selectedItem.highlightsAr : selectedItem.highlightsEn).map((h: string, i: number) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 rounded-lg"
                >
                  {isArabic ? 'إغلاق' : 'Close'}
                </button>
                <button
                  onClick={() => {
                    setSelectedItem(null);
                    onRequestQuote();
                  }}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl"
                >
                  {isArabic ? 'طلب عرض سعر لهذه الوجبة' : 'Request Quote with this Dish'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
