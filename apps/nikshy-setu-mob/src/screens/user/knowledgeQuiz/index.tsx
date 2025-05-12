import {
  GradientGrayRightArrowSvg,
  InfoSvg,
  KnowledgeQuizSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles } from '@nikshay-setu-v3-monorepo/constants';
import {
  RootReducerStates,
  ScreenProps,
  ThemeProps,
} from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { useTheme } from '@react-navigation/native';
import Button from 'apps/nikshy-setu-mob/src/components/buttons/primaryButtons';
import { Card } from 'apps/nikshy-setu-mob/src/components/cards/MainCard';
import { Row } from 'apps/nikshy-setu-mob/src/components/commonComponents/row_column';
import PluginInfoModal from 'apps/nikshy-setu-mob/src/components/pluginInfoModal';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';

const KnowledgeAssessmentScreen: React.FC<
  ScreenProps<'knowledgeAssessmentScreen'>
> = ({ navigation }) => {
  const { colors } = useTheme() as ThemeProps;
  const appTranslations = useSelector(
    (state: RootReducerStates) => state.appContext?.data?.appTranslations
  );
  const [isModalVisible, setIsModalVisible] = useState({
    x: 0,
    y: 0,
    isOpen: false,
  });
  const CardData = [
    {
      index: 1,
      label: appTranslations?.K_QUIZ_ANSWER_QUESTIONS + ' : ',
      value: appTranslations?.K_QUIZ_TEST_TB_KNOWLEDGE,
    },
    {
      index: 2,
      label: appTranslations?.K_QUIZ_PERSONALIZE_LEARNING + ' : ',
      value: appTranslations?.K_QUIZ_IDENTIFY_STRENGTHS_IMPROVEMENT,
    },
    {
      index: 3,
      label: appTranslations?.K_QUIZ_SET_WEEKLY_TARGETS + ' : ',
      value: appTranslations?.K_QUIZ_COMPLETE_ASSESSMENTS_LEADERBOARD,
    },
  ];
  return (
    <View style={[styles.container, { backgroundColor: colors.WHITE_FFFF }]}>
      <LinearGradient
        colors={[colors.DARK_GREY_4B5F83, colors.LIGHT_GREY_B1BED4]}
        style={{ flex: 0.6 }}
      >
        <View style={styles.topContainer}>
          <Row
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flex: 1,
            }}
          >
            <View />
            <KnowledgeQuizSvg height={RFValue(50)} width={RFValue(50)} />
            <InfoSvg
              height={RFValue(17)}
              width={RFValue(17)}
              style={{ alignSelf: 'center', flex: 1 }}
              onPress={(e) =>
                setIsModalVisible({
                  y: e?.nativeEvent?.pageY,
                  isOpen: true,
                  x: 0,
                })
              }
            />
          </Row>
          <Text
            style={[
              fontStyles.Maison_500_22PX_29LH,
              {
                color: colors.WHITE_FFFF,
                textAlign: 'center',
                alignSelf: 'center',
                marginTop: RFValue(7),
              },
            ]}
          >
            {appTranslations?.K_QUIZ_BOOST_YOUR_KNOWLEDGE}
          </Text>
          <Text
            style={[
              fontStyles.Maison_400_14PX_17LH,
              {
                color: colors.WHITE_FFFF,
                textAlign: 'center',
                marginTop: RFValue(3),
              },
            ]}
          >
            {appTranslations?.K_QUIZ_ENHANCE_UNDERSTANDING_TB}
          </Text>
        </View>
      </LinearGradient>
      <View style={{ marginTop: RFValue(10), flex: 1, padding: RFValue(5) }}>
        <Text
          style={[
            fontStyles.Maison_500_20PX_25LH,
            {
              color: '#616161',
              textAlign: 'center',
              marginLeft: RFValue(10),
              alignSelf: 'flex-start',
              marginBottom: RFValue(5),
            },
          ]}
        >
          {appTranslations?.K_QUIZ_HOW_IT_WORKS} :
        </Text>
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <Card.UniversalCard
          style={{
            backgroundColor: '#F3F5F6',
            flex: 1,
            // alignSelf: 'center',
            // justifyContent: "space-evenly",
            borderRadius: RFValue(10),
            paddingTop: RFValue(5),
          }}
        >
          <>
            {CardData?.map((data, key) => (
              <Card.UniversalCard
                key={key + '-KACard'}
                styleName='bgFFFMargin10PaddingV12paddingH24'
                style={{ marginTop: RFValue(5) }}
              >
                {/* <View style={{ marginVertical: RFValue(5), margin: RFValue(5), backgroundColor: "green" }}> */}
                <Row style={{ flex: 1 }}>
                  <Text
                    style={{
                      ...fontStyles.Maison_400_14PX_17LH,
                      color: colors.DARK_GREY_4B5F83,
                      marginEnd: RFValue(10),
                      textAlignVertical: 'center',
                    }}
                  >
                    {data.index}. {data.label}
                    <Text
                      style={{
                        ...fontStyles.Maison_300_13PX_15LH,
                        lineHeight: RFValue(17),
                        color: colors.DARK_GREY_4B5F83,
                      }}
                    >
                      {data.value}
                    </Text>
                  </Text>
                </Row>
              </Card.UniversalCard>
            ))}
          </>
        </Card.UniversalCard>
        {/* </ScrollView> */}
      </View>
      <View>
        <Text
          style={{
            ...fontStyles.Maison_400_14PX_17LH,
            color: '#616161',
            textAlign: 'center',
            marginBottom: RFValue(5),
          }}
        >
          {appTranslations?.K_QUIZ_READY_TO_START}
        </Text>
        <Button
          onPress={() => navigation.navigate('knowledgeQuizScreen')}
          title={appTranslations?.K_QUIZ_CLICK_BELOW_TO_BEGIN}
          textStyle={{
            ...fontStyles.Maison_500_15PX_21LH,
            color: colors.DARK_GREY_4B5F83,
          }}
          rightIcon={<GradientGrayRightArrowSvg />}
          bgColor='white'
          containerStyle={{
            padding: RFValue(10),
            marginHorizontal: RFValue(10),
            marginBottom: RFValue(10),
            borderWidth: 1,
            borderColor: '#B0B0B0',
          }}
        />
        <PluginInfoModal
          isOpen={isModalVisible.isOpen}
          yPosition={isModalVisible?.y}
          header={appTranslations?.APP_INFO_ABOUT_PLUGIN}
          text={
            appTranslations?.K_QUIZ_NTEP_KNOWLEDGE_ASSESSMENTS +
            '\n\n' +
            appTranslations?.K_QUIZ_TRENDING_SUGGESTED_ASSESSMENTS +
            '\n\n' +
            appTranslations?.K_QUIZ_EXCLUSIVE_CREATED_BY_OFFICIALS +
            '\n\n' +
            appTranslations?.K_QUIZ_STAY_UPDATED_APPLY_KNOWLEDGE
          }
          closeModal={() => {
            setIsModalVisible({ isOpen: false, x: 0, y: 0 });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
    // alignItems: 'center',
    padding: RFValue(20),
    borderRadius: RFValue(10),
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
  queriesContainer: {
    flex: 1,
    marginTop: RFValue(20),
  },
  queriesTitle: {
    // fontSize: 18,
    // fontWeight: 'bold',
    // alignSelf: 'center',
    // marginStart: RFValue(12),
  },
  querySubjectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  addQueryButtonText: {
    justifyContent: 'center',
    flex: 1,
    fontSize: RFValue(20),
    fontWeight: '500',
  },
  respondButton: {
    backgroundColor: 'transparent',
    padding: RFValue(12),
    borderRadius: RFValue(10),
    borderWidth: RFValue(1),
    alignItems: 'center',
  },
});

export default KnowledgeAssessmentScreen;
