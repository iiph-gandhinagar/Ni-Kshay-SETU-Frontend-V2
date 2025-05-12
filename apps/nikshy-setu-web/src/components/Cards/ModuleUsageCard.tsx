interface ModuleUsageCardProps {
  imgSrc: string;
  title: string;
  count: number;
}
export const ModuleUsageCard: React.FC<ModuleUsageCardProps> = ({
  imgSrc = '',
  title = '',
  count = 0,
}) => {
  return (
    <div className='flex flex-col items-center text-center bg-white p-[24px] rounded-2xl drop-shadow-[0_0_8px_rgba(0,0,0,0.08)]'>
      <img src={imgSrc} className='h-[70px]' alt='Icon' />
      <h6 className='text-[16px] text-darkSilver font-medium leading-[24px] -tracking-[0.32px] mt-[18px] flex-1'>
        {title}
      </h6>
      <h2 className='text-2xl lg:text-[38px] lg:leading-[32px] font-semibold text-[#3B3B3B] -tracking-[0.32px] mt-[8px]'>
        {count}
      </h2>
    </div>
  );
};
