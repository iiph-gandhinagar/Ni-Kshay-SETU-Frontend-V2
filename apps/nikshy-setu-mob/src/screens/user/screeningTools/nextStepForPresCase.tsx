import { fontStyles, generateHTML } from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  RootReducerStates,
  ScreenProps,
  ThemeProps,
} from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { StackActions, useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import WebView from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../components/buttons/primaryButtons';
import { Breadcrumb } from '../../../components/commonComponents/breadcrumb';

export const NextStepForPresCase: React.FC<
  ScreenProps<'nextStepForPresCase'>
> = ({ navigation, route }) => {
  const appTranslations = useSelector(
    (state: RootReducerStates) => state.appContext?.data?.appTranslations
  );

  const { colors } = useTheme() as ThemeProps;
  const breadcrumb = [
    {
      name: appTranslations?.APP_ALL_MODULE,
      navigateTo: 'moreTools',
    },
    { name: '...', navigateTo: 'screeningResult' },
    {
      name: appTranslations?.APP_SCREENING_NEXT_FOR_PRES_CASE,
      navigateTo: 'nextStepForPresCase',
    },
  ];
  const { width, height } = Dimensions.get('window');
  const [content, setContent] = useState('');
  const [webViewHeight, setWebViewHeight] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      createAction(
        {
          method: 'GET',
          url: 'APP_CONFIG_DETAILS',
        },
        (code, res) => {
          if (code === 200) {
            const filterObj = res?.masterCms?.filter(
              (v) => v.title === route.params.nutritionTitle
            );
            const newContent =
              (filterObj?.[0]?.description[route?.params?.appLang] &&
                filterObj?.[0]?.description[route?.params?.appLang]) ||
              filterObj?.[0]?.description?.en;
            setContent(newContent);
          }
        }
      )
    );
  }, []);
  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        paddingHorizontal: RFValue(5),
      }}
    >
      <Breadcrumb breadcrumb={breadcrumb} />
      <View style={{ flex: 1 }}>
        <WebView
          originWhitelist={['*']}
          source={{ html: generateHTML(content) }}
          style={{ height: webViewHeight - 100, width: width - 5, flex: 1 }}
          onMessage={(event) => {
            console.log(event, '----------------------->event---->');
            const height = parseInt(event.nativeEvent.data, 10);
            setWebViewHeight(height);
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          showsVerticalScrollIndicator={false}
          mediaPlaybackRequiresUserAction={false}
          allowsInlineMediaPlayback={true}
          scalesPageToFit={true}
        />
        <Button
          onPress={() => {
            navigation.dispatch(StackActions.popToTop());
            navigation.navigate('homeScreen');
          }}
          title={appTranslations?.NIKSHAY_SETU_NAME}
          textStyle={fontStyles.Maison_500_15PX_21LH}
          bgColor={colors.DARK_BLUE_394F89}
          containerStyle={{ padding: RFValue(10), margin: RFValue(10) }}
        />
        <Button
          onPress={() => {
            navigation.navigate('algorithmView', {
              nameOfAlgorithm: 'Diagnosis Algorithm',
              dependentNodeUrl: 'ALGORITHM_DIAGNOSIS_DEPENDENT_NODE',
              parentNodeId: route.params?.tbId.toString(),
              breadcrumb: [
                ...breadcrumb,
                {
                  name: appTranslations?.APP_DIAGNOSTIC_CARE_CASCADE,
                  navigateTo: 'goBack',
                },
              ],
            });
          }}
          title={appTranslations?.APP_CHECK_DIAGNOSTIC_ALGO}
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
    </View>
  );
};
