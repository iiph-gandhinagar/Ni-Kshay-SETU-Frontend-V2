import { ArrowSvg } from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles } from '@nikshay-setu-v3-monorepo/constants';
import { ThemeProps } from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { useTheme } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { Row } from '../commonComponents/row_column';

interface QuestionAskCardProps {
  title: string;
  options: string[];
  showArrow: boolean;
  onClick: (values) => void;
}

const QuestionAskCard: React.FC<QuestionAskCardProps> = ({
  title,
  options,
  showArrow,
  onClick,
}) => {
  const [showOption, setShowOption] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const { colors } = useTheme() as ThemeProps;
  const onToggle = (values) => {
    if (showArrow == false) {
      onClick(values);
    } else {
      if (showOption) onClick(values);
      if (showOption) {
        Animated.timing(animatedHeight, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false,
        }).start(() => setShowOption(false));
      } else {
        setShowOption(true);
        Animated.timing(animatedHeight, {
          toValue: options.length * 45, // Adjust height based on your needs
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    }
  };
  return (
    <TouchableHighlight underlayColor={null} key={title}>
      <View style={styles.container}>
        <TouchableHighlight
          onPress={() => onToggle(title)}
          underlayColor={null}
        >
          <Row style={styles.row}>
            <Row>
              <Text
                style={[
                  fontStyles.Maison_500_17PX_20LH,
                  { color: '#394F89', marginEnd: RFValue(10) },
                ]}
              >
                ●
              </Text>
              <Text style={fontStyles.Maison_500_17PX_20LH}>{title}</Text>
            </Row>
            {showArrow && (
              <ArrowSvg
                style={{
                  transform: [{ rotate: showOption ? '270deg' : '90deg' }],
                }}
              />
            )}
          </Row>
        </TouchableHighlight>
        {showOption && (
          <Animated.View
            style={[
              styles.animatedView,
              { height: animatedHeight, borderStartColor: colors.BLACK_000000 },
            ]}
          >
            {options.map((value, key) => (
              <View key={key + 'askQes'}>
                <TouchableHighlight
                  onPress={() => onToggle(value)}
                  underlayColor={null}
                >
                  <Row key={key} style={styles.optionRow}>
                    <View style={styles.circle} />
                    <Text style={styles.optionText}>{value}</Text>
                  </Row>
                </TouchableHighlight>
              </View>
            ))}
          </Animated.View>
        )}
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    padding: RFValue(15),
    margin: RFValue(10),
    borderRadius: RFValue(10),
    backgroundColor: 'white',
    elevation: RFValue(5),
  },
  row: {
    justifyContent: 'space-between',
  },
  animatedView: {
    borderStartWidth: 1,
    paddingStart: RFValue(10),
    marginTop: RFValue(20),
  },
  optionRow: {
    gap: RFValue(10),
    alignItems: 'center',
    marginEnd: RFValue(15),
  },
  circle: {
    height: RFValue(15),
    borderColor: 'gray',
    width: RFValue(15),
    borderRadius: RFValue(100),
    borderWidth: 1,
  },
  optionText: {
    padding: RFValue(10),
  },
});

export default QuestionAskCard;
