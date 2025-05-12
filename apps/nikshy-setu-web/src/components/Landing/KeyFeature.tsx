import { RootReducerStates } from '@nikshay-setu-v3-monorepo/types';
import { numberRange } from '@nikshay-setu-v3-monorepo/utils';
import AnimatedNumber from 'animated-number-react';
import React from 'react';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import { KeyFeatureCard } from '../Cards/KeyFeatureCard';
import './landing.css';
interface KeyFeatureProps {
  title?: string;
  description?: string;
}
export const KeyFeature: React.FC<KeyFeatureProps> = ({
  title = '',
  description = '',
}) => {
  const { data } = useSelector((state: RootReducerStates) => state.appContext);
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
    speed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <section className='bg-KeyFeature bg-no-repeat bg-cover py-12'>
      <div className='container mx-auto'>
        <div className='max-w-[870px] space-y-[16px] text-center mx-auto'>
          <span className='bg-white/20 text-darkBlue drop-shadow-[0_1px_2px_rgba(105,81,255,0.5)] text-[12px] font-bold px-[8px] py-[2px] rounded-[36px] uppercase'>
            Features
          </span>
          <h2 className='text-3xl font-bold -tracking-[0.32px] xl:text-[48px] xl:leading-[60px] text-white'>
            {title}
          </h2>
          <p className='text-white leading-6 font-medium'>{description}</p>
        </div>
        <Slider {...settings} className='pt-[58px] key-feature-carousel'>
          {data?.landingPage?.web_home_page?.keyFeatures
            ?.sort((a, b) => a.orderIndex - b.orderIndex)
            ?.map((item, i) => {
              return (
                <KeyFeatureCard
                  key={i}
                  imgSrc={process.env.NX_PUBLIC_STORE_URL + item?.icon?.[0]}
                  title={item?.title?.en}
                  desc={item?.description?.en}
                />
              );
            })}
        </Slider>
        <div className='py-[36px] px-[28px] border border-white rounded-2xl mt-[120px] bg-gradient-to-r from-black/70 to-black/60'>
          <div className='grid md:grid-cols-3 gap-[22px]'>
            <div className='flex flex-col gap-[8px] text-center'>
              <h2 className='text-4xl lg:text-[68px] lg:leading-[60px] font-bold text-white -tracking-[0.32px]'>
                <AnimatedNumber
                  value={data?.landingPage?.web_home_page?.totalSubscriber}
                  duration={4000}
                  formatValue={(value) => numberRange(value.toFixed())}
                />
              </h2>
              <span className='text-white leading-6 font-medium'>
                Subscribers
              </span>
            </div>
            <div className='flex flex-col gap-[8px] text-center'>
              <h2 className='text-4xl lg:text-[68px] lg:leading-[60px] font-bold text-white -tracking-[0.32px]'>
                <AnimatedNumber
                  //hot fix old count added
                  value={
                    data?.landingPage?.web_home_page?.totalVisitor + 1855041
                  }
                  duration={4000}
                  formatValue={(value) => numberRange(value.toFixed())}
                />
              </h2>
              <span className='text-white leading-6 font-medium'>Visits</span>
            </div>
            <div className='flex flex-col gap-[8px] text-center'>
              <h2 className='text-4xl lg:text-[68px] lg:leading-[60px] font-bold text-white -tracking-[0.32px]'>
                <AnimatedNumber
                  //hot fix old count added
                  value={
                    data?.landingPage?.web_home_page?.totalAssessments + 17439
                  }
                  duration={4000}
                  formatValue={(value) => numberRange(value.toFixed())}
                />
              </h2>
              <span className='text-white leading-6 font-medium'>
                Completed Assessment
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
