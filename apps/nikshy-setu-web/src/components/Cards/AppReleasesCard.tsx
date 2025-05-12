import { BugSvg } from '@nikshay-setu-v3-monorepo/assets';

interface AppReleasesCardProps {
  id?: number;
  description?: string | TrustedHTML;
  title: string;
}
export const AppReleasesCard: React.FC<AppReleasesCardProps> = ({
  id,
  description,
  title = '',
}) => {
  return (
    <div
      className={`bg-white rounded-[24px] flex flex-col p-[16px] md:p-[28px] shadow-xl items-center w-full`}
    >
      <div className='flex gap-[12px]'>
        <div className='bg-darkBlue w-[48px] h-[48px] flex items-center justify-center ring-[6px] ring-[#F7F8F9] rounded-full'>
          <h6 className='text-white leading-6 font-semibold'>{id}</h6>
        </div>
        <img src={BugSvg} alt='Video' className='w-[48px] h-[48px]' />
      </div>
      <div className='flex flex-col my-[28px] gap-[4px] items-center text-center'>
        <h6 className='leading-6 font-bold'>{title}</h6>
        <p
          className='text-[16px] font-medium leading-[24px] text-darkSilver'
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
      <h6 className='text-[16px] font-medium leading-[24px] text-darkSilver'>
        Date: June 14, 2023 12:00 AM
      </h6>
    </div>
  );
};
