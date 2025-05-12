import { AssessmentRuleSvg } from '@nikshay-setu-v3-monorepo/assets';
import { useNavigate } from 'react-router-dom';
import { useLanguageObject } from '../../utils/HelperHooks';
import { KnowledgeQuizButton, OutLineBtn } from '../Buttons/Btns';

export const RulesOfAssessments: any = (props: any) => {
  const { id, questions, duration, assessmentType } = props;
  const [langKey, getText] = useLanguageObject();

  const navigate = useNavigate();
  return (
    <div className='bg-[#F3F5F6] p-[24px] rounded-[20px]'>
      <div className='bg-white p-[24px] rounded-[20px]'>
        <div className='mb-[48px]'>
          <h2 className='text-2xl !leading-[24px] text-[#4B5F83] flex gap-[10px] items-center font-semibold mb-3'>
            <img src={AssessmentRuleSvg} alt='Assessment Rule' />{' '}
            {getText('K_QUIZ_RULES_OF_ASSESSMENTS')}
          </h2>
          <ul className='list-decimal ps-[24px] text-[#000000] text-[18px] leading-[27px] font-medium'>
            <li>{getText('K_QUIZ_ASSESSMENT_TIMER_START')}</li>
            <li>{getText('K_QUIZ_NO_CHANGE_AFTER_SAVE')}</li>
            <li>{getText('K_QUIZ_SKIP_QUESTIONS')}</li>
            <li>{getText('K_QUIZ_RESULT_GENERATION')}</li>
          </ul>
        </div>
        <div className='flex flex-col gap-[8px]'>
          <KnowledgeQuizButton
            onClick={() =>
              navigate('/quiz-question', {
                state: {
                  id,
                  questions,
                  duration,
                  assessmentType,
                },
              })
            }
          >
            {getText('APP_OK')}
          </KnowledgeQuizButton>
          <OutLineBtn
            color='gary'
            onClick={() => {
              navigate('/quiz');
              window.location.reload();
            }}
            customClassName='w-full'
          >
            {getText('APP_CANCEL')}
          </OutLineBtn>
        </div>
      </div>
    </div>
  );
};
