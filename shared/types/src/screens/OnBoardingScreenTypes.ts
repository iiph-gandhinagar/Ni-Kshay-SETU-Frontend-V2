import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FormikErrors, FormikTouched, FormikValues } from 'formik';
import { Animated } from 'react-native';
import { Dispatch, UnknownAction } from 'redux';
import { RootStackParamList } from '../rootStack/RouteStackTypes';

export type BoardingScreenProps = NativeStackScreenProps<RootStackParamList>;

export interface GenerateOtpReqPayload2 {
  phoneNo?: string;
  email?: string;
}

export interface GenerateOtpResponsePayload {
  code: number;
  message: string;
}
export interface UserRequestPayload {
  query?: string;
  body?: object;
}
export interface CallBack<T> {
  (code: number, response: T): void;
}

type CallBack1 = (status: number, response: string | object) => void;

export interface UserSagaTypes {
  requestPayload: UserRequestPayload;
  callBack?: CallBack1;
}
export interface UserSagaTypes {
  requestPayload: UserRequestPayload;
  callBack?: CallBack1;
}

export interface UserValidationPayload {
  phoneNo?: string;
  email?: string;
}
export interface UserValidationTESTPayload {
  some?: string;
  email?: string;
}
export interface UserNumValidationPayload {
  phoneNo: string;
}

export interface UserValidationPayloadSagaTypes {
  requestPayload: UserValidationPayload;
  callBack?: CallBack1;
  type: string;
}
export interface UserNumValidationPayloadSagaTypes {
  requestPayload: UserNumValidationPayload;
  callBack?: CallBack1;
  type: string;
}

export interface UserLoginPayload {
  phoneNo?: string;
  email?: string;
  otp: number;
}

export interface OtpVerificationPayload {
  phoneNo?: string;
  email?: string;
  otp: number;
}
export interface UserProfilePayload {
  accessToken: string;
  userId: string;
}
export interface GenerateOtpReqPayload {
  phoneNo?: string;
  email?: string;
}

export interface UserLoginPayloadSagaTypes {
  requestPayload: UserLoginPayload;
  callBack?: CallBack1;
  type: string;
}

export interface GenerateOtpReqPayloadSagaTypes {
  generateOtpReqPayload: GenerateOtpReqPayload;
  callBack?: CallBack1;
  type: string;
}

//
export interface UpdateUserApiReq {
  name?: string | undefined | null;
  email?: string | undefined | null;
  phoneNo?: string | undefined | null;
  cadreType?: string | undefined | null;
  // "countryId": string,
  stateId?: string | undefined | null;
  cadreId?: string | undefined | null;
  districtId?: string | undefined | null;
  blockId?: string | undefined | null;
  healthFacilityId?: string | undefined | null;
  profileImage?: string;
}

export interface UserValidationApiResponse {
  errors?: {
    isNewUser?: boolean;
    [key: string]: string | boolean | undefined;
  };
}

export interface OTPGenerationApiResponse {
  code: number;
  data?: undefined;
}

export interface OtpVerificationApiRequest {
  phoneNo?: string;
  email?: string;
  otp: number;
}

interface DefaultType {
  _id: string;
  title: string;
}
export type CadreTypesApiResponse = string[];
export type DefaultCadreTypesApiResponse = {
  cadreType: DefaultType & { cadreType: string };
  cadreId: DefaultType;
  cadreGroup: DefaultType;
  stateId: DefaultType;
  districtId: DefaultType;
};

export type ActiveTourApiResponse = string[];

interface DataItem {
  _id: string;
  cadreGroup: string;
  title: string;
  cadreType: string;
  id: number;
}
interface StateItem {
  _id: string;
  title: string;
  countryId: string;
  createdAt: string;
  updatedAt: string;
  id: number;
}

interface DistrictItem {
  _id: string;
  countryId: string;
  stateId: string;
  title: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}
interface BlockItem {
  _id: string;
  title: string;
  countryId: string;
  stateId: string;
  districtId: string;
  id: number;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

interface HealthFacilityItem {
  _id: string;
  countryId: string;
  stateId: string;
  districtId: string;
  blockId: string;
  healthFacilityCode: string;
  DMC: boolean;
  TRUNAT: boolean;
  CBNAAT: boolean;
  XRAY: boolean;
  ICTC: boolean;
  LPALab: boolean;
  CONFIRMATIONCENTER: boolean;
  TobaccoCessationClinic: boolean;
  ANCClinic: boolean;
  NutritionalRehabilitationCentre: boolean;
  DeAddictionCentres: boolean;
  ARTCentre: boolean;
  DistrictDRTBCentre: boolean;
  NODALDRTBCENTER: boolean;
  IRL: boolean;
  PediatricCareFacility: boolean;
  longitude: string;
  latitude: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

interface CountryItem {
  _id: string;
  title: string;
  id: number;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export type CountryOptionTypesApiResponse = CountryItem[];
export type CadresByTypesApiResponse = DataItem[];
export type StateApiResponse = StateItem[];
export type DistrictsApiResponse = DistrictItem[];
export type BlockApiResponse = BlockItem[];
export type HealthFacilityApiResponse = HealthFacilityItem[];
export interface OtpVerificationApiResponse {
  isEmailExist: boolean;
  isOldUser: boolean;
  id: string;
  accessToken: string;
}

export interface StepProps {
  setFieldTouched?: (
    field: string,
    value: boolean,
    shouldValidate?: boolean
  ) => void;
  setFieldValue?: (
    field: string,
    value: string | number,
    shouldValidate?: boolean
  ) => void;
  values?: FormikValues;
  errors?: FormikErrors<FormikValues>;
  _values?: {
    isNumOrEmail: string;
    isLogin: boolean;
    progress?: number;
    updateProfile: boolean;
  };
  touched?: FormikTouched<FormikValues>;
  handleToggleChange?: (value: string) => void;
  translateY?: Animated.Value;
  opacity?: Animated.Value;
  loading?: boolean;
  isAccount?: boolean;
  colors?: {
    DARK_BLUE_394F89: string;
    WHITE_FFFF: string;
    BUTTON_TEXT_WHITE: string;
    RED_DB3611: string;
    BLACK_000000: string;
    LIGHT_BLUE_E8F1FF: string;
  };
  dispatch?: Dispatch<UnknownAction>;
  onPressEdit?: (text?: string) => void;
  onChange?: (value: boolean) => void;
  setValues?: (values: FormikValues) => void;
}
