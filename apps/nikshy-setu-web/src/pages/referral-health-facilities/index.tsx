import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { StateApiResponse } from '@nikshay-setu-v3-monorepo/types';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { PrimaryBtn } from '../../components/Buttons/Btns';
import { SearchIconSvg } from '../../components/Icon/SearchIcon';
import { FormSelect } from '../../components/Inputs/FormSelect';
import { useLanguageObject } from '../../utils/HelperHooks';

const healthFacilitiesOption = [
  'DMC',
  'TRUNAT',
  'CBNAAT',
  'X Ray',
  'ICTC',
  'LPA Lab',
  'Confirmation Center',
  'Tobacco Cessation Clinic',
  'ANC Clinic',
  'Nutritional Rehabilitation Center',
  'De Addiction Centres',
  'ART Center',
  'District DRTB Centre',
  'Nodal DRTB Center',
  'IRL',
  'Child Health Care Center',
];

const ReferralHealthFacilities = () => {
  // form options
  const [formOptions, setFormOptions] = useState({
    healthFacilities: healthFacilitiesOption.map((value) => ({
      label: value,
      value,
    })),
    stateOption: [],
    districtOption: [],
    blockOption: [],
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [langKey, getText, objectToValue] = useLanguageObject();

  // get data api
  const getSate = () => {
    dispatch(
      createAction<null, StateApiResponse>(
        {
          method: 'GET',
          url: 'STATES',
        },
        (v, res) => {
          if (v === 200 && Array.isArray(res)) {
            setFormOptions((oldState) => ({
              ...oldState,
              stateOption: res.map(({ title: label, _id: value }) => {
                return { label, value };
              }),
            }));
          }
        }
      )
    );
  };

  const getDistricts = (query) => {
    dispatch(
      createAction<null, StateApiResponse>(
        {
          method: 'GET',
          url: 'DISTRICTS',
          query,
        },
        (v, res) => {
          if (Array.isArray(res)) {
            setFormOptions({
              ...formOptions,
              districtOption: res.map(({ title: label, _id: value }) => {
                return { label, value };
              }),
              blockOption: [],
            });
          }
        }
      )
    );
  };

  const getBlokes = (query) => {
    dispatch(
      createAction<null, StateApiResponse>(
        {
          method: 'GET',
          url: 'BLOCKS',
          query,
        },
        (v, res) => {
          if (Array.isArray(res)) {
            setFormOptions({
              ...formOptions,
              blockOption: res.map(({ title: label, _id: value }) => {
                return { label, value };
              }),
            });
          }
        }
      )
    );
  };

  useEffect(() => {
    getSate();
  }, []);

  const validation = Yup.object().shape({
    stateId: Yup.string().required('state is required'),
  });
  // form validation
  const formik = useFormik({
    initialValues: {
      stateId: '',
      districtId: '',
      blockId: '',
      health_facility: [],
      cadreType: '',
    },
    validationSchema: validation,
    onSubmit: (values) => {
      const searchParams = new URLSearchParams();

      // Add parameters conditionally
      searchParams.append('stateId', values.stateId);
      if (values.districtId) {
        searchParams.append('districtId', values.districtId);
      }
      if (values.blockId) {
        searchParams.append('blockId', values.blockId);
      }
      if (values.health_facility?.length) {
        searchParams.append(
          'health_facility',
          values.health_facility.join(',')
        );
      }

      // Navigate to the URL with the search parameters
      navigate(`/referral-health-facilities/list?${searchParams.toString()}`);
    },
  });

  // on change handler
  const onChangeStateIdHandler = (event) => {
    const newValues = {
      ...formik.values,
      stateId: event.value,
      districtId: '',
      blockId: '',
      health_facility: [],
    };

    formik.setValues(newValues);

    // get DISTRICTS
    getDistricts(event.value);
  };

  const onChangeDistrictHandler = (event) => {
    const newValues = {
      ...formik.values,
      districtId: event.value,
      blockId: '',
      health_facility: [],
    };

    formik.setValues(newValues);

    // get Blokes
    getBlokes(event.value);
  };

  const onChangeTUHandler = (event) => {
    const newValues = {
      ...formik.values,
      blockId: event.value,
      health_facility: [],
    };

    formik.setValues(newValues);
  };

  return (
    <section className='py-[48px] h-full'>
      <div className='lg:max-w-[1012px] mx-auto h-full'>
        <h4 className='text-lg md:text-[28px] font-medium -tracking-[0.16px] text-darkBlue leading-[37.18px]'>
          {getText('APP_LOCATE_HEALTH_CENTERS')}
        </h4>
        <div className='flex flex-col justify-between h-full'>
          <div>
            <FormSelect
              value={formik.values.stateId}
              onChange={onChangeStateIdHandler}
              options={formOptions.stateOption}
              errors={formik.errors.stateId}
              touched={formik.touched.stateId}
              wrapperClassName='mt-[28px] !pb-[8px]'
              placeholder='Select state'
              customClass='!mt-[8px]'
              label={getText('LABEL_STATE')}
            />
            <FormSelect
              value={formik.values.districtId}
              onChange={onChangeDistrictHandler}
              options={formOptions.districtOption}
              wrapperClassName='mt-[24px] !pb-[8px]'
              placeholder='Select District'
              customClass='!mt-[8px]'
              label={getText('LABEL_DISTRICT')}
            />
            <FormSelect
              value={formik.values.blockId}
              onChange={onChangeTUHandler}
              options={formOptions.blockOption}
              wrapperClassName='mt-[24px] !pb-[8px]'
              placeholder='Select TU'
              customClass='!mt-[8px]'
              label={getText('LABEL_TU')}
            />
            <FormSelect
              value={formik.values.health_facility}
              onChange={(v) => {
                const value = Array.isArray(v)
                  ? v.map(({ value }) => value)
                  : [];
                formik.setFieldValue('health_facility', value, true);
              }}
              isMulti={true}
              options={formOptions.healthFacilities}
              wrapperClassName='mt-[24px] !pb-[8px]'
              placeholder='Select TU'
              customClass='!mt-[8px]'
              label={getText('LABEL_HEALTH_FACILITY')}
            />
          </div>
          <div className='md:flex justify-center flex-wrap items-center gap-3 mt-4'>
            <PrimaryBtn
              title={getText('APP_SEARCH')}
              onClick={formik.handleSubmit}
              customClassName='w-full md:w-[30%]'
              leftImg={<SearchIconSvg height='20' stroke='#ffffff' />}
            />
            <PrimaryBtn
              title={getText('APP_VIEW_ALL')}
              onClick={() =>
                navigate(`/referral-health-facilities/list?view_all=true`)
              }
              customClassName='w-full md:w-[30%] mt-3 md:mt-0 btn-outline'
              bgColor='bg-white'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferralHealthFacilities;
