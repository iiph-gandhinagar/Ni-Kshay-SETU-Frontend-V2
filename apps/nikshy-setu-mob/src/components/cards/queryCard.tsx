import { GradientArrowSvg } from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles } from '@nikshay-setu-v3-monorepo/constants';
import {
  QueryItemProps,
  RootStackParamList,
  ThemeProps,
} from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import {
  NavigationProp,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from '../buttons/primaryButtons';
import { Column, Row } from '../commonComponents/row_column';

export const QueryItem: React.FC<QueryItemProps> = ({
  index,
  subject,
  query,
  status = 'In Progress',
  queryDate,
  buttonText = 'Respond to Query',
  handleAddQuery,
  handleRespondToQuery,
}) => {
  const { colors } = useTheme() as ThemeProps;
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const [expend, SetExpended] = useState(false);
  const cardColor = colors.LIGHT_BLUE_EEFBFF;
  const borderColor =
    status === 'In Progress'
      ? '#FFAA00'
      : status === 'completed'
      ? '#4CAF50'
      : '#2196F3';
  if (expend) {
    return (
      <View
        key={index}
        style={[
          styles.queryContainer,
          {
            backgroundColor: cardColor,
            borderColor: borderColor,
            shadowColor: borderColor,
            marginTop: RFValue(5),
          },
        ]}
      >
        <Row style={{ alignContent: 'center', marginVertical: RFValue(10) }}>
          <Column style={{ flex: 1 }}>
            <Text style={[fontStyles.Maison_400_13PX_20LH, { flex: 1 }]}>
              {subject}
            </Text>
            <Text
              style={[
                fontStyles.Maison_500_15PX_21LH,
                { marginVertical: RFValue(15), color: colors.GREY_808080 },
              ]}
            >
              <Text
                style={[
                  fontStyles.Maison_500_15PX_21LH,
                  { fontWeight: 'bold', color: colors.BLACK_000000 },
                ]}
              >
                Diagnosis:
              </Text>{' '}
              {query}
            </Text>
          </Column>
          <TouchableOpacity
            style={[styles.addQueryButton, { alignSelf: 'flex-end' }]}
            onPress={() => {
              SetExpended(!expend);
            }}
          >
            <Text style={styles.addQueryButtonText}>×</Text>
          </TouchableOpacity>
        </Row>
        <Button
          title={buttonText}
          bgColor={colors.WHITE_FFFF}
          onPress={handleRespondToQuery}
          containerStyle={[styles.respondButton]}
          rightIcon={<GradientArrowSvg />}
          textStyle={[
            fontStyles.Maison_500_15PX_21LH,
            { color: colors.BLACK_000000 },
          ]}
        />
        <Text
          style={[
            fontStyles.Maison_400_12PX_16LH,
            {
              alignSelf: 'flex-end',
              marginTop: RFValue(5),
              color: colors.GREY_808080,
            },
          ]}
        >
          {queryDate}
        </Text>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.queryContainer,
          {
            backgroundColor: cardColor,
            borderColor: borderColor,
            shadowColor: borderColor,
            shadowRadius: RFValue(20),
          },
        ]}
        onPress={() => {
          SetExpended(!expend);
        }}
      >
        <Row style={{ justifyContent: 'space-between' }}>
          <Text style={styles.queriesTitle}>{subject}</Text>
          <Text
            style={{
              justifyContent: 'center',
              // flex: 1,
              fontSize: RFValue(20),
              // fontWeight: '00',
            }}
          >
            +
          </Text>
        </Row>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: RFValue(20),
  },
  topContainer: {
    alignItems: 'flex-start',
    padding: RFValue(20),
    borderRadius: RFValue(20),
  },
  title: {
    fontSize: RFValue(24),
    fontWeight: 'bold',
    marginBottom: RFValue(10),
  },
  subtitle: {
    fontSize: RFValue(16),
    marginBottom: RFValue(20),
  },
  queriesContainer: {
    flex: 1,
    marginTop: RFValue(20),
  },
  queriesTitle: {
    flex: 3,
    alignSelf: 'center',
    ...fontStyles.Maison_400_13PX_20LH,
    marginStart: RFValue(12),
  },
  queryContainer: {
    flex: 1,
    padding: RFValue(15),
    marginBottom: RFValue(10),
    borderRadius: RFValue(15),
    elevation: RFValue(3),
    margin: RFValue(5),
    borderLeftWidth: RFValue(4),
    borderRightWidth: RFValue(1),
  },
  querySubjectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RFValue(10),
  },
  addQueryButton: {
    borderRadius: RFValue(20),
    justifyContent: 'flex-end',
    paddingHorizontal: RFValue(8),
  },
  addQueryButtonText: {
    justifyContent: 'center',
    flex: 1,
    fontSize: RFValue(20),
    fontWeight: '500',
  },
  respondButton: {
    backgroundColor: 'transparent',
    borderRadius: RFValue(18),
    borderWidth: RFValue(1),
    alignItems: 'center',
    padding: RFValue(10),
  },
});
