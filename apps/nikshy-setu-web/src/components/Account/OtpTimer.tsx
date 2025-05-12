import React, { useEffect, useState } from 'react';
interface OtpTimerProps {
  initialTime?: number;
  ResendOtp?: () => void;
}

export const OtpTimer: React.FC<OtpTimerProps> = ({
  initialTime = 180,
  ResendOtp = () => null,
}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0'
    )}`;
  };

  return (
    <div className='flex justify-between mt-[12px] mx-3'>
      <h6 className='text-xs text-darkGray495555'>
        {`Didn’t receive yet?`}{' '}
        <span
          className={`underline ${timeLeft == 0 ? 'cursor-pointer' : ''}`}
          onClick={timeLeft == 0 ? ResendOtp : () => {}}
        >
          Resend now
        </span>
      </h6>
      <h6 className='text-xs text-darkGray495555'>{formatTime(timeLeft)}</h6>
    </div>
  );
};
