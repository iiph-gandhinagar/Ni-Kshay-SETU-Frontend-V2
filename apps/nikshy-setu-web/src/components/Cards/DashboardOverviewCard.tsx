import { numberRange } from '@nikshay-setu-v3-monorepo/utils';
import AnimatedNumber from 'animated-number-react';
interface DashboardOverviewCardProps {
  imgSrc: string;
  title: string;
  count: number;
  color: string;
}
export const DashboardOverviewCard: React.FC<DashboardOverviewCardProps> = ({
  imgSrc = '',
  title = '',
  count = 0,
  color = '',
}) => {
  return (
    <div className='flex items-center bg-white p-4 xl:p-[48px] gap-[18px] rounded-2xl drop-shadow-[0_0_8px_rgba(0,0,0,0.08)]'>
      <img src={imgSrc} alt='Icon' className='w-[72px] h-[72px]' />
      <div>
        <h6
          className='text-[16px] font-medium leading-[24px] -tracking-[0.32px]'
          style={{ color: color }}
        >
          {title}
        </h6>
        <h2 className='text-2xl lg:text-[38px] lg:leading-[32px] font-semibold text-[#3B3B3B] -tracking-[0.32px] mt-[8px]'>
          <AnimatedNumber
            value={count}
            duration={4000}
            formatValue={(value) => numberRange(value.toFixed())}
          />
        </h2>
      </div>
    </div>
  );
};
