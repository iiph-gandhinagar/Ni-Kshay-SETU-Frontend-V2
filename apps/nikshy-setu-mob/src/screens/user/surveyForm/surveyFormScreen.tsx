import {
  DropdownArrowSvg,
  SurveyFormSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles, uiStyles } from '@nikshay-setu-v3-monorepo/constants';
import {
  RootReducerStates,
  ScreenProps,
  ThemeProps,
} from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import Button from '../../../components/buttons/primaryButtons';
import { UniversalCard } from '../../../components/cards/universalCard';
import { Column } from '../../../components/commonComponents/row_column';

const SurveyFormScreen: React.FC<ScreenProps<'surveyFormScreen'>> = ({
  navigation,
}) => {
  const { colors } = useTheme() as ThemeProps;
  const appTranslations = useSelector(
    (state: RootReducerStates) => state.appContext?.data?.appTranslations
  );
  return (
    <View style={uiStyles?.flex1BgWhite}>
      <UniversalCard
        style={{ marginTop: RFValue(30) }}
        styleName='bgGrayRadius20padding20flex1'
      >
        <UniversalCard styleName='bgFFFMargin10PaddingV12paddingH24'>
          <React.Fragment>
            <Column
              style={{
                gap: RFValue(40),
                flex: 1,
                alignItems: 'center',
                padding: RFValue(20),
              }}
            >
              <SurveyFormSvg height={RFValue(60)} width={RFValue(60)} />
              <Text
                style={[
                  fontStyles.Maison_400_17PX_27LH,
                  { textAlign: 'center' },
                ]}
              >
                {appTranslations?.SURVEY_FORM_DESCRIPTION}
              </Text>
              <Text
                style={[
                  fontStyles.Maison_400_17PX_27LH,
                  { textAlign: 'center' },
                ]}
              >
                {appTranslations?.SURVEY_FORM_INVITATION}
              </Text>
            </Column>
            <Button
              onPress={() => {
                navigation.navigate('surveyTool');
              }}
              title={appTranslations?.APP_START_NOW}
              textStyle={fontStyles.Maison_500_15PX_21LH}
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
            />
          </React.Fragment>
        </UniversalCard>
      </UniversalCard>
    </View>
  );
};
export default SurveyFormScreen;
