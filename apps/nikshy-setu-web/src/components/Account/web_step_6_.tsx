import { EditOutlineSvg } from '@nikshay-setu-v3-monorepo/assets';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  CadresByTypesApiResponse,
  RootReducerStates,
} from '@nikshay-setu-v3-monorepo/types';
import { isEmpty } from '@nikshay-setu-v3-monorepo/utils';
import { FormikErrors, FormikTouched, FormikValues } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BorderedInput } from '../Inputs/FormInput';
import { AddProfilePicture } from './AddProfilePicture';
type CadreTypeType =
  | 'Block_Level'
  | 'District_Level'
  | 'National_Level'
  | 'State_Level'
  | 'Health-facility_Level';
const isValidCadreType = (value: string): value is CadreTypeType => {
  const validCadreTypes: CadreTypeType[] = [
    'Block_Level',
    'District_Level',
    'National_Level',
    'State_Level',
    'Health-facility_Level',
  ];

  return validCadreTypes.includes(value as CadreTypeType);
};
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
  values: {
    name: string | null | undefined;
    email: string;
    country: string | null | undefined;
    phoneNo: string;
    cadreType: string | CadreTypeType;
    stateId: string | null | undefined;
    cadreId: undefined | null | string;
    districtId: undefined | null | string;
    blockId: undefined | null | string;
    healthFacilityId: undefined | null | string;
    // cadreType: string;

    otp: string | null | undefined;
    profileImage: string | null | undefined;
  };
  errors: FormikErrors<FormikValues>;
  touched: FormikTouched<FormikValues>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  setValues: (values: {
    cadreId: undefined | null | string;
    stateId: undefined | null | string;
    districtId: undefined | null | string;
    blockId: undefined | null | string;
    healthFacilityId: undefined | null | string;
    cadreType: undefined | null | string;

    name: string | null | undefined;
    email: string;
    country: string | null | undefined;
    phoneNo: string;
    otp: string | null | undefined;
    profileImage: string | null | undefined;
  }) => void;
  onClickEdit?: () => void;
  wrapperClassName?: string;
}
export const Step6: React.FC<ProfileProps> = ({
  handleChange = () => null,
  handleBlur = () => null,
  errors,
  setFieldValue,
  touched,
  values,
  setValues,
  onClickEdit,
  wrapperClassName = '',
}) => {
  const dispatch = useDispatch();
  const [cadreId, setCadreId] = useState('');
  const { error, data, loadingApis } = useSelector(
    (state: RootReducerStates) => state.appContext
  );
  useEffect(() => {
    if (dispatch) {
      if (!isEmpty(values?.cadreType)) {
        dispatch(
          createAction<null, CadresByTypesApiResponse>(
            {
              method: 'GET',
              url: 'CADRES_BY_TYPES',
              query: values?.cadreType,
            },
            (v, res) => {
              if (v == 200) {
                const selectedCadre = res?.find(
                  (cadre) => cadre?._id === values?.cadreId
                );
                setCadreId(selectedCadre?.title);
              }
            }
          )
        );
      }
    }
  }, []);

  return (
    <div>
      <div
        className={`${wrapperClassName} overflow-auto h-[255px] hide-scrollbar`}
      >
        <div className='space-y-4'>
          <AddProfilePicture onImageChange={() => {}} />
          <BorderedInput
            id='email'
            name='email'
            type='email'
            label='Email Address'
            value={values?.email}
            touched={touched?.email}
            errors={errors?.email}
            onChange={handleChange}
            inputWrapperClassName='!mt-[8px]'
            placeholder={'Not Available'}
          />
          <div className='space-y-3'>
            <div className='flex justify-between items-center'>
              <h6 className='font-medium leading-[22px] text-darkBlue -tracking-[0.16px]'>
                Personal Details
              </h6>
              <img
                src={EditOutlineSvg}
                alt='edit-outline'
                onClick={() => onClickEdit()}
                className='cursor-pointer'
              />
            </div>
            <div className='space-y-[24px] border-[0.5px] border-D9DBDB p-[24px] rounded-[10px]'>
              <div className='grid sm:grid-cols-2 sm:divide-x sm:divide-D9DBDB'>
                <BorderedInput
                  wrapperClassName='!border-0 !p-0'
                  id='fullName'
                  name='name'
                  label='Full Name'
                  value={(values?.name && values?.name) || ''}
                  disabled
                  inputWrapperClassName='!mt-[8px]'
                  placeholder={'Not Available'}
                  onChange={(v) => setFieldValue('name', v, true)}
                />
                <div className='sm:pl-4 mt-[24px] sm:mt-0'>
                  <BorderedInput
                    wrapperClassName='!border-0 !p-0'
                    id='mobile-no'
                    name='phoneNo'
                    label='Mobile number*'
                    value={values?.phoneNo}
                    disabled
                    isMobile
                    inputWrapperClassName='!mt-[8px]'
                    placeholder={'Not Available'}
                    onChange={(v) => setFieldValue('phoneNo', v, true)}
                  />
                </div>
              </div>
              <BorderedInput
                wrapperClassName='!border-0 !p-0'
                value={values?.cadreType?.replace(/_/g, ' ')}
                id='cadreType'
                name='cadreType'
                label='Cadre Type'
                disabled
                inputWrapperClassName='!mt-[8px]'
                placeholder={'Not Available'}
                onChange={(v) => {
                  setValues({
                    ...values,
                    districtId: null,
                    blockId: null,
                    healthFacilityId: null,
                    stateId: null,
                    cadreId: null,
                    cadreType: v.target.value,
                  });
                }}
              />
              <BorderedInput
                value={cadreId || 'Not Available'}
                wrapperClassName='!border-0 !p-0'
                id='cadre'
                name='cadre'
                label='Cadre'
                disabled
                inputWrapperClassName='!mt-[8px]'
                placeholder={'Not Available'}
                onChange={(v) => setFieldValue('cadreId', v, true)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
