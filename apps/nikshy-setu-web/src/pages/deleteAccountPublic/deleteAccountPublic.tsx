import { validationSchema } from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  OTPGenerationApiResponse,
  OtpVerificationApiRequest,
  UserValidationApiResponse,
  UserValidationPayload,
} from '@nikshay-setu-v3-monorepo/types';
import { useFormik } from 'formik';
import { useRef, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Footer from '../../components/Layouts/Footer';
import { Navbar } from '../../components/Layouts/Navbar';

export const DeleteAccountPublic = () => {
  const inputClassValue =
    'w-full border px-3 py-1 rounded-[6px] border-gray-400';

  // state
  const [formStep, setFormStep] = useState(1);
  const [userData, setUserData] = useState({ accessToken: '', id: '' });
  const otpRef = useRef<HTMLInputElement>();
  const reasonRef = useRef<HTMLInputElement>();

  // hooks
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const navigate = useNavigate();

  // form 1
  const phoneFormik = useFormik({
    initialValues: { phoneNo: '', countryCode: '+91' },
    validationSchema: Yup.object().shape({
      phoneNo: validationSchema.phoneNo,
    }),
    onSubmit: async (data) => {
      return new Promise((resolve, reject) => {
        dispatch(
          createAction<UserValidationPayload, UserValidationApiResponse>(
            {
              method: 'POST',
              url: 'USER_VALIDATION',
              data: data,
            },
            (statusCode, response) => {
              if (statusCode == 200) {
                dispatch(
                  createAction<UserValidationPayload, OTPGenerationApiResponse>(
                    {
                      data: data,
                      method: 'POST',
                      url: 'OTP_GEN',
                    },
                    (code, res) => {
                      if (code === 200) {
                        setFormStep(2);
                        setTimeout(() => {
                          otpRef.current?.focus();
                        }, 200);
                      }
                      resolve(true);
                    }
                  )
                );
              } else {
                phoneFormik.setErrors({
                  phoneNo: 'This Phone Number is not registered.',
                });
                resolve(false);
              }
            }
          )
        );
      });
    },
  });

  // Form 2: OTP validation
  const otpFormik = useFormik({
    initialValues: { otp: '' },
    validationSchema: Yup.object().shape({
      otp: validationSchema.otp,
    }),
    onSubmit: async (values) => {
      return new Promise((resolve, reject) => {
        dispatch(
          createAction<OtpVerificationApiRequest, OTPGenerationApiResponse>(
            {
              data: { ...phoneFormik.values, otp: Number(values.otp) },
              method: 'POST',
              url: 'VERIFY_OTP',
            },
            (statusCode, response) => {
              if (statusCode === 200) {
                const newData = response as unknown as typeof userData;
                setUserData({
                  accessToken: newData.accessToken,
                  id: newData.id,
                });
                cookies.set('token', newData.accessToken);
                cookies.set('userId', newData.id);
                setFormStep(3);

                setTimeout(() => {
                  reasonRef.current?.focus();
                }, 200);
              } else {
                otpFormik.setErrors({ otp: 'Invalid OTP!!' });
              }
              resolve(true);
            }
          )
        );
      });
    },
  });

  // Form 3: Reason for account deletion
  const reasonFormik = useFormik({
    initialValues: { reason: '' },
    validationSchema: Yup.object().shape({
      reason: Yup.string().required('Reason is required'),
    }),
    onSubmit: (data) => {
      dispatch(
        createAction(
          {
            data: data,
            method: 'POST',
            url: 'DELETE_ACCOUNT',
            headers: {
              Authorization: 'Bearer ' + userData.accessToken,
            },
          },
          (code, response) => {
            if (code === 200) {
              alert('Your Account has been successfully Deleted.');
              cookies.remove('token');
              cookies.remove('userId');
              navigate('/');
            } else {
              reasonFormik.setErrors({ reason: 'Enter valid reason' });
            }
          }
        )
      );
    },
  });

  return (
    <>
      <Navbar
        logoTitle='Ni-kshay SETU'
        logoSubtitle='Support to End TUberculosis (SETU)'
      />
      <div className='max-w-[1140px] pb-10 mx-auto'>
        {/* card */}
        <div className='p-5 pt-0 max-w-3xl mx-auto rounded-lg bg-gray-50'>
          <h2 className='mt-[16px] text-2xl font-bold -tracking-[0.32px] md:leading-[60px] text-danger'>
            Delete Account
          </h2>

          {/* Warning Card  */}
          <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-3'>
            <div className='flex items-center gap-2 mb-3'>
              <svg
                className='w-5 h-5 text-yellow-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                />
              </svg>
              <h2 className='font-medium'>Important Information</h2>
            </div>
            <ul className='space-y-2 text-sm'>
              <li>
                • This action will permanently delete your account and all
                associated data
              </li>
              <li>
                • You will lose access to all your saved information and
                preferences
              </li>
              <li>• This process cannot be reversed once completed</li>
              <li>• Account deletion will be processed within 1 day</li>
              <li>
                • You'll need to create a new account if you wish to use our
                services again
              </li>
            </ul>
          </div>

          <div className='mx-auto bg-white shadow-lg rounded-lg p-6'>
            {/* phone number form */}
            <form onSubmit={phoneFormik.handleSubmit}>
              <div className='mb-2'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Registered Phone Number
                </label>
                <input
                  type='text'
                  name='phoneNo'
                  disabled={formStep !== 1}
                  value={phoneFormik.values.phoneNo}
                  onChange={phoneFormik.handleChange}
                  className={`${inputClassValue} `}
                  placeholder='Enter Phone Number'
                />
                {phoneFormik.touched.phoneNo && phoneFormik.errors.phoneNo && (
                  <p className='text-danger text-sm mt-1'>
                    {phoneFormik.errors.phoneNo}
                  </p>
                )}
              </div>
              {formStep === 1 && (
                <button
                  type='submit'
                  disabled={phoneFormik.isSubmitting}
                  className='btn btn-sm w-full mt-3 btn-blue rounded-md'
                >
                  Send OTP
                </button>
              )}
            </form>

            {/* otp form */}
            {formStep === 2 && (
              <form onSubmit={otpFormik.handleSubmit}>
                <div className='mb-2'>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Verification Code (OTP)
                  </label>
                  <input
                    ref={otpRef}
                    type='text'
                    name='otp'
                    value={otpFormik.values.otp}
                    onChange={otpFormik.handleChange}
                    className={`${inputClassValue} `}
                    placeholder='Enter 4-digit OTP'
                  />
                  {otpFormik.touched.otp && otpFormik.errors.otp && (
                    <p className='text-danger text-sm mt-1'>
                      {otpFormik.errors.otp}
                    </p>
                  )}
                </div>
                <button
                  type='submit'
                  disabled={otpFormik.isSubmitting}
                  className='btn btn-sm mt-3 btn-blue w-full rounded-md'
                >
                  Validate OTP
                </button>
              </form>
            )}

            {/* delete account form */}
            {formStep == 3 && (
              <form onSubmit={reasonFormik.handleSubmit}>
                <div className='mb-2'>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Reason
                  </label>
                  <input
                    ref={reasonRef}
                    type='text'
                    name='reason'
                    value={reasonFormik.values.reason}
                    onChange={reasonFormik.handleChange}
                    className={`${inputClassValue}`}
                    placeholder='Enter Reason'
                  />
                  {reasonFormik.touched.reason &&
                    reasonFormik.errors.reason && (
                      <p className='text-danger text-sm mt-1'>
                        {reasonFormik.errors.reason}
                      </p>
                    )}
                </div>
              </form>
            )}

            <p className='text-sm text-center text-gray-600 my-3'>
              By clicking "Delete Account", you confirm that you want to
              permanently delete your account and all associated data.
            </p>
            <button
              type='submit'
              onClick={reasonFormik.submitForm}
              disabled={reasonFormik.isSubmitting || formStep !== 3}
              className='btn btn-sm mt-3 btn-danger w-full rounded-md'
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
      <Footer
        logoTitle='Ni-kshay SETU'
        logoSubtitle='Support to End TUberculosis (SETU)'
      />
    </>
  );
};
