import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  GuestUserActivity,
  StoreSubscriberActivityParams,
} from '@nikshay-setu-v3-monorepo/types';
import moment from 'moment';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const checkTimeout = (remainingTime: number): boolean => {
  if (remainingTime === 0) {
    return;
  }
  const currentTime = moment();
  const timeoutTime = moment().add(remainingTime, 'seconds');
  // Check if the current time is after the timeout time
  return currentTime.isAfter(timeoutTime);
};

const getGuestUserActivity = async (): Promise<GuestUserActivity> => {
  const guestId = `guest-${await DeviceInfo.getUniqueId()}`;
  const sessionId = `session-${Date.now()}`;

  return {
    guestId,
    deviceId: await DeviceInfo.getUniqueId(),
    brand: await DeviceInfo.getBrand(),
    model: await DeviceInfo.getModel(),
    systemName: await DeviceInfo.getSystemName(),
    systemVersion: await DeviceInfo.getSystemVersion(),
    appVersion: await DeviceInfo.getVersion(),
    buildNumber: await DeviceInfo.getBuildNumber(),
    deviceType: await DeviceInfo.getDeviceType(),
    hasNotch: await DeviceInfo.hasNotch(),
    ipAddress: await DeviceInfo.getIpAddress().catch(() => undefined),
    macAddress: await DeviceInfo.getMacAddress().catch(() => undefined),
    carrier: await DeviceInfo.getCarrier().catch(() => undefined),
    firstVisit: new Date().toISOString(),
    sessionId,
  };
};

export const storeSubscriberActivity = async ({
  dispatch,
  module = null,
  action = '',
  subModule = null,
  timeSpent = null,
  payload,
}: StoreSubscriberActivityParams) => {
  if (module === 'guestActivity') {
    const getGuestUser = await getGuestUserActivity();
    payload = { ...getGuestUser, ...payload };
  }
  const Payload = payload && { payload: payload };
  const devicePlatform = {
    android: 'mobile-app',
    ios: 'iPhone-app',
    web: 'web',
  };

  return new Promise((resolve, reject) => {
    dispatch(
      createAction(
        {
          method: 'POST',
          url:
            module === 'guestActivity'
              ? 'GUEST_ACTIVITY'
              : 'SUBSCRIBER_ACTIVITY',
          data: {
            module: module, // module name (LeaderBoard, Assessment, kbase)
            subModule: subModule, // optional (for algorithm)
            action: action, // action performed
            platform: devicePlatform[Platform.OS] || 'web',
            ...Payload,
            ...(module === 'guestActivity' && { type: 'guest' }),
            timeSpent: timeSpent,
          },
        },
        (statusCode, res) => {
          if (statusCode === 200 && res) {
            // Resolve the promise with the status code if successful
            resolve(200);
          } else {
            // Reject the promise in case of an error or non-200 response
            reject(new Error('Failed to store subscriber activity.'));
          }
        },
      ),
    );
  });
};
