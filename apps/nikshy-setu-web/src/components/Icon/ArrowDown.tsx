import React from 'react';
interface ArrowDownProps {
  stroke?: string | undefined;
  arrowWidth?: number;
  arrowHeight?: number;
}
export const ArrowDown: React.FC<ArrowDownProps> = ({
  stroke,
  arrowWidth,
  arrowHeight,
}) => {
  return (
    <svg
      width={arrowWidth}
      height={arrowHeight}
      viewBox='0 0 28 29'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M5.83301 11.0921L11.8784 17.1374C13.0499 18.309 14.9494 18.309 16.121 17.1374L22.1663 11.0921'
        stroke={stroke}
        strokeWidth='2'
      />
    </svg>
  );
};
