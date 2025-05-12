import { fontStyles, uiStyles } from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { ThemeProps } from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Linking, Modal, Platform, StyleSheet, Text, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, {
  Defs,
  Rect,
  Stop,
  LinearGradient as SvgLinearGradient,
} from 'react-native-svg';
import { useDispatch } from 'react-redux';
import Button from './buttons/primaryButtons';
import { Row } from './commonComponents/row_column';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

interface StateProps {
  alertCategory: string;
  errorCode: number;
  isModal?: boolean;
  errorMessage: string;
  message: { en: string };
  severity: string;
}

// 503 - Service Unavailable:
// 202 - Accepted:
// 103 - Early Hints:
// 426 - Upgrade Required:

const modalColors = {
  503: {
    Header: 'Service Unavailable',
    modalColors: ['#F8F1E4', '#F4E2C4', '#F1D8B5'], // Soft cream gradient for 503
    positiveButton: 'Try again',
    negativeButton: 'Cancel',
  },
  202: {
    Header: 'Accepted',
    modalColors: ['#E3FDFD', '#FEFCF9', '#FFEFBA'], // Soft cream gradient for 202
    positiveButton: 'Okay',
    negativeButton: 'Cancel',
  },
  103: {
    Header: 'Early Hints',
    modalColors: ['#F8F1E4', '#F4E2C4', '#F1D8B5'], // Soft cream gradient for 103
    positiveButton: 'Check Now',
    negativeButton: 'Cancel',
  },
  426: {
    Header: 'Upgrade Required',
    modalColors: ['#F8F1E4', '#F4E2C4', '#F1D8B5'], // Soft cream gradient for 426
    positiveButton: 'Update',
    negativeButton: 'Cancel',
  },
  200: {
    Header: 'No Error',
    modalColors: ['#F8F1E4', '#F4E2C4', '#F1D8B5'], // Soft cream gradient for 200
    positiveButton: 'Okay',
    negativeButton: 'Cancel',
  },
};
function playStoreForUpdate() {
  const playStoreUrl =
    'https://play.google.com/store/apps/details?id=com.iiphg.tbapp';
  Linking.openURL(playStoreUrl);
}
export const CheckAppHealth: React.FC = () => {
  const dispatch = useDispatch();
  const gradientOffset = useSharedValue(-1);
  const theme = useTheme() as ThemeProps;
  const [data, setData] = useState<StateProps>({
    alertCategory: '',
    errorCode: 200,
    errorMessage: '',
    message: { en: '---' },
    severity: '',
    isModal: false,
  });
  useEffect(() => {
    dispatch(
      createAction<
        { appVersion: number | string; platform: string },
        StateProps
      >(
        {
          method: 'POST',
          url: 'CHECK_HEALTH_STATUS',
          data: {
            appVersion: DeviceInfo.getVersion(),
            platform: Platform.OS === 'android' ? 'mobile-app' : 'iPhone-app',
          },
        },
        (code, res) => {
          if (code === 200 && !(res?.errorCode === 200)) {
            setData({ ...res, isModal: true });
          }
        }
      )
    );

    // Start the looping shimmer animation
    gradientOffset.value = withRepeat(
      withTiming(1, {
        duration: 3000,
        easing: Easing.linear,
      }),
      -1, // Infinite looping
      false // Do not reverse the animation
    );
  }, []);

  const animatedProps = useAnimatedProps(() => ({
    x: `${gradientOffset.value * 100}%`,
  }));
  const conditionalData = modalColors?.[data?.errorCode];
  return (
    <Modal animationType='slide' visible={data?.isModal} transparent>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* Animated SVG Gradient */}
          <Svg
            height='100%'
            width='100%'
            style={[
              styles.gradientBackground,
              { backgroundColor: conditionalData?.modalColors[0] },
            ]}
          >
            <Defs>
              <SvgLinearGradient id='grad' x1='0%' y1='0%' x2='100%' y2='0%'>
                <Stop
                  offset='0%'
                  stopColor={conditionalData?.modalColors[0]}
                  stopOpacity='1'
                />
                <Stop
                  offset='50%'
                  stopColor={conditionalData?.modalColors[1]}
                  stopOpacity='1'
                />
                <Stop
                  offset='100%'
                  stopColor={conditionalData?.modalColors[2]}
                  stopOpacity='1'
                />
              </SvgLinearGradient>
            </Defs>
            <AnimatedRect
              animatedProps={animatedProps}
              width='300%'
              height='100%'
              fill='url(#grad)'
            />
          </Svg>

          {/* Content */}
          <View style={styles.content}>
            <Text
              style={[styles.title, { color: theme?.colors?.DARK_BLUE_394F89 }]}
            >
              {conditionalData?.Header}
            </Text>
            <Text style={[styles.message, fontStyles.Maison_500_13PX_20LH]}>
              {data?.message?.en || '--'}
            </Text>
          </View>
          <Row style={{ justifyContent: 'space-around' }}>
            {!(data?.severity === 'High') && (
              <Button
                title={conditionalData?.negativeButton}
                bgColor={theme?.colors?.DARK_BLUE_394F89}
                containerStyle={uiStyles?.flex1Margin10}
                onPress={() => {
                  setData({
                    alertCategory: '',
                    errorCode: 200,
                    errorMessage: '',
                    message: { en: '---' },
                    severity: '',
                    isModal: false,
                  });
                }}
              />
            )}
            <Button
              title={conditionalData?.positiveButton}
              bgColor={theme?.colors?.DARK_BLUE_394F89}
              onPress={() => {
                if (data.errorCode === 103 || data.errorCode === 426) {
                  playStoreForUpdate();
                }
              }}
              containerStyle={uiStyles?.flex1Margin10}
            />
          </Row>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000095',
  },
  modalView: {
    margin: RFValue(20),
    borderRadius: RFValue(20),
    overflow: 'hidden',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: RFValue(4),
    elevation: RFValue(5),
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: RFValue(20),
    backgroundColor: '#FEFCF9',
  },
  closeButton: {
    position: 'absolute',
    top: RFValue(15),
    right: RFValue(15),
    zIndex: 1,
  },
  content: {
    padding: RFValue(15),
    alignItems: 'center',
  },
  title: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: RFValue(10),
  },
  message: {
    fontSize: RFValue(14),
    color: '#555555',
    textAlign: 'center',
    marginBottom: RFValue(5),
  },
});
