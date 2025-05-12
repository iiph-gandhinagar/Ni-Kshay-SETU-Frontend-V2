import { fontStyles } from '@nikshay-setu-v3-monorepo/constants';
import { TopThreeUserType } from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { Row } from 'apps/nikshy-setu-mob/src/components/commonComponents/row_column';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const TotalWidth = Dimensions?.get('window')?.width;

interface AnimatedPercentageProps {
  percent: number;
}

interface AnimatedBarProps {
  number: 1 | 2 | 3;
  percent: number;
}

const AnimatedPercentage: React.FC<AnimatedPercentageProps> = React.memo(
  ({ percent = '' }) => {
    const scaleValue = useRef(new Animated.Value(1)).current;
    useEffect(() => {
      const animate = () => {
        scaleValue.setValue(1);
        Animated.timing(scaleValue, {
          toValue: 1.2, // Scale up to 1.2
          duration: 500, // Duration of the animation
          useNativeDriver: true, // Use native driver for better performance
        }).start(() => {
          Animated.timing(scaleValue, {
            toValue: 1, // Scale back to 1
            duration: 500,
            useNativeDriver: true,
          }).start(animate); // Loop the animation
        });
      };

      animate();
    }, [scaleValue]);
    return (
      <Animated.View
        style={[styles?.animatedView, { transform: [{ scale: scaleValue }] }]}
      >
        <Text
          style={{
            color: 'white',
            fontSize: RFValue(12),
            ...fontStyles.Maison_500_12PX_15LH,
          }}
        >
          {percent}%
        </Text>
      </Animated.View>
    );
  }
);

const AnimatedBar: React.FC<AnimatedBarProps> = React.memo(
  ({ number = 1, percent = '' }) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const TextStyles = {
      2: {
        textStyle: {
          fontSize: RFValue(60),
          marginBottom: RFValue(10),
          fontWeight: '600',
        },
        gradientStyle: styles.card1,
        gradientColor: ['#9087E4', '#A49BF4'],
      },
      1: {
        textStyle: { marginBottom: RFValue(30) },
        gradientStyle: styles.card2,
        gradientColor: ['#9087E4', '#A49DE9'],
      },
      3: {
        textStyle: {
          fontSize: RFValue(40),
          fontWeight: '300',
          lineHeight: RFValue(50),
        },
        gradientStyle: styles.card3,
        gradientColor: ['#9087E4', '#A49BF4'],
      },
    };
    const startAnimation = () => {
      Animated.stagger(150, [
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: number * 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    };

    const createAnimatedStyle = (animatedValue) => ({
      transform: [
        { perspective: 1000 },
        {
          rotateY: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '15deg'],
          }),
        },
        {
          translateY: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [200, 0],
          }),
        },
      ],
    });

    useEffect(() => {
      startAnimation();
    }, []);

    return (
      <Animated.View
        style={[
          createAnimatedStyle(animatedValue) as ViewStyle,
          number === 1 && { marginHorizontal: -RFValue(10), zIndex: 1 },
        ]}
      >
        <AnimatedPercentage percent={percent} />
        <View style={{ backgroundColor: '#ACA6EC', borderRadius: RFValue(40) }}>
          <View style={styles.cardTopLayer} />
          <LinearGradient
            colors={TextStyles?.[number]?.gradientColor}
            end={{ x: 0.7, y: 1 }}
            start={{ x: 0.3, y: 0 }}
            style={[styles.card, TextStyles?.[number]?.gradientStyle]}
          >
            <Text
              style={[
                styles.cardText,
                TextStyles?.[number]?.textStyle as TextStyle,
              ]}
            >
              {number}
            </Text>
          </LinearGradient>
        </View>
      </Animated.View>
    );
  }
);

const TopThreeUserBar: React.FC<{ item: TopThreeUserType }> = ({ item }) => {
  return (
    <Row style={styles.container}>
      {item?.[0]?.percentageCompleted && (
        <AnimatedBar
          percent={parseInt(item?.[0]?.percentageCompleted)}
          number={2}
        />
      )}
      {item?.[1]?.percentageCompleted && (
        <AnimatedBar
          percent={parseInt(item?.[1]?.percentageCompleted)}
          number={1}
        />
      )}
      {item?.[2]?.percentageCompleted && (
        <AnimatedBar
          percent={parseInt(item?.[2]?.percentageCompleted)}
          number={3}
        />
      )}
    </Row>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'flex-end',
    backgroundColor: '#796BE41A',
    borderRadius: RFValue(200),
    width: RFValue(TotalWidth - 150),
    height: RFValue(TotalWidth - 150),
    // paddingBottom: RFValue(5),
    justifyContent: 'center',
    // padding: RFValue(5),
  },
  animatedView: {
    paddingHorizontal: RFValue(6),
    padding: RFValue(3),
    backgroundColor: '#C1BDF9',
    alignItems: 'center',
    borderRadius: RFValue(7),
    marginBottom: RFValue(5),
    alignSelf: 'center',
  },
  card: {
    width: RFValue(75),
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  card1: {
    backgroundColor: '#9087E4',
    height: RFValue(90),
  },
  card2: {
    backgroundColor: '#e74c3c',
    height: RFValue(120),
  },
  card3: {
    backgroundColor: '#8e44ad',
    height: RFValue(80),
  },
  cardTopLayer: {
    // width: RFValue(75),
    height: 10,
    borderBottomWidth: RFValue(13),
    borderBottomColor: '#ACA6EC',
    borderLeftWidth: RFValue(20),
    borderLeftColor: 'transparent',
    borderRightWidth: RFValue(20),
    borderRightColor: 'transparent',
    margin: 0,
    // marginBottom: -0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    ...fontStyles.Maison_500_24PX_28LH,
    fontSize: RFValue(70),
    lineHeight: RFValue(80),
    fontWeight: '800',
    color: 'white',
  },
});

export default TopThreeUserBar;
