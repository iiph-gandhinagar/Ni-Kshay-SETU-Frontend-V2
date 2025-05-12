import React, { useEffect } from 'react';
import { singleForm } from '../../pages/manage-tb-form';
import { optionValue, Question } from '../../pages/manage-tb-form/questionData';
import { FormField } from './FormField';
// types
type FormFieldProps = Record<string, Question>;

//
export const ClinicalProfile: React.FC<singleForm> = ({
  form,
  getFormNewSate,
}) => {
  // new
  const formField: FormFieldProps = form.questions.reduce(
    (acc: FormFieldProps, field: Question) => {
      acc[field.name] = field;
      return acc;
    },
    {}
  );

  const extraPropsPass = { getFormNewSate };

  const isFemale =
    getFormNewSate.current.formik.values.sex == optionValue.FEMALE;

  //   const container = document.querySelector('.respiratory_rate-label');
  //   if (container) {
  //     // Create a new element
  //     const newElement = document.createElement('div');
  //     newElement.className = 'new-component';
  //     newElement.textContent = 'This is a new appended component!';

  //     // Append the new element to the container
  //     container.appendChild(newElement);
  //   }
  // };

  const appendComponent = () => {
    // Use querySelector to find the container element
    const container = document.querySelector('.respiratory_rate-label');
    if (container) {
      // Create a new element
      const newElement = document.createElement('div');
      // formField.respiratory_rate.label
      newElement.innerHTML = `
    <ul class="list-disc list-inside space-y-3">
      <li class="p-1 leading-[30px] rounded">Does any of the Parameters require hospitalization/Indicating Mortality?</li>
      <li class="p-1 rounded">Patient confined to bed and unable to stand unassisted</li>
      <li class="p-1 rounded">Respiratory rate > 24 breaths per minute</li>
      <li class="p-1 rounded">SpO₂ < 94% at room air</li>
      <li class="p-1 rounded">Systolic BP < 90 mm Hg</li>
      <li class="p-1 rounded">Pulse Rate > 120/min</li>
      <li class="p-1 rounded">BMI < 14 kg/m² or BMI < 16 kg/m² with oedema</li>
    </ul>`;

      // Append the new element to the container
      container.appendChild(newElement);
    }
  };
  useEffect(() => {
    // Append a component when the component mounts (optional)
    appendComponent();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className='pt-[12px] space-y-4'>
      <div className='grid md:grid-cols-12 gap-[12px]'>
        <div className='col-span-12'>
          <FormField
            {...{
              ...formField.respiratory_rate,
              label: '' as string,
              ...extraPropsPass,
            }}
          ></FormField>
        </div>
      </div>

      <div className='grid md:grid-cols-12 gap-[12px]'>
        <div className='col-span-12'>
          <FormField
            {...{ ...formField.site_of_disease, ...extraPropsPass }}
          ></FormField>
        </div>
        <div className='col-span-12'>
          <div>
            <FormField {...{ ...formField.hiv, ...extraPropsPass }}></FormField>
          </div>
        </div>
        <div className='col-span-12'>
          <div>
            <FormField
              {...{ ...formField.past_history_att, ...extraPropsPass }}
            ></FormField>
          </div>
        </div>
        <div className='col-span-12'>
          <div>
            <FormField
              {...{
                ...formField.suffering_from_any_chronic_illness,
                ...extraPropsPass,
              }}
            ></FormField>
          </div>
        </div>
      </div>
      {isFemale && (
        <div className='col-span-12'>
          <div>
            <FormField
              {...{
                ...formField.pregnancy,
                ...extraPropsPass,
              }}
            ></FormField>
          </div>
        </div>
      )}
    </div>
  );
};
