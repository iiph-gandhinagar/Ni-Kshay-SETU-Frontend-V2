import { Urls } from '@nikshay-setu-v3-monorepo/constants';
import { AppConfigDetails } from '../screens/AppConfig';
import {
  AssessmentProgressApiResponse,
  AssessmentResultApiResponse,
  StoreAssessmentResponseApiPayload,
  StoreAssessmentResponsePayload,
} from '../screens/AssessmentTypes';
import { AllBlogProps, BlogList } from '../screens/BlogsTypes';
import {
  ChatTopQuestionApiResponse,
  ConversationRecord,
  SearchSystemQuestionApiReq,
  SendIdsApiRequest,
} from '../screens/ChatScreenTypes';
import { QueryApiRequest } from '../screens/ContactUsTypes';
import {
  DiagnosisDependentApiResponse,
  DiagnosisMasterNodeApiResponse,
} from '../screens/DiagnosisTypes';
import {
  CourseApiResponse,
  KnowledgeBaseCourseApiResponse,
} from '../screens/KnowledgeBaseTypes';
import { WebHomePageProps } from '../screens/LandingTypes';
import {
  AllSubscriberListResponse,
  TopThreeUserType,
} from '../screens/LeaderboardTypes';
import {
  ManageTbApiRequest,
  PatientResponse,
} from '../screens/ManageTBScreenTypes';
import type {
  BlockApiResponse,
  CadreTypesApiResponse,
  CadresByTypesApiResponse,
  DefaultCadreTypesApiResponse,
  DistrictsApiResponse,
  GenerateOtpReqPayload2,
  GenerateOtpResponsePayload,
  HealthFacilityApiResponse,
  OtpVerificationApiResponse,
  StateApiResponse,
  UserValidationApiResponse,
} from '../screens/OnBoardingScreenTypes';
import {
  InstitutesDataApiRes,
  RaiseQueryPayload,
  TransferQueryBYSubApiRequest,
} from '../screens/Query2COETypes';
import { HealthFacilityList } from '../screens/ReferralHealthFacilities';
import {
  UserScreeningApiResponse,
  UserScreeningPayload,
} from '../screens/ScreeningScreen';
import {
  DashboardProps,
  MaterialListProps,
  ModuleListProps,
  ReleaseListProps,
  StaticFaqProps,
  StaticMaterialProps,
  StaticModuleProps,
  StaticReleaseProps,
} from '../screens/StaticContact';
import {
  SurveyList,
  SurveySubmissionPayload,
} from '../screens/SurveyFormTypes';
import {
  UserActivityApiPayload,
  UserProfileApiResponse,
} from '../screens/UserTypes';
import { UnauthorizedResponsePayload } from './SagaTypes';
// Union Types for Request and Response Payloads
export type RequestPayload =
  | GenerateOtpReqPayload2
  | ManageTbApiRequest
  | SendIdsApiRequest
  | UserActivityApiPayload
  | TransferQueryBYSubApiRequest
  | SearchSystemQuestionApiReq
  | RaiseQueryPayload
  | StoreAssessmentResponseApiPayload
  | StoreAssessmentResponsePayload
  | QueryApiRequest
  | null
  | unknown
  | SurveySubmissionPayload
  | UserScreeningPayload;

export type ResponsePayload =
  | UnauthorizedResponsePayload
  | GenerateOtpResponsePayload
  | UserValidationApiResponse
  | OtpVerificationApiResponse
  | AllSubscriberListResponse
  | CadresByTypesApiResponse
  | AppConfigDetails
  | TopThreeUserType
  | CadreTypesApiResponse
  | PatientResponse
  | DefaultCadreTypesApiResponse
  | CourseApiResponse
  | StateApiResponse
  | DiagnosisDependentApiResponse
  | UserProfileApiResponse
  | KnowledgeBaseCourseApiResponse
  | InstitutesDataApiRes
  | DistrictsApiResponse
  | DiagnosisMasterNodeApiResponse
  | BlockApiResponse
  | UserScreeningApiResponse
  | AssessmentProgressApiResponse
  | AssessmentResultApiResponse
  | HealthFacilityApiResponse
  | ChatTopQuestionApiResponse
  | SurveyList
  | null
  | { errorMessage: string }
  | { errors: string }
  | { logMessage: string }
  | string[]
  | []
  | HealthFacilityList
  | WebHomePageProps
  | AllBlogProps
  | BlogList
  | StaticFaqProps
  | DashboardProps
  | StaticModuleProps
  | ModuleListProps
  | MaterialListProps
  | StaticMaterialProps
  | ReleaseListProps
  | StaticReleaseProps
  | ConversationRecord;

export type HttpMethod = 'POST' | 'DELETE' | 'PATCH' | 'GET';
export interface ApiRequestPayload<T extends RequestPayload> {
  url?: keyof typeof Urls | 'CLEAR_DATA';
  data?: T;
  headers?: { [key: string]: string };
  method: HttpMethod;
  query?: string;
}
export interface ApiResponsePayload<T extends ResponsePayload> {
  code: number | string;
  data: T;
  statusCode?: number;
}
