import { InputMassageSendSvg } from '@nikshay-setu-v3-monorepo/assets';
import React, { MouseEventHandler, ReactElement, ReactNode } from 'react';
import { ChevronLeft } from '../Icon/ChevronLeft';
import { ChevronRight } from '../Icon/ChevronRight';
interface PrimaryButtonProps {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  customClassName?: string;
  type?: 'button' | 'submit' | 'reset';
  showLinearGradient?: boolean;
  bgColor?: string;
  rightImg?: ReactElement;
  leftImg?: ReactElement;
}
export const PrimaryBtn: React.FC<PrimaryButtonProps> = ({
  title = '',
  onClick = () => null,
  disabled = false,
  customClassName = '',
  type = 'button',
  showLinearGradient = false,
  bgColor = '',
  rightImg,
  leftImg,
}) => {
  return (
    <button
      disabled={disabled}
      className={`btn btn-blue ${
        showLinearGradient
          ? 'bg-gradient-to-r from-[#9C5ED7] from-0% via-[#635AD9] via-50% to-[#E8A0A0] to-100%'
          : ''
      } ${bgColor} ${customClassName}`}
      type={type}
      onClick={onClick}
    >
      {leftImg}
      {title}
      {rightImg}
    </button>
  );
};
interface MenuButtonProps {
  onClick?: () => (Promise<void> | void) | MouseEventHandler | undefined;
}
export const MenuBtn: React.FC<MenuButtonProps> = ({ onClick = undefined }) => {
  return (
    <button
      onClick={onClick}
      data-collapse-toggle='navbar-cta'
      type='button'
      className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
      aria-controls='navbar-cta'
      aria-expanded='false'
    >
      <span className='sr-only'>Open main menu</span>
      <svg
        className='w-5 h-5'
        aria-hidden='true'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 17 14'
      >
        <path
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M1 1h15M1 7h15M1 13h15'
        />
      </svg>
    </button>
  );
};
interface SendButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
}
export const SendBtn: React.FC<SendButtonProps> = ({
  onClick = () => null,
  disabled = false,
  type = 'button',
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className='bg-white rounded-full p-[14px] text-center inline-flex items-center drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] w-[56px] h-[56px]'
      onClick={onClick}
    >
      <img src={InputMassageSendSvg} alt='Send' />
    </button>
  );
};
interface IconButtonProps {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  nextBtn?: boolean;
  previousBtn?: boolean;
}
export const IconButton: React.FC<IconButtonProps> = ({
  title = '',
  onClick = () => null,
  disabled = false,
  className = '',
  type = 'button',
  nextBtn = false,
  previousBtn = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
      type={type}
    >
      {previousBtn ? <ChevronLeft stroke='#4B4E8B' /> : null}
      {title}
      {nextBtn ? <ChevronRight stroke='white' /> : null}
    </button>
  );
};

interface OutLineBtnProps {
  title?: string;
  onClick?: () => (Promise<void> | void) | MouseEventHandler | undefined;
  disabled?: boolean;
  customClassName?: string;
  showIcon?: boolean;
  iconSrc?: string;
  color?: 'white' | 'black' | 'gary' | 'blue';
  children?: ReactNode;
  type?: 'button' | 'submit';
}

export const OutLineBtn: React.FC<OutLineBtnProps> = ({
  title,
  onClick,
  disabled,
  customClassName = '',
  showIcon,
  iconSrc,
  color = 'white',
  children,
  type = 'button',
}) => {
  // Define color styles dynamically
  const colorClasses = {
    white: 'border-white text-white',
    black: 'border-black  text-black',
    gary: 'btn-dark-gray',
    blue: 'btn-blue',
  };

  return (
    <button
      type={type}
      className={`btn btn-outline ${colorClasses[color]} ${customClassName}`}
      onClick={onClick}
      disabled={disabled}
    >
      {title} {children}
      {showIcon && iconSrc ? (
        <img src={iconSrc} alt='icon' className='ml-2 h-5' />
      ) : null}
    </button>
  );
};

interface KnowledgeQuizButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const KnowledgeQuizButton: React.FC<KnowledgeQuizButtonProps> = ({
  children,
  className = '',
  disabled,
  ...props
}) => {
  return (
    <button
      className={`btn w-full btn-dark-gray ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
interface GradientTextButtonProps {
  title: string;
  onClick?: () => void;
  rightImg?: ReactElement;
}
export const GradientTextBtn: React.FC<GradientTextButtonProps> = ({
  title = '',
  onClick = () => null,
  rightImg,
}) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className='bg-white/[0.64] px-[12px] py-[8px] rounded-full w-[103px] inline-flex justify-center gap-[4px]'
    >
      <span className='text-[12px] leading-[18px] bg-clip-text text-transparent bg-gradient-to-r from-[#9C5ED7] from-0% via-[#635AD9] via-50% to-[#E8A0A0] '>
        {title}
      </span>
      {rightImg}
    </button>
  );
};
interface SocialButtonProps {
  downloadText?: string;
  title?: string;
  onClick?: () => void;
  leftImg?: ReactElement;
}
export const SocialButton: React.FC<SocialButtonProps> = ({
  downloadText = '',
  title = '',
  onClick = () => null,
  leftImg,
}) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className='text-white bg-black px-[7px] py-[8px] rounded-[12px] inline-flex justify-center items-center gap-[12px] w-[150px]'
    >
      {leftImg}
      <div className='flex flex-col gap-[4px] text-left'>
        <span className='text-[10px] leading-[10px] font-semibold'>
          {downloadText}
        </span>
        <span className='leading-4 font-semibold'>{title}</span>
      </div>
    </button>
  );
};
