import React from 'react';
interface ChevronRightProps {
  stroke?: string | undefined;
  height?: number;
  width?: number;
}
export const ChevronRight: React.FC<ChevronRightProps> = ({
  stroke,
  height = '18',
  width = '18',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M6.46875 14.0674L11.5312 9.00488L6.46875 3.94238'
        stroke={stroke}
        strokeWidth='2'
        strokeMiterlimit='10'
        strokeLinecap='square'
      />
    </svg>
  );
};
export const ChevronRight2: React.FC<ChevronRightProps> = ({
  stroke = '#808080',
}) => {
  return (
    <svg
      width='20'
      height='21'
      viewBox='0 0 20 21'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M7.1875 4.625L12.8125 10.25L7.1875 15.875'
        stroke={stroke}
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='square'
      />
    </svg>
  );
};
export const ChevronRight3: React.FC<ChevronRightProps> = ({
  stroke = '#495555',
}) => {
  return (
    <svg
      width='24'
      height='25'
      viewBox='0 0 24 25'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M8 4.67773L16 12.6777L8 20.6777'
        stroke={stroke}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
