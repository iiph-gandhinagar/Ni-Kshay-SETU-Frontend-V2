import {
  AdherenceManagementSvg,
  AdrSvg,
  AlgorithmsSvg,
  BotSvg,
  caseFindingsSvg,
  DiagnosisNonTuberculosisSvg,
  DiagnosticCareCascadeSvg,
  EducationalVideosDiagnosisSvg,
  HospitalSvg,
  HowToAvoidFalseResultSvg,
  KnowledgeBaseSvg,
  KnowledgeQuizSvg,
  ManageTbSvg,
  ManageTBSvg,
  MicroscopeSvg,
  moreSvg,
  MoreSvg,
  pastAssessmentSvg,
  PediatricTBSvg,
  PresumptiveExtraPulmonarySvg,
  PresumptivePulmonarySvg,
  QueryResSvg,
  RefHealthFacilitiesSvg,
  resourceMaterialsSvg,
  ScreeningTbPreventiveSvg,
  ScreeningToolSvg,
  SpeechSvg,
  SputumCollectionSvg,
  StepsForEarlyIdentificationSvg,
  SymptomSvg,
  TbPreventiveTreatmentSvg,
  TreatmentCareCascadeSvg,
  TreatmentSvg,
  XraySvg,
} from '@nikshay-setu-v3-monorepo/assets';
import CountryCodesData from './CountryCodes.json';
import appConfigData from './appConfig.json';
export const onProgressSteps = {
  '0': {
    chatBotText: 'Welcome to the Ni-kshay SETU App !',
    animationSpeed: 50,
  },
  '0.1': {
    chatBotText:
      'We’re excited to have you on board! Fill in the required information below to create your account and access our services.',
    buttonTxt: 'Get OTP',
    animationSpeed: 50,
  },
  '0.2': {
    chatBotText: "We'll send you an OTP to verify your Number/Email. 📲 ",
    buttonTxt: 'Verify',
    animationSpeed: 60,
  },
  '0.3': {
    chatBotText: `Great ! 🎉 Now, let's get to know you better. Please enter your full name, email ID and your designation.`,
    buttonTxt: 'Continue',
    animationSpeed: 40,
  },
  '0.5': {
    chatBotText: `Almost done! 🌍 We just need to know your geographic details. 🏠📍`,
    buttonTxt: 'Continue',
    animationSpeed: 50,
  },
  '0.7': {
    chatBotText: `Awesome ! 🎉Let's make sure we have everything correct.`,
    buttonTxt: 'Confirm',
    animationSpeed: 50,
  },
  '0.8': {
    chatBotText: `Confirm your profile.`,
    buttonTxt: 'Continue',
    animationSpeed: 80,
  },
  '0.9': {
    chatBotText: `OTP Verification.`,
    buttonTxt: 'Verify',
    animationSpeed: 20,
  },
};
export type AppConfigType = Record<keyof typeof appConfigData, string>;
export const langKeyForPlugin = {
  'Knowledge Connect': 'APP_KNOWLEDGE_CONNECT',
  'ManageTB India': 'APP_MANAGE_TB_INDIA',
  Query2COE: 'APP_QUERY2COE',
  'Guidance on ADR': 'APP_GUIDANCE_ADR',
  'Knowledge Quiz': 'APP_KNOWLEDGE_QUIZ',
  'Diagnostic Cascade': 'APP_DIAGNOSTIC_CASCADE',
  'Diagnosis Algorithm': 'APP_DIAGNOSTIC_CASCADE',
  'Screening Tool': 'APP_SCREENING_TOOL',
  'Treatment Cascade': 'APP_TREATMENT_CASCADE',
  'Treatment Algorithm': 'APP_TREATMENT_CASCADE',
  'TB Preventive Treatment': 'APP_TB_PREVENTIVE_TREATMENT',
  'Differentiated Care': 'APP_DIFFERENTIATED_CARE',
  'Referral Health Facilities': 'APP_REFERRAL_HEALTH_FAC',
  'Resource Material': 'DRAWER_RESOURCE_MATERIAL',
  'Current Assessments': 'APP_CURRENT_ASSESSMENTS',
  'Survey Form': 'APP_SURVEY_FORM',
  More: 'APP_MORE',
  'Contact Us': 'APP_CONTACT_US',
  Rating: 'APP_RATING',
  'Completed Assessments': 'APP_COMPLETED_ASSESSMENTS',
  APP_LOADING: 'APP_LOADING',
  'Contact us': 'DRAWER_CONTACT_US',
  'Patient Management': 'DRAWER_PATIENT_MANAGE',
  'Resource Materials': 'DRAWER_RESOURCE_MATERIAL',
  'Referral Health Facility': 'DRAWER_REFERRAL_HEALTH_FACILITY',
  'Sign Out': 'DRAWER_SIGN_OUT',
  'About us': 'DRAWER_ABOUT_US',
  'Privacy Policy & Disclaimer': 'DRAWER_PRIVACY_POLICY',
  FAQs: 'DRAWER_FAQS',
  Beginner: 'LEVEL_BEGINNER',
  'Advanced Beginner': 'LEVEL_ADVANCED',
  Competent: 'LEVEL_COMPETENT',
  Proficient: 'LEVEL_PROFICIENT',
  Expert: 'LEVEL_EXPERT',
  Bronze: 'LEVEL_BRONZE',
  Silver: 'LEVEL_SILVER',
  Gold: 'LEVEL_GOLD',
  undefined: 'APP_LOADING',
  null: 'APP_LOADING',
} as const;
// Export the JSON with type
export const appConfig: AppConfigType = appConfigData;
export const CountryCodes = CountryCodesData;
export const diagnosticCareList = [
  {
    icon: PresumptivePulmonarySvg,
    title: 'Presumptive Pulmonary TB',
    navigateTo: 'algorithmView',
  },
  {
    icon: PresumptiveExtraPulmonarySvg,
    title: 'Presumptive Extra-Pulmonary TB',
  },
  { icon: PediatricTBSvg, title: 'Presumptive Pediatric  TB' },
  {
    icon: ScreeningTbPreventiveSvg,
    title: 'Screening for TB Preventive Treatment',
  },
  {
    icon: DiagnosisNonTuberculosisSvg,
    title: 'Diagnosis of Nontuberculous Mycobacteria (NTM) ',
  },
  { icon: SputumCollectionSvg, title: 'Sputum Collection Process' },
  {
    icon: StepsForEarlyIdentificationSvg,
    title: 'Guidelines for Sputum Transportation',
  },
  {
    icon: EducationalVideosDiagnosisSvg,
    title: 'Educational Videos Diagnosis of TB',
  },
  {
    icon: HowToAvoidFalseResultSvg,
    title: 'How to Avoid False Results in Smear Microscopy?',
  },
];

