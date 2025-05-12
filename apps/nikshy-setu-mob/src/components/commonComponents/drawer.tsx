import {
  AppLanguageBlueSvg,
  ApplicationInteractionSvg,
  ArrowSvg,
  ContactSvg,
  InfoIconSvg,
  LeaderboardSvg,
  LogoutSvg,
  PatientManageToolSvg,
  PrivacyPolicySvg,
  ReferralHealthSvg,
  ResourceMaterialsSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles } from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { RootReducerStates, ThemeProps } from '@nikshay-setu-v3-monorepo/types';
import {
  getDataFromAsyncStorage,
  handleLogout,
  removeItemFromAsyncStorage,
  CustomRFValue as RFValue,
  storeDataToAsyncStorage,
} from '@nikshay-setu-v3-monorepo/utils';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  ViewStyle,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { useDispatch, useSelector } from 'react-redux';
import { Row } from './row_column';

export const DrawerComponent = (props: DrawerContentComponentProps) => {
  const { colors } = useTheme() as ThemeProps;
  const appTranslations = useSelector(
    (state: RootReducerStates) => state.appContext?.data?.appTranslations
  );
  const dispatch = useDispatch();

  const [openLogs, setOpenLogs] = useState(0);
  const iconHeightWidth = {
    strokeWidth: 0,
    height: RFValue(20),
    width: RFValue(20),
    color: colors.DARK_BLUE_394F89,
    stroke: colors.DARK_BLUE_394F89,
  };
  type DrawerItemProps = {
    index: number;
    item: {
      name: string;
      navigateTo?: string; // Optional navigation route
      icon?: React.ReactNode; // Icon component
    };
    underlayColor?: string | null; // Underlay color for TouchableHighlight
    style?: ViewStyle; // Additional styling for the Row container
    colors: {
      BLACK_000000: string; // Color for text
    };
  };

  const DrawerItem: React.FC<DrawerItemProps> = ({
    index,
    item,
    underlayColor = null,
    style,
    colors,
  }) => {
    const handlePress = () => {
      if (item.navigateTo) {
        props?.navigation?.navigate(item.navigateTo);
      } else if (item?.name === 'DRAWER_PRIVACY_POLICY') {
        props?.navigation.navigate('contentView', {
          contentType: 'WebPage',
          url: `${process.env.NX_PUBLIC_WEB_APP_URL}/privacy-policy`,
        });
      } else if (item?.name === 'DRAWER_SIGN_OUT') {
        getDataFromAsyncStorage('token').then((v) => {
          getDataFromAsyncStorage('userId').then((userId) => {
            if (v) {
              dispatch(
                createAction(
                  {
                    method: 'POST',
                    url: 'LOGOUT',
                    data: { refreshToken: v, userId },
                  },
                  (code, res) => {
                    if (code === 200) {
                      handleLogout((code) => {
                        if (code === 200) {
                          props?.navigation.navigate('logIn', {
                            tokenRefresher: 'tokenRefresh',
                          });
                        }
                      });
                    }
                  }
                )
              );
            }
          });
        });
      }
    };
    return (
      <TouchableHighlight
        key={index + item.name}
        onPress={handlePress}
        underlayColor={underlayColor}
      >
        <Row
          key={index + item.name}
          style={[
            {
              alignItems: 'center',
              justifyContent: 'space-between',
            },
            style,
          ]}
        >
          <Row style={{ alignItems: 'center', flex: 1 }}>
            {item.icon}
            <Text
              style={[styles.drawerItem, { color: colors.BLACK_000000 }]}
              numberOfLines={1}
              ellipsizeMode='tail'
            >
              {appTranslations?.[item.name]}
            </Text>
          </Row>
          <ArrowSvg />
        </Row>
      </TouchableHighlight>
    );
  };
  return (
    <DrawerContentScrollView
      style={[
        styles.drawer,
        {
          backgroundColor: colors.OFF_WHITE_F8FAFF,
          shadowColor: colors.BLACK_000000,
        },
      ]}
    >
      <Row style={{ alignItems: 'center' }}>
        {/* <SideBarBTNSvg width={RFValue(40)} height={RFValue(40)} /> */}
        <Text
          style={{
            fontSize: RFValue(27),
            marginStart: 5,
            fontWeight: '700',
            color: colors.DARK_BLUE_394F89,
          }}
        >
          {appTranslations?.NIKSHAY_SETU_NAME}
        </Text>
      </Row>
      <View
        style={{
          backgroundColor: 'gray',
          height: 1,
          marginVertical: RFValue(10),
        }}
      />
      <View
        style={{
          backgroundColor: colors.WHITE_FFFF,
          paddingStart: RFValue(5),
          borderRadius: RFValue(10),
          marginTop: RFValue(10),
        }}
      >
        {[
          {
            icon: <PatientManageToolSvg {...iconHeightWidth} />,
            name: 'DRAWER_PATIENT_MANAGE',
            navigateTo: 'moreTools',
          },
          {
            icon: <ResourceMaterialsSvg {...iconHeightWidth} />,
            name: 'DRAWER_RESOURCE_MATERIAL',
            navigateTo: 'moreTools',
          },
          {
            icon: <ReferralHealthSvg {...iconHeightWidth} />,
            name: 'DRAWER_REFERRAL_HEALTH_FACILITY',
            navigateTo: 'referralHealth',
          },
        ].map((item, index) => {
          return (
            <DrawerItem
              colors={colors}
              index={index}
              item={item}
              key={index + item?.name}
            />
          );
        })}
      </View>
      <View
        style={{
          backgroundColor: colors.WHITE_FFFF,
          paddingStart: RFValue(5),
          borderRadius: RFValue(10),
          marginTop: RFValue(20),
        }}
      >
        {[
          {
            icon: <ApplicationInteractionSvg {...iconHeightWidth} />,
            name: 'DRAWER_APPLICATION_INTERACTION',
            navigateTo: 'surveyTool',
          },
          {
            icon: <LeaderboardSvg {...iconHeightWidth} />,
            name: 'DRAWER_LEADERBOARD',
            navigateTo: 'leaderBoardScreen',
          },
        ].map((item, index) => {
          return (
            <DrawerItem
              colors={colors}
              index={index}
              item={item}
              key={index + item?.name}
            />
          );
        })}
      </View>
      <View
        style={{
          backgroundColor: colors.WHITE_FFFF,
          paddingStart: RFValue(5),
          borderRadius: RFValue(10),
          marginTop: RFValue(20),
        }}
      >
        {[
          {
            icon: <AppLanguageBlueSvg {...iconHeightWidth} />,
            name: 'DRAWER_APP_LANG',
            navigateTo: 'language',
          },
          {
            icon: <ContactSvg {...iconHeightWidth} />,
            name: 'DRAWER_CONTACT_US',
            navigateTo: 'contactUs',
          },
          {
            icon: <InfoIconSvg {...iconHeightWidth} />,
            name: 'DRAWER_ABOUT_US',
            navigateTo: 'aboutUs',
          },
          {
            icon: <PrivacyPolicySvg {...iconHeightWidth} />,
            name: 'DRAWER_PRIVACY_POLICY',
            navigateTo: '',
          },
          { icon: <LogoutSvg {...iconHeightWidth} />, name: 'DRAWER_SIGN_OUT' },
        ].map((item, index) => {
          return (
            <DrawerItem
              colors={colors}
              index={index}
              item={item}
              key={index + item?.name}
            />
          );
        })}
      </View>
      <View
        style={{
          marginTop: RFValue(50),
          alignItems: 'center',
          // alignSelf: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={[
            fontStyles.Maison_400_10PX_12LH,
            { color: colors?.DARK_GREY_4B5F83, marginTop: RFValue(5) },
          ]}
        >
          {appTranslations?.DEV_TEAM_INFO}
        </Text>

        <Pressable
          style={{
            // marginTop: RFValue(50),
            alignItems: 'center',
            flexDirection: 'row',
            // alignSelf: 'flex-start',
            justifyContent: 'space-between',
          }}
          onLongPress={() => {
            setOpenLogs((prev) => (prev === 4 ? 0 : prev + 1));
          }}
        >
          <Text
            style={[
              fontStyles.Maison_400_10PX_12LH,
              {
                color: openLogs === 4 ? 'green' : colors?.DARK_GREY_4D4D4D,
                marginTop: RFValue(5),
              },
            ]}
          >
            Version :{' '}
            {DeviceInfo.getVersion() +
              ' (' +
              (DeviceInfo.getBuildNumber() || '--') +
              ') '}
          </Text>
        </Pressable>
        {openLogs === 4 && (
          <TextInput
            style={{
              backgroundColor: 'transparent',
              borderWidth: 1,
              width: RFValue(120),
              marginTop: RFValue(10),
            }}
            onChangeText={(v) => {
              if (v === '_567') {
                props?.navigation?.navigate('logsScreen');
              } else if (v === '_1567') {
                storeDataToAsyncStorage('showLogsOnTop', 'showLogsOnTop');
              } else if (v === '_off') {
                setOpenLogs(0);
                removeItemFromAsyncStorage('showLogsOnTop');
              }
            }}
          />
        )}
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    padding: RFValue(20),
    backgroundColor: '#f5f5f5',
  },
  drawerHeaderText: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
  },
  drawer: {
    height: '100%',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: RFValue(5),
    elevation: RFValue(5),
    paddingHorizontal: RFValue(10),
  },
  drawerItem: {
    fontSize: RFValue(15),
    padding: RFValue(15),
    fontWeight: '500',
    alignItems: 'center',
  },
});
