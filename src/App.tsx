import React, { useState, useEffect } from 'react';
import { Language } from './types.ts';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { ProblemSolution } from './components/ProblemSolution.tsx';
import { MenuShowcase } from './components/MenuShowcase.tsx';
import { HowItWorks } from './components/HowItWorks.tsx';
import { PlanCalculator } from './components/PlanCalculator.tsx';
import { WhyBeyti } from './components/WhyBeyti.tsx';
import { Testimonials } from './components/Testimonials.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { QuoteSection } from './components/QuoteSection.tsx';
import { Footer } from './components/Footer.tsx';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [prefilledPlan, setPrefilledPlan] = useState<{
    employeeCount: number;
    daysPerWeek: number;
    mealTier: 'essential' | 'executive' | 'balanced';
  } | null>(null);

  // Sync HTML direction and language attribute whenever user switches
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const scrollToQuote = () => {
    const quoteElement = document.getElementById('quote-section');
    if (quoteElement) {
      quoteElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToMenu = () => {
    const menuElement = document.getElementById('menu');
    if (menuElement) {
      menuElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyPlanToQuote = (plan: {
    employeeCount: number;
    daysPerWeek: number;
    mealTier: 'essential' | 'executive' | 'balanced';
  }) => {
    setPrefilledPlan(plan);
    scrollToQuote();
  };

  return (
    <div className={`min-h-screen bg-neutral-50 text-neutral-900 selection:bg-emerald-100 selection:text-emerald-900 ${lang === 'ar' ? 'font-arabic' : 'font-sans'}`}>
      {/* Top Bar Navigation */}
      <Navbar
        lang={lang}
        onToggleLang={toggleLanguage}
        onRequestQuote={scrollToQuote}
      />

      <main>
        {/* Hero Section */}
        <Hero
          lang={lang}
          onRequestQuote={scrollToQuote}
          onExploreMenu={scrollToMenu}
        />

        {/* Problem vs Solution: The Lunch Dilemma */}
        <ProblemSolution
          lang={lang}
          onRequestQuote={scrollToQuote}
        />

        {/* Authentic Egyptian Menu Showcase */}
        <MenuShowcase
          lang={lang}
          onRequestQuote={scrollToQuote}
        />

        {/* How It Works & Packaging Standard */}
        <HowItWorks
          lang={lang}
          onRequestQuote={scrollToQuote}
        />

        {/* Interactive Subscription Budget Calculator */}
        <PlanCalculator
          lang={lang}
          onApplyPlanToQuote={handleApplyPlanToQuote}
        />

        {/* Why Cairo Companies Choose Beyti */}
        <WhyBeyti
          lang={lang}
        />

        {/* Client Endorsements & Social Proof */}
        <Testimonials
          lang={lang}
        />

        {/* Frequently Asked Questions */}
        <FaqSection
          lang={lang}
        />

        {/* Primary Conversion Engine: Request a Quote */}
        <QuoteSection
          lang={lang}
          prefilledPlan={prefilledPlan}
        />
      </main>

      {/* Corporate B2B Footer */}
      <Footer
        lang={lang}
        onRequestQuote={scrollToQuote}
      />
    </div>
  );
}
