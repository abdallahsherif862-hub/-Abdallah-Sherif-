import React from 'react';
import { Language } from '../types.ts';
import { content } from '../translations.ts';
import { Logo } from './Logo.tsx';
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';

interface FooterProps {
  lang: Language;
  onRequestQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onRequestQuote,
}) => {
  const t = content[lang].footer;
  const isArabic = lang === 'ar';

  return (
    <footer className="bg-neutral-900 text-neutral-300 pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-neutral-800">
          {/* Brand & Description: 4 cols */}
          <div className="lg:col-span-4 space-y-4">
            <Logo size="md" isArabic={isArabic} className="text-white brightness-110" />
            
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal pt-2">
              {t.description}
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <span>{t.tagline}</span>
            </div>
          </div>

          {/* Coverage Zones: 4 cols */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-100">
              {t.coverageTitle}
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              {t.coverageZones.map((zone, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>{zone}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Inquiries: 4 cols */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-100">
              {t.contactTitle}
            </h4>
            <div className="space-y-2.5 text-xs text-neutral-400">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${t.email}`} className="hover:text-white transition-colors">
                  {t.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${t.phone}`} className="hover:text-white transition-colors font-mono">
                  {t.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/201004567890`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-300 transition-colors font-mono"
                >
                  {t.whatsapp} (WhatsApp Business)
                </a>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{t.address}</span>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t.hours}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onRequestQuote}
                className="w-full py-2.5 px-4 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 rounded-xl transition-colors"
              >
                {isArabic ? 'اطلب عرض سعر رسمي لشركتك' : 'Request Official Company Quote'}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            <span>{t.copyright}</span>
          </div>
          <div className="text-[11px] text-neutral-600">
            <span>{t.disclaimer}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
