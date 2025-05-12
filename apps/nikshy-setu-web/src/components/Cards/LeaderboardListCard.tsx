import { STORE_URL } from '@nikshay-setu-v3-monorepo/constants';
import React from 'react';
import { useLanguageObject } from '../../utils/HelperHooks';

interface LeaderboardListCardProps {
  name?: string;
  number?: string;
  level?: string;
  cadreType?: string;
  cadreTitle?: string;
  percentageCompleted?: string;
  profileSrc?: string;
  lastElementRef: (node: any) => void;
}
export const LeaderboardListCard: React.FC<LeaderboardListCardProps> = ({
  name = '',
  number = '',
  level = '',
  cadreType = '',
  cadreTitle = '',
  percentageCompleted = '',
  profileSrc,
  lastElementRef = () => {},
}) => {
  const [langKey, getText, objectToValue] = useLanguageObject();
  return (
    <div
      ref={lastElementRef}
      className='py-2 px-[12px] rounded-[16px] bg-white'
    >
      <div className='flex gap-[8px] items-center'>
        <div className='border border-[#C6C6C6] rounded-full p-1 w-6 md:w-8 h-6 md:h-8 flex items-center justify-center'>
          <h6 className='text-[22px] font-medium -tracking-[0.16px]'>
            {number}
          </h6>
        </div>
        <img
          src={
            profileSrc
              ? STORE_URL + profileSrc
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6nhCkw4XFXUxIvH4VjOEXEpyqq0Z7Yb8YeQ&s'
          }
          alt='User'
          className='w-12 md:w-14 h-12 md:h-14 rounded-full border-2 border-gray-200 shadow-sm'
        />

        <div className='flex flex-col flex-1'>
          <h6 className='text-[18px] font-semibold -tracking-[0.16px] text-darkBlue leading-[21.25px]'>
            {name}
          </h6>
          <span className='text-[14px] -tracking-[0.16px] leading-[18.59px] block text-darkSilver'>
            {(cadreType ?? '').replace('_', ' ')}, {cadreTitle}
          </span>
          <div className='flex justify-between items-center mt-[8px]'>
            <span className='text-[14px] font-semibold -tracking-[0.16px] inline-block leading-[14.4px] text-darkSilver '>
              {getText('LEADERBOARD_LEVEL')} : {level}
            </span>
            <span className='text-[14px] font-semibold -tracking-[0.16px] inline-block leading-[14.4px] text-darkSilver '>
              {percentageCompleted + '%'}
            </span>
          </div>
          <div className='w-full bg-[#EEEEEE] rounded-full h-[4px] mt-[4px]'>
            <div
              className='bg-gradient-to-r from-[#FF8008] to-[#FFC837] h-[4px] rounded-full'
              style={{ width: `${percentageCompleted}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
