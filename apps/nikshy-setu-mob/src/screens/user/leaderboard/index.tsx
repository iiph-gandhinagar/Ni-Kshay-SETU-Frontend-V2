import { ImagePlaceholderPng } from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles, STORE_URL } from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  RootReducerStates,
  RootStackParamList,
  ScreenProps,
} from '@nikshay-setu-v3-monorepo/types';
import {
  getDataFromAsyncStorage,
  CustomRFValue as RFValue,
} from '@nikshay-setu-v3-monorepo/utils';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Row } from 'apps/nikshy-setu-mob/src/components/commonComponents/row_column';
import CircularProgress from 'apps/nikshy-setu-mob/src/components/progressBar/CircularProgress';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { UserProfileApiResponse } from 'shared/types/src/screens/UserTypes';
import AchievementsFragments from './AchievementsFragments';
import InformationFragment from './InformationFragment';
import LeaderboardFragment from './leaderboardFragment';
import TaskFragment from './TaskFragment';
const totalHeight = Dimensions?.get('window')?.height;
const { width } = Dimensions.get('window');
type FragmentProps = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'leaderBoardScreen',
    undefined
  >;
  route: RouteProp<RootStackParamList, 'leaderBoardScreen'>;
};
const tabs = [
  'APP_LEADERBOARD',
  'LEADERBOARD_TASKS',
  'LEADERBOARD_ACHIEVEMENTS',
  'LEADERBOARD_INFORMATION',
];

