import React from 'react';
import { singleForm } from '../../pages/manage-tb-form';
import { Question } from '../../pages/manage-tb-form/questionData';
import { FormField } from './FormField';

// types
type PatientDetailsProps = singleForm;

type FormFieldProps = Record<string, Question>;

// page
export const PatientDetails: React.FC<PatientDetailsProps> = ({
  form,
  getFormNewSate,
}) => {
  const formField: FormFieldProps = form.questions.reduce(
    (acc: FormFieldProps, field: Question) => {
      acc[field.name] = field;
      return acc;
    },
    {}
  );

  const extraPropsPass = { getFormNewSate };

  const bmiSetHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const heightInCm = Number(getFormNewSate.current.formik.values.height);
    const weight = Number(getFormNewSate.current.formik.values.weight);

    if (heightInCm && weight) {
      const heightInMeters = heightInCm / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
      getFormNewSate.current.formik.setFieldValue('bmi', bmi.toFixed(2));

      queueMicrotask(() => {
        condition24AttentionCheck(Number(bmi.toFixed(2)));
      });
    } else {
      getFormNewSate.current.formik.setFieldValue(
        'bmi',
        getFormNewSate.current.formik.initialValues.bmi
      );
    }

    const element = event.target as HTMLInputElement;
    if (element.name == 'weight') {
      queueMicrotask(() => {
        getFormNewSate.current.condition24Check(event);
        getFormNewSate.current.condition23Check(event);
      });
    }
  };

  const condition24AttentionCheck = (bmiValue: number) => {
    if (bmiValue <= 10 || bmiValue >= 40) {
      const clearValueName = 'bmi';
      const callBack = () => {
        getFormNewSate.current.setDiscordanceModal({ isOpen: false });
        getFormNewSate.current.formik.setFieldValue(
          clearValueName,
          getFormNewSate.current.formik.initialValues[clearValueName]
        );
      };

      getFormNewSate.current.setDiscordanceModal({
        isOpen: true,
        callBack,
        conditionName: 'condition24',
      });
    }
  };

  const ageOnBlur = (event: React.FormEvent<HTMLInputElement>) => {
    getFormNewSate.current.condition24Check(event);
    getFormNewSate.current.condition23Check(event);
  };

  // ManageTBQuestions
  return (
    <div className='pt-[12px] space-y-4'>
      <div className='grid sm:grid-cols-12 gap-[12px]'>
        <div className='col-span-6'>
          <FormField {...{ ...formField.name, ...extraPropsPass }}></FormField>
          <div className='ms-3 mt-1 text-[#3965C2] text-[14px] font-semibold'>
            <p>Note: First two letters of First & Last Name</p>
            <p>Example: Ankit Sharma will be written as ANSH</p>
          </div>
        </div>
        <div className='col-span-6'>
          <FormField
            {...{ ...formField.nikshayId, ...extraPropsPass }}
          ></FormField>
        </div>
      </div>
      <div className='grid sm:grid-cols-12 gap-[12px]'>
        <div className='col-span-6'>
          <FormField
            {...{ ...formField.age, onBlur: ageOnBlur, ...extraPropsPass }}
          ></FormField>
        </div>
        <div className='col-span-6'>
          <FormField
            {...{
              ...formField.weight,
              onBlur: bmiSetHandler,
              ...extraPropsPass,
            }}
          ></FormField>
        </div>
      </div>
      <div className='grid sm:grid-cols-12 gap-[12px]'>
        <div className='col-span-12'>
          <FormField {...{ ...formField.sex, ...extraPropsPass }}></FormField>
        </div>
      </div>
      <div className='grid sm:grid-cols-12 gap-[12px]'>
        <div className='col-span-6'>
          <FormField
            {...{
              ...formField.height,
              onBlur: bmiSetHandler,
              ...extraPropsPass,
            }}
          ></FormField>
        </div>
        <div className='col-span-6'>
          <FormField {...{ ...formField.bmi, ...extraPropsPass }}></FormField>
        </div>
      </div>
    </div>
  );
};
