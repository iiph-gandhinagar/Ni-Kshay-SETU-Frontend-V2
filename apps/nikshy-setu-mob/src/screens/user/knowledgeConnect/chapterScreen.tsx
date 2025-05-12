import { CheckSvg, ExpandSvg } from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles } from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { ScreenProps } from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { Row } from 'apps/nikshy-setu-mob/src/components/commonComponents/row_column';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import WebView from 'react-native-webview';
import { useDispatch } from 'react-redux';

export const ChapterScreen: React.FC<ScreenProps<'chapterScreen'>> = ({
  navigation,
  route,
}) => {
  const { contentPage, chapterTitle, courseId, moduleId, chapterId } =
    route.params;
  const dispatch = useDispatch();
  const [selectedContent, setSelectedContent] = useState<{
    contentId: string;
    h5pIds: string[] | [];
  }>({
    contentId: '',
    h5pIds: [],
  });
  const [readContent, setReadContent] = useState([]);
  const validContentPages = contentPage?.filter(
    (item) => item.contentId && item.contentTitle && item.h5pIds.length > 0
  );
  let modal_time = 0;
  let timeIntervalSubmoduleId;
  const moduleModalUsage = () => {
    timeIntervalSubmoduleId = setInterval(() => {
      modal_time = modal_time + 1;
    }, 1000);
  };
  useEffect(() => {
    moduleModalUsage();
    navigation.setOptions({ orientation: 'portrait' });
    return () => {
      clearInterval(timeIntervalSubmoduleId);
      route.params?.openModule(route.params?.moduleOpen, modal_time);
    };
  }, []);

  const [_, afterColonChapterTitle] = chapterTitle?.split(':');
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    loader: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background
    },
    webView: {
      flex: 1,
      width: '100%',
      height: '100%',
      alignSelf: 'center',
    },
    scrollViewContainer: {
      padding: RFValue(5),
      margin: RFValue(10),
      backgroundColor: '#E9F1FF',
      borderRadius: RFValue(10),
      elevation: RFValue(10),
    },
    chapterTitleText: {
      ...fontStyles.Maison_400_14PX_17LH,
      color: '#808080',
    },
    contentContainer: {
      marginVertical: RFValue(10),
    },
    readIndicator: {
      marginRight: RFValue(5),
      backgroundColor: 'green',
      alignSelf: 'center',
      padding: Platform.OS === 'ios' ? 0 : RFValue(1),
      borderRadius: RFValue(20),
    },
    contentWrapper: {
      backgroundColor: 'transparent',
      padding: RFValue(5),
      flex: 1,
      borderLeftWidth: RFValue(2),
      borderColor: '#A2A2A2',
    },
    contentText: {
      ...fontStyles.Maison_400_13PX_20LH,
      color: '#696CC3',
    },
    expandIcon: {
      alignSelf: 'flex-end',
      marginTop: RFValue(10),
      transform: [{ rotate: '90deg' }],
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}
      >
        <View style={{ margin: RFValue(8) }}>
          <Pressable>
            <Text style={styles.chapterTitleText}>
              ● {afterColonChapterTitle}
            </Text>
          </Pressable>
          <View style={styles.contentContainer}>
            {validContentPages?.map((chapter, index) => {
              const isRead =
                chapter?.isReadContent ||
                readContent.includes(chapter?.contentId);
              return (
                <Row key={chapter.contentId} style={{}}>
                  {isRead ? (
                    <View style={styles.readIndicator}>
                      <CheckSvg
                        height={RFValue(15)}
                        width={RFValue(15)}
                        fill={'white'}
                      />
                    </View>
                  ) : (
                    <View style={{ marginRight: RFValue(20) }} />
                  )}
                  <View
                    style={[
                      styles.contentWrapper,
                      { borderColor: isRead ? 'green' : '#A2A2A2' },
                    ]}
                  >
                    <Pressable
                      onPress={() =>
                        setSelectedContent({
                          contentId: chapter.contentId,
                          h5pIds:
                            typeof chapter.h5pIds === 'string'
                              ? [chapter.h5pIds]
                              : chapter.h5pIds,
                        })
                      }
                      style={{ flex: 1 }}
                    >
                      <Text style={styles.contentText}>
                        {`${index + 1}: ${chapter.contentTitle}`}
                      </Text>
                    </Pressable>
                    {selectedContent.contentId === chapter.contentId && (
                      <View style={{ height: RFValue(200), width: '100%' }}>
                        {selectedContent.h5pIds?.map((h5pId, idx) => (
                          <React.Fragment key={h5pId}>
                            <View style={styles.webView}>
                              <View style={styles.loader}>
                                <ActivityIndicator
                                  size='large'
                                  color='#0000ff'
                                />
                              </View>
                              <WebView
                                useWebView2
                                source={{
                                  uri: `https://ntep.in/h5p/${h5pId}/embed`,
                                }}
                                style={styles.webView}
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                                startInLoadingState={true}
                                mediaPlaybackRequiresUserAction={false}
                                allowsInlineMediaPlayback={true}
                                scalesPageToFit={true}
                                cacheEnabled={true}
                                showsVerticalScrollIndicator={false}
                                onLoadEnd={(v) => {
                                  dispatch(
                                    createAction(
                                      {
                                        method: 'POST',
                                        url: 'KBASE_READ_CONTENT',
                                        data: {
                                          courseId: courseId,
                                          moduleId: moduleId,
                                          chapterId: chapterId,
                                          contentId: chapter.contentId,
                                        },
                                      },
                                      (status, res) => {
                                        if (status === 200)
                                          setReadContent((prev) => [
                                            ...prev,
                                            chapter?.contentId,
                                          ]);
                                      }
                                    )
                                  );
                                }}
                              />
                            </View>
                            <TouchableOpacity
                              onPress={() =>
                                navigation.navigate('h5pView', {
                                  contentPage: validContentPages,
                                  activeContent: h5pId,
                                  readContentInfo: {
                                    courseId: courseId,
                                    moduleId: moduleId,
                                    chapterId: chapterId,
                                    contentId: chapter.contentId,
                                  },
                                  sendDataBack(data) {
                                    setReadContent((prev) => [
                                      ...prev,
                                      ...data,
                                    ]);
                                  },
                                })
                              }
                            >
                              <ExpandSvg style={styles.expandIcon} />
                            </TouchableOpacity>
                          </React.Fragment>
                        ))}
                      </View>
                    )}
                  </View>
                </Row>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ChapterScreen;
