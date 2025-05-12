import {
  ArrowSvg,
  CertificatesSvg,
  Download2Svg,
} from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles, uiStyles } from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  AssessmentResultApiResponse,
  ScreenProps,
} from '@nikshay-setu-v3-monorepo/types';
import {
  formatDate,
  getDataFromAsyncStorage,
  CustomRFValue as RFValue,
} from '@nikshay-setu-v3-monorepo/utils';
import { useFocusEffect } from '@react-navigation/native';
import Button from 'apps/nikshy-setu-mob/src/components/buttons/primaryButtons';
import { Card } from 'apps/nikshy-setu-mob/src/components/cards/MainCard';
import { Row } from 'apps/nikshy-setu-mob/src/components/commonComponents/row_column';
import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'white',
    height: RFValue(55),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    marginHorizontal: RFValue(5),
  },
  appResultView: {
    borderBottomWidth: 1,
    borderColor: '#394F89',
    padding: RFValue(8),
  },
  scoreView: {
    backgroundColor: '#4B5F83',
    padding: RFValue(10),
    margin: RFValue(10),
    alignItems: 'center',
    borderRadius: RFValue(30),
  },
  txtRow: {
    marginBottom: RFValue(10),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexRowAlignCenter: { alignItems: 'center', flexDirection: 'row' },
  rotate180: { transform: [{ rotate: '180deg' }] },
  backTxt: {
    ...fontStyles.Maison_500_20PX_25LH,
    marginHorizontal: RFValue(5),
    flex: 1,
  },
  resultContainer: {
    borderWidth: 0.2,
    borderRadius: RFValue(10),
    padding: RFValue(10),
    borderColor: 'gray',
  },
  marginBottom15: { marginBottom: RFValue(15) },
  container1: {
    borderWidth: 1,
    borderRadius: RFValue(10),
    marginTop: RFValue(10),
    borderColor: '#394F89',
  },
  container2: {
    borderWidth: 0.2,
    borderColor: '#394F89',
    borderRadius: RFValue(10),
    padding: RFValue(10),
    margin: RFValue(10),
  },
});

const AssessmentResultScreen: React.FC<
  ScreenProps<'assessmentResultScreen'>
