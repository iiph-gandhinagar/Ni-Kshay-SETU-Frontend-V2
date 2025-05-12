import { DropdownArrowSvg } from '@nikshay-setu-v3-monorepo/assets';
import React, { ChangeEvent, useEffect } from 'react';
import { getFormNewSateProps } from '../../pages/manage-tb-form';
import {
  checkDiscordanceCondition,
  emptyDependedQuestion,
  optionValue,
  Question,
} from '../../pages/manage-tb-form/questionData';
import {
  BorderedInput,
  BorderedInputProps,
  FormRadio,
} from '../Inputs/FormInput';

type FormFieldProps = {
  label: string;
  name: string;
  type: 'select' | Exclude<BorderedInputProps['type'], undefined>;
  options?: string[];
  placeholder?: string;
  isDisabled?: boolean;
  subQuestion?: Record<string, Question[]>;
  nestedArrow?: boolean;
  getFormNewSate: getFormNewSateProps;
  onChange?: () => void;
  onBlur?: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
};
export const FormField = ({
  label,
  name,
  type,
  placeholder,
  isDisabled,
  options,
  subQuestion,
  nestedArrow,
  getFormNewSate,
  onChange,
  onBlur,
}: FormFieldProps) => {
  // if nested question base on condition then remove after unmount

  const formik = getFormNewSate.current.formik;

  let handleChangeValue = onChange ? onChange : formik.handleChange;
  const value = formik.values[name];
  const error = formik.errors[name];
  const touched = formik.touched[name];

  if (name == 'mgit_dst_result') {
    handleChangeValue = (event: React.FormEvent<HTMLInputElement>) => {
      const elementValue = event.currentTarget.value;
      if (elementValue == optionValue.NOT_AVAILABLE) {
        Object.entries(emptyDependedQuestion.mgit_dst_result).map(
          ([key, value]) => {
            formik.setFieldValue(key, value, true);
          }
        );
        formik.setFieldValue(
          'mgit_dst_result',
          optionValue.NOT_AVAILABLE,
          true
        );
      } else {
        formik.handleChange(event);
      }
    };
  }

  const checkConditionOfModal = debouncingCheckConditionOfModal();
  // warp for condition check
  const handleChangeWarper = (event: React.FormEvent<HTMLInputElement>) => {
    handleChangeValue(event);
    checkConditionOfModal(getFormNewSate, name);
    queueMicrotask(() => {
      if (type == 'radio' && typeof onBlur == 'function') {
        onBlur(event as ChangeEvent<HTMLInputElement>);
      }
    });

    if (
      name == 'rifampicin_resistance_2' ||
      name == 'rifampicin_resistance_1'
    ) {
      queueMicrotask(() => {
        getFormNewSate.current.condition24Check(event);
      });
    }

    //  condition23Check
    if (
      [
        'rifampicin_resistance_2',
        'fl_lpa_resultValue',
        'inh_a_low',
        'katg_high',
      ].includes(name)
    ) {
      queueMicrotask(() => {
        getFormNewSate.current.condition23Check(event);
      });
    }
  };

  useEffect(() => {
    return () => {
      if (
        ['mtb_1', 'if_mtb_present_1', 'rifampicin_resistance_1']?.includes(name)
      ) {
        if (formik.values?.cbnaat_trunat === optionValue.AVAILABLE) {
          getFormNewSate.current.formik.setFieldValue(name, '');
        }
      } else {
        getFormNewSate.current.formik.setFieldValue(
          name,
          getFormNewSate.current.formik.initialValues[name]
        );
      }
    };
  }, []);
  return (
    <>
      <div className='flex items-center gap-1 mt-[12px]'>
        {nestedArrow && (
          <img
            src={DropdownArrowSvg}
            alt='Arrow Down'
            className='-rotate-90 mt-[20px]'
          />
        )}
        <div className='flex-grow'>
          {type == 'radio' ? (
            <FormRadio
              onChange={handleChangeWarper}
              checkedValue={formik?.values[name]}
              {...{
                label,
                name,
                placeholder,
                disabled: isDisabled,
                options,
                errors: error,
                touched,
              }}
            />
          ) : type == 'select' ? (
            ''
          ) : (
            <BorderedInput
              {...{
                label,
                name,
                type,
                placeholder,
                disabled: isDisabled,
                onChange: handleChangeWarper,
                value: formik?.values[name],
                errors: error,
                touched,
                onBlur,
              }}
              labelClassName='!text-BLUE_3965C2 text-[18px] md:text-base'
              customClassName='!text-[16px] md:!text-[18px] placeholder:text-LIGHT_GREY_B0B0B0'
              inputWrapperClassName='!mt-3'
              wrapperClassName='!pb-3 bg-white'
            />
          )}
        </div>
      </div>

      {subQuestion &&
        Object.entries(subQuestion).map(
          ([checkValue, nestedSubQuestions]: [string, Question[]], index) => {
            return (
              <React.Fragment key={index}>
                {value == checkValue &&
                  nestedSubQuestions.map((nestedQuestion, index) => {
                    return (
                      <React.Fragment key={index}>
                        <div className='ms-3'>
                          <div key={nestedQuestion.name}>
                            <FormField
                              {...{
                                ...nestedQuestion,
                                nestedArrow: true,
                                getFormNewSate,
                              }}
                            ></FormField>
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}
              </React.Fragment>
            );
          }
        )}
    </>
  );
};

const debouncingCheckConditionOfModal = () => {
  let timeout: ReturnType<typeof setTimeout>;
  return (getFormNewSate: getFormNewSateProps, clearValueName: string) => {
    clearTimeout(timeout);
    timeout = setTimeout(
      () => checkConditionOfModal(getFormNewSate, clearValueName),
      500
    );
  };
};

export const checkConditionOfModal = (
  getFormNewSate: getFormNewSateProps,
  clearValueName: string
) => {
  Object.entries(checkDiscordanceCondition).map(
    ([conditionName, filedObjects]) => {
      let valid = true;

      Object.entries(filedObjects).map(
        ([fieldName, checkValue]: [string, string]) => {
          const value = getFormNewSate.current.formik.values[fieldName];
          if (value != checkValue) {
            valid = false;
          }
        }
      );

      if (valid) {
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
          conditionName,
        });
      }
    }
  );
};
