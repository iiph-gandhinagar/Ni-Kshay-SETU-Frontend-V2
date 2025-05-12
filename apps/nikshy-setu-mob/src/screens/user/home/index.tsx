import { ArrowSvg, HistorySvg } from '@nikshay-setu-v3-monorepo/assets';
import {
  fontStyles,
  langKeyForPlugin,
  toolsData,
  uiStyles,
} from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  RootReducerStates,
  ScreenProps,
} from '@nikshay-setu-v3-monorepo/types';
import {
  CustomRFValue as RFValue,
  getDataFromAsyncStorage,
  storeDataToAsyncStorage,
} from '@nikshay-setu-v3-monorepo/utils';
import { useFocusEffect } from '@react-navigation/native';
import Button from 'apps/nikshy-setu-mob/src/components/buttons/primaryButtons';
import NewsCard from 'apps/nikshy-setu-mob/src/components/cards/newsFeedCard';
import { NewsSkeletonCard } from 'apps/nikshy-setu-mob/src/components/cards/skeletonCards';
import BoxGridList from 'apps/nikshy-setu-mob/src/components/commonComponents/boxGridList';
import GreetingHeader from 'apps/nikshy-setu-mob/src/components/commonComponents/greetingHeader';
import ModalComponent from 'apps/nikshy-setu-mob/src/components/commonComponents/modal';
import TypingText from 'apps/nikshy-setu-mob/src/components/textComponent/typingText';
import { storeSubscriberActivity } from 'apps/nikshy-setu-mob/src/utils/functions';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  BackHandler,
  Dimensions,
  FlatList,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Carousel from 'react-native-reanimated-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { TourGuideZone, useTourGuideController } from 'rn-tourguide';
import { Card } from '../../../components/cards/MainCard';
import ToolsCard from '../../../components/cards/toolsCards';
import BottomSheet from '../../../components/commonComponents/bottomSheet';
import { Column, Row } from '../../../components/commonComponents/row_column';
import ScreenContainer from '../../../components/defaultPage';

