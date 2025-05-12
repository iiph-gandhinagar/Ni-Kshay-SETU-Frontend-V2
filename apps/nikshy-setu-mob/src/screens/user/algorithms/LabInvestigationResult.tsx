import { ArrowDownSvg } from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles, uiStyles } from '@nikshay-setu-v3-monorepo/constants';
import {
  RootReducerStates,
  ScreenProps,
  ThemeProps,
} from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { useTheme } from '@react-navigation/native';
import Button from 'apps/nikshy-setu-mob/src/components/buttons/primaryButtons';
import { Row } from 'apps/nikshy-setu-mob/src/components/commonComponents/row_column';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
const scoreDetails = [
  {
    id: 'LAB_GENERAL_CONDITION',
    title: 'LAB_GENERAL_CONDITION',
    subtitle: 'TEXT_SCORE',
  },
  {
    id: 'LAB_TEXT_ICTERUS',
    title: 'LAB_TEXT_ICTERUS',
    subtitle: 'TEXT_SCORE',
  },
  {
    id: 'LAB_PEDAL_OEDEMA',
    title: 'LAB_PEDAL_OEDEMA',
    subtitle: 'TEXT_SCORE',
  },
  {
    id: 'LAB_PULSE_RATE',
    title: 'LAB_PULSE_RATE',
    subtitle: 'TEXT_SCORE',
  },
  {
    id: 'LAB_TEMPERATURE',
    title: 'LAB_TEMPERATURE',
    subtitle: 'TEXT_SCORE',
  },
  {
    id: 'LAB_BLOOD_PRESSURE',
    title: 'LAB_BLOOD_PRESSURE',
    subtitle: 'TEXT_SCORE',
  },
  {
    id: 'LAB_RESPIRATORY_RATE',
    title: 'LAB_RESPIRATORY_RATE',
    subtitle: 'TEXT_SCORE',
  },
  {
    id: 'LAB_OXYGEN_SATURATION',
    title: 'LAB_OXYGEN_SATURATION',
    subtitle: 'TEXT_SCORE',
  },
  {
    id: 'LAB_TEXT_BMI',
    title: 'LAB_TEXT_BMI',
    subtitle: 'TEXT_SCORE',
  },
  {
    id: 'LAB_TEXT_MUAC',
    title: 'LAB_TEXT_MUAC',
    subtitle: 'TEXT_SCORE',
  },
  {
    id: 'LAB_TEXT_HEMOGLOBIN',
    title: 'LAB_TEXT_HEMOGLOBIN',
    subtitle: 'TEXT_SCORE',
  },
  {
    id: 'LAB_COUNT_WBC',
    title: 'LAB_COUNT_WBC',
    subtitle: 'TEXT_SCORE',
  },
  {
    id: 'LAB_TEXT_RBS',
    title: 'LAB_TEXT_RBS',
    subtitle: 'TEXT_SCORE',
  },
  {
    id: 'LAB_TEXT_HIV',
    title: 'LAB_TEXT_HIV',
    subtitle: 'TEXT_SCORE',
  },
  {
    id: 'LAB_TEXT_XRAY',
    title: 'LAB_TEXT_XRAY',
    subtitle: 'TEXT_SCORE',
  },
  {
    id: 'LAB_TEXT_HEMOPTYSIS',
    title: 'LAB_TEXT_HEMOPTYSIS',
    subtitle: 'TEXT_SCORE',
  },
];

