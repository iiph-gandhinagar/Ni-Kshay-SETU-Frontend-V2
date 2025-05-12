import React from 'react';
import { singleForm } from '../../pages/manage-tb-form';
import { optionValue, Question } from '../../pages/manage-tb-form/questionData';
import { FormField } from './FormField';

// types
type FormFieldProps = Record<string, Question>;

export const DiagnosticDetails: React.FC<singleForm> = ({
  form,
  getFormNewSate,
}) => {
  const extraPropsPass = { getFormNewSate };

  // new
  const formField: FormFieldProps = form.questions.reduce(
    (acc: FormFieldProps, field: Question) => {
      acc[field.name] = field;
      return acc;
    },
    {}
  );
  const formikValue = extraPropsPass.getFormNewSate.current.formik.values;

  const isRifampicin4Detected =
    formikValue.rifampicin_resistance_1 === optionValue.DETECTED;
  const isRifampicin3NotDetected =
    formikValue?.rifampicin_resistance_3 === optionValue.NOT_DETECTED;

  const isRifampicin4NotDetected =
    formikValue?.rifampicin_resistance_1 === optionValue.NOT_DETECTED;
  const isRifampicin3Detected =
    formikValue?.rifampicin_resistance_3 === optionValue.DETECTED;

  const isRepeatCbnaat1ConditionMet = !(
    (isRifampicin4Detected && isRifampicin3NotDetected) ||
    (isRifampicin4NotDetected && isRifampicin3Detected)
  );

  // ---------------------------------------------------------------------------------------------------------/////

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
    sputum_afb: formikValue?.sputum_afb,
    cbnaat_trunat: formikValue?.cbnaat_trunat,
    mtb_1: formikValue?.mtb_1,
    truenat: formikValue?.truenat,
    mtb_2: formikValue?.mtb_2,
    fl_lpa_result: formikValue?.fl_lpa_result,
    mtb_3: formikValue?.mtb_3,
  };

  const isOtherInvestigationQuestion = shouldShowIsOtherInvestigationQuestion(
    userInput,
    conditions
  );
  console.log(
    'userInput isOtherInvestigationQuestion---------------------->',
    isOtherInvestigationQuestion
  );
  return (
    <div className='pt-[12px] space-y-4'>
      <div className='grid sm:grid-cols-12 gap-[12px]'>
        <div className='col-span-12'>
          <FormField
            {...{ ...formField.sputum_afb, ...extraPropsPass }}
          ></FormField>
        </div>
        <div className='col-span-12'>
          <div>
            <FormField
              {...{ ...formField.cbnaat_trunat, ...extraPropsPass }}
            ></FormField>
          </div>
        </div>
        <div className='col-span-12'>
          <div>
            <FormField
              {...{ ...formField.truenat, ...extraPropsPass }}
            ></FormField>
          </div>
        </div>
        <div className='col-span-12'>
          <div>
            <FormField
              {...{ ...formField.fl_lpa_result, ...extraPropsPass }}
            ></FormField>
          </div>
        </div>
        {!isRepeatCbnaat1ConditionMet && (
          <div className='col-span-12'>
            <div>
              <FormField
                {...{
                  ...formField.repeat_cbnaat_result_available,
                  ...extraPropsPass,
                }}
              ></FormField>
            </div>
          </div>
        )}
        {isOtherInvestigationQuestion && (
          <div className='col-span-12'>
            <div>
              <FormField
                {...{
                  ...formField.other_investigation_available_suggestive_tb_clinical_sign,
                  ...extraPropsPass,
                }}
              ></FormField>
            </div>
          </div>
        )}

        <div className='col-span-12'>
          <div>
            <FormField
              {...{ ...formField.sl_lpa_result, ...extraPropsPass }}
            ></FormField>
          </div>
        </div>

        <div className='col-span-12'>
          <div>
            <FormField
              {...{ ...formField.naat_xdr, ...extraPropsPass }}
            ></FormField>
          </div>
        </div>
      </div>
    </div>
  );
};
