import {
  GradientGraySolidRightArrowSvg,
  KnowledgeQuizSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '../../components/KnowledgeAssessments/CircularProgress';
import { GoalModal } from '../../components/KnowledgeAssessments/SetGoalModal';
import { QueryTabNavigation } from '../../components/KnowledgeAssessments/Tabs';
import { useLanguageObject, useURLHook } from '../../utils/HelperHooks';

const KnowledgeQuiz = () => {
  const { getSearchParams } = useURLHook();
  const [setGoalIsTrue] = getSearchParams(['set-goal']);
  const cookies = new Cookies();
  const [isModalVisible, setIsModalVisible] = useState(
    setGoalIsTrue == 'true' && !cookies.get('goal') ? true : false
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [performance, setPerformance] = useState({
    accuracy: '0',
    completedAssessment: 0,
    countAccuracy: '0',
    totalAssessmentCount: 0,
  });

  const [langKey, getText] = useLanguageObject();

  const tabs = [
    { label: getText('K_QUIZ_PERFORMANCE'), isActive: true },
    {
      label: getText('K_QUIZ_EDIT_GOAL'),
      isActive: false,
      onclick: () => setIsModalVisible(true),
    },
  ];
  useEffect(() => {
    dispatch(
      createAction(
        {
          method: 'GET',
          url: 'PRO_ASSESSMENT_PERFORMANCE',
        },
        (statusCode, apiRes: any) => {
          if (statusCode === 200) setPerformance(apiRes);
        }
      )
    );
  }, []);

  return (
    <section className='pt-[48px] pb-[58px] h-full'>
      <div className='lg:max-w-[1012px] mx-auto'>
        <div className='bg-gradient-to-b from-[#4B5F83] from-30% to-[#B1BED4] to-100% pb-[32px] rounded-[28px] flex flex-col gap-[28px]'>
          {/* Header */}
          <div className='p-[24px] border-b border-white'>
            <div className='flex gap-[12px]'>
              <div className=''>
                <img
                  src={KnowledgeQuizSvg}
                  className='h-[60px] w-[60px]'
                  alt=''
                />
              </div>
              <div className='flex justify-between items-center grow'>
                <h1 className='text-xl lg:text-[38px] leading-7 lg:leading-[35px] text-white font-semibold'>
                  {getText('APP_KNOWLEDGE_QUIZ')}
                </h1>
                {/* <img src={InfoOutlineSvg} alt='' /> */}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className='flex justify-between items-center p-[24px]'>
            {tabs.map(({ label, isActive, onclick }) => (
              <QueryTabNavigation
                key={label}
                {...{ label, isActive, onclick }}
              ></QueryTabNavigation>
            ))}
          </div>

          {/* Circular Progress */}
          <div className='px-[24px]'>
            <div className='bg-white rounded-[20px]'>
              <div className='w-full pb-[20px]'></div>
              <div className='py-[12px] px-[25px] flex justify-between flex-wrap gap-2'></div>

              <div className='flex items-center justify-center'>
                <CircularProgress
                  innerGradientColors={['#53B5D9', '#53B5D9']}
                  innerProgress={
                    performance?.accuracy
                      ? parseFloat(
                          parseFloat(performance.accuracy).toFixed(1)
                        ) / 100
                      : 0
                  }
                  outerProgress={
                    performance?.countAccuracy
                      ? parseFloat(
                          parseFloat(performance.countAccuracy).toFixed(1)
                        ) / 100
                      : 0
                  }
                  size={window.innerWidth > 425 ? 300 : 200}
                >
                  <div className='flex flex-col w-[185px] items-center justify-center overflow-hidden'>
                    {/* Percentage */}
                    <span className='sm:text-[35px] font-bold text-[#53B5D9]'>
                      {parseFloat(performance?.accuracy).toFixed(1)}%
                    </span>

                    {/* Ratio and Assessment */}
                    <div className='flex flex-row items-center flex-wrap text-center justify-center text-[#0D3A97]'>
                      {/* Ratio */}
                      <span className='sm:text-[30px] font-bold whitespace-nowrap truncate'>
                        {performance?.completedAssessment}/
                        {performance?.totalAssessmentCount}
                      </span>

                      {/* "Assessment" */}
                      <span className='text-[16px] truncate w-full sm:w-auto sm:ml-1'>
                        {getText('K_QUIZ_ASSESSMENT')}
                      </span>
                    </div>
                  </div>
                </CircularProgress>
              </div>

              <div className='py-[12px] px-[25px] flex justify-between flex-wrap gap-2'>
                <div className='flex gap-[10px] items-center'>
                  <div className='w-[32px] h-[16px] bg-[#0C3896] rounded-[20px]'></div>
                  <span className='text-[18px] leading-[23px] font-medium'>
                    {performance?.completedAssessment}/
                    {performance?.totalAssessmentCount}{' '}
                    {getText('K_QUIZ_COMPLETION')}
                  </span>
                </div>

                <div className='flex gap-[10px] items-center'>
                  <div className='w-[32px] h-[16px] bg-[#53B5D9] rounded-[20px]'></div>
                  <span className='text-[18px] leading-[23px] font-medium'>
                    {parseFloat(performance?.accuracy).toFixed(1)}%{' '}
                    {getText('K_QUIZ_ACCURACY')}
                  </span>
                </div>
              </div>
            </div>

            <div className='px-[24px] py-[12px] bg-white rounded-[20px] mt-[28px]'>
              {/* <p className='text-xl font-semibold mb-[10px]'>Trending Quiz</p>  */}
              <div
                onClick={() => navigate('/quiz')}
                className='flex justify-between items-center text-[18px] cursor-pointer leading-[25px]'
              >
                {getText('K_QUIZ_LIST_OF_ASSESSMENT')}
                <img src={GradientGraySolidRightArrowSvg} alt='' />
              </div>
            </div>
          </div>
        </div>
      </div>

      <GoalModal
        isOpen={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      ></GoalModal>
    </section>
  );
};

export default KnowledgeQuiz;
