import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  OTPGenerationApiResponse,
  StepProps,
  UserValidationPayload,
} from '@nikshay-setu-v3-monorepo/types';
import React from 'react';
import AnimationView from '../../../components/animationView';
import { InputField } from '../../../components/inputComponents';
import { CountdownTimer } from '../../../components/textComponent/contDownTimer';

const Step2: React.FC<StepProps> = React.memo(
  ({
    setFieldValue,
    _values,
    errors,
    touched,
    translateY,
    values,
    opacity,
    setFieldTouched,
    onPressEdit,
    loading,
    dispatch,
  }) => {
    return (
      <AnimationView
        progress={_values.progress}
        scrollFalse
        opacity={opacity}
        translateY={translateY}
      >
        {_values.isNumOrEmail === 'Email' ? (
          <InputField.Input
            error={errors?.email as string}
            touched={false}
            name={'email'}
            label={'Email Address'}
            editable={false}
            onPressEdit={onPressEdit}
            keyboardType='email-address'
            value={values.email}
            onChange={(v) =>
              setFieldValue(
                'email',
                typeof v === 'string' && v?.toLowerCase(),
                true
              )
            }
          />
        ) : (
          <InputField.InputWithCountryCode
            error={errors?.phoneNo as string}
            touched={false}
            editable={false}
            label='Mobile Number'
            edit={true}
            onPressEdit={onPressEdit}
            countryCode={values.countryCode}
            value={values.phoneNo}
            countryCodeDisable
            keyboardType='phone-pad'
            onChange={(v) => {
              setFieldValue('phoneNo', v, true);
            }}
            placeholder='Enter your number'
          />
        )}
        <InputField.Input
          placeholder={'Enter OTP'}
          label={'Enter OTP'}
          error={errors.otp as string}
          touched={touched.otp as boolean}
          keyboardType='number-pad'
          secureTextEntry
          isRequired={true}
          editable={!loading}
          value={values.otp}
          onBlur={() => {
            setFieldTouched('otp', true);
          }}
          onChange={(v) => setFieldValue('otp', v, true)}
        />
        <CountdownTimer
          initialMinutes={2}
          onPressSend={() => {
            const validationParameters =
              _values?.isNumOrEmail === 'Mobile'
                ? {
                    phoneNo:
                      typeof values.phoneNo === 'number'
                        ? `${values.phoneNo}`
                        : values.phoneNo,
                  }
                : { email: values.email };
            if (dispatch) {
              dispatch(
                createAction<UserValidationPayload, OTPGenerationApiResponse>({
                  data: { ...validationParameters },
                  method: 'POST',
                  url: 'OTP_GEN',
                })
              );
            }
          }}
        />
      </AnimationView>
    );
  }
);
Step2.displayName = 'Step2';
export default Step2;
