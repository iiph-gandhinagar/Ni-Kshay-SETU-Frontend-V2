import { motion } from 'framer-motion';
import React from 'react';

interface ScrollAnimationProps {
  duration?: number;
  children: React.ReactNode;
}
export const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  duration = 0,
  children,
}) => {
  return (
    <motion.div
      className='gap-[12px] flex'
      animate={{ x: [-200, 200] }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'linear',
      }}
    >
      {children}
    </motion.div>
  );
};

interface FadeUpAnimationProps {
  delay?: number;
  children: React.ReactNode;
}
export const FadeUpAnimation: React.FC<FadeUpAnimationProps> = ({
  delay = 0,
  children,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      {children}
    </motion.div>
  );
};

interface LeaderboardBarAnimationProps {
  delay?: number;
  children: React.ReactNode;
}
export const LeaderboardBarAnimation: React.FC<
  LeaderboardBarAnimationProps
> = ({ delay = 0, children }) => {
  return (
    <motion.div
      initial={{ y: 240 }}
      animate={{ y: 0 }}
      exit={{ y: -240 }}
      transition={{ duration: 0.7, delay: delay }}
    >
      {children}
    </motion.div>
  );
};

interface FadeDownProps {
  children: React.ReactNode;
  delay?: number;
  distance?: number;
}

export const FadeDownAnimation: React.FC<FadeDownProps> = ({
  children,
  delay = 0,
  distance = 30,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

interface PulseAnimationProps {
  children: React.ReactNode;
  scale?: number;
  duration?: number;
}

export const PulseAnimation: React.FC<PulseAnimationProps> = ({
  children,
  scale = 1.2,
  duration = 0.8,
}) => {
  return (
    <motion.div
      initial={{ scale: 1 }}
      animate={{ scale: [1, scale, 1] }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
};
