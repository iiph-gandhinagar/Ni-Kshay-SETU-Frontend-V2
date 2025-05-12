import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ContentScreenParamsTypes,
  ContentViewParamsTypes,
  H5pViewParamsTypes,
} from '../components/ContentViewTypes';
import { AppLangTypes } from '../screens/AppConfig';
import { QuestionObj } from '../screens/AssessmentTypes';
import { HomePageParamTypes } from '../screens/HomeScreenTypes';
import { Chapter } from '../screens/KnowledgeBaseTypes';
import { PatientResponse } from '../screens/ManageTBScreenTypes';
import { QueryType } from '../screens/Query2COETypes';
import { SurveyQuestion } from '../screens/SurveyFormTypes';
import { ThemeProps } from '../themeAndAppConfig/ColorThemeTypes';

interface CMSNewPage {
  description: string;
  header: string;
  breadcrumb: { name: string; navigateTo: string }[];
}
interface ThemeLangType extends AppLangTypes {
  theme?: ThemeProps;
}

export type RootStackParamList = {
  homeScreen: HomePageParamTypes & AppLangTypes;
  logsScreen: HomePageParamTypes & AppLangTypes;
  manageTBForm: ThemeLangType;
  aboutUs: ThemeLangType;
  contactUs: ThemeLangType;
  dynamicAlgorithm: ThemeLangType & {
    ActiveTab: string;
    id: string;
    nameOfAlgorithm: string;
  };
  deleteAccount: ThemeLangType;
  referralHealthFilter: ThemeLangType;
  initialRouteName: ThemeLangType;
  logIn: { languageICHide?: boolean; tokenRefresher?: string };
  CmsNewPage: ThemeLangType & CMSNewPage;
  QRMScreen: ThemeLangType;
  feedback: ThemeLangType;
  labInvestigationResult: ThemeLangType & { data: unknown[] };
  h5pView: H5pViewParamsTypes & AppLangTypes;
  chapterScreen: ThemeLangType &
    Chapter & {
      moduleOpen: string[];
      openModule: (module: string[], timeSpent: number) => void;
    };
  courseInfo: ThemeLangType & { moduleOpen?: string[] };
  labInvestigation: ThemeLangType & { name: string };
  raiseQuery: ThemeLangType & {
    queryRaisedRole: string;
    queryRaisedInstitute: string;
    subscriberId: string;
  };
  certificateScreen: ThemeLangType & {
    id: string;
    title: string;
  };
  videoView: ThemeLangType & {
    url: string;
    header: string;
  };
  pdfView: ThemeLangType & {
    url: string;
    header: string;
  };
  contentView: ContentViewParamsTypes;
  contentScreen: ContentScreenParamsTypes;
  chatSupport: ThemeLangType & {
    query: QueryType;
    userType: string;
    queryRespondedInstitute?: string;
    respondedBy?: string;
    queryRespondedRole?: string;
    disableOption?: boolean;
  } & AppLangTypes;
  referralHealthList: ThemeLangType & { query: string };
  trackQuery: ThemeLangType & {
    subscriberId: string;
    userType: string;
    showHistory?: boolean;
    transferredInstitute?: string;
  };
  algorithmScreen: ThemeLangType & {
    nameOfAlgorithm:
      | 'Diagnosis Algorithm'
      | 'Treatment Algorithm'
      | 'TB Preventive Treatment'
      | 'Differentiated Care'
      | 'Guidance on ADR'
      | 'NTEP Intervention';
  };
  rulesScreen: ThemeLangType & {
    question: QuestionObj[];
    assessmentId: string;
    isProAssessment?: boolean;
  };
  questionsScreen: ThemeLangType & {
    question: QuestionObj[];
    assessmentId: string;
    isProAssessment?: boolean;
  };
  assessmentResultScreen: ThemeLangType & {
    assessmentId: string;
    isProAssessment?: boolean;
  };
  language: ThemeLangType;
  stackNavigation: ThemeLangType;
  moreTools: ThemeLangType;
  accountScreen: ThemeLangType;
  referralHealth: ThemeLangType;
  leaderBoardScreen: ThemeLangType;
  taskFragment: ThemeLangType;
  achievementsFragment: ThemeLangType;
  informationFragment: ThemeLangType;
  resourceMaterial: ThemeLangType & { id: string; nameOfMaterial?: string };
  prescriptionScreen: PatientResponse & AppLangTypes;
  AppNavigationUser: ThemeLangType;
  bottomNavigator: ThemeLangType;
  chatScreen: ThemeLangType;
  historyScreen: ThemeLangType;
  manageTBScreen: ThemeLangType;
  knowledgeAssessmentScreen: ThemeLangType;
  knowledgeQuizScreen: ThemeLangType;
  currentAssessmentScreen: ThemeLangType & { ActiveTab?: string };
  notificationScreen: ThemeLangType;
  screeningScreen: ThemeLangType;
  surveyFormScreen: ThemeLangType;
  surveyTool: ThemeLangType;
  surveyFormStepper: ThemeLangType & {
    question: SurveyQuestion[];
    surveyId: string;
  };
  screeningResult: {
    BMI: string;
    theme?: ThemeProps;
    treatmentId: number;
    heightInMeter: number;
    currentWeight: number;
    heightCmsToMeterSquare: number;
    desirableWeight: number;
    minimumAcceptableWeight: number;
    desirableWeightGain: number;
    minimumWeightGainRequired: number;
    desirableDailyCaloricIntake: number;
    desirableDailyProteinIntake: number;
    userBmi: number;
    isTb: boolean;
    detectedTb: string;
    nutritionTitle: string;
    tbId: number;
  } & AppLangTypes;
  screeningTool: ThemeLangType;
  nutritionOutcome: {
    BMI: string;
    treatmentId: number;
    heightInMeter: number;
    currentWeight: number;
    heightCmsToMeterSquare: number;
    desirableWeight: number;
    minimumAcceptableWeight: number;
    desirableWeightGain: number;
    minimumWeightGainRequired: number;
    desirableDailyCaloricIntake: number;
    desirableDailyProteinIntake: number;
    userBmi: number;
    theme?: ThemeProps;
    isTb: boolean;
    detectedTb: string;
    nutritionTitle: string;
    tbId: number;
  } & AppLangTypes;
  nextStepForPresCase: ThemeLangType & {
    BMI: string;
    treatmentId: number;
    heightInMeter: number;
    currentWeight: number;
    heightCmsToMeterSquare: number;
    desirableWeight: number;
    minimumAcceptableWeight: number;
    desirableWeightGain: number;
    minimumWeightGainRequired: number;
    desirableDailyCaloricIntake: number;
    desirableDailyProteinIntake: number;
    userBmi: number;
    theme?: ThemeProps;
    isTb: boolean;
    detectedTb: string;
    nutritionTitle: string;
    tbId: number;
  };
  algorithmView: ThemeLangType & {
    nameOfAlgorithm:
      | 'Diagnosis Algorithm'
      | 'Treatment Algorithm'
      | 'TB Preventive Treatment'
      | 'Differentiated Care'
      | 'Guidance on ADR'
      | 'Dynamic Algorithm'
      | 'NTEP Intervention';
    parentNodeId?: string;
    nodeType?: string;
    description?: string;
    activeTab?: string;
    breadcrumb: { name: string; navigateTo: string }[];
    timeSpent?: string;
    headerName?: string;
    mainModuleId?: string;
    showNodeById?: string;
    showActiveNode?: boolean;
    dependentNodeUrl:
      | 'ALGORITHM_DIAGNOSIS_DEPENDENT_NODE'
      | 'ALGORITHM_TREATMENT_DEPENDENT_NODE'
      | 'ALGORITHM_LATENT_TB_INFECTION_DEPENDENT_NODE'
      | 'GET_DYNAMIC_DEPENDENT_NODES'
      | 'ALGORITHM_DIFFERENTIAL_CARE_DEPENDENT_NODE'
      | 'ALGORITHM_CGC_INTERVENTION_DEPENDENT_NODE'
      | 'ALGORITHM_GUIDANCE_DRUG_REACTION_DEPENDENT_NODE';
  };
  askSetu: {
    questionInfo?: {
      searchByQuery?: boolean;
      NTEPId?: string;
      id?: string;
      question: string;
    };
    theme?: ThemeProps;
    fromHistory?: { sessionId: string };
  } & AppLangTypes;
};

export type RootStackParamGuestList = {
  logIn: ThemeLangType & { languageICHide: boolean };
  tourScreen: ThemeLangType;
  homeScreen: { tokenRefresher: string; theme?: ThemeProps };
};

export type ScreenProps<RouteName extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, RouteName>;

export type GuestScreenProps<RouteName extends keyof RootStackParamGuestList> =
  NativeStackScreenProps<RootStackParamGuestList, RouteName>;
