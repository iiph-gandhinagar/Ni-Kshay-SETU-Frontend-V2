export enum Urls {
  GET_USER = 'users',
  LOGIN = 'subscriber/login',
  OTP_GEN = 'subscriber/otp-generation',
  VERIFY_OTP = 'subscriber/otp-verification',
  USER_VALIDATION = 'subscriber/validate-no',
  USER_PHONE_VALIDATION = 'subscriber/create-v2',
  STATES = 'region/states',
  LOGOUT = 'subscriber/logout',
  GUEST_ACTIVITY = 'subscriber-activity/guest-activity',
  DISTRICTS = 'region/districts?stateId=',
  UPDATE_USER = 'subscriber/update-details/',
  BLOCKS = 'region/blocks?districtId=',
  CADRES_BY_TYPES = 'region/cadres?cadreTypes=',
  CADRES_TYPES = 'region/cadre-types',
  HEALTH_FACILITIES = 'region/health-facilities?blockId=',
  USER_PROFILE = 'subscriber/user-profile/',
  CHAT_TOP_QUESTION = 'system-question/get-top-question',
  CHAT_QUESTION_BY_ID = 'system-question/',
  SEARCH_SYST_QUES = 'system-question/search-by-system-question',
  SEARCH_BY_QUERY = 'system-question/search-by-query',
  GET_SUB_NODE_DATA = 'system-question/get-sub-node-data',
  CHAT_CONVERSION = 'chat-conversion',
  MANAGE_TB = 'manage-tb',
  ALL_FEEDBACK = 'feedback/get-all-feedback',
  MANAGE_TB_CREATE_SESSION_ID = 'manage-tb/create-session',
  MASTER_SYMPTOMS = 'symptom/master-symptom',
  SCREENING = 'screening',
  REFERRAL_HEALTH_FACILITY = 'region/referral-health-facility?',
  KBASE_COURSE = 'kbase/get-course',
  KBASE_MODULE_WITH_CHAPTER = 'kbase/module-with-chapter/',
  KBASE_READ_CONTENT = 'kbase/read-content',
  KBASE_CHAPTER_WITH_CONTENT = 'kbase/chapter-with-content/',
  STATIC_INQUIRY = 'static-enquiry',
  INQUIRY = 'inquiry',
  QUERY = 'query',
  TOP_3_SUB_RANK = 'subscriber-progress/top-3-subscriber-rank',
  UPLOAD = 'upload',
  GET_ALL_ASSESSMENT = 'assessment/get-all-assessment',
  QUERY_LIST = 'query/get-subscriber-query-list',
  INSTITUTE_LIST = 'master-institute/institute-list',
  TRANSFER_QUERY_BY_SUBS = 'query/transfer-query-by-subscriber',
  STORE_ASSESSMENT_RESPONSE = 'assessment-response/store-assessment-response',
  SUBSCRIBER_ASSESSMENT_PROGRESS = 'assessment-response/subscriber-assessment-progress',
  SUBSCRIBER_ASSESSMENT_RESULT = 'assessment-response/subscriber-assessment-result',
  SUBSCRIBER_ACTIVITY = 'subscriber-activity',
  GET_PAST_ASSESSMENT = 'assessment/get-past-assessment',
  PDF = 'pdf/',
  SURVEY_HISTORY = 'survey-history',
  HOME_PAGE_INFO = 'region/home-page',
  COUNTRY = 'region/country',
  ALGORITHM_DIAGNOSIS_MASTER_NODE = 'algorithm-diagnosis/master-nodes',
  ALGORITHM_DIAGNOSIS_DEPENDENT_NODE = 'algorithm-diagnosis/dependent-nodes/',

  ALGORITHM_TREATMENT_MASTER_NODE = 'algorithm-treatment/master-nodes',
  ALGORITHM_TREATMENT_DEPENDENT_NODE = 'algorithm-treatment/dependent-nodes/',

  ALGORITHM_GUIDANCE_DRUG_REACTION_MASTER_NODE = 'algorithm-guidance-on-adverse-drug-reaction/master-nodes',
  ALGORITHM_GUIDANCE_DRUG_REACTION_DEPENDENT_NODE = 'algorithm-guidance-on-adverse-drug-reaction/dependent-nodes/',

  ALGORITHM_LATENT_TB_INFECTION_MASTER_NODE = 'algorithm-latent-tb-infection/master-nodes',
  ALGORITHM_LATENT_TB_INFECTION_DEPENDENT_NODE = 'algorithm-latent-tb-infection/dependent-nodes/',

  ALGORITHM_DIFFERENTIAL_CARE_MASTER_NODE = 'algorithm-differential-care/master-nodes',
  ALGORITHM_DIFFERENTIAL_CARE_DEPENDENT_NODE = 'algorithm-differential-care/dependent-nodes/',

  ALGORITHM_CGC_INTERVENTION_MASTER_NODE = 'algorithm-cgc-intervention/master-nodes',
  ALGORITHM_CGC_INTERVENTION_DEPENDENT_NODE = 'algorithm-cgc-intervention/dependent-nodes/',

  SURVEY_DETAILS = 'survey-master/get-survey-details',

  GET_DYNAMIC_ALGORITHMS = 'dynamic-algo-master/get-master-nodes',
  GET_DYNAMIC_DEPENDENT_NODES = 'dynamic-algorithm/dependent-nodes/',
  GET_DYNAMIC_MASTER_NODES = 'dynamic-algorithm/master-nodes/',

  RESOURCE_MATERIAL = 'resource-material/root-nodes',
  RESOURCE_MATERIAL_BY_PARENT = 'resource-material/get-folder-by-parentId/',
  STORE_WEEKLY_GOAL = 'assessment/store-weekly-goal',
  STORE_PRO_ASSESSMENT_RESULT = 'assessment/store-pro-assessment-result',
  PRO_ASSESSMENT_RESULT = 'assessment-response/subscriber-pro-active-result',
  PRO_ASSESSMENT_PERFORMANCE = 'assessment-response/subscriber-pro-assessment-performance',
  ACTIVE_TOUR = 'tour/get-active-tour',
  APP_CONFIG_DETAILS = 'app-config/get-app-config-details',
  STORE_DEVICE_TOKEN = 'user-device-token/store-device-token',
  AUTOMATIC_NOTIFICATION = 'user-notification/get-all-notification',
  SUBSCRIBER_PROGRESS = 'subscriber-progress',
  ALL_SUBSCRIBER_PROGRESS = 'subscriber-progress/all-subscriber',
  ALL_ACHIEVEMENT_BY_LEVEL = 'subscriber-progress/all-achievement-by-level',
  CHECK_HEALTH_STATUS = 'app-management-flag/check-health-status',
  SEND_PRESCRIPTION = 'manage-tb/send-prescription',
  DOWNLOAD_PRESCRIPTION = 'manage-tb/download-prescription',
  EMAIL_PRESCRIPTION = 'manage-tb/email-prescription',
  FEEDBACK_HISTORY = 'feedback-history',
  WEB_HOME_PAGE = 'static-key-feature/get-web-home-page',
  GET_ALL_BLOGS = 'static-blog/get-all-blogs',
  GET_BLOG_BY_SLUG = 'static-blog/get-blogs-by-slug/',
  GET_ALL_FAQ = 'static-faq/get-all-faq',
  GET_DASHBOARD = 'dashboard',
  GET_STATIC_MODULE = 'static-module/get-static-module',
  GET_RESOURCE_MATERIAL = 'static-resource-material/get-static-resource-material',
  GET_RELEASE_MATERIAL = 'static-release/get-static-release',
  DELETE_ACCOUNT = 'user-device-token/delete-account',
  GET_DEFAULT_CADRE = 'region/get-default-cadre-option',
  GET_CHAT_CONVERSION = 'chat-conversion/',
}
