import React from 'react';
interface ChevronLeftProps {
  stroke?: string | undefined;
}
export const ChevronLeft: React.FC<ChevronLeftProps> = ({ stroke }) => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M12.8125 15.6299L7.1875 10.0049L12.8125 4.37988'
        stroke={stroke}
        strokeWidth='2'
        strokeMiterlimit='10'
        strokeLinecap='square'
      />
    </svg>
  );
};
interface PreviousIconProps {
  fill?: string | undefined;
}

export const PreviousIcon: React.FC<PreviousIconProps> = ({ fill }) => {
  return (
    <svg
      width='24'
      height='25'
      viewBox='0 0 24 25'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M20.7992 18.4996L14.7992 12.4996L20.7992 6.49961L19.5992 4.09961L11.1992 12.4996L19.5992 20.8996L20.7992 18.4996Z'
        fill={fill}
      />
      <path
        d='M12.7992 18.4996L6.79922 12.4996L12.7992 6.49961L11.5992 4.09961L3.19922 12.4996L11.5992 20.8996L12.7992 18.4996Z'
        fill={fill}
      />
    </svg>
  );
};
