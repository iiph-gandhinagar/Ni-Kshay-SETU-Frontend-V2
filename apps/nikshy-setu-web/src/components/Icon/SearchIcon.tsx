import React from 'react';
interface SearchIconSvgProps {
  stroke?: string | undefined;
  height?: string;
}
export const SearchIconSvg: React.FC<SearchIconSvgProps> = ({
  stroke,
  height = '28',
}) => {
  return (
    <svg
      width={height}
      height='20'
      viewBox='0 0 28 29'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M19.0117 19.6847L25.6114 26.2844'
        stroke={stroke}
        strokeWidth='2'
      />
      <rect
        x='2.39062'
        y='14.3258'
        width='16.419'
        height='16.419'
        rx='8.2095'
        transform='rotate(-45 2.39062 14.3258)'
        stroke={stroke}
        strokeWidth='2'
      />
    </svg>
  );
};
