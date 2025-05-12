import { uiStyles } from '@nikshay-setu-v3-monorepo/constants';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import React, { ReactNode } from 'react';
import { Animated, ScrollView, ViewStyle } from 'react-native';
interface AnimationViewProps {
  children: ReactNode;
  progress: number;
  scrollFalse?: boolean;
  opacity: Animated.Value;
  translateY: Animated.Value;
}

const AnimationView: React.FC<AnimationViewProps> = ({
  children,
  progress,
  scrollFalse = false,
  opacity,
  translateY,
}) => {
  const containerStyle: ViewStyle = {
    flex: 1,
    paddingVertical: RFValue(10),
    justifyContent: 'center',
    paddingHorizontal: [0.4, 0.8, 0.7].includes(progress) ? 0 : RFValue(20),
    opacity,
    transform: [{ translateY }],
  };

  const scrollViewStyle = [0.5].includes(progress)
    ? {}
    : uiStyles.justifyC_center_paddingH20;

  return (
    <Animated.View style={containerStyle}>
      {scrollFalse ? (
        children
      ) : (
        <ScrollView
          contentContainerStyle={scrollViewStyle}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      )}
    </Animated.View>
  );
};

export default AnimationView;
