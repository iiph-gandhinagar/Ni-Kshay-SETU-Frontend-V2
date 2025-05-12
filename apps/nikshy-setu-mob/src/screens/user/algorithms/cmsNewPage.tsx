import { generateHTML, uiStyles } from '@nikshay-setu-v3-monorepo/constants';
import { ScreenProps } from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { Breadcrumb } from 'apps/nikshy-setu-mob/src/components/commonComponents/breadcrumb';
import HeaderComponent from 'apps/nikshy-setu-mob/src/components/commonComponents/header';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
const styles = StyleSheet.create({
  webViewContainer: {
    marginTop: RFValue(10),
    padding: RFValue(10),
    flex: 1,
    backgroundColor: '#f4f6f8',
  },
  webView: { height: '100%', width: 'auto' },
});

export const CmsNewPage: React.FC<ScreenProps<'CmsNewPage'>> = ({
  navigation,
  route,
}) => {
  return (
    <View style={uiStyles?.flex1BgWhite}>
      <HeaderComponent
        navigation={navigation}
        isExternal={true}
        backTitle={route?.params?.header}
        route={route}
      />
      <View style={uiStyles?.marginTop10}>
        <Breadcrumb breadcrumb={route?.params?.breadcrumb} />
      </View>
      <View style={styles?.webViewContainer}>
        <WebView
          originWhitelist={['*']}
          source={{ html: generateHTML(route?.params?.description) }}
          style={styles?.webView}
          javaScriptEnabled={true}
          startInLoadingState={true}
          domStorageEnabled={true}
          showsVerticalScrollIndicator={false}
          mediaPlaybackRequiresUserAction={false}
          allowsInlineMediaPlayback={true}
          scalesPageToFit={true}
        />
      </View>
    </View>
  );
};
