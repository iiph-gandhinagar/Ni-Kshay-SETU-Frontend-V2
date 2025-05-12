import {
  BottomBarData,
  HideBottomBarScreens,
  uiStyles,
} from '@nikshay-setu-v3-monorepo/constants';
import { RootReducerStates, ThemeProps } from '@nikshay-setu-v3-monorepo/types';
import {
  CustomRFValue as RFValue,
  useKeyboardVisibility,
} from '@nikshay-setu-v3-monorepo/utils';
import {
  BottomTabDescriptorMap,
  BottomTabNavigationEventMap,
} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
  useTheme,
} from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, TouchableHighlight, View } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { TourGuideZone, useTourGuideController } from 'rn-tourguide';
import { Column, Row } from './row_column';

type HeaderComponentProps = {
  state: TabNavigationState<ParamListBase>;
  descriptors: BottomTabDescriptorMap;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  insets: EdgeInsets;
};

const BottomBarComponent: React.FC<HeaderComponentProps> = ({
  state,
  descriptors,
  navigation,
  insets,
}) => {
  const isKeyboardVisible = useKeyboardVisibility();
  const { colors } = useTheme() as ThemeProps;
  const [isTour, setTour] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // Safely access Redux state with default values
  const appTranslations = useSelector(
    (state: RootReducerStates) => state?.appContext?.data?.appTranslations || {}
  );

  const { eventEmitter } = useTourGuideController();

  // Get active route safely
  const routeState = state?.routes?.[0]?.state;
  const activeRoute =
    routeState?.routes?.[routeState?.routes?.length - 1]?.name || '';

  // Animation Refs
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const scaleY = useRef(new Animated.Value(1)).current;

  // Handle tour events safely
  useEffect(() => {
    if (!eventEmitter) return;

    const handleOnStart = () => setTour(true);
    const handleOnStop = () => setTour(false);

    eventEmitter.on('start', handleOnStart);
    eventEmitter.on('stop', handleOnStop);

    return () => {
      eventEmitter.off('start', handleOnStart);
      eventEmitter.off('stop', handleOnStop);
    };
  }, [eventEmitter]);

  // Smooth animation on hide/show with error handling
  useEffect(() => {
    const shouldHide =
      isKeyboardVisible || HideBottomBarScreens.includes(activeRoute);

    if (!shouldHide) {
      setIsHidden(false); // Ensure it's visible before animation starts
    }

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: shouldHide ? 50 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: shouldHide ? 0 : 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleY, {
        toValue: shouldHide ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (shouldHide) {
        setIsHidden(true); // Hide after animation completes
      }
    });
  }, [isKeyboardVisible, activeRoute]);

  if (isHidden) return null; // Don't render when hidden

  // Ensure data is available before rendering
  if (!BottomBarData?.length) {
    return <View style={{ height: 0 }} />;
  }

  return (
    <Animated.View
      style={{
        backgroundColor: 'white',
        elevation: RFValue(30),
        ...uiStyles.iosShadow,
        shadowColor: colors.BLACK_000000,
        opacity,
        height: RFValue(62),
        transform: [{ translateY }, { scaleY }], // ✅ Use scaleY instead of height
        overflow: 'hidden',
      }}
    >
      <Row style={{ justifyContent: 'space-evenly', flex: 1 }}>
        {BottomBarData.map((v, key) => {
          const IsFocused = activeRoute === v?.route;
          const BottomIcon = IsFocused ? v?.activeIcon : v?.icon;

          if (!BottomIcon) {
            console.warn(`Missing icon for ${v?.name}`);
            return null;
          }

          const content = (
            <TouchableHighlight
              underlayColor='transparent'
              key={key + key + v?.name}
              style={{ flex: 1 }}
              onPress={() => {
                if (!isTour) navigation.navigate(v?.route);
              }}
            >
              <Column
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  marginTop: RFValue(10),
                  marginBottom: RFValue(25),
                }}
              >
                <BottomIcon
                  height={IsFocused ? RFValue(27) : RFValue(25)}
                  width={IsFocused ? RFValue(27) : RFValue(25)}
                />
                <Text
                  style={{
                    color: IsFocused ? colors.PINK_F18282 : colors.GREY_797979,
                    fontWeight: IsFocused ? '900' : '500',
                  }}
                >
                  {appTranslations?.[v?.name] || v?.name}
                </Text>
              </Column>
            </TouchableHighlight>
          );

          return key !== 0 ? (
            <TourGuideZone
              zone={key + 6}
              text={
                key === 1
                  ? 'Boost your skills to achieve mastery.'
                  : 'Update Your Profile Information'
              }
              borderRadius={RFValue(10)}
              style={{ flex: 1 }}
              key={key + '---'}
              shape='rectangle'
            >
              {content}
            </TourGuideZone>
          ) : (
            content
          );
        })}
      </Row>
    </Animated.View>
  );
};

export default BottomBarComponent;
