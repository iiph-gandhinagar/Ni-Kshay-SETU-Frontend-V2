import { buttonLoader } from '@nikshay-setu-v3-monorepo/assets';
import {
  CadreStateError,
  onProgressSteps,
  step1RegistrationWithEmailValidationSchema,
  step1RegistrationWithPhoneNumValidationSchema,
  step2EmailValidationSchema,
  step2ValidationSchema,
  strings,
  ValidationForEmailSchema,
  ValidationForPhoneSchema,
} from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  OTPGenerationApiResponse,
  OtpVerificationApiRequest,
  OtpVerificationApiResponse,
  UpdateUserApiReq,
  UserValidationApiResponse,
  UserValidationPayload,
} from '@nikshay-setu-v3-monorepo/types';
import { filterObject } from '@nikshay-setu-v3-monorepo/utils';
import { FormikProps, useFormik } from 'formik';
import Lottie from 'lottie-react';
import { useMemo, useReducer, useRef } from 'react';
import { Cookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserProfileApiResponse } from 'shared/types/src/screens/UserTypes';
import * as Yup from 'yup';
import { PrimaryBtn } from '../Buttons/Btns';
import { ChatBotCard } from '../Cards/ChatBotCard';
import { CustomModal } from '../Layouts/CustomModal';
import { GetOtp } from './GetOtp';
import { MobileAndEmail, MobileAndEmailTab } from './MobileAndEmail';
import { SignUpFrom } from './SignUpFrom';

// types
const PROGRESS_STEPS = {
  CONTACT_ENTRY: 0.1,
  OTP_VERIFICATION: 0.2,
  USER_DETAILS: 0.3,
} as const;

interface LoginState {
  progress: (typeof PROGRESS_STEPS)[keyof typeof PROGRESS_STEPS];
  isLogin: boolean;
  authData: {
    userId: string;
    accessToken: string;
    goal: number;
  };
  contactMethod: 'Mobile' | 'Email';
}

interface LoginModalProps {
  isOpen: boolean;
  closeModal: () => void;
  isLogin?: boolean;
}

export type loginFormFieldType = typeof initialValues;
export type StepComponentProps = {
  formik: FormikProps<loginFormFieldType>;
  state: LoginState;
  dispatchState: (action: LoginAction) => void;
  ResendOtp: () => void;
};

const initialValues = {
  // user data
  name: '',
  email: '',
  profileImage: '',
  countryCode: '+91',
  country: '',
  phoneNo: '',

  // otp
  otp: '',

  // site data
  cadreType: '',
  stateId: '',
  cadreId: '',
  districtId: '',
  blockId: '',
  healthFacilityId: '',
};

type LoginAction =
  | { type: 'SET_PROGRESS'; payload: LoginState['progress'] }
  | { type: 'SET_AUTH_DATA'; payload: Partial<LoginState['authData']> }
  | { type: 'SET_CONTACT_METHOD'; payload: LoginState['contactMethod'] };

const loginReducer = (state: LoginState, action: LoginAction): LoginState => {
  switch (action.type) {
    case 'SET_PROGRESS':
      return { ...state, progress: action.payload };
    case 'SET_AUTH_DATA':
      return { ...state, authData: { ...state.authData, ...action.payload } };
    case 'SET_CONTACT_METHOD':
      return { ...state, contactMethod: action.payload };
    default:
      return state;
  }
};