const Result = [
  {
    name: 'Differentiated_Care_Normal_Risk',
    title: 'No Risk',
    color: '#51F16B',
    subText:
      'Providing intermediate care and observing for symptoms to subside',
    type: 0,
  },
  {
    name: 'Differentiated_Care_Low_Risk',
    title: 'Low Risk',
    color: '#F8E74F',
    subText:
      'Providing intermediate care and observing for symptoms to subside',
    type: 1,
  },
  {
    name: 'Differentiated_Care_Moderate_Risk',
    title: 'Moderate Risk',
    subText:
      'Referring to PHC or any facility with availability of MBBS doctor or facility indicated in referral column',
    color: '#FFC56D',
    type: 2,
  },
  {
    name: 'Differentiated_Care_High_Risk',
    title: 'High Risk',
    subText:
      'Referring to DH/SDH or nearest secondary or tertiary care facility with availability of intensive care',
    color: '#FF5F5F',
    type: 3,
  },
];
const styles = StyleSheet.create({
  Container: {
    height: RFValue(100),
    flex: 1,
    padding: RFValue(5),
    elevation: RFValue(8),
    borderRadius: RFValue(10),
    margin: RFValue(10),
    borderWidth: RFValue(1.5),
  },
  resultTxt: {
    flex: 1.3,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  resultSubTxt: {
    alignSelf: 'center',
    ...fontStyles?.Maison_400_13PX_20LH,
    marginTop: RFValue(10),
    textAlign: 'center',
  },
  Title: {
    flex: 1,
    paddingHorizontal: RFValue(1),
    textAlign: 'center',
  },
  detailedScoreText: {
    marginVertical: RFValue(10),
    ...fontStyles.Maison_500_12PX_15LH,
  },
  listHeaderCompo: { borderWidth: 1, borderRadius: RFValue(10) },
  value: {
    textAlign: 'center',
  },
  flatList: {
    marginHorizontal: RFValue(9),
    flex: 1,
  },
  homeBtn: {
    marginHorizontal: RFValue(20),
  },
  resultView: {
    height: RFValue(20),
    width: '100%',
    alignItems: 'flex-end',
    padding: RFValue(3),
  },
  thankText: {
    alignSelf: 'center',
    ...fontStyles?.Maison_400_13PX_20LH,
    marginTop: RFValue(10),
    textAlign: 'center',
  },
});
interface AssesTBResultCardProps {
  title: string;
  score: string | number;
  value: string;
}
export const AssesTBResultCard: React.FC<AssesTBResultCardProps> = ({
  title = '',
  score = 'No Data',
  value = 'No Data',
}) => {
  const { colors } = useTheme() as unknown as ThemeProps;

  return (
    <View
      style={[
        styles.Container,
        {
          backgroundColor: colors.WHITE_FFFF,
          shadowColor:
            score == '3'
              ? '#FF5F5F'
              : score == '2'
              ? '#FFC56D'
              : score == '1'
              ? '#F8E74F'
              : colors.BLACK_000000,
          borderColor:
            score == '3'
              ? '#FF5F5F'
              : score == '2'
              ? '#FFC56D'
              : score == '1'
              ? '#F8E74F'
              : colors.GREY_D9DBDB,
        },
      ]}
    >
      <Text
        style={[
          fontStyles.Maison_400_14PX_17LH,
          styles.Title,
          { color: colors.GREEN_0CA74B },
        ]}
      >
        {title}
      </Text>
      <View style={{ flexDirection: 'row', marginBottom: RFValue(10) }}>
        <Text
          style={[
            fontStyles.Maison_400_10PX_12LH,
            { color: colors.BLACK_000000 },
          ]}
        >
          Score :{' '}
        </Text>
        <Text
          style={[
            fontStyles.Maison_400_10PX_12LH,
            {
              color:
                value == 'No Data' ? colors.RED_C62828 : colors.BLACK_000000,
              flex: 1,
            },
          ]}
        >
          {score}
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text
          style={[
            fontStyles.Maison_400_10PX_12LH,
            { color: colors.BLACK_000000 },
          ]}
        >
          Value :{' '}
        </Text>
        <Text
          style={[
            fontStyles.Maison_400_10PX_12LH,
            {
              color:
                value == 'No Data' ? colors.RED_C62828 : colors.BLACK_000000,
              flex: 1,
            },
          ]}
        >
          {value}
        </Text>
      </View>
    </View>
  );
};

export const LabInvestigationResult: React.FC<
  ScreenProps<'labInvestigationResult'>
> = ({ navigation, route }) => {
  const ResultObj = route?.params?.data;
  const colors = route?.params?.theme?.colors;
  let max = Math.max.apply(
    Math,
    ResultObj?.map((o) => o?.score)
  );
  if (max === 1) {
    const lookup = ResultObj.reduce((a, e) => {
      a[e.score] = ++a[e.score] || 0;
      return a;
    }, {});
    if (ResultObj.filter((e) => lookup[e.score]).length > 2) {
      max = 2;
    }
  }
  const appTranslations = useSelector(
    (state: RootReducerStates) => state.appContext?.data?.appTranslations
  );

  const ListHeaderComponent = () => {
    return (
      <React.Fragment>
        <View style={styles?.listHeaderCompo}>
          <Text style={styles?.thankText}>
            Thank you for Assessment of TB Patient
          </Text>
          <Row>
            <View style={uiStyles?.flex1Padding10}>
              {Result?.map((item, index) => {
                return (
                  <Row key={index}>
                    <View
                      style={[
                        styles?.resultView,
                        {
                          backgroundColor: item?.color,
                          borderTopEndRadius: index === 0 ? RFValue(10) : 0,
                          borderTopStartRadius: index === 0 ? RFValue(10) : 0,
                          borderBottomStartRadius:
                            index + 1 === 4 ? RFValue(10) : 0,
                          borderBottomEndRadius:
                            index + 1 === 4 ? RFValue(10) : 0,
                        },
                      ]}
                    >
                      <Text style={fontStyles?.Maison_400_10PX_12LH}>
                        {item?.title}
                      </Text>
                    </View>
                    {index === max && (
                      <ArrowDownSvg
                        style={uiStyles.rotate90deg}
                        fill={'black'}
                      />
                    )}
                  </Row>
                );
              })}
            </View>
            <View style={styles?.resultTxt}>
              <Text style={fontStyles.Maison_500_13PX_15LH}>
                {Result?.[max].title}
              </Text>
            </View>
          </Row>
          <Text style={styles?.resultSubTxt}>{Result?.[max]?.subText}</Text>
        </View>
        <Text style={styles?.detailedScoreText}>{'Detailed Score'}</Text>
      </React.Fragment>
    );
  };
  return (
    <View style={uiStyles?.flex1}>
      <FlatList
        numColumns={2}
        style={styles?.flatList}
        ListHeaderComponent={ListHeaderComponent}
        data={scoreDetails}
        renderItem={({ item, index }) => {
          return (
            <AssesTBResultCard
              title={appTranslations[item.title]}
              score={ResultObj?.find((e) => e?.id == item?.id)?.score}
              value={ResultObj?.find((e) => e?.id == item?.id)?.value}
              key={item?.title + ' - screen - ' + index}
            />
          );
        }}
      />
      <Button
        title='Home'
        containerStyle={styles?.homeBtn}
        bgColor={colors?.DARK_BLUE_394F89}
        onPress={() => {
          navigation?.navigate('homeScreen');
        }}
      />
    </View>
  );
};

export default LabInvestigationResult;