const LeaderboardScreen: React.FC<ScreenProps<'leaderBoardScreen'>> = ({
  navigation,
  route,
}) => {
  const { theme } = route?.params;
  const colors = theme?.colors;
  const [activeTab, setActiveTab] = useState<string>('APP_LEADERBOARD');
  const pan = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollHorizontally = (direction: 'left' | 'right'): void => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: direction === 'left' ? 0 : 100,
        animated: true,
      });
    }
  };

  // Handle tab swipe logic
  const handleSwipe = (direction: 'left' | 'right') => {
    setActiveTab((prevTab) => {
      const currentIndex = tabs.indexOf(prevTab);
      const newIndex =
        direction === 'left' ? currentIndex + 1 : currentIndex - 1;
      if (newIndex >= 0 && newIndex < tabs.length) {
        animateSwipe(newIndex);
        return tabs[newIndex];
      }
      return prevTab;
    });
  };

  const animateSwipe = (index: number) => {
    Animated.spring(pan, {
      toValue: -index * width, // Use screen width for swipe animation
      useNativeDriver: true,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, { dx, dy }) =>
        Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 20,
      onPanResponderRelease: (_, { dx }) => {
        if (dx > 70) {
          handleSwipe('right');
        } else if (dx < -70) {
          handleSwipe('left');
        }
      },
    })
  ).current;
  const dispatch = useDispatch();
  useEffect(() => {
    const activeIndex = tabs.indexOf(activeTab);
    animateSwipe(activeIndex);
    scrollHorizontally([0, 1].includes(activeIndex) ? 'left' : 'right');
  }, [activeTab]);
  const { error, data } = useSelector(
    (state: RootReducerStates) => state.appContext
  );
  const loadingApis = useSelector(
    (state: RootReducerStates) => state.appContext?.loadingApis
  );
  const appTranslations = route?.params?.appTranslations;
  const completionPercentage = (
    (data?.user_profile?.completedTasks / data?.user_profile?.totalTasks) *
    100
  ).toFixed(2);
  const screens = useMemo(
    () => ({
      APP_LEADERBOARD: (
        <LeaderboardFragment
          colors={colors}
          appTranslations={appTranslations}
          loadingApis={loadingApis}
        />
      ),
      LEADERBOARD_TASKS: (
        <TaskFragment
          colors={colors}
          userInfo={data?.user_profile}
          appTranslations={appTranslations}
          loadingApis={loadingApis}
        />
      ),
      LEADERBOARD_ACHIEVEMENTS: (
        <AchievementsFragments
          colors={colors}
          currentLevel={data?.user_profile?.currentLevel}
          appTranslations={appTranslations}
          loadingApis={loadingApis}
        />
      ),
      LEADERBOARD_INFORMATION: (
        <InformationFragment
          colors={colors}
          appTranslations={appTranslations}
        />
      ),
    }),
    [data?.user_profile, loadingApis]
  );
  useEffect(() => {
    getDataFromAsyncStorage('userId').then((v) => {
      if (v) {
        dispatch(
          createAction<null, UserProfileApiResponse>({
            method: 'GET',
            url: 'USER_PROFILE',
            query: v,
          })
        );
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#6A5ADF', '#9087E4']}
        end={{ x: 0.7, y: 1 }}
        start={{ x: 0.3, y: 0 }}
        style={styles.gradientContainer}
      >
        <Row>
          <View style={styles.circularProgressContainer}>
            <CircularProgress
              size={100}
              strokeWidth={7}
              outerProgress={
                data?.user_profile?.totalTasks && completionPercentage / 100
              }
              innerProgress={null}
              outerStokeColor='#ffff'
              outerGradientColors={['#FF8008', '#FFC837']}
              hideInnerProgressBar={true}
              duration={2000}
            >
              <Image
                source={{
                  uri:
                    (data?.user_profile?.profileImage &&
                      STORE_URL + data?.user_profile?.profileImage) ||
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6nhCkw4XFXUxIvH4VjOEXEpyqq0Z7Yb8YeQ&s',
                }}
                height={RFValue(70)}
                width={RFValue(70)}
                style={styles.profileImage}
                progressiveRenderingEnabled={true}
                defaultSource={ImagePlaceholderPng}
              />
            </CircularProgress>
          </View>
          <View style={styles.textContainer}>
            <Text style={[fontStyles.Maison_600_28PX_42LH, styles.whiteText]}>
              {(data?.user_profile?.totalTasks && completionPercentage) || 0} %
            </Text>
            <Text
              style={[
                fontStyles.Maison_500_15PX_21LH,
                styles.whiteText,
                { marginVertical: RFValue(5) },
              ]}
            >
              {data?.user_profile?.name || ''}
            </Text>
            <Text style={[fontStyles.Maison_300_13PX_15LH, styles.whiteText]}>
              {appTranslations?.LABEL_CADRE} :{' '}
              {data?.user_profile?.cadreType?.replace('_', ' ') || ''}
            </Text>
            <Text style={[fontStyles.Maison_300_13PX_15LH, styles.whiteText]}>
              {appTranslations?.LEADERBOARD_LEVEL} :{' '}
              {data?.user_profile?.currentLevel || ''}
            </Text>
          </View>
        </Row>
      </LinearGradient>

      <View style={{ flex: 1 }}>
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tabContainer}
            ref={scrollViewRef}
          >
            {tabs.map((tab, key) => (
              <TouchableOpacity
                key={tab + key}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
                onPress={() => setActiveTab(tab)}
              >
                <LinearGradient
                  colors={
                    activeTab === tab
                      ? ['#FF8008', '#FFC837']
                      : ['transparent', 'transparent']
                  }
                  end={{ x: 0.7, y: 1 }}
                  start={{ x: 0.3, y: 0 }}
                  style={activeTab === tab ? styles.activeTabGradient : {}}
                >
                  <Text
                    style={[
                      fontStyles.Maison_500_13PX_15LH,
                      {
                        color: activeTab === tab ? 'white' : 'gray',
                        lineHeight: RFValue(20),
                      },
                    ]}
                  >
                    {appTranslations[tab]}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <Animated.View
          {...panResponder.panHandlers}
          style={styles.contentContainer}
        >
          {screens[activeTab]}
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: RFValue(5),
  },
  gradientContainer: {
    padding: RFValue(5),
    margin: RFValue(10),
    borderRadius: RFValue(10),
    borderWidth: RFValue(0.5),
    borderColor: '#635AD970',
    backgroundColor: '#FFFFFF',
  },
  circularProgressContainer: {
    justifyContent: 'center',
    height: RFValue(120),
    width: RFValue(120),
  },
  profileImage: {
    borderRadius: RFValue(100),
    // padding: RFValue(5),
    // marginBottom: RFValue(3),
  },
  textContainer: {
    marginStart: RFValue(10),
    justifyContent: 'center',
    flex: 1,
  },
  whiteText: {
    color: 'white',
  },
  tabContainer: {
    flexDirection: 'row',
  },
  tab: {
    paddingHorizontal: RFValue(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    // Additional styles for active tab can go here
  },
  activeTabGradient: {
    paddingVertical: RFValue(7),
    paddingHorizontal: RFValue(10),
    borderRadius: RFValue(10),
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
  },
  screenText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default LeaderboardScreen;
