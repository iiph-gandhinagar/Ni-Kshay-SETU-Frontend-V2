import React from 'react';

interface LeaderboardBarProps {
  wrapperClassName?: string;
  verticalBarClassName?: string;
  topBarClassName?: string;
  labelClassName?: string;
  label?: string;
  barHeight?: number;
}

export const LeaderboardBar: React.FC<LeaderboardBarProps> = ({
  wrapperClassName = '',
  verticalBarClassName = '',
  topBarClassName = '',
  labelClassName = '',
  label = '',
  barHeight,
}) => {
  return (
    <div className={`${wrapperClassName} flex flex-col items-center`}>
      <div className='w-full' style={{ height: `${barHeight}px` }}>
        <div
          style={{
            height: 0,
            borderBottomWidth: 14,
            borderBottomColor: '#ACA6EC',
            borderLeftWidth: 11,
            borderLeftColor: 'transparent',
            borderRightWidth: 11,
            borderRightColor: 'transparent',
          }}
        />
        <div
          className={`${verticalBarClassName} h-[calc(100%-20px)] flex items-center justify-center`}
        >
          <p className={`text-center font-bold text-white ${labelClassName}`}>
            {label}
          </p>
        </div>
      </div>
    </div>
  );
};
