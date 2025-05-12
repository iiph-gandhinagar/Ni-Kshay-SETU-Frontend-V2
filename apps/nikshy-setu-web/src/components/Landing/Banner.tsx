import {
  Shape1Png,
  Shape2Svg,
  Shape3Png,
  Shape4Png,
  Shape5Png,
} from '@nikshay-setu-v3-monorepo/assets';
import { carouselIcons } from '@nikshay-setu-v3-monorepo/constants';
import { isEmpty } from '@nikshay-setu-v3-monorepo/utils';
import React from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { PrimaryBtn } from '../Buttons/Btns';
import { FormInput } from '../Inputs/FormInput';
import { IphoneDeviceMockup } from './IphoneDeviceMockup';
interface BannerProps {
  title?: string;
  description?: string;
  onSignUpClick?: (login?: boolean) => void;
}
export const Banner: React.FC<BannerProps> = ({
  title = '',
  description = '',
  onSignUpClick = () => null,
}) => {
  const cookies = new Cookies();
  const loggedIn = cookies.get('userId');
  const navigate = useNavigate();

  const gotoHomeClick = () => {
    navigate('/home');
  };
  return (
    <section className='relative bg-ellipse bg-no-repeat bg-cover bg-[center_bottom_-160px] pt-6 lg:pt-20 pb-20 sm:pb-44'>
      <div className='container mx-auto'>
        <div className='grid lg:gap-0 gap-8 lg:grid-cols-12'>
          <div className='mr-auto place-self-center lg:col-span-6 xl:col-span-7'>
            <h1 className='mb-[18px] text-4xl font-bold -tracking-[0.32px] xl:text-[68px] xl:leading-[68px] bg-clip-text text-transparent bg-gradient-to-r from-[#9C5ED7] from-0% via-[#635AD9] via-50% to-[#E8A0A0] to-75%'>
              {title}
            </h1>
            <p className='font-jakarta max-w-[590px] mb-[24px] font-medium text-darkSilver text-[16px] !leading-[25.6px]'>
              {description}
            </p>
            {isEmpty(loggedIn) && (
              <div className='flex flex-col md:flex-row gap-[12px]'>
                <FormInput
                  onFocus={() => onSignUpClick(true)}
                  id='mobile-no'
                  name='mobileNo'
                  placeholder='Enter mobile number/Email'
                  customClassName='w-[336px] max-w-full'
                />
                <PrimaryBtn
                  title='Sign up'
                  onClick={() => onSignUpClick()}
                  customClassName=''
                  showLinearGradient
                />
              </div>
            )}

            {!isEmpty(loggedIn) && (
              <div className='flex flex-col md:flex-row gap-[12px]'>
                <PrimaryBtn
                  title='Go to the WebApp'
                  onClick={gotoHomeClick}
                  customClassName=''
                  showLinearGradient
                />
              </div>
            )}
          </div>
          <div className='relative lg:mt-0 lg:col-span-6 xl:col-span-5'>
            <IphoneDeviceMockup carouselIcons={carouselIcons} />
            <img
              src={Shape1Png}
              alt='shape-1'
              className='hidden sm:block absolute -left-5 -top-6'
            />
            <img
              src={Shape2Svg}
              alt='shape-2'
              className='hidden sm:block absolute left-4 -bottom-24'
            />
            <img
              src={Shape3Png}
              alt='shape-3'
              className='hidden sm:block absolute sm:right-1 lg:-right-4 xl:right-1 top-5'
            />
            <img
              src={Shape4Png}
              alt='shape-4'
              className='hidden sm:block absolute sm:right-14 lg:right-10 xl:right-14 bottom-4'
            />
            <img
              src={Shape5Png}
              alt='shape-5'
              className='hidden sm:block absolute right-32 -bottom-44'
            />
          </div>
        </div>
      </div>
    </section>
  );
};
