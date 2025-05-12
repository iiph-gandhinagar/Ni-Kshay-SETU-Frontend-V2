import { Quotes1Svg, Quotes2Svg } from '@nikshay-setu-v3-monorepo/assets';

interface TestimonialsCardProps {
  imgSrc: string;
  name: string;
  desc: string;
}
export const TestimonialsCard: React.FC<TestimonialsCardProps> = ({
  imgSrc = '',
  name = '',
  desc = '',
}) => {
  return (
    <div className='flex flex-col items-center'>
      <div className='flex'>
        <img
          src={Quotes1Svg}
          alt='Icon'
          className='place-self-start w-12 md:w-20 lg-[142px]'
        />
        <p
          className='lg:text-[28px] lg:leading-[39.2px] font-semibold -tracking-[0.32px] py-[50px] text-center'
          dangerouslySetInnerHTML={{ __html: desc }}
        />
        <img
          src={Quotes2Svg}
          alt='Icon'
          className='place-self-end w-12 md:w-20 lg-[142px]'
        />
      </div>
      <div className='flex flex-col items-center text-center max-w-[360px]'>
        <img src={imgSrc} alt='Icon' className='w-[88px] h-[88px]' />
        <h5 className='text-[24px] leading-[32px] font-semibold mt-[24px]'>
          {name}
        </h5>
        {/* <p className='text-[18px] leading-[28px] font-medium text-darkSilver mt-[8px]'>
          Professor and Head, Rajkot, Gujarat
        </p> */}
      </div>
    </div>
  );
};
