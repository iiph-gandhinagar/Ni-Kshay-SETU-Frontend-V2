import { TranslationType } from './LandingTypes';

export interface BlogList {
  _id: string;
  title: TranslationType;
  slug: string;
  shortDescription: TranslationType;
  description: TranslationType;
  orderIndex: number;
  source: string;
  author: string;
  image1: string;
  image2: string;
  image3: string;
  active: boolean;
  keywords: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AllBlogProps {
  list: BlogList[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
}
