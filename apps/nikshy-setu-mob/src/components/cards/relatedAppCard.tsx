import { ArrowSvg } from '@nikshay-setu-v3-monorepo/assets';
import { ThemeProps } from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { useTheme } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Column, Row } from '../commonComponents/row_column';

export const RelatedAppsCard = () => {
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(RFValue(70))).current;
  const { colors } = useTheme() as ThemeProps;

  const toggleExpand = () => {
    setExpanded(!expanded);
    Animated.timing(animation, {
      toValue: expanded ? RFValue(70) : RFValue(150), // Change 150 to desired expanded height
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  return (
    <Animated.View
      style={[
        styles.box,
        {
          height: animation,
          backgroundColor: colors.OFF_WHITE_F8FAFF,
          shadowColor: colors.BLACK_000000,
        },
      ]}
    >
      <TouchableOpacity onPress={toggleExpand}>
        <Row style={styles.row}>
          <Column>
            <Text style={[styles.title, { color: colors.DARK_BLUE_394F89 }]}>
              Related Applications
            </Text>
            <Text style={styles.subtitle}>
              Apps offering additional TB information
            </Text>
          </Column>
          <ArrowSvg />
        </Row>
        {expanded && (
          <View>
            <Text>Related Applications</Text>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  box: {
    borderRadius: RFValue(10),
    margin: RFValue(10),
    elevation: 3,
  },
  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: RFValue(10),
  },
  title: {
    fontSize: RFValue(22),
    fontWeight: '500',
    marginBottom: RFValue(2),
  },
  subtitle: {
    fontFamily: 'Maison-Regular',
  },
});
export default RelatedAppsCard;
