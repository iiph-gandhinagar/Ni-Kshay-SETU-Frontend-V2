import { ArrowSvg, CloseSvg } from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles } from '@nikshay-setu-v3-monorepo/constants';
import { ScreenProps, ThemeProps } from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { useTheme } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import WebView from 'react-native-webview';

export const ContentView: React.FC<ScreenProps<'contentView'>> = ({
  navigation,
  route,
}) => {
  const { colors } = useTheme() as ThemeProps;
  const contentType = route?.params?.contentType;
  useEffect(() => {
    navigation?.setOptions({
      orientation: ['pdfView', 'WebPage'].includes(contentType)
        ? 'default'
        : 'landscape',
    });
    if (!(contentType === 'WebPage')) {
      StatusBar.setHidden(true);
    }
  }, [navigation, contentType]);

  const url = {
    WebPage: route?.params?.url,
    h5p: `https://ntep.in/h5p/${route?.params?.id}/embed`,
    pdfView: '',
    pdfs: '',
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    webView: {
      width: '80%',
      height: '100%',
      alignSelf: 'center',
    },
    closeTouch: {
      margin: RFValue(15),
      zIndex: 1,
      padding: RFValue(8),
      borderRadius: RFValue(50),
      position: 'absolute',
      backgroundColor: colors.LIGHT_BLUE_5D88E4,
    },
    header: {
      backgroundColor: 'white',
      height: RFValue(60),
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      marginHorizontal: RFValue(15),
      borderColor: colors.LIGHT_GREY_F4F4F4,
      flexDirection: 'row',
    },
    backBtn: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    arrowSvg: {
      transform: [{ rotate: '180deg' }],
    },
    backTxt: {
      ...fontStyles.Maison_500_20PX_25LH,
      marginStart: RFValue(5),
      color: colors.DARK_BLUE_394F89,
    },
  });

  return (
    <View style={styles.container}>
      {!(contentType === 'WebPage') ? (
        <TouchableHighlight
          onPress={() => navigation?.goBack()}
          style={[
            styles.closeTouch,
            { display: contentType === 'WebPage' ? 'none' : 'flex' },
          ]}
          underlayColor={colors?.LIGHT_BLUE_D4EDF7}
        >
          <CloseSvg height={RFValue(15)} width={RFValue(15)} />
        </TouchableHighlight>
      ) : (
        <View style={styles?.header}>
          <TouchableOpacity
            style={styles?.backBtn}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <ArrowSvg
              width={RFValue(25)}
              height={RFValue(25)}
              style={styles?.arrowSvg}
            />
            <Text
              numberOfLines={1}
              ellipsizeMode='tail'
              style={styles?.backTxt}
            >
              Back
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <WebView
        useWebView2
        originWhitelist={['https://*']}
        source={{ uri: url?.[contentType] }}
        style={
          ['pdfView', 'WebPage'].includes(contentType) ? {} : styles.webView
        }
        javaScriptEnabled={true}
        startInLoadingState={true}
        domStorageEnabled={true}
        showsVerticalScrollIndicator={false}
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback={true}
        scalesPageToFit={true}
      />
    </View>
  );
};
