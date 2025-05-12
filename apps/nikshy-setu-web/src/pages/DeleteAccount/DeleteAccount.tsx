import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Cookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { PrimaryBtn } from '../../components/Buttons/Btns';
import { DeleteAccountModal } from './DeleteAccountModal';

const optionLIst = [
  'No longer using the service/platform',
  'Found a better alternative',
  'Privacy concerns',
  'Too many emails/notifications',
  'Difficulty navigating the platform',
  'Account security concerns',
  'Personal reasons',
  'Others',
];

export const DeleteAccount = () => {
  // hooks
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const navigate = useNavigate();

  // state
  const [deleteModal, setDeleteModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      reason: '',
      otherReason: '',
    },
    validationSchema: Yup.object({
      reason: Yup.string().required('Please select a reason'),
      otherReason: Yup.string().when('reason', {
        is: (value: string) => value === 'Others',
        then: (schema) => schema.required('other Reason  message is required'),
        otherwise: (schema) => schema.notRequired(),
      }),
    }),
    onSubmit: (values) => {
      setDeleteModal(true);
    },
  });

  const handleReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    formik.setFieldValue('reason', value);

    // Clear 'otherReason' if 'reason' is not 'Others'
    if (value !== 'Others') {
      formik.setFieldValue('otherReason', '');
    }
  };

  const deleteAccountHandler = () => {
    let reason = formik.values.otherReason
      ? formik.values.otherReason
      : formik.values.reason;

    dispatch(
      createAction(
        {
          data: { reason },
          method: 'POST',
          url: 'DELETE_ACCOUNT',
        },
        (code, res) => {
          if (code === 200) {
            alert('Your Account has been successfully Deleted.');
            cookies.remove('userId');
            navigate('/');
          }
        }
      )
    );
  };

  return (
    <section className='pt-[48px]'>
      <div className='lg:max-w-[1012px] mx-auto'>
        <form onSubmit={formik.handleSubmit}>
          <div className='mb-[24px]'>
            <h6 className='mb-[12px] text-darkGray4D4D4D md:text-2xl font-medium'>
              Delete Account
            </h6>
            <p className='mb-[12px] text-GREY_808080  font-medium'>
              If you need to delete an account and you're prompted to provide a
              reason
            </p>
            <div className='flex flex-col gap-5'>
              {optionLIst.map((optionName, index) => {
                return (
                  <div
                    key={index}
                    className='rounded-xl py-4 px-3 flex lg:items-center gap-2'
                    style={{ boxShadow: '0px 2px 4px 0px #0000001F' }}
                  >
                    <div className=''>
                      <input
                        type='radio'
                        name='reason'
                        id={optionName}
                        value={optionName}
                        checked={formik.values.reason === optionName}
                        className='w-4 h-4 mt-1 sm:mt-0 sm:w-5 sm:h-5'
                        onChange={handleReasonChange}
                      />
                    </div>
                    <label
                      htmlFor={optionName}
                      className='text-darkGray4D4D4D md:text-xl font-normal'
                    >
                      {optionName}
                    </label>
                  </div>
                );
              })}
              {formik.touched.reason && formik.errors.reason && (
                <div className='text-red-500 text-sm'>
                  {formik.errors.reason}
                </div>
              )}
              {formik.values.reason === 'Others' && (
                <div>
                  <textarea
                    name='otherReason'
                    placeholder='Write a message...'
                    rows={5}
                    value={formik.values.otherReason}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className='w-full py-3 px-4 rounded-[12px] outline-none bg-[#F2F2F2] placeholder:text-LIGHT_GREY_B0B0B0'
                  />
                  {formik.touched.otherReason && formik.errors.otherReason && (
                    <div className='text-red-500 text-sm'>
                      {formik.errors.otherReason}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <PrimaryBtn
            type='submit'
            title='Delete'
            customClassName='w-full mb-2'
          ></PrimaryBtn>
        </form>
      </div>

      {deleteModal && (
        <DeleteAccountModal
          onClose={() => setDeleteModal(false)}
          onDelete={deleteAccountHandler}
        ></DeleteAccountModal>
      )}
    </section>
  );
};
