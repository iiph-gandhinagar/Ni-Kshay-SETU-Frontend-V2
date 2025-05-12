import { loaderAnimation } from '@nikshay-setu-v3-monorepo/assets';
import {
  LightTheme,
  fontStyles,
  uiStyles,
} from '@nikshay-setu-v3-monorepo/constants';
import { initStore } from '@nikshay-setu-v3-monorepo/store';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  AppRegistry,
  Appearance,
  KeyboardAvoidingView,
  LogBox,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { TourGuideProvider } from 'rn-tourguide';
import { TooltipComponent } from './components/cards/TourCard';
import { ToastProvider } from './components/commonComponents/toastProvider';
import { AppNavigation } from './Stacks/AppNavigation';
import { linking } from './utils/DeepLinking';
import { initialize } from './utils/SqlStore/Database';
LogBox.ignoreLogs(['new NativeEventEmitter']);
LogBox.ignoreAllLogs();
export const App = () => {
  const [loader, setLoader] = useState(false);
  const [refresh, setRefreshToken] = useState(false);
  const systemTheme = useColorScheme();
  const [themeState, setThemeState] = useState(systemTheme || 'light');
  const ref = useRef<NavigationContainerRef<{}>>(null);
  const dbInitialize = () => {
    initialize();
  };
  useEffect(() => {
    setLoader(false);
    setTimeout(() => {
      setLoader(true);
    }, 100);
    setRefreshToken(false);
  }, [refresh, themeState]);
  useEffect(() => {
    if (!loader) dbInitialize();
    setTimeout(() => {
      SplashScreen.hide();
      setLoader(true);
    }, 1000);
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (colorScheme) {
        setThemeState(colorScheme);
      }
    });
    return () => subscription.remove();
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <TourGuideProvider
        {...{
          tooltipComponent: TooltipComponent,
          backdropColor: '#00000080',
          wrapperStyle: {},
          preventOutsideInteraction: true,
        }}
        androidStatusBarVisible={true}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <ToastProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Provider store={initStore()}>
                {loader && !refresh && (
                  <NavigationContainer
                    linking={linking}
                    fallback={
                      <View
                        style={[
                          uiStyles.jusContentAlignItem_center_flex1,
                          { backgroundColor: '#FFFFFF' },
                        ]}
                      >
                        <LottieView
                          autoPlay
                          source={loaderAnimation}
                          loop={true}
                          style={uiStyles.loaderAnimation}
                        />
                        <Text style={fontStyles.Maison_500_15PX_21LH}>
                          {'loading...'}
                        </Text>
                      </View>
                    }
                    onUnhandledAction={(v: {
                      type: string;
                      payload?:
                        | { params?: { tokenRefresher?: string } }
                        | null
                        | undefined;
                      source?: string;
                      target?: string;
                    }) => {
                      if (
                        v?.payload?.params?.tokenRefresher === 'tokenRefresh'
                      ) {
                        setRefreshToken(true);
                      }
                    }}
                    ref={ref}
                    // theme={themeState === 'dark' ? AppDarkTheme : LightTheme}
                    theme={LightTheme}
                  >
                    <StatusBar
                      animated={true}
                      backgroundColor='white'
                      barStyle={'dark-content'}
                    />
                    <AppNavigation />
                  </NavigationContainer>
                )}
              </Provider>
            </GestureHandlerRootView>
          </ToastProvider>
        </SafeAreaView>
      </TourGuideProvider>
    </KeyboardAvoidingView>
  );
};

AppRegistry.registerComponent('NikshySetuMob', () => App);
