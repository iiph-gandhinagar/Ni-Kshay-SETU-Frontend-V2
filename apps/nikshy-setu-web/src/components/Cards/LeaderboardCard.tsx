import { STORE_URL } from '@nikshay-setu-v3-monorepo/constants';
import { useLanguageObject } from '../../utils/HelperHooks';
import { CircularProgressBar } from '../Leaderboard/CircularProgressBar';

interface LeaderboardCardProps {
  progress: string;
  name: string;
  appPerformanceLevel: string;
  profile: any;
}
export const LeaderboardCard: React.FC<LeaderboardCardProps> = ({
  progress = '',
  name = '',
  appPerformanceLevel = '',
  profile,
}) => {
  const [langKey, getText, objectToValue] = useLanguageObject();
  return (
    <div className='p-4 bg-gradient-to-b from-[#6A5ADF] to-[#9087E4] rounded-2xl text-white'>
      <div className='flex sm:flex-row flex-col gap-[9px] sm:justify-start justify-center items-center'>
        <div className='p-4'>
          <CircularProgressBar
            wrapperClassName='drop-shadow-[0_0_9.73px_rgba(0,0,0,0.2)]'
            progress={(profile?.completedTasks / profile?.totalTasks) * 100}
            profileSrc={
              profile?.profileImage
                ? STORE_URL + profile?.profileImage
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6nhCkw4XFXUxIvH4VjOEXEpyqq0Z7Yb8YeQ&s'
            }
          />
        </div>
        <div className='flex flex-col gap-[8px]'>
          <h1 className='text-[38px] font-bold leading-[50.46px] '>
            {progress}
          </h1>
          <h5 className='font-semibold leading-[24px] text-[24px]'>{name}</h5>
          <h6 className='leading-[19.2px] text-[16px]'>
            {getText('LABEL_CADRE')}:{' '}
            {(profile?.cadreType ?? '').replace('_', ' ')}
          </h6>
          <h6 className='leading-[19.2px] text-[16px]'>
            {getText('LEADERBOARD_LEVEL')}: {appPerformanceLevel}
          </h6>
        </div>
      </div>
    </div>
  );
};
