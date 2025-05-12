import { ThemeProps } from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, StatusBar, ViewStyle } from 'react-native';
interface ScreenContainerProps {
  children?: React.ReactNode;
  statusBarColor?: string;
  BackBtnName?: string;
  statusBarStyle?: 'default' | 'light-content' | 'dark-content';
  style?: ViewStyle;
  appBar?: boolean;
  backBtn?: boolean;
  languageICHide?: boolean;
  defaultProfile?: boolean;
}
const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  statusBarColor,
  statusBarStyle = 'light-content',
  style,
}) => {
  const { colors, dark } = useTheme() as ThemeProps;
  return (
    <React.Fragment>
      <StatusBar
        animated
        barStyle={dark ? 'light-content' : 'dark-content'}
        showHideTransition='slide'
        backgroundColor={statusBarColor || colors.WHITE_FFFF}
      />
      <SafeAreaView
        style={[
          {
            flex: 1,
            backgroundColor: colors.WHITE_FFFF,
            paddingHorizontal: RFValue(10),
          },
          style,
        ]}
      >
        {children}
      </SafeAreaView>
    </React.Fragment>
  );
};

export default ScreenContainer;
