import {
  CastingSvg,
  CloseWhiteSvg,
  PlaySvg,
  SkipBackwardSvg,
  SkipForwardSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import React, { useRef, useState } from 'react';
interface VideoPlayerProps {
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ onClose = () => null }) => {
  const [isPaused, setIsPaused] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  // const [duration, setDuration] = useState(0);
  const [remainingTime, setRemainingTime] = useState('0:00');

  const videoRef = useRef<HTMLVideoElement>(null);
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgress = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const videoDuration = videoRef.current.duration;
      const timeLeft = videoDuration - currentTime;
      setProgress((currentTime / videoDuration) * 100);
      // setDuration(videoDuration);
      setRemainingTime(formatTime(timeLeft));
    }
  };

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const scrubTime =
        (Number(e.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = scrubTime;
      setProgress(Number(e.target.value));
    }
  };
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
      setIsPaused(!isPaused);
    }
  };

  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  return (
    <div
      className='relative w-full max-w-2xl mx-auto rounded-[24px] overflow-hidden'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <video
        ref={videoRef}
        onPause={() => setIsPaused(true)}
        onPlay={() => setIsPaused(false)}
        onTimeUpdate={handleProgress}
        className='w-full h-auto sm:h-[320px]'
        controls={false}
      >
        <source
          src='https://api.nikshay-setu.in/media/2121/TNteZHQm6KhvzStpDkjDmj31vnG0P39xBhpbP9tn.mp4'
          type='video/mp4'
        />
        Your browser does not support the video tag.
      </video>

      {(isHovered || isPaused) && (
        <div className='absolute inset-0 bg-VideoPlayer flex flex-col justify-between text-white px-6 py-4'>
          <div className='flex justify-between items-center'>
            <img src={CastingSvg} alt='Casting' />

            <span className='text-[16px] -tracking-[0.32px] truncate px-4'>
              Pradhan Mantri TB Mukt Bharat Abhiyaan
            </span>
            <img
              className='cursor-pointer'
              onClick={onClose}
              src={CloseWhiteSvg}
              alt=''
            />
          </div>

          <div className='flex justify-center items-center'>
            <div className='flex justify-between w-[590px] items-center'>
              <button onClick={() => skip(-10)} className='p-2'>
                <img src={SkipBackwardSvg} alt='SkipBackward' />
              </button>
              <button onClick={togglePlay} className='p-4'>
                {isPaused ? (
                  <img src={PlaySvg} alt='Play' />
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-10 w-10'
                    viewBox='0 0 24 24'
                    fill='white'
                  >
                    <path d='M6 4h4v16h-4v-16zm8 0h4v16h-4v-16z' />
                  </svg>
                )}
              </button>
              <button onClick={() => skip(10)} className='p-2'>
                <img src={SkipForwardSvg} alt='Play' />
              </button>
            </div>
          </div>

          <div className='flex justify-between items-center gap-[12px]'>
            <input
              type='range'
              value={progress}
              onChange={handleScrub}
              className='w-full appearance-none bg-[#C9C9C9] rounded h-1 cursor-pointer'
              style={{
                background: `linear-gradient(to right, #3b82f6 ${progress}%, #d1d5db ${progress}%)`,
              }}
            />
            <span className='text-[14px]'>{remainingTime}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
