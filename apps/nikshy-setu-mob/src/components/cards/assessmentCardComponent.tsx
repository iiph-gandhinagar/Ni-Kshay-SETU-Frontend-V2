import {
  CheckSvg,
  ClockSvg,
  QuestionSvg,
  RightArrowSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles } from '@nikshay-setu-v3-monorepo/constants';
import {
  AssessmentCardComponentProps,
  RootReducerStates,
  RootStackParamList,
  ThemeProps,
} from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import {
  NavigationProp,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import Button from 'apps/nikshy-setu-mob/src/components/buttons/primaryButtons';
import { Card } from 'apps/nikshy-setu-mob/src/components/cards/MainCard';
import { Row } from 'apps/nikshy-setu-mob/src/components/commonComponents/row_column';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';

const metaDataMap = {
  real_time: { color: '#4FD76D', assessmentType: 'K_QUIZ_PLANNED' },
  Completed: { color: '#4FD76D', assessmentType: 'APP_COMPLETED' },
  Planned: { color: '#4FD76D', assessmentType: 'K_QUIZ_PLANNED' },
  ProAssessment: { color: '#707070', assessmentType: 'K_QUIZ_PRO_ACTIVE' },
};

const getFormattedDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const amPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${day}-${month}-${year} ${String(hours).padStart(
    2,
    '0'
  )}:${minutes} ${amPm}`;
};

const AssessmentCardComponent: React.FC<AssessmentCardComponentProps> = ({
  assessmentType,
  itm,
}) => {
  const { colors } = useTheme() as ThemeProps;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [showButton, setShowButton] = useState(false);
  const appTranslations = useSelector(
    (state: RootReducerStates) => state.appContext?.data?.appTranslations
  );

  const isProAssessment = Boolean(!itm?.assessmentType && itm?.assessment_id);
  const CardAssessmentType =
    itm?.assessmentType ||
    (isProAssessment
      ? assessmentType === 'Completed'
        ? 'Completed'
        : 'ProAssessment'
      : 'Completed');
  // console.log();

  const metaData = metaDataMap[CardAssessmentType] || metaDataMap.Planned;
  const formattedDateTime = getFormattedDate(new Date(itm?.fromDate));
  const formattedCreatedAtDate = getFormattedDate(new Date(itm?.createdAt));
  const checkDateInRange = useCallback(() => {
    const now = new Date();
    return now >= new Date(itm?.fromDate) && now <= new Date(itm?.toDate);
  }, [itm]);

  useEffect(() => {
    setShowButton(checkDateInRange());
    const interval = setInterval(
      () => setShowButton(checkDateInRange()),
      60000
    );
    return () => clearInterval(interval);
  }, [checkDateInRange]);

  const handlePress = () => {
    if (CardAssessmentType === 'Completed') {
      navigation.navigate('assessmentResultScreen', {
        assessmentId: itm?._id || itm?.assessment_id,
        isProAssessment,
      });
    } else {
      navigation.navigate('rulesScreen', {
        question: itm?.questions,
        assessmentId: itm?._id || itm?.assessment_id,
        isProAssessment,
      });
    }
  };
  const btnTitle =
    CardAssessmentType === 'Completed'
      ? appTranslations?.APP_RESULT
      : appTranslations?.APP_VIEW;
  return (
    <Card.UniversalCard
      styleName='bgFFFMargin10PaddingV12paddingH24'
      style={[styles.cardContainer, { borderColor: metaData.color }]}
    >
      <View>
        <Row style={{ alignItems: 'center' }}>
          {assessmentType === 'Completed' ? (
            <View
              style={{
                marginEnd: RFValue(8),
                backgroundColor: '#4FD76D',
                borderRadius: RFValue(20),
              }}
            >
              <CheckSvg
                height={RFValue(18)}
                width={RFValue(18)}
                strokeWidth={RFValue(10)}
                // fill='#4FD76D'
                style={{
                  transform: [{ rotate: '2deg' }],
                }}
              />
            </View>
          ) : (
            <View
              style={[
                styles.emptyContainer,
                { backgroundColor: metaData.color },
              ]}
            />
          )}

          <Text
            style={[fontStyles.Maison_600_16PX_21LH, { color: metaData.color }]}
          >
            {appTranslations[metaData.assessmentType]}
          </Text>
        </Row>
        <Text
          style={[
            fontStyles.Maison_500_16PX_21LH,
            { color: colors.DARK_GREY_4B5F83, marginVertical: RFValue(7) },
          ]}
        >
          {isProAssessment
            ? itm?.title
            : itm?.title.en ||
              itm?.title.gu ||
              itm?.title.hi ||
              itm?.title.te ||
              itm?.title.kn ||
              itm?.title.pa ||
              itm?.title.mr ||
              ''}
        </Text>
        {(CardAssessmentType === 'Planned' ||
          CardAssessmentType === 'ProAssessment') &&
          !showButton && (
            <Text
              style={[
                fontStyles.Maison_500_13PX_20LH,
                { color: colors.GREY_808080, marginVertical: RFValue(7) },
              ]}
            >
              {CardAssessmentType === 'ProAssessment'
                ? formattedCreatedAtDate
                : 'Available On: ' + (formattedDateTime || '---')}
            </Text>
          )}
        <Row style={{ alignItems: 'center', marginVertical: RFValue(10) }}>
          <Row
            style={[
              styles.infoContainer,
              { backgroundColor: colors.LIGHT_BLUE_E9F1FF },
            ]}
          >
            <QuestionSvg style={{ marginRight: RFValue(5) }} />
            <Text
              style={[
                fontStyles.Maison_400_14PX_17LH,
                { color: colors.BLACK_000000, marginVertical: RFValue(5) },
              ]}
            >
              {itm?.questions?.length} {appTranslations?.APP_QUESTIONS}
            </Text>
          </Row>
          {!isProAssessment && !(CardAssessmentType === 'Completed') && (
            <Row
              style={[
                styles.infoContainer,
                { backgroundColor: colors.LIGHT_BLUE_E9F1FF },
              ]}
            >
              <ClockSvg style={{ marginRight: RFValue(5) }} />
              <Text
                style={[
                  fontStyles.Maison_400_14PX_17LH,
                  { color: colors.BLACK_000000, marginVertical: RFValue(5) },
                ]}
              >
                {itm.timeToComplete + ' ' + appTranslations?.K_QUIZ_MIN}
              </Text>
            </Row>
          )}
        </Row>
        {(showButton || CardAssessmentType === 'Completed') && (
          <LinearGradient
            colors={[colors.DARK_GREY_4B5F83, colors.LIGHT_GREY_B1BED4]}
            style={styles.buttonContainer}
          >
            <Button
              title={btnTitle}
              textStyle={{
                ...fontStyles.Maison_500_18PX_24LH,
                color: colors.WHITE_FFFF,
              }}
              bgColor=''
              onPress={handlePress}
              rightIcon={<RightArrowSvg />}
            />
          </LinearGradient>
        )}
        {['real_time', 'ProAssessment'].includes(CardAssessmentType) && (
          <LinearGradient
            colors={[colors.DARK_GREY_4B5F83, colors.LIGHT_GREY_B1BED4]}
            style={styles.buttonContainer}
          >
            <Button
              title={btnTitle}
              textStyle={{
                ...fontStyles.Maison_500_18PX_24LH,
                color: colors.WHITE_FFFF,
              }}
              bgColor=''
              onPress={handlePress}
              rightIcon={<RightArrowSvg />}
            />
          </LinearGradient>
        )}
      </View>
    </Card.UniversalCard>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    alignItems: 'center',
    borderRadius: RFValue(10),
    paddingVertical: RFValue(2),
    paddingHorizontal: RFValue(5),
    marginRight: RFValue(5),
  },
  cardContainer: {
    borderStyle: 'solid',
    borderWidth: RFValue(2),
  },
  emptyContainer: {
    height: RFValue(8),
    width: RFValue(8),
    borderRadius: RFValue(100),
    marginRight: RFValue(10),
  },
  buttonContainer: {
    marginVertical: RFValue(10),
    borderRadius: RFValue(10),
  },
});

export default AssessmentCardComponent;