export const homePage4Gradient = {
  0: ['#383A68', '#6F73CE'],
  1: ['#0C3896', '#5D88E4'],
  2: ['#0B4E67', '#61C9EF'],
  3: ['#4B5F83', '#B1BED4'],
};

export const gradientColor = {
  Bronze: ['#E29B2F', '#fcd395'],
  Silver: ['#c2c0c0', '#c2cccc'],
  Gold: ['#FECE2A', '#f2dc91'],
  default: ['#fefeef', '#54545466'],
};
export const homePage4BoxData: {
  name: string;
  desc: string;
  image: string;
  linkTo: string;
  nameOfAlgo?: string;
}[] = [
  {
    name: 'Knowledge Connect',
    desc: ' ',
    image: KnowledgeBaseSvg,
    linkTo: 'courseInfo',
  },
  {
    name: 'ManageTB India',
    desc: ' ',
    image: ManageTbSvg,
    linkTo: 'manageTBScreen',
  },
  {
    name: 'Query2COE',
    desc: ' ',
    image: QueryResSvg,
    linkTo: 'QRMScreen',
  },
  {
    name: 'Knowledge Quiz',
    desc: ' ',
    image: KnowledgeQuizSvg,
    linkTo: 'knowledgeAssessmentScreen',
  },
  {
    name: 'Screening Tool',
    image: ScreeningToolSvg,
    desc: ' ',
    linkTo: 'screeningScreen',
  },
  {
    name: 'Diagnostic Cascade',
    image: DiagnosticCareCascadeSvg,
    desc: ' ',
    linkTo: 'algorithmScreen',
    nameOfAlgo: 'Diagnosis Algorithm',
  },
  {
    name: 'Treatment Cascade',
    image: TreatmentCareCascadeSvg,
    desc: ' ',
    linkTo: 'algorithmScreen',
    nameOfAlgo: 'Treatment Algorithm',
  },
  {
    name: 'TB Preventive Treatment',
    image: TbPreventiveTreatmentSvg,
    desc: ' ',
    linkTo: 'algorithmScreen',
    nameOfAlgo: 'TB Preventive Treatment',
  },
  {
    name: 'Differentiated Care',
    image: AdherenceManagementSvg,
    desc: ' ',
    linkTo: 'algorithmScreen',
    nameOfAlgo: 'Differentiated Care',
  },
  {
    name: 'Referral Health Facilities',
    image: RefHealthFacilitiesSvg,
    desc: ' ',
    linkTo: 'referralHealth',
  },
];

