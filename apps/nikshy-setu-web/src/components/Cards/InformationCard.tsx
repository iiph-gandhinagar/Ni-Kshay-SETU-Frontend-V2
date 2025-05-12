import React from 'react';
import { useLanguageObject } from '../../utils/HelperHooks';

type Task = {
  levelName: string;
  level: string;
  icon1: string;
  icon2: string;
  icon3: string;
  fromBgColor?: string;
  toBgColor?: string;
};
interface InformationCardProps {
  task: Task;
}
export const InformationCard: React.FC<InformationCardProps> = ({ task }) => {
  const [langKey, getText, objectToValue] = useLanguageObject();
  return (
    <div
      className={`drop-shadow-[0_2px_37.4px_rgba(0,0,0,0.12)] p-[12px] rounded-2xl bg-white border `}
      style={{ borderColor: task.fromBgColor }}
    >
      <div
        style={{
          background: `linear-gradient(to right, ${task.fromBgColor} , ${task.toBgColor} )`,
        }}
        className='px-[12px] pt-[8px] pb-2 rounded-[16px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.12)]'
      >
        <div className='flex justify-between'>
          <h6 className='text-[16px] leading-[22.25px] -tracking-[0.16px] text-white font-semibold'>
            {task.level}
          </h6>
          <h6 className='text-[16px] leading-[22.25px] -tracking-[0.16px] text-white font-semibold'>
            {task.levelName}
          </h6>
        </div>
        <p className='text-[14px] font-medium -tracking-[0.16px] leading-[18.59px] mt-[8px] text-white'>
          {getText('LEADERBOARD_MEDAL_TASKS_DESCRIPTION')}
        </p>
      </div>
      <div className='mt-[4px] gap-[56px] flex justify-center'>
        <div className='flex flex-col gap-[4px] text-center'>
          <img src={task.icon1} alt='Icon' className='w-16 h-16' />
          <span className='text-[14px] font-medium -tracking-[0.16px] leading-[18.59px] block'>
            {getText('LEVEL_BRONZE')}
          </span>
        </div>
        <div className='flex flex-col gap-[4px] text-center'>
          <img src={task.icon2} alt='Icon' className='w-16 h-16' />
          <span className='text-[14px] font-medium -tracking-[0.16px] leading-[18.59px] block'>
            {getText('LEVEL_SILVER')}
          </span>
        </div>
        <div className='flex flex-col gap-[4px] text-center'>
          <img src={task.icon3} alt='Icon' className='w-16 h-16' />
          <span className='text-[14px] font-medium -tracking-[0.16px] leading-[18.59px] block'>
            {getText('LEVEL_GOLD')}
          </span>
        </div>
      </div>
    </div>
  );
};
