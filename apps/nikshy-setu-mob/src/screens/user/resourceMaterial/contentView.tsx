import { ArrowSvg, Download2Svg } from '@nikshay-setu-v3-monorepo/assets';
import {
  contentHTML,
  fontStyles,
  STORE_URL,
} from '@nikshay-setu-v3-monorepo/constants';
import { ScreenProps } from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import React, { useCallback, useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Pdf from 'react-native-pdf';
import { enableScreens } from 'react-native-screens';
import WebView from 'react-native-webview';
enableScreens();

const notSupportedVideoFormat = ['mkv', 'm4v', 'avi', 'flv', 'wmv', 'mov'];
const showPdfView = ['pdf_office_orders', 'pdfs'];
const Header = ({ theme, navigation, header }) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: RFValue(55),
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        marginStart: RFValue(15),
        borderColor: theme.colors.LIGHT_GREY_F4F4F4,
        flexDirection: 'row',
      }}
    >
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <ArrowSvg
          width={RFValue(25)}
          height={RFValue(25)}
          style={{ transform: [{ rotate: '180deg' }] }}
        />
        <Text
          numberOfLines={1}
          ellipsizeMode='tail'
          style={{
            ...fontStyles.Maison_500_20PX_25LH,
            marginStart: RFValue(5),
            color: theme.colors.DARK_BLUE_394F89,
          }}
        >
          Back
        </Text>
      </TouchableOpacity>
      <Text
        numberOfLines={1}
        ellipsizeMode='tail'
        style={{
          ...fontStyles.Maison_500_20PX_25LH,
          marginHorizontal: RFValue(15),
          color: '#0A94A7',
          flex: 1,
        }}
      >
        {header || '---'}
      </Text>
    </View>
  );
};
export const ContentScreen: React.FC<ScreenProps<'contentScreen'>> = ({
  navigation,
  route,
}) => {
  const { contentType, theme, url, notSupportedFile, header, fileType } =
    route.params;

  const [ContentUrl, type]: [string, 'videos' | 'pdfs' | 'ppt' | 'document'] = [
    STORE_URL + url,
    contentType,
  ];
  const videoNotSupported =
    type === 'videos' && notSupportedVideoFormat.includes(fileType);
  const source = {
    uri: ContentUrl,
    cache: true,
  };

  const downloadPdf = async () => {
    const { config, fs } = ReactNativeBlobUtil;
    const dirToSave =
      Platform.OS === 'ios'
        ? fs.dirs.DocumentDir
        : '/storage/emulated/0/Download';
    const filePath = `${dirToSave}/${header}.pdf`;
    try {
      const response = await config({
        fileCache: true,
        appendExt: 'pdf',
        path: filePath, // Specify the path to save the PDF
      }).fetch('GET', source?.uri);
      Alert.alert('Download Successful', `File saved to: ${response.path()}`, [
        { text: 'OK' },
      ]);
    } catch (error) {
      console.error('Download failed:', error);
      Alert.alert(
        'Download Failed',
        'An error occurred while downloading the file. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      console.log('Download process completed.');
    }
  };

  useEffect(() => {
    navigation.setOptions({
      orientation:
        ['pdf_office_orders', 'pdfs', 'ppt'].includes(type) ||
        videoNotSupported ||
        type === 'document'
          ? 'portrait'
          : 'landscape',
      fullScreenGestureEnabled: true,
      fullScreenGestureShadowEnabled: true,
      headerBlurEffect: 'prominent',
    });
    return () => {
      navigation.setOptions({
        orientation: 'portrait',
      });
    };
  }, []);
  const backAction = useCallback(() => {
    navigation.goBack();
    return true;
  }, [navigation]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () =>
      backAction()
    );
    return () => backHandler.remove();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {showPdfView.includes(type) && (
        <Header header={header} navigation={navigation} theme={theme} />
      )}
      {!showPdfView.includes(type) && (
        <View style={{ flex: 1 }}>
          <WebView
            originWhitelist={['*']}
            source={{ html: contentHTML(ContentUrl, type) }}
            style={{ height: '100%', width: '100%' }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            showsVerticalScrollIndicator={false}
            mediaPlaybackRequiresUserAction={false}
            allowsInlineMediaPlayback={true}
            scalesPageToFit={true}
          />
        </View>
      )}
      {showPdfView.includes(type) && (
        <View style={{ flex: 1 }}>
          <Pdf
            trustAllCerts={false}
            source={source}
            onLoadComplete={(numberOfPages, filePath) => {}}
            onPageChanged={(page, numberOfPages) => {}}
            renderActivityIndicator={(progress) => (
              <ActivityIndicator
                size='large'
                color={theme.colors.DARK_BLUE_394F89}
              />
            )}
            onError={(error) => {
              console.log(error);
            }}
            onPressLink={(uri) => {}}
            style={styles.pdf}
          />
          <TouchableOpacity style={styles.downloadButton} onPress={downloadPdf}>
            <Download2Svg />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  downloadButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    padding: 8,
    backgroundColor: 'gray',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
