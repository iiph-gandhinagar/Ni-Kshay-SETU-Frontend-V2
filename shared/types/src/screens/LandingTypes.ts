export type TranslationLang = 'en' | 'hi' | 'gu' | 'mr';
export type TranslationType = Partial<{ [key in TranslationLang]: string }> & {
  en: string;
};
export interface TestimonialsProps {
  _id: string;
  name: TranslationType;
  description: TranslationType;
  icon: string[];
  orderIndex: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface KeyFeaturesProps {
  icon: string[];
  backgroundIcon: string[];
  _id: string;
  id: number;
  title: TranslationType;
  description: TranslationType;
  orderIndex: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface WhatWeDoProps {
  coverImage: string[];
  _id: string;
  id: number;
  title: TranslationType;
  location: TranslationType;
  orderIndex: number;
  active: boolean;
  deletedAt: string;
  createdAt: string;
  updatedAt: string;
}
export interface WebHomePageProps {
  keyFeatures: Array<KeyFeaturesProps>;
  totalSubscriber: number;
  totalVisitor: number;
  totalAssessments: number;
  staticTestimonials: Array<TestimonialsProps>;
  whatWeDo: Array<WhatWeDoProps>;
}
export interface FaqProps {
  keyFeatures: Array<KeyFeaturesProps>;
  totalSubscriber: number;
  totalVisitor: number;
  totalAssessments: number;
  staticTestimonials: Array<TestimonialsProps>;
  whatWeDo: Array<WhatWeDoProps>;
}

export type LandingPageTypes =
  | { web_home_page?: WebHomePageProps | null | undefined }
  | undefined
  | null;
