import { CloseWhiteSvg } from '@nikshay-setu-v3-monorepo/assets';
import {
  ColorProps,
  fontStyles,
  generateHTML,
} from '@nikshay-setu-v3-monorepo/constants';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { Row } from 'apps/nikshy-setu-mob/src/components/commonComponents/row_column';
import React, { useState } from 'react';
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import WebView from 'react-native-webview';
interface ContentViewModalProps {
  closeModal: () => void;
  colors: ColorProps;
  showModal: {
    isModal: boolean;
    description: string;
    title: string;
    id: string;
    timeSpent: number | null;
  };
}
const ContentViewModal: React.FC<ContentViewModalProps> = ({
  closeModal,
  colors,
  showModal,
}) => {
  const visible = showModal?.isModal;
  const title = showModal?.title;
  const description = showModal?.description;
  const [webViewHeight, setWebViewHeight] = useState(0);

  function closeModalSetHeight() {
    setWebViewHeight(0);
    closeModal();
    return true;
  }
  const FixedHeight =
    title?.length < 25 && description?.length < 40
      ? 50
      : description?.length < 40
      ? 70 - (Platform.OS === 'ios' ? 40 : 0)
      : 80 - (Platform.OS === 'ios' ? 40 : 0);

  const styles = StyleSheet.create({
    centeredView: {
      height: '100%',
      justifyContent: 'center',
      backgroundColor: '#00000090',
      zIndex: 0,
    },
    modalView: {
      margin: RFValue(10),
      marginVertical: RFValue(100),
      backgroundColor: '#f4f6f8',
      borderRadius: RFValue(10),
      shadowOffset: {
        width: RFValue(0),
        height: RFValue(2),
      },
      shadowOpacity: RFValue(0.25),
      shadowRadius: RFValue(4),
      elevation: RFValue(5),
      shadowColor: colors.BLACK_000000,
      zIndex: 2,
      height: RFValue(webViewHeight + FixedHeight),
      maxHeight: '85%',
      padding: RFValue(5),
    },
    closeButton: {},
    row: {
      justifyContent: 'space-between',
      width: '100%',
    },
    text: {
      ...fontStyles.Maison_500_18PX_24LH,
      color: '#394F89',
      flex: 1,
      textAlign: 'center',
    },
    closeBtnTouch: {
      alignItems: 'center',
      alignContent: 'center',
      alignSelf: 'center',
      backgroundColor: '#394F89',
      padding: RFValue(5),
      justifyContent: 'center',
      borderRadius: RFValue(20),
    },
    closeIcon: { padding: RFValue(8) },
  });
  return (
    <Modal
      animationType='slide'
      visible={visible}
      transparent
      key={title}
      onRequestClose={closeModalSetHeight}
      onDismiss={closeModalSetHeight}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Row style={styles?.row}>
            <Text style={styles?.text} numberOfLines={2} ellipsizeMode='tail'>
              {title || 'Notes'}
            </Text>
            <View>
              <TouchableOpacity
                onPress={closeModalSetHeight}
                style={styles?.closeBtnTouch}
              >
                <CloseWhiteSvg
                  height={RFValue(10)}
                  width={RFValue(10)}
                  style={styles?.closeIcon}
                  onPress={() => {
                    setWebViewHeight(0);
                    closeModal();
                  }}
                />
              </TouchableOpacity>
            </View>
          </Row>
          <WebView
            key={title}
            originWhitelist={['*']}
            source={{ html: generateHTML(description) }}
            javaScriptEnabled={true}
            showsVerticalScrollIndicator={false}
            mediaPlaybackRequiresUserAction={false}
            startInLoadingState={true}
            allowFileAccess={true}
            allowUniversalAccessFromFileURLs={true}
            allowsInlineMediaPlayback={true}
            onMessage={(event) => {
              console.log('Received message:', event.nativeEvent.data); // Debugging
              const height = parseInt(event.nativeEvent.data, 10);
              if (!isNaN(height)) {
                setWebViewHeight(height);
              }
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ContentViewModal;
