import { CheckSvg, InfoSvg } from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles } from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  Chapter,
  ContentPage,
  CourseApiResponse,
  KnowledgeBaseCourseApiResponse,
  RootReducerStates,
  ScreenProps,
} from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { ParamListBase, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import NoDataCard from 'apps/nikshy-setu-mob/src/components/cards/noDataCard';
import { KnowledgeConnectSkeletonCard } from 'apps/nikshy-setu-mob/src/components/cards/skeletonCards';
import { InputField } from 'apps/nikshy-setu-mob/src/components/inputComponents';
import PluginInfoModal from 'apps/nikshy-setu-mob/src/components/pluginInfoModal';
import { storeSubscriberActivity } from 'apps/nikshy-setu-mob/src/utils/functions';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Svg, { Defs, LinearGradient as LG, Rect, Stop } from 'react-native-svg';
import { useDispatch, useSelector } from 'react-redux';
import { KnowledgeBaseSvg } from '../../../../../../shared/assets/src/Images';
import { Column, Row } from '../../../components/commonComponents/row_column';

interface GradientProgressBarProps {
  progress: number; // value between 0 and 1
  width: number;
  height: number;
  borderRadius?: number;
}

const GradientProgressBar: React.FC<GradientProgressBarProps> = ({
  progress,
  width,
  height,
  borderRadius = 10,
}) => {
  const progressWidth = width * progress;
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Svg width={width} height={height}>
        <Defs>
          <LG id='grad' x1='0' y1='0' x2='1' y2='0'>
            <Stop offset='0' stopColor='#3b5998' />
            <Stop offset='1' stopColor='green' />
          </LG>
        </Defs>
        {/* Background Rect with border radius */}
        <Rect
          x='0'
          y='0'
          width={width}
          height={height}
          fill='#e0e0df'
          rx={borderRadius}
          ry={borderRadius}
        />
        {/* Foreground Rect with border radius */}
        <Rect
          x='0'
          y='0'
          width={progressWidth}
          height={height}
          fill='url(#grad)'
          rx={borderRadius}
          ry={borderRadius}
        />
      </Svg>
    </View>
  );
};

