import {
  CadreStateError,
  onProgressSteps,
  step1RegistrationWithEmailValidationSchema,
  step1RegistrationWithPhoneNumValidationSchema,
  step1ValidationSchema,
  step2EmailValidationSchema,
  step2ValidationSchema,
  uiStyles,
} from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  RootReducerStates,
  ScreenProps,
  UpdateUserApiReq,
  UserValidationApiResponse,
  UserValidationPayload,
} from '@nikshay-setu-v3-monorepo/types';
import {
  filterObject,
  getDataFromAsyncStorage,
  CustomRFValue as RFValue,
} from '@nikshay-setu-v3-monorepo/utils';
import { useFocusEffect } from '@react-navigation/native';
import Button from 'apps/nikshy-setu-mob/src/components/buttons/primaryButtons';
import { AccountScreenSkeletonCard } from 'apps/nikshy-setu-mob/src/components/cards/skeletonCards';
import { useToast } from 'apps/nikshy-setu-mob/src/components/commonComponents/toastProvider';
import { storeSubscriberActivity } from 'apps/nikshy-setu-mob/src/utils/functions';
import { useFormik } from 'formik';
import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ActivityIndicator, Animated, Keyboard, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { UserProfileApiResponse } from 'shared/types/src/screens/UserTypes';
import * as Yup from 'yup';

