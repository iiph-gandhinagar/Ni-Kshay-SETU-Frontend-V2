import { loaderAnimation } from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles, uiStyles } from '@nikshay-setu-v3-monorepo/constants';
import { RootReducerStates, ThemeProps } from '@nikshay-setu-v3-monorepo/types';
import { getDataFromAsyncStorage } from '@nikshay-setu-v3-monorepo/utils';
import { useTheme } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { storeSubscriberActivity } from '../utils/functions';
import { AppNavigationGuest } from './GuestNavigationStack';
import { AppNavigationUser } from './UserNavigationStack';

export const AppNavigation = (): JSX.Element => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { colors } = useTheme() as ThemeProps;
  const dispatch = useDispatch();
  const APP_LOADING = useSelector(
    (state: RootReducerStates) =>
      state.appContext?.data?.appTranslations?.APP_LOADING
  );
  useEffect(() => {
    configureReanimatedLogger &&
      configureReanimatedLogger({
        level: ReanimatedLogLevel?.warn,
        strict: false, // Reanimated runs in strict mode by default
      });

    async function fetchToken() {
      try {
        const fetchedToken = await getDataFromAsyncStorage('token');
        if (fetchedToken) {
          storeSubscriberActivity({
            module: 'appVersion',
            action: `user_App_Version==${DeviceInfo.getVersion()}`,
            dispatch: dispatch,
          });
        }
        setToken(fetchedToken);
      } catch (error) {
        console.error('Error fetching token:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchToken();
  }, []);

  if (isLoading) {
    return (
      <View
        style={[
          uiStyles.jusContentAlignItem_center_flex1,
          { backgroundColor: colors.WHITE_FFFF },
        ]}
      >
        <LottieView
          autoPlay
          source={loaderAnimation}
          loop={true}
          style={uiStyles.loaderAnimation}
        />
        <Text style={fontStyles.Maison_500_15PX_21LH}>{APP_LOADING}</Text>
      </View>
    );
  }

  return token ? <AppNavigationUser /> : <AppNavigationGuest />;
};
