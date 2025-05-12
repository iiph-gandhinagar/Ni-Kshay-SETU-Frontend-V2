import { CheckSvg, CloseSvg } from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles, uiStyles } from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  RootReducerStates,
  ScreenProps,
  SurveySubmissionPayload,
  ThemeProps,
} from '@nikshay-setu-v3-monorepo/types';
import {
  getDataFromAsyncStorage,
  CustomRFValue as RFValue,
} from '@nikshay-setu-v3-monorepo/utils';
import { useTheme } from '@react-navigation/native';
import { InputField } from 'apps/nikshy-setu-mob/src/components/inputComponents';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../components/buttons/primaryButtons';
import { Row } from '../../../components/commonComponents/row_column';

const SurveyFormStepper: React.FC<ScreenProps<'surveyFormStepper'>> = ({
  navigation,
  route,
}) => {
  const [step, setStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [questionAnswer, setQuestionAnswers] = useState<
    Record<string, string>[]
  >([]);
  const dispatch = useDispatch();
  const { colors } = useTheme() as ThemeProps;
  const customStyles = {
    stepIndicatorSize: RFValue(25),
    currentStepIndicatorSize: RFValue(30),
    separatorStrokeWidth: RFValue(2),
    currentStepStrokeWidth: RFValue(3),

    stepStrokeCurrentColor: colors.DARK_BLUE_394F89,
    stepIndicatorCurrentColor: colors.DARK_BLUE_394F89,
    stepIndicatorLabelCurrentColor: colors.WHITE_FFFF,

    stepIndicatorFinishedColor: colors.GREEN_0CA74B,
    separatorFinishedColor: colors.GREEN_0CA74B,
    stepStrokeFinishedColor: colors.GREEN_0CA74B,
    stepIndicatorLabelFinishedColor: colors.WHITE_FFFF,

    stepStrokeWidth: RFValue(2),
    stepStrokeUnFinishedColor: '#aaaaaa',
    stepIndicatorLabelUnFinishedColor: colors.BLACK_000000,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorUnFinishedColor: colors.WHITE_FFFF,

    stepIndicatorLabelFontSize: RFValue(13),
    currentStepIndicatorLabelFontSize: RFValue(13),
    labelColor: colors.BLACK_000000,
    labelSize: RFValue(13),
    currentStepLabelColor: '#fe7013',
  };
  const loadingApis = useSelector(
    (state: RootReducerStates) => state.appContext?.loadingApis
  );
  const renderStepIndicator = ({
    position,
    stepStatus,
  }: {
    position: number;
    stepStatus: string;
  }) => {
    if (stepStatus === 'finished') {
      return <CheckSvg width={RFValue(24)} height={RFValue(24)} />;
    } else {
      return (
        <Text
          style={
            stepStatus == 'unfinished'
              ? { color: colors.BLACK_000000 }
              : { color: colors.WHITE_FFFF }
          }
        >
          0{position + 1}
        </Text>
      );
    }
  };
  useEffect(() => {
    setStep(0);
  }, []);
  const endOfQuestion = route?.params?.question?.length === step + 1;
  const questionStored = questionAnswer?.filter((obj) =>
    Object?.keys(obj)?.includes(route?.params?.question?.[step]?._id)
  )?.[0]?.[route?.params?.question?.[step]?._id];
  function submitSurvey() {
    getDataFromAsyncStorage('userId').then((v) => {
      if (v) {
        const surveyQuestionAnswer = questionAnswer?.map((v) => {
          return {
            surveyQuestionId: Object?.keys(v)?.[0],
            answer: v?.[Object?.keys(v)?.[0]],
          };
        });
        dispatch(
          createAction<SurveySubmissionPayload, null>(
            {
              method: 'POST',
              url: 'SURVEY_HISTORY',
              data: {
                userId: v,
                surveyId: route?.params?.surveyId,
                questionAnswer: surveyQuestionAnswer,
              },
            },
            (code, res) => {
              if (code === 200) {
                setOpen(true);
              }
            }
          )
        );
      }
    });
  }

  return (
    <View style={{ backgroundColor: 'white', flex: 1, padding: RFValue(15) }}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={step}
        stepCount={route?.params?.question?.length}
        renderStepIndicator={renderStepIndicator}
      />
      <View style={{ flex: 1, marginVertical: RFValue(25) }}>
        {route?.params?.question?.[step]?.type === 'options' ? (
          <InputField.CheckBox
            options={['option1', 'option2', 'option3', 'option4']
              .filter((v) =>
                Object.keys(route?.params?.question?.[step]).includes(v)
              )
              .map((v) => {
                return {
                  label: route?.params?.question?.[step]?.[v]?.en,
                  value: route?.params?.question?.[step]?.[v]?.en,
                };
              })}
            label={route?.params?.question?.[step]?.title?.en}
            value={{
              label: questionStored,
              value: questionStored,
            }}
            labelStyles={{
              color: colors.DARK_BLUE_394F89,
              ...fontStyles.Maison_600_16PX_21LH,
              marginBottom: RFValue(5),
            }}
            touched={true}
            containerStyle={uiStyles?.flex1BgWhite}
            onChange={(v) => {
              setQuestionAnswers((prevAnswers) => {
                const updatedAnswer = {
                  [route?.params?.question?.[step]?._id]: v.value,
                };
                const filteredAnswers = prevAnswers.filter(
                  (old) =>
                    !Object.keys(old).includes(
                      route?.params?.question?.[step]?._id
                    )
                );
                return [...filteredAnswers, updatedAnswer];
              });
            }}
          />
        ) : (
          <InputField.Input
            touched={true}
            value={questionStored}
            key={step + '--input'}
            label={route?.params?.question?.[step]?.title?.en}
            containerStyle={uiStyles?.flex1BgWhite}
            labelStyles={{
              color: colors.DARK_BLUE_394F89,
              ...fontStyles.Maison_600_16PX_21LH,
            }}
            placeholder='Enter here...'
            onChange={(v) => {
              setQuestionAnswers((prevAnswers) => {
                const updatedAnswer = {
                  [route?.params?.question?.[step]?._id]: v,
                };
                const filteredAnswers = prevAnswers.filter(
                  (old) =>
                    !Object.keys(old).includes(
                      route?.params?.question?.[step]?._id
                    )
                );
                return [...filteredAnswers, updatedAnswer];
              });
            }}
          />
        )}
        <Modal
          animationType='slide'
          visible={open}
          transparent
          onRequestClose={() => {
            navigation?.goBack();
            setOpen(!open);
          }}
        >
          <View style={styles.centeredView}>
            <View
              style={[styles.modalView, { shadowColor: colors.BLACK_000000 }]}
            >
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  navigation?.goBack();
                  setOpen(false);
                }}
              >
                <CloseSvg />
              </TouchableOpacity>
              <Row style={{ padding: RFValue(20) }}>
                <View
                  style={{
                    backgroundColor: colors.GREEN_0CA74B,
                    alignSelf: 'flex-start',
                    marginTop: RFValue(5),
                    padding: RFValue(5),
                    borderRadius: RFValue(50),
                  }}
                >
                  <CheckSvg height={RFValue(15)} width={RFValue(15)} />
                </View>
                <Text
                  style={{
                    paddingHorizontal: RFValue(5),
                    ...fontStyles.Maison_500_16PX_21LH,
                  }}
                >
                  Thanks for completing the survey!
                </Text>
              </Row>
              <Text
                style={{
                  padding: RFValue(10),
                  borderColor: 'gray',
                  borderRadius: RFValue(10),
                  borderWidth: 1,
                  color: colors.GREY_797979,
                  marginVertical: RFValue(5),
                }}
              >
                We are very appreciative of the time you have taken to assist in
                our analysis, and commit to utilizing the information gained to
                contemplate and implement worth while improvements.
              </Text>
              <View style={{ backgroundColor: 'white', width: '100%' }}>
                <Button
                  onPress={() => {
                    navigation?.goBack();
                    setOpen(false);
                  }}
                  title='Ok'
                  textStyle={fontStyles.Maison_500_13PX_20LH}
                  bgColor={colors.DARK_BLUE_394F89}
                  containerStyle={{ marginVertical: RFValue(10) }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <View>
        <Button
          onPress={() => {
            if (!endOfQuestion) {
              setStep(step + 1);
            } else {
              submitSurvey();
            }
          }}
          title={!endOfQuestion ? 'Next' : 'Submit'}
          textStyle={fontStyles.Maison_500_15PX_21LH}
          disabled={!questionStored || loadingApis.includes('SURVEY_HISTORY')}
          loaderEnable={loadingApis.includes('SURVEY_HISTORY')}
          bgColor={colors.DARK_BLUE_394F89}
          containerStyle={{ padding: RFValue(10) }}
        />
        <Button
          onPress={() => {
            if (!endOfQuestion) {
              setStep(step + 1);
            } else {
              submitSurvey();
            }
          }}
          title={'Skip'}
          textStyle={{
            ...fontStyles.Maison_500_15PX_21LH,
            color: colors.BLACK_000000,
          }}
          bgColor='white'
          disabled={loadingApis.includes('SURVEY_HISTORY')}
          containerStyle={{
            padding: RFValue(10),
            marginVertical: RFValue(10),
            borderWidth: 1,
            borderColor: '#B0B0B0',
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000090',
  },
  modalView: {
    margin: RFValue(20),
    backgroundColor: 'white',
    borderRadius: RFValue(20),
    padding: RFValue(15),
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: RFValue(4),
    elevation: RFValue(5),
  },
  closeButton: {
    position: 'absolute',
    top: RFValue(15),
    right: RFValue(15),
    zIndex: 1,
  },
  button: {
    borderRadius: RFValue(20),
    padding: RFValue(10),
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: RFValue(15),
    textAlign: 'center',
  },
});
export default SurveyFormStepper;
