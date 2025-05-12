import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { KnowledgeAssessmentQuizCard } from '../../components/Cards/KnowledgeAssessmentQuizCard';
import { RulesOfAssessments } from '../../components/KnowledgeAssessments/RulesOfAssessments';
import { QueryTabNavigation } from '../../components/KnowledgeAssessments/Tabs';
import { useLanguageObject } from '../../utils/HelperHooks';

interface Question {
  nid: string;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  Option1?: string;
  Option2?: string;
  Option3?: string;
  Option4?: string;
  correct_choice: number;
  correctAnswer?: string;
  correctly_answered: string;
}

interface Assessment {
  assessmentDetails?: {
    [key: string]: string;
  };
  _id?: string;
  assessment_id: string;
  title:
    | string
    | {
        [key: string]: string;
      };
  questions: Question[];
  pending: string;
  createdAt: string;
  updatedAt: string;
  assessmentType: string;
  fromDate: string;
  timeToComplete?: number | null;
  language?: string;
  completedTitle?: any;
  completedId?: any;
  isCompletedProAssessment?: boolean;
}

interface ApiResponseItem {
  assessmentDetails?: {
    title?: { [key: string]: string };
  };
  userAssessmentId: string;
  _id?: string;
  assessment_id: string;
  title:
    | string
    | {
        [key: string]: string;
      };
  questions: Question[];
  pending: string;
  createdAt: string;
  updatedAt: string;
  assessmentType: string;
  fromDate: string;
  timeToComplete?: number | null;
  language?: string;
  completedTitle: any;
  completedId: any;
  isCompletedProAssessment: boolean;
}

const KnowledgeAssessmentQuiz = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state ?? 'Pending');
  const [startQuiz, setStartQuiz] = useState(false);
  const dispatch = useDispatch();
  const [assessmentData, setAssessmentData] = useState<Assessment[]>([]);
  const [id, setId] = useState<string>();
  const [Question, setQuestion] = useState<Question[]>([]);
  const [assessmentType, setAssessmentType] = useState<string>();
  const [duration, setDuration] = useState<number | null>();

  const [langKey, getText] = useLanguageObject();

  const isTitleObject = (
    title: string | { [key: string]: string }
  ): title is { [key: string]: string } => {
    return typeof title === 'object';
  };

  useEffect(() => {
    const handleResponse = (v: number, res: any) => {
      if (v === 200 && Array.isArray(res)) {
        const transformedData: Assessment[] = res.map(
          (item: ApiResponseItem) => ({
            assessment_id: item.assessment_id ?? item?._id,
            title: item.title,
            questions: item.questions,
            pending: item.pending,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            assessmentType: item?.assessmentType,
            fromDate: item?.fromDate,
            timeToComplete: item?.timeToComplete || null,
            completedTitle: item?.assessmentDetails?.title?.en || item?.title,
            completedId: item?.assessment_id ?? item?.userAssessmentId,
            isCompletedProAssessment: item?.assessment_id ? true : false,
          })
        );
        setAssessmentData(transformedData);
      }
    };

    if (activeTab === 'Pending') {
      dispatch(
        createAction(
          {
            method: 'GET',
            url: 'GET_ALL_ASSESSMENT',
          },
          handleResponse
        )
      );
    } else if (activeTab === 'Completed') {
      dispatch(
        createAction(
          {
            method: 'GET',
            url: 'GET_PAST_ASSESSMENT',
          },
          handleResponse
        )
      );
    }
  }, [dispatch, activeTab]);

  const tabs = [
    { label: getText('APP_PENDING'), key: 'Pending' },
    { label: getText('APP_COMPLETED'), key: 'Completed' },
  ];

  console.log({ assessmentData });
  return (
    <section className='pt-[48px] pb-[58px] h-full'>
      <div className='lg:max-w-[1012px] mx-auto'>
        <div className='flex flex-col gap-[24px]'>
          <div className='p-[24px] flex gap-[40px] items-center'>
            {tabs.map(({ label, key }, index) => {
              const isActive = activeTab == key;

              return (
                <QueryTabNavigation
                  key={index}
                  {...{
                    label,
                    isActive,
                    customClass: `${!isActive ? '!text-[#737376]' : ''}`,
                    onclick: () => {
                      setActiveTab(key);
                      setStartQuiz(false);
                    },
                  }}
                ></QueryTabNavigation>
              );
            })}
          </div>
        </div>

        {startQuiz === false ? (
          <div className='bg-[#F3F5F6] p-[24px] rounded-[20px] flex flex-col gap-[24px]'>
            {assessmentData.map((assessment, index) => (
              <KnowledgeAssessmentQuizCard
                assessmentId={id}
                isProAssessment={assessment?.assessmentType === 'Pro-active'}
                isCompletedProAssessment={assessment?.isCompletedProAssessment}
                key={index}
                {...{
                  type:
                    assessment?.assessmentType === 'Planned'
                      ? getText('K_QUIZ_PLANNED')
                      : assessment?.assessmentType === 'real_time'
                      ? getText('K_QUIZ_PLANNED')
                      : getText('K_QUIZ_PRO_ACTIVE'),
                  fromDate: assessment?.fromDate,
                  title: assessment?.assessment_id
                    ? assessment.title
                    : isTitleObject(assessment?.title)
                    ? assessment.title[assessment?.language || 'en']
                    : assessment.title,
                  questions: assessment?.questions?.length,
                  duration: assessment?.timeToComplete || null,
                  completed: activeTab === 'Completed',
                  completedTitle: assessment?.completedTitle,
                  completedId: assessment?.completedId,
                  GreenBorder:
                    activeTab === 'Completed' ||
                    assessment?.assessmentType === 'real_time'
                      ? true
                      : false,
                  startQuiz: activeTab !== 'Completed',
                  onClick: () => {
                    setDuration(assessment?.timeToComplete);
                    setAssessmentType(assessment?.assessmentType);
                    setQuestion(assessment?.questions);
                    setId(assessment?.assessment_id ?? assessment?._id);
                    setStartQuiz(true);
                  },
                }}
              />
            ))}

            {assessmentData && assessmentData.length == 0 && (
              <div className='p-3 rounded-md bg-white'>
                <p className='text-center'>{getText('APP_NO_DATA_FOUND')}</p>
              </div>
            )}
          </div>
        ) : (
          <RulesOfAssessments
            duration={duration}
            assessmentType={assessmentType}
            questions={Question}
            {...(id !== undefined && { id })}
          ></RulesOfAssessments>
        )}
      </div>
    </section>
  );
};
export default KnowledgeAssessmentQuiz;
