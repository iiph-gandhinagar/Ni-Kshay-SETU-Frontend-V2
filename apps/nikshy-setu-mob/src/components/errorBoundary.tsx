import { AlertSvg } from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles } from '@nikshay-setu-v3-monorepo/constants';
import { RootStackParamList } from '@nikshay-setu-v3-monorepo/types';
import {
  NavigationProp,
  NavigationState,
  useNavigation,
  useNavigationState,
} from '@react-navigation/native';
import React, { ReactNode } from 'react';
import { Text, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch } from 'react-redux';
import { Dispatch, UnknownAction } from 'redux';
import { storeSubscriberActivity } from '../utils/functions';
import Button from './buttons/primaryButtons';

interface ErrorBoundaryState {
  hasError: boolean;
  buttonDisabled?: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  currentRouteName: string;
  navigation: NavigationProp<RootStackParamList>;
  dispatch: Dispatch<UnknownAction>;
}

class ErrorBoundaryWithProps extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
    buttonDisabled: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Error caught in ErrorBoundaryWithProps:', error, errorInfo);
    // Log or send the error to your server
  }
  handleButtonPress = async () => {
    this.setState({ buttonDisabled: true }); // Disable button on click

    const { navigation, dispatch, currentRouteName } = this.props;

    const apiLevel = await DeviceInfo?.getApiLevel();
    const deviceName = await DeviceInfo?.getDeviceName();
    const systemName = await DeviceInfo?.getSystemName();
    const errorPayload = {
      message: this.state.error?.message || null,
      errorName: this.state.error?.name || null,
      apiLevel: apiLevel || null,
      deviceName: deviceName || null,
      systemName: systemName || null,
      currentRouteName: currentRouteName || null,
      appVersion: DeviceInfo.getVersion(),
    };

    console.log({ errorPayload });

    storeSubscriberActivity({
      module: 'App_Error',
      action: 'unexpected_error',
      dispatch: dispatch,
      payload: errorPayload,
    });

    navigation.goBack();
  };

  render() {
    if (this.state.hasError) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <AlertSvg
            height={RFValue(80)}
            width={RFValue(80)}
            style={{ zIndex: 0 }}
          />
          <Text
            style={[
              fontStyles.Maison_400_16PX_25LH,
              {
                textAlignVertical: 'center',
                textAlign: 'center',
                margin: RFValue(40),
              },
            ]}
          >
            An unexpected error occurred.{'\n'} Please try again later.
          </Text>
          <Button
            title={
              !this.state.buttonDisabled
                ? 'Report bug and refresh'
                : 'Thank You'
            }
            bgColor={this.state.buttonDisabled ? '#999' : '#394F89'} // Change color when disabled
            onPress={this.state.buttonDisabled ? null : this.handleButtonPress}
            disabled={this.state.buttonDisabled} // Disable button
            textStyle={{ color: 'white' }}
            containerStyle={{
              margin: RFValue(10),
              paddingHorizontal: RFValue(40),
              paddingVertical: RFValue(10),
            }}
          />
        </View>
      );
    }
    return this.props.children;
  }
}

export default function ErrorBoundary(props: { children: ReactNode }) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
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
  console.log({ currentRouteName });
  return (
    <ErrorBoundaryWithProps
      navigation={navigation}
      currentRouteName={currentRouteName}
      {...props}
      dispatch={dispatch}
    />
  );
}
