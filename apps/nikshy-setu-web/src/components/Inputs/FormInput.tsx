import {
  AlertSvg,
  ChatMicSvg,
  EditOutlineSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import { FormikErrors, FormikTouched } from 'formik';
import React, {
  FocusEventHandler,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import OtpInput from 'react-otp-input';
interface FormInputProps {
  disabled?: boolean | undefined;
  onFocus?: FocusEventHandler<HTMLInputElement> | undefined;
  autoFocus?: boolean | undefined;
  id?: string | undefined;
  name?: string | undefined;
  placeholder?: string;
  value?: string;
  onChange?: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  onBlur?: FocusEventHandler | undefined;
  customClassName?: string;
  type?:
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
    | undefined;
}
export const FormInput: React.FC<FormInputProps> = ({
  disabled = undefined,
  autoFocus = undefined,
  onFocus = undefined,
  id = undefined,
  name = undefined,
  placeholder = '',
  value = '',
  onChange = () => null,
  onBlur = () => null,
  customClassName = '',
  type = 'text',
}) => {
  return (
    <div>
      <input
        onFocus={onFocus}
        disabled={disabled}
        autoFocus={autoFocus}
        id={id}
        name={name}
        autoComplete='given-name'
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        className={`block w-full rounded-2xl border-0 py-2 leading-[44px] text-gray-900 placeholder:text-darkSilver bg-[#ffffff99] text-[18px] outline-none font-medium px-6 -tracking-[0.16px] ${customClassName}`}
        type={type}
      />
    </div>
  );
};
export interface BorderedInputProps {
  disabled?: boolean | undefined;
  autoFocus?: boolean | undefined;
  id?: string | undefined;
  name?: string | undefined;
  placeholder?: string;
  value?: string;
  onChange?: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  onBlur?: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  customClassName?: string;
  warperClass?: string;
  type?:
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
    | undefined;
  label?: string;
  isMobile?: boolean | undefined;
  showEditIcon?: boolean | undefined;
  wrapperClassName?: string;
  labelClassName?: string;
  inputWrapperClassName?: string;
  errors?:
    | string
    | string[]
    | FormikErrors<any>
    | FormikErrors<any>[]
    | undefined;
  touched?: boolean | FormikTouched<any> | FormikTouched<any>[] | undefined;
  countryCodeElement?: ReactElement;
  focus?: boolean;
}
export const BorderedInput: React.FC<BorderedInputProps> = ({
  disabled = undefined,
  autoFocus = undefined,
  id = undefined,
  name = undefined,
  placeholder = '',
  value = '',
  onChange = () => null,
  onBlur = () => null,
  customClassName = '',
  warperClass = '',
  type = 'text',
  label = '',
  isMobile = false,
  showEditIcon = false,
  wrapperClassName = '',
  labelClassName = '',
  inputWrapperClassName = '',
  errors = undefined,
  touched = false,
  countryCodeElement,
  focus = false,
}) => {
  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (focus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focus, name]);

  return (
    <React.Fragment>
      <div
        className={`${wrapperClassName} border-[0.5px] ${
          errors && touched ? 'border-RED_C62828' : 'border-D9DBDB'
        } rounded-[12px] pb-4 pt-2 px-5`}
      >
        <div className='flex justify-between items-center'>
          <label
            htmlFor={id}
            className={`${labelClassName} block text-[18px] leading-[18px] font-medium text-darkGray495555`}
          >
            {label}
          </label>
          {showEditIcon ? (
            <img src={EditOutlineSvg} alt='edit-outline' />
          ) : null}
        </div>
        <div
          className={`${inputWrapperClassName} flex items-center space-x-2 mt-[18px]`}
        >
          {isMobile ? (
            <span className='sm:text-[22px] leading-[18px] font-medium'>
              +91
            </span>
          ) : null}
          {countryCodeElement}
          <input
            ref={inputRef}
            disabled={disabled}
            autoFocus={autoFocus}
            id={id}
            name={name}
            autoComplete='given-name'
            onBlur={onBlur}
            onChange={onChange}
            placeholder={placeholder}
            value={value}
            className={`sm:text-[22px] leading-[18px] font-medium outline-none w-full disabled:text-gray-500 disabled:bg-transparent ${customClassName}`}
            type={type}
          />
        </div>
      </div>
      {errors && touched ? (
        <div className='flex items-center gap-[4px] mt-[12px] validation-error'>
          <img src={AlertSvg} alt='Alert' />
          <span className='text-[16px] font-medium leading-[18px] text-RED_C62828'>
            {errors.toString()}
          </span>
        </div>
      ) : null}
    </React.Fragment>
  );
};
interface FormOtpInputProps {
  id?: string | undefined;
  value?: string;
  onChange: (otp: string) => void;
  label?: string;
  errors?:
    | string
    | string[]
    | FormikErrors<any>
    | FormikErrors<any>[]
    | undefined;
  touched?: boolean | FormikTouched<any> | FormikTouched<any>[] | undefined;
}
export const FormOtpInput: React.FC<FormOtpInputProps> = ({
  id = undefined,
  value,
  onChange = () => null,
  label = '',
  touched = false,
  errors = '',
}) => {
  return (
    <div className='border-[0.5px] border-D9DBDB rounded-[12px] pb-4 pt-2 px-5 mt-[24px]'>
      <label
        htmlFor={id}
        className='block mb-[18px] text-[18px] leading-[18px] font-medium text-darkGray495555'
      >
        {label}
      </label>
      <OtpInput
        inputStyle={{
          fontSize: 22,
          fontWeight: 500,
          lineHeight: '18px',
          outline: 'none',
        }}
        value={value}
        onChange={onChange}
        inputType='password'
        placeholder='****'
        numInputs={4}
        shouldAutoFocus={true}
        renderInput={(props) => <input id={id} {...props} />}
      />
      {errors && touched ? (
        <div className='flex items-center gap-[4px] mt-[12px] validation-error'>
          <img src={AlertSvg} alt='Alert' />
          <span className='text-[16px] font-medium leading-[18px] text-RED_C62828'>
            {errors.toString()}
          </span>
        </div>
      ) : null}
    </div>
  );
};

interface MessageInputProps {
  disabled?: boolean;
  autoFocus?: boolean;
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  onBlur?: FocusEventHandler | undefined;
  bgColor?: string;
  microphoneClick?: () => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  disabled = false,
  autoFocus = false,
  id,
  name,
  placeholder = 'Type your message here...',
  value = '',
  onChange = () => null,
  onBlur = () => null,
  bgColor = 'bg-lightGreyF4F4F4',
  microphoneClick = () => null,
}) => {
  return (
    <div className='relative flex-1'>
      <input
        disabled={disabled}
        autoFocus={autoFocus}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        className={`${bgColor} text-black placeholder:text-LIGHT_GREY_B0B0B0 text-[18px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-full block w-full pl-4 pr-12 py-[14.5px] -tracking-[0.16px] font-medium outline-none`}
      />
      <div className='absolute inset-y-0 end-0 flex items-center pe-[24px]'>
        <img
          onClick={microphoneClick}
          src={ChatMicSvg}
          alt='microphone'
          className='cursor-pointer'
        />
      </div>
    </div>
  );
};
interface FormRadioProps {
  options?: Array<string>;
  label?: string;
  onChange?: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  name?: string;
  checkedValue?: string;
  disabled?: boolean;
  errors?: string;
  touched?: boolean;
}
export const FormRadio: React.FC<FormRadioProps> = ({
  options = [],
  label = '',
  name,
  onChange,
  checkedValue,
  disabled,
  errors,
  touched,
}) => {
  return (
    <div
      className={`border-[0.5px] ${
        errors && touched ? ' border-RED_C62828' : 'border - D9DBDB'
      } rounded-[12px] pb-3 pt-2 px-5 bg-white w-full`}
    >
      <h3
        className={`mb-3 text-BLUE_3965C2 text-[18px] md:text-base md:leading-[18px] font-medium ${name}-label`}
      >
        {label}
      </h3>
      <div className='space-y-3'>
        {options.map((option, i) => (
          <label key={i} className='flex items-center cursor-pointer'>
            <input
              type='radio'
              name={name}
              value={option}
              onChange={onChange}
              checked={checkedValue === option}
              className='hidden'
              disabled={disabled}
            />
            <span className='w-4 h-4 mr-2 rounded-full border border-gray-400 flex items-center justify-center shrink-0'>
              {checkedValue === option && (
                <span className='w-2 h-2 bg-LIGHT_GREEN_8CE590 rounded-full'></span>
              )}
            </span>
            <span
              className={`text-[16px] md:text-[18px] md:leading-[18px] font-medium ${
                checkedValue === option
                  ? 'text-LIGHT_GREEN_8CE590 '
                  : 'text-black'
              }`}
            >
              {option}
            </span>
          </label>
        ))}
        {errors && touched ? (
          <div className='flex items-center gap-[4px] mt-[12px] validation-error validation-error'>
            <img src={AlertSvg} alt='Alert' />
            <span className='text-[16px] font-medium leading-[18px] text-RED_C62828'>
              {errors.toString()}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};
interface FormRadio2Props {
  options?: Array<string>;
  label?: string;
  onChange: (selectedOption: string | null) => void;
}
export const FormRadio2: React.FC<FormRadio2Props> = ({
  options = [],
  label = '',
  onChange,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const newSelection = selectedOption === value ? null : value;
    setSelectedOption(newSelection);
    onChange(newSelection);
  };
  return (
    <div className='border-l-[2px] border-l-GREY_797979 pl-[8px] mt-[24px]'>
      <div className='space-y-[24px]'>
        {options.map((option, i) => (
          <label key={i} className='flex items-center cursor-pointer'>
            <input
              type='radio'
              name='radioOption'
              value={option}
              onChange={handleRadioChange}
              checked={selectedOption === option}
              className='hidden'
            />
            <span
              className={`w-4 h-4 mr-[8px] rounded-full border ${
                selectedOption === option
                  ? 'border-darkBlue'
                  : 'border-[#DFDEDE]'
              } flex items-center justify-center shrink-0`}
            >
              {selectedOption === option && (
                <span className='w-2 h-2 bg-darkBlue rounded-full'></span>
              )}
            </span>
            <span
              className={`text-[16px] md:text-base md:leading-[18px] text-black`}
            >
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};
interface FormTextareaProps {
  disabled?: boolean | undefined;
  autoFocus?: boolean | undefined;
  id?: string | undefined;
  name?: string | undefined;
  placeholder?: string;
  value?: string;
  onChange?: ((e: React.ChangeEvent<HTMLTextAreaElement>) => void) | undefined;
  onBlur?: FocusEventHandler | undefined;
  label?: string;
}
export const FormTextarea: React.FC<FormTextareaProps> = ({
  disabled = undefined,
  autoFocus = undefined,
  id = undefined,
  name = undefined,
  placeholder = '',
  value = '',
  onChange = () => null,
  onBlur = () => null,
  label = '',
}) => {
  return (
    <div>
      <label
        htmlFor='message'
        className='block text-sm font-medium text-darkGray495555'
      >
        {label}
      </label>
      <textarea
        disabled={disabled}
        autoFocus={autoFocus}
        id={id}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
        rows={5}
        className='mt-[12px] block w-full rounded-[12px] outline-none placeholder:text-black'
      />
    </div>
  );
};