// react component
export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  closeModal,
  isLogin = false,
}) => {
  // state
  const [state, dispatchState] = useReducer(loginReducer, {
    progress: isLogin
      ? PROGRESS_STEPS.CONTACT_ENTRY
      : PROGRESS_STEPS.USER_DETAILS,
    isLogin,
    contactMethod: 'Mobile',
    authData: { userId: '', accessToken: '', goal: 0 },
  });

  // form values store in ref
  const formDataRef = useRef<{ values: Partial<loginFormFieldType> }>({
    values: {},
  });

  // hooks
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const navigate = useNavigate();

  // validation schema
  const getValidationSchema = () => {
    const loginWithMobile = state.contactMethod === 'Mobile';
    const USER_DETAILS_SCHEMA = Yup.object().shape(
      CadreStateError[formDataRef.current.values.cadreType]
    );

    const schema = {
      [PROGRESS_STEPS.CONTACT_ENTRY]: loginWithMobile
        ? ValidationForPhoneSchema
        : ValidationForEmailSchema,
      [PROGRESS_STEPS.OTP_VERIFICATION]: loginWithMobile
        ? step2ValidationSchema
        : step2EmailValidationSchema,
      [PROGRESS_STEPS.USER_DETAILS]: (loginWithMobile
        ? step1RegistrationWithPhoneNumValidationSchema
        : step1RegistrationWithEmailValidationSchema
      ).concat(USER_DETAILS_SCHEMA),
    };

    return schema[state.progress];
  };

  const setUserDataCookies = (
    userID: string = state.authData.userId,
    accessToken: string = state.authData.accessToken,
    goal: any = state.authData.goal
  ) => {
    cookies.set('userId', userID);
    cookies.set('token', accessToken);
    cookies.set('goal', goal);
  };

  const USER_VALIDATION_Action = ({ data }) => {
    return new Promise<any>((resolve, reject) => {
      dispatch(
        createAction<UserValidationPayload, UserValidationApiResponse>(
          {
            data: data,
            method: 'POST',
            url: 'USER_VALIDATION',
          },
          (code, res) => {
            if (code === 200 && !state.isLogin) {
              // if sign up time user enter already register mail or phone number then show error
              if (state.contactMethod === 'Mobile') {
                formik.setErrors({ phoneNo: strings.CONTACT_EXIST });
              } else {
                formik.setErrors({
                  email: 'Contact Email Exist! Please Login',
                });
              }
            } else if (code === 400 && state.isLogin) {
              // if sign in time mail or phone number not exist then show error
              formik.setErrors({
                phoneNo: 'This Phone Number is not registered.',
                email: 'This Email is not registered.',
              });
            }
            console.log({ code, res });
            resolve([code, res]);
          }
        )
      );
    });
  };

  const generateOtpAction = ({ data }) => {
    return new Promise<any>((resolve, reject) => {
      dispatch(
        createAction<any, OTPGenerationApiResponse>(
          {
            data: data,
            method: 'POST',
            url: 'OTP_GEN',
          },
          (code, res) => {
            if (code === 200) {
              // go to otp progress step
              dispatchState({
                type: 'SET_PROGRESS',
                payload: PROGRESS_STEPS.OTP_VERIFICATION,
              });
            }
            resolve([code, res]);
          }
        )
      );
    });
  };

  // form validation
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: getValidationSchema(),
    onSubmit: () => {
      return new Promise<void>((resolve, reject) => {
        // send key value object
        const newUpdatedObj = filterObject({
          name: formik.values.name,
          email: formik.values.email,
          cadreType: formik.values?.cadreType,
          stateId: formik.values.stateId,
          cadreId: formik.values.cadreId,
          districtId: formik.values.districtId,
          profileImage: formik.values?.profileImage,
          blockId: formik.values.blockId,
          countryCode: formik.values.countryCode?.toString(),
          countryId: formik.values.country,
          healthFacilityId: formik.values.healthFacilityId,
          phoneNo: formik.values?.phoneNo?.toString(),
        });

        // OTP VERIFICATION DATA
        const OTP_VERIFICATION_DATA =
          state.contactMethod == 'Mobile'
            ? {
                phoneNo: formik.values.phoneNo.toString(),
                countryCode: formik.values.countryCode,
              }
            : { email: formik.values.email };

        if (state.progress == PROGRESS_STEPS.CONTACT_ENTRY) {
          USER_VALIDATION_Action({ data: OTP_VERIFICATION_DATA }).then(
            ([code, res]) => {
              if (code !== 400) {
                generateOtpAction({ data: OTP_VERIFICATION_DATA }).then(() =>
                  resolve()
                );
              } else {
                resolve();
              }
            }
          );
        } else if (state.progress == PROGRESS_STEPS.USER_DETAILS) {
          if (state.isLogin) {
            // if sign in that mens update user data
            let signInUserData = {
              National_Level: {
                blockId: null,
                stateId: null,
                districtId: null,
                healthFacilityId: null,
              },
              State_Level: {
                stateId: formik.values.stateId,
                blockId: null,
                districtId: null,
                healthFacilityId: null,
              },
              Block_Level: {
                blockId: formik.values.blockId,
                stateId: formik.values.stateId,
                districtId: formik.values.districtId,
                healthFacilityId: null,
              },
              District_Level: {
                stateId: formik.values.stateId,
                districtId: formik.values.districtId,
                blockId: null,
                healthFacilityId: null,
              },
              'Health-facility_Level': {
                blockId: formik.values.blockId,
                stateId: formik.values.stateId,
                districtId: formik.values.districtId,
                healthFacilityId: formik.values.healthFacilityId,
              },
            };
            signInUserData = {
              ...newUpdatedObj,
              ...signInUserData[newUpdatedObj?.cadreType],
            };

            dispatch(
              createAction<UpdateUserApiReq, UserValidationApiResponse>(
                {
                  data: signInUserData as UpdateUserApiReq,
                  method: 'PATCH',
                  url: 'UPDATE_USER',
                  query: state.authData.userId,
                },
                (code, res) => {
                  if (code === 200) {
                    setUserDataCookies();
                    navigate('/home');
                  } else if (code === 400) {
                    if (Array.isArray(res.errors)) {
                      res.errors.map((v) => {
                        formik.setErrors(v);
                      });
                    }
                  }
                  resolve();
                }
              )
            );
          } else {
            // if sign up
            let signUpUserData = {
              National_Level: {},
              State_Level: {
                stateId: formik.values.stateId,
              },
              Block_Level: {
                blockId: formik.values.blockId,
                stateId: formik.values.stateId,
                districtId: formik.values.districtId,
              },
              District_Level: {
                stateId: formik.values.stateId,
                districtId: formik.values.districtId,
              },
              'Health-facility_Level': {
                blockId: formik.values.blockId,
                stateId: formik.values.stateId,
                districtId: formik.values.districtId,
                healthFacilityId: formik.values.healthFacilityId,
              },
            };
            signUpUserData = {
              ...newUpdatedObj,
              ...signUpUserData[newUpdatedObj?.cadreType],
            };

            // check if user already exists
            USER_VALIDATION_Action({ data: OTP_VERIFICATION_DATA }).then(
              ([code, res]) => {
                console.log({ code, res });
                // code 400 mens user not found
                if (code == 400 && res.errors.isNewUser) {
                  dispatch(
                    createAction<
                      UserValidationPayload,
                      UserValidationApiResponse
                    >(
                      {
                        data: signUpUserData as UserValidationPayload,
                        method: 'POST',
                        url: 'USER_PHONE_VALIDATION',
                      },
                      (code, res) => {
                        if (code == 200) {
                          // if user created
                          generateOtpAction({
                            data: OTP_VERIFICATION_DATA,
                          }).then(() => resolve());
                        } else {
                          if (Array.isArray(res.errors)) {
                            res.errors.map((v) => {
                              formik.setErrors(v);
                            });
                          }
                          resolve();
                        }
                      }
                    )
                  );
                } else {
                  resolve();
                }
              }
            );
          }
        } else if (state.progress == PROGRESS_STEPS.OTP_VERIFICATION) {
          dispatch(
            createAction<OtpVerificationApiRequest, OtpVerificationApiResponse>(
              {
                data: {
                  ...OTP_VERIFICATION_DATA,
                  otp: parseInt(formik.values.otp),
                },
                method: 'POST',
                url: 'VERIFY_OTP',
              },
              (code, data) => {
                if (code === 200) {
                  const { id: userId, accessToken } = data;
                  dispatch(
                    createAction<null, UserProfileApiResponse>(
                      {
                        method: 'GET',
                        url: 'USER_PROFILE',
                        query: userId,
                        headers: {
                          Authorization: 'Bearer ' + accessToken,
                        },
                      },
                      (code, getUserProfileRes) => {
                        if (
                          code === 200 &&
                          (state.isLogin == false || data.isEmailExist)
                        ) {
                          setUserDataCookies(
                            userId,
                            accessToken,
                            getUserProfileRes.userContext?.weeklyAssessmentCount
                          );
                          navigate('/home');
                        } else if (code === 200) {
                          dispatchState({
                            type: 'SET_PROGRESS',
                            payload: PROGRESS_STEPS.USER_DETAILS,
                          });
                          dispatchState({
                            type: 'SET_AUTH_DATA',
                            payload: { userId, accessToken },
                          });
                          formik.setValues({
                            name: getUserProfileRes?.name || '',
                            email: getUserProfileRes?.email || '',
                            country: getUserProfileRes?.countryId || null,
                            countryCode:
                              getUserProfileRes?.countryCode || '+91',
                            profileImage: getUserProfileRes?.profileImage || '',
                            phoneNo: getUserProfileRes?.phoneNo || null,
                            cadreType: getUserProfileRes?.cadreType || null,
                            stateId: getUserProfileRes?.stateId || null,
                            cadreId: getUserProfileRes?.cadreId || null,
                            districtId: getUserProfileRes?.districtId || null,
                            otp: null,
                            blockId: getUserProfileRes?.blockId || null,
                            healthFacilityId:
                              getUserProfileRes?.healthFacilityId || null,
                          });
                        }
                      }
                    )
                  );
                } else if (code === 400) {
                  formik.setErrors({ otp: 'Invalid OTP!!' });
                }
                resolve();
              }
            )
          );
        }
      });
    },
  });

  formDataRef.current.values = formik.values;

  // resend otp functions
  function ResendOtp() {
    dispatchState({ type: 'SET_PROGRESS', payload: 0.1 });
    queueMicrotask(() => {
      formik.submitForm();
    });
  }

  // common props
  const formikPros: StepComponentProps = {
    formik,
    state,
    dispatchState,
    ResendOtp,
  };
  // step components
  const StepComponent = useMemo(() => {
    const components = {
      [PROGRESS_STEPS.CONTACT_ENTRY]: MobileAndEmail,
      [PROGRESS_STEPS.OTP_VERIFICATION]: GetOtp,
      [PROGRESS_STEPS.USER_DETAILS]: SignUpFrom,
    };
    return components[state.progress];
  }, [state.progress]);

  const buttonText = {
    [PROGRESS_STEPS.CONTACT_ENTRY]: onProgressSteps['0.1'].buttonTxt,
    [PROGRESS_STEPS.OTP_VERIFICATION]: onProgressSteps['0.2'].buttonTxt,
    [PROGRESS_STEPS.USER_DETAILS]: !state.isLogin
      ? onProgressSteps['0.1'].buttonTxt
      : 'Update Profile',
  };

  return (
    <CustomModal
      isOpen={isOpen}
      closeModal={closeModal}
      styles={{ modal: { maxWidth: 534 } }}
      className='!px-4 md:!px-[28px] !py-[36px]'
    >
      <form onSubmit={formik.handleSubmit}>
        <ChatBotCard
          step={state.progress}
          chatBotText={onProgressSteps?.[state.progress]?.chatBotText}
        />
        <MobileAndEmailTab {...{ ...formikPros }}></MobileAndEmailTab>
        <StepComponent {...{ ...formikPros }} />

        {
          <PrimaryBtn
            title={buttonText[state.progress]}
            disabled={formik.isSubmitting}
            rightImg={
              formik.isSubmitting && (
                <Lottie
                  animationData={buttonLoader}
                  loop={true}
                  style={{ width: '20%', height: '30px' }}
                  className='scale-[2.5]'
                />
              )
            }
            onClick={formik.handleSubmit}
            type='submit'
            customClassName='w-full mt-[16px]'
          />
        }
      </form>
    </CustomModal>
  );
};
