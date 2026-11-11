export type Language = 'en' | 'ar';

export interface QuoteFormData {
  companyName: string;
  contactName: string;
  workEmail: string;
  phone: string;
  officeLocation: string;
  employeeCount: number;
  daysPerWeek: number;
  mealTier: 'essential' | 'executive' | 'balanced';
  preferredDeliveryTime: string;
  dietaryNotes: string;
  requestTastingSession: boolean;
}

export interface QuoteSubmissionResult extends QuoteFormData {
  quoteReference: string;
  submittedAt: string;
  estimatedPricePerMeal: number;
  estimatedMonthlyTotal: number;
}

export interface MenuItem {
  id: string;
  nameEn: string;
  nameAr: string;
  category: 'tajin' | 'molokhia' | 'classics' | 'balanced' | 'dessert';
  descriptionEn: string;
  descriptionAr: string;
  tagsEn: string[];
  tagsAr: string[];
  imageSrc?: string;
  calories?: string;
  highlightsEn: string[];
  highlightsAr: string[];
}

export interface Testimonial {
  id: string;
  authorEn: string;
  authorAr: string;
  roleEn: string;
  roleAr: string;
  companyEn: string;
  companyAr: string;
  locationEn: string;
  locationAr: string;
  teamSizeEn: string;
  teamSizeAr: string;
  quoteEn: string;
  quoteAr: string;
  metricEn: string;
  metricAr: string;
}

export interface FaqItem {
  id: string;
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
  category: 'logistics' | 'food' | 'billing' | 'customization';
}
