import { AddSvg, EditOutlineSvg } from '@nikshay-setu-v3-monorepo/assets';
import { STORE_URL } from '@nikshay-setu-v3-monorepo/constants';
import { useEffect, useState } from 'react';
import {
  getBlocks,
  getCadres,
  getDistricts,
  getHealthFacility,
  getStates,
} from '../../utils/ApiHelper';
import { useLanguageObject } from '../../utils/HelperHooks';
import { BorderedInput } from '../Inputs/FormInput';
import { CountryCodeSelectElement } from '../Inputs/FormSelect';
type CadreTypeType =
  | 'Block_Level'
  | 'District_Level'
  | 'National_Level'
  | 'State_Level'
  | 'Health-facility_Level';

interface ProfileProps {
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
    profileImage: string | null | undefined;
    countryCode: string | null;
  };
  onClickEdit?: (v: any) => void;
  wrapperClassName?: string;
}

type DropDownValues = {
  cadreType?: string;
  cadreId?: string;
  stateId?: string;
  districtId?: string;
  blockId?: string;
  healthFacilityId?: string;
};

export const Step7: React.FC<ProfileProps> = ({
  values,
  onClickEdit,
  wrapperClassName = '',
}) => {
  const [dropDownValues, setDropDownValues] = useState<DropDownValues>({});
  const [langKey, getText, objectToValue] = useLanguageObject();

  const fetchDropDownData = async () => {
    // get title of cadreId
    if (values?.cadreType && values.cadreId) {
      getCadres(values?.cadreType).then((cadresArray) => {
        const cadreOptions = cadresArray.find(
          ({ _id }) => _id === values.cadreId
        );
        setDropDownValues((oldState) => ({
          ...oldState,
          cadreId: cadreOptions ? cadreOptions.title : '',
        }));
      });
    }

    // get state title of stateId
    if (values.stateId) {
      getStates().then((stateArray) => {
        const stateOption = stateArray.find(
          ({ _id }) => _id === values.stateId
        );
        setDropDownValues((oldState) => ({
          ...oldState,
          stateId: stateOption ? stateOption.title : '',
        }));
      });
    }

    // get District title of districtId
    if (values.districtId && values.stateId) {
      getDistricts(values.stateId).then((districtsArray) => {
        const districtsOption = districtsArray.find(
          ({ _id }) => _id === values.districtId
        );
        setDropDownValues((oldState) => ({
          ...oldState,
          districtId: districtsOption ? districtsOption.title : '',
        }));
      });
    }

    // get Block title of blockId
    if (values.blockId && values.districtId) {
      getBlocks(values.districtId).then((blocksArray) => {
        const blockOption = blocksArray.find(
          ({ _id }) => _id === values.blockId
        );
        setDropDownValues((oldState) => ({
          ...oldState,
          blockId: blockOption ? blockOption.title : '',
        }));
      });
    }

    // get healthFacility title of healthFacilityId
    if (values.healthFacilityId && values.blockId) {
      getHealthFacility(values.blockId).then((healthFacilityArray) => {
        const healthFacilityOption = healthFacilityArray.find(
          ({ _id }) => _id === values.blockId
        );
        setDropDownValues((oldState) => ({
          ...oldState,
          blockId: healthFacilityOption
            ? healthFacilityOption.healthFacilityCode
            : '',
        }));
      });
    }
  };

  useEffect(() => {
    fetchDropDownData();
  }, []);

  // new
  const commonElementProps = {
    inputWrapperClassName: '!mt-[8px]',
    placeholder: 'Not Available',
    disabled: true,
    wrapperClassName: '!border-0 !p-0',
  };

  const countryCodeElement = (
    <CountryCodeSelectElement disabled={true} value={values.countryCode} />
  );

  return (
    <div>
      <div
        className={`${wrapperClassName} overflow-auto h-[255px] hide-scrollbar`}
      >
        <div className='space-y-4'>
          {/* profile */}
          <div className='w-15 h-15'>
            <div
              className={`${
                !values.profileImage ? 'bg-LIGHT_BLUE_E8F1FF p-4' : ''
              } mb-2 w-20 h-20 flex items-center justify-center rounded-[2px]`}
            >
              <img
                className='h-[50px] w-[50px] m-10'
                src={
                  values.profileImage ? STORE_URL + values.profileImage : AddSvg
                }
                alt='Add'
              />
            </div>
            <p
              className='text-[18px] font-medium leading-[23.9px] -tracking-[0.16px] cursor-pointer underline text-LIGHT_BLUE_3EB6FF'
              onClick={() => onClickEdit('personalDetails')}
            >
              {' '}
              {getText('LABEL_EDIT_PROFILE')}
            </p>
          </div>
          <BorderedInput
            label='Email Address'
            value={values.email ?? ''}
            {...{ ...commonElementProps, wrapperClassName: undefined }}
          />
          {/* Personal Details card */}
          <div className='space-y-3'>
            <div className='flex justify-between items-center'>
              <h6 className='font-medium leading-[22px] text-darkBlue -tracking-[0.16px]'>
                {getText('LABEL_PERSONAL_DETAILS')}
              </h6>
              <img
                src={EditOutlineSvg}
                className='cursor-pointer'
                alt='edit-outline'
                onClick={() => onClickEdit('personalDetails')}
              />
            </div>
            <div className='space-y-[24px] border-[0.5px] border-D9DBDB p-[24px] rounded-[10px]'>
              <div className='grid sm:grid-cols-2 sm:divide-x sm:divide-D9DBDB'>
                <BorderedInput
                  label={getText('LABEL_FULL_NAME')}
                  value={values.name ?? ''}
                  {...{ ...commonElementProps }}
                />
                <div className='sm:pl-4 mt-[24px] sm:mt-0'>
                  <BorderedInput
                    label={getText('LABEL_MOBILE_NUM')}
                    countryCodeElement={countryCodeElement}
                    value={values.phoneNo ?? ''}
                    {...{ ...commonElementProps }}
                  />
                </div>
              </div>
              <BorderedInput
                value={
                  values?.cadreType ? values?.cadreType.replace(/_/g, ' ') : ''
                }
                label={getText('LABEL_CADRE_TYPE')}
                {...{ ...commonElementProps }}
              />
              <BorderedInput
                value={dropDownValues.cadreId ?? ''}
                label={getText('LABEL_CADRE')}
                {...{ ...commonElementProps }}
              />
            </div>
          </div>

          {/* Geographic Details card */}
          <div className='space-y-3'>
            <div className='flex justify-between items-center'>
              <h6 className='font-medium leading-[22px] text-darkBlue -tracking-[0.16px]'>
                {getText('LABEL_GEOGRAPHIC_DETAILS')}
              </h6>
              <img
                src={EditOutlineSvg}
                className='cursor-pointer'
                alt='edit-outline'
                onClick={() => {
                  if (
                    values?.cadreType === 'National_Level' ||
                    values?.cadreType === 'International_Level'
                  ) {
                    alert('You Need to Change Cadre Type');
                  } else {
                    onClickEdit('geographicDetails');
                  }
                }}
              />
            </div>
            <div className='space-y-[24px] border-[0.5px] border-D9DBDB p-[24px] rounded-[10px]'>
              <div className='grid grid-cols-2 divide-x divide-D9DBDB'>
                <BorderedInput
                  label={getText('LABEL_STATE')}
                  value={dropDownValues.stateId ?? ''}
                  {...{ ...commonElementProps }}
                />
                <div className='pl-4'>
                  <BorderedInput
                    label={getText('APP_DISTRICT')}
                    value={dropDownValues.districtId ?? ''}
                    {...{ ...commonElementProps }}
                  />
                </div>
              </div>
              <BorderedInput
                label={getText('LABEL_TU')}
                value={dropDownValues.blockId ?? ''}
                {...{ ...commonElementProps }}
              />
              <BorderedInput
                label={getText('LABEL_HEALTH_FACILITY')}
                value={dropDownValues.healthFacilityId ?? ''}
                {...{ ...commonElementProps }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
