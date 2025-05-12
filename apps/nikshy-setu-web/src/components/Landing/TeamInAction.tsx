import { EllipseCenterSvg } from '@nikshay-setu-v3-monorepo/assets';
import { RootReducerStates } from '@nikshay-setu-v3-monorepo/types';
import moment from 'moment';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';

interface TeamInActionProps {
  title?: string;
  description?: string;
}
export const TeamInAction: React.FC<TeamInActionProps> = ({
  title = '',
  description = '',
}) => {
  const imageSliderRef = useRef(null);
  const descriptionSliderRef = useRef(null);

  const settingsImages = {
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    infinite: true,
    asNavFor: descriptionSliderRef.current,
    ref: (slider) => (imageSliderRef.current = slider),
  };

  const settingsDescriptions = {
    autoplay: true,
    autoplaySpeed: 4000,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    infinite: true,
    asNavFor: imageSliderRef.current,
    ref: (slider) => (descriptionSliderRef.current = slider),
  };
  const { data } = useSelector((state: RootReducerStates) => state.appContext);
  return (
    <section className='overflow-hidden relative py-[58px]'>
      <div className='container mx-auto'>
        <div className='text-center mx-auto'>
          <span className='bg-darkBlue/10 text-darkBlue text-[12px] font-medium px-[8px] py-[2px] rounded-[36px] uppercase'>
            Action
          </span>
          <h2 className='text-3xl font-bold -tracking-[0.32px] xl:text-[48px] xl:leading-[60px] text-[#171717] mt-[16px]'>
            {title}
          </h2>
          <p className='text-darkSilver leading-6 font-medium mt-[12px]'>
            {description}
          </p>
        </div>
        <div className='flex flex-col lg:flex-row items-center gap-4 xl:gap-[94px] mt-[24px] py-8 bg-[#ffffff3d]'>
          {/* Image Slider */}
          <div className='w-full lg:w-1/2'>
            <Slider {...settingsImages}>
              {data?.landingPage?.web_home_page?.whatWeDo
                ?.sort((a, b) => a.orderIndex - b.orderIndex)
                ?.map((slide, index) => (
                  <div key={index}>
                    <img
                      src={
                        process.env.NX_PUBLIC_STORE_URL + slide.coverImage?.[0]
                      }
                      alt={`Slide ${index + 1}`}
                      className='rounded-lg w-full h-40 sm:h-72 lg:h-60 xl:h-96'
                    />
                  </div>
                ))}
            </Slider>
          </div>

          {/* Description Slider */}
          <div className='w-full lg:w-1/2 min-w-0'>
            <Slider {...settingsDescriptions} className='descriptions-carousel'>
              {data?.landingPage?.web_home_page?.whatWeDo
                ?.sort((a, b) => a.orderIndex - b.orderIndex)
                ?.map((slide, index) => (
                  <div key={index} className=''>
                    <span className='bg-darkBlue/10 text-darkBlue text-[12px] font-medium px-[8px] py-[2px] rounded-[36px] uppercase'>
                      TEAM IN ACTION
                    </span>
                    <h3 className='text-xl lg:text-[36px] -tracking-[0.32px] font-semibold mt-6 lg:mt-[56px] lg:leading-[50.4px]'>
                      {slide.title?.en}
                    </h3>
                    <div className='my-4 lg:my-[36px] space-y-[8px]'>
                      <h5 className='lg:text-[24px] leading-[32px] font-semibold text-[#171717]'>
                        {slide?.location?.en}
                      </h5>
                      <h6 className='text-[18px] text-darkSilver leading-[28px] font-medium'>
                        {moment(slide?.createdAt).format('MMMM DD, YYYY')}
                      </h6>
                    </div>
                  </div>
                ))}
            </Slider>
          </div>
          <img
            src={EllipseCenterSvg}
            alt='Ellipse'
            className='absolute -z-20 top-0 left-1/2 transform -translate-x-1/2'
          />
        </div>
      </div>
    </section>
  );
};
