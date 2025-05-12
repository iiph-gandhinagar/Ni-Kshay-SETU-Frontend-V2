import { ArrowSvg } from '@nikshay-setu-v3-monorepo/assets';
import {
  fontStyles,
  languagesList,
  uiStyles,
} from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  AppConfigDetails,
  RootReducerStates,
  ScreenProps,
  ThemeProps,
} from '@nikshay-setu-v3-monorepo/types';
import {
  CustomRFValue as RFValue,
  storeDataToAsyncStorage,
} from '@nikshay-setu-v3-monorepo/utils';
import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Row } from '../../../components/commonComponents/row_column';
import ScreenContainer from '../../../components/defaultPage';

export const LanguageScreen: React.FC<ScreenProps<'language'>> = ({
  navigation,
  route,
}) => {
  const [selectedLang, setSelectedLang] = useState(route?.params?.appLang);
  const { colors } = useTheme() as ThemeProps;
  const dispatch = useDispatch();
  const appTranslations = useSelector(
    (state: RootReducerStates) => state.appContext?.data?.appTranslations
  );
  const loadingApis = useSelector(
    (state: RootReducerStates) => state.appContext?.loadingApis
  );
  return (
    <ScreenContainer defaultProfile languageICHide>
      <Pressable onPress={() => navigation.goBack()} style={{}}>
        <Row
          style={{
            alignItems: 'center',
            alignContent: 'center',
          }}
        >
          <ArrowSvg
            height={RFValue(24)}
            width={RFValue(24)}
            style={{ transform: [{ rotate: '180deg' }] }}
          />
          <Text
            style={{
              ...fontStyles.Maison_500_16PX_21LH,
              marginTop: 1,
              color: colors.DARK_GREY_4D4D4D,
            }}
          >
            {appTranslations?.LANG_SELECT_APP_LANG}
          </Text>
        </Row>
      </Pressable>
      <ScrollView showsVerticalScrollIndicator={false}>
        {languagesList?.map((item, index) => {
          return (
            <Pressable
              key={index + 'lang'}
              style={{ flex: 1, margin: RFValue(5) }}
              onPress={() => {
                storeDataToAsyncStorage('lang', item?.code)?.then(() => {
                  setSelectedLang(item?.code);
                  dispatch(
                    createAction<null, AppConfigDetails>({
                      method: 'GET',
                      url: 'APP_CONFIG_DETAILS',
                    })
                  );
                });
              }}
            >
              <Row
                style={[
                  {
                    flex: 1,
                    justifyContent: 'space-between',
                    borderRadius: RFValue(10),
                    elevation: RFValue(8),
                    backgroundColor: 'white',
                    paddingVertical: RFValue(15),
                    borderColor: colors.GREEN_0CA74B,
                    paddingHorizontal: RFValue(8),
                    marginTop: RFValue(10),
                    // opacity: index === 0 ? 1 : 0.6,
                    borderWidth: item?.code === selectedLang ? RFValue(1) : 0,
                    width: 'auto',
                    shadowColor:
                      item?.code === selectedLang
                        ? colors.DARK_BLUE_394F89
                        : 'gray',
                  },
                  uiStyles.iosShadow,
                ]}
              >
                {item?.code === selectedLang &&
                loadingApis.includes('APP_CONFIG_DETAILS') ? (
                  <ActivityIndicator size={'large'} />
                ) : (
                  <Text
                    style={{
                      color: item.color,
                      ...fontStyles.Maison_700_28PX_33LH,
                      marginHorizontal: RFValue(15),
                    }}
                  >
                    {item?.icon}
                  </Text>
                )}
                <Row
                  style={{
                    width: '80%',
                    justifyContent: 'space-between',
                    alignContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      ...fontStyles.Maison_500_15PX_21LH,
                      alignSelf: 'center',
                    }}
                  >
                    {item?.engName}
                  </Text>
                  <Text
                    style={{ alignSelf: 'center', color: colors.GREY_808080 }}
                  >
                    {item?.language}
                  </Text>
                </Row>
              </Row>
            </Pressable>
          );
        })}
      </ScrollView>
    </ScreenContainer>
  );
};
