import { AssessmentRuleSvg } from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles } from '@nikshay-setu-v3-monorepo/constants';
import { ScreenProps } from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import Button from 'apps/nikshy-setu-mob/src/components/buttons/primaryButtons';
import { Card } from 'apps/nikshy-setu-mob/src/components/cards/MainCard';
import { Row } from 'apps/nikshy-setu-mob/src/components/commonComponents/row_column';
import React from 'react';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const RulesScreen: React.FC<ScreenProps<'rulesScreen'>> = ({
  navigation,
  route,
}) => {
  const appTranslations = route?.params?.appTranslations;
  const Data = [
    appTranslations?.K_QUIZ_ASSESSMENT_TIMER_START,
    appTranslations?.K_QUIZ_NO_CHANGE_AFTER_SAVE,
    appTranslations?.K_QUIZ_SKIP_QUESTIONS,
    appTranslations?.K_QUIZ_RESULT_GENERATION,
  ];
  const { theme, question, assessmentId, isProAssessment } = route?.params;
  const colors = theme?.colors;
  function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  return (
    <View style={{ flex: 1, padding: RFValue(5) }}>
      <Card.UniversalCard styleName='bgGrayRadius20padding4flex1'>
        <View
          style={{
            padding: RFValue(15),
            backgroundColor: 'white',
            alignSelf: 'center',
            margin: RFValue(20),
            borderRadius: RFValue(10),
          }}
        >
          <Row style={{ alignItems: 'center', marginBottom: RFValue(20) }}>
            <AssessmentRuleSvg style={{ marginRight: RFValue(10) }} />
            <Text style={fontStyles?.Maison_500_16PX_21LH}>
              {appTranslations?.K_QUIZ_RULES_OF_ASSESSMENTS}
            </Text>
          </Row>
          {Data?.map((v, key) => {
            return (
              <Row key={key + '-Txt'} style={{ padding: RFValue(5) }}>
                <Text
                  key={key + '--txt'}
                  style={fontStyles?.Maison_500_14PX_18LH}
                >
                  {key + 1} .{' '}
                </Text>
                <Text
                  key={key + '-txt'}
                  style={fontStyles?.Maison_500_14PX_18LH}
                >
                  {v}
                </Text>
              </Row>
            );
          })}
          <LinearGradient
            colors={[colors.DARK_GREY_4B5F83, colors.LIGHT_GREY_B1BED4]}
            style={{
              marginVertical: RFValue(10),
              borderRadius: RFValue(100),
            }}
          >
            <Button
              title={appTranslations?.APP_OK}
              textStyle={{
                ...fontStyles.Maison_500_14PX_18LH,
                color: colors.WHITE_FFFF,
              }}
              bgColor=''
              onPress={() => {
                const shuffledQuestions = shuffleArray([...question]); // Spread operator to avoid mutating the original array
                navigation?.navigate('questionsScreen', {
                  question: shuffledQuestions,
                  assessmentId,
                  isProAssessment,
                });
              }}
            />
          </LinearGradient>
          <Button
            title={appTranslations?.APP_CANCEL}
            textStyle={{
              ...fontStyles.Maison_500_14PX_18LH,
              color: colors.BLACK_000000,
            }}
            onPress={() => {
              navigation?.goBack();
            }}
            containerStyle={{ borderWidth: 1 }}
          />
        </View>
      </Card.UniversalCard>
    </View>
  );
};

export default RulesScreen;
