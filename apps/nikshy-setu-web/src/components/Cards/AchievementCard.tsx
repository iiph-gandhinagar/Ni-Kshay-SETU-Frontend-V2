import React, { useEffect, useState } from 'react';
import { useLanguageObject } from '../../utils/HelperHooks';
import { AchievementCardData } from '../Leaderboard/AchievementsTab';
import { CircularProgressBar } from '../Leaderboard/CircularProgressBar';

type AchievementCardProps = {} & AchievementCardData;

export const AchievementCard: React.FC<AchievementCardProps> = ({
  lanKey,
  AchievementsCounter,
  fromBgColor,
  icon,
  name,
  pendingAchievementsCounter,
  toBgColor,
}) => {
  const [progressBar, setProgressBar] = useState(0);
  const [langKey, getText, objectToValue] = useLanguageObject();

  useEffect(() => {
    // Simulate progressBar over time
    const interval = setInterval(() => {
      setProgressBar(75);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const totalAchievements = AchievementsCounter + pendingAchievementsCounter;

  const progress = (AchievementsCounter * 100) / totalAchievements;

  return (
    <div className='drop-shadow-[0_2px_37.4px_rgba(0,0,0,0.12)] md:w-[174px]'>
      <div
        style={{
          background: `linear-gradient(90deg, ${fromBgColor}, ${toBgColor})`,
        }}
        className='px-[12px] py-[4px] rounded-t-[16px]'
      >
        <h6 className='text-[18px] leading-[23.9px] -tracking-[0.16px] text-white font-semibold'>
          {getText(lanKey as Parameters<typeof getText>[0])}
        </h6>
      </div>
      <div className='px-[12px] pt-[8px] pb-2 bg-white rounded-b-[16px]'>
        <div className='flex justify-center'>
          <CircularProgressBar
            wrapperClassName='drop-shadow-[0_0_5.4px_rgba(0,0,0,0.2)]'
            progress={progress}
            showMedalIcon
            size={100}
            medalIcon={icon}
            fromBgColor={fromBgColor}
            toBgColor={toBgColor}
          />
        </div>
        <div className='mt-[8px] space-y-[4px]'>
          <div className='flex justify-between'>
            <span className='text-[14px] font-medium -tracking-[0.16px] leading-[18.59px] block text-darkSilver'>
              {getText('APP_ACHIEVED')}
            </span>
            <span className='text-[14px] font-medium -tracking-[0.16px] leading-[18.59px] block text-[#30D03F]'>
              {AchievementsCounter}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-[14px] font-medium -tracking-[0.16px] leading-[18.59px] block text-darkSilver'>
              {getText('APP_PENDING')}
            </span>
            <span className='text-[14px] font-medium -tracking-[0.16px] leading-[18.59px] block text-[#FF6A60]'>
              {pendingAchievementsCounter}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
