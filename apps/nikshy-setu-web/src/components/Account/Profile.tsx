import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  CadresByTypesApiResponse,
  CadreTypesApiResponse,
  DefaultCadreTypesApiResponse,
} from '@nikshay-setu-v3-monorepo/types';
import { isEmpty } from '@nikshay-setu-v3-monorepo/utils';
import { FormikErrors, FormikTouched, FormikValues } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLanguageObject } from '../../utils/HelperHooks';
import { BorderedInput } from '../Inputs/FormInput';
import { CountryCodeSelectElement, FormSelect } from '../Inputs/FormSelect';
import { AddProfilePicture } from './AddProfilePicture';
import { loginFormFieldType } from './LoginModal';
interface ProfileProps {
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  handleBlur?: {
    (e: React.FocusEvent<any>): void;
    <T = string | any>(fieldOrEvent: T): T extends string
      ? (e: any) => void
      : void;
  };
  values: loginFormFieldType;
  errors: FormikErrors<FormikValues>;
  touched: FormikTouched<FormikValues>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  setValues: (values: loginFormFieldType) => void;
  wrapperClassName?: string;
  isNumOrEmail?: 'Email' | 'Mobile';
}
export const Profile: React.FC<ProfileProps> = ({
  handleChange = () => null,
  handleBlur = () => null,
  errors,
  setFieldValue,
  touched,
  values,
  setValues,
  wrapperClassName = '',
  isNumOrEmail = 'Mobile',
}) => {
  const dispatch = useDispatch();
  const [langKey, getText, objectToValue] = useLanguageObject();

  const [carderInfo, setCadreInfo] = useState<{
    isCadreDisable: boolean;
    cadreOption: CadresByTypesApiResponse;
  }>({
    isCadreDisable: true,
    cadreOption: [],
  });
  const [dropDownOptions, setDropDownOptions] = useState({
    cadreType: [],
    country: [],
  });
  useEffect(() => {
    if (dispatch) {
      if (!isEmpty(values?.cadreType)) {
        dispatch(
          createAction<null, CadresByTypesApiResponse>(
            {
              method: 'GET',
              query: (values?.cadreType && values?.cadreType) || '',
              url: 'CADRES_BY_TYPES',
            },
            (code, res) => {
              if (Array.isArray(res)) {
                setCadreInfo({ cadreOption: res, isCadreDisable: false });
              }
            }
          )
        );
      }
      dispatch(
        createAction<null, CadreTypesApiResponse>(
          {
            method: 'GET',
            url: 'CADRES_TYPES',
          },
          (code, res) => {
            if (Array.isArray(res)) {
              console.log({ res });
              setDropDownOptions((old) => ({ ...old, cadreType: res }));
            }
          }
        )
      );

      // get country code
      dispatch(
        createAction<null, CadreTypesApiResponse>(
          {
            method: 'GET',
            url: 'COUNTRY',
          },
          (code, res) => {
            if (Array.isArray(res)) {
              setDropDownOptions((old) => ({ ...old, country: res }));
            }
          }
        )
      );
    }
  }, []);

  const profileHandleChange = ({ nativeEvent }: React.ChangeEvent<any>) => {
    const element = nativeEvent.target as HTMLInputElement;

    // call api for upload image
    if (element.files[0]) {
      const formData = new FormData();
      formData.append('isUserProfile', 'true');
      formData.append('file', element.files[0]);

      dispatch(
        createAction<unknown, string[]>(
          {
            method: 'POST',
            url: 'UPLOAD',
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
          (code, res) => {
            if (code === 200 && Array.isArray(res)) {
              setFieldValue('profileImage', res[0], true);
            }
          }
        )
      );
    }
  };

  const countryCodeOnChange = ({ value }) => {
    if (value == '+91') {
      const INDIA = dropDownOptions?.country?.filter(
        (v) => v?.title === 'INDIA'
      )?.[0];
      setValues({
        ...values,
        districtId: null,
        blockId: null,
        healthFacilityId: null,
        stateId: null,
        country: INDIA?._id,
        cadreId: null,
        countryCode: value,
        cadreType: null,
      });
    } else {
      dispatch(
        createAction<null, DefaultCadreTypesApiResponse>(
          {
            method: 'GET',
            url: 'GET_DEFAULT_CADRE',
          },
          (code, res) => {
            if (code === 200) {
              const INTERNATIONAL = dropDownOptions?.country?.filter(
                (v) => v?.title === 'INTERNATIONAL'
              )?.[0];
              setValues({
                ...values,
                districtId: res?.districtId?._id,
                blockId: null,
                healthFacilityId: null,
                stateId: res?.stateId?._id,
                country: INTERNATIONAL?._id,
                cadreId: res?.cadreId?._id,
                countryCode: value,
                cadreType: res?.cadreType?.cadreType,
              });
            }
          }
        )
      );
    }
    // setFieldValue('countryCode', value)
  };
  const countryCodeElement = (
    <CountryCodeSelectElement
      disabled={isNumOrEmail == 'Mobile'}
      value={values.countryCode}
      onChange={countryCodeOnChange}
    />
  );

  return (
    <div>
      <div
        className={`${wrapperClassName} overflow-auto h-[255px] hide-scrollbar`}
      >
        <div className='space-y-4'>
          <AddProfilePicture
            name='profileImage'
            onImageChange={profileHandleChange}
            values={values}
          />
          <BorderedInput
            id='fullName'
            name='name'
            label={getText('LABEL_FULL_NAME') + '*'}
            value={(values?.name && values?.name) || ''}
            onChange={handleChange}
            touched={touched?.name}
            errors={errors?.name}
            onBlur={handleBlur}
          />
          <BorderedInput
            id='mobile-no'
            name='phoneNo'
            disabled={isNumOrEmail == 'Mobile'}
            label={getText('LABEL_MOBILE_NUM') + '*'}
            value={values?.phoneNo}
            onChange={handleChange}
            type='number'
            countryCodeElement={countryCodeElement}
            touched={touched?.phoneNo}
            errors={errors?.phoneNo}
            onBlur={handleBlur}
          />
          <BorderedInput
            id='email'
            disabled={isNumOrEmail == 'Email'}
            name='email'
            label={getText('LABEL_EMAIL')}
            value={values?.email}
            onChange={handleChange}
            touched={touched?.email}
            errors={errors?.email}
            onBlur={handleBlur}
          />

          {values.countryCode == '+91' && (
            <>
              <FormSelect
                id='cadreType'
                name='cadreType'
                label={getText('LABEL_CADRE_TYPE') + '*'}
                options={dropDownOptions?.cadreType?.map((v) => {
                  return { label: v.replace(/_/g, ' '), value: v };
                })}
                placeholder='Select cadre level'
                value={(values?.cadreType && values?.cadreType) || ''}
                onChange={(v) => {
                  setCadreInfo({ cadreOption: [], isCadreDisable: true });
                  setValues({
                    ...values,
                    districtId: null,
                    blockId: null,
                    healthFacilityId: null,
                    stateId: null,
                    cadreId: null,
                    cadreType: v?.value,
                  });
                  dispatch(
                    createAction<null, CadresByTypesApiResponse>(
                      {
                        method: 'GET',
                        query: v?.value,
                        url: 'CADRES_BY_TYPES',
                      },
                      (code, res) => {
                        if (Array.isArray(res)) {
                          setCadreInfo({
                            cadreOption: res,
                            isCadreDisable: false,
                          });
                        }
                      }
                    )
                  );
                }}
                touched={touched?.cadreType}
                errors={errors?.cadreType}
                onBlur={handleBlur}
              />
              <FormSelect
                id='cadre'
                name='cadre'
                label={getText('LABEL_CADRE') + '*'}
                options={carderInfo?.cadreOption?.map((v) => {
                  return { label: v?.title, value: v?._id };
                })}
                disabled={Boolean(carderInfo?.cadreOption?.length === 0)}
                placeholder='Select cadre'
                isSearchable
                value={(values?.cadreId && values?.cadreId) || ''}
                onChange={(v) => {
                  setFieldValue('cadreId', v?.value, true);
                }}
                touched={touched?.cadreId}
                errors={errors?.cadreId}
                onBlur={handleBlur}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
