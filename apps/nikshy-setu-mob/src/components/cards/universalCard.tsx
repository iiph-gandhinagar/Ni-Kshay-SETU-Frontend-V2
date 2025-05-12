import { cardStyles } from '@nikshay-setu-v3-monorepo/constants';
import { UniversalCardProps } from '@nikshay-setu-v3-monorepo/types';
import { StyleSheet, TouchableHighlight } from 'react-native';
interface UniversalCardProp extends UniversalCardProps {
  styleName?: keyof typeof cardStyles;
}
export const UniversalCard: React.FC<UniversalCardProp> = ({
  onPress,
  style,
  children,
  styleName = 'card',
}) => {
  const combinedStyle = StyleSheet.flatten([cardStyles[styleName], style]);
  return (
    <TouchableHighlight
      style={combinedStyle}
      underlayColor={null}
      onPress={onPress}
    >
      {children}
    </TouchableHighlight>
  );
};
