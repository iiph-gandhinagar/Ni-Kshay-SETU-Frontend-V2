import { AlertSvg } from '@nikshay-setu-v3-monorepo/assets';
import { CountryCodes } from '@nikshay-setu-v3-monorepo/constants';
import { FormikErrors, FormikTouched } from 'formik';
import React, { CSSProperties, FocusEventHandler } from 'react';
import Select, { components, SingleValue } from 'react-select';
import { ArrowDown } from '../Icon/ArrowDown';
interface FormSelectProps {
  id?: string | undefined;
  name?: string | undefined;
  disabled?: boolean;
  options?: Array<{ value: string; label: string }>;
  value?: string | string[];
  onBlur?: FocusEventHandler | undefined;
  onChange?: (
    newValue: SingleValue<{
      value: string;
      label: string;
    }>
  ) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  label?: string;
  placeholder?: string;
  isSearchable?: boolean;
  stroke?: string | undefined;
  customClass?: string;
  inputColor?: string;
  labelClass?: string;
  placeholderColor?: string;
  controlStyles?: CSSProperties;
  customPlaceholderStyles?: CSSProperties;
  customDropdownIndicatorStyles?: CSSProperties;
  arrowWidth?: number;
  arrowHeight?: number;
  errors?:
    | string
    | string[]
    | FormikErrors<any>
    | FormikErrors<any>[]
    | undefined;
  touched?: boolean | FormikTouched<any> | FormikTouched<any>[] | undefined;
  wrapperClassName?: string;
  isMulti?: boolean;
  showDropdownIndicator?: boolean;
}
export const FormSelect: React.FC<FormSelectProps> = ({
  id = undefined,
  name = undefined,
  value = '',
  disabled = false,
  options = [],
  onBlur = () => null,
  onChange = () => null,
  label = '',
  placeholder = '',
  labelClass = '',
  isSearchable = false,
  customClass = '',
  stroke = '#000000',
  inputColor = '#000000',
  placeholderColor = '#808080',
  controlStyles,
  customPlaceholderStyles,
  customDropdownIndicatorStyles,
  arrowWidth = 28,
  arrowHeight = 28,
  touched = false,
  errors = '',
  wrapperClassName = '',
  isMulti,
  showDropdownIndicator = true,
}) => {
  const CaretDownIcon = () => {
    return (
      <ArrowDown
        stroke={stroke}
        arrowWidth={arrowWidth}
        arrowHeight={arrowHeight}
      />
    );
  };
  const DropdownIndicator = (props: any) => {
    // eslint-disable-line @typescript-eslint/no-explicit-any
    return (
      <>
        {showDropdownIndicator && (
          <components.DropdownIndicator {...props}>
            <CaretDownIcon />
          </components.DropdownIndicator>
        )}
      </>
    );
  };
  return (
    <div
      className={`${wrapperClassName} border-[0.5px] ${
        errors && touched ? 'border-RED_C62828' : 'border-D9DBDB'
      } rounded-[12px] pb-4 pt-2 px-5`}
    >
      <label
        htmlFor={id}
        className={`block text-[18px] leading-[18px] font-medium text-darkGray495555 ${labelClass}`}
      >
        {label}
      </label>
      <Select
        id={id}
        name={name}
        isDisabled={disabled}
        onBlur={onBlur}
        onChange={onChange}
        value={options.filter((v) =>
          Array.isArray(value)
            ? value.find((optionValue) => optionValue == v.value)
            : v.value === value
        )}
        options={options?.map((e) => {
          return { value: e?.value, label: e?.label };
        })}
        {...{ isMulti }}
        isSearchable={isSearchable}
        placeholder={placeholder}
        noOptionsMessage={() => 'No result found.'}
        styles={{
          singleValue: (baseStyles) => ({
            ...baseStyles,
            fontSize: 22,
            fontWeight: 500,
            lineHeight: '18px',
            color: '#000000',
          }),
          input: (baseStyles) => ({
            ...baseStyles,
            fontSize: 22,
            fontWeight: 500,
            lineHeight: '18px',
            color: inputColor,
          }),
          placeholder: (baseStyles) => ({
            ...baseStyles,
            fontSize: 22,
            fontWeight: 500,
            lineHeight: '18px',
            color: placeholderColor,
            ...customPlaceholderStyles,
          }),
          valueContainer: (baseStyles) => ({
            ...baseStyles,
            padding: 0,
          }),
          control: (baseStyles) => ({
            ...baseStyles,
            border: 0,
            boxShadow: 'none',
            ...controlStyles,
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            fontSize: 18,
            fontWeight: 400,
            lineHeight: '23.9px',
            color: state.isSelected ? 'white' : '#495555',
            backgroundColor: state.isSelected ? '#394F89' : 'white',
          }),
          indicatorSeparator: () => ({
            backgroundColor: 'transparent',
          }),
          dropdownIndicator: (baseStyles) => ({
            ...baseStyles,
            ...customDropdownIndicatorStyles,
          }),
          menu: (provided) => ({
            ...provided,
            minWidth: '100px',
          }),
          menuPortal: (base) => ({
            ...base,
            zIndex: 999999,
          }),
        }}
        menuPortalTarget={document.body}
        menuPosition='fixed'
        className={`mt-[18px] ${customClass}`}
        components={{ DropdownIndicator }}
      />
      {errors && touched ? (
        <div className='flex items-center gap-[4px] mt-[12px]'>
          <img src={AlertSvg} alt='Alert' />
          <span className='text-[16px] font-medium leading-[18px] text-RED_C62828'>
            {errors.toString()}
          </span>
        </div>
      ) : null}
    </div>
  );
};

type countryCodeSelectElementType = {} & FormSelectProps;

export const CountryCodeSelectElement: React.FC<
  countryCodeSelectElementType
> = ({ value, onChange, ...rest }) => {
  return (
    <FormSelect
      id='country-code'
      name='country-code'
      options={CountryCodes.map(({ dial_code: value }) => ({
        value,
        label: value,
      }))}
      wrapperClassName='!border-0 min-w-[70px] !p-0'
      customClass='!mt-0'
      value={value}
      onChange={onChange}
      {...rest}
      showDropdownIndicator={false}
    />
  );
};
