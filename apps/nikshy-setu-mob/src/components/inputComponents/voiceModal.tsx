import {
  Check2,
  CloseSvg,
  micAnimation,
} from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles } from '@nikshay-setu-v3-monorepo/constants';
import { ThemeProps } from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { useTheme } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { WebView } from 'react-native-webview';
import { Row } from '../commonComponents/row_column';

interface MicModalProps {
  showMicModal: boolean;
  onRightClick: (value: string) => void;
  setShowMicModal: (value: boolean) => void;
}

const MicModal: React.FC<MicModalProps> = ({
  showMicModal,
  setShowMicModal,
  onRightClick,
}) => {
  const [recognizedText, setRecognizedText] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const micAnimRef = useRef<LottieView>(null);
  const { colors } = useTheme() as ThemeProps;
  const webViewRef = useRef<WebView>(null);

  useEffect(() => {
    if (showMicModal) {
      setRecognizedText('');
      setErrorMessage(null); // Clear previous error
      micAnimRef.current?.play();
    }
  }, [showMicModal]);

  const handleMessage = (event: any) => {
    const message = event.nativeEvent.data;
    if (message.startsWith('error:')) {
      setErrorMessage('Speech recognition failed. Please try again.');
    } else {
      setRecognizedText(message);
    }
    micAnimRef.current?.reset();
  };

  const webViewScript = `
  (function() {
    console.log('[WebView] Restarting Speech Recognition');

    if (window.recognitionInstance) {
      console.log('[WebView] Stopping old instance');
      window.recognitionInstance.stop();
    }

    setTimeout(() => {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.continuous = false;
      recognition.lang = 'en-US';
      recognition.interimResults = false;

      recognition.onstart = () => console.log('[WebView] Speech Recognition Started');
      recognition.onend = () => console.log('[WebView] Speech Recognition Ended');

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log('[WebView] Recognized Text:', transcript);
        window.ReactNativeWebView.postMessage(transcript);
      };

      recognition.onerror = (event) => {
        console.log('[WebView] Speech Recognition Error:', event.error);
        window.ReactNativeWebView.postMessage("error:" + event.error);
      };

      window.recognitionInstance = recognition;
      recognition.start();
    }, 500);
  })();
  `;

  return (
    <Modal animationType='slide' visible={showMicModal} transparent>
      <View
        style={{
          flex: 1,
          backgroundColor: '#00000099',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            flex: 3,
            padding: RFValue(20),
            backgroundColor: '#00000099',
            borderRadius: RFValue(10),
            margin: RFValue(10),
            justifyContent: 'center',
          }}
        >
          {errorMessage ? (
            <Text
              style={[
                fontStyles.Maison_500_14PX_18LH,
                { textAlign: 'center', color: 'red' },
              ]}
            >
              {errorMessage}
            </Text>
          ) : (
            <Text
              style={[
                fontStyles.Maison_500_14PX_18LH,
                { textAlign: 'center', color: 'white' },
              ]}
            >
              {recognizedText || 'Listening...'}
            </Text>
          )}
        </View>

        <WebView
          ref={webViewRef}
          originWhitelist={['*']}
          source={{ html: '<html><body></body></html>' }}
          injectedJavaScript={webViewScript}
          onMessage={handleMessage}
          style={{ height: 0, width: 0, position: 'absolute' }}
        />

        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Row
            style={{
              alignItems: 'center',
              marginBottom: RFValue(90),
              justifyContent: 'space-evenly',
            }}
          >
            <TouchableOpacity
              onPress={() => setShowMicModal(false)}
              style={{
                backgroundColor: 'white',
                padding: RFValue(15),
                borderRadius: RFValue(50),
              }}
            >
              <CloseSvg
                stroke='#9C5ED7'
                fill='#9C5ED7'
                height={RFValue(30)}
                width={RFValue(30)}
                strokeWidth='0.3'
              />
            </TouchableOpacity>

            {errorMessage ? (
              <TouchableOpacity
                onPress={() => {
                  setErrorMessage(null);
                  setRecognizedText('');
                  webViewRef.current?.reload();
                }}
                style={{
                  backgroundColor: 'red',
                  padding: RFValue(15),
                  borderRadius: RFValue(50),
                }}
              >
                <Text style={{ color: 'white', fontSize: RFValue(16) }}>
                  Retry
                </Text>
              </TouchableOpacity>
            ) : (
              <LinearGradient
                colors={[
                  colors.TRANSPARENT_PURPLE_9C5ED740,
                  colors.TRANSPARENT_PURPLE_635AD940,
                  colors.TRANSPARENT_PINK_E8A0A040,
                ]}
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignSelf: 'center',
                  borderRadius: RFValue(100),
                  height: RFValue(120),
                  width: RFValue(120),
                  backgroundColor: '#9C5ED7',
                }}
              >
                <LottieView
                  ref={micAnimRef}
                  source={micAnimation}
                  loop
                  style={{
                    alignSelf: 'center',
                    height: RFValue(100),
                    width: RFValue(100),
                  }}
                />
              </LinearGradient>
            )}
            <TouchableOpacity
              onPress={() => {
                setShowMicModal(false);
                onRightClick(recognizedText);
              }}
              style={{
                backgroundColor: 'white',
                padding: RFValue(15),
                borderRadius: RFValue(50),
              }}
              disabled={!!errorMessage}
            >
              <Check2
                fill={errorMessage ? '#ccc' : '#9C5ED7'}
                height={RFValue(30)}
                width={RFValue(30)}
                strokeWidth={0.7}
              />
            </TouchableOpacity>
          </Row>
        </View>
      </View>
    </Modal>
  );
};

export default MicModal;
