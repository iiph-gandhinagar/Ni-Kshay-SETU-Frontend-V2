import React from 'react';

interface CircularProgressBarProps {
  size?: number; // Diameter of the progress bar
  progress: number; // Progress percentage (0 to 100)
  strokeWidth?: number; // Width of the progress stroke
  profileSrc?: string; // URL for the profile picture
  showMedalIcon?: boolean;
  medalIcon?: string;
  fromBgColor?: string;
  toBgColor?: string;
  fromOffset?: string;
  toOffset?: string;
  wrapperClassName?: string;
}

export const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  size = 130,
  progress,
  strokeWidth = 10,
  profileSrc,
  showMedalIcon = false,
  medalIcon = '',
  fromBgColor = '#FF8008',
  toBgColor = '#FFC837',
  fromOffset = '0%',
  toOffset = '100%',
  wrapperClassName = '',
}) => {
  // Calculations for SVG circle path
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={`relative flex justify-center items-center ${wrapperClassName}`}
      style={{ width: size, height: size }}
    >
      {/* SVG Circle with Gradient */}
      <svg width={size} height={size}>
        <defs>
          <linearGradient id='gradient' x1='1' y1='0' x2='0' y2='1'>
            <stop offset={fromOffset} stopColor={fromBgColor} />
            <stop offset={toOffset} stopColor={toBgColor} />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill='none'
          className='text-gray-300'
          style={{ stroke: '#EEEEEE' }}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill='none'
          stroke='url(#gradient)'
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap='round'
          transform={`rotate(0 ${size / 2} ${size / 2})`} // Start at the top
          className='transition-all duration-[1500ms] ease-out'
        />
      </svg>

      {/* Profile Picture in the Center */}
      {showMedalIcon ? (
        <img
          src={medalIcon}
          alt='Medal Icon'
          className='absolute rounded-full'
        />
      ) : (
        <img
          src={profileSrc}
          alt='Profile'
          className='absolute rounded-full'
          style={{
            width: 94,
            height: 94,
          }}
        />
      )}
    </div>
  );
};
