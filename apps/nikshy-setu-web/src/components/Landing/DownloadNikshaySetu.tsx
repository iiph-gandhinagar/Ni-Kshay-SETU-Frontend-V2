import {
  AppStore,
  DownloadNikshaySetuSvg,
  GooglePlayStoreButtonPng,
  ScannerSvg,
  ScanToDownloadSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import { carouselIcons } from '@nikshay-setu-v3-monorepo/constants';
import React from 'react';
import { IphoneDeviceMockup2 } from './IphoneDeviceMockup';
interface DownloadNikshaySetuProps {
  title?: string;
  description?: string;
}
export const DownloadNikshaySetu: React.FC<DownloadNikshaySetuProps> = ({
  title = '',
  description = '',
}) => {
  return (
    <section className='py-6 relative lg:pt-[160px] lg:pb-[120px]'>
      <div className='container mx-auto'>
        <div className='grid lg:gap-0 gap-8 lg:grid-cols-12'>
          <div className='mr-auto place-self-center lg:col-span-6 lg:pr-6'>
            <span className='bg-darkBlue/10 text-darkBlue text-[12px] font-medium px-[8px] py-[2px] rounded-[36px] uppercase'>
              Downloads
            </span>
            <h2 className='mt-[16px] text-3xl md:text-[48px] font-bold -tracking-[0.32px] md:leading-[60px] text-[#171717]'>
              {title}
            </h2>
            <p className='mt-[12px] font-medium text-darkSilver leading-6'>
              {description}
            </p>
            <div className='flex gap-4 py-[58px] flex-wrap justify-center md:justify-start'>
              <a
                data-wow-duration='1s'
                href='https://apps.apple.com/by/app/nikshay-setu/id1631331386'
                target={'_blank'}
                rel='noreferrer'
              >
                <img src={AppStore} alt='Icon' />
              </a>
              <a
                // className="d-flex align-items-center mb-4 wow slideInLeft pt-1"
                data-wow-duration='2s'
                href='https://play.google.com/store/apps/details?id=com.iiphg.tbapp'
                target={'_blank'}
                rel='noreferrer'
              >
                <img src={GooglePlayStoreButtonPng} />
                {/* <SocialButton
                  downloadText='Download on the'
                  title='Play Store'
                  leftImg={<img src={PlayStore} alt='Icon' />}
                /> */}
              </a>
            </div>
            <div className='flex gap-[12px] justify-center md:justify-start'>
              <img src={ScannerSvg} alt='Icon' className='w-32 h-32' />
              <img src={ScanToDownloadSvg} alt='Icon' />
            </div>
          </div>
          <div className='lg:absolute top-0 right-0 lg:w-[560px] xl:w-[675px] mt-8'>
            <div className='relative w-full h-full'>
              <div className='absolute top-[6rem] left-12'>
                <IphoneDeviceMockup2 carouselIcons={carouselIcons} />
              </div>
              <img
                src={DownloadNikshaySetuSvg}
                alt='Icon'
                className='w-full h-[640px] 2xl:h-full'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
