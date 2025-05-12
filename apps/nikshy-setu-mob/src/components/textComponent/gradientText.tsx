import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Defs, LinearGradient, Stop, Svg, Text } from 'react-native-svg';

export interface GradientStrokeTextProps {
  text: string;
  height?: number;
  width?: number | string;
  gradientColors?: [string, string, string];
  borderColors?: [string, string];
  locations?: { x: number; y: number };
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  isGradientFill?: boolean;
  fillColor?: string;
  isGradientStroke?: boolean;
  strokeColor?: string;
  strokeWidth?: number;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string | number;
  style?: StyleProp<ViewStyle>;
}

export interface GradientStrokeTextProps {
  text: string;
  height?: number;
  width?: number;
  gradientColors?: [string, string, string];
  borderColors?: [string, string];
  locations?: { x: number; y: number };
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  isGradientFill?: boolean;
  fillColor?: string;
  isGradientStroke?: boolean;
  strokeColor?: string;
  strokeWidth?: number;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string | number;
  style?: StyleProp<ViewStyle>;
}
const GradientText = ({
  text = '',
  height = 100,
  width = 300,
  gradientColors = ['#9C5ED7', '#635AD9', '#E8A0A0'],
  borderColors = ['#b429f9', '#26c5f3'],
  locations = { x: 150, y: 80 },
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  isGradientFill = false,
  fillColor = '#FFFFFF',
  isGradientStroke = false,
  strokeColor = '#000000',
  strokeWidth = 0,
  fontSize = 18,
  fontFamily = 'Next',
  fontWeight = 900,
  style = {},
}: GradientStrokeTextProps) => {
  return (
    <Svg height={height} width={width} style={style}>
      <Defs>
        <LinearGradient
          id='Gradient'
          x1={start.x}
          y1={start.y}
          x2={end.x}
          y2={end.y}
        >
          <Stop stopColor={borderColors[0]} offset='0' stopOpacity='1' />
          <Stop stopColor={borderColors[1]} offset='1' stopOpacity='1' />
        </LinearGradient>
        <LinearGradient
          id='GradientFill'
          x1={start.x}
          y1={start.y}
          x2={end.x}
          y2={end.y}
        >
          <Stop stopColor={gradientColors[0]} offset='1' stopOpacity='1' />
          <Stop stopColor={gradientColors[1]} offset='0' stopOpacity='1' />
          <Stop stopColor={gradientColors[2]} offset='1' stopOpacity='1' />
        </LinearGradient>
      </Defs>
      <Text
        fill={isGradientFill ? 'url(#GradientFill)' : fillColor}
        stroke={isGradientStroke ? 'url(#Gradient)' : strokeColor}
        strokeWidth={strokeWidth}
        fontSize={fontSize}
        fontWeight={fontWeight}
        fontFamily={fontFamily}
        x={locations.x}
        y={locations.y}
        textAnchor='start'
      >
        {text}
      </Text>
    </Svg>
  );
};

const GradientText2 = ({
  text = '',
  height = 100,
  width = 300,
  gradientColors = ['#9C5ED7', '#635AD9', '#E8A0A0'],
  borderColors = ['#b429f9', '#26c5f3'],
  locations = { x: 150, y: 80 },
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  isGradientFill = false,
  fillColor = '#FFFFFF',
  isGradientStroke = false,
  strokeColor = '#000000',
  strokeWidth = 0,
  fontSize = 18,
  fontFamily = 'Next',
  fontWeight = 900,
  style = {},
}: GradientStrokeTextProps) => {
  return (
    <Svg height={height} width={'100%'} style={style}>
      <Defs>
        <LinearGradient
          id='Gradient'
          x1={start.x}
          y1={start.y}
          x2={end.x}
          y2={end.y}
        >
          <Stop stopColor={borderColors[0]} offset='0' stopOpacity='1' />
          <Stop stopColor={borderColors[1]} offset='1' stopOpacity='1' />
        </LinearGradient>
        <LinearGradient
          id='GradientFill'
          x1={start.x}
          y1={start.y}
          x2={end.x}
          y2={end.y}
        >
          <Stop stopColor={gradientColors[0]} offset='1' stopOpacity='1' />
          <Stop stopColor={gradientColors[1]} offset='0' stopOpacity='1' />
          <Stop stopColor={gradientColors[2]} offset='1' stopOpacity='1' />
        </LinearGradient>
      </Defs>
      <Text
        fill={isGradientFill ? 'url(#GradientFill)' : fillColor}
        stroke={isGradientStroke ? 'url(#Gradient)' : strokeColor}
        strokeWidth={strokeWidth}
        fontSize={fontSize}
        fontWeight={fontWeight}
        fontFamily={fontFamily}
        x={locations.x}
        y={locations.y}
        textAnchor='middle' // Ensures proper centering
      >
        {text}
      </Text>
    </Svg>
  );
};

export { GradientText, GradientText2 };
