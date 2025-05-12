import { BotAvatarsSvg } from '@nikshay-setu-v3-monorepo/assets';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { RootReducerStates } from '@nikshay-setu-v3-monorepo/types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createActivityPayloadAndSendActivity } from 'shared/store/src/user-activity/UserActivity';
import { ScrollAnimation } from '../Animations/Animations';

interface ChatOptionsProps {
  text?: string;
}

export const ChatOptions: React.FC<ChatOptionsProps> = ({ text = '' }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootReducerStates) => state.appContext);
  const topQuestion = data?.chatScreen?.chat_top_question || [];
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Divide questions into 3 rows
  const chunkSize = Math.ceil(topQuestion.length / 3);
  const part1 = topQuestion.slice(0, chunkSize);
  const part2 = topQuestion.slice(chunkSize, chunkSize * 2);
  const part3 = topQuestion.slice(chunkSize * 2);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      createAction({
        method: 'GET',
        url: 'CHAT_TOP_QUESTION',
      })
    );

    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch, screenWidth]);

  const handleChatOptionClick = () => {
    createActivityPayloadAndSendActivity({
      module: 'Chatbot',
      action: 'chatKeyword-click',
    });
  };

  // Render a row of questions
  const renderRow = (
    questions: typeof topQuestion,
    key: string,
    duration: number
  ) => (
    <div
      key={key}
      className='w-full overflow-hidden whitespace-nowrap flex items-center gap-4'
    >
      <ScrollAnimation duration={duration}>
        {questions?.map((item, i) => (
          <div
            key={`${key}+${i}`}
            onClick={() => {
              // send user activity
              handleChatOptionClick();
              navigate(
                `/ask-setu?sessionId=${data?.chatScreen?.sessionId}&question=${item?.question}&questionId=${item?.id}`
              );
            }}
            style={{ cursor: 'pointer' }}
            className='shrink-0 rounded-[12px] border border-GREY_A1A6A3 py-2 px-2 bg-white h-[48px]'
          >
            <h6 className='text-[16px] md:text-[18px] text-black font-medium'>
              {item?.question}
            </h6>
          </div>
        ))}
      </ScrollAnimation>
    </div>
  );

  return (
    <div className='flex gap-2 self-start items-start w-full'>
      {/* Bot Avatar */}
      <img
        src={BotAvatarsSvg}
        width={36}
        height={36}
        alt='Bot'
        className='shrink-0'
      />

      {/* Questions Container */}
      <div className='flex flex-col mb-4 self-start items-start w-full overflow-hidden'>
        {/* Header Text */}
        <div className='max-w-full'>
          <h6 className='text-[18px] text-black leading-[23.9px] font-medium -tracking-[0.16px]'>
            {text}
          </h6>

          {/* Questions Display */}
          <div className='mt-[12px] mb-[6px] space-y-[12px]'>
            {renderRow(part1, 'row1', 7)}
            {renderRow(part2, 'row2', 8)}
            {renderRow(part3, 'row3', 9)}
          </div>
        </div>
      </div>
    </div>
  );
};
