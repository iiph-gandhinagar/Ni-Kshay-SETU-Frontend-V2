import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { PrimaryBtn } from 'apps/nikshy-setu-web/src/components/Buttons/Btns';
import { BorderedInput } from 'apps/nikshy-setu-web/src/components/Inputs/FormInput';
import { FormSelect } from 'apps/nikshy-setu-web/src/components/Inputs/FormSelect';
import { useLanguageObject } from 'apps/nikshy-setu-web/src/utils/HelperHooks';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import PageStyle from '../../../styles/RaiseClinicalQuery.module.css';

export const RaiseClinicalQuery = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [langKey, getText, objectToValue] = useLanguageObject();

  const formik = useFormik({
    initialValues: {
      age: '',
      sex: '',
      dateOfAdmission: '',
      diagnosis: '',
      chiefComplaint: '',
      query: '',
      currentTreatmentPlan: '',
      illness: '',
      pastHistory: '',
      preTreatmentEvaluation: '',
      assessmentAndDiffDiagnosis: '',
    },
    validationSchema: Yup.object({
      age: Yup.number()
        .required('Age is required')
        .min(0, 'Age must be a positive number'),
      sex: Yup.string().trim().required('sex is required'),
      dateOfAdmission: Yup.date().required('Date of Admission is required'),
      diagnosis: Yup.string().trim().required('Current Diagnosis is required'),
      chiefComplaint: Yup.string()
        .trim()
        .required('Chief Complaint is required'),
      query: Yup.string().trim().required('Concerns and Issues are required'),
      currentTreatmentPlan: Yup.string()
        .trim()
        .required('Current Treatment Plan is required'),
      illness: Yup.string()
        .trim()
        .required('History of Present Illness is required'),
    }),
    onSubmit: (values) => {
      const data = new Date(values?.dateOfAdmission);
      dispatch(
        createAction(
          {
            data: {
              ...values,
              status: 'In Progress',
              dateOfAdmission: `${data.toISOString()}`,
              raisedBy: location.state?.subscriberId,
              queryRaisedRole: location.state?.queryRaisedRole,
              queryRaisedInstitute: location.state?.queryRaisedInstitute,
            },
            method: 'POST',
            url: 'QUERY',
          },
          (code, res) => {
            if (code === 200) {
              console.log('Query Created successfully');
              navigate('/query-response-management');
            } else if (code === 400) {
              console.log('"Query Raised Institute Issue!!');
            }
          }
        )
      );
    },
  });

  return (
    <section className='pt-[48px] pb-[58px]'>
      <div className='lg:max-w-[1012px] mx-auto'>
        <form
          className={`${PageStyle.RaiseClinicalQueryForm}`}
          id='RaiseClinicalQueryForm'
          onSubmit={formik.handleSubmit}
        >
          <div className='flex flex-col gap-[12px]'>
            <div className='grid md:grid-cols-3 gap-[12px] mb-3'>
              <div className='relative'>
                <BorderedInput
                  type='number'
                  name='age'
                  label='Age*'
                  placeholder='Enter Age'
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.age && formik.errors.age && (
                  <span className='absolute text-red-500 text-sm mt-1'>
                    {formik.errors.age}
                  </span>
                )}
              </div>
              <div className='relative'>
                <FormSelect
                  inputColor='#ACABAB'
                  placeholderColor='#ACABAB'
                  placeholder='Select'
                  name='sex'
                  label='Select Gender*'
                  options={[
                    { label: 'Male', value: 'Male' },
                    { label: 'Female', value: 'Female' },
                    { label: 'Transgender', value: 'Transgender' },
                  ]}
                  controlStyles={{ minHeight: 24 }}
                  customPlaceholderStyles={{ fontSize: 18 }}
                  customDropdownIndicatorStyles={{ padding: 0 }}
                  arrowWidth={24}
                  arrowHeight={24}
                  value={formik.values.sex}
                  onChange={(option) =>
                    formik.setFieldValue('sex', option.value)
                  }
                  onBlur={formik.handleBlur}
                />
                {formik.touched.sex && formik.errors.sex && (
                  <span className='absolute text-red-500 text-sm mt-1'>
                    {formik.errors.sex}
                  </span>
                )}
              </div>
              <div className='relative'>
                <BorderedInput
                  type='date'
                  name='dateOfAdmission'
                  label='Date of Admission*'
                  value={formik.values.dateOfAdmission}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.dateOfAdmission &&
                  formik.errors.dateOfAdmission && (
                    <span className='absolute text-red-500 text-sm mt-1'>
                      {formik.errors.dateOfAdmission}
                    </span>
                  )}
              </div>
            </div>
            <BorderedInput
              name='diagnosis'
              placeholder='Enter Current Diagnosis'
              label='Current Diagnosis*'
              wrapperClassName='h-[134px]'
              value={formik.values.diagnosis}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.diagnosis && formik.errors.diagnosis && (
              <div className='text-red-500'>{formik.errors.diagnosis}</div>
            )}
            <BorderedInput
              name='chiefComplaint'
              placeholder='Enter Chief Complaint'
              label='Chief Complaint*'
              value={formik.values.chiefComplaint}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.chiefComplaint && formik.errors.chiefComplaint && (
              <div className='text-red-500'>{formik.errors.chiefComplaint}</div>
            )}
            <BorderedInput
              name='query'
              placeholder='Enter Concerns and Issues'
              label='Concerns and Issues*'
              value={formik.values.query}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.query && formik.errors.query && (
              <div className='text-red-500'>{formik.errors.query}</div>
            )}
            <BorderedInput
              name='currentTreatmentPlan'
              placeholder='Enter Current Treatment Plan'
              label='Current Treatment Plan*'
              value={formik.values.currentTreatmentPlan}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.currentTreatmentPlan &&
              formik.errors.currentTreatmentPlan && (
                <div className='text-red-500'>
                  {formik.errors.currentTreatmentPlan}
                </div>
              )}
            <BorderedInput
              name='illness'
              placeholder='Enter History of Present Illness'
              label='History Of Present Illness And Duration (In Case Of ADR Or CDST, Comorbidities Please Mention Here)*'
              value={formik.values.illness}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.illness && formik.errors.illness && (
              <div className='text-red-500'>{formik.errors.illness}</div>
            )}
            <BorderedInput
              name='pastHistory'
              placeholder='Enter Past History/Follow-up'
              label='Past History/Follow-up*'
              value={formik.values.pastHistory}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.pastHistory && formik.errors.pastHistory && (
              <div className='text-red-500'>{formik.errors.pastHistory}</div>
            )}
            <BorderedInput
              name='preTreatmentEvaluation'
              placeholder='Enter Re-treatment Evaluation'
              label='Re-treatment Evaluation*'
              value={formik.values.preTreatmentEvaluation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.preTreatmentEvaluation &&
              formik.errors.preTreatmentEvaluation && (
                <div className='text-red-500'>
                  {formik.errors.preTreatmentEvaluation}
                </div>
              )}
            <BorderedInput
              name='assessmentAndDiffDiagnosis'
              placeholder='Enter Assessment and Differential Diagnosis'
              label='Assessment and Differential Diagnosis*'
              value={formik.values.assessmentAndDiffDiagnosis}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.assessmentAndDiffDiagnosis &&
              formik.errors.assessmentAndDiffDiagnosis && (
                <div className='text-red-500'>
                  {formik.errors.assessmentAndDiffDiagnosis}
                </div>
              )}
            <PrimaryBtn
              type='submit'
              customClassName='mt-[46px]'
              title={getText('APP_SUBMIT')}
              bgColor='bg-gradient-to-b from-[#0B4E67] to-[#61C9EF]'
            />
          </div>
        </form>
      </div>
    </section>
  );
};
