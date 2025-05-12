import { DoctorMale } from '@nikshay-setu-v3-monorepo/assets';
import { RootReducerStates } from '@nikshay-setu-v3-monorepo/types';
import React from 'react';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import { TestimonialsCard } from '../Cards/TestimonialsCard';
import './landing.css';
interface TestimonialsProps {
  title?: string;
  description?: string;
}
export const Testimonials: React.FC<TestimonialsProps> = ({
  title = '',
  description = '',
}) => {
  const settings = {
    dots: true,
    dotsClass: 'slick-dots dark-gray',
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  const { data } = useSelector((state: RootReducerStates) => state.appContext);
  return (
    <section className='bg-Testimonials bg-no-repeat bg-cover py-12'>
      <div className='container mx-auto'>
        <div className='max-w-[870px] text-center mx-auto'>
          <span className='bg-darkBlue/10 text-darkBlue text-[12px] font-medium px-[8px] py-[2px] rounded-[36px] uppercase'>
            Testimonials
          </span>
          <h2 className='text-3xl font-bold -tracking-[0.32px] xl:text-[48px] xl:leading-[60px] text-[#171717] mt-[16px]'>
            {title}
          </h2>
          <p className='text-darkSilver leading-6 font-medium mt-[12px]'>
            {description}
          </p>
        </div>
        <Slider {...settings} className='pt-[28px] testimonials-carousel'>
          {data?.landingPage?.web_home_page?.staticTestimonials
            ?.sort((a, b) => a.orderIndex - b.orderIndex)
            ?.map((item, i) => {
              return (
                <TestimonialsCard
                  key={i}
                  imgSrc={DoctorMale}
                  name={item?.name?.en}
                  desc={item?.description?.en}
                />
              );
            })}
        </Slider>
      </div>
    </section>
  );
};
