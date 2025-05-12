import {
  GradientGrayRightArrowSvg,
  KnowledgeQuizSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles } from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { ScreenProps, ThemeProps } from '@nikshay-setu-v3-monorepo/types';
import {
  getDataFromAsyncStorage,
  CustomRFValue as RFValue,
} from '@nikshay-setu-v3-monorepo/utils';
import { useFocusEffect, useTheme } from '@react-navigation/native';
import Button from 'apps/nikshy-setu-mob/src/components/buttons/primaryButtons';
import { Row } from 'apps/nikshy-setu-mob/src/components/commonComponents/row_column';
import CircularProgress from 'apps/nikshy-setu-mob/src/components/progressBar/CircularProgress';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import SetGoalsModalComponent from '../../../components/commonComponents/setGoalsModalComponent';

const KnowledgeQuizScreen: React.FC<ScreenProps<'knowledgeQuizScreen'>> = ({
  navigation,
  route,
}) => {
  const { colors } = useTheme() as ThemeProps;
  const dispatch = useDispatch();
  const appTranslations = route?.params?.appTranslations;
  const [showGoalsPopup, setShowGoalsPopup] = useState(false);
  const [performance, setPerformance] = useState({
    accuracy: '0',
    completedAssessment: 0,
    countAccuracy: '0',
    totalAssessmentCount: 0,
  });

  const onClose = () => {
    setShowGoalsPopup(false);
  };
  const OnEditGoal = () => {
    setShowGoalsPopup(true);
  };

  useFocusEffect(
    React.useCallback(() => {
      getDataFromAsyncStorage('goal').then((v) => {
        if (!v || v == 0) {
          setShowGoalsPopup(true);
        } else {
          dispatch(
            createAction(
              {
                method: 'GET',
                url: 'PRO_ASSESSMENT_PERFORMANCE',
              },
              (statusCode, apiRes) => {
                if (statusCode === 200) setPerformance(apiRes);
              }
            )
          );
        }
      });
    }, [])
  );

  const outerProgress = performance?.countAccuracy
    ? parseFloat(parseFloat(performance.countAccuracy).toFixed(1)) / 100
    : 0;

  const innerProgress = performance?.accuracy
    ? parseFloat(parseFloat(performance.accuracy).toFixed(1)) / 100
    : 0;
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.WHITE_FFFF, margin: RFValue(15) },
      ]}
    >
      {showGoalsPopup && (
        <SetGoalsModalComponent
          onClose={onClose}
          open={showGoalsPopup}
          appTranslations={appTranslations}
        />
      )}
      <LinearGradient
        colors={[colors.DARK_GREY_4B5F83, colors.LIGHT_GREY_B1BED4]}
        style={{ borderRadius: RFValue(10), flex: 1 }}
      >
        <View
          style={[
            styles.topContainer,
            {
              borderColor: colors.LIGHT_GREY_CCC,
              borderBottomWidth: RFValue(1),
            },
          ]}
        >
          <Row
            style={{ justifyContent: 'space-between', alignItems: 'center' }}
          >
            <KnowledgeQuizSvg height={RFValue(50)} width={RFValue(50)} />
          </Row>
          <Text
            style={[
              fontStyles.Maison_500_22PX_29LH,
              { color: colors.WHITE_FFFF, marginTop: RFValue(10) },
            ]}
          >
            {appTranslations?.APP_KNOWLEDGE_QUIZ}
          </Text>
        </View>
        <Row style={styles.secondContainer}>
          <Text
            style={[
              fontStyles.Maison_600_18PX_20LH,
              {
                color: '#F18282',
                marginRight: RFValue(15),
                textDecorationColor: '#F18282',
                textDecorationStyle: 'solid',
                paddingBottom: RFValue(5),
                alignSelf: 'flex-start',
                borderBottomWidth: 1.5,
                borderColor: '#F18282',
              },
            ]}
          >
            {appTranslations?.K_QUIZ_PERFORMANCE}
          </Text>
          <Button
            textStyle={{
              color: colors.WHITE_FFFF,
            }}
            containerStyle={{ padding: 0 }}
            title={appTranslations?.K_QUIZ_EDIT_GOAL}
            onPress={() => OnEditGoal()}
          />
        </Row>
        <View
          style={[
            styles.container,
            {
              backgroundColor: colors.WHITE_FFFF,
              marginHorizontal: RFValue(10),
              justifyContent: 'space-around',
              alignItems: 'center',
              borderRadius: RFValue(10),
              padding: RFValue(20),
            },
          ]}
        >
          <CircularProgress
            size={RFValue(180)}
            strokeWidth={RFValue(12)}
            outerProgress={outerProgress}
            innerProgress={innerProgress}
            duration={2000}
          >
            <View style={{}}>
              <Text
                style={[
                  fontStyles.Maison_500_20PX_25LH,
                  {
                    alignSelf: 'center',
                    color: '#53B5D9',
                  },
                ]}
              >
                {parseFloat(performance?.accuracy).toFixed(1)}%
              </Text>
              <Text
                style={[
                  fontStyles.Maison_400_14PX_17LH,
                  { padding: RFValue(10), color: '#0C3896' },
                ]}
              >
                {performance?.completedAssessment}/
                {performance?.totalAssessmentCount}
                <Text style={[fontStyles.Maison_400_10PX_12LH]}>
                  {appTranslations?.K_QUIZ_COMPLETION}
                </Text>
              </Text>
            </View>
          </CircularProgress>
          <View style={{ alignItems: 'center', marginBottom: RFValue(10) }}>
            <View>
              <Row style={{ alignItems: 'center' }}>
                <View
                  style={[
                    styles.colorIndicator,
                    {
                      backgroundColor: colors.DARK_BLUE_0C3896,
                    },
                  ]}
                />
                <Text style={[fontStyles.Maison_500_16PX_21LH]}>
                  {performance?.completedAssessment}/
                  {performance?.totalAssessmentCount}{' '}
                  {appTranslations?.K_QUIZ_COMPLETION}
                </Text>
              </Row>
              <Row style={{ alignItems: 'center' }}>
                <View
                  style={[
                    styles.colorIndicator,
                    { backgroundColor: '#53B5D9' },
                  ]}
                />
                <Text style={fontStyles.Maison_500_16PX_21LH}>
                  {parseFloat(performance?.accuracy).toFixed(1)}%{' '}
                  {appTranslations?.K_QUIZ_ACCURACY}
                </Text>
              </Row>
            </View>
          </View>
        </View>
        <Pressable
          onPress={() => navigation.navigate('currentAssessmentScreen')}
          style={{
            backgroundColor: colors.WHITE_FFFF,
            margin: RFValue(10),
            borderRadius: RFValue(10),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: RFValue(10),
            borderWidth: 1,
            borderColor: '#B0B0B0',
          }}
        >
          <Text
            style={[
              fontStyles.Maison_500_15PX_21LH,
              { color: colors.DARK_GREY_4B5F83 },
            ]}
          >
            {appTranslations?.K_QUIZ_LIST_OF_ASSESSMENT}
          </Text>
          <View style={{ marginHorizontal: RFValue(5) }}>
            <GradientGrayRightArrowSvg />
          </View>
        </Pressable>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    paddingHorizontal: RFValue(25),
    paddingVertical: RFValue(15),
    marginBottom: RFValue(10),
  },
  secondContainer: {
    padding: RFValue(10),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: RFValue(24),
    fontWeight: 'bold',
    marginBottom: RFValue(10),
  },
  subtitle: {
    fontSize: RFValue(16),
    marginBottom: RFValue(20),
  },
  button: {
    backgroundColor: 'transparent',
    borderRadius: RFValue(10),
    borderWidth: 1,
    width: '100%',
    padding: RFValue(10),
    alignItems: 'center',
  },
  button1: {
    borderRadius: RFValue(10),
    marginVertical: RFValue(15),
    width: '100%',
    padding: RFValue(13),
    alignItems: 'center',
  },
  colorIndicator: {
    width: 25,
    height: 12,
    marginRight: 8,
  },
});

export default KnowledgeQuizScreen;
