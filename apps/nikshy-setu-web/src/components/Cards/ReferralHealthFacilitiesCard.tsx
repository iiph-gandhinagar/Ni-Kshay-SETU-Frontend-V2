import { DirectionsSvg, LocationSvg } from '@nikshay-setu-v3-monorepo/assets';
import { HealthFacility } from '@nikshay-setu-v3-monorepo/types';
import React from 'react';
import { useLanguageObject } from '../../utils/HelperHooks';
import { PrimaryBtn } from '../Buttons/Btns';

interface ReferralHealthFacilitiesCard extends HealthFacility {
  lastElementRef: (node: any) => void;
}

export const ReferralHealthFacilitiesCard: React.FC<
  ReferralHealthFacilitiesCard
> = ({
  lastElementRef,
  healthFacilityCode,
  blockId,
  latitude,
  longitude,
  ...props
}) => {
  const [langKey, getText, objectToValue] = useLanguageObject();
  return (
    <div ref={lastElementRef} className='bg-white rounded-2xl p-4 space-y-4'>
      <div>
        <h6 className='text-sm md:text-base leading-6 text-darkBlue font-semibold'>
          {healthFacilityCode}
        </h6>
        <div className='mt-2 flex flex-wrap gap-[8px]'>
          <div className='bg-[#F3F5F6] rounded-[12px] p-[8px] gap-[6px] flex h-[34px] items-center'>
            <img src={LocationSvg} alt='Location' />
            <span className='text-[16px]'>{blockId.title}</span>
          </div>
        </div>
      </div>
      <div className='flex gap-2 flex-wrap justify-between'>
        <div>
          <h6 className='text-sm md:text-[16px] leading-[24px] text-[#2A9A58] font-semibold'>
            {getText('REFERRAL_AVAILABLE_FACILITIES')}
          </h6>
          <div className='mt-2 flex flex-wrap gap-2 max-w-[330px]'>
            {Object.entries(props).map(([title, value]) => {
              return (
                typeof value == 'boolean' &&
                value && (
                  <div
                    key={title}
                    className='bg-white border border-[#F4F4F4] rounded-[12px] p-[8px] gap-[6px] flex h-[32px] items-center'
                  >
                    <span className='text-[16px]'>{title}</span>
                  </div>
                )
              );
            })}
          </div>
        </div>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
          target='_blank'
        >
          <PrimaryBtn
            title={getText('REFERRAL_DIRECTIONS')}
            customClassName='w-full mt-2'
            leftImg={
              <img
                src={DirectionsSvg}
                alt='Directions'
                className='w-[25px] h-[25px]'
              />
            }
          />
        </a>
      </div>
    </div>
  );
};
