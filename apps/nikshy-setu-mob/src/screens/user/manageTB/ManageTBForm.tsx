import { ArrowSvg, DropdownArrowSvg } from '@nikshay-setu-v3-monorepo/assets';
import {
  DefaultValue,
  fontStyles,
  manageTBvalidationSchema,
  uiStyles,
} from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { ScreenProps, ThemeProps } from '@nikshay-setu-v3-monorepo/types';
import {
  isEmpty,
  CustomRFValue as RFValue,
} from '@nikshay-setu-v3-monorepo/utils';
import { useTheme } from '@react-navigation/native';
import { InputContainer } from 'apps/nikshy-setu-mob/src/components/inputComponents/inputContainer';
import { storeSubscriberActivity } from 'apps/nikshy-setu-mob/src/utils/functions';
import {
  Formik,
  FormikErrors,
  FormikHelpers,
  FormikTouched,
  FormikValues,
} from 'formik';
import React, { useRef, useState } from 'react';
import {
  KeyboardTypeOptions,
  Modal,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import {
  ManageTbApiRequest,
  PatientFormData,
  PatientResponse,
} from 'shared/types/src/screens/ManageTBScreenTypes';
import Button from '../../../components/buttons/primaryButtons';
import { Row } from '../../../components/commonComponents/row_column';
import { InputField } from '../../../components/inputComponents';
import {
  AttentionHeaderText,
  checkDiscordanceCondition,
  disableFieldIfMgitNotAvail,
  discordanceMessages,
  emptyDependedQuestion,
  ManageTBQuestions,
  optionValue,
} from './questionData';
interface QuestionNodeProps {
  question: {
    type: string;
    title: string;
    isDisabled: boolean;
    placeholder: string;
    options?: string[];
  };
  isSubQuestion?: boolean;
  values: FormikValues;
  errors: FormikErrors<FormikValues>;
  touched: FormikTouched<FormikValues>;
  quesKey: string; // Unique identifier for the question
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  setFieldTouched: (
    field: string,
    isTouched?: boolean,
    shouldValidate?: boolean
  ) => void;
  checkDiscordance: (quesKey: string, value: any, values: FormikValues) => void;
  setValues: (
    values: React.SetStateAction<FormikValues>,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<FormikValues>>;
}
interface FilterValues {
  sex: string;
  cbnaat_trunat: string;
  mtb_1: string;
  if_mtb_present_1: string;
  rifampicin_resistance_1: string;
  fl_lpa_result: string;
  mtb_3: string;
  truenat: string;
  rifampicin_resistance_3: string;
  sputum_afb: string;
  mtb_2: string;
}
const QuestionNode: React.FC<QuestionNodeProps> = ({
  question,
  values,
  isSubQuestion,
  errors,
  touched,
  quesKey,
  setFieldValue,
  setFieldTouched,
  checkDiscordance,
  setValues,
}) => {
  const handleBmiCalculation = (value: string) => {
    const heightInCm = quesKey === 'height' ? value : values?.height;
    const weight = quesKey === 'weight' ? value : values?.weight;
    if (heightInCm && weight) {
      const heightInMeters = heightInCm / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
      // setFieldValue('bmi', bmi.toFixed(2), true);
      setValues(
        {
          ...values,
          [quesKey]: value,
          bmi: bmi.toFixed(2),
        },
        true
      );
    } else {
      setValues(
        {
          ...values,
          [quesKey]: value,
          bmi: '0.00',
        },
        true
      );
    }
  };
  const handleFieldChange = (value: string) => {
    if (Object.keys(emptyDependedQuestion).includes(quesKey)) {
      let updatedValues = { ...values, [quesKey]: value };
      if (quesKey === 'mgit_dst_result' && value === optionValue.AVAILABLE) {
        updatedValues = updatedValues;
      } else {
        updatedValues = {
          ...updatedValues,
          ...emptyDependedQuestion?.[quesKey],
        };
      }
      setValues(updatedValues, true);
    } else {
      if (quesKey === 'height' || quesKey === 'weight') {
        handleBmiCalculation(value);
      } else {
        setFieldValue(quesKey, value, true);
      }
    }
    checkDiscordance(quesKey, value, values);
  };
  const disableField =
    (disableFieldIfMgitNotAvail?.includes(quesKey) &&
      values?.mgit_dst_result === 'Not Available' &&
      disableFieldIfMgitNotAvail?.includes(quesKey)) ||
    false;

  const renderInputField = () => {
    if (question?.type === 'singleSelect') {
      const Option = question?.options?.map((v) => ({ label: v, value: v }));
      if (
        !(values.site_of_disease === 'Pulmonary') &&
        quesKey === 'chest_x_ray'
      )
        Option.push({ label: 'Normal', value: 'Normal' });
      return (
        <InputField.CheckBox
          key={`${quesKey}-singleSelect`}
          options={Option}
          label={question?.title}
          value={{ label: values?.[quesKey], value: values?.[quesKey] }}
          labelStyles={{
            fontSize: RFValue(16),
            paddingTop: RFValue(10),
            color: question?.isDisabled || disableField ? '#3965C2' : '#3965C2',
          }}
          disable={question?.isDisabled || disableField}
          placeholder={question?.placeholder}
          error={errors?.[quesKey] as string}
          onTouched={() => setFieldTouched(quesKey, true)}
          onBlur={() => setFieldTouched(quesKey, false)}
          containerStyle={uiStyles?.flex1BgWhite}
          touched={touched?.[quesKey] as boolean}
          onChange={(v) => handleFieldChange(v.value)}
        />
      );
    } else if (question?.isDisabled) {
      return (
        <InputContainer
          key={`${quesKey}-input`}
          error={errors?.[quesKey] as string}
          touched={touched?.[quesKey] as boolean}
          label={question?.title}
          labelStyles={{
            fontSize: RFValue(16),
            paddingTop: RFValue(10),
            color: question?.isDisabled ? '#3965C2' : '#3965C2',
          }}
          containerStyle={uiStyles?.flex1BgWhite}
        >
          <Text
            style={{
              paddingVertical: RFValue(12),
              // fontSize: RFValue(20),
              color: values?.[quesKey] ? 'black' : '#808080',
            }}
          >
            {values?.[quesKey] || question?.placeholder}
          </Text>
        </InputContainer>
      );
    } else {
      return (
        <React.Fragment>
          <InputField.Input
            key={`${quesKey}-input`}
            error={errors?.[quesKey] as string}
            touched={touched?.[quesKey] as boolean}
            label={question?.title}
            editable={!question?.isDisabled}
            containerStyle={uiStyles?.flex1BgWhite}
            placeholder={question?.placeholder}
            value={values?.[quesKey]}
            onTouched={() => setFieldTouched(quesKey, true)}
            onBlur={() => {
              if (
                ['height', 'weight'].includes(quesKey) &&
                !errors?.weight &&
                !errors?.height &&
                Boolean(errors?.bmi)
              ) {
                checkDiscordance('bmi', values?.bmi, values);
              }
              setFieldTouched(quesKey, false);
            }}
            keyboardType={question?.type as KeyboardTypeOptions}
            labelStyles={{
              fontSize: RFValue(16),
              paddingTop: RFValue(10),
              color: question?.isDisabled ? '#3965C2' : '#3965C2',
            }}
            onChange={handleFieldChange}
          />
          {quesKey === 'name' && (
            <Text
              style={{
                color: '#3965C2',
                margin: RFValue(10),
                ...fontStyles.Maison_400_12PX_16LH,
              }}
            >
              Note: First two letter of first & Last Name{'\n'}Example: Ankit
              Sharma will be Written as ANSH
            </Text>
          )}
        </React.Fragment>
      );
    }
  };

  const shouldShowIsOtherInvestigationQuestion = (
    userInput: Record<string, string>,
    conditions: Record<string, string>[]
  ): boolean => {
    return conditions.some((condition) =>
      Object.entries(condition).every(
        ([key, value]) => userInput[key] === value
      )
    );
  };

  const shouldHideQuestion = (
    _quesKey: string,
    _values: FilterValues
  ): boolean => {
    const {
      sputum_afb,
      cbnaat_trunat,
      mtb_1,
      truenat,
      mtb_2,
      fl_lpa_result,
      mtb_3,
      sex,
      rifampicin_resistance_1,
      rifampicin_resistance_3,
    } = _values;

    // Condition for hiding the 'pregnancy' question
    const isPregnancyQuestion = _quesKey === 'pregnancy';
    const isMaleOrTransgenderOrEmpty =
      sex === 'Male' || sex === optionValue.TRANSGENDER || sex === '';

    // Condition for hiding the 'repeat_cbnaat_result_available' question
    const isRepeatCbnaatQuestion =
      _quesKey === 'repeat_cbnaat_result_available';

    const isRifampicin4Detected =
      rifampicin_resistance_1 === optionValue.DETECTED;
    const isRifampicin3NotDetected =
      rifampicin_resistance_3 === optionValue.NOT_DETECTED;

    const isRifampicin4NotDetected =
      rifampicin_resistance_1 === optionValue.NOT_DETECTED;
    const isRifampicin3Detected =
      rifampicin_resistance_3 === optionValue.DETECTED;

    const isRepeatCbnaat1ConditionMet = !(
      (isRifampicin4Detected && isRifampicin3NotDetected) ||
      (isRifampicin4NotDetected && isRifampicin3Detected)
    );
    const condition1 = {
      sputum_afb: optionValue.NEGATIVE,
      cbnaat_trunat: optionValue.NOT_AVAILABLE,
      mtb_1: '',
      truenat: optionValue.NOT_AVAILABLE,
      mtb_2: '',
      fl_lpa_result: optionValue.NOT_AVAILABLE,
      mtb_3: '',
    };

    const condition2 = {
      sputum_afb: optionValue.NEGATIVE,
      cbnaat_trunat: optionValue.AVAILABLE,
      mtb_1: optionValue.NOT_DETECTED,
      truenat: optionValue.NOT_AVAILABLE,
      mtb_2: '',
      fl_lpa_result: optionValue.NOT_AVAILABLE,
      mtb_3: '',
    };

    const condition3 = {
      sputum_afb: optionValue.NEGATIVE,
      cbnaat_trunat: optionValue.AVAILABLE,
      mtb_1: optionValue.NOT_DETECTED,
      truenat: optionValue.AVAILABLE,
      mtb_2: optionValue.NOT_DETECTED,
      fl_lpa_result: optionValue.NOT_AVAILABLE,
      mtb_3: '',
    };
    const condition4 = {
      sputum_afb: optionValue.NEGATIVE,
      cbnaat_trunat: optionValue.AVAILABLE,
      mtb_1: optionValue.NOT_DETECTED,
      truenat: optionValue.AVAILABLE,
      mtb_2: optionValue.DETECTED,
      fl_lpa_result: optionValue.NOT_AVAILABLE,
      mtb_3: '',
    };

    const condition5 = {
      sputum_afb: optionValue.NEGATIVE,
      cbnaat_trunat: optionValue.AVAILABLE,
      mtb_1: optionValue.NOT_DETECTED,
      truenat: optionValue.NOT_AVAILABLE,
      mtb_2: '',
      fl_lpa_result: optionValue.AVAILABLE,
      mtb_3: optionValue.NOT_DETECTED,
    };

    const condition6 = {
      sputum_afb: optionValue.NEGATIVE,
      cbnaat_trunat: optionValue.AVAILABLE,
      mtb_1: optionValue.INVALID,
      truenat: optionValue.NOT_AVAILABLE,
      mtb_2: '',
      fl_lpa_result: optionValue.NOT_AVAILABLE,
      mtb_3: '',
    };

    const condition7 = {
      sputum_afb: optionValue.NEGATIVE,
      cbnaat_trunat: optionValue.AVAILABLE,
      mtb_1: optionValue.NOT_DETECTED,
      truenat: optionValue.AVAILABLE,
      mtb_2: optionValue.INVALID,
      fl_lpa_result: optionValue.NOT_AVAILABLE,
      mtb_3: '',
    };

    const condition8 = {
      sputum_afb: optionValue.NEGATIVE,
      cbnaat_trunat: optionValue.AVAILABLE,
      mtb_1: optionValue.NOT_DETECTED,
      truenat: optionValue.AVAILABLE,
      mtb_2: optionValue.NOT_DETECTED,
      fl_lpa_result: optionValue.AVAILABLE,
      mtb_3: optionValue.INVALID,
    };

    const condition9 = {
      sputum_afb: optionValue.NOT_AVAILABLE,
      cbnaat_trunat: optionValue.NOT_AVAILABLE,
      mtb_1: '',
      truenat: optionValue.NOT_AVAILABLE,
      mtb_2: '',
      fl_lpa_result: optionValue.NOT_AVAILABLE,
      mtb_3: '',
    };

    const condition10 = {
      sputum_afb: optionValue.NOT_AVAILABLE,
      cbnaat_trunat: optionValue.AVAILABLE,
      mtb_1: optionValue.NOT_DETECTED,
      truenat: optionValue.NOT_AVAILABLE,
      mtb_2: '',
      fl_lpa_result: optionValue.NOT_AVAILABLE,
      mtb_3: '',
    };

    const condition11 = {
      sputum_afb: optionValue.NOT_AVAILABLE,
      cbnaat_trunat: optionValue.AVAILABLE,
      mtb_1: optionValue.NOT_DETECTED,
      truenat: optionValue.AVAILABLE,
      mtb_2: optionValue.NOT_DETECTED,
      fl_lpa_result: optionValue.NOT_AVAILABLE,
      mtb_3: '',
    };

    const condition12 = {
      sputum_afb: optionValue.NOT_AVAILABLE,
      cbnaat_trunat: optionValue.AVAILABLE,
      mtb_1: optionValue.NOT_DETECTED,
      truenat: optionValue.AVAILABLE,
      mtb_2: optionValue.DETECTED,
      fl_lpa_result: optionValue.NOT_AVAILABLE,
      mtb_3: '',
    };

    const condition13 = {
      sputum_afb: optionValue.NOT_AVAILABLE,
      cbnaat_trunat: optionValue.AVAILABLE,
      mtb_1: optionValue.NOT_DETECTED,
      truenat: optionValue.NOT_AVAILABLE,
      mtb_2: '',
      fl_lpa_result: optionValue.AVAILABLE,
      mtb_3: optionValue.NOT_DETECTED,
    };

    const condition14 = {
      sputum_afb: optionValue.NOT_AVAILABLE,
      cbnaat_trunat: optionValue.AVAILABLE,
      mtb_1: optionValue.INVALID,
      truenat: optionValue.NOT_AVAILABLE,
      mtb_2: '',
      fl_lpa_result: optionValue.NOT_AVAILABLE,
      mtb_3: '',
    };

    const condition15 = {
      sputum_afb: optionValue.NOT_AVAILABLE,
      cbnaat_trunat: optionValue.AVAILABLE,
      mtb_1: optionValue.NOT_DETECTED,
      truenat: optionValue.AVAILABLE,
      mtb_2: optionValue.INVALID,
      fl_lpa_result: optionValue.NOT_AVAILABLE,
      mtb_3: '',
    };

    const condition16 = {
      sputum_afb: optionValue.NOT_AVAILABLE,
      cbnaat_trunat: optionValue.AVAILABLE,
      mtb_1: optionValue.NOT_DETECTED,
      truenat: optionValue.AVAILABLE,
      mtb_2: optionValue.NOT_DETECTED,
      fl_lpa_result: optionValue.AVAILABLE,
      mtb_3: optionValue.INVALID,
    };

    const condition17 = {
      sputum_afb: optionValue.NEGATIVE,
      cbnaat_trunat: optionValue.NOT_AVAILABLE,
      mtb_1: '',
      truenat: optionValue.AVAILABLE,
      mtb_2: optionValue.NOT_DETECTED,
      fl_lpa_result: optionValue.NOT_AVAILABLE,
      mtb_3: '',
    };
    const condition18 = {
      sputum_afb: optionValue.NEGATIVE,
      cbnaat_trunat: optionValue.NOT_AVAILABLE,
      mtb_1: '',
      truenat: optionValue.AVAILABLE,
      mtb_2: optionValue.INVALID,
      fl_lpa_result: optionValue.NOT_AVAILABLE,
      mtb_3: '',
    };

    const condition19 = {
      sputum_afb: optionValue.NEGATIVE,
      cbnaat_trunat: optionValue.NOT_AVAILABLE,
      mtb_1: '',
      truenat: optionValue.NOT_AVAILABLE,
      mtb_2: '',
      fl_lpa_result: optionValue.AVAILABLE,
      mtb_3: optionValue.INVALID,
    };
    const condition20 = {
      sputum_afb: optionValue.NEGATIVE,
      cbnaat_trunat: optionValue.NOT_AVAILABLE,
      mtb_1: '',
      truenat: optionValue.NOT_AVAILABLE,
      mtb_2: '',
      fl_lpa_result: optionValue.AVAILABLE,
      mtb_3: optionValue.NOT_DETECTED,
    };

    const isOtherInvestigationAvailableSuggestiveClinicalQuestion =
      _quesKey === 'other_investigation_available_suggestive_tb_clinical_sign';

    if (isPregnancyQuestion) {
      return isMaleOrTransgenderOrEmpty;
    } else if (isOtherInvestigationAvailableSuggestiveClinicalQuestion) {
      const conditions = [
        condition1,
        condition2,
        condition3,
        condition4,
        condition5,
        condition6,
        condition7,
        condition8,
        condition9,
        condition10,
        condition11,
        condition12,
        condition13,
        condition14,
        condition15,
        condition16,
        condition17,
        condition18,
        condition19,
        condition20,
      ];
      const userInput = {
        sputum_afb,
        cbnaat_trunat,
        mtb_1,
        truenat,
        mtb_2,
        fl_lpa_result,
        mtb_3,
      };
      const result = shouldShowIsOtherInvestigationQuestion(
        userInput,
        conditions
      );
      return !result;
    } else if (isRepeatCbnaatQuestion) {
      return isRepeatCbnaat1ConditionMet;
    } else {
      return false;
    }
  };

  return (
    <View
      key={quesKey}
      style={{
        flexDirection: 'row',
      }}
    >
      {isSubQuestion && (
        <DropdownArrowSvg
          style={{
            alignSelf: 'center',
            marginRight: 10,
            transform: [{ rotate: '270deg' }],
          }}
        />
      )}

      {!shouldHideQuestion(quesKey, values) && (
        <View style={{ flex: 1 }}>{renderInputField()}</View>
      )}
    </View>
  );
};

const ManageTBForm: React.FC<ScreenProps<'manageTBForm'>> = ({
  navigation,
  route,
}) => {
  const { colors } = useTheme() as ThemeProps;
  const scrollViewRef = useRef<ScrollView>(null);
  const dispatch = useDispatch();
  const [isResetFormModal, resetFormModal] = useState(false);
  const [activeDiscordance, setDiscordance] = useState<[string, string]>([
    '',
    '',
  ]);
  const [openTabs, setOpenTabs] = useState({
    form1: true,
    form2: false,
    form3: false,
    form4: false,
    form5: false,
  });

  const handleSubmit = (
    values: PatientFormData,
    { setSubmitting, setErrors }: FormikHelpers<FormikValues>
  ) => {
    function checkAndConvertToNumber(value) {
      return (typeof value === 'string' ? value : parseInt(value)) || 0;
    }

    const newVal: PatientFormData = {
      ...values,
      age: checkAndConvertToNumber(values?.age),
      weight: checkAndConvertToNumber(values?.weight),
      height: checkAndConvertToNumber(values?.height),
      heartrate: checkAndConvertToNumber(values?.heartrate),
      qtcf: checkAndConvertToNumber(values?.qtcf),
      bmi: parseInt(values?.bmi) || 0,
      qt_interval: parseInt(values?.qt_interval) || 0,
      site_of_disease: values?.site_of_disease,
      chest_x_ray: 'no Question',
    };

    console.log({ newVal });
    dispatch(
      createAction<ManageTbApiRequest, PatientResponse>(
        {
          method: 'POST',
          url: 'MANAGE_TB',
          data: newVal,
        },
        (code, res) => {
          if (code === 200 && res?.data) {
            storeSubscriberActivity({
              module: 'ManageTB India',
              action: 'store Manage Tb Details',
              dispatch: dispatch,
            });
            navigation.navigate('prescriptionScreen', {
              data: res?.data,
              name: values?.name,
              nikshayId: values?.nikshayId,
            });
          } else if (code === 400 && res?.errors) {
            const errorObject = res?.errors?.reduce((acc, error) => {
              const key = Object.keys(error)[0]; // Get the actual key from the object (e.g., 'Age' or 'Weight')
              const lowerCaseKey = key.charAt(0).toLowerCase() + key.slice(1); // Convert the first letter to lowercase
              acc[lowerCaseKey] = error[key]; // Assign the error message
              return acc;
            }, {});
            setErrors(errorObject);
          } else {
            alert('Oops! An error occurred. Please try again shortly.');
          }
          setSubmitting(false);
        }
      )
    );
  };

  const { theme } = route.params;
  const FrontCard = (v, isError): React.ReactNode => {
    return (
      <TouchableHighlight
        onPress={() => {
          scrollViewRef.current?.scrollTo({ animated: true, y: 0 });
          setOpenTabs({
            ...{
              form1: false,
              form2: false,
              form3: false,
              form4: false,
              form5: false,
            },
            [v]: !openTabs?.[v],
          });
        }}
        style={[
          {
            marginHorizontal: RFValue(15),
            backgroundColor: '#F8F8F8',
            borderRadius: RFValue(15),
            borderRightWidth: RFValue(3),
            borderCurve: 'circular',
            borderBottomWidth: RFValue(1),
            marginTop: RFValue(10),
            elevation: RFValue(2),
            borderColor: colors.BLUE_007BFF,
          },
          isError && {
            borderWidth: 1,
            borderColor: colors.RED_C62828,
            shadowColor: 'red',
          },
        ]}
        underlayColor={'white'}
      >
        <Row
          style={{
            justifyContent: 'space-between',
            padding: RFValue(15),
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={[
              fontStyles.Maison_500_17PX_20LH,
              { color: theme.colors.BLACK_000000 },
            ]}
          >
            {ManageTBQuestions?.[v]?.title}
          </Text>
          <DropdownArrowSvg
            style={{
              transform: [{ rotate: openTabs?.[v] ? '180deg' : '360deg' }],
            }}
            height={RFValue(23)}
            width={RFValue(23)}
            stroke={theme.colors.BLACK_000000}
          />
        </Row>
      </TouchableHighlight>
    );
  };

  function closeModal() {}

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.WHITE_FFFF,
      }}
    >
      <Modal
        transparent
        visible={false}
        animationType='none'
        onDismiss={closeModal}
        onRequestClose={closeModal}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.2)', // Black glass background
          }}
          onTouchEnd={closeModal}
        >
          <View
            style={{
              position: 'absolute',
              padding: RFValue(20),
              backgroundColor: 'white',
              borderRadius: RFValue(10),
              elevation: 5,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
            }}
          >
            <Text style={fontStyles.Maison_500_13PX_15LH}>
              Oops! An error occurred. Please try again shortly.
            </Text>
            {/* < */}
          </View>
        </View>
      </Modal>
      <Formik
        // initialValues={ManageTBInitialValues}
        initialValues={DefaultValue}
        validationSchema={manageTBvalidationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          setValues,
          setSubmitting,
          resetForm,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
          setFieldTouched,
          isSubmitting,
        }) => {
          function checkDiscordance(key, value, values) {
            if (
              key === 'bmi' &&
              Boolean(errors?.bmi) &&
              !(Boolean(errors?.weight) && Boolean(errors?.height))
            ) {
              setValues({ ...values, height: '', weight: '' });
              setDiscordance(['condition24', key]);
            } else if (key === 'qt_interval' || key === 'heartrate') {
              const heartrate = key === 'heartrate' ? value : values?.heartrate;
              const qt_interval =
                key === 'qt_interval' ? value : values?.qt_interval;
              if (heartrate && qt_interval) {
                const qtcf = (
                  qt_interval / Math.pow(60 / heartrate, 1 / 3)
                ).toFixed(2);
                setFieldValue('qtcf', qtcf, true);
                if (
                  parseFloat(qtcf) >= 480 &&
                  values?.serum_electrolytes === 'Abnormal'
                ) {
                  setDiscordance(['condition19', key]);
                } else if (parseFloat(qtcf) >= 500) {
                  setDiscordance(['condition18', 'qtcf']);
                }
              } else {
                setFieldValue('qtcf', '0.00', true);
              }
            }

            if (
              !isEmpty(activeDiscordance[0]) &&
              checkDiscordanceCondition[activeDiscordance[0]]?.hasOwnProperty(
                key
              )
            ) {
              setDiscordance(['', '']);
            }

            for (const conditionKey of Object.keys(checkDiscordanceCondition)) {
              const condition = checkDiscordanceCondition[conditionKey];

              if (
                condition[key] === value &&
                Object.keys(condition).every(
                  (k) => k === key || values[k] === condition[k]
                )
              ) {
                if (isEmpty(activeDiscordance[0])) {
                  setDiscordance([conditionKey, key]);
                }
                break; // Exit loop after finding the match
              }
            }
          }
          // console.log(values);
          return (
            <React.Fragment>
              <ScrollView
                contentContainerStyle={{ paddingBottom: RFValue(20) }}
                showsVerticalScrollIndicator={false}
                ref={scrollViewRef}
              >
                {Object.keys(ManageTBQuestions).map((v) => {
                  const hasErrorInQuestions = (questions) => {
                    return questions?.some((item) => {
                      const hasSubQuestionError = item.subQuestion
                        ? Object.values(item.subQuestion).some((subQuestions) =>
                            hasErrorInQuestions(subQuestions)
                          )
                        : false;
                      return (
                        errors.hasOwnProperty(item.patientInfoKey) ||
                        hasSubQuestionError
                      );
                    });
                  };
                  const hasError = hasErrorInQuestions(
                    ManageTBQuestions[v].questions
                  );
                  // console.log({ _______________________: errors });
                  return (
                    <View key={v + 'key'}>
                      {v === 'form5' &&
                      !(
                        values.rifampicin_resistance_1 === 'Detected' ||
                        values.rifampicin_resistance_2 === 'Detected' ||
                        values.rifampicin_resistance_3 === 'Detected' ||
                        values.rifampicin_resistance_4 === 'Detected'
                      )
                        ? null
                        : FrontCard(v, hasError)}
                      {openTabs?.[v] && (
                        <View
                          style={{
                            backgroundColor: '#F8F8F8',
                            margin: RFValue(15),
                            padding: RFValue(10),
                            borderRadius: RFValue(10),
                            marginTop: 0,
                          }}
                        >
                          {ManageTBQuestions?.[v]?.questions?.map(
                            (question, questionIndex) => {
                              const quesKey = question?.patientInfoKey;
                              const subQuestions =
                                question?.subQuestion?.[values?.[quesKey]];
                              const isSubQuestionActive =
                                subQuestions !== undefined;
                              const renderSubQuestions = (
                                subQuestionsArray,
                                prefix = 'sub'
                              ) => {
                                return subQuestionsArray?.map(
                                  (subQuestion, subIndex) => {
                                    const subQuesKey =
                                      subQuestion?.patientInfoKey;
                                    const nestedSubQuestions =
                                      subQuestion?.subQuestion?.[
                                        values?.[subQuesKey]
                                      ];
                                    const isNestedSubQuestionActive =
                                      nestedSubQuestions !== undefined;
                                    return (
                                      <View key={`${prefix}-${subIndex}`}>
                                        <QuestionNode
                                          checkDiscordance={checkDiscordance}
                                          errors={errors}
                                          key={`${prefix}-${subIndex + 1}`}
                                          isSubQuestion={true}
                                          quesKey={subQuesKey}
                                          question={subQuestion}
                                          setValues={setValues}
                                          setFieldTouched={setFieldTouched}
                                          setFieldValue={setFieldValue}
                                          touched={touched}
                                          values={values}
                                        />
                                        {isNestedSubQuestionActive &&
                                          renderSubQuestions(
                                            nestedSubQuestions,
                                            `${prefix}-nested`
                                          )}
                                      </View>
                                    );
                                  }
                                );
                              };
                              return (
                                <View
                                  key={questionIndex}
                                  style={
                                    isSubQuestionActive && {
                                      borderWidth: 0.3,
                                      borderRadius: RFValue(10),
                                      padding: RFValue(10),
                                      marginTop: RFValue(5),
                                      paddingTop: 0,
                                    }
                                  }
                                >
                                  <QuestionNode
                                    checkDiscordance={checkDiscordance}
                                    errors={errors}
                                    key={questionIndex + '-'}
                                    quesKey={quesKey}
                                    question={
                                      !isEmpty(
                                        checkDiscordanceCondition?.[
                                          activeDiscordance[0]
                                        ]
                                      )
                                        ? {
                                            ...question,
                                            isDisabled: !Object.keys(
                                              checkDiscordanceCondition?.[
                                                activeDiscordance[0]
                                              ]
                                            ).includes(quesKey),
                                          }
                                        : question
                                    }
                                    setFieldTouched={setFieldTouched}
                                    setFieldValue={setFieldValue}
                                    setValues={setValues}
                                    touched={touched}
                                    values={values}
                                  />
                                  {isSubQuestionActive &&
                                    renderSubQuestions(subQuestions)}
                                </View>
                              );
                            }
                          )}
                        </View>
                      )}
                    </View>
                  );
                })}
              </ScrollView>
              <Modal
                animationType='slide'
                visible={!isEmpty(activeDiscordance[0])}
                transparent
                onRequestClose={() => {
                  setDiscordance(['', '']);
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: '#00000096',
                  }}
                >
                  <View
                    style={[
                      {
                        margin: RFValue(20),
                        backgroundColor: theme.colors.WHITE_FFFF,
                        borderRadius: RFValue(20),
                        padding: RFValue(15),
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: RFValue(0.25),
                        shadowRadius: RFValue(4),
                        elevation: 5,
                        shadowColor: colors.BLACK_000000,
                      },
                    ]}
                  >
                    <Row style={{ paddingVertical: RFValue(15) }}>
                      <Text
                        style={{
                          ...fontStyles.Maison_600_18PX_20LH,
                          color: AttentionHeaderText?.includes(
                            activeDiscordance[0]
                          )
                            ? '#FFA500'
                            : '#FF4500',
                        }}
                      >
                        {AttentionHeaderText?.includes(activeDiscordance[0])
                          ? 'Attention'
                          : 'Discordance'}
                      </Text>
                    </Row>
                    <Text
                      style={{
                        padding: RFValue(10),
                        borderColor: 'gray',
                        borderRadius: RFValue(10),
                        borderWidth: RFValue(1),
                        color: colors.GREY_797979,
                        marginVertical: RFValue(5),
                      }}
                    >
                      {(!isEmpty(activeDiscordance) &&
                        discordanceMessages[activeDiscordance[0]]) ||
                        '---'}
                    </Text>
                    <View
                      style={{
                        backgroundColor: theme.colors.WHITE_FFFF,
                        width: '100%',
                      }}
                    >
                      <Button
                        onPress={() => {
                          setDiscordance(['', '']);
                          setFieldValue(activeDiscordance[1], '', true);
                        }}
                        title='Ok'
                        textStyle={fontStyles.Maison_500_13PX_20LH}
                        bgColor={colors.DARK_BLUE_394F89}
                        containerStyle={{ marginVertical: RFValue(10) }}
                      />
                    </View>
                  </View>
                </View>
              </Modal>
              <Modal
                animationType='slide'
                visible={isResetFormModal}
                transparent
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: '#00000099',
                  }}
                >
                  <View
                    style={[
                      {
                        margin: RFValue(20),
                        backgroundColor: theme.colors.WHITE_FFFF,
                        borderRadius: RFValue(20),
                        padding: RFValue(15),
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: RFValue(0.25),
                        shadowRadius: RFValue(4),
                        elevation: 5,
                        shadowColor: colors.BLACK_000000,
                      },
                    ]}
                  >
                    <Row style={{ paddingVertical: RFValue(15) }}>
                      <Text
                        style={{
                          ...fontStyles.Maison_500_16PX_21LH,
                        }}
                      >
                        Are you sure you want to Reset this form?
                      </Text>
                    </Row>
                    <View
                      style={{
                        backgroundColor: theme.colors.WHITE_FFFF,
                        width: '100%',
                      }}
                    >
                      <Row>
                        <Button
                          onPress={() => {
                            resetFormModal(false);
                          }}
                          title='Cancel'
                          textStyle={[
                            fontStyles.Maison_500_13PX_20LH,
                            {
                              color: theme.colors.BLACK_000000,
                            },
                          ]}
                          bgColor={colors.WHITE_FFFF}
                          containerStyle={{
                            margin: RFValue(10),
                            flex: 1,
                            borderWidth: 1,
                          }}
                        />
                        <Button
                          onPress={() => {
                            setOpenTabs({
                              form1: false,
                              form2: false,
                              form3: false,
                              form4: false,
                              form5: false,
                            });
                            resetForm();
                            resetFormModal(false);
                          }}
                          title='OK'
                          textStyle={fontStyles.Maison_500_13PX_20LH}
                          bgColor={colors.DARK_BLUE_394F89}
                          containerStyle={{ margin: RFValue(10), flex: 1 }}
                        />
                      </Row>
                    </View>
                  </View>
                </View>
              </Modal>
              <View
                style={{
                  alignSelf: 'flex-end',
                  position: 'absolute',
                  bottom: RFValue(10),
                }}
              >
                <Button
                  title=''
                  leftIcon={
                    <ArrowSvg
                      stroke={theme.colors.WHITE_FFFF}
                      style={{ transform: [{ rotate: '270deg' }] }}
                    />
                  }
                  bgColor='#0C3896'
                  onPress={() => {
                    scrollViewRef.current?.scrollTo({ animated: true, y: 0 });
                  }}
                  containerStyle={{
                    alignSelf: 'flex-end',
                    marginHorizontal: RFValue(10),
                    borderRadius: RFValue(90),
                    paddingVertical: RFValue(5),
                    paddingHorizontal: RFValue(3),
                  }}
                />
                <Button
                  title='  Submit  '
                  loaderEnable
                  disabled={isSubmitting}
                  onPress={() => {
                    handleSubmit();
                  }}
                  bgColor='#0C3896'
                  containerStyle={{
                    margin: RFValue(5),
                    padding: RFValue(10),
                    borderRadius: RFValue(30),
                  }}
                />
              </View>
            </React.Fragment>
          );
        }}
      </Formik>
    </View>
  );
};
export default ManageTBForm;
