import { appConfig, Urls } from '@nikshay-setu-v3-monorepo/constants';
import {
  AlgorithmsTypes,
  AllSubscriberListResponse,
  AppConfigDetails,
  BlockApiResponse,
  CadreByTypesType,
  ChatHistoryApiReq,
  ChatTopQuestionTypes,
  DistrictsApiResponse,
  FeedbackTypes,
  HealthFacilityApiResponse,
  HealthFacilityList,
  HomePageTypes,
  KnowledgeBaseCourseApiResponse,
  KnowledgeConnectType,
  ReducerData,
  ReducerState,
  ResourceMaterialModule,
  ResponsePayload,
  StateApiResponse,
  SubscriberTaskProgress,
} from '@nikshay-setu-v3-monorepo/types';
import { generateSessionId, isEmpty } from '@nikshay-setu-v3-monorepo/utils';
import { WebHomePageProps } from 'shared/types/src/screens/LandingTypes';
import { Query2COEDataType } from 'shared/types/src/screens/Query2COETypes';
import { UserProfileApiResponse } from 'shared/types/src/screens/UserTypes';
export const initialState: ReducerState = {
  data: {
    homeScreen: {
      home_page_info: { flashSimilarApps: [], flashNews: [], plugins: [] },
    },
    chatScreen: {
      chat_top_question: [],
      sessionId: generateSessionId(),
      subNodeData: [],
      chat_conversion: undefined,
    },
    referral_health_facility: undefined,
    algorithms: {
      algorithm_diagnosis_master_node: [],
      algorithm_diagnosis_dependent_node: {
        children: [],
        title: { en: '', gu: '', hi: '', mr: '', ta: '' },
      },

      algorithm_treatment_master_node: [],
      algorithm_treatment_dependent_node: {
        children: [],
        title: { en: '', gu: '', hi: '', mr: '', ta: '' },
      },

      algorithm_guidance_drug_reaction_master_node: [],
      algorithm_guidance_drug_reaction_dependent_node: {
        children: [],
        title: { en: '', gu: '', hi: '', mr: '', ta: '' },
      },

      algorithm_latent_tb_infection_master_node: [],
      algorithm_latent_tb_infection_dependent_node: {
        children: [],
        title: { en: '', gu: '', hi: '', mr: '', ta: '' },
      },

      algorithm_differential_care_master_node: [],
      algorithm_differential_care_dependent_node: {
        children: [],
        title: { en: '', gu: '', hi: '', mr: '', ta: '' },
      },

      get_dynamic_master_nodes: [],
      get_dynamic_dependent_node: {
        children: [],
        title: { en: '', gu: '', hi: '', mr: '', ta: '' },
      },

      algorithm_cgc_intervention_master_node: [],
      algorithm_cgc_intervention_dependent_node: {
        children: [],
        title: { en: '', gu: '', hi: '', mr: '', ta: '' },
      },
    },
    user_profile: undefined,
    resource_material: {
      resource_material_by_parent: [],
    },
    leaderboard: {
      all_subscriber_progress: undefined,
      subscriber_progress: [],
    },
    knowledgeConnect: {
      kbase_course: undefined,
      kbase_chapter_with_content: undefined,
    },
    feedback: { all_feedback: [] },
    query2coe: {
      query_list: undefined,
      institute_list: [],
    },
    landingPage: undefined,
    appTranslations: appConfig,
    dropdownOptions: {
      country: [],
      cadresByTypes: [],
      cadresTypes: [],
      states: [],
      districts: [],
      blocks: [],
      healthFacilities: [],
    },
  },
  loadingApis: [],
  logs: [],
  error: null,
};
export function helperFunction(
  data: ReducerData,
  payload: ResponsePayload,
  url: keyof typeof Urls | 'CLEAR_DATA' | undefined
): ReducerData {
  switch (url) {
    case 'WEB_HOME_PAGE': {
      return {
        ...data,
        landingPage: { web_home_page: payload as WebHomePageProps },
      };
    }
    case 'APP_CONFIG_DETAILS': {
      const newPayload = payload as AppConfigDetails;
      return {
        ...data,
        appTranslations: { ...appConfig, ...newPayload?.appTranslations },
      };
    }
    case 'HOME_PAGE_INFO': {
      return {
        ...data,
        homeScreen: { home_page_info: payload } as HomePageTypes,
      };
    }
    case 'USER_PROFILE': {
      return {
        ...data,
        user_profile: payload as UserProfileApiResponse,
      };
    }
    case 'ALGORITHM_DIAGNOSIS_MASTER_NODE': {
      return {
        ...data,
        algorithms: {
          ...initialState?.data.algorithms,
          algorithm_diagnosis_master_node: payload,
        } as AlgorithmsTypes,
      };
    }
    case 'GET_DYNAMIC_MASTER_NODES': {
      return {
        ...data,
        algorithms: {
          ...initialState?.data.algorithms,
          get_dynamic_master_nodes: payload,
        } as AlgorithmsTypes,
      };
    }
    case 'GET_DYNAMIC_DEPENDENT_NODES': {
      return {
        ...data,
        algorithms: {
          ...data.algorithms,
          get_dynamic_dependent_nodes: payload,
        } as AlgorithmsTypes,
      };
    }
    case 'ALGORITHM_DIAGNOSIS_DEPENDENT_NODE': {
      return {
        ...data,
        algorithms: {
          ...data.algorithms,
          algorithm_diagnosis_dependent_node: payload,
        } as AlgorithmsTypes,
      };
    }
    case 'RESOURCE_MATERIAL_BY_PARENT': {
      return {
        ...data,
        resource_material: {
          resource_material_by_parent: payload as ResourceMaterialModule[],
        },
      };
    }
    case 'ALGORITHM_TREATMENT_MASTER_NODE': {
      return {
        ...data,
        algorithms: {
          ...initialState?.data.algorithms,
          algorithm_treatment_master_node: payload,
        } as AlgorithmsTypes,
      };
    }
    case 'ALGORITHM_TREATMENT_DEPENDENT_NODE': {
      return {
        ...data,
        algorithms: {
          ...data.algorithms,
          algorithm_treatment_dependent_node: payload,
        } as AlgorithmsTypes,
      };
    }
    case 'ALGORITHM_GUIDANCE_DRUG_REACTION_MASTER_NODE': {
      return {
        ...data,
        algorithms: {
          ...initialState?.data.algorithms,
          algorithm_guidance_drug_reaction_master_node: payload,
        } as AlgorithmsTypes,
      };
    }
    case 'ALGORITHM_GUIDANCE_DRUG_REACTION_DEPENDENT_NODE': {
      return {
        ...data,
        algorithms: {
          ...data.algorithms,
          algorithm_guidance_drug_reaction_dependent_node: payload,
        } as AlgorithmsTypes,
      };
    }
    case 'ALGORITHM_LATENT_TB_INFECTION_MASTER_NODE': {
      return {
        ...data,
        algorithms: {
          ...initialState?.data.algorithms,
          algorithm_latent_tb_infection_master_node: payload,
        } as AlgorithmsTypes,
      };
    }
    case 'ALGORITHM_LATENT_TB_INFECTION_DEPENDENT_NODE': {
      return {
        ...data,
        algorithms: {
          ...data.algorithms,
          algorithm_latent_tb_infection_dependent_node: payload,
        } as AlgorithmsTypes,
      };
    }
    case 'ALGORITHM_DIFFERENTIAL_CARE_MASTER_NODE': {
      return {
        ...data,
        algorithms: {
          ...initialState?.data.algorithms,
          algorithm_differential_care_master_node: payload,
        } as AlgorithmsTypes,
      };
    }
    case 'ALGORITHM_DIFFERENTIAL_CARE_DEPENDENT_NODE': {
      return {
        ...data,
        algorithms: {
          ...data.algorithms,
          algorithm_differential_care_dependent_node: payload,
        } as AlgorithmsTypes,
      };
    }
    case 'ALL_SUBSCRIBER_PROGRESS': {
      return {
        ...data,
        leaderboard: {
          ...data.leaderboard,
          all_subscriber_progress: payload as AllSubscriberListResponse,
        },
      };
    }
    case 'KBASE_COURSE': {
      return {
        ...data,
        knowledgeConnect: {
          ...data.knowledgeConnect,
          kbase_course: payload,
        } as KnowledgeConnectType,
      };
    }
    case 'KBASE_CHAPTER_WITH_CONTENT': {
      return {
        ...data,
        knowledgeConnect: {
          ...data?.knowledgeConnect,
          kbase_chapter_with_content: payload as KnowledgeBaseCourseApiResponse,
        },
      };
    }
    case 'SUBSCRIBER_PROGRESS': {
      return {
        ...data,
        leaderboard: {
          ...data?.leaderboard,
          subscriber_progress: payload as SubscriberTaskProgress,
        },
      };
    }
    case 'REFERRAL_HEALTH_FACILITY': {
      return {
        ...data,
        referral_health_facility: payload as HealthFacilityList,
      };
    }
    case 'CHAT_CONVERSION': {
      const sessionId = generateSessionId();
      const oldSessionId = data?.chatScreen?.sessionId;

      return {
        ...data,
        chatScreen: {
          ...data.chatScreen,
          sessionId: isEmpty(oldSessionId) ? sessionId : oldSessionId,
          chat_conversion: payload as ChatHistoryApiReq,
        },
      };
    }
    case 'CHAT_TOP_QUESTION': {
      const sessionId = generateSessionId();
      const oldSessionId = data?.chatScreen?.sessionId;
      return {
        ...data,
        chatScreen: {
          ...data.chatScreen,
          sessionId: isEmpty(oldSessionId) ? sessionId : oldSessionId,
          chat_top_question: payload as ChatTopQuestionTypes[],
        },
      };
    }
    case 'INSTITUTE_LIST': {
      return {
        ...data,
        query2coe: {
          ...data.query2coe,
          institute_list: payload,
        } as Query2COEDataType,
      };
    }
    case 'QUERY_LIST': {
      return {
        ...data,
        query2coe: {
          ...data.query2coe,
          query_list: payload,
        } as Query2COEDataType,
      };
    }
    case 'ALL_FEEDBACK': {
      return {
        ...data,
        feedback: { all_feedback: payload as FeedbackTypes[] },
      };
    }
    case 'CLEAR_DATA': {
      return {
        ...data,
        ...(payload as ReducerData),
      };
    }
    default:
      return data;
  }
}

