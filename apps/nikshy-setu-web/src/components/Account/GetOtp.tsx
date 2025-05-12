import { BorderedInput, FormOtpInput } from '../Inputs/FormInput';
import { StepComponentProps } from './LoginModal';
import { OtpTimer } from './OtpTimer';

export const GetOtp: React.FC<StepComponentProps> = ({
  formik,
  state,
  ResendOtp,
}) => {
  return (
    <div>
      {state.contactMethod == 'Mobile' && (
        <BorderedInput
          name='phoneNo'
          label='Mobile number*'
          value={formik.values?.phoneNo}
          type='number'
          isMobile
          disabled
        />
      )}
      {state.contactMethod == 'Email' && (
        <BorderedInput
          name='email'
          type='email'
          label='Email Address'
          value={formik.values?.email}
          disabled
        />
      )}
      <FormOtpInput
        label='Enter OTP'
        value={formik.values?.otp}
        touched={formik.touched?.otp}
        errors={formik.errors?.otp}
        onChange={(v) => {
          formik.setFieldValue('otp', v, true);
        }}
      />
      <OtpTimer ResendOtp={ResendOtp} />
    </div>
  );
};
