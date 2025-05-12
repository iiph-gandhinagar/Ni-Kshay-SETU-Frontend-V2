import { CloseSvg } from '@nikshay-setu-v3-monorepo/assets';
import { ThemeProps } from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { useTheme } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerStateChangeEvent,
  State,
} from 'react-native-gesture-handler';

interface BottomSheetProps {
  isOpen: boolean;
  toggleBottomSheet: () => void;
  children?: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = React.memo(
  ({ isOpen, toggleBottomSheet, children }) => {
    const windowHeight = Dimensions.get('window').height;
    const translateY = useRef(new Animated.Value(windowHeight)).current;
    const clampedTranslateY = useRef(
      Animated.diffClamp(translateY, 0, windowHeight)
    ).current;
    const { colors } = useTheme() as ThemeProps;

    useEffect(() => {
      if (isOpen) {
        Animated.spring(translateY, {
          toValue: 0,
          velocity: 10,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.spring(translateY, {
          toValue: windowHeight,
          velocity: 10,
          useNativeDriver: true,
        }).start();
      }
    }, [isOpen]);

    const onGestureEvent = Animated.event(
      [{ nativeEvent: { translationY: translateY } }],
      { useNativeDriver: true }
    );

    const onHandlerStateChange = (event: PanGestureHandlerStateChangeEvent) => {
      if (event.nativeEvent.oldState === State.ACTIVE) {
        const { translationY, velocityY } = event.nativeEvent;

        if (isOpen) {
          // Prevent upward gestures by checking the translation direction
          if (translationY < 0) {
            // Block upward gestures
            Animated.spring(translateY, {
              toValue: 0,
              velocity: 10,
              useNativeDriver: true,
            }).start();
            return;
          }

          // Handle downward gestures
          let toValue = 0;
          if (translationY > windowHeight / 2 || velocityY > 1000) {
            toValue = windowHeight; // Snap to closed position
          }

          Animated.spring(translateY, {
            toValue,
            velocity: velocityY,
            useNativeDriver: true,
          }).start(() => {
            if (toValue === windowHeight) {
              toggleBottomSheet();
            }
          });
        }
      }
    };

    return (
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View
          style={[
            styles.bottomSheet,
            {
              transform: [{ translateY: clampedTranslateY }],
              backgroundColor: colors.WHITE_FFFF,
              shadowColor: colors.BLACK_000000,
            },
          ]}
        >
          <TouchableOpacity style={styles.handle} onPress={toggleBottomSheet}>
            <View
              style={[
                styles.handleBar,
                { backgroundColor: colors.LIGHT_GREY_CCC },
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignSelf: 'flex-end', marginTop: -RFValue(10) }}
            onPress={toggleBottomSheet}
          >
            <CloseSvg />
          </TouchableOpacity>
          <View style={styles.content}>{children}</View>
        </Animated.View>
      </PanGestureHandler>
    );
  }
);

const styles = StyleSheet.create({
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: RFValue(16),
    borderTopRightRadius: RFValue(16),
    padding: RFValue(16),
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  handle: {
    alignItems: 'center',
    marginTop: RFValue(8),
  },
  handleBar: {
    width: RFValue(40),
    height: RFValue(4),
    borderRadius: RFValue(2),
  },
  content: {
    marginTop: RFValue(8),
  },
});

export default BottomSheet;
