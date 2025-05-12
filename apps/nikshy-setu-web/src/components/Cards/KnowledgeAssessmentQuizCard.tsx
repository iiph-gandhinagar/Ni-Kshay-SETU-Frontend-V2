import {
  ClockSvg,
  QuestionSvg,
  RightArrowSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import { useNavigate } from 'react-router-dom';
import { useLanguageObject } from '../../utils/HelperHooks';
import { KnowledgeQuizButton } from '../Buttons/Btns';

interface KnowledgeAssessmentQuizCardProps {
  GreenBorder?: boolean;
  type: string;
  fromDate: string;
  title: string | { [key: string]: string };
  questions: number;
  duration?: number | null;
  onClick?: () => void;
  startQuiz?: boolean;
  completed?: boolean;
  timeToComplete?: number | null;
  assessmentId?: string;
  isProAssessment?: boolean;
  completedTitle:
    | string
    | {
        [key: string]: string;
      };
  completedId: string;
  isCompletedProAssessment: boolean;
}
const getFormattedDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const amPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${day}-${month}-${year} ${String(hours).padStart(
    2,
    '0'
  )}:${minutes} ${amPm}`;
};

export const KnowledgeAssessmentQuizCard = ({
  assessmentId,
  isProAssessment,
  GreenBorder = false,
  duration,
  title,
  questions,
  type,
  onClick,
  fromDate,
  startQuiz = false,
  completed = false,
  completedId,
  completedTitle,
  isCompletedProAssessment,
}: KnowledgeAssessmentQuizCardProps) => {
  const currentDateTime = new Date();
  const navigate = useNavigate();
  const [langKey, getText] = useLanguageObject();

  const displayTitle = completed
    ? typeof completedTitle === 'object'
      ? completedTitle?.[langKey]
      : completedTitle
    : typeof title === 'object'
    ? title?.[langKey]
    : title;

  return (
    <div
      className={`rounded-[20px] px-[24px] pt-[12px] pb-[6px] bg-white ${
        GreenBorder ? 'border-2 border-[#4FD76D]' : ''
      }`}
    >
      <div className='mb-[24px] flex flex-col gap-[10px]'>
        <span
          className={`flex items-center gap-2 text-[20px] font-semibold leading-[20px] ${
            GreenBorder ? 'text-[#4FD76D]' : 'text-[#707070]'
          }`}
        >
          {completed ? (
            <div className='flex items-center gap-[12px]'>
              {getText('APP_COMPLETED')}
              <svg
                width='20'
                height='14'
                viewBox='0 0 20 14'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M1 7.5L4.87868 11.3787C6.05025 12.5503 7.94975 12.5503 9.12132 11.3787L19 1.5'
                  stroke='#30D03F'
                  strokeWidth='2'
                />
              </svg>
            </div>
          ) : (
            type
          )}
        </span>

        <h2 className='text-lg text-[#4B5F83] text-[20px] font-semibold leading-[20px]'>
          {displayTitle}
        </h2>

        <div className='flex justify-between flex-wrap gap-3'>
          <div className='flex gap-[10px] items-center'>
            <div className='flex items-center bg-[#E9F1FF] p-2 rounded-[12px] gap-[10px]'>
              <img src={QuestionSvg} alt='' />
              <span className='text-[16px] leading-[16px]'>
                {questions} {getText('APP_QUESTIONS')}
              </span>
            </div>

            {duration && (
              <div className='flex items-center bg-[#E9F1FF] p-2 rounded-[12px] gap-[10px]'>
                <img src={ClockSvg} alt='' />
                <span className='text-[16px] leading-[16px]'>
                  {duration} {getText('K_QUIZ_MIN')}
                </span>
              </div>
            )}
          </div>
          {startQuiz && !completed ? (
            (fromDate == null || new Date(fromDate) <= currentDateTime) && (
              <KnowledgeQuizButton
                className='!w-fit ms-auto !px-6'
                onClick={onClick}
              >
                {getText('K_QUIZ_START_NOW')}
                <img src={RightArrowSvg} alt='Right Arrow' />
              </KnowledgeQuizButton>
            )
          ) : (
            <KnowledgeQuizButton
              className='!w-fit ms-auto !px-6'
              onClick={() => {
                navigate(
                  `/quiz-result?assessmentId=${completedId}&isProAssessment=${isCompletedProAssessment}`
                );
              }}
            >
              {getText('APP_VIEW')}
              <img src={RightArrowSvg} alt='Right Arrow' />
            </KnowledgeQuizButton>
          )}
        </div>
      </div>
    </div>
  );
};
