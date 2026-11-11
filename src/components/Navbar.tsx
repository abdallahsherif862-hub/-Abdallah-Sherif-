import React, { useState } from 'react';
import { Logo } from './Logo.tsx';
import { Language } from '../types.ts';
import { content } from '../translations.ts';
import { Globe, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onRequestQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  onRequestQuote,
}) => {
  const t = content[lang].nav;
  const isArabic = lang === 'ar';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: t.menu, href: '#menu' },
    { label: t.howItWorks, href: '#how-it-works' },
    { label: t.calculator, href: '#calculator' },
    { label: t.whyBeyti, href: '#why-beyti' },
    { label: t.faq, href: '#faq' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strictly compliant 3-zone layout */}
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#"
            className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-lg"
            aria-label="Beyti Home"
          >
            <Logo size="md" isArabic={isArabic} />
          </a>

          {/* Zone 2: 4-5 Clean Single-Line Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-neutral-600">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 py-1 relative group"
              >
                {link.label}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-emerald-700 scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action + Language Selector */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language Switcher Button */}
            <button
              onClick={onToggleLang}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
              title={isArabic ? 'Switch to English' : 'التحويل إلى العربية'}
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-neutral-500" />
              <span>{isArabic ? 'English' : 'عربي'}</span>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onRequestQuote}
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-emerald-800 hover:bg-emerald-900 active:scale-[0.98] rounded-xl shadow-sm transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              <span>{t.cta}</span>
              <ArrowUpRight className={`w-4 h-4 ${isArabic ? 'rotate-[-90deg]' : ''}`} />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-neutral-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-3 py-2.5 rounded-lg text-sm font-semibold text-neutral-700 hover:bg-neutral-100 hover:text-emerald-800 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-neutral-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestQuote();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold text-white bg-emerald-800 rounded-xl"
            >
              <span>{t.cta}</span>
              <ArrowUpRight className={`w-4 h-4 ${isArabic ? 'rotate-[-90deg]' : ''}`} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
