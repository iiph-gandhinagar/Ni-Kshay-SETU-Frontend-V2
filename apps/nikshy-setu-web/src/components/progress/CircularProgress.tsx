import React from 'react';

interface CircularProgressProps {
  size: number; // The diameter of the circle
  strokeWidth: number;
  outerRadius: number; // Radius for the outer circle
  innerRadius: number; // Radius for the inner circle
  outerCircumference: number;
  innerCircumference: number;
  outerStokeColor: string; // Color for outer background
  innerStokeColor: string; // Color for inner background
  outerGradientColors: [string, string]; // Gradient for the outer progress
  innerGradientColors: [string, string]; // Gradient for the inner progress
  animatedOuterProgress: number; // Percentage progress (0-1)
  animatedInnerProgress: number; // Percentage progress (0-1)
  hideInnerProgressBar?: boolean; // Option to hide the inner circle
  children: React.ReactNode; // Content inside the chart
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  size,
  strokeWidth,
  outerRadius,
  innerRadius,
  outerCircumference,
  innerCircumference,
  outerStokeColor,
  innerStokeColor,
  outerGradientColors,
  innerGradientColors,
  animatedOuterProgress,
  animatedInnerProgress,
  hideInnerProgressBar = false,
  children,
}) => {
  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <svg width={size} height={size}>
        <defs>
          {/* Outer Gradient */}
          <linearGradient id='outerGradient' x1='0%' y1='0%' x2='100%' y2='0%'>
            <stop offset='0%' stopColor={outerGradientColors[0]} />
            <stop offset='100%' stopColor={outerGradientColors[1]} />
          </linearGradient>

          {/* Inner Gradient */}
          {!hideInnerProgressBar && (
            <linearGradient
              id='innerGradient'
              x1='0%'
              y1='0%'
              x2='100%'
              y2='0%'
            >
              <stop offset='0%' stopColor={innerGradientColors[0]} />
              <stop offset='100%' stopColor={innerGradientColors[1]} />
            </linearGradient>
          )}
        </defs>

        {/* Outer Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={outerRadius}
          stroke={outerStokeColor}
          strokeWidth={strokeWidth}
          fill='none'
        />

        {/* Outer Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={outerRadius}
          stroke='url(#outerGradient)'
          strokeWidth={strokeWidth}
          fill='none'
          strokeDasharray={outerCircumference}
          strokeDashoffset={outerCircumference * (1 - animatedOuterProgress)}
          strokeLinecap='round'
        />

        {/* Inner Background Circle */}
        {!hideInnerProgressBar && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={innerRadius}
            stroke={innerStokeColor}
            strokeWidth={strokeWidth}
            fill='none'
          />
        )}

        {/* Inner Progress Circle */}
        {!hideInnerProgressBar && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={innerRadius}
            stroke='url(#innerGradient)'
            strokeWidth={strokeWidth}
            fill='none'
            strokeDasharray={innerCircumference}
            strokeDashoffset={innerCircumference * (1 - animatedInnerProgress)}
            strokeLinecap='round'
          />
        )}
      </svg>

      {/* Render children in the center */}
      <div className='absolute flex flex-col justify-center items-center w-full h-full text-center overflow-hidden'>
        {children}
      </div>
    </div>
  );
};

export default CircularProgress;
