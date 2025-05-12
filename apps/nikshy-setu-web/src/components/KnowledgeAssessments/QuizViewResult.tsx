import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { AssessmentResultApiResponse } from '@nikshay-setu-v3-monorepo/types';
import { formatDate } from '@nikshay-setu-v3-monorepo/utils';
import { useEffect, useMemo, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useLanguageObject } from '../../utils/HelperHooks';
import { KnowledgeQuizButton } from '../Buttons/Btns';
import { CompletionCertificateCard } from './CompletionCertificateCard';

// Define types for better type safety
interface ResultItem {
  title: string;
  value: string | number;
}

const DEFAULT_RESULTS = {
  _id: '--',
  assessmentId: {
    title: {
      en: '---',
    },
  },
  totalMarks: 0,
  totalTime: 0,
  obtainedMarks: 0,
  attempted: 0,
  rightAnswer: 0,
  wrongAnswer: 0,
  skip: 0,
  isCalculated: true,
  createdAt: undefined,
  updatedAt: undefined,
};

// Separate component for result items
const ResultItem = ({ title, value }: ResultItem) => (
  <div className='mb-[15px]'>
    <p className='text-[#797979] text-[18px] leading-[21px] font-medium mb-[4px]'>
      {title}
    </p>
    <p className='text-[#4B5F83] text-[18px] font-semibold'>{value}</p>
  </div>
);

// Separate component for statistics
const StatisticItem = ({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) => (
  <div className='flex justify-between items-center'>
    <p className='text-[#797979] text-[18px] leading-[21px] font-medium'>
      {label}
    </p>
    <p className='text-[18px] text-[#4B5F83] font-semibold'>{value}</p>
  </div>
);

export const QuizViewResult = () => {
  const dispatch = useDispatch();
  const pageUrl = new URL(window.location.href);
  const assessmentId = pageUrl.searchParams.get('assessmentId');
  const isProAssessment =
    pageUrl.searchParams.get('isProAssessment') !== 'false';
  const [langKey, getText] = useLanguageObject();
  // force render
  const [render, serRender] = useState<any>();

  // Use custom hook for results state management
  const [results, setResults] = useState(DEFAULT_RESULTS);

  // Memoize result items
  const resultItems = useMemo(() => {
    const items: ResultItem[] = [
      {
        title: getText('K_QUIZ_ASSESSMENT_NAME') + ' : ',
        value:
          results?.assessmentId?.title?.[langKey] ??
          results?.assessmentId?.title?.en ??
          '-',
      },
      {
        title: getText('K_QUIZ_NUMBER_OF_QUESTIONS') + ' : ',
        value: results?.skip + results?.attempted || '0',
      },
    ];

    if (results?.updatedAt) {
      items.push({
        title: getText('K_QUIZ_COMPLETED_ON') + ' : ',
        value: formatDate(results?.updatedAt),
      });
    }

    return items;
  }, [results]);

  useEffect(() => {
    const fetchResults = async () => {
      const cookies = new Cookies();
      const query = isProAssessment
        ? `?assessmentId=${assessmentId}`
        : `?userId=${cookies.get('userId')}&userAssessmentId=${assessmentId}`;

      dispatch(
        createAction<null, AssessmentResultApiResponse>(
          {
            method: 'GET',
            url: isProAssessment
              ? 'PRO_ASSESSMENT_RESULT'
              : 'SUBSCRIBER_ASSESSMENT_RESULT',
            query,
          },
          (statusCode, apiRes) => {
            if (statusCode === 200) {
              const setResultObj = isProAssessment
                ? {
                    ...DEFAULT_RESULTS,
                    assessmentId: {
                      title: {
                        en: apiRes?.[0]?.title,
                      },
                    },
                    totalMarks: apiRes?.[0]?.questions?.length,
                    obtainedMarks: apiRes?.[0]?.correct,
                    attempted:
                      apiRes?.[0]?.questions?.length - apiRes?.[0]?.skipped,
                    rightAnswer: apiRes?.[0]?.correct,
                    wrongAnswer: apiRes?.[0]?.incorrect,
                    skip: apiRes?.[0]?.skipped,
                  }
                : apiRes;
              console.log({ query, apiRes });
              setResults(setResultObj);
            }
          }
        )
      );
    };

    fetchResults();
    if (!render) {
      setTimeout(() => {
        serRender(Date.now());
      }, 700);
    }
  }, [dispatch, isProAssessment, assessmentId, render]);

  return (
    <section className='pt-[48px] pb-[58px] h-full'>
      <div className='lg:max-w-[1012px] mx-auto border-gray-100 border-[20px] rounded-xl'>
        <div className='bg-white rounded-[20px] p-[20px]'>
          <div className='mb-[58px] border border-[#D9DBDB] p-[8px] flex flex-col gap-[20px] rounded-[12px]'>
            {resultItems.map((item, index) => (
              <ResultItem key={`${index}-result`} {...item} />
            ))}
          </div>

          <div className='border-[#4B5F83] border rounded-[12px]'>
            <div className='py-[8px] px-[12px] border-b border-[#4B5F83]'>
              <h3 className='text-[#4B5F83] text-[22px] leading-[29px] font-semibold'>
                {getText('APP_RESULT')}
              </h3>
            </div>
            <div className='p-[12px]'>
              <div className='border border-[#D9DBDB] rounded-[12px] p-2 mb-[24px] flex flex-col gap-[8px]'>
                <StatisticItem
                  label={getText('K_QUIZ_ATTEMPTED')}
                  value={results?.attempted || '0'}
                />
                <StatisticItem
                  label={getText('APP_SKIPPED')}
                  value={results?.skip || '0'}
                />
                <StatisticItem
                  label={getText('APP_CORRECT_ANSWERS')}
                  value={results?.rightAnswer || '0'}
                />
                <StatisticItem
                  label={getText('APP_WRONG_ANSWERS')}
                  value={results?.wrongAnswer || '0'}
                />
              </div>

              <KnowledgeQuizButton className='rounded-[32px] !cursor-default lg:text-[24px] text-[#FFCD1D]'>
                {getText('APP_SCORE')} - {results?.rightAnswer} /{' '}
                {results?.totalMarks}
              </KnowledgeQuizButton>
            </div>
          </div>

          {!isProAssessment && results._id && (
            <CompletionCertificateCard
              id={results._id}
              title={
                results?.assessmentId?.title?.[langKey] ??
                results?.assessmentId?.title?.en ??
                ''
              }
            />
          )}
        </div>
      </div>
    </section>
  );
};
