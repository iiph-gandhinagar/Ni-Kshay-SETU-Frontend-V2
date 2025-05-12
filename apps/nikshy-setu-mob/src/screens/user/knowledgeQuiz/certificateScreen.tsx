import { Download2Svg } from '@nikshay-setu-v3-monorepo/assets';
import {
  BASE_URL,
  fontStyles,
  uiStyles,
  Urls,
} from '@nikshay-setu-v3-monorepo/constants';
import { ScreenProps } from '@nikshay-setu-v3-monorepo/types';
import {
  getDataFromAsyncStorage,
  CustomRFValue as RFValue,
} from '@nikshay-setu-v3-monorepo/utils';
import Button from 'apps/nikshy-setu-mob/src/components/buttons/primaryButtons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import LinearGradient from 'react-native-linear-gradient';
import Pdf from 'react-native-pdf';

const CertificateScreen: React.FC<ScreenProps<'certificateScreen'>> = ({
  route,
}) => {
  const { theme, id, title } = route.params;
  const colors = theme.colors;
  const url = BASE_URL + Urls.PDF + id;
  const [token, setToken] = useState(null);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    getDataFromAsyncStorage('token').then((v) => {
      setToken(v);
    });
  }, []);
  const downloadPdf = async () => {
    setLoader(true);
    const { config, fs } = ReactNativeBlobUtil;
    const dirToSave =
      Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.DownloadDir;
    const options = {
      fileCache: true,
      addAndroidDownloads: {
        //Related to the Android only
        useDownloadManager: true,
        notification: true,
        title: title,
        path: `${dirToSave}/${title}.pdf`,
      },
    };
    config(options)
      .fetch('GET', url, {
        Authorization: 'Bearer ' + token,
      })
      .then((res) => {
        //Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
      })
      .finally(() => {
        setLoader(false);
      });
  };
  const styles = StyleSheet.create({
    pdfView: {
      flex: 1,
      backgroundColor: colors.WHITE_FFFF,
      borderWidth: 0.5,
      margin: RFValue(10),
      borderRadius: RFValue(25),
      borderColor: colors.DARK_GREY_4B5F83,
    },
    flex07: { flex: 0.7 },
    gradientView: {
      margin: RFValue(10),
      borderRadius: RFValue(20),
      marginTop: RFValue(20),
    },
  });
  return (
    <View style={uiStyles?.flex1}>
      {token && (
        <View style={styles?.flex07}>
          <Pdf
            trustAllCerts={false}
            source={{
              uri: url,
              headers: {
                Authorization: 'Bearer ' + token,
              },
            }}
            renderActivityIndicator={() => (
              <ActivityIndicator size='large' color={colors.BLUE_00739B} />
            )}
            onError={(error) => {
              console.log('error', error);
            }}
            onPressLink={(uri) => {
              console.log(`Link pressed: ${uri}`);
            }}
            style={styles?.pdfView}
          />
        </View>
      )}
      <LinearGradient
        colors={[theme.colors.DARK_GREY_4B5F83, colors.LIGHT_GREY_B1BED4]}
        style={styles?.gradientView}
      >
        <Button
          title={'Download'}
          textStyle={{
            ...fontStyles.Maison_400_14PX_17LH,
            color: colors.WHITE_FFFF,
          }}
          loaderEnable={loader}
          disabled={loader}
          onPress={downloadPdf}
          containerStyle={uiStyles?.padding10}
          rightIcon={
            <Download2Svg
              style={{
                display: loader ? 'none' : 'flex',
                marginStart: RFValue(5),
              }}
            />
          }
        />
      </LinearGradient>
    </View>
  );
};

export default CertificateScreen;