export function dropdownHelperFunction(
  data: ReducerData,
  payload: ResponsePayload,
  url: keyof typeof Urls | 'CLEAR_DATA' | undefined
): ReducerData {
  console.log(url?.toString());

  switch (url) {
    case 'CADRES_TYPES': {
      const levelOrder = [
        'International_Level',
        'National_Level',
        'State_Level',
        'District_Level',
        'Block_Level',
        'Health-facility_Level',
      ];

      const filtered = (payload as string[])
        ?.sort((a, b) => {
          return levelOrder.indexOf(a) - levelOrder.indexOf(b);
        })
        ?.map((v) => {
          return { label: v.replace(/_/g, ' '), value: v };
        });
      return {
        ...data,
        dropdownOptions: {
          ...data.dropdownOptions,
          cadresTypes: filtered,
        },
      };
    }
    case 'CADRES_BY_TYPES': {
      const filtered = (payload as CadreByTypesType[])
        ?.sort((a, b) => a.title.localeCompare(b.title))
        ?.map((v) => {
          return { label: v?.title, value: v?._id };
        });

      return {
        ...data,
        dropdownOptions: {
          ...data.dropdownOptions,
          cadresByTypes: filtered,
        },
      };
    }
    case 'COUNTRY': {
      return {
        ...data,
        // dropdownOptions: { country: payload as WebHomePageProps },
      };
    }
    case 'STATES': {
      const filtered = (payload as StateApiResponse)
        ?.sort((a, b) => a.title.localeCompare(b.title))
        .map((v) => {
          return { label: v?.title, value: v?._id };
        });
      return {
        ...data,
        dropdownOptions: {
          ...data.dropdownOptions,
          healthFacilities: [],
          blocks: [],
          districts: [],
          states: filtered,
        },
      };
    }
    case 'DISTRICTS': {
      const filtered = (payload as DistrictsApiResponse)
        ?.sort((a, b) => a.title.localeCompare(b.title))
        .map((v) => {
          return { label: v?.title, value: v?._id };
        });
      return {
        ...data,
        dropdownOptions: {
          ...data.dropdownOptions,
          healthFacilities: [],
          blocks: [],
          districts: filtered,
        },
      };
    }
    case 'BLOCKS': {
      const filtered = (payload as BlockApiResponse)
        ?.sort((a, b) => a.title.localeCompare(b.title))
        .map((v) => {
          return { label: v?.title, value: v?._id };
        });
      return {
        ...data,
        dropdownOptions: {
          ...data.dropdownOptions,
          healthFacilities: [],
          blocks: filtered,
        },
      };
    }
    case 'HEALTH_FACILITIES': {
      const filtered = (payload as HealthFacilityApiResponse)
        ?.sort((a, b) =>
          a.healthFacilityCode.localeCompare(b.healthFacilityCode)
        )
        ?.map((v) => {
          return { label: v?.healthFacilityCode, value: v?._id };
        });
      return {
        ...data,
        dropdownOptions: {
          ...data.dropdownOptions,
          healthFacilities: filtered,
        },
      };
    }

    default:
      return data;
  }
}
