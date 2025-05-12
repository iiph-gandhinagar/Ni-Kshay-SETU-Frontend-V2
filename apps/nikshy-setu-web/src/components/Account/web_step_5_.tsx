import { CadreStateTypes } from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  BlockApiResponse,
  DistrictsApiResponse,
  HealthFacilityApiResponse,
  StateApiResponse,
} from '@nikshay-setu-v3-monorepo/types';
import { isEmpty } from '@nikshay-setu-v3-monorepo/utils';
import { FormikErrors, FormikTouched, FormikValues } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLanguageObject } from '../../utils/HelperHooks';
import { FormSelect } from '../Inputs/FormSelect';
import { loginFormFieldType } from './LoginModal';
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

  return validCadreTypes?.includes(value as CadreTypeType);
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
  values: loginFormFieldType;
  errors: FormikErrors<FormikValues>;
  touched: FormikTouched<FormikValues>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  setValues: (values: loginFormFieldType) => void;
  wrapperClassName?: string;
}
export const Step5: React.FC<ProfileProps> = ({
  handleChange = () => null,
  handleBlur = () => null,
  errors,
  setFieldValue,
  touched,
  values,
  setValues,
  wrapperClassName = '',
}) => {
  const [dropDownOptions, setDropDownOptions] = useState<{
    districtOption: DistrictsApiResponse;
    blockOption: BlockApiResponse;
    stateOption: StateApiResponse;
    healthFacilities: HealthFacilityApiResponse;
  }>({
    stateOption: [],
    districtOption: [],
    healthFacilities: [],
    blockOption: [],
  });
  const dispatch = useDispatch();
  const [langKey, getText, objectToValue] = useLanguageObject();

  useEffect(() => {
    if (!isEmpty(values.stateId)) {
      dispatch(
        createAction<null, DistrictsApiResponse>(
          {
            method: 'GET',
            url: 'DISTRICTS',
            query: values?.stateId || '',
          },
          (v, res) => {
            if (v === 200 && Array.isArray(res)) {
              setDropDownOptions((perviousVal) => ({
                ...perviousVal,
                districtOption: (Array.isArray(res) && res) || [],
              }));
            }
          }
        )
      );
      if (!isEmpty(values?.districtId)) {
        dispatch(
          createAction<null, BlockApiResponse>(
            {
              method: 'GET',
              url: 'BLOCKS',
              query: values?.districtId || '',
            },
            (v, res) => {
              if (v === 200 && Array.isArray(res)) {
                setDropDownOptions((perviousVal) => ({
                  ...perviousVal,
                  blockOption: (Array.isArray(res) && res) || [],
                }));
              }
            }
          )
        );
      }
    }
    dispatch(
      createAction<null, StateApiResponse>(
        {
          method: 'GET',
          url: 'STATES',
        },
        (v, res) => {
          if (v === 200 && Array.isArray(res)) {
            setDropDownOptions((perviousVal) => ({
              ...perviousVal,
              stateOption: (Array.isArray(res) && res) || [],
            }));
          }
        }
      )
    );
  }, []);
  return (
    <div>
      <div
        className={`${wrapperClassName} overflow-auto h-[255px] hide-scrollbar`}
      >
        <div className='space-y-4'>
          {isValidCadreType(values?.cadreType) &&
            CadreStateTypes?.[values?.cadreType]?.includes('State_Level') && (
              <FormSelect
                id='State'
                name='stateId'
                label={getText('LABEL_STATE')}
                options={
                  (dropDownOptions?.stateOption &&
                    dropDownOptions?.stateOption?.map((v) => {
                      return { label: v?.title, value: v?._id };
                    })) ||
                  []
                }
                errors={errors?.stateId}
                touched={touched.stateId as boolean}
                value={values.stateId || ''}
                onChange={(v) => {
                  setValues({
                    ...values,
                    districtId: '',
                    blockId: '',
                    healthFacilityId: '',
                    stateId: v?.value,
                  });
                  dispatch(
                    createAction<null, DistrictsApiResponse>(
                      {
                        method: 'GET',
                        url: 'DISTRICTS',
                        query: v?.value,
                      },
                      (v, res) => {
                        if (Array.isArray(res)) {
                          setDropDownOptions({
                            ...dropDownOptions,
                            districtOption: (Array.isArray(res) && res) || [],
                          });
                        }
                      }
                    )
                  );
                }}
                placeholder='Select State'
                onBlur={handleBlur}
              />
            )}

          {isValidCadreType(values?.cadreType) &&
            CadreStateTypes?.[values?.cadreType]?.includes(
              'District_Level'
            ) && (
              <FormSelect
                id='District'
                name='districtId'
                label={getText('LABEL_DISTRICT')}
                options={
                  (dropDownOptions?.districtOption &&
                    dropDownOptions?.districtOption?.map((v) => {
                      return { label: v?.title, value: v?._id };
                    })) ||
                  []
                }
                errors={errors.districtId as string}
                touched={touched.districtId as boolean}
                value={values.districtId}
                placeholder='Select District'
                onBlur={handleBlur}
                onChange={(v) => {
                  setValues({
                    ...values,
                    blockId: '',
                    healthFacilityId: '',
                    districtId: v?.value,
                  });
                  dispatch(
                    createAction<null, BlockApiResponse>(
                      {
                        method: 'GET',
                        url: 'BLOCKS',
                        query: v?.value,
                      },
                      (v, res) => {
                        if (v === 200 && Array.isArray(res)) {
                          setDropDownOptions({
                            ...dropDownOptions,
                            blockOption: (Array.isArray(res) && res) || [],
                          });
                        }
                      }
                    )
                  );
                }}
                disabled={dropDownOptions?.districtOption?.length === 0}
              />
            )}

          {isValidCadreType(values?.cadreType) &&
            CadreStateTypes?.[values?.cadreType]?.includes('Block_Level') && (
              <FormSelect
                id='blockId'
                label={getText('LABEL_TU')}
                name='blockId'
                options={
                  (dropDownOptions?.blockOption &&
                    dropDownOptions?.blockOption?.map((v) => {
                      return { label: v?.title, value: v?._id };
                    })) ||
                  []
                }
                errors={errors.blockId as string}
                touched={touched.blockId as boolean}
                value={values.blockId}
                placeholder='Select TU'
                onBlur={handleBlur}
                onChange={(v) => {
                  setValues({
                    ...values,
                    healthFacilityId: '',
                    blockId: v?.value,
                  });

                  dispatch(
                    createAction<null, HealthFacilityApiResponse>(
                      {
                        method: 'GET',
                        url: 'HEALTH_FACILITIES',
                        query: v?.value,
                      },
                      (v, res) => {
                        if (v === 200 && Array.isArray(res)) {
                          setDropDownOptions({
                            ...dropDownOptions,
                            healthFacilities: (Array.isArray(res) && res) || [],
                          });
                        }
                      }
                    )
                  );
                }}
              />
            )}

          {isValidCadreType(values?.cadreType) &&
            CadreStateTypes?.[values?.cadreType]?.includes(
              'Health-facility_Level'
            ) && (
              <FormSelect
                id='cadreType'
                name='healthFacilityId'
                options={
                  (dropDownOptions?.healthFacilities &&
                    dropDownOptions?.healthFacilities?.map((v) => {
                      return { label: v?.healthFacilityCode, value: v?._id };
                    })) ||
                  []
                }
                errors={errors.healthFacilityId as string}
                touched={touched.healthFacilityId as boolean}
                value={values.healthFacilityId}
                label={getText('LABEL_HEALTH_FACILITY')}
                disabled={dropDownOptions?.healthFacilities?.length === 0}
                placeholder='Select Health Facility'
                onBlur={handleBlur}
                onChange={(v) => {
                  setFieldValue('healthFacilityId', v?.value, true);
                }}
              />
            )}
        </div>
      </div>
    </div>
  );
};