interface CourseProps {
  courseTitle: string;
  chapter: KnowledgeBaseCourseApiResponse;
  coursesId: string;
  navigation: NativeStackNavigationProp<ParamListBase>;
  setModule: (module: string[], timeSpent?: number) => void;
  moduleOpen: string[];
}
const CourseCard: React.FC<CourseProps> = ({
  courseTitle,
  chapter,
  coursesId,
  navigation,
  setModule,
  moduleOpen,
}) => {
  const handleModulePress = (moduleId: string) => {
    setModule((prev: string[]) => {
      if (prev.includes(moduleId)) {
        return prev?.filter((item) => !(item === moduleId));
      } else {
        return [...prev, moduleId];
      }
    });
  };

  const animationRefs = useRef([]); // For tracking animations for each module and chapter
  useEffect(() => {
    // Start animations sequentially
    chapter?.module?.forEach((_, index) => {
      setTimeout(() => {
        Animated.timing(animationRefs.current[index], {
          toValue: 1,
          duration: 300, // You can adjust the duration
          useNativeDriver: true,
        }).start();
      }, index * 100); // Delay each animation slightly
    });
  }, [chapter]);
  return (
    <View
      style={{
        backgroundColor: '#E9F1FF',
        elevation: 5,
        padding: RFValue(10),
        borderRadius: RFValue(20),
      }}
    >
      <Row
        style={{
          flex: 1,
          justifyContent: 'center',
          margin: RFValue(10),
        }}
      >
        <Text style={{ ...fontStyles.Maison_600_16PX_21LH }}>
          {courseTitle}
        </Text>
      </Row>
      {chapter?.module?.map((mod, modIndex) => {
        const [_, afterColonText] = mod?.moduleTitle?.split(':');

        if (!animationRefs.current[modIndex]) {
          animationRefs.current[modIndex] = new Animated.Value(0); // Initialize with opacity 0
        }

        return (
          <Animated.View
            key={mod.moduleId + modIndex}
            style={{
              margin: RFValue(8),
              opacity: animationRefs.current[modIndex],
              transform: [
                {
                  translateY: animationRefs.current[modIndex].interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0], // Slide in from bottom
                  }),
                },
              ],
            }}
          >
            <Pressable
              onPress={() => {
                handleModulePress(mod.moduleId);
              }}
            >
              <Row>
                {mod?.isModuleRead ? (
                  <View
                    style={{
                      marginRight: RFValue(5),
                      backgroundColor: 'green',
                      alignSelf: 'center',
                      padding: Platform.OS === 'ios' ? 0 : RFValue(1),
                      borderRadius: RFValue(20),
                    }}
                  >
                    <CheckSvg
                      height={RFValue(15)}
                      width={RFValue(15)}
                      fill={'white'}
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      width: RFValue(13),
                      height: RFValue(13),
                      marginRight: RFValue(5),
                      backgroundColor: 'gray',
                      alignSelf: 'center',
                      borderRadius: RFValue(20),
                    }}
                  />
                )}
                <Text
                  style={{
                    ...fontStyles.Maison_400_14PX_17LH,
                    color: '#808080',
                  }}
                >
                  {afterColonText.trim()}
                </Text>
              </Row>
            </Pressable>

            <View
              style={{
                display: moduleOpen.includes(mod?.moduleId) ? 'flex' : 'none',
                margin: RFValue(10),
              }}
            >
              {mod.chapter?.map((chap, chapIndex) => {
                const [_, afterColonChapterTitle] =
                  chap?.chapterTitle?.split(':');
                return (
                  <Row key={chap.chapterId + chapIndex}>
                    {chap?.isChapterRead ? (
                      <View
                        style={{
                          marginRight: RFValue(5),
                          backgroundColor: 'green',
                          alignSelf: 'center',
                          padding: Platform.OS === 'ios' ? 0 : RFValue(1),
                          borderRadius: RFValue(20),
                        }}
                      >
                        <CheckSvg
                          height={RFValue(15)}
                          width={RFValue(15)}
                          fill={'white'}
                        />
                      </View>
                    ) : (
                      <View
                        style={{
                          marginRight: RFValue(20),
                        }}
                      />
                    )}
                    <View
                      style={{
                        paddingTop: RFValue(3),
                        borderLeftWidth: 2,
                        borderColor: '#A2A2A2',
                      }}
                    >
                      <Pressable
                        onPress={() => {
                          navigation.navigate('chapterScreen', {
                            ...chap,
                            courseId: coursesId,
                            moduleId: mod.moduleId,
                            moduleOpen: moduleOpen,
                            openModule(data, timeSpent) {
                              setModule(data, timeSpent);
                            },
                          });
                        }}
                        style={{
                          backgroundColor: 'transparent',
                          padding: RFValue(5),
                        }}
                      >
                        <Text
                          style={{
                            ...fontStyles.Maison_400_13PX_20LH,
                            color: '#696CC3',
                          }}
                        >
                          {`${chapIndex + 1}: ${afterColonChapterTitle}`}
                        </Text>
                      </Pressable>
                    </View>
                  </Row>
                );
              })}
            </View>
          </Animated.View>
        );
      })}
    </View>
  );
};
function getReadContentPages(chapters: Chapter[]): ContentPage[] {
  return chapters
    .flatMap((chapter) => chapter.contentPage || []) // Flatten the content pages
    .filter((content) => content.isReadContent); // Filter for isRead being true
}
export const CourseInfoScreen: React.FC<ScreenProps<'courseInfo'>> = ({
  navigation,
  route,
}) => {
  const { colors } = route.params.theme;
  const { error, data, loadingApis } = useSelector(
    (state: RootReducerStates) => state.appContext
  );
  const appTranslations = route?.params?.appTranslations;
  const isHasData = Boolean(data?.knowledgeConnect?.kbase_chapter_with_content);
  let modal_time = 0;
  let timeIntervalSubmoduleId;
  const moduleModalUsage = () => {
    timeIntervalSubmoduleId = setInterval(() => {
      modal_time = modal_time + 1;
    }, 1000);
  };
  function storeSubscriberActivityWithTime(params) {
    storeSubscriberActivity({
      module: 'Knowledge Connect',
      timeSpent: modal_time,
      action: 'Kbase Course Fetched',
      payload: { readContent: params },
      dispatch: dispatch,
    });
  }
  const isSearch = route.params?.moduleOpen ? route.params?.moduleOpen : [];
  const [moduleOpen, setModule] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState({
    x: 0,
    y: 0,
    isOpen: false,
  });
  const [courseId, setCourseId] = useState(null);
  const dispatch = useDispatch();

  function fetchCourseContentData(courseId: string) {
    dispatch(
      createAction<null, KnowledgeBaseCourseApiResponse>(
        {
          method: 'GET',
          url: 'KBASE_CHAPTER_WITH_CONTENT',
          query: courseId,
        },
        (status, res) => {
          if (status === 200) {
            if (
              Array?.isArray(route.params?.moduleOpen) &&
              !(route.params?.moduleOpen?.length === 0)
            ) {
              setModule(route.params?.moduleOpen);
              navigation?.setParams({ moduleOpen: [] });
            }
          }
        }
      )
    );
  }
  const fetchCourseData = async () => {
    dispatch(
      createAction<null, CourseApiResponse>(
        {
          method: 'GET',
          url: 'KBASE_COURSE',
        },
        (status, res) => {
          if (status === 200 && Boolean(res?.[0])) {
            setCourseId(res?.[0]?._id);
            fetchCourseContentData(res?.[0]?._id);
          } else {
            console.log('404');
          }
        }
      )
    );
  };

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({ orientation: 'portrait' });
      if (isHasData) {
        moduleModalUsage();
      }
      if (courseId) {
        fetchCourseContentData(courseId);
      } else {
        fetchCourseData();
      }
      // Cleanup function
      return () => {
        clearInterval(timeIntervalSubmoduleId);
        const readContentPages =
          data?.knowledgeConnect?.kbase_chapter_with_content?.module?.flatMap(
            (module) =>
              module.chapter ? getReadContentPages(module.chapter) : []
          ) || [];
        if (isHasData) {
          storeSubscriberActivityWithTime(readContentPages);
        }
        // Add any additional cleanup logic here
        setCourseId(null);
        setModule([]);
        navigation.setOptions({ orientation: 'default' }); // Reset orientation or other settings
      };
    }, [navigation, dispatch, route.params])
  );

  function calculateProgress(
    totalModule: number,
    totalReadModule: number
  ): number {
    if (totalModule === 0) return 0; // Handle division by zero case
    return totalReadModule / totalModule;
  }

  const progress =
    (data?.knowledgeConnect?.kbase_chapter_with_content?.totalModule &&
      data?.knowledgeConnect?.kbase_chapter_with_content?.totalReadModule &&
      calculateProgress(
        data?.knowledgeConnect?.kbase_chapter_with_content?.totalModule,
        data?.knowledgeConnect?.kbase_chapter_with_content?.totalReadModule
      )) ||
    0;
  const isEmptyCourses = Boolean(
    data.knowledgeConnect?.kbase_course?.length === 0
  );
  const isLoading =
    loadingApis.includes('KBASE_COURSE') ||
    loadingApis.includes('KBASE_CHAPTER_WITH_CONTENT');
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.DARK_BLUE_383A68}
        barStyle='light-content'
      />
      <LinearGradient
        colors={[colors.DARK_BLUE_383A68, colors.LIGHT_BLUE_6F73CE]}
        style={styles?.topGradient}
      >
        <Column style={styles?.gradientColumn}>
          <Row style={styles?.gradientRow}>
            <KnowledgeBaseSvg height={RFValue(40)} width={RFValue(40)} />
            <TouchableOpacity
              onPress={(e) =>
                setIsModalVisible({
                  y: e?.nativeEvent?.pageY,
                  isOpen: true,
                  x: 0,
                })
              }
            >
              <InfoSvg
                height={RFValue(17)}
                width={RFValue(17)}
                onPress={(e) =>
                  setIsModalVisible({
                    y: e?.nativeEvent?.pageY,
                    isOpen: true,
                    x: 0,
                  })
                }
              />
            </TouchableOpacity>
          </Row>
          <Text style={[styles.logoText, { color: colors.YELLOW_FFCC18 }]}>
            {appTranslations?.APP_KNOWLEDGE_CONNECT}
          </Text>
        </Column>
      </LinearGradient>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles?.search}>
          {!isLoading && (
            <View>
              <InputField.MessageInput
                error=''
                onSendClick={(v) => {
                  navigation.navigate('askSetu', {
                    questionInfo: { searchByQuery: true, question: v },
                  });
                }}
                hideCameraIcon
                hideMicIcon
                placeholder='Search...'
                hideAttachmentsIcon
                inputTextContainerStyle={{
                  backgroundColor: colors.WHITE_FFFF,
                  padding: 0,
                }}
              />
            </View>
          )}
          <PluginInfoModal
            isOpen={isModalVisible.isOpen}
            yPosition={isModalVisible?.y}
            text={appTranslations?.APP_KNOWLEDGE_CONNECT_INFO}
            header={appTranslations?.APP_INFO_ABOUT_PLUGIN}
            closeModal={() => {
              setIsModalVisible({ isOpen: false, x: 0, y: 0 });
            }}
          />
          {!isLoading && (
            <View style={styles?.gradientProgress}>
              <GradientProgressBar
                progress={progress}
                width={RFPercentage(45)}
                height={RFValue(15)}
              />
            </View>
          )}
          {isLoading ? (
            <KnowledgeConnectSkeletonCard colors={colors} />
          ) : isEmptyCourses ? (
            <NoDataCard
              text=' Thank you for your interest! The course for your cadre is
              currently under development. We are working hard to make it
              available soon. Stay tuned, and we appreciate your patience as we
              prepare this content for you.'
            />
          ) : (
            <CourseCard
              chapter={
                isHasData && data?.knowledgeConnect?.kbase_chapter_with_content
              }
              courseTitle={
                isHasData && appTranslations?.APP_KNOWLEDGE_CONNECT_TITLE
              }
              moduleOpen={moduleOpen.length === 0 ? isSearch : moduleOpen}
              navigation={navigation}
              setModule={(v, timeSpent) => {
                modal_time = modal_time + timeSpent;
                setModule(v);
              }}
              coursesId={data?.knowledgeConnect?.kbase_course?.[0]?._id}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topGradient: { padding: RFValue(15), flex: 0.2, display: 'flex' },
  gradientProgress: { margin: RFValue(20), flex: 1 },
  search: { padding: RFValue(10), flex: 1 },
  gradientRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gradientColumn: {
    marginEnd: RFValue(15),
    paddingStart: RFValue(10),
    flex: 1,
    justifyContent: 'space-evenly',
  },
  logoText: {
    ...fontStyles.Maison_500_22PX_29LH,
  },
  description: {
    ...fontStyles.Maison_500_15PX_21LH,
    color: 'white',
    paddingEnd: RFValue(10),
  },
  scrollContainer: {
    color: 'white',
    flex: 1,
  },
  courseCard: {
    paddingVertical: RFValue(10),
    marginBottom: RFValue(10),
    borderRadius: RFValue(5),
    elevation: 2,
    alignContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: RFValue(15),
    fontWeight: 'bold',
  },
  content: {
    marginBottom: RFValue(10),
  },
  certificateButton: {
    padding: RFValue(15),
    borderRadius: RFValue(5),
    alignItems: 'flex-start',
    marginTop: RFValue(20),
    borderWidth: 0.1,
  },
  certificateText: {
    ...fontStyles.Maison_500_20PX_25LH,
  },

  cardContainer: {
    backgroundColor: '#E9F1FF',
    borderRadius: 8,
    marginVertical: RFValue(5),
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    padding: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moduleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardContent: {
    // marginTop: 10,
  },
  chapterContainer: {
    marginTop: 10,
  },
  chapterTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  contentPageTitle: {
    fontSize: 14,
    marginLeft: 10,
  },
});
