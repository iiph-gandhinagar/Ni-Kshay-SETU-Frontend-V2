import React from 'react';
import { singleForm } from '../../pages/manage-tb-form';
import { optionValue } from '../../pages/manage-tb-form/questionData';
import { FormField } from './FormField';

export const CultureReport: React.FC<singleForm> = ({
  form,
  getFormNewSate,
}) => {
  const extraPropsPass = { getFormNewSate };
  const formik = getFormNewSate.current.formik;

  return (
    <div className='pt-[12px] space-y-4'>
      <div className='grid md:grid-cols-2 gap-[12px]'>
        {form.questions.map((question, i) => {
          const isDisabled =
            question.name !== 'mgit_dst_result' &&
            formik.values.mgit_dst_result == optionValue.NOT_AVAILABLE;
          return (
            <div className='' key={i}>
              <FormField
                {...{ ...question, isDisabled, ...extraPropsPass }}
              ></FormField>
            </div>
          );
        })}
      </div>
    </div>
  );
};
