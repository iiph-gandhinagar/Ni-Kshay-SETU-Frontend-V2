import { ThemeProps } from '../themeAndAppConfig/ColorThemeTypes';

export interface FlashSimilarAppsInfo {
  _id: string;
  title: string;
  subTitle: string;
  href: string;
  hrefWeb: string;
  hrefIos: string;
  orderIndex: number;
  active: boolean;
  deletedAt?: string | null | undefined;
  createdAt?: string | null | undefined;
  updatedAt?: string | null | undefined;
  image: string;
}
export interface Plugins {
  _id: string;
  title: string;
}
export interface FlashNews {
  _id: string;
  title: string;
  source: string;
  href: string;
  orderIndex: number;
  active: boolean;
  createdAt?: string | null | undefined;
  updatedAt?: string | null | undefined;
  __v?: number;
}

export interface HomePageInfo {
  flashSimilarApps?: FlashSimilarAppsInfo[] | undefined;
  flashNews?: FlashNews[] | undefined;
  plugins?: Plugins[] | undefined;
}

export interface HomePageParamTypes {
  tokenRefresher: string;
  theme?: ThemeProps;
}
export interface HomePageTypes {
  home_page_info: HomePageInfo;
}
