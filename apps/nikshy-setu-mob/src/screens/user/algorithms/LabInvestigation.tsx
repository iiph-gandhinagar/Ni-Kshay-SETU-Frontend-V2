import {
  ImagePlaceholderPng,
  Png000,
  Png01,
  Png02,
  Png03,
  Png04,
  Png05,
  Png06,
  Png07,
  Png08,
  Png09,
  Png10,
  Png11,
  Png12,
  Png13,
  Png14,
  Png15,
} from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles, uiStyles } from '@nikshay-setu-v3-monorepo/constants';
import { ScreenProps } from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import Button from 'apps/nikshy-setu-mob/src/components/buttons/primaryButtons';
import { Row } from 'apps/nikshy-setu-mob/src/components/commonComponents/row_column';
import { InputField } from 'apps/nikshy-setu-mob/src/components/inputComponents';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export const investigationDetails = [
  {
    id: 'LAB_GENERAL_CONDITION',
    title: 'LAB_GENERAL_CONDITION',
    image: Png000,
    subtitle: 'NORMAL RANGE: Conscious & well oriented',
    type: 'dropDown',
    options: [
      { label: 'Conscious and normal', value: 'Conscious and normal' },
      {
        label: 'Inability walk but conscious and oriented',
        value: 'Inability walk but conscious and oriented',
      },
      {
        label: 'Conscious and not oriented',
        value: 'Conscious and not oriented',
      },
      {
        label: 'Drowsy/Unconscious/Comatose',
        value: 'Drowsy/Unconscious/Comatose',
      },
    ],
  },
  {
    id: 'LAB_TEXT_ICTERUS',
    title: 'LAB_TEXT_ICTERUS',
    image: Png09,
    type: 'dropDown',
    options: [
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' },
    ],
  },
  {
    id: 'LAB_PEDAL_OEDEMA',
    title: 'LAB_PEDAL_OEDEMA',
    image: Png08,
    type: 'dropDown',
    options: [
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' },
    ],
  },
  {
    id: 'LAB_PULSE_RATE',
    image: Png01,
    title: 'LAB_PULSE_RATE',
    subtitle: 'NORMAL RANGE: 60 - 100/min',
  },
  {
    id: 'LAB_TEMPERATURE',
    image: Png02,
    title: 'LAB_TEMPERATURE',
    subtitle: 'NORMAL RANGE: 35 – 38.6 ‘C',
  },
  {
    id: 'LAB_BLOOD_PRESSURE',
    image: Png03,
    title: 'LAB_BLOOD_PRESSURE',
    subtitle: 'NORMAL_RANGE: 90/60 – 120/80',
    type: 'dropDown',
    options: [
      { label: 'Normal (120/80mmHg)', value: 'Normal (120/80mmHg)' },
      {
        label: 'Higher Normal (< 140/90mmHg)',
        value: 'Higher Normal (< 140/90mmHg)',
      },
      {
        label: 'Hypertension (> 140/90 mmHg)',
        value: 'Hypertension (> 140/90 mmHg)',
      },
      {
        label: 'Hypotension (Diastolic < 60 mmHg)',
        value: 'Hypotension (Diastolic < 60 mmHg)',
      },
      {
        label: 'Hypertension (>200/100 mm Hg)',
        value: 'Hypertension (>200/100 mm Hg)',
      },
    ],
  },
  {
    id: 'LAB_RESPIRATORY_RATE',
    image: Png04,
    title: 'LAB_RESPIRATORY_RATE',
    subtitle: 'NORMAL_RANGE: 12 – 18/min',
  },
  {
    id: 'LAB_OXYGEN_SATURATION',
    image: Png05,
    title: 'LAB_OXYGEN_SATURATION',
    subtitle: 'NORMAL_RANGE: 95 – 100%',
  },
  {
    id: 'LAB_TEXT_BMI',
    image: Png15,
    title: 'LAB_TEXT_BMI',
    subtitle: 'NORMAL_RANGE: 18.5 – 24.9',
  },
  {
    id: 'LAB_TEXT_MUAC',
    image: Png07,
    title: 'LAB_TEXT_MUAC',
    subtitle: 'NORMAL_RANGE: >= 19 cm',
  },

  {
    id: 'LAB_TEXT_HEMOGLOBIN',
    image: Png10,
    title: 'LAB_TEXT_HEMOGLOBIN',
    subtitle: 'NORMAL_RANGE: Female = 9.9 – 14.3 g/dl Male = 12.3 – 17 g/dl',
  },
  {
    id: 'LAB_COUNT_WBC',
    image: Png11,
    title: 'LAB_COUNT_WBC',
    subtitle: 'NORMAL_RANGE: 4000-11000',
  },
  {
    id: 'LAB_TEXT_RBS',
    image: Png12,
    title: 'LAB_TEXT_RBS',
    subtitle: 'NORMAL_RANGE: 79 – 140 mg/dl',
  },
  {
    id: 'LAB_TEXT_HIV',
    image: Png13,
    title: 'LAB_TEXT_HIV',
    type: 'dropDown',
    options: [
      { label: '-Ve', value: '-Ve' },
      { label: '+Ve and on ART', value: '+Ve and on ART' },
      { label: '+Ve and not on ART', value: '+Ve and not on ART' },
    ],
  },
  {
    id: 'LAB_TEXT_XRAY',
    image: Png14,
    title: 'LAB_TEXT_XRAY',
    subtitle: 'NORMAL_RANGE: No abnormality',
    type: 'dropDown',
    options: [
      { label: 'No abnormality', value: 'No abnormality' },
      { label: 'Consolidation', value: 'Consolidation' },
      { label: 'Hydro Pneumothorax', value: 'Hydro Pneumothorax' },
    ],
  },
  {
    id: 'LAB_TEXT_HEMOPTYSIS',
    image: Png06,
    title: 'LAB_TEXT_HEMOPTYSIS',
    type: 'dropDown',
    options: [
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' },
    ],
  },
];

