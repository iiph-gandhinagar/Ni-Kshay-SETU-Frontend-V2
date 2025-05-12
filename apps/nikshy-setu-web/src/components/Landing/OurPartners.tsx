import {
  EllipseLeftSvg,
  EllipseRightSvg,
  IIPHGSvg,
  NTEPSvg,
  OurPartnersLogoSvg,
  TheUnionIIPHGSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import React from 'react';

interface OurPartnersProps {
  title?: string;
  description?: string;
}
export const OurPartners: React.FC<OurPartnersProps> = ({
  title = '',
  description = '',
}) => {
  return (
    <section className='overflow-hidden relative py-[58px]'>
      <div className='container mx-auto'>
        <div className='max-w-[870px] text-center mx-auto'>
          <span className='bg-darkBlue/10 text-darkBlue text-[12px] font-medium px-[8px] py-[2px] rounded-[36px] uppercase'>
            Partners
          </span>
          <h2 className='text-3xl font-bold -tracking-[0.32px] xl:text-[48px] xl:leading-[60px] text-[#171717] mt-[16px]'>
            {title}
          </h2>
          <p className='text-darkSilver leading-6 font-medium mt-[12px]'>
            {description}
          </p>
        </div>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 xl:gap-16 mt-12'>
          <img
            src={OurPartnersLogoSvg}
            alt='OurPartnersLogo'
            className='md:w-[269px] md:h-[121px] hover:-translate-y-2 transition-all duration-500'
          />
          <img
            src={NTEPSvg}
            alt='NTEP'
            className='md:w-[273px] md:h-[121px] hover:-translate-y-2 transition-all duration-500'
          />
          <img
            src={IIPHGSvg}
            alt='IIPHG'
            className='w-[251px] md:h-[121px] hover:-translate-y-2 transition-all duration-500'
          />
          <div className='flex items-center hover:-translate-y-2 transition-all duration-500'>
            <img
              src={TheUnionIIPHGSvg}
              alt='TheUnionIIPHG'
              className='w-[290px] md:h-[121px]'
            />
          </div>
        </div>
      </div>
      <img
        src={EllipseLeftSvg}
        alt='Ellipse'
        className='absolute left-0 -top-[340px] md:-top-[600px] -z-20'
      />
      <img
        src={EllipseRightSvg}
        alt='Ellipse'
        className='absolute right-0 -top-[1000px] -z-20'
      />
    </section>
  );
};
