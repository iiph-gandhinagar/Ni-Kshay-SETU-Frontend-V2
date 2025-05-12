import React from 'react';
import Slider from 'react-slick';
interface IconsCarouselProps {
  carouselIcons?: Array<{ img: string }>;
  wrapperClassName?: string;
}
export const IconsCarousel: React.FC<IconsCarouselProps> = ({
  carouselIcons,
  wrapperClassName = '',
}) => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 100,
    pauseOnHover: false,
    speed: 5000,
    slidesToShow: 8,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    cssEase: 'linear',
  };
  return (
    <div
      className={`${wrapperClassName} relative grid grid-cols-3 gap-[12px] px-6 h-full`}
    >
      <div className='col-span-1 place-self-center space-y-2'>
        <Slider {...settings} rtl={true}>
          {carouselIcons?.map((item, i) => {
            return <img key={i} src={item.img} alt='icon' className='my-1' />;
          })}
        </Slider>
      </div>
      <div className='col-span-1 place-self-center space-y-2'>
        <Slider {...settings} rtl={false}>
          {carouselIcons?.map((item, i) => {
            return <img key={i} src={item.img} alt='icon' className='my-1' />;
          })}
        </Slider>
      </div>
      <div className='col-span-1 place-self-center space-y-2'>
        <Slider {...settings} rtl={true}>
          {carouselIcons?.map((item, i) => {
            return <img key={i} src={item.img} alt='icon' className='my-1' />;
          })}
        </Slider>
      </div>
    </div>
  );
};
