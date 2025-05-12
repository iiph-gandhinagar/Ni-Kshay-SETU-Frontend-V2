import React from 'react';
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';

interface ColumnProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export const Column: React.FC<ColumnProps> = ({ style, children, ...rest }) => {
  return (
    <View style={[{ flexDirection: 'column' }, style]} {...rest}>
      {children}
    </View>
  );
};

interface RowProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export const Row: React.FC<RowProps> = ({ style, children, ...rest }) => {
  return (
    <View style={[{ flexDirection: 'row' }, style]} {...rest}>
      {children}
    </View>
  );
};
