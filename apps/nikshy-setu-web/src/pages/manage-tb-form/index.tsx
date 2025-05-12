import {
  DefaultValue,
  manageTBvalidationSchema,
} from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  ManageTbApiRequest,
  ManageTBErrors,
  PatientFormData,
  PatientResponse,
} from '@nikshay-setu-v3-monorepo/types';
import { FormikHelpers, FormikProps, FormikValues, useFormik } from 'formik';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Accordion } from '../../components/Accordion/Accordion';
import { OutLineBtn, PrimaryBtn } from '../../components/Buttons/Btns';
import { CustomModal } from '../../components/Layouts/CustomModal';
import { ClinicalProfile } from '../../components/ManageTB/ClinicalProfile';
import { CultureReport } from '../../components/ManageTB/CultureReport';
import { DiagnosticDetails } from '../../components/ManageTB/DiagnosticDetails';
import { ErrorMessageModal } from '../../components/ManageTB/ErrorMessageModal';
import { PatientDetails } from '../../components/ManageTB/PatientDetails';
import { PreTreatmentEvaluation } from '../../components/ManageTB/PreTreatmentEvaluation';
import { Form, ManageTBQuestions, optionValue } from './questionData';

export type singleForm = {
  form: Form;
  getFormNewSate: getFormNewSateProps;
};

export type getFormNewSateProps = {
  current: {
    formik: FormikProps<Record<string, string>>;
    setDiscordanceModal: (
      state: Record<string, boolean | Function | string>
    ) => void;
    condition24Check: (e: React.FormEvent<HTMLInputElement>) => void;
    condition23Check: (e: React.FormEvent<HTMLInputElement>) => void;
  };
};