export const LabInvestigation: React.FC<ScreenProps<'labInvestigation'>> = ({
  navigation,
  route,
}) => {
  const colors = route?.params?.theme?.colors;

  const [ans, setAns] = useState([]);
  const updatedAns = Object.assign([], ans);
  const pushToArray = (value, id, score) => {
    const index = ans.findIndex((e) => e.id == id);
    if (index == -1) {
      updatedAns.push({
        id: id,
        value: value,
        score: score,
      });
    } else {
      updatedAns[index] = {
        id: id,
        value: value,
        score: score,
      };
    }
    setAns(updatedAns);
  };

  const calculateScore = (value, id) => {
    switch (id) {
      case 'LAB_PULSE_RATE':
        if (parseFloat(value) < 60 || parseFloat(value) > 100) {
          pushToArray(value, id, 2);
        } else if (parseFloat(value)) {
          pushToArray(value, id, 0);
        } else if (value == '') {
          pushToArray(value, id, '');
        }
        break;
      case 'LAB_TEMPERATURE':
        if (parseFloat(value) < 35 || parseFloat(value) > 41) {
          pushToArray(value, id, 2);
        } else if (parseFloat(value) > 38.6 && parseFloat(value) <= 41) {
          pushToArray(value, id, 1);
        } else if (value == '') {
          pushToArray(value, id, '');
        } else if (parseFloat(value)) {
          pushToArray(value, id, 0);
        }
        break;
      case 'LAB_BLOOD_PRESSURE':
        if (value === 'Normal (120/80mmHg)') {
          pushToArray(value, id, 0);
        } else if (value === 'Higher Normal (< 140/90mmHg)') {
          pushToArray(value, id, 1);
        } else if (value === 'Hypertension (> 140/90 mmHg)') {
          pushToArray(value, id, 2);
        } else if (value === 'Hypotension (Diastolic < 60 mmHg)') {
          pushToArray(value, id, 3);
        } else if (value === 'Hypertension (>200/100 mm Hg)') {
          pushToArray(value, id, 3);
        } else if (value == '') {
          pushToArray(value, id, '');
        }
        break;
      case 'LAB_RESPIRATORY_RATE':
        //12-18 0, <12 2
        if (parseFloat(value) < 12) {
          pushToArray(value, id, 2);
        } else if (parseFloat(value) >= 12 && parseFloat(value) <= 18) {
          pushToArray(value, id, 0);
        } else if (parseFloat(value) <= 24) {
          pushToArray(value, id, 1);
        } else if (parseFloat(value) < 30) {
          pushToArray(value, id, 2);
        } else if (parseFloat(value) >= 30) {
          pushToArray(value, id, 3);
        } else if (value == '') {
          pushToArray(value, id, '');
        }
        break;
      case 'LAB_OXYGEN_SATURATION':
        //94 < 0
        if (parseFloat(value) >= 94 && parseFloat(value) <= 100) {
          pushToArray(value, id, 0);
        } else if (parseFloat(value) >= 90) {
          pushToArray(value, id, 1);
        } else if (parseFloat(value) >= 85) {
          pushToArray(value, id, 2);
        } else if (parseFloat(value) < 85) {
          pushToArray(value, id, 3);
        } else if (value == '') {
          pushToArray(value, id, '');
        }
        break;
      case 'LAB_TEXT_BMI':
        // lessThen14 3, 14to16=2, 16to25=1,25to30=1,30to 33=2,33up=3
        if (parseFloat(value) < 14) {
          pushToArray(value, id, 3);
        } else if (parseFloat(value) >= 14 && parseFloat(value) < 16) {
          pushToArray(value, id, 2);
        } else if (parseFloat(value) >= 16 && parseFloat(value) < 18.5) {
          pushToArray(value, id, 1);
        } else if (parseFloat(value) >= 18.5 && parseFloat(value) < 25) {
          pushToArray(value, id, 0);
        } else if (parseFloat(value) >= 25 && parseFloat(value) < 30) {
          pushToArray(value, id, 1);
        } else if (parseFloat(value) >= 30 && parseFloat(value) < 33) {
          pushToArray(value, id, 2);
        } else if (parseFloat(value) >= 33) {
          pushToArray(value, id, 3);
        } else if (value == '') {
          pushToArray(value, id, '');
        }
        break;
      case 'LAB_TEXT_MUAC':
        if (parseFloat(value) < 19) {
          pushToArray(value, id, 1);
        } else if (parseFloat(value) >= 19) {
          pushToArray(value, id, 0);
        } else if (value == '') {
          pushToArray(value, id, '');
        }
        break;
      case 'LAB_PEDAL_OEDEMA':
        if (value === 'Yes') {
          pushToArray(value, id, 1);
        } else if (value == '') {
          pushToArray(value, id, '');
        } else {
          pushToArray(value, id, 0);
        }
        break;
      case 'LAB_GENERAL_CONDITION':
        //         Conscious and normal = 0
        //Inability walk but conscious and oriented=1
        // Conscious and not oriented= 2
        // Drowsy, Unconscious, Comatose= 3
        if (value === 'Conscious and normal') {
          pushToArray(value, id, 0);
        } else if (value === 'Inability walk but conscious and oriented') {
          pushToArray(value, id, 1);
        } else if (value === 'Conscious and not oriented') {
          pushToArray(value, id, 2);
        } else if (value === 'Drowsy/Unconscious/Comatose') {
          pushToArray(value, id, 3);
        } else if (value == '') {
          pushToArray(value, id, '');
        }
        break;
      case 'LAB_TEXT_ICTERUS':
        if (value === 'Yes') {
          pushToArray(value, id, 1);
        } else if (value == '') {
          pushToArray(value, id, '');
        } else {
          pushToArray(value, id, 0);
        }
        break;
      case 'LAB_TEXT_HEMOGLOBIN':
        // <4 ->3  ,4to7 2, 7to10, 1, 10to17 0  ,18 up 2
        if (parseFloat(value) < 4) {
          pushToArray(value, id, 3);
        } else if (parseFloat(value) >= 4 && parseFloat(value) < 7) {
          pushToArray(value, id, 2);
        } else if (parseFloat(value) >= 7 && parseFloat(value) < 10) {
          pushToArray(value, id, 1);
        } else if (parseFloat(value) >= 10 && parseFloat(value) <= 18) {
          pushToArray(value, id, 0);
        } else if (parseFloat(value) > 18) {
          pushToArray(value, id, 2);
        } else if (value == '') {
          pushToArray(value, id, '');
        }
        break;
      case 'LAB_COUNT_WBC':
        // 4000to3000 =1,3000to2000=2 ,2000,toDown 3, 11000-14000=1,14000to16000=2, to up 3
        if (parseFloat(value) <= 2000) {
          pushToArray(value, id, 3);
        } else if (parseFloat(value) > 2000 && parseFloat(value) < 3000) {
          pushToArray(value, id, 2);
        } else if (parseFloat(value) >= 3000 && parseFloat(value) < 4000) {
          pushToArray(value, id, 1);
        } else if (parseFloat(value) >= 4000 && parseFloat(value) < 11000) {
          pushToArray(value, id, 0);
        } else if (parseFloat(value) >= 11000 && parseFloat(value) < 14000) {
          pushToArray(value, id, 1);
        } else if (parseFloat(value) >= 14000 && parseFloat(value) < 16000) {
          pushToArray(value, id, 2);
        } else if (parseFloat(value) >= 16000) {
          pushToArray(value, id, 3);
        } else if (value == '') {
          pushToArray(value, id, '');
        }
        break;
      case 'LAB_TEXT_RBS':
        // 50down 3,70-50=2 ,70-79=1,80-128=0 ,128-140=1,140-250=2,  moreThen 250 3 ,
        if (parseFloat(value) < 50) {
          pushToArray(value, id, 3);
        } else if (parseFloat(value) < 70) {
          pushToArray(value, id, 2);
        } else if (parseFloat(value) < 80) {
          pushToArray(value, id, 1);
        } else if (parseFloat(value) <= 128) {
          pushToArray(value, id, 0);
        } else if (parseFloat(value) <= 140) {
          pushToArray(value, id, 1);
        } else if (parseFloat(value) < 250) {
          pushToArray(value, id, 2);
        } else if (parseFloat(value) >= 250) {
          pushToArray(value, id, 3);
        } else if (value == '') {
          pushToArray(value, id, '');
        }
        break;
      case 'LAB_TEXT_HIV':
        if (value === '-Ve') {
          pushToArray(value, id, 0);
        } else if (value === '+Ve and on ART') {
          pushToArray(value, id, 1);
        } else if (value === '+Ve and not on ART') {
          pushToArray(value, id, 2);
        } else if (value == '') {
          pushToArray(value, id, '');
        }
        break;
      case 'LAB_TEXT_XRAY':
        //No abnormality=0,
        //Consolidation =2
        //Hydro Pneumothorax =3

        if (value === 'No abnormality') {
          pushToArray(value, id, 0);
        } else if (value === 'Consolidation') {
          pushToArray(value, id, 2);
        } else if (value === 'Hydro Pneumothorax') {
          pushToArray(value, id, 3);
        } else if (value == '') {
          pushToArray(value, id, '');
        }
        break;

      case 'LAB_TEXT_HEMOPTYSIS':
        if (value === 'Yes') {
          pushToArray(value, id, 3);
        } else if (value == '') {
          pushToArray(value, id, '');
        } else {
          pushToArray(value, id, 0);
        }
        break;
      default:
        return 0;
    }
  };
  const appTranslations = route?.params?.appTranslations;
  const styles = StyleSheet.create({
    img: {
      height: RFValue(50),
      width: RFValue(50),
      alignSelf: 'flex-start',
      marginEnd: RFValue(15),
      marginTop: RFValue(30),
    },
    txt: {
      ...fontStyles.Maison_400_10PX_12LH,
      margin: RFValue(5),
      color: colors?.GREY_797979,
    },
  });

  return (
    <View style={uiStyles?.flex1}>
      <ScrollView contentContainerStyle={uiStyles?.padding10}>
        {investigationDetails?.map((item, index) => {
          const questionValue = ans?.find((i) => i.id === item.id);
          return (
            <Row style={uiStyles?.flex1} key={item?.id + index}>
              <Image
                source={item?.image}
                style={styles?.img}
                progressiveRenderingEnabled={true}
                defaultSource={ImagePlaceholderPng}
              />
              <View style={uiStyles?.flex1}>
                {item?.type === 'dropDown' ? (
                  <InputField.DropDown
                    options={item?.options || []}
                    value={{
                      label: questionValue?.value,
                      value: questionValue?.value,
                    }}
                    label={appTranslations[item?.title]}
                    touched={false}
                    onChange={(value) => {
                      calculateScore(value?.value, item?.id);
                    }}
                  />
                ) : (
                  <InputField.Input
                    label={appTranslations[item?.title]}
                    touched={false}
                    value={questionValue?.value}
                    keyboardType={'decimal-pad'}
                    onChange={(value) => {
                      calculateScore(value, item?.id);
                    }}
                  />
                )}
                {item?.subtitle && (
                  <Text style={styles?.txt}>{item?.subtitle}</Text>
                )}
              </View>
            </Row>
          );
        })}
      </ScrollView>

      <Button
        title={appTranslations?.APP_CALCULATE}
        bgColor={colors?.DARK_BLUE_383A68}
        containerStyle={uiStyles?.margin10}
        onPress={() => {
          navigation.navigate('labInvestigationResult', {
            data: ans,
          });
        }}
        disabled={
          ans.length > 0
            ? ans.findIndex((e) => e.score !== '') != -1
              ? false
              : true
            : true
        }
      />
    </View>
  );
};

export default LabInvestigation;
