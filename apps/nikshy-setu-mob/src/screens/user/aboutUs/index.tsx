import { InfoIconSvg } from '@nikshay-setu-v3-monorepo/assets';
import { generateHTML, uiStyles } from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { AppConfigDetails, ScreenProps } from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import { useDispatch } from 'react-redux';

const styles = StyleSheet.create({
  WebView: {
    paddingHorizontal: RFValue(20),
    borderRadius: RFValue(20),
  },
  infoIconSvg: { alignSelf: 'center', marginVertical: RFValue(10) },
});

export const AboutUs: React.FC<ScreenProps<'aboutUs'>> = () => {
  const [Description, setDescription] = useState('<p>Loading</p>');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      createAction<null, AppConfigDetails>(
        {
          method: 'GET',
          url: 'APP_CONFIG_DETAILS',
        },
        (status, res) => {
          if (status === 200) {
            const aboutUsContent = res?.masterCms?.filter(
              (v) => v?.title === 'About CGC'
            );
            console.log(aboutUsContent?.[0]?.description?.en);
            setDescription(aboutUsContent?.[0]?.description?.en);
          }
        }
      )
    );
  }, []);

  return (
    <View style={uiStyles?.flex1BgWhite}>
      <InfoIconSvg
        height={RFValue(50)}
        width={RFValue(50)}
        style={styles?.infoIconSvg}
      />
      <View style={uiStyles?.flex1}>
        <WebView
          originWhitelist={['*']}
          source={{ html: generateHTML(Description) }}
          javaScriptEnabled={true}
          containerStyle={styles?.WebView}
          domStorageEnabled={true}
          startInLoadingState={true}
          showsVerticalScrollIndicator={false}
          mediaPlaybackRequiresUserAction={false}
          allowsInlineMediaPlayback={true}
          scalesPageToFit={true}
        />
      </View>
    </View>
  );
};
