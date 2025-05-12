import {
  noInternetAnimation,
  notificationAudio,
} from '@nikshay-setu-v3-monorepo/assets';
import {
  fontStyles,
  HideChatBotPopupOnScreens,
} from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  AppConfigDetails,
  RootReducerStates,
  RootStackParamList,
} from '@nikshay-setu-v3-monorepo/types';
import {
  getDataFromAsyncStorage,
  handleLogout,
  isEmpty,
  CustomRFValue as RFValue,
  storeDataToAsyncStorage,
} from '@nikshay-setu-v3-monorepo/utils';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import {
  NavigationProp,
  NavigationState,
  useNavigation,
  useNavigationState,
} from '@react-navigation/native';
import { CheckAppHealth } from 'apps/nikshy-setu-mob/src/components/appHealthCheckerModal';
import { ChatBotLogo } from 'apps/nikshy-setu-mob/src/components/cards/ChatBotLogo';
import RatingCard from 'apps/nikshy-setu-mob/src/components/cards/ratingCard';
import AchievementModal from 'apps/nikshy-setu-mob/src/components/commonComponents/achievementModal';
import SetGoalsModalComponent from 'apps/nikshy-setu-mob/src/components/commonComponents/setGoalsModalComponent';
import { useToast } from 'apps/nikshy-setu-mob/src/components/commonComponents/toastProvider';
import { requestNotificationPermission } from 'apps/nikshy-setu-mob/src/utils/CommonAndroidPermissions';
import { storeSubscriberActivity } from 'apps/nikshy-setu-mob/src/utils/functions';
import { dBInstance } from 'apps/nikshy-setu-mob/src/utils/SqlStore/Database';
import { debounce } from 'lodash';
import LottieView from 'lottie-react-native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  AppState,
  BackHandler,
  Linking,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import PushNotification from 'react-native-push-notification';
import SoundPlayer from 'react-native-sound-player';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../buttons/primaryButtons';
import ModalComponent from '../commonComponents/modal';
import { Row } from '../commonComponents/row_column';
interface StateProps {
  alertCategory: string;
  errorCode: number;
  isModal?: boolean;
  errorMessage: string;
  message: { en: string };
  severity: string;
}

