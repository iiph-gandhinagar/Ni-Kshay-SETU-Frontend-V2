import {
  ArrowSvg,
  BellSvg,
  LanguagesSvg,
  SideBarBTNSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import {
  fontStyles,
  headerCondition,
  HideTopBarScreens,
} from '@nikshay-setu-v3-monorepo/constants';
import { RootReducerStates, ThemeProps } from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { Layout } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { ParamListBase, RouteProp, useTheme } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { TourGuideZone } from 'rn-tourguide';
import { Row } from './row_column';

type HeaderComponentProps = {
  layout?: Layout;
  backTitle?: string;
  isExternal?: boolean;
  route?: RouteProp<ParamListBase>;
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const HeaderComponent: React.FC<HeaderComponentProps> = ({
  navigation,
  route,
  isExternal = false,
  backTitle,
}) => {
  const { colors } = useTheme() as ThemeProps;
  const appTranslations = useSelector(
    (state: RootReducerStates) => state.appContext?.data?.appTranslations
  );
  const headerName = headerCondition?.[route?.name]?.backTitle || 'APP_BACK';
  return (
    <View
      style={{
        backgroundColor: 'white',
        display: isExternal
          ? 'flex'
          : HideTopBarScreens?.includes(route.name)
          ? 'none'
          : 'flex',
      }}
    >
      <Row
        style={{
          backgroundColor: 'white',
          height: RFValue(55),
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomWidth: 1,
          marginHorizontal: isExternal ? RFValue(5) : RFValue(15),
          borderColor: colors.LIGHT_GREY_F4F4F4,
        }}
      >
        {headerCondition?.[route?.name]?.backIcon && (
          <Row
            style={{
              backgroundColor: 'white',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              style={{ alignItems: 'center', flexDirection: 'row' }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <ArrowSvg
                width={RFValue(25)}
                height={RFValue(25)}
                style={{ transform: [{ rotate: '180deg' }] }}
                stroke={colors.DARK_BLUE_394F89}
              />
              <Text
                numberOfLines={1}
                ellipsizeMode='tail'
                style={{
                  ...fontStyles.Maison_500_20PX_25LH,
                  marginHorizontal: RFValue(5),
                  flex: 1,
                  color: colors.DARK_BLUE_394F89,
                }}
              >
                {backTitle || appTranslations?.[headerName]}
              </Text>
            </TouchableOpacity>
          </Row>
        )}
        {headerCondition?.[route?.name]?.sideBar && (
          <Row style={{ alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => {
                const drawerNavigation =
                  navigation as NativeStackNavigationProp<ParamListBase> &
                    DrawerNavigationHelpers;
                drawerNavigation.openDrawer();
              }}
            >
              <SideBarBTNSvg width={RFValue(40)} height={RFValue(40)} />
            </TouchableOpacity>
            <Text
              style={{
                ...fontStyles.Maison_700_28PX_33LH,
                marginStart: RFValue(5),
                color: colors.DARK_BLUE_394F89,
              }}
              onPress={() => {
                navigation?.navigate('homeScreen');
              }}
            >
              {appTranslations?.NIKSHAY_SETU_NAME}
            </Text>
          </Row>
        )}
        <Row style={{ alignItems: 'center' }}>
          {headerCondition?.[route?.name]?.langIcon && (
            <TouchableOpacity
              onPress={() => {
                navigation?.navigate('language');
              }}
            >
              <LanguagesSvg width={RFValue(30)} height={RFValue(30)} />
            </TouchableOpacity>
          )}
          {/* {headerCondition?.[route?.name]?.profile && (
            <TouchableOpacity
              onPress={() => {
                navigation?.navigate('accountScreen');
              }}
            >
              <DefaultProfileSvg width={RFValue(40)} height={RFValue(40)} />
            </TouchableOpacity>
          )} */}
          {headerCondition?.[route?.name]?.notificationIcon && (
            <TourGuideZone zone={6} text='View Notifications' shape='circle'>
              <TouchableOpacity
                onPress={() => {
                  navigation?.navigate('notificationScreen');
                }}
              >
                <BellSvg width={RFValue(40)} height={RFValue(40)} />
              </TouchableOpacity>
            </TourGuideZone>
          )}
        </Row>
      </Row>
    </View>
  );
};

export default HeaderComponent;
