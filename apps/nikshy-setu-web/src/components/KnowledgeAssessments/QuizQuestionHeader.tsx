import { ClockSvg, QuestionSvg } from '@nikshay-setu-v3-monorepo/assets';
import { useEffect, useRef } from 'react';
import { useLanguageObject } from '../../utils/HelperHooks';

interface QuizQuestionHeaderProps {
  remainingTime?: number;
  currentQuestionIndex: number;
  questionsState: any;
  setTimerState: any;
}

export const QuizQuestionHeader = ({
  currentQuestionIndex,
  remainingTime,
  questionsState,
  setTimerState,
}: QuizQuestionHeaderProps) => {
  const TimerElement = useRef<HTMLSpanElement>();
  const [langKey, getText] = useLanguageObject();

  const progressQuestion =
    ((currentQuestionIndex + 1) * 100) / questionsState.length;

  useEffect(() => {
    if (remainingTime == undefined) return;
    // init blank
    const counterTimer = new Date(0, 0, 0, 0, 0, 0);
    const timerInString = counterTimer.toLocaleString();
    // set timer
    counterTimer.setSeconds(remainingTime);

    // start counter
    const intervalId = setInterval(() => {
      counterTimer.setSeconds(counterTimer.getSeconds() - 1);
      if (counterTimer.toLocaleString() !== timerInString) {
        if (TimerElement.current) {
          TimerElement.current.innerHTML = `${String(
            counterTimer.getMinutes()
          ).padStart(2, '0')}:${String(counterTimer.getSeconds()).padStart(
            2,
            '0'
          )} `;
        }
      } else {
        clearInterval(intervalId);
        setTimerState((old) => ({ ...old, TimeOver: true }));
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [remainingTime]);

  return (
    <div className=''>
      <div className='flex items-center justify-between mb-[12px] flex-wrap gap-4'>
        {/*  */}
        <div className='flex items-center gap-[10px] bg-[#E9F1FF] p-[12px] rounded-[12px]'>
          <img src={QuestionSvg} alt='' />
          <div className=''>
            <span className='text-black'>{getText('APP_QUESTION')}</span>
            <span className='text-[#4B5F83] text-[20px] font-semibold ms-1'>
              {currentQuestionIndex + 1}/{questionsState.length}
            </span>
          </div>
        </div>

        {/*  */}
        {remainingTime !== undefined && remainingTime > 0 && (
          <div className='flex items-center gap-[10px] bg-[#E9F1FF] p-[12px] rounded-[12px]'>
            <img src={ClockSvg} alt='' />
            <div className='flex items-center gap-2 text-gray-500'>
              <span className='text-black'>
                {getText('K_QUIZ_REMAINING_TIME')}
              </span>
              <span
                ref={TimerElement}
                className='text-[#4B5F83] text-[20px] font-semibold ms-1'
              >
                {/* {formatTime(timeLeft)} */}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className='bg-[#F0F0F0] h-2 w-full rounded-[23px] relative overflow-hidden'>
        <div
          className='h-full bg-[#4D4D4D] transition-width duration-300 ease-in-out'
          style={{ width: `${progressQuestion}%` }}
        ></div>
      </div>
    </div>
  );
};
