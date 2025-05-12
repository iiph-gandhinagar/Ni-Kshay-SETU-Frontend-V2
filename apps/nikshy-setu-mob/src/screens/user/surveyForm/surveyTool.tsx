import {
  DropdownArrowSvg,
  SurveyFormSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles, uiStyles } from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  RootReducerStates,
  ScreenProps,
  Survey,
  SurveyList,
  ThemeProps,
} from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { useFocusEffect, useTheme } from '@react-navigation/native';
import NoDataCard from 'apps/nikshy-setu-mob/src/components/cards/noDataCard';
import React, { useCallback, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../components/buttons/primaryButtons';
import { UniversalCard } from '../../../components/cards/universalCard';
import { Column, Row } from '../../../components/commonComponents/row_column';

const SurveyFromListScreen: React.FC<ScreenProps<'surveyTool'>> = React.memo(
  ({ navigation, route }) => {
    const { colors } = useTheme() as ThemeProps;
    const [surveyForms, setSurveyForms] = useState<Survey[]>([]);
    const loadingApis = useSelector(
      (state: RootReducerStates) => state.appContext?.loadingApis
    );
    const appTranslations = useSelector(
      (state: RootReducerStates) => state.appContext?.data?.appTranslations
    );
    const dispatch = useDispatch();

    useFocusEffect(
      useCallback(() => {
        dispatch(
          createAction<null, SurveyList>(
            {
              method: 'GET',
              url: 'SURVEY_DETAILS',
            },
            (code, res) => {
              if (code === 200) {
                const completed = res?.doneSurveyList?.map((v) => {
                  return { ...v, completed: true };
                });
                setSurveyForms([...res?.surveyList, ...completed]);
              }
            }
          )
        );
      }, [])
    );

    return (
      <View style={uiStyles?.flex1BgWhite}>
        <UniversalCard
          style={{ marginTop: RFValue(30) }}
          styleName='bgGrayRadius20padding20flex1'
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {surveyForms.length === 0 && (
              <NoDataCard
                status={
                  loadingApis.includes('SURVEY_DETAILS') ? 'loading' : 'noData'
                }
              />
            )}
            {surveyForms?.map((survey, i) => {
              return (
                <UniversalCard
                  styleName='bgFFFMargin10PaddingV8paddingH24'
                  key={i + 'survey'}
                >
                  <Column>
                    <Row style={{ gap: RFValue(10), alignItems: 'center' }}>
                      <SurveyFormSvg />
                      <Text
                        style={{
                          color: colors.DARK_BLUE_394F89,
                          ...fontStyles.Maison_600_18PX_20LH,
                          flex: 1,
                        }}
                      >
                        {(survey?.title?.en && survey?.title?.en) ||
                          (survey?.surveyId?.title?.en &&
                            survey?.surveyId?.title?.en) ||
                          (survey?.title[route?.params?.appLang] &&
                            survey?.title[route?.params?.appLang]) ||
                          (survey?.surveyId[route?.params?.appLang] &&
                            survey?.surveyId[route?.params?.appLang])}
                      </Text>
                    </Row>
                    {!survey?.completed ? (
                      <Button
                        onPress={() => {
                          navigation.navigate('surveyFormStepper', {
                            question: survey?.questions,
                            surveyId: survey?._id,
                          });
                        }}
                        title={appTranslations?.APP_START_NOW}
                        textStyle={fontStyles.Maison_500_13PX_15LH}
                        rightIcon={
                          <DropdownArrowSvg
                            width={RFValue(25)}
                            height={RFValue(25)}
                            stroke={'white'}
                            style={{
                              transform: [{ rotate: '270deg' }],
                            }}
                          />
                        }
                        bgColor={colors.DARK_BLUE_394F89}
                        containerStyle={uiStyles?.marginTop10}
                      />
                    ) : (
                      <Text
                        style={{
                          color: colors.GREEN_30D03F,
                          marginTop: RFValue(15),
                          ...fontStyles.Maison_500_14PX_18LH,
                        }}
                      >
                        {appTranslations?.APP_COMPLETED} ✓
                      </Text>
                    )}
                  </Column>
                </UniversalCard>
              );
            })}
          </ScrollView>
        </UniversalCard>
      </View>
    );
  }
);
SurveyFromListScreen.displayName = 'SurveyFromListScreen';
export default SurveyFromListScreen;