const width = Dimensions.get('window').width;
const openApp = async (packageName, iosHref, webRef) => {
  const url = `intent://#Intent;package=${packageName};scheme=https;end`; // Generic intent URL

  if (Platform.OS === 'android') {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      const playStoreUrl = `https://play.google.com/store/apps/details?id=${packageName}`;
      Linking.openURL(playStoreUrl);
      console.log(`${packageName} is not installed`);
    }
  } else {
    console.log('This method is only supported on Android');
    Linking.openURL(webRef);
  }
};
export const HomeScreen: React.FC<ScreenProps<'homeScreen'>> = React.memo(
  ({ navigation, route }) => {
    const { colors } = route.params.theme;
    const dispatch = useDispatch();
    const home_page_info = useSelector(
      (state: RootReducerStates) =>
        state.appContext?.data?.homeScreen?.home_page_info
    );
    const loadingApis = useSelector(
      (state: RootReducerStates) => state.appContext?.loadingApis
    );
    const appTranslations = useSelector(
      (state: RootReducerStates) => state.appContext?.data?.appTranslations
    );
    const flashNews = home_page_info?.flashNews;
    const translateX = useRef(new Animated.Value(0)).current;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
    const [isExitModal, setExitModal] = useState(false);
    const [isTour, setTour] = useState(false);
    const {
      canStart, // a boolean indicate if you can start tour guide
      start, // a function to start the tourguide
      stop, // a function  to stopping it
      eventEmitter, // an object for listening some events
    } = useTourGuideController();
    React.useEffect(() => {
      if (canStart) {
        getDataFromAsyncStorage('firstInstallTime').then((v) => {
          if (!v) {
            setTour(true);
            start();
            DeviceInfo.getFirstInstallTime().then(
              (firstInstallTime: number) => {
                storeDataToAsyncStorage(
                  'firstInstallTime',
                  firstInstallTime.toString()
                ).then(() => {
                  console.log('------------firstInstallTime');
                });
              }
            );
          }
        });
      }
    }, [canStart]);

    const handleOnStart = () => {
      setTour(true);
    };
    const handleOnStop = () => {
      setTour(false);
    };

    const handleOnStepChange = () => console.log('stepChange');
    React.useEffect(() => {
      eventEmitter.on('start', handleOnStart);
      eventEmitter.on('stop', handleOnStop);
      eventEmitter.on('stepChange', handleOnStepChange);

      return () => {
        eventEmitter.off('start', handleOnStart);
        eventEmitter.off('stop', handleOnStop);
        eventEmitter.off('stepChange', handleOnStepChange);
      };
    }, []);
    useEffect(() => {
      storeSubscriberActivity({
        module: 'Home',
        action: 'user_home_page_visit',
        dispatch: dispatch,
      });
    }, []);

    useFocusEffect(
      React.useCallback(() => {
        const backAction = () => {
          setExitModal(true);
          return true;
        };
        const subscription = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction
        );
        return () => {
          subscription.remove();
        };
      }, [navigation])
    );

    useFocusEffect(
      useCallback(() => {
        dispatch(
          createAction({
            method: 'GET',
            url: 'HOME_PAGE_INFO',
          })
        );
        return () => {
          setBottomSheetOpen(false);
        };
      }, [])
    );

    useEffect(() => {
      Animated.timing(translateX, {
        toValue: currentIndex * 20, // Adjust 20 based on your dot width and spacing
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, [currentIndex]);

    const styles = StyleSheet.create({
      newsDotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
      },
      relatedAppsLabel: {
        ...fontStyles.Maison_600_20PX_23LH,
      },
      width100Percentage: { width: '100%' },
      marginBottom5: { marginBottom: RFValue(5) },
      newsBottomDots: {
        width: RFValue(8),
        height: RFValue(8),
        borderRadius: RFValue(4),
        margin: RFValue(4),
      },
      modalContainer: {
        backgroundColor: 'white',
        padding: RFValue(15),
        margin: RFValue(10),
      },
      modalConfirmTxt: {
        ...fontStyles.Maison_500_18PX_26LH,
        marginBottom: RFValue(10),
        color: colors.DARK_BLUE_383A68,
      },
      modalExitTxt: {
        ...fontStyles.Maison_500_14PX_18LH,
        marginBottom: RFValue(10),
      },
      modalRow: {
        justifyContent: 'flex-end',
        marginTop: RFValue(10),
      },
      modalPaddingHorizontal15: { paddingHorizontal: RFValue(15) },
      chatContainer: {
        flex: 1,
        paddingVertical: RFValue(18),
      },
      tourGuide: {
        flexDirection: 'row',
        paddingHorizontal: RFValue(15),
      },
    });
    return (
      <ScreenContainer
        style={uiStyles.paddingHorizontal0}
        key={route?.params?.tokenRefresher}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={!isTour}
        >
          <ModalComponent
            closeModal={() => {
              setExitModal(false);
            }}
            isOpen={isExitModal}
            containerStyle={styles?.modalContainer}
          >
            <Text style={styles?.modalConfirmTxt}>
              {appTranslations?.APP_CONFIRM_EXIT}
            </Text>
            <Text style={styles?.modalExitTxt}>
              {appTranslations?.APP_EXIT_PROMPT}
            </Text>
            <Row style={styles?.modalRow}>
              <Button
                title={appTranslations?.APP_CANCEL}
                containerStyle={styles?.modalPaddingHorizontal15}
                textStyle={{ color: colors.BLACK_000000 }}
                onPress={() => {
                  setExitModal(false);
                }}
              />
              <Button
                title={appTranslations?.APP_YES}
                textStyle={{ color: colors.BLACK_000000 }}
                onPress={() => BackHandler.exitApp()}
              />
            </Row>
          </ModalComponent>
          <GreetingHeader appTranslations={appTranslations} colors={colors} />
          <View style={uiStyles.homePageContainer}>
            <TourGuideZone
              zone={1}
              text={appTranslations?.TOUR_CHAT_DEC}
              borderRadius={RFValue(10)}
              style={[
                uiStyles.SearchContainer,
                uiStyles.iosShadow,
                styles?.tourGuide,
              ]}
            >
              <TouchableOpacity
                style={styles?.chatContainer}
                onPress={() => {
                  if (!isTour) {
                    storeSubscriberActivity({
                      module: 'Home',
                      action: 'ask-anything-click',
                      dispatch: dispatch,
                    });
                    navigation.navigate('chatScreen');
                  }
                }}
              >
                <TypingText
                  text={appTranslations?.CHAT_ASK_ANYTHING}
                  delay={100}
                />
              </TouchableOpacity>
              <Row>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('historyScreen');
                  }}
                >
                  <HistorySvg
                    height={RFValue(25)}
                    width={RFValue(25)}
                    style={uiStyles.historyIc}
                  />
                </TouchableOpacity>
              </Row>
            </TourGuideZone>
            <View style={uiStyles.flex1Margin5}>
              <BoxGridList
                isTour={isTour}
                navigation={navigation}
                dispatch={dispatch}
                appTranslations={appTranslations}
              />
              <View style={uiStyles.flex1marginHorizontal10}>
                <Row style={uiStyles.alignItems_FlexStart_MarginVertical10}>
                  <Text style={uiStyles.SubItemTitle}>
                    {appTranslations?.HOME_TOOLS}
                  </Text>
                </Row>
                <Row style={uiStyles.alignItemFlexStart}>
                  {toolsData.map((item, index) => {
                    const cardTitle =
                      (Object.keys(langKeyForPlugin).includes(item?.title) &&
                        appTranslations[
                          langKeyForPlugin[item?.title || 'APP_LOADING']
                        ]) ||
                      item?.title;
                    return (
                      <Card.ToolsCard
                        key={index + 'ToolsCard'}
                        Title={cardTitle}
                        SvgImg={item.image}
                        onPress={() => {
                          if (!isTour) {
                            navigation.navigate(
                              item.navigatorLink || 'notificationScreen',
                              {
                                Id: item._id,
                                nameOfAlgorithm: item.nameOfAlgo,
                              }
                            );
                          }
                        }}
                      />
                    );
                  })}
                </Row>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setBottomSheetOpen(true);
                }}
                style={[uiStyles.relatedAppContainer, uiStyles.iosShadow]}
              >
                <Row style={uiStyles.spaceBetweenPadding10AlignItmCenter}>
                  <Column>
                    <Text
                      style={[
                        fontStyles.Maison_500_18PX_24LH,
                        { color: colors.DARK_BLUE_394F89 },
                      ]}
                    >
                      {appTranslations?.APP_RELATED_APPLICATIONS}
                    </Text>
                    <Text style={fontStyles.Maison_400_12PX_16LH}>
                      {appTranslations?.HOME_TOOLS_SUB_DEC}
                    </Text>
                  </Column>
                  <ArrowSvg />
                </Row>
              </TouchableOpacity>
              <View style={uiStyles.flex1marginHorizontal10}>
                <Row style={uiStyles.alignItems_FlexStart_MarginVertical10}>
                  <Text style={uiStyles.SubItemTitle}>
                    {appTranslations?.HOME_TITLE_NEWS_FEED}
                  </Text>
                </Row>
                <View style={styles?.width100Percentage}>
                  <Carousel
                    loop={true}
                    width={width - RFValue(30)}
                    height={RFValue(100)}
                    autoPlay={true}
                    data={
                      loadingApis.includes('HOME_PAGE_INFO')
                        ? Array.from({ length: 3 })
                        : flashNews
                    }
                    scrollAnimationDuration={1500}
                    onSnapToItem={(index) => {
                      setCurrentIndex(index);
                    }}
                    renderItem={({ item, index }) => {
                      if (loadingApis.includes('HOME_PAGE_INFO')) {
                        return <NewsSkeletonCard key={index} />;
                      } else {
                        return (
                          <NewsCard
                            item={item}
                            key={index}
                            navigation={navigation}
                          />
                        );
                      }
                    }}
                  />
                  <View style={styles.newsDotsContainer}>
                    {Array.from({
                      length: loadingApis.includes('HOME_PAGE_INFO')
                        ? 3
                        : flashNews?.length,
                    })?.map((_, index) => (
                      <View
                        key={index}
                        style={[
                          styles.newsBottomDots,
                          {
                            backgroundColor:
                              currentIndex === index ? '#394F89' : 'lightgray',
                          },
                        ]}
                      />
                    ))}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        {bottomSheetOpen && (
          <BottomSheet
            isOpen={bottomSheetOpen}
            toggleBottomSheet={() => {
              setBottomSheetOpen(false);
            }}
            key={`${bottomSheetOpen}`}
          >
            <Text style={styles.relatedAppsLabel}>
              {appTranslations?.APP_RELATED_APPLICATIONS}
            </Text>
            <FlatList
              numColumns={4}
              keyExtractor={(item) => item?.title}
              data={home_page_info?.flashSimilarApps}
              scrollEnabled={false}
              contentContainerStyle={{ marginBottom: RFValue(5) }}
              renderItem={({ item, index }) => {
                return (
                  <ToolsCard
                    onPress={() => {
                      //pending For IOS
                      openApp(item?.href, item?.href, item?.href);
                    }}
                    key={index + 'ToolsCard'}
                    ImageSrc={item?.image}
                    Title={item?.title}
                  />
                );
              }}
            />
          </BottomSheet>
        )}
      </ScreenContainer>
    );
  }
);
HomeScreen.displayName = 'HomeScreen';