export const dropdownList = [
  'COUNTRY',
  'CADRES_BY_TYPES',
  'CADRES_TYPES',
  'STATES',
  'DISTRICTS',
  'BLOCKS',
  'HEALTH_FACILITIES',
];
export const storeOnly = [
  'CLEAR_DATA',
  'ALL_FEEDBACK',
  'QUERY_LIST',
  'INSTITUTE_LIST',
  'CHAT_TOP_QUESTION',
  'CHAT_CONVERSION',
  'REFERRAL_HEALTH_FACILITY',
  'SUBSCRIBER_PROGRESS',
  'KBASE_CHAPTER_WITH_CONTENT',
  'KBASE_COURSE',
  'GET_DYNAMIC_MASTER_NODES',
  'GET_DYNAMIC_DEPENDENT_NODES',
  'ALL_SUBSCRIBER_PROGRESS',
  'ALGORITHM_DIFFERENTIAL_CARE_DEPENDENT_NODE',
  'ALGORITHM_DIFFERENTIAL_CARE_MASTER_NODE',
  'ALGORITHM_LATENT_TB_INFECTION_DEPENDENT_NODE',
  'ALGORITHM_LATENT_TB_INFECTION_MASTER_NODE',
  'ALGORITHM_GUIDANCE_DRUG_REACTION_DEPENDENT_NODE',
  'ALGORITHM_GUIDANCE_DRUG_REACTION_MASTER_NODE',
  'ALGORITHM_TREATMENT_DEPENDENT_NODE',
  'ALGORITHM_TREATMENT_MASTER_NODE',
  'RESOURCE_MATERIAL_BY_PARENT',
  'ALGORITHM_DIAGNOSIS_DEPENDENT_NODE',
  'ALGORITHM_DIAGNOSIS_MASTER_NODE',
  'USER_PROFILE',
  'HOME_PAGE_INFO',
  'APP_CONFIG_DETAILS',
  'WEB_HOME_PAGE',
];
export const toolsData = [
  {
    image: ScreeningToolSvg,
    title: 'Screening Tool',
    navigatorLink: 'screeningScreen',
  },
  {
    image: AdrSvg,
    title: 'Guidance on ADR',
    navigatorLink: 'algorithmScreen',
    nameOfAlgo: 'Guidance on ADR',
  },
  {
    image: TreatmentCareCascadeSvg,
    title: 'Treatment Cascade',
    navigatorLink: 'algorithmScreen',
    nameOfAlgo: 'Treatment Algorithm',
  },
  { image: MoreSvg, title: 'More', navigatorLink: 'moreTools' },
];
export const languagesList = [
  {
    icon: 'A',
    engName: 'English',
    language: 'English',
    color: '#00C0FF',
    code: 'en',
  },
  {
    icon: 'ગુ',
    engName: 'Gujarati',
    language: 'ગુજરાતી',
    color: '#FF7A00',
    code: 'gu',
  },
  {
    icon: 'अ',
    engName: 'Hindi',
    language: 'हिन्दी',
    color: '#00B71D',
    code: 'hi',
  },
  {
    icon: 'म',
    engName: 'Marathi',
    language: 'मराठी',
    color: '#217AFF',
    code: 'mr',
  },
  {
    icon: 'அ',
    engName: 'Tamil',
    language: 'தமிழ்',
    color: '#119072',
    code: 'ta',
  },
  {
    icon: 'ਪ',
    engName: 'Punjabi',
    language: 'ਪੰਜਾਬੀ',
    color: '#00C12F',
    code: 'pa',
  },
  {
    icon: 'తె',
    engName: 'Telugu',
    language: 'తెలుగు',
    color: '#808080',
    code: 'te',
  },
  {
    icon: 'ಕನ್',
    engName: 'Kannada',
    language: 'ಕನ್ನಡ',
    color: '#FFA500',
    code: 'kn',
  },
];

export const CadreStateTypes = {
  State_Level: ['State_Level'],
  Block_Level: [
    'Block_Level',
    'District_Level',
    'National_Level',
    'State_Level',
  ],
  'Health-facility_Level': [
    'Block_Level',
    'District_Level',
    'National_Level',
    'State_Level',
    'Health-facility_Level',
  ],
  District_Level: ['District_Level', 'State_Level'],
  International_Level: [],
  National_Level: [],
};

