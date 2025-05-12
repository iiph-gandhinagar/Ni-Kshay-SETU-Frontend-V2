import {
  GradientGrayRightArrowSvg,
  InfoOutlineSvg,
  KnowledgeQuizSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OutLineBtn } from '../../components/Buttons/Btns';
import QuizInfoModel from '../../components/QuizInfoModel/QuizInfoModel';
import { useLanguageObject } from '../../utils/HelperHooks';

const KnowledgeAssessments = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [langKey, getText] = useLanguageObject();

  const questions = [
    {
      key: getText('K_QUIZ_ANSWER_QUESTIONS') + ' : ',
      value: getText('K_QUIZ_TEST_TB_KNOWLEDGE'),
    },
    {
      key: getText('K_QUIZ_PERSONALIZE_LEARNING') + ' : ',
      value: getText('K_QUIZ_IDENTIFY_STRENGTHS_IMPROVEMENT'),
    },
    {
      key: getText('K_QUIZ_SET_WEEKLY_TARGETS') + ' : ',
      value: getText('K_QUIZ_COMPLETE_ASSESSMENTS_LEADERBOARD'),
    },
  ];

  return (
    <section className='pt-[48px] pb-[58px] h-full'>
      <div className='lg:max-w-[1012px] mx-auto'>
        {/* Main Card */}
        <div className='bg-gradient-to-b from-[#4B5F83] from-0% to-[#B1BED4] to-50% rounded-[28px] pb-[18px] text-center'>
          <div className='p-[24px] flex flex-col text-center gap-[12px]'>
            {/* info icon */}
            <div
              onClick={(e) => {
                setIsModalVisible(true);
              }}
              className='flex justify-end'
            >
              <img src={InfoOutlineSvg} alt='Info' />
            </div>

            <div className='flex justify-center'>
              <img
                src={KnowledgeQuizSvg}
                className='w-[60px] h-[60px] rounded-full  text-center'
                alt='knowledge Quiz'
              />
            </div>

            <h2 className='text-xl lg:text-[28px] lg:leading-[39px] font-medium mb-4 text-white'>
              {getText('K_QUIZ_BOOST_YOUR_KNOWLEDGE')}
            </h2>
            <p className='text-white lg:text-[20px] lg:leading-[28px]'>
              {getText('K_QUIZ_ENHANCE_UNDERSTANDING_TB')}
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className='mt-[58px]'>
          <h3 className='text-xl lg:text-[28px] lg:leading-[37px] font-medium text-[#4D4D4D] mb-[24px]'>
            {getText('K_QUIZ_HOW_IT_WORKS')} :
          </h3>

          <div className='mb-[58px] bg-[#F3F5F6] flex flex-col gap-[12px] p-[12px]  rounded-[12px]'>
            {questions.map(({ key, value }, index) => {
              return (
                <div
                  className='bg-white py-[18px] leading-[21px] px-[12px] rounded-[12px]'
                  key={index}
                >
                  <div className='text-[#4B5F83] text-[18px] font-semibold'>
                    {index}. {key}
                    <span className='font-normal'> {value}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Start Button */}
        <div className='text-center'>
          <p className='text-[#616161] text-[18px] font-normal mb-[12px]'>
            {getText('K_QUIZ_READY_TO_START')}
          </p>
          <OutLineBtn
            onClick={() => navigate('/knowledge-quiz')}
            customClassName='w-full !border-[#4B5F83] !text-gray-600 gap-[12px] bg-gradient-to-r from-[#4B5F83] to-[#B1BED4] !text-transparent bg-clip-text'
          >
            {getText('K_QUIZ_CLICK_BELOW_TO_BEGIN')}{' '}
            <img src={GradientGrayRightArrowSvg} className='h-5' />
          </OutLineBtn>
        </div>
      </div>
      <QuizInfoModel
        isOpen={isModalVisible}
        closeModal={() => {
          setIsModalVisible(false);
        }}
      />
    </section>
  );
};

export default KnowledgeAssessments;
