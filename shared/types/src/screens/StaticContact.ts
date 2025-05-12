import { TranslationType } from './LandingTypes';

export interface StaticFaqProps {
  _id: string;
  question: TranslationType;
  description: TranslationType;
  active: boolean;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}
export interface CadreWiseSubscribersProps {
  CadreName: string;
  TotalCadreCount: number;
  cadreId: string;
  Percentage: number;
}
export interface LevelWiseSubscribersProps {
  _id: string;
  TotalCadreCount: number;
  Percentage: number;
}
export interface ModuleUsageProps {
  ActivityCount: number;
  ModuleName: string;
}
export interface StateWiseCountProps {
  StateName: string;
  TotalSubscriberCount: number;
  state_id: string | number;
}
export interface DashboardProps {
  totalAssessment: number;
  totalActivities: number;
  totalSubscriber: number;
  cadreWiseSubscribers: Array<CadreWiseSubscribersProps>;
  levelWiseSubscribers: Array<LevelWiseSubscribersProps>;
  moduleUsage: Array<ModuleUsageProps>;
  stateWiseCount: Array<StateWiseCountProps>;
}
export interface ModuleListProps {
  _id: string;
  title: TranslationType;
  description: TranslationType;
  slug: string;
  image: string[];
  orderIndex: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StaticModuleProps {
  list: Array<ModuleListProps>;
  totalItems: number;
  currentPage: number;
  totalPages: number;
}
export interface MaterialListProps {
  _id: string;
  title: TranslationType;
  typeOfMaterials: string;
  material: string[];
  orderIndex: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface StaticMaterialProps {
  list: Array<MaterialListProps>;
  totalItems: number;
  currentPage: number;
  totalPages: number;
}
export interface ReleaseListProps {
  _id: string;
  slug: string;
  image: string[];
  orderIndex: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  feature: Array<TranslationType>;
  bugFix: Array<TranslationType>;
  date: string;
}
export interface StaticReleaseProps {
  list: Array<ReleaseListProps>;
  totalItems: number;
  currentPage: number;
  totalPages: number;
}
