import { fontStyles } from '@nikshay-setu-v3-monorepo/constants';
import { ThemeProps } from '@nikshay-setu-v3-monorepo/types';
import { useTheme } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Text, View, ViewStyle } from 'react-native';

interface TypingTextProps {
  text: string;
  fontSize?: number;
  containerStyles?: ViewStyle;
  typingTextStyles?: ViewStyle;
  delay?: number;
}

const TypingText: React.FC<TypingTextProps> = ({
  text,
  typingTextStyles,
  containerStyles,
  delay = 100,
}) => {
  const [typedText, setTypedText] = useState('');
  const previousTextRef = useRef<string>(text);
  const { colors } = useTheme() as ThemeProps;
  useEffect(() => {
    let typingInterval: NodeJS.Timeout;

    // Check if the text has changed
    if (previousTextRef.current !== text) {
      setTypedText('');
      previousTextRef.current = text;
    }

    typingInterval = setInterval(() => {
      setTypedText((prevTypedText) => {
        if (prevTypedText?.length < text?.length) {
          return prevTypedText + text[prevTypedText.length];
        } else {
          clearInterval(typingInterval);
          return prevTypedText;
        }
      });
    }, delay);

    return () => clearInterval(typingInterval);
  }, [text, delay]);

  return (
    <View style={containerStyles}>
      <Text
        style={{
          ...fontStyles.Maison_500_13PX_20LH,
          color: colors.WHITE_TEXT,
        }}
      >
        {typedText}
      </Text>
    </View>
  );
};

export default TypingText;
