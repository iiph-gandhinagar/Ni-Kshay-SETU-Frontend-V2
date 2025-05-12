import { ArrowSvg, Download2Svg } from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles } from '@nikshay-setu-v3-monorepo/constants';
import { ScreenProps } from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { useToast } from 'apps/nikshy-setu-mob/src/components/commonComponents/toastProvider';
import React from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Pdf from 'react-native-pdf';
import { enableScreens } from 'react-native-screens';
enableScreens();

export const PDFView: React.FC<ScreenProps<'pdfView'>> = ({
  navigation,
  route,
}) => {
  const { header, url, theme } = route?.params;
  const { showToast } = useToast();
  const source = {
    uri: url,
    cache: true,
  };

  const downloadPdf = async () => {
    showToast('Downloading......');
    const { config, fs } = ReactNativeBlobUtil;
    const dirToSave =
      Platform.OS === 'ios'
        ? fs.dirs.DocumentDir
        : '/storage/emulated/0/Download';

    const options = {
      fileCache: true,
      addAndroidDownloads: {
        //Related to the Android only
        useDownloadManager: true,
        notification: true,
        title: header,
        path: `${dirToSave}/${header}.pdf`,
      },
    };
    config(options)
      .fetch('GET', source?.uri)
      .then((res) => {
        //Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
      });
  };

  return (
    <View style={styles.container}>
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
          {header || 'Unknown Title'}
        </Text>
      </View>
      <Pdf
        trustAllCerts={false}
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {}}
        onPageChanged={(page, numberOfPages) => {}}
        renderActivityIndicator={(progress) => (
          <ActivityIndicator size='large' color={'#f4f4'} />
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'flex-start',
  },
  pdf: {
    flex: 0.5,
    backgroundColor: 'red',
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
  },
  downloadButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    padding: 8,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
