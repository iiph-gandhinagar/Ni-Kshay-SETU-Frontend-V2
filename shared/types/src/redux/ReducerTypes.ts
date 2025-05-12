import {
  ActionTypes,
  AppConfigType,
  Urls,
} from '@nikshay-setu-v3-monorepo/constants';
import { ChatScreen } from '../screens/ChatScreenTypes';

import { AlgorithmsTypes } from '../screens/AlgorithmsTypes';
import { FeedbackTypes } from '../screens/FeedbackTypes';
import { HomePageTypes } from '../screens/HomeScreenTypes';
import { KnowledgeConnectType } from '../screens/KnowledgeBaseTypes';
import { LandingPageTypes } from '../screens/LandingTypes';
import {
  AllSubscriberListResponse,
  SubscriberTaskProgress,
} from '../screens/LeaderboardTypes';
import { Query2COEDataType } from '../screens/Query2COETypes';
import { HealthFacilityList } from '../screens/ReferralHealthFacilities';
import { ResourceMaterialModule } from '../screens/ResourceMaterialsTypes';
import { UserProfileApiResponse } from '../screens/UserTypes';
import { ResponsePayload } from './ActionTypes';
import { UserResponsePayload } from './SagaTypes';

export interface UserState {
  user: UserResponsePayload | null;
  error: Error | null;
}
export type CadreByTypesType = {
  _id: string;
  cadreGroup: string;
  cadreType: string;
  id: number;
  title: string;
  updatedAt: string;
};
export type DropDownObj = {
  label: string;
  value: string;
  _id?: string;
  title?: string;
};
export type DropdownOptionType = Array<DropDownObj> | [];
export type KnownErrorType =
  | null
  | string
  | object
  | { statusCode: number | 'ERR_NETWORK'; message: string };
export interface ReducerData {
  chatScreen: ChatScreen;
  appTranslations: AppConfigType;
  user_profile: UserProfileApiResponse | undefined;
  referral_health_facility?: HealthFacilityList | undefined;
  knowledgeConnect: KnowledgeConnectType;
  query2coe: Query2COEDataType;
  homeScreen: HomePageTypes;
  feedback: { all_feedback: FeedbackTypes[] | undefined };
  resource_material: {
    resource_material_by_parent: ResourceMaterialModule[] | undefined;
  };
  leaderboard: {
    subscriber_progress: SubscriberTaskProgress | undefined;
    all_subscriber_progress: AllSubscriberListResponse | undefined;
  };
  algorithms: AlgorithmsTypes;
  landingPage: LandingPageTypes;
  dropdownOptions: {
    country: DropdownOptionType;
    cadresByTypes: DropdownOptionType;
    cadresTypes: DropdownOptionType;
    states: DropdownOptionType;
    districts: DropdownOptionType;
    blocks: DropdownOptionType;
    healthFacilities: DropdownOptionType;
  };
}

export interface ReducerState {
  data: ReducerData;
  loadingApis: string[];
  logs: string[];
  error: KnownErrorType;
}

export interface RootReducerStates {
  appContext: ReducerState;
}
export interface ReducerActionType {
  type: ActionTypes;
  url?: keyof typeof Urls;
  payload: ResponsePayload;
}
