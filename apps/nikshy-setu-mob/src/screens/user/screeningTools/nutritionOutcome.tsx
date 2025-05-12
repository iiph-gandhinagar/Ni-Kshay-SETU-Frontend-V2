import { fontStyles, uiStyles } from '@nikshay-setu-v3-monorepo/constants';
import {
  RootReducerStates,
  ScreenProps,
  ThemeProps,
} from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import Button from '../../../components/buttons/primaryButtons';
import { BmiResult } from '../../../components/cards/ BmiResultCard';
import { Card } from '../../../components/cards/MainCard';
import { Breadcrumb } from '../../../components/commonComponents/breadcrumb';
import { Row } from '../../../components/commonComponents/row_column';

export const NutritionOutcome: React.FC<ScreenProps<'nutritionOutcome'>> = ({
  navigation,
  route,
}) => {
  const appTranslations = useSelector(
    (state: RootReducerStates) => state.appContext?.data?.appTranslations
  );
  const { colors } = useTheme() as ThemeProps;

  const breadcrumb = [
    {
      name: appTranslations?.APP_RESULT,
      navigateTo: 'screeningResult',
    },
    {
      name: appTranslations?.APP_SCREENING_NEXT_FOR_PRES_CASE,
      navigateTo: 'nextStepForPresCase',
    },
  ];

  return (
    <View style={uiStyles?.flex1BgWhite}>
      <Breadcrumb breadcrumb={breadcrumb} />
      <ScrollView>
        <View style={uiStyles?.flex1Margin10}>
          <BmiResult
            user_bmi={route?.params?.userBmi}
            type={route?.params?.BMI || 'Obese'}
          />
        </View>
        <Card.UniversalCard styleName='bgGrayRadius20padding20flex1'>
          <React.Fragment>
            <Row
              style={{
                flex: 1,
                padding: RFValue(15),
                borderRadius: RFValue(20),
                backgroundColor: colors.WHITE_FFFF,
                margin: RFValue(10),
                gap: 10,
              }}
            >
              <Card.AnimatedGradientCard
                colors={[colors.LIGHT_GREY_F3F5F6, colors.WHITE_FFFF]}
                style={{
                  flex: 1,
                  borderRadius: RFValue(10),
                  borderWidth: 1,
                  alignContent: 'center',
                  alignItems: 'center',
                  paddingVertical: RFValue(15),
                  paddingHorizontal: RFValue(5),
                  borderColor: colors.LIGHT_GREY_F3F5F6,
                }}
              >
                <Text style={uiStyles.textCenter50016PX16LH}>
                  {appTranslations?.APP_SCREENING_DESIRABLE_WEIGHT}
                </Text>
                <Text style={uiStyles.screeingToolNutritionsOutText}>
                  {route.params.desirableWeight.toFixed(2)} kg
                </Text>
              </Card.AnimatedGradientCard>
              <Card.AnimatedGradientCard
                colors={[colors.LIGHT_GREY_F3F5F6, colors.WHITE_FFFF]}
                style={{
                  flex: 1,
                  borderRadius: RFValue(10),
                  borderWidth: 1,
                  alignContent: 'center',
                  alignItems: 'center',
                  paddingVertical: RFValue(15),
                  paddingHorizontal: RFValue(5),
                  borderColor: colors.LIGHT_GREY_F3F5F6,
                }}
              >
                <Text style={uiStyles.textCenter50016PX16LH}>
                  {appTranslations?.APP_SCREENING_MINIMUM_ACCEPT_WEIGHT}
                </Text>
                <Text style={uiStyles.screeingToolNutritionsOutText}>
                  {route.params.minimumAcceptableWeight.toFixed(2)} kg
                </Text>
              </Card.AnimatedGradientCard>
            </Row>
            <Row
              style={{
                flex: 1,
                padding: RFValue(15),
                borderRadius: RFValue(20),
                backgroundColor: colors.WHITE_FFFF,
                margin: RFValue(10),
                gap: RFValue(10),
              }}
            >
              <Card.AnimatedGradientCard
                colors={[colors.LIGHT_GREY_F3F5F6, colors.WHITE_FFFF]}
                style={{
                  flex: 1,
                  borderRadius: RFValue(10),
                  borderWidth: 1,
                  alignContent: 'center',
                  alignItems: 'center',
                  paddingVertical: RFValue(15),
                  paddingHorizontal: RFValue(5),
                  borderColor: colors.LIGHT_GREY_F3F5F6,
                }}
              >
                <Text style={uiStyles.textCenter50016PX16LH}>
                  {appTranslations?.APP_SCREENING_DESIRABLE_WEIGHT_GAIN}
                </Text>
                <Text style={uiStyles.screeingToolNutritionsOutText}>
                  {route.params.desirableWeightGain.toFixed(2)} kg
                </Text>
              </Card.AnimatedGradientCard>
              <Card.AnimatedGradientCard
                colors={[colors.LIGHT_GREY_F3F5F6, colors.WHITE_FFFF]}
                style={{
                  flex: 1,
                  borderRadius: RFValue(10),
                  borderWidth: 1,
                  alignContent: 'center',
                  alignItems: 'center',
                  paddingVertical: RFValue(15),
                  paddingHorizontal: RFValue(5),
                  borderColor: colors.LIGHT_GREY_F3F5F6,
                }}
              >
                <Text style={uiStyles.textCenter50016PX16LH}>
                  {appTranslations?.APP_SCREENING_MINIMUM_WEIGHT_GAIN_REQ}
                </Text>
                <Text style={uiStyles.screeingToolNutritionsOutText}>
                  {route.params.minimumWeightGainRequired.toFixed(2)} kg
                </Text>
              </Card.AnimatedGradientCard>
            </Row>
            <Row
              style={{
                flex: 1,
                padding: RFValue(15),
                borderRadius: RFValue(20),
                backgroundColor: colors.WHITE_FFFF,
                margin: RFValue(10),
                gap: RFValue(10),
              }}
            >
              <Card.AnimatedGradientCard
                colors={[colors.LIGHT_GREY_F3F5F6, colors.WHITE_FFFF]}
                style={{
                  flex: 1,
                  borderRadius: RFValue(10),
                  borderWidth: 1,
                  alignContent: 'center',
                  alignItems: 'center',
                  paddingVertical: RFValue(15),
                  paddingHorizontal: RFValue(5),
                  borderColor: colors.LIGHT_GREY_F3F5F6,
                }}
              >
                <Text style={uiStyles.textCenter50016PX16LH}>
                  {
                    appTranslations?.APP_SCREENING_DESIRABLE_DAILY_CALORIC_INTAKE
                  }
                </Text>
                <Text style={uiStyles.screeingToolNutritionsOutText}>
                  {route.params.desirableDailyCaloricIntake.toFixed(2)} Kcal
                </Text>
              </Card.AnimatedGradientCard>
              <Card.AnimatedGradientCard
                colors={[colors.LIGHT_GREY_F3F5F6, colors.WHITE_FFFF]}
                style={{
                  flex: 1,
                  borderRadius: RFValue(10),
                  borderWidth: 1,
                  alignContent: 'center',
                  alignItems: 'center',
                  paddingVertical: RFValue(15),
                  paddingHorizontal: RFValue(5),
                  borderColor: colors.LIGHT_GREY_F3F5F6,
                }}
              >
                <Text style={uiStyles.textCenter50016PX16LH}>
                  {appTranslations?.APP_SCREENING_DESIRABLE_DAILY_CALORIC_RANGE}
                </Text>
                <Text style={uiStyles.screeingToolNutritionsOutText}>
                  {route.params.desirableDailyProteinIntake.toFixed(2)} g
                </Text>
              </Card.AnimatedGradientCard>
            </Row>
          </React.Fragment>
        </Card.UniversalCard>
      </ScrollView>
      <Button
        onPress={() => {
          navigation.navigate('nextStepForPresCase', route.params);
        }}
        title={appTranslations?.APP_NEXT}
        textStyle={fontStyles.Maison_500_15PX_21LH}
        bgColor={colors.DARK_BLUE_394F89}
        containerStyle={{ padding: RFValue(10), margin: RFValue(10) }}
      />
      <Button
        onPress={() => {
          navigation.navigate('algorithmView', {
            nameOfAlgorithm: 'Treatment Algorithm',
            dependentNodeUrl: 'ALGORITHM_TREATMENT_DEPENDENT_NODE',
            parentNodeId: route.params?.tbId.toString(),
            showActiveNode: true,
            nodeType: route.params.BMI,
            showNodeById: route?.params?.treatmentId?.toString(),
            breadcrumb: [
              ...breadcrumb,
              {
                name: appTranslations?.APP_TREATMENT_CASCADE,
                navigateTo: 'goBack',
              },
            ],
          });
        }}
        title={appTranslations?.APP_NUTRITION_MANAGEMENT}
        textStyle={{
          ...fontStyles.Maison_500_15PX_21LH,
          color: colors.BLACK_000000,
        }}
        bgColor='white'
        containerStyle={{
          padding: RFValue(10),
          marginHorizontal: RFValue(10),
          marginBottom: RFValue(10),
          borderWidth: 1,
          borderColor: '#B0B0B0',
        }}
      />
    </View>
  );
};
