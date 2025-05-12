import { chatBgPng, typingAnimation } from '@nikshay-setu-v3-monorepo/assets';
import { strings, uiStyles } from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  RootReducerStates,
  RootStackParamList,
  ThemeProps,
} from '@nikshay-setu-v3-monorepo/types';
import {
  isEmpty,
  CustomRFValue as RFValue,
} from '@nikshay-setu-v3-monorepo/utils';
import { useTheme } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { storeSubscriberActivity } from 'apps/nikshy-setu-mob/src/utils/functions';
import LottieView from 'lottie-react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ChatBoatChatCard } from '../../../components/cards/chatBoatChatCard';
import { InputField } from '../../../components/inputComponents';
const AskSetu: React.FC<
  NativeStackScreenProps<RootStackParamList, 'askSetu'>
> = ({ navigation, route }) => {
  const { colors } = useTheme() as ThemeProps;
  const { data } = useSelector((state: RootReducerStates) => state.appContext);
  const scrollViewRef = useRef<ScrollView>(null);
  const [loader, setLoader] = useState(false);
  const scrollDown = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };
  const questionInfo = route?.params?.questionInfo;
  const HistoryQuestion = data?.chatScreen?.chat_conversion?.list?.find(
    (v) => v.sessionId === route?.params?.fromHistory?.sessionId
  );
  const lang = route.params?.appLang || 'en';
  const itsHistory = Array?.isArray(HistoryQuestion?.message);
  const dispatch = useDispatch();
  const [questionSets, setQuestionSets] = useState([]);
  const handleResponse = useCallback((code, res, type) => {
    const currentTime = new Date();
    if (code === 200) {
      setLoader(false);
      scrollDown();
      let newMessage = null;
      if (type === 'SEARCH_SYST_QUES' && Array.isArray(res)) {
        const firstItem = res?.[0];
        if (
          firstItem &&
          'H5P-id' in firstItem &&
          'Content_status' in firstItem
        ) {
          newMessage = {
            data: res,
            message: firstItem.title,
            self: false,
            time: currentTime?.toString(),
          };
        } else if (
          firstItem &&
          'answers' in firstItem &&
          'questions' in firstItem
        ) {
          newMessage = {
            data: res,
            message:
              firstItem.answers?.[0]?.[lang] || firstItem.answers?.[0]?.en,
            self: false,
            time: currentTime?.toString(),
          };
        }
      } else if (
        type === 'SEARCH_BY_QUERY' &&
        (res?.answer[lang] || res?.answer?.en) &&
        'answer' in res &&
        'Category' in (res?.answer[lang] || res?.answer?.en) &&
        'result' in (res?.answer[lang] || res?.answer?.en) &&
        'link' in (res?.answer[lang] || res?.answer?.en) &&
        'type' in res &&
        !isEmpty(res?.answer)
      ) {
        //link Button logic
        newMessage = {
          data: res?.answer,
          message: (res?.answer[lang] || res?.answer?.en)?.result?.[0] || '',
          self: false,
          type: res?.type,
          time: currentTime?.toString(),
          showLinkBtnText: (res?.answer[lang] || res?.answer?.en)?.link?.[0],
          multiAns: res?.answer?.length > 0 ? true : false,
        };
      } else if (
        type === 'SEARCH_BY_QUERY' &&
        'answer' in res &&
        'category' in res &&
        'type' in res &&
        !isEmpty(res?.answer)
      ) {
        const isAnswerInArray = Array.isArray(res?.answer);
        const allNull =
          isAnswerInArray && res?.answer.every((item) => item === null);
        const UnhandledMessage =
          isAnswerInArray &&
          !(typeof res?.answer?.[0] === 'object') &&
          res?.answer?.[0];

        const ifAllNull = {
          [lang]: [strings?.INTRO],
        };
        newMessage = {
          data: Object?.keys(res?.answer)?.includes(lang)
            ? res?.answer
            : allNull
            ? ifAllNull
            : Array.isArray(res?.answer) &&
              res?.answer?.filter((item) => item !== null),
          message:
            UnhandledMessage ||
            res?.answer[lang]?.[0] ||
            res?.answer?.en?.[0] ||
            strings?.INTRO,
          self: false,
          type: res?.type,
          time: currentTime?.toString(),
          multiAns: isAnswerInArray && !allNull,
        };
      }
      if (newMessage) {
        setQuestionSets((prev) => [...prev, newMessage]);
      }
    }
  }, []);
  const handleSend = useCallback(
    (v) => {
      const currentTime = new Date();
      setLoader(true);
      const myQues = {
        data: [],
        message: v,
        self: true,
        multiAns: false,
        time: currentTime?.toString(),
      };
      setQuestionSets((prev) => [...prev, myQues]);

      dispatch(
        createAction(
          {
            method: 'POST',
            url: 'SEARCH_BY_QUERY',
            data: {
              sessionId: data.chatScreen.sessionId,
              query: v,
            },
          },
          (code, res) => handleResponse(code, res, 'SEARCH_BY_QUERY')
        )
      );
      scrollDown();
    },
    [dispatch, data.chatScreen.sessionId, handleResponse]
  );
  useEffect(() => {
    setLoader(true);
    if (questionInfo?.searchByQuery) {
      handleSend(questionInfo?.question);
    } else if (!route?.params?.fromHistory) {
      const currentTime = new Date();
      setQuestionSets([
        {
          data: [],
          message: questionInfo?.question,
          self: true,
          multiAns: false,
          time: currentTime?.toString(),
        },
      ]);
      dispatch(
        createAction(
          {
            method: 'POST',
            url: 'SEARCH_SYST_QUES',
            data: {
              sessionId: data.chatScreen.sessionId,
              id: questionInfo?.id,
              NTEPId: questionInfo?.NTEPId,
            },
          },
          (code, res) => handleResponse(code, res, 'SEARCH_SYST_QUES')
        )
      );
    } else {
      if (itsHistory) {
        const newMessage = [];
        HistoryQuestion?.message?.flatMap((item) => {
          const UnhandledMessage =
            Array.isArray(item?.answer) &&
            !(typeof item?.answer?.[0] === 'object') &&
            item?.answer?.[0];

          const isH5P =
            Array.isArray(item?.answer) &&
            isEmpty(item?.answer?.[0]?.['H5P-id']);
          const itsStringsMessageFromBE = typeof item?.answer?.[0] === 'string';
          const searchByQuery = item?.type === 'By Search Query';

          const QA = [
            {
              data: {},
              message:
                typeof item?.question === 'string'
                  ? item?.question
                  : item?.question?.[0]?.[lang] ||
                    item?.question?.[0]?.en ||
                    item?.question?.[0] ||
                    '',
              self: true,
              type: item?.type,
              time: item?.createdAt,
              multiAns: false,
            },
            {
              data:
                !isH5P && itsStringsMessageFromBE && !searchByQuery
                  ? [{ 'H5P-id': item?.answer }]
                  : item?.answer,
              message:
                UnhandledMessage ||
                item?.answer?.[0]?.[lang] ||
                item?.answer?.[0]?.en ||
                '',
              self: false,
              type: item?.type,
              time: item?.createdAt,
              multiAns:
                !isH5P && itsStringsMessageFromBE && searchByQuery
                  ? false
                  : false,
            },
          ];
          newMessage.push(...QA);
        });

        setQuestionSets(newMessage);
        newMessage && setLoader(false);
      }
    }
    navigation.setOptions({ orientation: 'portrait' });
  }, [
    dispatch,
    questionInfo?.id,
    questionInfo?.NTEPId,
    data.chatScreen.sessionId,
    handleResponse,
  ]);
  const [isMainNode, setMainNode] = useState(true);
  const styles = StyleSheet.create({
    space: { height: RFValue(100) },
    bgImage: { flex: 1, justifyContent: 'center' },
    container: { flex: 1, paddingHorizontal: 10 },
    inputBox: {
      backgroundColor: colors.LIGHT_GREY_F4F4F4,
    },
  });
  return (
    <View style={styles.container}>
      <ImageBackground
        source={chatBgPng}
        resizeMode='cover'
        style={styles.bgImage}
      >
        <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
          <View style={uiStyles?.flex1}>
            {questionSets?.map((item, key) => {
              return (
                <View key={key + '-questionSetView'}>
                  <ChatBoatChatCard
                    key={key + '-questionSets'}
                    item={item}
                    itsHistory={itsHistory}
                    isMainNode={isMainNode}
                    navigation={navigation}
                    OnH5PNodeLoad={(v) => {
                      setMainNode(v);
                      if (!v) {
                        setLoader(true);
                        dispatch(
                          createAction(
                            {
                              method: 'POST',
                              url: 'GET_SUB_NODE_DATA',
                              data: item?.data?.[0]?.sub_node,
                            },
                            (code, res) => {
                              handleResponse(
                                code,
                                {
                                  question: '_SubNode',
                                  answer: res,
                                  type: 'SubNode',
                                  category: 'NTEP',
                                },
                                'SEARCH_BY_QUERY'
                              );
                            }
                          )
                        );
                      }
                    }}
                    scrollDown={scrollDown}
                    stopScroll={(stopScroll) => {
                      scrollViewRef.current.setNativeProps({
                        scrollEnabled: !stopScroll,
                      });
                    }}
                    onPressSubCard={(v) => {
                      storeSubscriberActivity({
                        module: 'Chatbot',
                        payload: {
                          readContent: [
                            { ...v, ...{ contentId: v?.nid || '' } },
                          ],
                        },
                        action: 'Chat Content Read',
                        dispatch: dispatch,
                      });
                      const currentTime = new Date();
                      const myQues = {
                        data: [v],
                        message: v?.title,
                        self: false,
                        multiAns: false,
                        time: currentTime?.toString(),
                      };
                      setQuestionSets((prev) => {
                        const updatedPrev = Array.isArray(prev)
                          ? [...prev]
                          : [];
                        if (updatedPrev?.[prev?.length - 1]?.multiAns) {
                          return [...prev, myQues];
                        } else {
                          updatedPrev.pop();
                          return [...updatedPrev, myQues];
                        }
                      });
                      scrollDown();
                    }}
                  />
                  {questionSets?.length === key + 1 && (
                    <View style={styles.space} key={'space-' + key} />
                  )}
                </View>
              );
            })}
            {loader && (
              <LottieView
                autoPlay
                source={typingAnimation}
                loop
                style={uiStyles.typingAnimation}
              />
            )}
          </View>
        </ScrollView>
        <InputField.MessageInput
          error=''
          onSendClick={handleSend}
          scrollDown={scrollDown}
          hideCameraIcon
          hideAttachmentsIcon
          inputTextContainerStyle={{
            backgroundColor: colors.LIGHT_GREY_F4F4F4,
          }}
        />
      </ImageBackground>
    </View>
  );
};

export default React.memo(AskSetu);
