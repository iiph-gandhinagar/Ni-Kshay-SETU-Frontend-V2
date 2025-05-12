import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { RootStackParamList } from '../rootStack/RouteStackTypes';

export interface BmiResultProps {
  user_bmi: number;
  type: string;
}

export interface ToolsCardProps {
  ImageSrc?: string;
  Title: string;
  SvgImg?: React.FC<SvgProps>;
  onPress: () => void;
}

export interface AnimatedGradientCardProps {
  colors: [string, string];
  style?: ViewStyle;
  textStyle?: TextStyle;
}
export interface ChatTextCardProps {
  text: string | React.JSX.Element;
  self: boolean;
  chatBotChatting?: boolean;
  time: string;
}
interface ChatObjProps {
  type: string;
  multiAns: string;
  message: string;
  title: string;
  nid?: string;
  time: string;
  self: string;
  data?: [{ 'H5P-id': string }];
}
export interface ChatBoatChatCardProps {
  onPressSubCard?: (item: ChatObjProps) => void;
  scrollDown?: () => void;
  stopScroll?: (v: boolean) => void;
  OnH5PNodeLoad?: (v: boolean) => void;
  isMainNode: boolean;
  itsHistory: boolean;
  item: ChatObjProps;
  navigation?: NativeStackNavigationProp<RootStackParamList>;
}

export interface QueryItemProps {
  index: number;
  subject: string;
  status: string;
  buttonText?: string;
  query: string;
  queryDate: string;
  handleAddQuery: () => void;
  handleRespondToQuery: () => void;
}

export interface UniversalCardProps {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  children: ReactNode;
}
