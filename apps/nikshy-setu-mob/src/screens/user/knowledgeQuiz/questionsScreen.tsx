import {
  ArrowSvg,
  ClockSvg,
  QuestionSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles } from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  AssessmentProgressApiResponse,
  RootReducerStates,
  ScreenProps,
  StoreAssessmentResponseApiPayload,
} from '@nikshay-setu-v3-monorepo/types';
import {
  getDataFromAsyncStorage,
  CustomRFValue as RFValue,
} from '@nikshay-setu-v3-monorepo/utils';
import Button from 'apps/nikshy-setu-mob/src/components/buttons/primaryButtons';
import { Card } from 'apps/nikshy-setu-mob/src/components/cards/MainCard';
import { QuizSelectionCard } from 'apps/nikshy-setu-mob/src/components/cards/MCQCards';
import { Row } from 'apps/nikshy-setu-mob/src/components/commonComponents/row_column';
import { ProgressBar } from 'apps/nikshy-setu-mob/src/components/progressBar/ProgressBar';
import { checkTimeout } from 'apps/nikshy-setu-mob/src/utils/functions';
import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
type QuestionInfoItem = {
  [key: string]: {
    text: string | null;
    option: string | null;
    isSubmitted: boolean;
  };
};

const QuestionsScreen: React.FC<ScreenProps<'questionsScreen'>> = ({
  navigation,
  route,
}) => {
  const [questionCount, setQuestionCount] = useState(0);
  const [openSubmitModal, setSubmitModal] = useState(false);
  const [isLoading, setLoader] = useState(false);
  const [isAttemptedModal, setAttemptedModal] = useState(false);
  const { theme, question, assessmentId, isProAssessment } = route?.params;
  const [submittedQuestionId, setSubmittedQuestionId] = useState('');
  const [value, setValue] = useState({});
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [isTimeout, setIsTimeout] = useState<boolean>(false);
  const loadingApis = useSelector(
    (state: RootReducerStates) => state?.appContext?.loadingApis
  );
  const appTranslations = useSelector(
    (state: RootReducerStates) => state?.appContext?.data?.appTranslations
  );
  const dispatch = useDispatch();
  const fetchData = async () => {
    setLoader(true);
    const userId = await getDataFromAsyncStorage('userId');
    dispatch(
      createAction<null, AssessmentProgressApiResponse>(
        {
          method: 'GET',
          url: 'SUBSCRIBER_ASSESSMENT_PROGRESS',
          query: `?userId=${userId}&assessmentId=${assessmentId}`,
        },
        (statusCode, res) => {
          if (statusCode === 200) {
            // setRemainingTime(20)
            setRemainingTime(res.remainingTime);
            setSubmittedQuestionId(res?._id);
            const formattedData = res?.answers?.reduce((acc, v) => {
              acc[v.questionId] = {
                text: v?.answer,
                option: v?.selectedOption,
                isSubmitted: v?.isSubmit,
              };
              return acc;
            }, {});
            setValue(formattedData);
          } else if (statusCode === 400) {
            setAttemptedModal(true);
          }
          setLoader(false);
        }
      )
    );
  };
  useEffect(() => {
    if (!isProAssessment) {
      fetchData();
    }
  }, [assessmentId, dispatch]);

  const skipQuestions = useMemo(
    () => question.length - Object.keys(value).length,
    [question, value]
  );

  const handleSelect = useCallback(
    (text, option, submittedQuestId, isSubmitted, skip) => {
      if (skip) {
        setValue((prev) => {
          const { [question[questionCount]?._id]: _, ...rest } = prev;
          return rest;
        });

        if (questionCount + 1 >= question.length) {
          setSubmitModal(true);
        } else {
          setQuestionCount((prevCount) => prevCount + 1);
        }
      } else if (isProAssessment) {
        setValue((prev) => ({
          ...prev,
          [question[questionCount]['nid']]: {
            text,
            option,
            isSubmitted,
            skip: false,
          },
        }));
      } else {
        if (submittedQuestId) {
          setSubmittedQuestionId(submittedQuestId);
        }
        setValue((prev) => ({
          ...prev,
          [question[questionCount]?._id]: {
            text,
            option,
            isSubmitted,
            skip: false,
          },
        }));
      }
    },
    [questionCount, question]
  );
  const questionId = isProAssessment
    ? question[questionCount]['nid']
    : question[questionCount]?._id;
  const selectedAnswer = value[questionId];
  const isSubmitted = value[questionId]?.isSubmitted;
  const isSkip =
    selectedAnswer === undefined || selectedAnswer?.option === null;
  const filteredIds = question
    ?.filter(
      (v) => !Object.keys(value).includes(isProAssessment ? v?.nid : v?._id)
    )
    ?.map((v) => (isProAssessment ? v?.nid : v?._id));
  useEffect(() => {
    if (remainingTime === null) return;
    const interval = setInterval(() => {
      if (checkTimeout(remainingTime - 1)) {
        setIsTimeout(true);
        setSubmitModal(true);
        clearInterval(interval);
        setRemainingTime(null);
      } else {
        setRemainingTime((prev) => (prev !== null ? prev - 1 : 0));
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [remainingTime]);

  return (
    <View style={styles.container}>
      <Modal
        transparent
        visible={isAttemptedModal}
        animationType='none'
        style={styles.modal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Row style={{ margin: RFValue(10) }}>
              <Text style={[fontStyles.Maison_500_15PX_21LH, { color: 'red' }]}>
                {appTranslations?.K_QUIZ_NOT_ALLOWED_RETAKE_ASSESSMENT_ERROR}
              </Text>
            </Row>
            <Button
              title={appTranslations?.APP_BACK}
              bgColor={'#4B5F83'}
              onPress={() => {
                navigation?.navigate('currentAssessmentScreen');
              }}
            />
          </View>
        </View>
      </Modal>

      <Modal
        transparent
        visible={openSubmitModal}
        animationType='none'
        style={styles.modal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Row style={styles.modalTopRow}>
              <Text
                style={[
                  fontStyles.Maison_500_15PX_21LH,
                  { color: isTimeout ? 'red' : 'gray' },
                ]}
              >
                {isTimeout
                  ? appTranslations?.APP_TIME_OUT
                  : appTranslations?.APP_CONFIRM_SUBMIT}
              </Text>
              {/* <CloseSvg /> */}
            </Row>
            <View style={styles.modalCenterContainer}>
              <Row style={styles.modalCenterRow}>
                <Text style={styles.modalCenterTextColor}>
                  {appTranslations?.K_QUIZ_ATTEMPTED}
                </Text>
                <Text
                  style={{
                    color: '#4B5F83',
                    ...fontStyles.Maison_500_15PX_21LH,
                  }}
                >
                  {question.length - skipQuestions}{' '}
                  {appTranslations?.APP_QUESTIONS}
                </Text>
              </Row>
              <Row
                style={{
                  justifyContent: 'space-between',
                  marginBottom: RFValue(10),
                }}
              >
                <Text
                  style={{
                    color: '#797979',
                    ...fontStyles.Maison_500_14PX_18LH,
                    marginRight: RFValue(90),
                  }}
                >
                  {appTranslations?.APP_SKIPPED}
                </Text>
                <Text
                  style={{
                    color: '#4B5F83',
                    ...fontStyles.Maison_500_15PX_21LH,
                  }}
                >
                  {skipQuestions} {appTranslations?.APP_QUESTIONS}
                </Text>
              </Row>
              <Row style={{ justifyContent: 'space-between' }}>
                <Text
                  style={{
                    color: '#797979',
                    ...fontStyles.Maison_500_14PX_18LH,
                    marginRight: RFValue(90),
                  }}
                >
                  {appTranslations?.APP_OUT_OF_TOTAL}
                </Text>
                <Text
                  style={{
                    color: '#4B5F83',
                    ...fontStyles.Maison_500_15PX_21LH,
                  }}
                >
                  {question.length} {appTranslations?.APP_QUESTIONS}
                </Text>
              </Row>
            </View>
            <Button
              title={appTranslations?.APP_SUBMIT}
              bgColor={'#4B5F83'}
              onPress={() => {
                if (isProAssessment) {
                  const proAssessmentAnsMap = {
                    option1: 'option1',
                    option2: 'option2',
                    option3: 'option3',
                    option4: 'option4',
                    null: '',
                  };
                  getDataFromAsyncStorage('userId').then((userId) => {
                    dispatch(
                      createAction(
                        {
                          method: 'POST',
                          url: 'STORE_PRO_ASSESSMENT_RESULT',
                          data: {
                            payload: {
                              user_id: userId,
                              assessment_id: assessmentId,
                              user_responses: question.map((v) => {
                                return {
                                  nid: v?.nid,
                                  user_answer: Object.keys(value).includes(
                                    v?.nid
                                  )
                                    ? proAssessmentAnsMap[
                                        value?.[v?.nid]?.option
                                      ]
                                    : '',
                                };
                              }),
                            },
                          },
                        },
                        (statusCode, res) => {
                          if (statusCode === 200)
                            navigation?.navigate('currentAssessmentScreen');
                        }
                      )
                    );
                  });
                } else if (skipQuestions === 0) {
                  navigation.navigate('assessmentResultScreen', {
                    assessmentId: submittedQuestionId,
                  });
                } else {
                  navigation.navigate('assessmentResultScreen', {
                    assessmentId: submittedQuestionId,
                  });
                  setSubmitModal(false);
                }
              }}
              containerStyle={{ marginVertical: RFValue(10) }}
            />
            {!isTimeout && !(skipQuestions === 0) && (
              <Button
                title={appTranslations?.K_QUIZ_REVISIT_SKIPPED}
                textStyle={{ color: '#4B5F83' }}
                containerStyle={{ borderWidth: 1, borderColor: '#4B5F83' }}
                onPress={() => {
                  setSubmitModal(false);
                  for (let a = 0; a < question?.length; a++) {
                    const item = question[a];
                    if (
                      filteredIds?.includes(
                        isProAssessment ? item?.nid : item?._id
                      )
                    ) {
                      setQuestionCount(a);
                      break;
                    }
                  }
                }}
              />
            )}
          </View>
        </View>
      </Modal>
      <Row
        style={{
          justifyContent: 'space-between',
          marginVertical: RFValue(10),
          paddingHorizontal: RFValue(10),
        }}
      >
        <Row
          style={[
            {
              alignItems: 'center',
              borderRadius: RFValue(10),
              paddingVertical: RFValue(2),
              paddingHorizontal: RFValue(5),
              marginRight: RFValue(5),
            },
            { backgroundColor: theme?.colors.LIGHT_BLUE_E9F1FF },
          ]}
        >
          <QuestionSvg style={{ marginRight: RFValue(5) }} />
          <Text
            style={[
              fontStyles.Maison_400_14PX_17LH,
              {
                color: theme?.colors?.BLACK_000000,
                marginVertical: RFValue(5),
              },
            ]}
          >
            {appTranslations?.APP_QUESTIONS}{' '}
            {questionCount + 1 + '/' + question?.length}
          </Text>
        </Row>
        {!isProAssessment && (
          <Row
            style={[
              {
                alignItems: 'center',
                borderRadius: RFValue(10),
                paddingVertical: RFValue(2),
                paddingHorizontal: RFValue(5),
                marginRight: RFValue(5),
              },
              { backgroundColor: theme?.colors.LIGHT_BLUE_E9F1FF },
            ]}
          >
            <ClockSvg style={{ marginRight: RFValue(5) }} />
            <Text
              style={[
                fontStyles.Maison_400_14PX_17LH,
                {
                  color: theme?.colors?.BLACK_000000,
                  marginVertical: RFValue(5),
                  borderRadius: RFValue(10),
                },
              ]}
            >
              {moment.utc(remainingTime * 1000).format('mm:ss')}
            </Text>
          </Row>
        )}
      </Row>
      <View
        style={{ paddingHorizontal: RFValue(10), marginVertical: RFValue(5) }}
      >
        <ProgressBar
          progress={
            Math.round(((questionCount + 1) / question?.length) * 100) / 100
          }
        />
      </View>
      <ScrollView>
        <Card.UniversalCard styleName='bgGrayRadius20padding4flex1'>
          <View style={{ padding: RFValue(10) }}>
            <QuizSelectionCard
              data={question[questionCount]}
              assessmentId={assessmentId}
              submittedQuestionId={submittedQuestionId}
              onSelect={handleSelect}
              isProAssessment={isProAssessment}
              selectedOption={
                isProAssessment
                  ? value[question[questionCount]['nid']]
                  : value[question[questionCount]?._id]
              }
            />
          </View>
        </Card.UniversalCard>
      </ScrollView>
      <Row style={styles.row}>
        <Button
          title={appTranslations?.APP_PREVIOUS}
          disabled={questionCount === 0}
          textStyle={styles.buttonText}
          onPress={() => setQuestionCount((prevCount) => prevCount - 1)}
          containerStyle={styles.buttonContainer}
        />
        <LinearGradient colors={['#4B5F83', '#B1BED4']} style={styles.gradient}>
          <Button
            title={
              isSkip
                ? appTranslations?.APP_SKIP
                : isSubmitted
                ? appTranslations?.APP_NEXT
                : appTranslations?.APP_SUBMIT
            }
            textStyle={styles.submitButtonText}
            disabled={
              loadingApis?.includes('STORE_ASSESSMENT_RESPONSE') || isLoading
            }
            loaderEnable={loadingApis?.includes('STORE_ASSESSMENT_RESPONSE')}
            onPress={() => {
              if (isSkip) {
                handleSelect(null, null, null, false, true);
              } else if (isSubmitted) {
                if (questionCount + 1 >= question.length) {
                  setSubmitModal(true);
                } else {
                  setQuestionCount((prevCount) => prevCount + 1);
                }
              } else if (selectedAnswer?.option) {
                if (isProAssessment) {
                  handleSelect(
                    value?.[questionId]?.text,
                    value?.[questionId]?.option,
                    submittedQuestionId && submittedQuestionId,
                    true,
                    false
                  );
                } else {
                  dispatch(
                    createAction<StoreAssessmentResponseApiPayload, null>(
                      {
                        data: {
                          assessmentId: assessmentId,
                          answer: {
                            questionId: question[questionCount]?._id,
                            answer: value?.[question[questionCount]?._id]?.text,
                            isSubmit: true,
                            selectedOption:
                              value?.[question[questionCount]?._id]?.option,
                            isCorrect:
                              value?.[question[questionCount]?._id]?.option ===
                              question[questionCount]?.correctAnswer,
                          },
                        },
                        query:
                          (submittedQuestionId &&
                            `?idFilter=${submittedQuestionId}`) ||
                          '',
                        method: 'POST',
                        url: 'STORE_ASSESSMENT_RESPONSE',
                      },
                      (code, res) => {
                        if (code === 200) {
                          handleSelect(
                            value?.[question[questionCount]?._id]?.text,
                            value?.[question[questionCount]?._id]?.option,
                            (submittedQuestionId && submittedQuestionId) ||
                              res?._id,
                            true,
                            false
                          );
                        }
                        setLoader(false);
                      }
                    )
                  );
                }
              } else {
                console.log('next');
              }
            }}
            rightIcon={<ArrowSvg stroke={'white'} />}
          />
        </LinearGradient>
      </Row>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: RFValue(5),
    flex: 1,
  },
  modal: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: RFValue(10),
    elevation: 5,
    shadowColor: '#000',
    flex: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    padding: RFValue(10),
  },
  modalTopRow: {
    justifyContent: 'space-between',
    marginVertical: RFValue(10),
  },
  modalCenterContainer: {
    flex: 1,
    borderWidth: 1,
    borderRadius: RFValue(10),
    padding: RFValue(10),
    marginVertical: RFValue(10),
  },
  modalCenterRow: {
    justifyContent: 'space-between',
    marginBottom: RFValue(10),
  },
  modalCenterTextColor: {
    color: '#797979',
    ...fontStyles.Maison_500_14PX_18LH,
    marginRight: RFValue(90),
  },
  scrollView: {
    padding: RFValue(10),
  },
  card: {
    padding: RFValue(15),
  },
  row: {
    justifyContent: 'space-between',
    marginHorizontal: RFValue(15),
  },
  buttonText: {
    ...fontStyles.Maison_500_15PX_21LH,
    color: 'gray',
  },
  buttonContainer: {
    borderWidth: 1,
    marginVertical: RFValue(10),
    borderRadius: RFValue(10),
    paddingHorizontal: RFValue(20),
  },
  gradient: {
    marginVertical: RFValue(10),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(20),
  },
  submitButtonText: {
    ...fontStyles.Maison_500_15PX_21LH,
    color: '#FFFF',
  },
});

export default QuestionsScreen;
