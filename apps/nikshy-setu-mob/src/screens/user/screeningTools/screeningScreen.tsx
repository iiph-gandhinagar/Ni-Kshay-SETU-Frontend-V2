import {
  DropdownArrowSvg,
  ScreeningToolSvg,
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
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import Button from '../../../components/buttons/primaryButtons';
import { UniversalCard } from '../../../components/cards/universalCard';
import { Breadcrumb } from '../../../components/commonComponents/breadcrumb';
import { Column } from '../../../components/commonComponents/row_column';

const ScreeningScreen: React.FC<ScreenProps<'screeningScreen'>> = ({
  navigation,
  route,
}) => {
  const { colors } = useTheme() as ThemeProps;
  const appTranslations = useSelector(
    (state: RootReducerStates) => state.appContext?.data?.appTranslations
  );

  const breadcrumb = [
    {
      name: appTranslations?.APP_ALL_MODULE,
      navigateTo: 'moreTools',
    },
    {
      name: appTranslations?.APP_SCREENING,
      navigateTo: 'screeningScreen',
    },
  ];

  return (
    <View style={{ backgroundColor: 'white', flex: 1, padding: RFValue(10) }}>
      <Breadcrumb breadcrumb={breadcrumb} />
      <UniversalCard styleName='bgGrayRadius20padding20flex1'>
        <UniversalCard styleName='bgFFFMargin10PaddingV12paddingH24' style={{}}>
          <React.Fragment>
            <Column
              style={{
                gap: RFValue(20),
                flex: 1,
                alignContent: 'center',
                alignItems: 'center',
                paddingVertical: RFValue(10),
              }}
            >
              <ScreeningToolSvg
                height={RFValue(70)}
                width={RFValue(70)}
                style={{ marginVertical: RFValue(20) }}
              />
              <Text
                style={[
                  fontStyles.Maison_400_16PX_25LH,
                  { textAlign: 'center' },
                ]}
              >
                {appTranslations?.APP_SCREENING_FIRST_DEC}
              </Text>
              <Text
                style={[
                  fontStyles.Maison_400_16PX_25LH,
                  { textAlign: 'center' },
                ]}
              >
                {appTranslations?.APP_SCREENING_SEC_DEC}
              </Text>
            </Column>
            <Button
              onPress={() => {
                navigation.navigate('screeningTool');
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
              containerStyle={{
                padding: RFValue(10),
                alignContent: 'center',
                alignItems: 'center',
              }}
            />
          </React.Fragment>
        </UniversalCard>
      </UniversalCard>
    </View>
  );
};
export default ScreeningScreen;
