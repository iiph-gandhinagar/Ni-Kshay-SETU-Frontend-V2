import {
  CircleShapeSvg,
  SplashscreenPng,
} from '@nikshay-setu-v3-monorepo/assets';
import React, { useEffect, useState } from 'react';
import { IconsCarousel } from './IconsCarousel';
interface IphoneDeviceMockupProps {
  carouselIcons?: Array<{ img: string }>;
}
export const IphoneDeviceMockup: React.FC<IphoneDeviceMockupProps> = ({
  carouselIcons,
}) => {
  const [view, setView] = useState('Splashscreen');

  useEffect(() => {
    const timer = setTimeout(() => {
      setView('IconsCarousel');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className='relative mx-auto bg-white drop-shadow-[0_-6px_46.6px_rgba(0,0,0,0.17)] rounded-[40px] w-[243px] h-[493px]'>
      <div className='h-[32px] w-[3px] bg-white absolute -start-[4px] top-[72px] rounded-s-lg'></div>
      <div className='h-[46px] w-[3px] bg-white absolute -start-[4px] top-[124px] rounded-s-lg'></div>
      <div className='h-[46px] w-[3px] bg-white absolute -start-[4px] top-[178px] rounded-s-lg'></div>
      <div className='h-[64px] w-[3px] bg-white absolute -end-[4px] top-[142px] rounded-e-lg'></div>
      <div className='relative rounded-[40px] overflow-hidden w-[243px] h-[493px] border-y-8 border-y-white'>
        {view === 'Splashscreen' ? (
          <img
            src={SplashscreenPng}
            className='w-[243px] h-[493px] pb-[16px] px-[8px]'
            alt='splashscreen'
          />
        ) : (
          <IconsCarousel carouselIcons={carouselIcons} />
        )}
      </div>
    </div>
  );
};

interface IphoneDeviceMockupProps {
  carouselIcons?: Array<{ img: string }>;
}
export const IphoneDeviceMockup2: React.FC<IphoneDeviceMockupProps> = ({
  carouselIcons,
}) => {
  const [view, setView] = useState('Splashscreen');

  useEffect(() => {
    const timer = setTimeout(() => {
      setView('IconsCarousel');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className='flex justify-center items-center relative'>
      <img
        src={CircleShapeSvg}
        alt='shape-1'
        className='hidden sm:block absolute -left-9 -top-6'
      />
      <div className='relative w-[214px] h-[440px] bg-[#EEF0F3] rounded-[30px] shadow-xl'>
        <div className='absolute inset-0 rounded-[20px] m-[12px] flex items-center justify-center bg-white overflow-hidden'>
          {view === 'Splashscreen' ? (
            <img
              src={SplashscreenPng}
              className='w-full h-[400px] px-[8px] object-cover'
              alt='splashscreen'
            />
          ) : (
            <IconsCarousel
              carouselIcons={carouselIcons}
              wrapperClassName='!px-4'
            />
          )}
        </div>
        <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-[100px] h-6 bg-[#EEF0F3] rounded-b-[15px]'></div>
        <div className='absolute top-1 left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-1 w-[100px] h-5 px-3'>
          <div className='w-[8px] h-[8px] bg-[#D5DAE1] rounded-full'></div>
          <div className='w-8 h-[3px] bg-[#D5DAE1] rounded-full'></div>
        </div>
      </div>
    </div>
  );
};
