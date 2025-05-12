import { Download2Svg } from '@nikshay-setu-v3-monorepo/assets';
import { ScreenProps } from '@nikshay-setu-v3-monorepo/types';
import { useToast } from 'apps/nikshy-setu-mob/src/components/commonComponents/toastProvider';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  BackHandler,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { RFValue } from 'react-native-responsive-fontsize';
import { enableScreens } from 'react-native-screens';
import Video, { VideoRef } from 'react-native-video';
enableScreens();

export const VideoView: React.FC<ScreenProps<'videoView'>> = ({
  navigation,
  route,
}) => {
  const materialsObj = route?.params?.url;
  const heading = route?.params?.header || 'Video';
  const [download, setDownloadBtn] = useState(true);
  const [isPlaying, setPlaying] = useState(true);
  const { showToast } = useToast();
  const videoRef = useRef<VideoRef>(null);

  const filename = materialsObj
    .substring(materialsObj.lastIndexOf('/') + 1)
    .split('.');

  const downloadVideo = async () => {
    showToast('Downloading......');
    const { config, fs } = ReactNativeBlobUtil;
    const dirToSave =
      Platform.OS === 'ios'
        ? fs.dirs.DocumentDir
        : '/storage/emulated/0/Download';
    const filePath = `${dirToSave}/${heading}.${filename[1]}`;
    const options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: `${heading}.${filename[1]}`,
        description: 'Downloading video...',
        path: filePath,
      },
    };

    try {
      const res = await config(options).fetch('GET', materialsObj);
      Alert.alert('Download Complete', `Video saved to ${res.path()}`);
      setDownloadBtn(false); // Hide the download button after success
    } catch (error) {
      console.error('Download Error:', error);
      Alert.alert('Download Failed', 'Unable to download the video.');
    }
  };
  useEffect(() => {
    navigation.setOptions({
      fullScreenGestureEnabled: Platform.OS === 'ios',
      orientation: 'landscape',
      statusBarHidden: Platform.OS === 'android',
      fullScreenGestureShadowEnabled: Platform.OS === 'ios',
      // navigationBarHidden: true,
    });

    return () => {
      setPlaying(false);
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

  if (!isPlaying) {
    return;
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Video
          source={{ uri: materialsObj }}
          onBuffer={() => console.log('Buffering...')}
          ref={videoRef}
          onError={(error) => {
            Alert.alert(
              `Error: ${error.error.errorCode}`,
              `${error.error.errorString}`,
              [
                {
                  text: 'Go Back',
                  onPress: () => {
                    navigation.goBack();
                  },
                },
                {
                  text: 'Download Video',
                  onPress: () => {
                    downloadVideo();
                  },
                },
              ]
            );
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: 'black',
          }}
          onControlsVisibilityChange={(v) => {
            setDownloadBtn(v.isVisible);
          }}
          controls={true}
          resizeMode='contain'
          fullscreen={Platform.OS === 'ios'}
        />
        {download && (
          <TouchableOpacity
            style={styles.downloadButton}
            onPress={downloadVideo}
          >
            <Download2Svg />
          </TouchableOpacity>
        )}
      </SafeAreaView>
      // </GestureHandlerRootView>
    );
  }
};

const styles = StyleSheet.create({
  downloadButton: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? RFValue(90) : 75,
    right: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