export const carouselIcons = [
  {
    img: SpeechSvg,
  },
  {
    img: HospitalSvg,
  },
  {
    img: caseFindingsSvg,
  },
  {
    img: ManageTBSvg,
  },
  {
    img: MicroscopeSvg,
  },
  {
    img: pastAssessmentSvg,
  },
  {
    img: BotSvg,
  },
  {
    img: XraySvg,
  },
  {
    img: AlgorithmsSvg,
  },
  {
    img: resourceMaterialsSvg,
  },
  {
    img: SymptomSvg,
  },
];

export const topModulesWeb: {
  name: string;
  image: string;
  path: string;
}[] = [
  {
    name: 'Knowledge Connect',
    image: KnowledgeBaseSvg,
    path: '/knowledge-connect',
  },
  {
    name: 'ManageTB India',
    image: ManageTbSvg,
    path: '/manage-tb',
  },
  {
    name: 'Query2COE',
    image: QueryResSvg,
    path: '/query-response-management',
  },
  {
    name: 'Knowledge Quiz',
    image: KnowledgeQuizSvg,
    path: '/KnowledgeAssessments',
  },
  {
    name: 'Screening Tool',
    image: ScreeningToolSvg,
    path: '/screening-tool',
  },
  {
    name: 'Diagnostic Cascade',
    image: DiagnosticCareCascadeSvg,
    path: '/algorithms?name=Diagnosis Algorithm',
  },
  {
    name: 'Guidance on ADR',
    image: AdrSvg,
    path: '/algorithms?name=Guidance on ADR',
  },
  {
    name: 'Treatment Algorithm',
    image: TreatmentCareCascadeSvg,
    path: '/algorithms?name=Treatment Algorithm',
  },
  {
    name: 'TB Preventive Treatment',
    image: TbPreventiveTreatmentSvg,
    path: '/algorithms?name=TB Preventive Treatment',
  },
  {
    name: 'Referral Health Facilities',
    image: RefHealthFacilitiesSvg,
    path: '/referral-health-facilities',
  },
];

type AlgorithmUrls = {
  masterNode:
    | 'ALGORITHM_DIAGNOSIS_MASTER_NODE'
    | 'ALGORITHM_TREATMENT_MASTER_NODE'
    | 'ALGORITHM_LATENT_TB_INFECTION_MASTER_NODE'
    | 'ALGORITHM_DIFFERENTIAL_CARE_MASTER_NODE'
    | 'ALGORITHM_GUIDANCE_DRUG_REACTION_MASTER_NODE'
    | 'GET_DYNAMIC_MASTER_NODES'
    | 'ALGORITHM_CGC_INTERVENTION_MASTER_NODE';
  dependentNode:
    | 'ALGORITHM_DIAGNOSIS_DEPENDENT_NODE'
    | 'ALGORITHM_TREATMENT_DEPENDENT_NODE'
    | 'ALGORITHM_LATENT_TB_INFECTION_DEPENDENT_NODE'
    | 'ALGORITHM_DIFFERENTIAL_CARE_DEPENDENT_NODE'
    | 'GET_DYNAMIC_DEPENDENT_NODES'
    | 'ALGORITHM_GUIDANCE_DRUG_REACTION_DEPENDENT_NODE'
    | 'ALGORITHM_CGC_INTERVENTION_DEPENDENT_NODE';
};

type AlgorithmDataByName = {
  [key: string]: {
    urls: AlgorithmUrls;
    topName: string;
  };
};

