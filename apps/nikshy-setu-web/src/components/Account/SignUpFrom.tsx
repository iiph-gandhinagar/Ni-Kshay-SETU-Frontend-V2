import { CadreStateTypes } from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  CadreTypesApiResponse,
  DefaultCadreTypesApiResponse,
} from '@nikshay-setu-v3-monorepo/types';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  getBlocks,
  getCadres,
  getCadresTypes,
  getDistricts,
  getHealthFacility,
  getStates,
} from '../../utils/ApiHelper';
import { useLanguageObject } from '../../utils/HelperHooks';
import { BorderedInput } from '../Inputs/FormInput';
import { CountryCodeSelectElement, FormSelect } from '../Inputs/FormSelect';
import { AddProfilePicture } from './AddProfilePicture';
import { StepComponentProps } from './LoginModal';

export const SignUpFrom: React.FC<StepComponentProps> = ({
  formik,
  dispatchState,
  state,
}) => {
  const dispatch = useDispatch();
  const [langKey, getText, objectToValue] = useLanguageObject();

  const [dropDownOptions, setDropDownOptions] = useState({
    cadreType: [],
    country: [],
    carder: [],
    state: [],
    districts: [],
    block: [],
    healthFacility: [],
  });
  useEffect(() => {
    if (dispatch) {
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

      // get cadre types
      getCadresTypes().then((res) => {
        setDropDownOptions((old) => ({ ...old, cadreType: res }));
      });

      // get cadre
      if (formik.values.cadreType) {
        getCadres(formik.values.cadreType).then((res) => {
          setDropDownOptions((oldValues) => ({ ...oldValues, carder: res }));
        });
      }

      // get state
      if (formik.values.cadreId) {
        getStates().then((res) => {
          setDropDownOptions((oldValues) => ({ ...oldValues, state: res }));
        });
      }

      // get districts select dropdown options
      if (formik.values.stateId) {
        getDistricts(formik.values.stateId).then((res) => {
          setDropDownOptions((oldValues) => ({ ...oldValues, districts: res }));
        });
      }

      // get block select dropdown options
      if (formik.values.districtId) {
        getBlocks(formik.values.districtId).then((res) => {
          setDropDownOptions((oldValues) => ({ ...oldValues, block: res }));
        });
      }

      // get healthFacility select dropdown options
      if (formik.values.blockId) {
        getBlocks(formik.values.blockId).then((res) => {
          setDropDownOptions((oldValues) => ({
            ...oldValues,
            healthFacility: res,
          }));
        });
      }
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
              formik.setFieldValue('profileImage', res[0], true);
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
      formik.setValues({
        ...formik.values,
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
              formik.setValues({
                ...formik.values,
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
  };
  const countryCodeElement = (
    <CountryCodeSelectElement
      disabled={state.contactMethod == 'Mobile'}
      value={formik.values.countryCode}
      onChange={countryCodeOnChange}
    />
  );
  const MobileNumberElement = (
    <BorderedInput
      name='phoneNo'
      disabled={state.contactMethod == 'Mobile' && state.isLogin}
      label={getText('LABEL_MOBILE_NUM') + '*'}
      value={formik.values.phoneNo}
      onChange={formik.handleChange}
      type='number'
      countryCodeElement={countryCodeElement}
      touched={formik.touched?.phoneNo}
      errors={formik.errors?.phoneNo}
      onBlur={formik.handleBlur}
      placeholder='Enter Mobile Number'
    />
  );
  const EmailElement = (
    <BorderedInput
      disabled={state.contactMethod == 'Email' && state.isLogin}
      name='email'
      label={getText('LABEL_EMAIL')}
      value={formik.values.email}
      onChange={formik.handleChange}
      touched={formik.touched?.email}
      errors={formik.errors?.email}
      onBlur={formik.handleBlur}
      placeholder='Enter Email'
    />
  );
  return (
    <div>
      <div className={`overflow-auto h-[255px] hide-scrollbar`}>
        <div className='space-y-4'>
          {state.isLogin == false && (
            <>
              {state.contactMethod == 'Mobile'
                ? MobileNumberElement
                : EmailElement}
            </>
          )}
          <AddProfilePicture
            name='profileImage'
            onImageChange={profileHandleChange}
            values={formik.values}
          />
          <BorderedInput
            name='name'
            label={getText('LABEL_FULL_NAME') + '*'}
            value={formik.values.name}
            onChange={formik.handleChange}
            touched={formik.touched?.name}
            errors={formik.errors?.name}
            onBlur={formik.handleBlur}
          />
          {state.isLogin == true && (
            <>
              {MobileNumberElement} {EmailElement}
            </>
          )}
          {state.isLogin == false && (
            <>
              {state.contactMethod == 'Email'
                ? MobileNumberElement
                : EmailElement}
            </>
          )}
          {formik.values.countryCode == '+91' && (
            <>
              <FormSelect
                name='cadreType'
                label={getText('LABEL_CADRE_TYPE') + '*'}
                options={dropDownOptions.cadreType
                  .map((v) => {
                    return { label: v.replace(/_/g, ' '), value: v };
                  })
                  .filter((v) => v.label !== 'International Level')}
                placeholder='Select cadre level'
                value={formik.values.cadreType}
                onChange={(v) => {
                  // set value and remove depending select value
                  const countryTitle =
                    formik.values.countryCode == '+91'
                      ? 'INDIA'
                      : 'INTERNATIONAL';
                  const countryObject = dropDownOptions.country?.filter(
                    (v) => v?.title == countryTitle
                  )?.[0];
                  formik.setValues({
                    ...formik.values,
                    country: countryObject?._id,
                    cadreType: v.value,
                    cadreId: null,
                    stateId: null,
                    districtId: null,
                    blockId: null,
                    healthFacilityId: null,
                  });

                  // get carder select dropdown options
                  getCadres(v.value).then((res) => {
                    setDropDownOptions((oldValues) => ({
                      ...oldValues,
                      carder: res,
                    }));
                  });
                }}
                touched={formik.touched?.cadreType}
                errors={formik.errors?.cadreType}
                onBlur={formik.handleBlur}
              />

              {/* if cadreType is available */}
              {formik.values.cadreType && (
                <FormSelect
                  name='cadre'
                  label={getText('LABEL_CADRE') + '*'}
                  options={dropDownOptions.carder.map((v) => {
                    return { label: v.title, value: v._id };
                  })}
                  disabled={dropDownOptions.carder.length === 0}
                  placeholder='Select cadre'
                  isSearchable
                  value={formik.values.cadreId}
                  onChange={(v) => {
                    // set value and remove depending select value
                    formik.setValues({
                      ...formik.values,
                      cadreId: v.value,
                      stateId: null,
                      districtId: null,
                      blockId: null,
                      healthFacilityId: null,
                    });

                    // get state select dropdown options
                    getStates().then((res) => {
                      setDropDownOptions((oldValues) => ({
                        ...oldValues,
                        state: res,
                      }));
                    });
                  }}
                  touched={formik.touched?.cadreId}
                  errors={formik.errors?.cadreId}
                  onBlur={formik.handleBlur}
                />
              )}

              {/* if cadreId is available */}
              {CadreStateTypes[formik.values.cadreType]?.includes(
                'State_Level'
              ) && (
                <FormSelect
                  name='stateId'
                  label={getText('LABEL_STATE') + '*'}
                  options={dropDownOptions.state.map((v) => {
                    return { label: v.title, value: v._id };
                  })}
                  disabled={dropDownOptions.state.length === 0}
                  placeholder='Select State'
                  isSearchable
                  value={formik.values.stateId}
                  onChange={(v) => {
                    // set value and remove depending select value
                    formik.setValues({
                      ...formik.values,
                      stateId: v.value,
                      districtId: null,
                      blockId: null,
                      healthFacilityId: null,
                    });

                    // get districts select dropdown options
                    getDistricts(v.value).then((res) => {
                      setDropDownOptions((oldValues) => ({
                        ...oldValues,
                        districts: res,
                      }));
                    });
                  }}
                  touched={formik.touched?.stateId}
                  errors={formik.errors?.stateId}
                  onBlur={formik.handleBlur}
                />
              )}

              {/* if stateId is available */}
              {CadreStateTypes[formik.values.cadreType]?.includes(
                'District_Level'
              ) && (
                <FormSelect
                  name='districtId'
                  label={getText('APP_DISTRICT') + '*'}
                  options={dropDownOptions.districts.map((v) => {
                    return { label: v.title, value: v._id };
                  })}
                  disabled={dropDownOptions.districts.length === 0}
                  placeholder='Select district'
                  isSearchable
                  value={formik.values.districtId}
                  onChange={(v) => {
                    // set value and remove depending select value
                    formik.setValues({
                      ...formik.values,
                      districtId: v.value,
                      blockId: null,
                      healthFacilityId: null,
                    });

                    // get block select dropdown options
                    getBlocks(v.value).then((res) => {
                      setDropDownOptions((oldValues) => ({
                        ...oldValues,
                        block: res,
                      }));
                    });
                  }}
                  touched={formik.touched?.districtId}
                  errors={formik.errors?.districtId}
                  onBlur={formik.handleBlur}
                />
              )}

              {/* if districtId is available */}
              {CadreStateTypes[formik.values.cadreType]?.includes(
                'Block_Level'
              ) && (
                <FormSelect
                  name='blockId'
                  label={getText('LABEL_TU') + '*'}
                  options={dropDownOptions.block.map((v) => {
                    return { label: v.title, value: v._id };
                  })}
                  disabled={dropDownOptions.block.length === 0}
                  placeholder='Select TU'
                  isSearchable
                  value={formik.values.blockId}
                  onChange={(v) => {
                    // set value and remove depending select value
                    formik.setValues({
                      ...formik.values,
                      blockId: v.value,
                      healthFacilityId: null,
                    });

                    // get healthFacility select dropdown options
                    getHealthFacility(v.value).then((res) => {
                      setDropDownOptions((oldValues) => ({
                        ...oldValues,
                        healthFacility: res,
                      }));
                    });
                  }}
                  touched={formik.touched?.blockId}
                  errors={formik.errors?.blockId}
                  onBlur={formik.handleBlur}
                />
              )}

              {/* if blockId is available */}
              {CadreStateTypes[formik.values.cadreType]?.includes(
                'Health-facility_Level'
              ) && (
                <FormSelect
                  name='healthFacilityId'
                  label={getText('LABEL_HEALTH_FACILITY') + '*'}
                  options={dropDownOptions.healthFacility.map((v) => {
                    return { label: v.healthFacilityCode, value: v._id };
                  })}
                  disabled={dropDownOptions.healthFacility.length === 0}
                  placeholder='Select health Facility'
                  isSearchable
                  value={formik.values.healthFacilityId}
                  onChange={(v) => {
                    formik.setFieldValue('healthFacilityId', v.value, true);
                  }}
                  touched={formik.touched?.healthFacilityId}
                  errors={formik.errors?.healthFacilityId}
                  onBlur={formik.handleBlur}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
