import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';

interface CircularProgressProps {
  size?: number; // Diameter of the progress bar
  strokeWidth?: number; // Stroke width for both circles
  outerProgress?: number; // Progress value for the outer circle (0 to 1)
  innerProgress?: number; // Progress value for the inner circle (0 to 1)
  duration?: number; // Animation duration in seconds
  hideInnerProgressBar?: boolean;
  outerStrokeColor?: string;
  innerStrokeColor?: string;
  outerGradientColors?: string[]; // Gradient colors for the outer circle
  innerGradientColors?: string[]; // Gradient colors for the inner circle
  children?: React.ReactNode; // Children to render in the center of the progress bar
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  size = 200,
  strokeWidth = 20,
  outerProgress = 0.75,
  innerProgress = 0.5,
  hideInnerProgressBar = false,
  innerStrokeColor = '#e0e0e0',
  outerStrokeColor = '#e0e0e0',
  duration = 1.5, // Duration in seconds
  outerGradientColors = ['#0C3896', '#7209b7'],
  innerGradientColors = ['#53B5D9', '#0C3896'],
  children,
}) => {
  const outerRadius = (size - strokeWidth) / 2;
  const innerRadius = outerRadius - strokeWidth * 1.5; // Reduce radius for inner progress bar

  const outerCircumference = 2 * Math.PI * outerRadius;
  const innerCircumference = 2 * Math.PI * innerRadius;

  const outerControls = useAnimation();
  const innerControls = useAnimation();

  useEffect(() => {
    // Animate the outer progress circle
    outerControls.start({
      strokeDashoffset: outerCircumference * (1 - outerProgress),
      transition: { duration: duration, ease: 'easeOut' },
    });

    // Animate the inner progress circle
    innerControls.start({
      strokeDashoffset: innerCircumference * (1 - innerProgress),
      transition: { duration: duration, ease: 'easeOut' },
    });
  }, [
    outerProgress,
    innerProgress,
    outerControls,
    innerControls,
    duration,
    outerCircumference,
    innerCircumference,
  ]);

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size}>
        <defs>
          {/* Outer Circle Gradient */}
          <linearGradient id='gradOuter' x1='0%' y1='0%' x2='100%' y2='0%'>
            <stop offset='0%' stopColor={outerGradientColors[0]} />
            <stop offset='100%' stopColor={outerGradientColors[1]} />
          </linearGradient>

          {/* Inner Circle Gradient */}
          {!hideInnerProgressBar && (
            <linearGradient id='gradInner' x1='0%' y1='0%' x2='100%' y2='0%'>
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
          stroke={outerStrokeColor}
          strokeWidth={strokeWidth}
          fill='none'
        />

        {/* Outer Animated Progress Circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={outerRadius}
          stroke='url(#gradOuter)' // Gradient stroke for outer circle
          strokeWidth={strokeWidth}
          fill='none'
          strokeLinecap='round'
          strokeDasharray={outerCircumference}
          initial={{ strokeDashoffset: outerCircumference }}
          animate={outerControls}
        />

        {/* Inner Background Circle */}
        {!hideInnerProgressBar && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={innerRadius}
            stroke={innerStrokeColor}
            strokeWidth={strokeWidth}
            fill='none'
          />
        )}

        {/* Inner Animated Progress Circle */}
        {!hideInnerProgressBar && (
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={innerRadius}
            stroke='url(#gradInner)' // Gradient stroke for inner circle
            strokeWidth={strokeWidth}
            fill='none'
            strokeLinecap='round'
            strokeDasharray={innerCircumference}
            initial={{ strokeDashoffset: innerCircumference }}
            animate={innerControls}
          />
        )}
      </svg>

      {/* Render children in the center */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: size,
          height: size,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {children}
      </div>
    </div>
  );
};