> = ({ navigation, route }) => {
  const { assessmentId, theme, isProAssessment } = route.params;
  const dispatch = useDispatch();
  const appTranslations = route?.params?.appTranslations;
  const { colors } = theme;
  const [results, setResults] = useState({
    _id: '--',
    assessmentId: {
      title: {
        en: '---',
      },
    },
    totalMarks: 0,
    totalTime: 0,
    obtainedMarks: 0,
    attempted: 0,
    rightAnswer: 0,
    wrongAnswer: 0,
    skip: 0,
    isCalculated: true,
    createdAt: '---',
    updatedAt: '---',
  });

  const result = [
    {
      title: appTranslations?.K_QUIZ_ASSESSMENT_NAME + ':',
      value: results?.assessmentId?.title?.en || '-',
    },
    {
      title: appTranslations?.K_QUIZ_NUMBER_OF_QUESTIONS + ':',
      value: results?.skip + results?.attempted || '0',
    },
  ];
  if (results?.updatedAt) {
    result.push({
      title: results?.updatedAt
        ? appTranslations?.K_QUIZ_COMPLETED_ON + ':'
        : '',
      value: (results?.updatedAt && formatDate(results?.updatedAt)) || '',
    });
  }
  const onBackPress = () => {
    navigation.navigate('currentAssessmentScreen');
    return true; // Prevent default back action
  };
  useEffect(() => {
    getDataFromAsyncStorage('userId').then((v) => {
      dispatch(
        createAction<null, AssessmentResultApiResponse>(
          {
            method: 'GET',
            url: isProAssessment
              ? 'PRO_ASSESSMENT_RESULT'
              : 'SUBSCRIBER_ASSESSMENT_RESULT',
            query: isProAssessment
              ? `?assessmentId=${assessmentId}`
              : `?userId=${v}&userAssessmentId=${assessmentId}`,
          },
          (statusCode, apiRes) => {
            if (statusCode === 200) {
              const setResultObj = isProAssessment
                ? {
                    _id: '--',
                    assessmentId: {
                      title: {
                        en: apiRes?.[0]?.title,
                      },
                    },
                    totalMarks: apiRes?.[0]?.questions?.length,
                    totalTime: 0,
                    obtainedMarks: apiRes?.[0]?.correct,
                    attempted:
                      apiRes?.[0]?.questions?.length - apiRes?.[0]?.skipped,
                    rightAnswer: apiRes?.[0]?.correct,
                    wrongAnswer: apiRes?.[0]?.incorrect,
                    skip: apiRes?.[0]?.skipped,
                    isCalculated: true,
                    createdAt: '',
                    updatedAt: '',
                  }
                : apiRes;
              setResults(setResultObj);
            }
          }
        )
      );
    });
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );
      return () => subscription.remove();
    }, [navigation])
  );
  return (
    <View style={uiStyles?.flex1}>
      <Row
        style={[
          styles?.headerContainer,
          {
            borderColor: colors.LIGHT_GREY_F4F4F4,
          },
        ]}
      >
        <TouchableOpacity
          style={styles?.flexRowAlignCenter}
          onPress={onBackPress}
        >
          <ArrowSvg
            width={RFValue(25)}
            height={RFValue(25)}
            style={styles?.rotate180}
            stroke={colors.DARK_BLUE_394F89}
          />
          <Text
            numberOfLines={1}
            ellipsizeMode='tail'
            style={[
              styles?.backTxt,
              {
                color: colors.DARK_BLUE_394F89,
              },
            ]}
          >
            {appTranslations?.APP_BACK}
          </Text>
        </TouchableOpacity>
      </Row>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={uiStyles?.padding10}
      >
        <Card.UniversalCard styleName='bgGrayRadius20padding4flex1'>
          <Card.UniversalCard styleName='bgFFFMargin10PaddingV12paddingH24'>
            <View>
              <View style={styles?.resultContainer}>
                {result?.map((item, key) => {
                  return (
                    <View key={key + '-result'} style={styles?.marginBottom15}>
                      <Text
                        style={{
                          ...fontStyles.Maison_400_14PX_17LH,
                          color: '#797979',
                        }}
                      >
                        {item.title}
                      </Text>
                      <Text
                        style={{
                          ...fontStyles.Maison_500_15PX_21LH,
                          marginTop: RFValue(2),
                          color: '#4B5F83',
                        }}
                      >
                        {item.value}
                      </Text>
                    </View>
                  );
                })}
              </View>

              <View style={styles?.container1}>
                <View style={styles?.appResultView}>
                  <Text
                    style={{
                      ...fontStyles.Maison_500_16PX_21LH,
                      color: '#4B5F83',
                    }}
                  >
                    {appTranslations?.APP_RESULT}
                  </Text>
                </View>
                <View style={styles?.container2}>
                  {[
                    {
                      title: appTranslations?.K_QUIZ_ATTEMPTED,
                      value: results?.attempted || '0',
                    },
                    {
                      title: appTranslations?.APP_SKIPPED,
                      value: results?.skip || '0',
                    },
                    {
                      title: appTranslations?.APP_CORRECT_ANSWERS,
                      value: results?.rightAnswer || '0',
                    },
                    {
                      title: appTranslations?.APP_WRONG_ANSWERS,
                      value: results?.wrongAnswer || '0',
                    },
                  ]?.map((item, key) => {
                    return (
                      <Row key={key + '-result'} style={styles?.txtRow}>
                        <Text
                          style={{
                            ...fontStyles.Maison_400_12PX_16LH,
                            color: '#797979',
                          }}
                        >
                          {item.title}
                        </Text>
                        <Text
                          style={{
                            ...fontStyles.Maison_400_14PX_17LH,
                            color: '#4B5F83',
                          }}
                        >
                          {item.value}
                        </Text>
                      </Row>
                    );
                  })}
                </View>
                <View style={styles?.scoreView}>
                  <Text
                    style={{
                      color: '#FFCD1D',
                      ...fontStyles.Maison_500_18PX_24LH,
                    }}
                  >{`${appTranslations?.APP_SCORE}-${results?.obtainedMarks}/${results?.totalMarks}`}</Text>
                </View>
              </View>
            </View>
          </Card.UniversalCard>
        </Card.UniversalCard>

        {!isProAssessment && (
          <LinearGradient
            colors={[theme.colors.DARK_GREY_4B5F83, colors.LIGHT_GREY_B1BED4]}
            style={{
              margin: RFValue(10),
              borderRadius: RFValue(20),
            }}
          >
            <Button
              title={appTranslations?.K_QUIZ_VIEW_CERTIFICATE}
              textStyle={{
                ...fontStyles.Maison_500_18PX_24LH,
                color: colors.WHITE_FFFF,
              }}
              bgColor=''
              onPress={() => {
                navigation?.navigate('certificateScreen', {
                  id: assessmentId,
                  title: results?.assessmentId?.title?.en,
                });
              }}
              containerStyle={{ padding: RFValue(5) }}
              rightIcon={<Download2Svg />}
              leftIcon={<CertificatesSvg height={RFValue(30)} />}
            />
          </LinearGradient>
        )}
      </ScrollView>
    </View>
  );
};

export default AssessmentResultScreen;
