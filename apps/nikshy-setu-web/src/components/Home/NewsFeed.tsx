import React from 'react';
import Slider from 'react-slick';
import { useLanguageObject } from '../../utils/HelperHooks';
import { NewsFeedCard } from '../Cards/NewsFeedCard';
import './home.css';
interface NewsFeedProps {
  newsFeed?: Array<{
    image_url: string;
    href: string;
    title: string;
    source: string;
  }>;
}
export const NewsFeed: React.FC<NewsFeedProps> = ({ newsFeed }) => {
  const [langKey, getText, objectToValue] = useLanguageObject();
  const settings = {
    centerMode: true,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
    speed: 2000,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    centerPadding: '100px',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: '100px',
          centerMode: true,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
          centerMode: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
  };
  return (
    <section className='pt-[58px] pb-20'>
      <div className='lg:max-w-[1012px] mx-auto'>
        <h5 className='text-darkGray4D4D4D font-medium text-[24px] -tracking-[0.16px]'>
          {getText('HOME_TITLE_NEWS_FEED')}
        </h5>
        <Slider {...settings} className='slick-container'>
          {newsFeed?.map((item, i) => {
            return (
              <NewsFeedCard
                key={i}
                title={item?.title}
                href={item?.href}
                source={item?.source}
                image={item.image_url}
              />
            );
          })}
        </Slider>
      </div>
    </section>
  );
};