const ManageTBForm = () => {
  const getFormNewSate = useRef<any>();
  const [openSectionIndex, setOpenSectionIndex] = useState<string>(
    ManageTBQuestions.form1.title
  );
  const [resetFormModal, setResetFormModal] = useState(false);
  const [discordanceModal, setDiscordanceModal] = useState({
    isOpen: false,
    callBack: () => {},
    conditionName: '',
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleToggle = (title: string) => {
    setOpenSectionIndex(openSectionIndex === title ? '' : title);
  };

  const location = useLocation();
  const { formData } = location.state ?? {};

  const formik = useFormik({
    initialValues: formData ?? DefaultValue,
    validationSchema: manageTBvalidationSchema,
    onSubmit: async (
      values: PatientFormData,
      { setErrors, setSubmitting }: FormikHelpers<FormikValues>
    ) => {
      function checkAndConvertToNumber(value) {
        return (typeof value === 'string' ? parseInt(value) : value) || 0;
      }

      const newVal: PatientFormData = {
        ...values,
        age: checkAndConvertToNumber(values?.age),
        weight: checkAndConvertToNumber(values?.weight),
        height: checkAndConvertToNumber(values?.height),
        heartrate: checkAndConvertToNumber(values?.heartrate),
        qtcf: checkAndConvertToNumber(values?.qtcf),
        bmi: checkAndConvertToNumber(values?.bmi),
        qt_interval: checkAndConvertToNumber(values?.qt_interval),
        chest_x_ray: 'no Question',
      };

      console.log({ newVal });
      return new Promise<void>((resolve, reject) => {
        dispatch(
          createAction<ManageTbApiRequest, PatientResponse>(
            {
              method: 'POST',
              url: 'MANAGE_TB',
              data: newVal,
            },
            (code, res) => {
              resolve();
              if (code === 200 && res?.data) {
                navigate('/manage-tb-prescription', {
                  state: {
                    data: res?.data,
                    name: values?.name,
                    formData: newVal,
                  },
                });
              } else if (code === 400) {
                if (res?.errors) {
                  const errors: ManageTBErrors = res.errors;
                  const errorObject = errors?.reduce((acc, error) => {
                    const key = Object.keys(error)[0]; // Get the actual key from the object (e.g., 'Age' or 'Weight')
                    const lowerCaseKey =
                      key.charAt(0).toLowerCase() + key.slice(1); // Convert the first letter to lowercase
                    acc[lowerCaseKey] = error[key]; // Assign the error message
                    return acc;
                  }, {});
                  setErrors(errorObject);
                }
              } else {
                alert('Oops! An error occurred. Please try again shortly.');
              }
            }
          )
        );
      });
    },
  });

  getFormNewSate.current = {
    formik,
    setDiscordanceModal,
  };

  // last tab show or hide
  const PreTreatmentTabShow =
    formik.values.rifampicin_resistance_1 == optionValue.DETECTED ||
    formik.values.rifampicin_resistance_2 == optionValue.DETECTED ||
    formik.values.rifampicin_resistance_3 == optionValue.DETECTED ||
    formik.values.rifampicin_resistance_4 == optionValue.DETECTED;

  // condition24
  getFormNewSate.current.condition24Check = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const ageValue = Number(formik.values.age);
    const weightValue = Number(formik.values.weight);

    if (
      ((ageValue && ageValue <= 5) || (weightValue && weightValue <= 15)) &&
      PreTreatmentTabShow
    ) {
      const element = event.target as HTMLInputElement;
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
        conditionName: 'condition24',
      });
    }
  };

  // condition23
  getFormNewSate.current.condition23Check = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const ageValue = Number(formik.values.age);
    const weightValue = Number(formik.values.weight);
    const rifampicin_resistance_2IsNotDetected =
      formik.values.rifampicin_resistance_2 == optionValue.NOT_DETECTED;
    const inhAIsPresent = formik.values.inh_a_low == optionValue.PRESENT;
    const katGIsPresent = formik.values.katg_high == optionValue.PRESENT;

    if (
      ((ageValue && ageValue <= 5) || (weightValue && weightValue <= 15)) &&
      rifampicin_resistance_2IsNotDetected &&
      (inhAIsPresent || katGIsPresent)
    ) {
      const element = event.target as HTMLInputElement;
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
        conditionName: 'condition23',
      });
    }
  };
  // form
  const ManageForms = ManageTBQuestions;

  // ManageTBQuestions
  return (
    <section className='py-[48px]'>
      <div className='lg:max-w-[1012px] mx-auto'>
        <form onSubmit={formik.handleSubmit}>
          {Object.entries(ManageForms).map(
            ([key, form]: [key: string, form: Form]) => {
              const passIngData = { form, getFormNewSate };
              if (
                form.title === 'Pre-Treatment Evaluation' &&
                !PreTreatmentTabShow
              )
                return null;
              return (
                <React.Fragment key={form.title}>
                  <div className='Accordion-form rounded-2xl '>
                    <Accordion
                      title={form.title}
                      onClick={() => handleToggle(form.title)}
                      isOpen={openSectionIndex === form.title}
                    >
                      <div
                        className={`accordion-collapse  ${
                          openSectionIndex === form.title ? 'show' : ''
                        }`}
                      >
                        <div className='accordion-collapse-body'>
                          {form.title === 'Patient Details' && (
                            <PatientDetails {...{ ...passIngData }} />
                          )}
                          {form.title === 'Diagnostic Test Details' && (
                            <DiagnosticDetails {...{ ...passIngData }} />
                          )}
                          {form.title === 'Culture Report' && (
                            <CultureReport {...{ ...passIngData }} />
                          )}
                          {form.title === 'Clinical Profile' && (
                            <ClinicalProfile {...{ ...passIngData }} />
                          )}
                          {form.title === 'Pre-Treatment Evaluation' &&
                            PreTreatmentTabShow && (
                              <PreTreatmentEvaluation {...{ ...passIngData }} />
                            )}
                        </div>
                      </div>
                    </Accordion>
                  </div>
                </React.Fragment>
              );
            }
          )}
          <div className='flex justify-end gap-3'>
            {/* <PrimaryBtn
              title='Reset'
              type='reset'
              onClick={() => setResetFormModal(true)}
              customClassName='!btn-pink'
            /> */}
            <PrimaryBtn
              title='Submit'
              type='submit'
              onClick={formik.handleSubmit}
              disabled={formik.isSubmitting}
              customClassName=''
            />
          </div>
        </form>
      </div>

      {discordanceModal.conditionName && (
        <ErrorMessageModal
          onClick={discordanceModal.callBack}
          isOpen={discordanceModal.isOpen}
          conditionName={discordanceModal.conditionName}
        />
      )}
      {resetFormModal && (
        <ResetFormModal
          onSubmit={() => {
            formik.setValues(DefaultValue);
            navigate(location.pathname, { replace: true, state: null });
            setResetFormModal(false);
          }}
          onClose={() => setResetFormModal(false)}
        />
      )}
    </section>
  );
};

export default ManageTBForm;

// Are you sure you want to Reset this form?
export const ResetFormModal = ({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: () => void;
}) => {
  return (
    <CustomModal
      closeModal={onClose}
      isOpen={true}
      customClass={{
        modalContainer: '!max-w-[463px] mx-auto',
        modal: '!py-[36px] !px-[28px]',
      }}
    >
      <div className=''>
        {/* Header */}
        <div className='mb-2'>
          <h2 className='md:text-[20px] text-center mb-[12px] font-semibold'>
            Are you sure you want to Reset this Form?
          </h2>
        </div>

        <div className='flex gap-3 justify-between flex-wrap items-center'>
          <OutLineBtn
            customClassName='!min-w-[150px]'
            color='blue'
            onClick={onClose}
            title='Cancel'
          ></OutLineBtn>
          <PrimaryBtn
            customClassName='!min-w-[150px]'
            onClick={onSubmit}
            title='Ok'
          ></PrimaryBtn>
        </div>
      </div>
    </CustomModal>
  );
};