export const getAlgorithmDataByName: AlgorithmDataByName = {
  'Diagnosis Algorithm': {
    urls: {
      masterNode: 'ALGORITHM_DIAGNOSIS_MASTER_NODE',
      dependentNode: 'ALGORITHM_DIAGNOSIS_DEPENDENT_NODE',
    },
    topName: 'Diagnostic Cascade',
  },
  'Dynamic Algorithm': {
    urls: {
      masterNode: 'GET_DYNAMIC_MASTER_NODES',
      dependentNode: 'GET_DYNAMIC_DEPENDENT_NODES',
    },
    topName: 'dy Algorithm',
  },
  'Treatment Algorithm': {
    urls: {
      masterNode: 'ALGORITHM_TREATMENT_MASTER_NODE',
      dependentNode: 'ALGORITHM_TREATMENT_DEPENDENT_NODE',
    },
    topName: 'Treatment Cascade',
  },
  'TB Preventive Treatment': {
    urls: {
      masterNode: 'ALGORITHM_LATENT_TB_INFECTION_MASTER_NODE',
      dependentNode: 'ALGORITHM_LATENT_TB_INFECTION_DEPENDENT_NODE',
    },
    topName: 'TB Preventive Treatment',
  },
  'Latent TB Infection': {
    urls: {
      masterNode: 'ALGORITHM_LATENT_TB_INFECTION_MASTER_NODE',
      dependentNode: 'ALGORITHM_LATENT_TB_INFECTION_DEPENDENT_NODE',
    },
    topName: 'TB Preventive Treatment',
  },
  'Differentiated Care': {
    urls: {
      masterNode: 'ALGORITHM_DIFFERENTIAL_CARE_MASTER_NODE',
      dependentNode: 'ALGORITHM_DIFFERENTIAL_CARE_DEPENDENT_NODE',
    },
    topName: 'Differentiated Care',
  },
  'Guidance on ADR': {
    urls: {
      masterNode: 'ALGORITHM_GUIDANCE_DRUG_REACTION_MASTER_NODE',
      dependentNode: 'ALGORITHM_GUIDANCE_DRUG_REACTION_DEPENDENT_NODE',
    },
    topName: 'Guidance on ADR',
  },
};
export const toolsDataWeb = [
  {
    image: ScreeningToolSvg,
    title: 'Screening Tool',
    path: '/screening-tool',
  },
  {
    image: AdrSvg,
    title: 'Guidance on ADR',
    path: '/algorithms?name=Guidance on ADR', // Assuming this is the correct path; adjust as needed
  },
  {
    image: TreatmentSvg,
    title: 'Treatment Cascade',
    path: '/algorithms?name=Treatment Algorithm',
  },
  {
    image: moreSvg,
    title: 'More',
    path: '/more',
  },
];

export const DefaultValue = {
  age: '',
  sex: '',
  pregnancy: '',
  duration_of_pregnancy: '',
  eight: '',
  height: '',
  bmi: '',
  respiratory_rate: 'No',
  site_of_disease: 'Pulmonary Non-Extensive Lung Involvement',
  hiv: 'Negative',
  past_history_att: 'Absent',
  is_levo_moxi_more_than_a_month: '',
  is_clofazimine_more_than_a_month: '',
  is_bdq_more_than_a_month: '',
  is_lzd_more_than_a_month: '',
  is_pretomanid_more_than_a_month: '',
  is_ethionamide_more_than_a_month: '',
  suffering_from_any_chronic_illness: 'No',
  seizure_disorder: '',
  chronic_kidney_disease: '',
  chronic_liver_disease: '',
  depression: '',
  cardiac_disease: '',
  diabetes: '',
  vision_loss_fundus_abnormality: '',
  sputum_afb: 'Positive',
  cbnaat_trunat: 'Available',
  mtb_1: 'Detected',
  if_mtb_present_1: 'Medium',
  rifampicin_resistance_1: 'Not Detected',
  truenat: 'Not Available',
  mtb_2: '',
  rifampicin_resistance_2: '',
  fl_lpa_result: 'Not Available',
  mtb_3: '',
  rifampicin_resistance_3: '',
  inha: '',
  katg: '',
  other_investigation_available_suggestive_tb_clinical_sign: '',
  repeat_cbnaat_result_available: '',
  mtb_4: '',
  if_mtb_present_2: '',
  rifampicin_resistance_4: '',
  sl_lpa_result: 'Not Available',
  mtb_5: '',
  lfx_resistance: '',
  mfx_resistance: '',
  km_1: '',
  amikacin_capreomycin: '',
  naat_xdr: 'Not Available',
  mtb_6: '',
  inh: '',
  fq_resistance: '',
  amikacin: '',
  kanamycin: '',
  capreomycin: '',
  ethonamide: '',
  mgit_dst_result: 'Not Available',
  bdq: 'Not Available',
  lfx: 'Not Available',
  mfxh: 'Not Available',
  lzd: 'Not Available',
  cfz: 'Not Available',
  dlm: 'Not Available',
  pretomaind: 'Not Available',
  km_2: 'Not Available',
  am: 'Not Available',
  pyrazinamide: 'Not Available',
  eto: 'Not Available',
  pas: 'Not Available',
  hb_level: '',
  kidney_func_test: '',
  liver_func_test: '',
  serum_electrolytes: '',
  qt_interval: 0,
  qtcf: 0,
  audiometry: '',
  eye_exam_fundus: '',
  thyroid_func_tests: '',
  peripheral_neuropathy: '',
  peripheral_neuropathy_grade: '',
  investigation_X_ray_fnac_ct_suggestove: '',
  hiv_sub_selection: '',
  siteOfDiseaseExtrapulmonary: '',
  name: '',
  weight: '',
  heartrate: 0,
  chest_x_ray: 'no Question',
};
