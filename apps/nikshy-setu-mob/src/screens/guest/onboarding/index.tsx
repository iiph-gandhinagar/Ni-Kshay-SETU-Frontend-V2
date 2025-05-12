import {
  botHeyAnimation,
  DropdownArrowSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import {
  CadreStateError,
  fontStyles,
  onProgressSteps,
  step1RegistrationWithEmailValidationSchema,
  step1RegistrationWithPhoneNumValidationSchema,
  step1ValidationSchema,
  step2EmailValidationSchema,
  step2ValidationSchema,
  step4ValidationSchema,
  step8ValidationSchema,
  step9ValidationSchema,
  strings,
  uiStyles,
  ValidationForEmailSchema,
  ValidationForPhoneSchema,
} from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  GuestScreenProps,
  OTPGenerationApiResponse,
  OtpVerificationApiRequest,
  OtpVerificationApiResponse,
  RootReducerStates,
  UpdateUserApiReq,
  UserValidationApiResponse,
  UserValidationPayload,
} from '@nikshay-setu-v3-monorepo/types';
import {
  filterObject,
  CustomRFValue as RFValue,
  storeDataToAsyncStorage,
  useCallRestriction,
} from '@nikshay-setu-v3-monorepo/utils';
import Button from 'apps/nikshy-setu-mob/src/components/buttons/primaryButtons';
import { useToast } from 'apps/nikshy-setu-mob/src/components/commonComponents/toastProvider';
import { storeSubscriberActivity } from 'apps/nikshy-setu-mob/src/utils/functions';
import { useFormik } from 'formik';
import LottieView from 'lottie-react-native';
import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  BackHandler,
  Keyboard,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { UserProfileApiResponse } from 'shared/types/src/screens/UserTypes';
import * as Yup from 'yup';
import { Column, Row } from '../../../components/commonComponents/row_column';
import ScreenContainer from '../../../components/defaultPage';
import { ProgressBar } from '../../../components/progressBar/ProgressBar';
import TypingText from '../../../components/textComponent/typingText';
const Step0 = lazy(() => import('./step_0_'));
const Step1 = lazy(() => import('./step_1_'));
const Step2 = lazy(() => import('./step_2_'));
const Step3 = lazy(() => import('./step_3_'));

const initialValues = {
  name: null,
  email: '',
  country: '',
  countryCode: '+91',
  profileImage: '',
  phoneNo: null,
  cadreType: null,
  stateId: null,
  cadreId: null,
  districtId: null,
  otp: null,
  blockId: null,
  healthFacilityId: null,
};
const stateInitialValues = {
  progress: 0,
  goal: 0,
  isLogin: false,
  updateProfile: false,
  phoneNo: '',
  isNumOrEmail: 'Mobile',
  otp: '',
  fullName: '',
  email: '',
  cadreType: '',
  cadre: '',
  healthFacility: '',
  userId: '',
  state: '',
  district: '',
  accessToken: '',
  tu: '',
};

