import {
  BASE_URL,
  getAlgorithmDataByName,
  Urls,
} from '@nikshay-setu-v3-monorepo/constants';
import {
  RequestPayload,
  ResponsePayload,
} from '@nikshay-setu-v3-monorepo/types';
import { Platform } from 'react-native';
import networkClient from 'shared/utils/src/lib/networkClient';
import { CommonAction } from '../redux/saga';

// url of user activity
const userActivityData: UserActivityDataType = {
  USER_PROFILE: {
    module: 'User Profile',
    action: 'User Detail Fetched',
    method: 'GET',
  },
  CHAT_TOP_QUESTION: [
    {
      module: 'Chatbot',
      action: 'Chat Keyword Fetched',
      method: 'GET',
    },
    {
      module: 'Home',
      action: 'ask-anything-click',
      method: 'GET',
    },
  ],
  INQUIRY: {
    module: 'Contact Us',
    action: 'Contact Us Submitted Fetched',
    method: 'POST',
  },
  QUERY: [
    {
      module: 'Query2COE',
      action: 'query Raised',
      method: 'POST',
    },
    {
      module: 'Query2COE',
      action: 'query Responded',
      method: 'PATCH',
    },
  ],
  STATES: {
    module: 'Referral Health Facility',
    action: 'Referral Health Facility Fetched',
    method: 'GET',
  },
  MASTER_SYMPTOMS: {
    module: 'User Profile',
    action: 'User Screening Fetched',
  },
  MANAGE_TB: [
    {
      module: 'ManageTB India',
      action: 'store Manage Tb Details',
      method: 'POST',
    },
    {
      method: 'POST',
      module: 'ManageTB India',
      action: 'get_prescription',
    },
  ],
  TRANSFER_QUERY_BY_SUBS: {
    module: 'Query2COE',
    action: 'transfer query',
    method: 'POST',
  },
  HOME_PAGE_INFO: {
    module: 'Home',
    action: 'user_home_page_visit',
  },
  SEND_PRESCRIPTION: {
    module: 'ManageTB India',
    action: 'whatsapp_prescription',
  },
  EMAIL_PRESCRIPTION: {
    module: 'ManageTB India',
    action: 'email_prescription',
  },
};

// add Algorithm all in userActivityData
Object.entries(getAlgorithmDataByName).forEach(([name, algorithmObject]) => {
  const key = algorithmObject.urls.masterNode as keyof typeof Urls;
  userActivityData[key] = {
    module: name as ModuleName,
    action: name + ' Fetched',
    method: 'GET',
  };
});

function sendUserActivity(payload: UserActivityDataValueType) {
  const platform =
    Platform.OS === 'android'
      ? 'mobile-app'
      : Platform.OS === 'ios'
      ? 'iPhone-app'
      : 'web';
  if (platform !== 'web') return;

  const url = BASE_URL + Urls.SUBSCRIBER_ACTIVITY;

  // callback
  const callBack = () => {
    console.log({ payload });
  };

  networkClient.post(url, { ...payload, platform }, callBack);
}

export function createActivityPayloadAndSendActivity(
  userActivity: UserActivityDataValueType
) {
  const payload = {
    module: userActivity.module,
    action: userActivity.action,
    ...(userActivity.data ?? {}),
  };
  sendUserActivity(payload);
}

export const submitUserActivity = <
  T extends RequestPayload,
  U extends ResponsePayload
>(
  action: CommonAction<T, U>
) => {
  const userActivity = action.payload.url
    ? userActivityData[action.payload.url as keyof typeof Urls]
    : undefined;

  // in payload math userActivityData url
  if (userActivity) {
    // user activity data
    if (Array.isArray(userActivity)) {
      userActivity.forEach((payloadData) => {
        if (
          payloadData.method
            ? payloadData.method == action.payload.method
            : true
        ) {
          createActivityPayloadAndSendActivity(payloadData);
        }
      });
    } else {
      if (
        userActivity.method
          ? userActivity.method == action.payload.method
          : true
      ) {
        createActivityPayloadAndSendActivity(userActivity);
      }
    }
  } else {
    // console.log({ url: action.payload.url, userActivityData })
  }
};

// =========== types ============
export type ModuleName =
  | 'On Boarding'
  | 'Chatbot'
  | 'Contact Us'
  | 'Home'
  | 'Knowledge Connect'
  | 'ManageTB India'
  | 'Query2COE'
  | 'Referral Health Facility'
  | 'Screening Tool'
  | 'User Profile'
  | 'appVersion'
  | 'App Usage'
  | 'Guidance on ADR'
  | 'Diagnosis Algorithm'
  | 'Treatment Algorithm'
  | 'Latent TB Infection'
  | 'Differentiated Care'
  | 'NTEP Intervention'
  | 'Resource Material'
  | 'Survey'
  | 'Feedback'
  | 'Assessment'
  | 'TB Preventive Treatment'
  | 'Health Facility'
  | 'Screening tool';

type UserActivityDataType = {
  -readonly [key in keyof typeof Urls]?:
    | UserActivityDataValueType
    | UserActivityDataValueType[];
};

type UserActivityDataValueType = {
  module: ModuleName;
  action: string;
  method?: 'PATCH' | 'DELETE' | 'GET' | 'POST';
  data?: { [key: string]: unknown };
  timeSpent?: number;
};
