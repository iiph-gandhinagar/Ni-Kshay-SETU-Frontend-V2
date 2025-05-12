import { STORE_URL } from '@nikshay-setu-v3-monorepo/constants';
import React from 'react';
import { useLanguageObject } from '../../utils/HelperHooks';
interface LeaderboardUserCardProps {
  name?: string;
  medalSrc?: string;
  userSrc?: string;
  level?: string;
  cadreTitle?: string;
}
export const LeaderboardUserCard: React.FC<LeaderboardUserCardProps> = ({
  name = '',
  medalSrc = '',
  userSrc = '',
  level = '',
  cadreTitle = '',
}) => {
  const [langKey, getText, objectToValue] = useLanguageObject();
  return (
    <div className='flex flex-col gap-[3px] w-[100px] sm:w-[130px] items-center'>
      <div className='relative w-20 h-20'>
        <img
          src={
            userSrc
              ? STORE_URL + userSrc
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6nhCkw4XFXUxIvH4VjOEXEpyqq0Z7Yb8YeQ&s'
          }
          alt='User'
          className='w-full h-full rounded-full object-cover border-4 border-transparent shadow-md bg-gradient-to-r from-blue-500 to-purple-500 p-[2px]'
        />
        {/* <img
          src={medalSrc}
          alt='Medal'
          className='w-[28px] h-[28px] absolute bottom-0 right-0 transform translate-x-1/3 translate-y-1/3 rounded-full bg-white shadow-md p-[2px]'
        /> */}
      </div>
      <div className='text-center'>
        <h6 className='text-[16px] font-semibold -tracking-[0.16px] text-darkBlue leading-[21.25px]'>
          {name}
        </h6>
        <span className='text-[14px] -tracking-[0.16px] leading-[18.59px] block text-darkSilver'>
          {cadreTitle}
        </span>
      </div>
      <div className='p-[4px] rounded-[8px] text-center flex bg-white'>
        <span className='text-[12px] font-semibold -tracking-[0.16px] inline-block leading-[14.4px] bg-clip-text text-transparent bg-gradient-to-r from-[#FF8008] to-[#FFC837]'>
          {getText('LEADERBOARD_LEVEL')} : {level}
        </span>
      </div>
    </div>
  );
};
