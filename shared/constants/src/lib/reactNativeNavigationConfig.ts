import {
  ButtonUserActiveSvg,
  ButtonUserSvg,
  HomeActiveSvg,
  HomeSvg,
  Leaderboard1Svg,
  LeaderboardActiveSvg,
} from '@nikshay-setu-v3-monorepo/assets';

export const BottomBarData = [
  {
    name: 'APP_HOME',
    route: 'homeScreen',
    icon: HomeSvg,
    activeIcon: HomeActiveSvg,
  },
  {
    name: 'DRAWER_LEADERBOARD',
    route: 'leaderBoardScreen',
    icon: Leaderboard1Svg,
    activeIcon: LeaderboardActiveSvg,
  },
  {
    name: 'APP_ACCOUNT',
    route: 'accountScreen',
    icon: ButtonUserSvg,
    activeIcon: ButtonUserActiveSvg,
  },
];

export const HideBottomBarScreens = [
  'QRMScreen',
  'logIn',
  'raiseQuery',
  'trackQuery',
  'chatSupport',
  'manageTBScreen',
  'questionsScreen',
  'contentScreen',
  'contentView',
  'prescriptionScreen',
  'manageTBForm',
  'h5pView',
  'videoView',
  'knowledgeAssessmentScreen',
];
export const HideTopBarScreens = [
  'contentView',
  'h5pView',
  'pdfView',
  'dynamicAlgorithm',
  'videoView',
  'assessmentResultScreen',
  'leaderBoardScreen',
  'resourceMaterial',
  'referralHealthFilter',
  'algorithmScreen',
  'chatSupport',
  'algorithmView',
  'CmsNewPage',
  'questionsScreen',
];
export const HideChatBotPopupOnScreens = [
  'contentView',
  'h5pView',
  'leaderBoardScreen',
  'chatSupport',
  'questionsScreen',
  'accountScreen',
  'feedback',
  'homeScreen',
  'chatScreen',
  'referralHealthFilter',
  'contentScreen',
  'moreTools',
  'manageTBScreen',
  'videoView',
  'knowledgeQuizScreen',
  'screeningTool',
  'askSetu',
  'bottomNavigator',
  'manageTBForm',
  'algorithmView',
];

export const headerCondition = {
  homeScreen: {
    showLogo: true,
    langIcon: true,
    notificationIcon: true,
    sideBar: true,
    profile: false,
    backIcon: false,
  },
  CmsNewPage: {
    backIcon: true,
  },
  deleteAccount: {
    backIcon: true,
    backTitle: 'APP_DELETE_ACCOUNT',
  },
  language: {
    showLogo: true,
    langIcon: false,
    notificationIcon: true,
    sideBar: true,
    profile: true,
    backIcon: false,
  },
  algorithmScreen: {
    backIcon: true,
  },
  QRMScreen: {
    backIcon: true,
  },
  feedback: {
    backIcon: true,
  },
  aboutUs: {
    backIcon: true,
    backTitle: 'DRAWER_ABOUT_US',
  },
  contentScreen: {
    backIcon: true,
    backTitle: 'APP_BACK',
  },
  algorithmView: {
    backIcon: true,
    backTitle: 'APP_BACK',
  },
  labInvestigation: {
    backIcon: true,
    backTitle: 'APP_ASSESSMENT_TB_PATIENTS',
  },
  h5pView: {
    backIcon: true,
  },
  dynamicAlgorithm: {
    backIcon: true,
  },
  logsScreen: {
    backIcon: true,
  },
  rulesScreen: {
    backIcon: true,
  },
  manageTBForm: {
    backIcon: true,
  },
  raiseQuery: {
    backIcon: true,
    backTitle: 'Q2COE_RAISE_QUERY',
  },
  contactUs: {
    backIcon: true,
    backTitle: 'APP_CONTACT_US',
  },
  referralHealth: {
    backIcon: true,
    backTitle: 'APP_REFERRAL_HEALTH_FAC',
  },
  referralHealthList: {
    backIcon: true,
    backTitle: 'APP_REFERRAL_HEALTH_FAC',
  },

  chapterScreen: {
    backIcon: true,
  },
  certificateScreen: {
    backIcon: true,
    backTitle: 'K_QUIZ_CERTIFICATE',
  },
  courseInfo: {
    backIcon: true,
  },
  trackQuery: {
    backIcon: true,
    backTitle: 'Q2COE_TRACK_QUERY',
  },
  leaderBoardScreen: {
    backIcon: true,
    backTitle: 'APP_LEADERBOARD',
  },
  surveyFormScreen: {
    backIcon: true,
    backTitle: 'APP_SURVEY_FORM',
  },
  surveyTool: {
    backIcon: true,
    backTitle: 'APP_SURVEY_FORM',
  },
  surveyFormStepper: {
    backIcon: true,
    backTitle: 'APP_SURVEY_FORM',
  },
  resourceMaterial: {
    backIcon: true,
    backTitle: '',
  },
  moreTools: {
    showLogo: true,
    langIcon: false,
    notificationIcon: true,
    sideBar: true,
    profile: true,
  },
  accountScreen: {
    showLogo: true,
    langIcon: false,
    notificationIcon: true,
    sideBar: true,
  },
  notificationScreen: {
    showLogo: true,
    langIcon: false,
    sideBar: true,
  },
  chatScreen: {
    showLogo: true,
    langIcon: true,
    notificationIcon: true,
    sideBar: true,
    profile: false,
  },
  historyScreen: {
    showLogo: false,
    langIcon: false,
    notificationIcon: false,
    sideBar: false,
    profile: false,
    backIcon: true,
    backTitle: 'APP_HISTORY',
  },
  manageTBScreen: {
    backIcon: true,
  },
  knowledgeAssessmentScreen: {
    backIcon: true,
  },
  knowledgeQuizScreen: {
    backIcon: true,
  },
  currentAssessmentScreen: {
    backIcon: true,
  },

  screeningScreen: {
    backIcon: true,
    backTitle: 'APP_SCREENING_TOOL',
  },
  screeningTool: {
    backIcon: true,
    backTitle: 'APP_SCREENING_TOOL',
  },
  screeningResult: {
    backIcon: true,
    backTitle: 'APP_SCREENING_TOOL',
  },
  nutritionOutcome: {
    backIcon: true,
    backTitle: 'APP_SCREENING_NUTRITION_OUTCOME',
  },
  nextStepForPresCase: {
    backIcon: true,
    backTitle: 'APP_SCREENING_NEXT_FOR_PRES_CASE',
  },
  prescriptionScreen: {
    backIcon: true,
  },

  askSetu: {
    backIcon: true,
    backTitle: 'CHAT_ASK_SETU',
  },
};
