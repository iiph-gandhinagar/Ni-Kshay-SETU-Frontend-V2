import React, { useState } from 'react';
import { singleForm } from '../../pages/manage-tb-form';
import { optionValue, Question } from '../../pages/manage-tb-form/questionData';
import { FormField } from './FormField';

// types
type FormFieldProps = Record<string, Question>;

export const PreTreatmentEvaluation: React.FC<singleForm> = ({
  form,
  getFormNewSate,
}) => {
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionChange = (option: string | null) => {
    setSelectedOption(option);
  };

  // new
  const formField: FormFieldProps = form.questions.reduce(
    (acc: FormFieldProps, field: Question) => {
      acc[field.name] = field;
      return acc;
    },
    {}
  );

  const extraPropsPass = { getFormNewSate };

  const qtcfSetHandler = function (event: React.FormEvent<HTMLInputElement>) {
    const qtInterval = Number(getFormNewSate.current.formik.values.qt_interval);
    const heartRate = Number(getFormNewSate.current.formik.values.heartrate);
    let newValueOfQtcf = getFormNewSate.current.formik.initialValues.qtcf;

    if (qtInterval && heartRate) {
      newValueOfQtcf = (qtInterval / Math.pow(60 / heartRate, 1 / 3)).toFixed(
        2
      );
    }
    getFormNewSate.current.formik.setFieldValue('qtcf', newValueOfQtcf);

    if (newValueOfQtcf && Number(newValueOfQtcf) >= 500) {
      const clearValueName = event.currentTarget.name;
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
        conditionName: 'condition18',
      });
    }

    queueMicrotask(() => {
      return condition19AttentionCheck(event);
    });
  };

  const condition19AttentionCheck = ({
    target,
  }: React.FormEvent<HTMLInputElement>) => {
    const qtcfValue = Number(getFormNewSate.current.formik.values.qtcf);
    const serumElectrolytesValue =
      getFormNewSate.current.formik.values.serum_electrolytes;

    if (
      qtcfValue &&
      serumElectrolytesValue &&
      qtcfValue == 480 &&
      serumElectrolytesValue == optionValue.ABNORMAL
    ) {
      const element = target as HTMLInputElement;
      const clearValueName = element.name;

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
        conditionName: 'condition19',
      });
    }
  };

  return (
    <div className='pt-[12px] space-y-4'>
      <div className='grid md:grid-cols-12 gap-[12px]'>
        <div className='col-span-12'>
          <div className={showQuestion ? 'rounded-xl p-4 border' : ''}>
            <FormField
              {...{ ...formField.hb_level, ...extraPropsPass }}
            ></FormField>
          </div>
        </div>
        <div className='col-span-8'>
          <FormField
            {...{ ...formField.kidney_func_test, ...extraPropsPass }}
          ></FormField>
        </div>
        <div className='col-span-4'>
          <FormField
            {...{ ...formField.thyroid_func_tests, ...extraPropsPass }}
          ></FormField>
        </div>
        <div className='col-span-12'>
          <FormField
            {...{ ...formField.liver_func_test, ...extraPropsPass }}
          ></FormField>
        </div>
        <div className='col-span-6'>
          <FormField
            {...{
              ...formField.serum_electrolytes,
              onBlur: condition19AttentionCheck,
              ...extraPropsPass,
            }}
          ></FormField>
        </div>
        <div className='col-span-6'>
          <FormField
            {...{
              ...formField.heartrate,
              onBlur: qtcfSetHandler,
              ...extraPropsPass,
            }}
          ></FormField>
        </div>
        <div className='col-span-6'>
          <FormField
            {...{
              ...formField.qt_interval,
              onBlur: qtcfSetHandler,
              ...extraPropsPass,
              ...extraPropsPass,
            }}
          ></FormField>
        </div>

        <div className='col-span-6'>
          <FormField {...{ ...formField.qtcf, ...extraPropsPass }}></FormField>
        </div>
        <div className='col-span-6'>
          <FormField
            {...{ ...formField.audiometry, ...extraPropsPass }}
          ></FormField>
        </div>
        <div className='col-span-6'>
          <FormField
            {...{ ...formField.eye_exam_fundus, ...extraPropsPass }}
          ></FormField>
        </div>

        <div className='col-span-12'>
          <FormField
            {...{ ...formField.peripheral_neuropathy, ...extraPropsPass }}
          ></FormField>
        </div>
      </div>
    </div>
  );
};
