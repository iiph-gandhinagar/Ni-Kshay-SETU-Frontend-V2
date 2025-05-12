import { ArrowSvg, ExpandSvg } from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles, uiStyles } from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { ScreenProps } from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import Button from 'apps/nikshy-setu-mob/src/components/buttons/primaryButtons';
import React, { useEffect, useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { enableScreens } from 'react-native-screens';
import WebView from 'react-native-webview';
import { useDispatch } from 'react-redux';
enableScreens();

export const H5pView: React.FC<ScreenProps<'h5pView'>> = ({
  navigation,
  route,
}) => {
  const { theme, activeContent, contentPage, readContentInfo } = route.params;
  const initialIndex =
    contentPage?.findIndex((item) => item?.h5pIds?.includes(activeContent)) ||
    0;
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const [isHeaderHidden, setIsHeaderHidden] = useState<boolean>(false);

  const currentContent = contentPage[currentIndex];

  // Set navigation options
  const handleNext = () => {
    if (currentIndex < contentPage.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      navigation.setOptions({
        orientation: 'landscape',
        statusBarColor: '#ffff',
        navigationBarHidden: true,
        statusBarHidden: true,
      });
    } else {
      navigation.setOptions({
        orientation: 'landscape',
        navigationBarHidden: true,
        fullScreenGestureEnabled: true,
      });
    }

    return () => {
      navigation.setOptions({
        orientation: 'portrait',
      });
    };
  }, []);

  const injectedJavaScript = `
  const meta = document.createElement('meta');
  meta.name = 'viewport';
  meta.content = 'width=1920, height=1080, initial-scale=1, maximum-scale=1';
  document.getElementsByTagName('head')[0].appendChild(meta);
  true;
`;

  const [readContent, setReadContent] = useState<string[]>([]);
  const passDataBack = () => {
    if (route.params?.sendDataBack) {
      route.params.sendDataBack(readContent);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {!isHeaderHidden && (
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={passDataBack}>
            <ArrowSvg
              width={RFValue(25)}
              height={RFValue(25)}
              style={styles.arrowSvg}
            />
            <Text
              numberOfLines={1}
              ellipsizeMode='tail'
              style={styles.backText}
            >
              Back
            </Text>
          </TouchableOpacity>
          <Text
            numberOfLines={1}
            ellipsizeMode='tail'
            style={styles.contentTitle}
          >
            {currentContent?.contentTitle || 'Unknown Title'}
          </Text>
          <TouchableOpacity
            onPress={() => setIsHeaderHidden(true)}
            style={styles.hideHeaderButton}
          >
            <ExpandSvg style={uiStyles.rotate90deg} />
          </TouchableOpacity>
        </View>
      )}

      {isHeaderHidden && (
        <View style={styles.showHeaderButtonWrapper}>
          <TouchableOpacity onPress={() => setIsHeaderHidden(false)}>
            <ExpandSvg style={styles.expandSvgRotated} />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.contentWrapper}>
        {((!isHeaderHidden && currentIndex > 0) || Platform.OS === 'ios') && (
          <Button
            title=''
            leftIcon={<ArrowSvg style={styles.arrowLeftIcon} />}
            textStyle={styles.buttonText}
            containerStyle={styles.previousButtonContainer}
            onPress={handlePrevious}
          />
        )}
        <View style={styles.webViewContainer}>
          <WebView
            useWebView2
            source={{
              uri: `https://ntep.in/h5p/${currentContent?.h5pIds}/embed`,
            }}
            style={styles.webView}
            scalesPageToFit={false}
            javaScriptEnabled={true}
            startInLoadingState={true}
            domStorageEnabled={true}
            showsVerticalScrollIndicator={false}
            injectedJavaScript={injectedJavaScript}
            onLoadEnd={() => {
              if (
                !readContent?.includes(currentContent?.contentId) &&
                readContentInfo?.contentId &&
                readContentInfo?.chapterId &&
                readContentInfo?.moduleId
              ) {
                dispatch(
                  createAction(
                    {
                      method: 'POST',
                      url: 'KBASE_READ_CONTENT',
                      data: {
                        ...readContentInfo,
                        contentId: currentContent?.contentId,
                      },
                    },
                    (status, res) => {
                      if (status === 200) {
                        setReadContent((prev) => [
                          ...prev,
                          currentContent?.contentId,
                        ]);
                      }
                    }
                  )
                );
              } else {
                console.log('have in array');
              }
            }}
          />
        </View>

        {!isHeaderHidden && currentIndex < contentPage.length - 1 && (
          <LinearGradient
            colors={['#0B4E67', '#61C9EF']}
            style={styles.nextButtonGradient}
          >
            <Button
              title=''
              rightIcon={<ArrowSvg stroke='white' />}
              onPress={handleNext}
            />
          </LinearGradient>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
    height: RFValue(35),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    marginHorizontal: RFValue(15),
    borderColor: '#E9E9E9',
    flexDirection: 'row',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowSvg: {
    transform: [{ rotate: '180deg' }],
  },
  backText: {
    ...fontStyles.Maison_500_20PX_25LH,
    marginStart: RFValue(5),
    color: '#394F89',
  },
  contentTitle: {
    ...fontStyles.Maison_500_20PX_25LH,
    marginHorizontal: RFValue(15),
    color: '#0A94A7',
    textDecorationLine: 'underline',
    textDecorationStyle: 'dashed',
    flex: 1,
  },
  hideHeaderButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  showHeaderButtonWrapper: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  expandSvgRotated: {
    transform: [{ rotate: '180deg' }],
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  arrowLeftIcon: {
    transform: [{ rotate: '180deg' }],
  },
  buttonText: {
    color: '#4B4E8B',
  },
  previousButtonContainer: {
    alignSelf: 'flex-end',
    padding: RFValue(5),
    borderWidth: 1,
    height: RFValue(35),
    width: RFValue(35),
    borderRadius: RFValue(100),
    margin: RFValue(5),
  },
  webViewContainer: {
    flex: 1,
  },
  webView: {
    flex: 1,
    width: '90%',
    height: '100%',
    alignSelf: 'center',
  },
  nextButtonGradient: {
    alignSelf: 'flex-end',
    borderWidth: 1,
    height: RFValue(35),
    width: RFValue(35),
    borderRadius: RFValue(100),
    margin: RFValue(5),
  },
});

export default H5pView;
