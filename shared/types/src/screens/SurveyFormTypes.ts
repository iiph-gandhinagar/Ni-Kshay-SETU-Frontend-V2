interface SurveyTitle {
  en: string;
}

interface SurveyOption {
  en: string;
}

export interface SurveySubmissionPayload {
  questionAnswer: Array<{
    answer: string;
    surveyQuestionId: string;
  }>;
  surveyId: string;
  userId: string;
}
export interface SurveyQuestion {
  active: boolean;
  title: SurveyTitle;
  type: string;
  _id: string;
  option1?: SurveyOption;
  option2?: SurveyOption;
  option3?: SurveyOption;
  option4?: SurveyOption;
  orderIndex: number;
}

export interface Survey {
  _id: string;
  title: SurveyTitle;
  countryId: string;
  stateId: string[];
  isAllState: boolean;
  districtId: string[];
  isAllDistrict: boolean;
  blockId: string[];
  isAllBlock: boolean;
  healthFacilityId: string[];
  isAllHealthFacility: boolean;
  cadreId: string[];
  isAllCadre: boolean;
  completed?: boolean;
  cadreType: string;
  questions: SurveyQuestion[];
  active: boolean;
  sendInitialNotification: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SurveyList {
  surveyList: Survey[];
  doneSurveyList: Survey[]; // Assuming doneSurveyList can have different or empty structures, otherwise specify the type
}
