import {
  FacebookSvg,
  InstagramSvg,
  TwitterSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  QueryApiRequest,
  RootReducerStates,
} from '@nikshay-setu-v3-monorepo/types';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { UserProfileApiResponse } from 'shared/types/src/screens/UserTypes';
import * as Yup from 'yup';
import { BorderedInput } from '../../components/Inputs/FormInput';
import { useLanguageObject } from '../../utils/HelperHooks';

const validationSchema = Yup.object().shape({
  subject: Yup.string()
    .min(5, 'Please enter a subject with at least 5 characters.')
    .required('Subject is required'),
  message: Yup.string()
    .min(10, 'Message should be at least 10 characters')
    .required('Message is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
});

const socialMedias = [
  {
    link: 'https://www.facebook.com/profile.php?id=100086461717566',
    icon: <img src={FacebookSvg} alt='Facebook' />,
  },
  {
    link: 'https://twitter.com/NikshaySetu',
    icon: <img src={TwitterSvg} alt='Twitter' />,
  },
  {
    link: 'https://www.instagram.com/nikshaysetu/',
    icon: <img src={InstagramSvg} alt='Instagram' />,
  },
];

const ContactUs = () => {
  const { error, data } = useSelector(
    (state: RootReducerStates) => state.appContext
  );
  const [disabledList, setDisabled] = useState({ email: false });
  const dispatch = useDispatch();

  const [langKey, getText, objectToValue] = useLanguageObject();

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
            url: 'INQUIRY',
            data: {
              ...values,
              name: data.user_profile.name,
              phoneNo: data.user_profile.phoneNo,
            },
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
    const cookies = new Cookies();

    dispatch(
      createAction<null, UserProfileApiResponse>(
        {
          method: 'GET',
          url: 'USER_PROFILE',
          query: cookies.get('userId'),
        },
        (status, res) => {
          if (status === 200) {
            formik.setFieldValue('email', res?.email || '');
            setDisabled((old) => ({ ...old, email: res.email ? true : false }));
          }
        }
      )
    );
  }, []);

  return (
    <section className='pt-12 pb-16 bg-gray-50'>
      <div className='max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6'>
        <form onSubmit={formik.handleSubmit} className='space-y-6'>
          <div>
            <BorderedInput
              label={getText('APP_SUBJECT') + '*'}
              placeholder={getText('APP_ENTER_SUBJECT')}
              name='subject'
              type='text'
              touched={formik.touched.subject}
              errors={formik.errors.subject}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.subject}
            ></BorderedInput>
          </div>

          <div>
            <BorderedInput
              label={getText('APP_MESSAGE') + '*'}
              placeholder={getText('APP_WRITE_MESSAGE')}
              name='message'
              type='text'
              touched={formik.touched.message}
              errors={formik.errors.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
            ></BorderedInput>
          </div>

          <div>
            <BorderedInput
              disabled={disabledList.email}
              label={getText('APP_EMAIL_ADDRESS') + '*'}
              placeholder={getText('APP_ENTER_EMAIL_ADDRESS')}
              name='email'
              type='email'
              touched={formik.touched.email}
              errors={formik.errors.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            ></BorderedInput>
          </div>

          <button
            type='submit'
            disabled={formik.isSubmitting}
            className=' btn btn-blue  ms-auto'
          >
            {getText('APP_SUBMIT')}
          </button>
        </form>

        <div className='mt-8 text-center'>
          <hr className='border-gray-300' />
          <div className='mt-4 flex justify-center space-x-6'>
            {socialMedias.map((media, index) => (
              <a
                key={index}
                href={media.link}
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 flex items-center justify-center rounded-full border hover:bg-gray-100'
              >
                {media.icon}
              </a>
            ))}
          </div>
          <p className='text-sm text-gray-500 mt-4'>
            {getText('APP_FOLLOW_SOCIAL_MEDIA')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
