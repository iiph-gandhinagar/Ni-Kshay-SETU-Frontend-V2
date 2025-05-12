import {
  BotAvatarsSvg,
  DoctorProfile,
  ExpandSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import moment from 'moment';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { chatQuestionType } from '../../pages/chatbot/ask-setu';
import { OutLineBtn } from '../Buttons/Btns';

interface ChatMessageProps {
  question: chatQuestionType;
  showH5PQuestion: (subQuestion: chatQuestionType) => void;
  handleResponse: (
    statusCode: number,
    response,
    actionUrl: 'GET_SUB_NODE_DATA',
    addSate?: boolean
  ) => chatQuestionType | void;
}

const NavigationButtonObject = {
  '/manage-tb-tool': { text: 'ManageTB India', navigateTo: '/manage-tb' },
  '/assessment-tool': {
    text: 'Knowledge Quiz',
    navigateTo: '/KnowledgeAssessments',
  },
  '/query-2coe-tool': {
    text: 'Query2COE',
    navigateTo: '/query-response-management',
  },
};

export const ChatMessage: React.FC<ChatMessageProps> = ({
  question,
  showH5PQuestion,
  handleResponse,
}) => {
  const isUserMessage = question.self;
  const isMultiAns = question.data && question.data.length > 5 ? true : false;

  // state
  const [visibleDataLength, setVisibleDataLength] = useState(
    isMultiAns ? 5 : question.data?.length
  );
  const [subNodeSate, setSubNodeSate] = useState({
    isFetch: false,
    data: [],
    isLoading: false,
  });

  useEffect(() => {
    setSubNodeSate({ isFetch: false, data: [], isLoading: false });
  }, [question.subNode?.toString()]);

  // get hooks
  const dispatch = useDispatch();

  // helper
  const handleLoadMore = () => {
    const newVisibleLength = visibleDataLength + 5;
    const showAllData = newVisibleLength > question.data.length;
    setVisibleDataLength(showAllData ? question.data.length : newVisibleLength);
  };

  const fetchSubNote = () => {
    setSubNodeSate((oldState) => ({ ...oldState, isLoading: true }));
    dispatch(
      createAction(
        {
          method: 'POST',
          url: 'GET_SUB_NODE_DATA',
          data: question.subNode,
        },
        (code, response) => {
          const newData = handleResponse(
            code,
            response,
            'GET_SUB_NODE_DATA',
            false
          );
          if (newData) {
            setSubNodeSate({
              isFetch: true,
              data: newData.data,
              isLoading: false,
            });
          }
        }
      )
    );
  };

  return (
    <div
      className={`flex gap-2 ${
        isUserMessage ? 'self-end items-end' : 'self-start items-start'
      }`}
      id={question.questionId}
    >
      {/* bot icon */}
      {!isUserMessage && (
        <img
          src={BotAvatarsSvg}
          width={36}
          height={36}
          alt='Bot'
          className='shrink-0'
        />
      )}
      <div
        style={{ wordBreak: 'break-word' }}
        className={`flex flex-col gap-[6px] mb-2  ${
          isUserMessage ? 'self-end items-end' : 'self-start items-start'
        }`}
      >
        {/* multi message */}
        {question.data && (
          <>
            {question.data
              .slice(0, visibleDataLength)
              .map((subQuestion, index) => {
                return (
                  <div
                    key={index}
                    className={`rounded-[12px] border border-LIGHT_BLUE_3EB6FF py-[12px] px-2 bg-white cursor-pointer`}
                    onClick={() => showH5PQuestion(subQuestion)}
                  >
                    <div className='flex gap-[12px] items-start'>
                      <p
                        className={`text-[18px] text-GREY_797979 leading-[23.4px] -tracking-[0.16px]`}
                      >
                        <TypingWithCustomRef
                          duration={100}
                          animation={!isUserMessage}
                          text={subQuestion.message}
                        />
                      </p>
                    </div>
                  </div>
                );
              })}

            {question.data.length > visibleDataLength && (
              <p
                onClick={handleLoadMore}
                className='text-LIGHT_BLUE_3EB6FF cursor-pointer'
              >
                Load more options
              </p>
            )}
          </>
        )}
        {/* single message */}
        {!isMultiAns && !question.H5PID && question.message && (
          <div
            className={`rounded-[12px] ${
              isUserMessage
                ? 'py-[16px] px-4 bg-LIGHT_BLUE_D4EDF7'
                : 'border border-GREY_A1A6A3 py-[12px] px-2 bg-white'
            }`}
          >
            <div className='flex gap-[12px] items-start'>
              <p
                className={`text-[18px] ${
                  isUserMessage
                    ? 'text-black leading-[23.9px] -tracking-[0.16px]'
                    : 'text-GREY_797979 leading-[23.4px] -tracking-[0.16px]'
                }`}
              >
                <TypingWithCustomRef
                  duration={100}
                  animation={!isUserMessage}
                  text={question.message}
                />
              </p>
            </div>

            {question.link && (
              <Link
                target='_blank'
                to={NavigationButtonObject[question.link]?.navigateTo}
              >
                <OutLineBtn customClassName='mt-5' color='blue'>
                  {NavigationButtonObject[question.link]?.text}
                </OutLineBtn>
              </Link>
            )}
          </div>
        )}

        {/* single H5PID iframe message */}
        {question.H5PID != undefined && (
          <div className=''>
            <p
              className={`text-[18px] font-bold mb-2 ${
                isUserMessage
                  ? 'text-black leading-[23.9px] -tracking-[0.16px]'
                  : 'text-GREY_797979 leading-[23.4px] -tracking-[0.16px]'
              }`}
            >
              <TypingWithCustomRef
                duration={100}
                animation={!isUserMessage}
                text={question.message}
              />
            </p>
            <div
              className={`rounded-[12px] md:w-[500px] mb-3 md:h-[370px] ${
                isUserMessage
                  ? 'py-[16px] px-4 bg-LIGHT_BLUE_D4EDF7'
                  : 'border border-GREY_A1A6A3 py-[12px] px-2 bg-white'
              }`}
            >
              <iframe
                width={'100%'}
                height={'85%'}
                src={`https://ntep.in/h5p/${question.H5PID}/embed`}
              ></iframe>
              <div className='flex justify-end mt-2 me-2'>
                <Link
                  target='_blank'
                  to={`https://ntep.in/h5p/${question.H5PID}/embed`}
                >
                  <img src={ExpandSvg} alt='ExpandSvg' />
                </Link>
              </div>

              {/* sub node */}
              {question.subNode && subNodeSate.isFetch == false && (
                <p
                  onClick={fetchSubNote}
                  className='text-LIGHT_BLUE_3EB6FF text-center cursor-pointer'
                >
                  {subNodeSate.isLoading ? 'Loading...' : 'Load Option'}
                </p>
              )}
            </div>

            {/* subnode fetch */}
            {subNodeSate.data.map((subQuestion, index) => {
              return (
                <div
                  key={index}
                  className={`rounded-[12px] border mb-3 border-GREY_A1A6A3 py-[12px] px-2 bg-white cursor-pointer`}
                  onClick={() => showH5PQuestion(subQuestion)}
                >
                  <div className='flex gap-[12px] items-start'>
                    <p
                      className={`text-[18px] text-GREY_797979 leading-[23.4px] -tracking-[0.16px]`}
                    >
                      <TypingWithCustomRef
                        duration={100}
                        animation={!isUserMessage}
                        text={subQuestion.message}
                      />
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* time */}
        <span className={`text-[14px] leading-[16.8px] text-GREY_797979`}>
          {moment(question.questionTime).fromNow()}
        </span>
      </div>
    </div>
  );
};

interface ChatMessageQueryProps {
  sender: string;
  timestamp: string;
  children: ReactNode;
}

export const ChatMessageQuery: React.FC<ChatMessageQueryProps> = ({
  sender,
  timestamp,
  children,
}) => {
  const isUserMessage = sender === 'You';

  return (
    <div
      className={`flex flex-col gap-[6px] ${
        isUserMessage ? 'items-end' : 'items-start'
      }`}
    >
      <div className='flex gap-[10px]'>
        {isUserMessage == false ? (
          <img
            src={DoctorProfile}
            className='h-[36px] mt-auto w-[36px] rounded-[100px] object-cover'
            alt='user profile'
          />
        ) : null}
        <div
          className={`${
            isUserMessage ? 'bg-[#EBFAFF]' : 'bg-[#F2F2F2]'
          } max-w-[758px] px-[19px] py-[16px] rounded-[12px] font-normal leading-[25px] text-[18px]`}
        >
          {children}
        </div>
      </div>
      <div className='text-[#797979] ms-[46px] text-[14px] leading-[16.8px]'>
        {timestamp}
      </div>
    </div>
  );
};

export default function TypingWithCustomRef({
  text = '',
  animation = true,
  duration = 2000,
}: {
  text: string;
  duration?: number;
  animation?: boolean;
}) {
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let index = 0;
    const typingSpeed = duration / text.length;

    const type = () => {
      if (index < text.length) {
        if (textRef.current) {
          textRef.current.textContent += text[index];
          index += 1;
          setTimeout(type, typingSpeed);
        }
      }
    };

    if (animation) {
      if (textRef.current) {
        textRef.current.innerHTML = '';
      }
      type();
    }
  }, [text]);

  return (
    <div>
      <span ref={textRef} style={{ color: 'black' }}>
        {!animation && text}
      </span>
    </div>
  );
}
