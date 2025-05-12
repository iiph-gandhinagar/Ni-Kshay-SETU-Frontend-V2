import { GradientArrow2Svg } from '@nikshay-setu-v3-monorepo/assets';
import { Link } from 'react-router-dom';
import { GradientTextBtn } from '../Buttons/Btns';

interface KeyFeatureCardProps {
  imgSrc: string;
  title: string;
  desc: string;
}
export const KeyFeatureCard: React.FC<KeyFeatureCardProps> = ({
  imgSrc = '',
  title = '',
  desc = '',
}) => {
  return (
    <div className='bg-gradient-to-b from-[#ffffff7a] to-[#ffffff24] p-4 rounded-2xl text-white flex flex-col min-h-[307px] border-t border-white h-full'>
      <img src={imgSrc} alt={title + '-Icon'} className='w-12 h-12' />
      <h6 className='text-[24px] font-bold leading-[28.8px] mt-[8px] flex-1'>
        {title}
      </h6>
      <div className='flex flex-col justify-between gap-4 mt-[8px]'>
        <p className='text-[18px] leading-[25.2px] font-medium'>{desc}</p>
        <Link to='/home'>
          <GradientTextBtn
            title='Explore'
            rightImg={<img src={GradientArrow2Svg} alt='Right Arrow' />}
          />
        </Link>
      </div>
    </div>
  );
};
