import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  QueryApiRequest,
  RootReducerStates,
} from '@nikshay-setu-v3-monorepo/types';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { Cookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { UserProfileApiResponse } from 'shared/types/src/screens/UserTypes';
import * as Yup from 'yup';
import { PrimaryBtn } from '../Buttons/Btns';

const validationSchema = Yup.object().shape({
  subject: Yup.string().required('Subject is required'),
  message: Yup.string()
    .min(10, 'Message should be at least 10 characters')
    .trim()
    .required('Message is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
});
interface ContactProps {
  title?: string;
  description?: string;
}
export const Contact: React.FC<ContactProps> = ({
  title = '',
  description = '',
}) => {
  const { error, data } = useSelector(
    (state: RootReducerStates) => state.appContext
  );
  const dispatch = useDispatch();

  const cookie = new Cookies();

  const formik = useFormik({
    initialValues: {
      subject: '',
      message: '',
      email: '',
    },
    validationSchema,
    onSubmit: (values, { setErrors, resetForm, setSubmitting }) => {
      setSubmitting(true);
      dispatch(
        createAction<QueryApiRequest, null>(
          {
            method: 'POST',
            url: 'STATIC_INQUIRY',
            data: values,
          },
          (status, res: any) => {
            setSubmitting(false);
            if (status === 400) {
              setErrors(res.errors);
            } else if (status === 200) {
              resetForm();
            }
          }
        )
      );
    },
  });

  useEffect(() => {
    if (cookie.get('userId')) {
      dispatch(
        createAction<null, UserProfileApiResponse>(
          {
            method: 'GET',
            url: 'USER_PROFILE',
            query: cookie.get('userId'),
          },
          (status, res) => {
            if (status === 200) {
              formik.setFieldValue('email', res?.email || '');
            }
          }
        )
      );
    }
  }, []);
  return (
    <section className='pt-[58px] pb-[120px]' id='contact-us'>
      <div className='container mx-auto'>
        <div className='max-w-[1140px] mx-auto'>
          <div>
            <span className='bg-darkBlue/10 text-darkBlue text-[12px] font-medium px-[8px] py-[2px] rounded-[36px] uppercase leading-[18px]'>
              Contact us
            </span>
            <h2 className='mt-[16px] text-3xl md:text-[48px] font-bold -tracking-[0.32px] md:leading-[60px]'>
              {title}
            </h2>
            <p className='mt-[16px] font-medium text-darkSilver leading-6'>
              {description}
            </p>
          </div>
          <div className='bg-[#FAFAFA] rounded-[28px] p-[28px] mt-[24px]'>
            <form onSubmit={formik.handleSubmit} className='space-y-[28px]'>
              <div>
                <label
                  htmlFor='subject'
                  className='block text-[16px] font-medium leading-[24px] text-[#4D4D4D]'
                >
                  Subject*
                </label>
                <select
                  id='subject'
                  name='subject'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.subject}
                  className={`mt-[6px] block w-full rounded-[12px] border p-3 border-[#D2D3D5] bg-white ${
                    formik.touched.subject && formik.errors.subject
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                >
                  <option value='' disabled>
                    Select subject
                  </option>
                  <option value='General Inquiry'>General Inquiry</option>
                  <option value='Technical Support'>Technical Support</option>
                  <option value='Feedback'>Feedback</option>
                </select>
                {formik.touched.subject && formik.errors.subject && (
                  <p className='text-sm text-red-500 mt-1'>
                    {formik.errors.subject}
                  </p>
                )}
              </div>
              <div>
                <label
                  className='block text-[16px] font-medium leading-[24px] text-[#4D4D4D]'
                  htmlFor='email'
                >
                  Email
                </label>
                <input
                  autoComplete={'off'}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  name='email'
                  type='email'
                  id='email'
                  className={`mt-[6px] block w-full rounded-[12px] border p-3 text-darkSilver placeholder:text-[#D2D3D5] border-[#D2D3D5] ${
                    formik.touched.email && formik.errors.email
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                  placeholder='Email'
                />
                {formik.touched.email && formik.errors.email && (
                  <p className='text-sm text-red-500 mt-1'>
                    {formik.errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor='message'
                  className='block text-[16px] font-medium leading-[24px] text-[#4D4D4D]'
                >
                  Message*
                </label>
                <textarea
                  id='message'
                  name='message'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.message}
                  placeholder='Write message'
                  rows={5}
                  className={`mt-[6px] block w-full rounded-[12px] border p-3 text-darkSilver placeholder:text-[#D2D3D5] border-[#D2D3D5] ${
                    formik.touched.message && formik.errors.message
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                />
                {formik.touched.message && formik.errors.message && (
                  <p className='text-sm text-red-500 mt-1'>
                    {formik.errors.message}
                  </p>
                )}
              </div>

              <PrimaryBtn
                onClick={() => null}
                type='submit'
                disabled={formik.isSubmitting}
                customClassName=''
                title={formik.isSubmitting ? 'Submitting...' : 'Submit'}
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