export const AppModalsAndPermissions = () => {
  const [appTime, setAppTime] = useState<moment.Moment | null>(null);
  const [showGoalsPopup, setShowGoalsPopup] = useState(false);
  const [showErrorModal, setShowNoInternetPopup] = useState({
    isOpen: false,
    statusCode: null,
  });
  const [achievementPopup, setAchievementPopup] = useState({
    currentBadge: '',
    message: '',
    currentLevel: '',
  });
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const isError = useSelector(
    (state: RootReducerStates) => state.appContext?.error
  );
  const loadingApis = useSelector(
    (state: RootReducerStates) => state.appContext?.loadingApis
  );
  const appTranslations = useSelector(
    (state: RootReducerStates) => state.appContext?.data?.appTranslations
  );
  // Get current route name -
  const getActiveRouteName = (
    state: NavigationState | undefined
  ): string | undefined => {
    if (!state || state.index === undefined) return undefined;
    const route = state.routes[state.index];
    if (route.state) {
      return getActiveRouteName(route.state as NavigationState);
    }
    return route.name;
  };
  const currentRouteName = useNavigationState((state) =>
    getActiveRouteName(state)
  );
  // Uploads app usage data to server
  const uploadModuleUsage = debounce(async () => {
    let moduleUsage: any[] = [];
    try {
      const db = dBInstance();
      await db?.transaction((txn) => {
        txn.executeSql(
          'SELECT * FROM app_time ORDER BY id LIMIT 10',
          [],
          (_, results) => {
            if (results?.rows?.length > 0) {
              for (let index = 0; index < results?.rows?.length; index++) {
                moduleUsage.push(results?.rows?.item(index));
              }
            } else {
              moduleUsage = [];
            }
          }
        );
      });

      if (moduleUsage.length > 0) {
        const response = await storeSubscriberActivity({
          module: 'App Usage',
          action: 'store_usage_count',
          payload: { moduleUsage },
          dispatch,
        });

        if (response === 200) {
          db?.transaction((txn) => {
            moduleUsage.forEach((item) => {
              txn.executeSql('DELETE FROM app_time WHERE id=?', [item.id]);
            });
          })
            .then(async () => {
              console.log('DELETE FROM app_time');
            })
            .catch((error) => {
              console.log('uploadModuleUsage catch-inner', error);
            });
          uploadModuleUsage();
        }
      }
    } catch (error) {
      console.error('uploadModuleUsage error:', error);
    }
  }, 2000);
  // Handles app focus state changes
  const handleAppStateFocus = () => {
    setAppTime(moment());
    uploadModuleUsage();
  };
  // Handles app blur state changes
  const handleAppStateBlur = () => {
    if (appTime) {
      const diff = moment().diff(appTime, 'seconds');
      if (diff > 0) {
        dBInstance()
          ?.transaction((txn) => {
            txn.executeSql(
              'INSERT INTO app_time(module, activity_type, sub_module_id, time) VALUES (?, ?, ?, ?)',
              ['overall_app_usage', 'app_usage', 0, diff]
            );
          })
          .then(() => setAppTime(null))
          .catch((err) => console.error('handleAppStateBlur error:', err));
      }
    }
  };
  // Push Notification Configuration
  const configurePushNotifications = async () => {
    const uniqueID = await DeviceInfo.getUniqueId();
    // Background notification handler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Background Message:', remoteMessage);
      PushNotification.localNotification({
        channelId: 'nikshay_setu',
        title: remoteMessage.notification.title,
        message: remoteMessage.notification.body,
      });
    });
    // Notification config
    PushNotification.configure({
      onRegister: async (token) => {
        const storedToken = await getDataFromAsyncStorage('notification_token');
        if (Platform.OS === 'ios') {
          const iosToken = await requestNotificationPermissionIOS();
          if (storedToken !== iosToken) {
            dispatch(
              createAction(
                {
                  data: {
                    deviceId: uniqueID,
                    notificationToken: iosToken,
                  },
                  method: 'POST',
                  url: 'STORE_DEVICE_TOKEN',
                },
                (code, res) => {
                  if (code === 200) {
                    storeDataToAsyncStorage(
                      'notification_token',
                      iosToken?.toString()
                    );
                  }
                }
              )
            );
          }
        } else if (storedToken !== token.token) {
          dispatch(
            createAction(
              {
                data: {
                  deviceId: uniqueID,
                  notificationToken: token.token,
                },
                method: 'POST',
                url: 'STORE_DEVICE_TOKEN',
              },
              (code, res) => {
                if (code === 200) {
                  storeDataToAsyncStorage('notification_token', token.token);
                }
              }
            )
          );
        }
      },
      onNotification: (notification) => {
        console.log(
          '--------------------------notification----------------------->',
          notification
        );
        if (notification.data.type === 'Achievement') {
          setAchievementPopup({
            currentBadge: notification.data?.currentBadge,
            message: notification?.message,
            currentLevel: notification?.data?.currentLevel,
          });
        }
        if (notification?.data?.link) {
          if (AppState.currentState === 'active' && notification.foreground) {
            SoundPlayer.playAsset(notificationAudio);
            showToast(
              (notification?.title || '') + '\n' + (notification?.message || '')
            );
          } else {
            Linking.openURL(notification?.data.link);
          }
        }
        if (Platform.OS === 'ios') {
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
      },
      requestPermissions: true,
    });
  };

  // Request notification permissions for iOS
  const requestNotificationPermissionIOS = async () => {
    const authorizationStatus = await messaging().requestPermission();
    return authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
      ? 'granted'
      : 'denied';
  };
  // Effect hooks to configure notifications and handle app state
  useEffect(() => {
    if (Platform.OS === 'ios') {
      // iOS-specific AppState event handling
      const handleAppStateChange = (nextAppState) => {
        if (nextAppState === 'active') {
          handleAppStateFocus();
        } else if (nextAppState === 'background') {
          handleAppStateBlur();
        }
      };

      // Adding the event listener
      const subscription = AppState.addEventListener(
        'change',
        handleAppStateChange
      );

      // Cleanup function to remove the event listener
      return () => {
        subscription.remove();
      };
    } else if (Platform.OS === 'android') {
      // Android-specific AppState event handling
      const focusListener = AppState.addEventListener(
        'focus', // This is hypothetical, as Android should use the same 'change' event.
        handleAppStateFocus
      );
      const blurListener = AppState.addEventListener(
        'blur', // This is hypothetical, as Android should use the same 'change' event.
        handleAppStateBlur
      );

      return () => {
        focusListener.remove();
        blurListener.remove();
      };
    }
  }, [appTime]);

  // Effect hook to check for goals and show popup
  useEffect(() => {
    const checkGoal = async () => {
      const goal = await getDataFromAsyncStorage('goal');
      if (goal <= 0 && !showGoalsPopup) {
        setShowGoalsPopup(true);
      }
    };

    const timeoutId = setTimeout(checkGoal, 100000);
    return () => clearTimeout(timeoutId);
  }, [showGoalsPopup]);
  const [showCheckAppHealth, setShowCheckAppHealth] = useState(false);

  useEffect(() => {
    if (!isEmpty(isError)) {
      if (isError?.statusCode === 'ERR_NETWORK' && !showErrorModal?.isOpen) {
        setShowNoInternetPopup({ isOpen: true, statusCode: 'ERR_NETWORK' });
      } else if (
        isError?.statusCode === 401 &&
        isError?.message === 'Unauthorized User'
      ) {
        setShowNoInternetPopup({ isOpen: true, statusCode: 'Unauthorized' });
      } else if (isError?.statusCode === 500) {
        setShowNoInternetPopup({
          isOpen: true,
          statusCode: 500,
        });
      } else if (isError?.statusCode === 403) {
        setShowNoInternetPopup({
          isOpen: true,
          statusCode: 403,
        });
      }
    }
  }, [isError]);

  useEffect(() => {
    dispatch(
      createAction<null, AppConfigDetails>({
        method: 'GET',
        url: 'APP_CONFIG_DETAILS',
      })
    );
  }, []);
  useEffect(() => {
    const initializeNotifications = async () => {
      const androidVersion = parseInt(DeviceInfo.getSystemVersion(), 10);
      if (Platform.OS === 'android' && androidVersion >= 13) {
        const permissionStatus = await requestNotificationPermission();
        if (permissionStatus === 'granted') {
          await configurePushNotifications();
        }
      } else {
        await configurePushNotifications();
      }
    };
    initializeNotifications();
    const timer = setTimeout(() => {
      setShowCheckAppHealth(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const UNAUTHORIZED = () => {
    return (
      <View style={{ flex: 1 }}>
        <Text style={[fontStyles.Maison_400_14PX_17LH]}>Unauthorized</Text>
        <Text
          style={[
            fontStyles.Maison_300_13PX_15LH,
            { marginVertical: RFValue(10) },
          ]}
        >
          Error: Your session has expired.{'\n'}Please log in again to continue.
        </Text>
        <Button
          title={'Re-login'}
          bgColor='#394F89'
          containerStyle={{ margin: RFValue(15), marginBottom: 0, flex: 1 }}
          onPress={() => {
            handleLogout((code) => {
              if (code === 200) {
                navigation.navigate('logIn', {
                  tokenRefresher: 'tokenRefresh',
                });
              }
            });
          }}
        />
      </View>
    );
  };
  const ERR_NETWORK = () => {
    return (
      <View>
        <LottieView
          autoPlay
          source={noInternetAnimation}
          loop={true}
          style={{
            height: RFValue(150),
            width: RFValue(150),
            alignSelf: 'center',
            opacity: 1,
          }}
        />
        <Button
          title={appTranslations?.APP_REFRESH}
          bgColor='#394F89'
          containerStyle={{ margin: RFValue(15), marginBottom: 0, flex: 1 }}
          loaderEnable={loadingApis?.includes('CHECK_HEALTH_STATUS')}
          disabled={loadingApis?.includes('CHECK_HEALTH_STATUS')}
          onPress={() => {
            dispatch(
              createAction<
                { appVersion: number | string; platform: string },
                StateProps
              >(
                {
                  method: 'POST',
                  url: 'CHECK_HEALTH_STATUS',
                  data: {
                    appVersion: DeviceInfo.getVersion(),
                    platform:
                      Platform.OS === 'android' ? 'mobile-app' : 'iPhone-app',
                  },
                },
                (code, res) => {
                  if (code === 200) {
                    navigation?.navigate('homeScreen', {
                      tokenRefresher: '--',
                    });
                    setShowNoInternetPopup({ isOpen: false, statusCode: null });
                  }
                }
              )
            );
          }}
        />
      </View>
    );
  };
  const CHECK_HEALTH_STATUS = () => {
    return (
      <View style={{ flex: 1 }}>
        <Text
          style={[
            fontStyles?.Maison_500_16PX_21LH,
            { textAlign: 'center', marginBottom: RFValue(20) },
          ]}
        >
          {appTranslations?.APP_MESS_INTERNAL_SERVER_ERR}
        </Text>
        <Text style={[fontStyles?.Maison_500_14PX_18LH, { textAlign: 'auto' }]}>
          {appTranslations?.APP_MESS_SERVER_UNABLE_ERR}
        </Text>
        <Text
          style={[
            fontStyles?.Maison_400_10PX_12LH,
            { textAlign: 'left', marginTop: RFValue(20) },
          ]}
        >
          Status Code: {showErrorModal?.statusCode || '000'}
        </Text>
        <Row style={{ justifyContent: 'space-between' }}>
          <Button
            title={appTranslations?.APP_REFRESH}
            bgColor='#394F89'
            containerStyle={{
              margin: RFValue(15),
              marginBottom: 0,
              flex: 1,
            }}
            loaderEnable={loadingApis?.includes('CHECK_HEALTH_STATUS')}
            disabled={loadingApis?.includes('CHECK_HEALTH_STATUS')}
            onPress={() => {
              dispatch(
                createAction<
                  { appVersion: number | string; platform: string },
                  StateProps
                >(
                  {
                    method: 'POST',
                    url: 'CHECK_HEALTH_STATUS',
                    data: {
                      appVersion: DeviceInfo.getVersion(),
                      platform:
                        Platform.OS === 'android' ? 'mobile-app' : 'iPhone-app',
                    },
                  },
                  (code, res) => {
                    if (code === 200) {
                      setShowNoInternetPopup({
                        isOpen: false,
                        statusCode: null,
                      });
                    }
                  }
                )
              );
            }}
          />
          <Button
            title={appTranslations?.APP_OK}
            bgColor='#394F89'
            containerStyle={{
              margin: RFValue(15),
              marginBottom: 0,
              flex: 1,
            }}
            loaderEnable={loadingApis?.includes('CHECK_HEALTH_STATUS')}
            disabled={loadingApis?.includes('CHECK_HEALTH_STATUS')}
            onPress={() => {
              BackHandler.exitApp();
            }}
          />
        </Row>
      </View>
    );
  };
  const FORBIDDEN = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: RFValue(15) }}>
        <Text style={[fontStyles.Maison_400_14PX_17LH]}>Access Denied</Text>
        <Text
          style={[
            fontStyles.Maison_300_13PX_15LH,
            { marginVertical: RFValue(10) },
          ]}
        >
          You do not have permission to access this resource.
        </Text>
        <Button
          title='exit App'
          bgColor='#394F89'
          containerStyle={{ margin: RFValue(15), marginBottom: 0, flex: 1 }}
          onPress={() => {
            BackHandler.exitApp();
          }}
        />
      </View>
    );
  };
  const INTERNAL_SERVER_ERROR = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: RFValue(15) }}>
        <Text style={[fontStyles.Maison_400_14PX_17LH]}>
          Something went wrong
        </Text>
        <Text
          style={[
            fontStyles.Maison_300_13PX_15LH,
            { marginVertical: RFValue(10) },
          ]}
        >
          Our servers are currently facing issues. Please try again later.
        </Text>
        <Button
          title='Try Again'
          bgColor='#394F89'
          containerStyle={{ margin: RFValue(15), marginBottom: 0, flex: 1 }}
          onPress={() => {
            // You can retry the same action or reload the screen
            // Optional: trigger the health check or reload logic
            dispatch(
              createAction(
                {
                  method: 'POST',
                  url: 'CHECK_HEALTH_STATUS',
                  data: {
                    appVersion: DeviceInfo.getVersion(),
                    platform:
                      Platform.OS === 'android' ? 'mobile-app' : 'iPhone-app',
                  },
                },
                (code, res) => {
                  if (code === 200) {
                    navigation?.navigate('homeScreen');
                  }
                }
              )
            );
          }}
        />
      </View>
    );
  };

  const renderErrorModal = (errorCode: number | string) => {
    switch (errorCode) {
      case 401:
        return <UNAUTHORIZED />;
      case 403:
        return <FORBIDDEN />;
      case 500:
        return <INTERNAL_SERVER_ERROR />;
      case 'ERR_NETWORK':
        return <ERR_NETWORK />;
      default:
        return <CHECK_HEALTH_STATUS />;
    }
  };

  return (
    <React.Fragment>
      {showGoalsPopup && (
        <SetGoalsModalComponent
          onClose={() => {
            setShowGoalsPopup(false);
          }}
          open={showGoalsPopup}
          appTranslations={appTranslations}
          title={appTranslations?.APP_SET_GOAL_TEXT}
        />
      )}
      {Boolean(achievementPopup?.currentBadge) && (
        <AchievementModal
          onClose={() => {
            setAchievementPopup({
              currentBadge: '',
              message: '',
              currentLevel: '',
            });
          }}
          open={Boolean(achievementPopup?.currentBadge)}
          info={achievementPopup}
        />
      )}
      {!HideChatBotPopupOnScreens.includes(currentRouteName) && <ChatBotLogo />}
      {showCheckAppHealth && <CheckAppHealth />}
      <RatingCard />
      <ModalComponent
        closeModal={() => {}}
        isOpen={showErrorModal?.isOpen}
        overlayStyle={{ opacity: 0.9, backgroundColor: 'black' }}
        containerStyle={{
          backgroundColor: 'white',
          zIndex: 999999,
          margin: RFValue(10),
        }}
      >
        {renderErrorModal(showErrorModal?.statusCode)}
      </ModalComponent>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({});