export const BoardingScreen: React.FC<GuestScreenProps<'logIn'>> = ({
  navigation,
  route,
}) => {
  const { theme } = route.params;
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;
  const dispatch = useDispatch();
  const loadingApis = useSelector(
    (state: RootReducerStates) => state.appContext?.loadingApis
  );
  const { makeCall } = useCallRestriction();
  const { showToast } = useToast();
  function storeUserDetails(
    accessToken: string,
    userId: string,
    weeklyAssessmentCount: string
  ) {
    storeDataToAsyncStorage('token', accessToken).then(() =>
      storeDataToAsyncStorage('userId', userId).then(() => {
        storeDataToAsyncStorage('goal', weeklyAssessmentCount).then(() => {
          navigation.navigate('homeScreen', {
            tokenRefresher: 'tokenRefresh',
          });
        });
      })
    );
  }
  const [_values, _setValues] = useState(stateInitialValues);
  const getValidationSchema = () => {
    switch (_values.progress) {
      case 0.1: {
        const step5ValidationSchema = Yup.object().shape(
          CadreStateError?.[_values?.cadreType]
        );
        return _values.isLogin
          ? _values.isNumOrEmail === 'Mobile'
            ? ValidationForPhoneSchema
            : ValidationForEmailSchema
          : (_values.isNumOrEmail === 'Mobile'
              ? step1RegistrationWithPhoneNumValidationSchema
              : step1RegistrationWithEmailValidationSchema
            ).concat(step5ValidationSchema);
      }
      case 0.2:
        return _values.isNumOrEmail === 'Mobile'
          ? step2ValidationSchema
          : step2EmailValidationSchema;
      case 0.4:
        return step4ValidationSchema;
      case 0.5:
        const step5ValidationSchema = Yup.object().shape(
          // eslint-disable-line no-case-declarations
          CadreStateError?.[_values?.cadreType]
        );
        return step5ValidationSchema;
      case 0.8:
        return step8ValidationSchema;
      case 0.9:
        return step9ValidationSchema;
      default:
        return step1ValidationSchema;
    }
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values, { setErrors, setSubmitting }) => {
      const validationParams =
        _values.isNumOrEmail === 'Mobile'
          ? {
              phoneNo: values.phoneNo?.toString(),
              countryCode: values.countryCode?.toString(),
            }
          : {
              email: values.email,
            };

      const newUpdatedObj = filterObject({
        name: values.name,
        email: values.email,
        cadreType: values?.cadreType,
        stateId: values.stateId,
        cadreId: values.cadreId,
        districtId: values.districtId,
        profileImage: values?.profileImage,
        blockId: values.blockId,
        countryCode: values.countryCode?.toString(),
        countryId: values.country,
        healthFacilityId: values.healthFacilityId,
        phoneNo: values?.phoneNo?.toString(),
      });

      if (
        _values.progress === 0.1 &&
        _values.updateProfile &&
        _values?.userId
      ) {
        const filter = {
          National_Level: {
            blockId: null,
            stateId: null,
            districtId: null,
            healthFacilityId: null,
          },
          State_Level: {
            stateId: values.stateId,
            blockId: null,
            districtId: null,
            healthFacilityId: null,
          },
          Block_Level: {
            blockId: values.blockId,
            stateId: values.stateId,
            districtId: values.districtId,
            healthFacilityId: null,
          },
          District_Level: {
            stateId: values.stateId,
            districtId: values.districtId,
            blockId: null,
            healthFacilityId: null,
          },
          'Health-facility_Level': {
            blockId: values.blockId,
            stateId: values.stateId,
            districtId: values.districtId,
            healthFacilityId: values.healthFacilityId,
          },
        };
        const step1Filter = {
          ...newUpdatedObj,
          ...filter[newUpdatedObj?.cadreType],
        };
        dispatch(
          createAction<UpdateUserApiReq, UserValidationApiResponse>(
            {
              data: step1Filter,
              method: 'PATCH',
              url: 'UPDATE_USER',
              query: _values?.userId,
            },
            (code, res) => {
              if (code === 200) {
                if (_values?.accessToken) {
                  storeUserDetails(
                    _values?.accessToken,
                    _values?.userId,
                    _values?.goal.toString() || null
                  );
                }
              } else if (code === 400) {
                if (Array.isArray(res?.errors)) {
                  res?.errors?.map((v) => {
                    setErrors(v);
                  });
                }
              }
              setSubmitting(false);
            }
          )
        );
      } else if (_values.progress === 0.1) {
        const filter = {
          National_Level: {},
          State_Level: {
            stateId: values.stateId,
          },
          Block_Level: {
            blockId: values.blockId,
            stateId: values.stateId,
            districtId: values.districtId,
          },
          District_Level: {
            stateId: values.stateId,
            districtId: values.districtId,
          },
          'Health-facility_Level': {
            blockId: values.blockId,
            stateId: values.stateId,
            districtId: values.districtId,
            healthFacilityId: values.healthFacilityId,
          },
        };
        const step1Filter = {
          ...newUpdatedObj,
          ...filter[newUpdatedObj?.cadreType],
        };
        makeCall(() => {
          dispatch(
            createAction<UserValidationPayload, UserValidationApiResponse>(
              {
                data: { ...validationParams },
                method: 'POST',
                url: 'USER_VALIDATION',
              },
              (code, res) => {
                storeSubscriberActivity({
                  module: 'guestActivity',
                  action: _values?.isLogin ? 'Login' : 'Register',
                  dispatch: dispatch,
                  payload: {
                    ...(_values?.isLogin ? validationParams : step1Filter),
                    res,
                  },
                });
                if (code === 200 && !_values.isLogin) {
                  if (_values.isNumOrEmail === 'Mobile') {
                    showToast(strings.CONTACT_EXIST);
                    setErrors({ phoneNo: strings.CONTACT_EXIST });
                  } else {
                    showToast('Contact Email Exist! Please Login');
                    setErrors({ email: 'Contact Email Exist! Please Login' });
                  }
                } else if (
                  code === 400 &&
                  _values.isLogin &&
                  res?.errors?.isNewUser
                ) {
                  setErrors({
                    phoneNo: 'This Phone Number is not registered.',
                    email: 'This Email is not registered.',
                  });
                }
                if (res.errors.isNewUser && !_values.isLogin && code === 400) {
                  //New User
                  //calling Register API
                  dispatch(
                    createAction<
                      UserValidationPayload,
                      UserValidationApiResponse
                    >(
                      {
                        data: {
                          ...(_values?.isLogin
                            ? validationParams
                            : step1Filter),
                        },
                        method: 'POST',
                        url: 'USER_PHONE_VALIDATION',
                      },
                      (code, res) => {
                        if (code === 200) {
                          dispatch(
                            createAction<
                              UserValidationPayload,
                              OTPGenerationApiResponse
                            >(
                              {
                                data: { ...validationParams },
                                method: 'POST',
                                url: 'OTP_GEN',
                              },
                              (code, res) => {
                                if (code === 200) {
                                  _setValues({
                                    ..._values,
                                    progress: 0.2,
                                  });
                                }
                              }
                            )
                          );
                        } else if (code === 400) {
                          if (Array.isArray(res?.errors)) {
                            res?.errors?.map((v) => {
                              setErrors(v);
                            });
                          }
                        }
                      }
                    )
                  );
                } else if (code === 200 && _values.isLogin) {
                  dispatch(
                    createAction<
                      UserValidationPayload,
                      OTPGenerationApiResponse
                    >(
                      {
                        data: { ...validationParams },
                        method: 'POST',
                        url: 'OTP_GEN',
                      },
                      (code, res) => {
                        if (code === 200) {
                          _setValues({
                            ..._values,
                            progress: 0.2,
                          });
                        }
                      }
                    )
                  );
                } else if (code === 400 && res?.errors?.isNewUser) {
                  console.log('Check IDk');
                }
                setSubmitting(false);
              }
            )
          );
        });
        //OTP Verification
      } else if (_values.progress === 0.2) {
        dispatch(
          createAction<OtpVerificationApiRequest, OtpVerificationApiResponse>(
            {
              data: {
                ...validationParams,
                otp: parseInt(values.otp),
              },
              method: 'POST',
              url: 'VERIFY_OTP',
            },
            (code, data) => {
              if (code === 200) {
                dispatch(
                  createAction<null, UserProfileApiResponse>(
                    {
                      method: 'GET',
                      url: 'USER_PROFILE',
                      query: data?.id,
                      headers: {
                        Authorization: 'Bearer ' + data?.accessToken,
                      },
                    },
                    (code, getUserProfileRes) => {
                      if (code === 200 && data?.isEmailExist) {
                        storeUserDetails(
                          data?.accessToken,
                          data?.id,
                          getUserProfileRes.userContext?.weeklyAssessmentCount.toString() ||
                            null
                        );
                      } else if (code === 200) {
                        _setValues({
                          ..._values,
                          progress: 0.1,
                          updateProfile: true,
                          accessToken: data?.accessToken,
                          userId: data?.id,
                          goal: getUserProfileRes?.userContext
                            .weeklyAssessmentCount,
                        });
                        setValues({
                          name: getUserProfileRes?.name || '',
                          email: getUserProfileRes?.email || '',
                          country: getUserProfileRes?.countryId || null,
                          countryCode: getUserProfileRes?.countryCode || '+91',
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
                showToast('Invalid OTP!!');
                setErrors({ otp: 'Invalid OTP!!' });
              }
              setSubmitting(false);
            }
          )
        );
      } else {
        console.log({ PROCESS: _values.progress });
        setSubmitting(false);
      }
    },
    validationSchema: getValidationSchema(),
  });
  const {
    handleChange,
    handleSubmit,
    errors,
    isSubmitting,
    touched,
    submitForm,
    values,
    setFieldValue,
    setValues,
    setFieldTouched,
  } = formik;
  const animate = useCallback(() => {
    opacity.setValue(0);
    translateY.setValue(50);

    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.timing(translateY, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [opacity, translateY]);
  useEffect(() => {
    animate();
    const backAction = () => {
      if (_values.progress === 0) {
        Alert.alert('Confirm Exit', 'Are you sure you want to exit the app?', [
          {
            text: 'Cancel',
            onPress: () => null,
          },
          {
            text: 'Yes',
            onPress: () => BackHandler.exitApp(), // Close the app
          },
        ]);
      } else if (_values.progress === 0.1 || _values.progress === 0.2) {
        _setValues({ ..._values, progress: 0 });
      }
      return true; // Prevent default back action
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
    return () => backHandler.remove(); // Clean up the event listener on unmount
  }, [animate, _values.progress]);
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => Keyboard.dismiss()
    );
    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);
  const loginText =
    'Welcome to the Ni-kshay SETU App ! Please enter your mobile number or email ID to get started.';
  const isLoadingTrue = [
    'UPDATE_USER',
    'USER_VALIDATION',
    'USER_PHONE_VALIDATION',
    'OTP_GEN',
    'VERIFY_OTP',
    'USER_PROFILE',
  ];

  if (!(values.cadreType === _values.cadreType)) {
    _setValues({ ..._values, cadreType: values.cadreType });
  }

  const fallBackComp = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator
          size={'large'}
          color={theme.colors.DARK_BLUE_394F89}
        />
      </View>
    );
  };
  return (
    <ScreenContainer style={uiStyles.paddingHorizontal0}>
      <View style={uiStyles.paddingVertical10}>
        <View
          style={[
            uiStyles.topAnimationContainer,
            { backgroundColor: theme.colors.LIGHT_GREY_F4FFFF },
          ]}
        >
          <Row>
            {![0.2, 0.8, 0.0].includes(_values.progress) &&
              !_values?.updateProfile && (
                <TouchableOpacity
                  style={uiStyles?.onboardingBackIcon}
                  onPress={() => {
                    const isStepOne = _values.progress === 0.1;
                    _setValues({
                      ..._values,
                      isNumOrEmail: isStepOne ? 'Mobile' : _values.isNumOrEmail,
                      progress:
                        _values.progress === 0.2
                          ? 0.1
                          : isStepOne
                          ? 0
                          : _values.progress,
                    });
                  }}
                >
                  <DropdownArrowSvg
                    style={{
                      transform: [{ rotate: '90deg' }],
                    }}
                  />
                </TouchableOpacity>
              )}
            <LottieView
              autoPlay
              source={botHeyAnimation}
              loop={true}
              style={uiStyles.topBotAnimation}
            />
            <Column style={uiStyles.jus_center_flex1}>
              {_values.progress === 0.1 ||
                (_values.progress === 0.0 && (
                  <Text
                    style={[
                      fontStyles.typingText,
                      { color: theme.colors.WHITE_TEXT },
                    ]}
                  >
                    Hi! {'😊'}
                  </Text>
                ))}
              <TypingText
                text={
                  (_values?.progress === 0.1 && _values.isLogin && loginText) ||
                  onProgressSteps?.[_values?.progress]?.chatBotText
                }
                delay={onProgressSteps?.[_values?.progress]?.animationSpeed}
                containerStyles={{ marginEnd: RFValue(10) }}
              />
            </Column>
          </Row>
          <ProgressBar progress={_values.progress} />
        </View>
      </View>
      <React.Fragment>
        {_values.progress === 0.0 && (
          <Suspense fallback={fallBackComp()}>
            <Step0
              onChange={(value) => {
                formik.resetForm();
                _setValues({
                  ..._values,
                  progress: 0.1,
                  isLogin: value,
                  updateProfile: false,
                });
              }}
              _values={_values}
              opacity={opacity}
              translateY={translateY}
              colors={theme.colors}
            />
          </Suspense>
        )}
        {_values.progress === 0.1 && (
          <Suspense fallback={fallBackComp()}>
            <Step1
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              values={values}
              handleToggleChange={(value) => {
                formik.resetForm();
                _setValues({ ..._values, isNumOrEmail: value });
              }}
              _values={_values}
              errors={errors}
              loading={!(loadingApis.length === 0) || isSubmitting}
              touched={touched}
              opacity={opacity}
              setValues={setValues}
              translateY={translateY}
              dispatch={dispatch}
              colors={theme.colors}
            />
          </Suspense>
        )}
        {_values.progress === 0.2 && (
          <Suspense fallback={fallBackComp()}>
            <Step2
              setFieldValue={setFieldValue}
              values={values}
              _values={_values}
              errors={errors}
              loading={!(loadingApis.length === 0) || isSubmitting}
              touched={touched}
              dispatch={dispatch}
              opacity={opacity}
              setFieldTouched={setFieldTouched}
              setValues={setValues}
              onPressEdit={() => {
                _setValues({
                  ..._values,
                  progress: 0.1,
                });
              }}
              translateY={translateY}
            />
          </Suspense>
        )}
        {_values.progress === 0.8 && (
          <Suspense fallback={fallBackComp()}>
            <Step3
              values={values}
              dispatch={dispatch}
              _values={_values}
              onPressEdit={() => {
                _setValues({
                  ..._values,
                  progress: 0.1,
                });
              }}
              errors={errors}
              colors={theme.colors}
              touched={touched}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              setValues={setValues}
              opacity={opacity}
              translateY={translateY}
            />
          </Suspense>
        )}
        {_values.progress !== 0.0 && (
          <View style={uiStyles.buttonContainer}>
            <Button
              disabled={isLoadingTrue.some((value) =>
                loadingApis.includes(value)
              )}
              loaderEnable={isLoadingTrue.some((value) =>
                loadingApis.includes(value)
              )}
              bgColor={theme.colors.DARK_BLUE_394F89}
              textStyle={{ color: theme.colors.BUTTON_TEXT_WHITE }}
              title={
                _values?.updateProfile
                  ? 'Update Profile'
                  : onProgressSteps?.[_values?.progress]?.buttonTxt
              }
              containerStyle={{
                padding: RFValue(15),
                opacity: isLoadingTrue.some((value) =>
                  loadingApis.includes(value)
                )
                  ? 0.8
                  : 1,
              }}
              onPress={async () => {
                Keyboard.dismiss();
                submitForm();
              }}
            />
          </View>
        )}
      </React.Fragment>
    </ScreenContainer>
  );
};