const Step0 = lazy(() => import('../../guest/onboarding/step_0_'));
const Step1 = lazy(() => import('../../guest/onboarding/step_1_'));
const Step2 = lazy(() => import('../../guest/onboarding/step_2_'));
const Step3 = lazy(() => import('../../guest/onboarding/step_3_'));
const fallBackComp = () => {
  return (
    <View style={uiStyles?.flex1}>
      <ActivityIndicator />
    </View>
  );
};
const AccountScreen: React.FC<ScreenProps<'accountScreen'>> = ({ route }) => {
  const { theme } = route.params;
  const opacity = useRef(new Animated.Value(0)).current;

  const appTranslations = useSelector(
    (state: RootReducerStates) => state.appContext?.data?.appTranslations
  );

  const translateY = useRef(new Animated.Value(50)).current;
  const dispatch = useDispatch();
  const { showToast } = useToast();

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
  const [localValues, setLocalValues] = useState({
    progress: 0.8,
    isLogin: false,
    updateProfile: true,
    goal: 0,
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
  });
  const step5ValidationSchema = Yup.object().shape(
    CadreStateError?.[localValues?.cadreType]
  );
  const getValidationSchema = () => {
    switch (localValues.progress) {
      case 0.1: {
        const finalErrorSchema =
          localValues.isNumOrEmail === 'Mobile'
            ? step1RegistrationWithPhoneNumValidationSchema
            : step1RegistrationWithEmailValidationSchema;
        return finalErrorSchema.concat(step5ValidationSchema);
      }
      case 0.2:
        return localValues.isNumOrEmail === 'Mobile'
          ? step2ValidationSchema
          : step2EmailValidationSchema;

      default:
        return step1ValidationSchema;
    }
  };
  const internationalLevel = localValues?.cadreType === 'International_Level';
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values, { setErrors, setSubmitting }) => {
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
      function updateProfile(step1Filter: UpdateUserApiReq, userId: string) {
        dispatch(
          createAction<UpdateUserApiReq, UserValidationApiResponse>(
            {
              data: step1Filter,
              method: 'PATCH',
              url: 'UPDATE_USER',
              query: userId,
            },
            (code, res) => {
              if (code === 200) {
                console.log('success');
                showToast(appTranslations.APP_MSG_PROFILE_UPDATED);
                setLocalValues((prev) => {
                  return { ...prev, progress: 0.8 };
                });
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
      }

      if (
        localValues.progress === 0.1 &&
        localValues.updateProfile &&
        localValues?.userId
      ) {
        console.log('first');
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
        const validationParams = internationalLevel
          ? {
              phoneNo: values.phoneNo?.toString(),
              countryCode: values.countryCode?.toString(),
            }
          : {
              email: values.email,
            };

        if (
          validationParams?.email === localValues.email ||
          validationParams?.phoneNo === localValues.phoneNo
        ) {
          // without validating updates
          updateProfile(step1Filter, localValues?.userId);
        } else {
          // (phone/email) is updating so check it is unique
          dispatch(
            createAction<UserValidationPayload, UserValidationApiResponse>(
              {
                data: { ...validationParams },
                method: 'POST',
                url: 'USER_VALIDATION',
              },
              (code, res) => {
                setSubmitting(false);
                if (code === 200 && res?.errors) {
                  if (internationalLevel) {
                    showToast('This phone number is already registered');
                    setErrors({
                      phoneNo: 'This phone number is already registered',
                    });
                  } else {
                    showToast('Contact Email Exist!');
                    setErrors({ email: 'Contact Email Exist!' });
                  }
                } else if (code === 400 && res?.errors?.isNewUser) {
                  updateProfile(step1Filter, localValues?.userId);
                }
              }
            )
          );
        }
      } else {
        console.log({ PROCESS: localValues.progress });
        setSubmitting(false);
      }
    },
    validationSchema: getValidationSchema(),
  });
  const {
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

  useFocusEffect(
    useCallback(() => {
      animate();
    }, [animate, localValues.progress])
  );

  const handleToggleChange = (value: string) => {
    setLocalValues({ ...localValues, isNumOrEmail: value });
  };
  useEffect(() => {
    getDataFromAsyncStorage('userId').then((v) => {
      if (v) {
        dispatch(
          createAction<null, UserProfileApiResponse>(
            {
              method: 'GET',
              url: 'USER_PROFILE',
              query: v,
            },
            (status, res) => {
              if (status === 200) {
                storeSubscriberActivity({
                  module: 'User Profile',
                  action: 'User Detail Fetched',
                  dispatch: dispatch,
                });
                formik.setValues({
                  ...(res as any),
                  country: res?.countryId,
                  otp: null,
                });
                setLocalValues((prev) => {
                  return {
                    ...prev,
                    progress: 0.8,
                    userId: v,
                    email: res?.email,
                    phoneNo: res?.phoneNo,
                  };
                });
              }
            }
          )
        );
      }
    });
  }, []);
  if (!(values.cadreType === localValues.cadreType)) {
    setLocalValues({ ...localValues, cadreType: values.cadreType });
  }

  return (
    <View style={{ flex: 1 }}>
      <React.Fragment>
        {localValues.progress === 0.0 && (
          <Suspense fallback={fallBackComp()}>
            <Step0
              onChange={(value) => {
                setLocalValues({
                  ...localValues,
                  progress: 0.1,
                  isLogin: value,
                });
              }}
              _values={localValues}
              opacity={opacity}
              translateY={translateY}
              colors={theme.colors}
            />
          </Suspense>
        )}
        {localValues.progress === 0.1 && (
          <Suspense fallback={fallBackComp()}>
            <Step1
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              values={values}
              handleToggleChange={handleToggleChange}
              _values={localValues}
              errors={errors}
              touched={touched}
              setValues={setValues}
              opacity={opacity}
              translateY={translateY}
              dispatch={dispatch}
              colors={theme.colors}
            />
          </Suspense>
        )}

        {localValues.progress === 0.2 && (
          <Suspense fallback={fallBackComp()}>
            <Step2
              setFieldValue={setFieldValue}
              values={values}
              _values={localValues}
              errors={errors}
              touched={touched}
              dispatch={dispatch}
              setValues={setValues}
              opacity={opacity}
              onPressEdit={() => {
                setLocalValues({
                  ...localValues,
                  progress: 0.1,
                });
              }}
              translateY={translateY}
            />
          </Suspense>
        )}

        {localValues.progress === 0.8 && !localValues.userId && (
          <AccountScreenSkeletonCard />
        )}
        {localValues.progress === 0.8 && localValues.userId && (
          <Suspense fallback={fallBackComp()}>
            <Step3
              values={values}
              dispatch={dispatch}
              _values={localValues}
              setValues={setValues}
              onPressEdit={() => {
                setLocalValues({
                  ...localValues,
                  progress: 0.1,
                });
              }}
              errors={errors}
              colors={theme.colors}
              touched={touched}
              isAccount={true}
              opacity={opacity}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              translateY={translateY}
            />
          </Suspense>
        )}
        {localValues.progress !== 0.8 && (
          <View style={{ paddingHorizontal: RFValue(10) }}>
            <Button
              disabled={isSubmitting}
              loaderEnable={isSubmitting}
              bgColor={theme.colors.DARK_BLUE_394F89}
              textStyle={{ color: theme.colors.BUTTON_TEXT_WHITE }}
              containerStyle={{ padding: RFValue(15) }}
              title={
                localValues?.updateProfile
                  ? 'Update Profile'
                  : onProgressSteps?.[localValues?.progress]?.buttonTxt
              }
              onPress={async () => {
                Keyboard.dismiss();
                submitForm();
              }}
            />
          </View>
        )}
      </React.Fragment>
    </View>
  );
};

export default AccountScreen;
