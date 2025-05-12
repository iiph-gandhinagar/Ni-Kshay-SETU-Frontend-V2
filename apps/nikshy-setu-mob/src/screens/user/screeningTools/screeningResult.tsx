import {
  CheckSvg,
  DropdownArrowSvg,
  NextStepPresumptiveCaseSvg,
  NutritionalOutcomeSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles } from '@nikshay-setu-v3-monorepo/constants';
import {
  RootReducerStates,
  ScreenProps,
  ThemeProps,
} from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { useSelector } from 'react-redux';
import Button from '../../../components/buttons/primaryButtons';
import { Card } from '../../../components/cards/MainCard';
import { Breadcrumb } from '../../../components/commonComponents/breadcrumb';
import { Row } from '../../../components/commonComponents/row_column';

export const ScreeningResult: React.FC<ScreenProps<'screeningResult'>> = ({
  navigation,
  route,
}) => {
  const { colors } = useTheme() as ThemeProps;
  const appTranslations = useSelector(
    (state: RootReducerStates) => state.appContext?.data?.appTranslations
  );

  const breadcrumb = [
    { name: appTranslations?.APP_ALL_MODULE, navigateTo: 'moreTools' },
    { name: '...', navigateTo: 'screeningScreen' },
    { name: appTranslations?.APP_SCREENING_TOOL, navigateTo: 'screeningTool' },
    { name: appTranslations?.APP_RESULT, navigateTo: 'screeningResult' },
  ];
  return (
    <View style={{ backgroundColor: 'white', flex: 1, padding: RFValue(10) }}>
      <Breadcrumb breadcrumb={breadcrumb} />
      <Card.UniversalCard styleName='bgGrayRadius20padding20flex1'>
        <React.Fragment>
          <Card.UniversalCard
            styleName='bgFFFMargin10PaddingV12paddingH24'
            style={{
              flex: 2,
              justifyContent: 'space-evenly',
            }}
          >
            <React.Fragment>
              <View
                style={{
                  backgroundColor: colors.GREEN_0CA74B,
                  alignSelf: 'center',
                  padding: RFValue(5),
                  borderRadius: RFValue(50),
                }}
              >
                <CheckSvg height={RFValue(40)} width={RFValue(40)} />
              </View>
              <Text
                style={[
                  fontStyles.Maison_600_18PX_20LH,
                  {
                    color: colors.DARK_GREY_4B5F83,
                    marginTop: RFValue(20),
                    textAlign: 'center',
                    lineHeight: RFValue(25),
                  },
                ]}
              >
                {appTranslations?.APP_SCREENING_THNKS_INPUTS}
              </Text>
              <Text
                style={[
                  fontStyles.Maison_400_16PX_25LH,
                  { color: colors.DARK_GREY_4D4D4D, textAlign: 'center' },
                ]}
              >
                {appTranslations?.APP_SCREENING_INFO_ACCURATE_PERSON_MIGHT_HAVE}
              </Text>
              <Button
                onPress={() => {
                  navigation.navigate('algorithmView', {
                    nameOfAlgorithm: 'Diagnosis Algorithm',
                    dependentNodeUrl: 'ALGORITHM_DIAGNOSIS_DEPENDENT_NODE',
                    parentNodeId: route.params?.tbId.toString(),
                    breadcrumb: [
                      ...breadcrumb,
                      {
                        name: appTranslations?.APP_DIAGNOSTIC_CASCADE,
                        navigateTo: 'goBack',
                      },
                    ],
                  });
                }}
                title={route.params?.nutritionTitle || '...'}
                textStyle={[
                  fontStyles.Maison_500_14PX_18LH,
                  { textAlign: 'center' },
                ]}
                rightIcon={
                  <DropdownArrowSvg
                    width={RFValue(20)}
                    height={RFValue(25)}
                    stroke={'white'}
                    style={{
                      transform: [{ rotate: '270deg' }],
                    }}
                  />
                }
                bgColor={colors.DARK_BLUE_394F89}
                containerStyle={{
                  paddingHorizontal: RFValue(20),
                  alignContent: 'center',
                  alignItems: 'center',
                }}
              />
            </React.Fragment>
          </Card.UniversalCard>
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
            <TouchableHighlight
              style={{ flex: 1 }}
              underlayColor={null}
              onPress={() => {
                navigation.navigate('nutritionOutcome', route.params);
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
                  justifyContent: 'space-around',
                  paddingVertical: RFValue(15),
                  paddingHorizontal: RFValue(5),
                  borderColor: colors.LIGHT_GREY_F3F5F6,
                }}
              >
                <NutritionalOutcomeSvg />
                <Text
                  style={[
                    fontStyles.Maison_500_14PX_18LH,
                    {
                      color: colors.DARK_GREY_4B5F83,
                      marginTop: RFValue(8),
                      textAlign: 'center',
                    },
                  ]}
                >
                  {appTranslations?.APP_SCREENING_NUTRITION_OUTCOME}
                </Text>
              </Card.AnimatedGradientCard>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={null}
              style={{ flex: 1 }}
              onPress={() => {
                console.log(route.params);

                navigation.navigate('nextStepForPresCase', route.params);
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
                  justifyContent: 'space-around',
                  paddingVertical: RFValue(15),
                  paddingHorizontal: RFValue(5),
                  borderColor: colors.LIGHT_GREY_F3F5F6,
                }}
              >
                <NextStepPresumptiveCaseSvg />
                <Text
                  style={[
                    fontStyles.Maison_500_14PX_18LH,
                    {
                      color: colors.DARK_GREY_4B5F83,
                      marginTop: RFValue(8),
                      textAlign: 'center',
                    },
                  ]}
                >
                  {appTranslations?.APP_SCREENING_NEXT_FOR_PRES_CASE}
                </Text>
              </Card.AnimatedGradientCard>
            </TouchableHighlight>
          </Row>
        </React.Fragment>
      </Card.UniversalCard>
    </View>
  );
};
