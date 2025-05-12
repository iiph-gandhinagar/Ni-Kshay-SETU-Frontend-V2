import { CertificatesSvg } from '@nikshay-setu-v3-monorepo/assets';
import React from 'react';
interface AssessmentCompletionCardProps {
  count?: number;
}
export const AssessmentCompletionCard: React.FC<
  AssessmentCompletionCardProps
> = ({ count = 0 }) => {
  return (
    <div className='drop-shadow-[0_2px_37.4px_rgba(0,0,0,0.12)] px-[12px] py-[16px] rounded-[16px] bg-white'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-[4px]'>
          <img src={CertificatesSvg} alt='Certificates' className='w-10 h-10' />
          <h6 className='text-[18px] leading-[23.9px] -tracking-[0.16px] text-darkBlue font-semibold'>
            Assessment Completion Certificates
          </h6>
        </div>
        <div className='px-[4px] py-[2px] rounded-[11px] bg-[##52659733]'>
          <h6 className='text-[18px] leading-[23.9px] -tracking-[0.16px] text-darkBlue font-semibold'>
            {count}
          </h6>
        </div>
      </div>
    </div>
  );
};
