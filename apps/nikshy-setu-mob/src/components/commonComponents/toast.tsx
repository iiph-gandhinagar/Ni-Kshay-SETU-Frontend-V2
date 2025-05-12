import { fontStyles } from '@nikshay-setu-v3-monorepo/constants';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

const CustomToast = ({ message, visible }) => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity of the toast

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      // Fade out after 3 seconds
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 200000);
    }
  }, [visible, fadeAnim]);

  if (!visible) return null; // Don't render the toast if not visible

  return (
    <Animated.View style={[styles.toastContainer, { opacity: fadeAnim }]}>
      <Text style={[fontStyles.Maison_400_13PX_20LH, { color: 'white' }]}>
        {message}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: RFValue(60), // Position it at the top of the screen
    left: RFValue(20),
    right: RFValue(20),
    padding: RFValue(10),
    backgroundColor: 'rgba(0,0,0,0.9)',
    borderRadius: RFValue(10),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  toastText: {
    color: '#fff',
    fontSize: RFValue(16),
  },
});

export default CustomToast;
