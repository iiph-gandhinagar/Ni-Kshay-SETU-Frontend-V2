import { fontStyles } from '@nikshay-setu-v3-monorepo/constants';
import { ThemeProps } from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextStyle, View } from 'react-native';

type TypingAnimationProps = {
  text: string; // The text to animate.
  typingSpeed?: number; // Speed of typing (ms per character).
  style?: TextStyle; // Style for the text.
};

/**
 * TypingAnimation component that animates text being typed out.
 */
const TypingAnimation: React.FC<TypingAnimationProps> = ({
  text = '', // Default to an empty string if no text is provided
  typingSpeed = 100, // Default typing speed is 100ms per character
  style = {}, // Default to an empty object for style
}) => {
  const [displayedText, setDisplayedText] = useState<string>('');
  const { colors } = useTheme() as ThemeProps;

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    try {
      if (text.length === 0) {
        console.warn('TypingAnimation: No text provided to animate.');
        return; // Exit early if the text is empty
      }

      if (typingSpeed <= 0) {
        console.warn(
          'TypingAnimation: typingSpeed should be greater than 0. Resetting to default (100ms).'
        );
        typingSpeed = 100;
      }

      let currentIndex = 0;
      intervalId = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText((prev) => prev + text[currentIndex]);
          currentIndex++;
        } else {
          if (intervalId) {
            clearInterval(intervalId);
          }
        }
      }, typingSpeed);
    } catch (error) {
      console.error(
        'TypingAnimation: An error occurred while animating text.',
        error
      );
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [text, typingSpeed]);

  return (
    <View>
      <Text
        style={[
          styles.defaultTextStyle,
          style,
          { color: colors.BLACK_000000 },
          fontStyles.Maison_400_13PX_20LH,
        ]}
      >
        {displayedText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  defaultTextStyle: {
    fontSize: RFValue(16),
  },
});

export default TypingAnimation;
