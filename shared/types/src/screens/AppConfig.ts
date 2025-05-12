import { AppConfigType } from '@nikshay-setu-v3-monorepo/constants';

// Health Facility Mapping
interface HealthFacilityMapping {
  DMC: string;
  TRUNAT: string;
  CBNAAT: string;
  X_RAY: string;
  ICTC: string;
  LPA_Lab: string;
  CONFIRMATION_CENTER: string;
  Tobacco_Cessation_clinic: string;
  ANC_Clinic: string;
  Nutritional_Rehabilitation_centre: string;
  De_addiction_centres: string;
  ART_Centre: string;
  District_DRTB_Centre: string;
  NODAL_DRTB_CENTER: string;
  IRL: string;
  Pediatric_Care_Facility: string;
}

// Master CMS
interface MasterCms {
  _id: string;
  title: string;
  description: {
    en: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Language
interface Language {
  title: string;
  subTitle: string;
  code: string;
  imgUrl: string;
}

// Leaderboard Information
interface LeaderBoardInformation {
  _id: string;
  level: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isFinal: boolean;
  index: number;
}

// Root Type
export interface AppLangTypes {
  appLang?: 'en' | 'gu' | 'hi' | 'mr' | 'ta' | 'pa' | 'te' | 'kn' | string;
  appTranslations?: AppConfigType;
}
export interface AppConfigDetails {
  healthFacilityMapping: HealthFacilityMapping[];
  appTranslations: AppConfigType;
  masterCms: MasterCms[];
  language: Language[];
  leaderBoardInformation: LeaderBoardInformation[];
}
