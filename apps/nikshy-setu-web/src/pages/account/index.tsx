import {
  CadreStateError,
  step1ValidationSchema,
  step4ValidationSchema,
} from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  BlockApiResponse,
  CadresByTypesApiResponse,
  DistrictsApiResponse,
  HealthFacilityApiResponse,
  RootReducerStates,
  StateApiResponse,
  UpdateUserApiReq,
  UserValidationApiResponse,
} from '@nikshay-setu-v3-monorepo/types';
import { filterObject } from '@nikshay-setu-v3-monorepo/utils';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UserProfileApiResponse } from 'shared/types/src/screens/UserTypes';
import * as Yup from 'yup';
import { Profile } from '../../components/Account/Profile';
import { Step5 } from '../../components/Account/web_step_5_';
import { Step7 } from '../../components/Account/web_step_7_';
import { PrimaryBtn } from '../../components/Buttons/Btns';
import { useLanguageObject } from '../../utils/HelperHooks';

const initialValues = {
  name: null,
  email: '',
  phoneNo: null,
  cadreType: null,
  stateId: null,
  cadreId: null,
  districtId: null,
  profileImage: '',
  otp: null,
  blockId: null,
  healthFacilityId: null,
  country: null,
  countryCode: '+91',
};

export type accountHelpers = {
  getCadres: (cadreType: string) => Promise<CadresByTypesApiResponse>;
  getStates: () => Promise<StateApiResponse>;
  getDistricts: (stateId: string) => Promise<DistrictsApiResponse>;
  getBlocks: (districtId: string) => Promise<BlockApiResponse>;
  getHealthFacility: (blockId: string) => Promise<HealthFacilityApiResponse>;
};

const Account = () => {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const [langKey, getText, objectToValue] = useLanguageObject();

  const { error, loadingApis } = useSelector(
    (state: RootReducerStates) => state.appContext
  );
  const [_values, _setValues] = useState<{
    progress: 0.4 | 0.5 | 0.8;
    fullName: string;
    email: string;
    cadreType:
      | 'State_Level'
      | 'Block_Level'
      | 'Health-facility_Level'
      | 'District_Level'
      | string;
    cadre: string;
    healthFacility: string;
    userId: string;
    state: string;
    district: string;
    tu: string;
    countryCode: string | null;
  }>({
    progress: 0.8,
    fullName: '',
    email: '',
    cadreType: '',
    cadre: '',
    healthFacility: '',
    userId: '',
    state: '',
    district: '',
    tu: '',
    countryCode: '+91',
  });

  const getValidationSchema = () => {
    switch (_values.progress) {
      case 0.4:
        return step4ValidationSchema;
      case 0.5:
        const step5ValidationSchema = Yup.object().shape(
          CadreStateError?.[_values?.cadreType]
        );
        return step5ValidationSchema;
      default:
        return step1ValidationSchema;
    }
  };

  const UpdateAccountData = ({ data }) => {
    return new Promise<void>((resolve, reject) => {
      dispatch(
        createAction<UpdateUserApiReq, UserValidationApiResponse>(
          {
            data: data,
            method: 'PATCH',
            url: 'UPDATE_USER',
            query: _values.userId,
          },
          (code, res) => {
            if (code === 200) {
              alert('Profile Updated');
              resolve();
            } else if (code === 400) {
              if (Array.isArray(res?.errors)) {
                reject(res?.errors);
              }
            }
          }
        )
      );
    });
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values, { setErrors }) => {
      // remove value object
      const filter = {
        National_Level: {
          blockId: null,
          stateId: null,
          districtId: null,
          healthFacilityId: null,
        },
        State_Level: {
          blockId: null,
          districtId: null,
          healthFacilityId: null,
        },
        Block_Level: {
          healthFacilityId: null,
        },
        'Health-facility_Level': {},
        District_Level: {
          blockId: null,
          healthFacilityId: null,
        },
      };

      // filter values
      let newUpdatedObj = filterObject({
        name: values.name,
        email: values.email,
        cadreType: values?.cadreType,
        stateId: values.stateId,
        cadreId: values.cadreId,
        districtId: values.districtId,
        profileImage: values.profileImage,
        blockId: values.blockId,
        healthFacilityId: values.healthFacilityId,
      });

      newUpdatedObj = {
        ...newUpdatedObj,
        ...filter[newUpdatedObj?.cadreType],
      };

      if (_values.progress == 0.4) {
        // show step 0.5
        if (
          newUpdatedObj.cadreType == 'National_Level' ||
          newUpdatedObj.cadreType == 'International_Level'
        ) {
          await UpdateAccountData({ data: newUpdatedObj });
          _setValues((oldState) => ({ ...oldState, progress: 0.8 }));
        } else {
          // goto next step
          _setValues((oldState) => ({ ...oldState, progress: 0.5 }));
        }
      } else {
        await UpdateAccountData({ data: newUpdatedObj });
        _setValues((oldState) => ({ ...oldState, progress: 0.8 }));
      }
    },
    validationSchema: getValidationSchema(),
  });

  const {
    handleChange,
    errors,
    handleBlur,
    isSubmitting,
    touched,
    submitForm,
    values,
    setFieldValue,
    setValues,
  } = formik;

  // new
  const userDataIsFetched = _values.userId !== '';
  // get user account data
  useEffect(() => {
    dispatch(
      createAction<null, UserProfileApiResponse>(
        {
          method: 'GET',
          url: 'USER_PROFILE',
          query: cookies.get('userId'),
        },
        (status, res) => {
          if (status === 200) {
            formik.setValues({
              name: res?.name,
              email: res?.email,
              phoneNo: res?.phoneNo,
              cadreType: res?.cadreType,
              stateId: res?.stateId,
              cadreId: res?.cadreId,
              districtId: res?.districtId,
              otp: '',
              blockId: res?.blockId,
              healthFacilityId: res?.healthFacilityId,
              profileImage: res?.profileImage,
              countryCode: res?.countryCode,
              country: null,
            });
            _setValues((prev) => {
              return { ...prev, progress: 0.8, userId: cookies.get('userId') };
            });
          }
        }
      )
    );
  }, []);

  return (
    <section className='py-[48px]'>
      <div className='lg:max-w-[1012px] mx-auto'>
        {_values?.progress === 0.4 ? (
          <Profile
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            setValues={setValues}
            touched={touched}
            setFieldValue={setFieldValue}
            values={values}
            wrapperClassName='!h-full !overflow-visible'
          />
        ) : _values?.progress === 0.5 ? (
          <Step5
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            setValues={setValues}
            touched={touched}
            setFieldValue={setFieldValue}
            values={values}
            wrapperClassName='!h-full !overflow-visible'
          />
        ) : _values?.progress === 0.8 && userDataIsFetched ? (
          <Step7
            onClickEdit={(v) => {
              _setValues({
                ..._values,
                progress: v === 'personalDetails' ? 0.4 : 0.5,
              });
            }}
            values={values}
            wrapperClassName='!h-full'
          />
        ) : null}
        {_values?.progress !== 0.8 && (
          <PrimaryBtn
            title={getText('APP_CONTINUE')}
            disabled={formik.isSubmitting}
            onClick={() => {
              submitForm();
            }}
            customClassName='mt-[16px] ms-auto'
          />
        )}

        {_values?.progress == 0.8 && (
          <Link
            to={'/user-delete-account'}
            className='text-red-600 text-end mt-2 block'
          >
            {getText('APP_DELETE_ACCOUNT')}
          </Link>
        )}
      </div>
    </section>
  );
};

export default Account;
