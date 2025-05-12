import { ArrowDownSvg, TaskOpenSvg } from '@nikshay-setu-v3-monorepo/assets';
import React from 'react';
import { useLanguageObject } from '../../utils/HelperHooks';

interface AccordionProps {
  title?: string;
  onClick?: () => void;
  isOpen?: boolean;
  children: React.ReactNode;
}
export const Accordion: React.FC<AccordionProps> = ({
  title = '',
  onClick = () => null,
  isOpen = false,
  children,
}) => {
  return (
    <div
      className={`mb-6 ${
        isOpen ? 'lg:mb-[58px]' : 'lg:mb-[28px]'
      } rounded-2xl p-[16px] md:p-[24px] border bg-ALICE_BLUE Accordion`}
    >
      <button
        type='button'
        onClick={onClick}
        className='text-lg md:text-[24px] leading-[31.87px] -tracking-[0.16px] w-full text-left font-medium rounded-t-2xl focus:outline-none flex items-center justify-between'
      >
        {title}
        <img
          src={ArrowDownSvg}
          alt='Arrow Down'
          className={`transform transition-transform ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>
      {children}
    </div>
  );
};

interface TasksAccordionProps {
  imgSrc?: string;
  title?: string;
  onClick?: () => void;
  isOpen?: boolean;
  children: React.ReactNode;
  isActive?: boolean;
}
export const TasksAccordion: React.FC<TasksAccordionProps> = ({
  imgSrc = '',
  title = '',
  onClick = () => null,
  isOpen = false,
  children,
  isActive = true,
}) => {
  const [langKey, getText, objectToValue] = useLanguageObject();
  return (
    <div
      className='bg-white rounded-[16px] py-[16px] px-[12px]'
      style={{ opacity: isActive ? '1' : '0.5' }}
    >
      <button
        onClick={onClick}
        className='text-[18px] leading-[23.9px] -tracking-[0.16px] w-full text-left font-semibold rounded-t-2xl focus:outline-none flex items-center justify-between text-darkBlue'
      >
        <div className='flex gap-[4px] items-center'>
          <img src={imgSrc} alt='Icon' className='w-10 h-10' />
          {getText('LEADERBOARD_LEVEL')} : {title}
        </div>
        {isOpen ? (
          <img
            src={TaskOpenSvg}
            alt='Arrow Down'
            className='w-[28px] h-[28px]'
          />
        ) : (
          <img
            src={ArrowDownSvg}
            alt='Arrow Down'
            className='w-[28px] h-[28px]'
          />
        )}
      </button>
      {children}
    </div>
  );
};
