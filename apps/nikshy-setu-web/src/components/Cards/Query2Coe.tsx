import {
  GradientArrowSvg,
  InfoOutlineSvg,
  queryResManPng,
} from '@nikshay-setu-v3-monorepo/assets';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguageObject } from '../../utils/HelperHooks';
import { OutLineBtn } from '../Buttons/Btns';
import { PluginInfoModal } from '../QueryResponseManagement /InfoDropdown';

interface Query2CoeProps {
  metaData: any;
  userType: any;
  data?: any;
}

export const Query2Coe: React.FC<Query2CoeProps> = ({
  metaData,
  userType,
  data,
}) => {
  const navigate = useNavigate();
  const [langKey, getText, objectToValue] = useLanguageObject();
  const [infoDropDown, setInfoDropDown] = useState(false);

  return (
    <section className='pt-12 pb-14'>
      <div className='lg:max-w-[1012px] mx-auto'>
        <div className='bg-gradient-to-b from-[#0B4E67] to-[#61C9EF] p-4 md:p-6 rounded-[28px]'>
          {/* Top Container */}
          <div className='flex justify-between mb-6 lg:mb-12'>
            {/* Query2COE Title and Description */}
            <div className='flex items-center gap-[12px]'>
              <img
                src={queryResManPng}
                alt='Knowledge Base'
                className='h-[60px] w-[60px]'
              />
              <div className='flex flex-col gap-[12px]'>
                <h3 className='text-2xl md:text-3xl font-semibold md:leading-[35px] text-[#FFE7AA]'>
                  {getText('APP_QUERY2COE')}
                </h3>
                {/* <p className='text-[18px] leading-[18px] font-medium text-white'>{metaData?.[userType]?.subHeader || ' Raise a query to your senior doctor'}</p> */}
              </div>
            </div>

            {/* Info Icon with Dropdown */}
            <div className='relative'>
              <img
                src={InfoOutlineSvg}
                alt='Info'
                className='cursor-pointer'
                onClick={() => setInfoDropDown(!infoDropDown)}
              />
              {infoDropDown && (
                <PluginInfoModal
                  isOpen={infoDropDown}
                  text={[
                    getText(`Q2COE_INFO_INDEX1`),
                    getText(`Q2COE_INFO_INDEX2`),
                    getText(`Q2COE_INFO_INDEX3`),
                    getText(`Q2COE_INFO_INDEX4`),
                    getText(`Q2COE_INFO_INDEX5`),
                  ].join('\n\n')}
                  statuses={['In Progress', 'Completed', 'Transferred']}
                  closeModal={() => setInfoDropDown(false)}
                />
              )}
            </div>
          </div>

          {/* Buttons Section */}
          <div className='flex flex-col gap-3'>
            {/* Raise Clinical Query Button */}
            {!metaData?.[userType]?.hideRaiseQueryBtn && (
              <div className='bg-white btn'>
                <button
                  onClick={() =>
                    navigate('/raise-clinical-query', {
                      state: {
                        queryRaisedInstitute:
                          data?.user_profile?.userContext?.queryDetails
                            ?.instituteId,
                        queryRaisedRole:
                          data?.user_profile?.userContext?.queryDetails?.type
                            ?._id,
                        subscriberId: data?.user_profile?._id,
                      },
                    })
                  }
                  className='flex gap-2 bg-gradient-to-t from-[#0B4E67] to-[#61C9EF] bg-clip-text text-transparent'
                >
                  {getText('Q2COE_RAISE_C_QUERY')}
                  <img
                    src={GradientArrowSvg}
                    className='h-5'
                    alt='Gradient Arrow'
                  />
                </button>
              </div>
            )}

            {/* Track a Query Button */}
            {!metaData?.[userType]?.hideTrackQueryBtn && (
              <OutLineBtn
                onClick={() =>
                  navigate('/track-query', {
                    state: metaData?.[userType]?.trackQueryParams,
                  })
                }
                title={getText('Q2COE_TRACK_QUERY')}
                customClassName='w-full'
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
