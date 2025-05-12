import { CloseSvg } from '@nikshay-setu-v3-monorepo/assets';
import { useLanguageObject } from '../../utils/HelperHooks';
import { KnowledgeQuizButton, OutLineBtn } from '../Buttons/Btns';
import { CustomModal } from '../Layouts/CustomModal';

interface GoalModalProps {
  onClose: () => void;
  onSubmit: () => void;
  revisitSkippedHandler: () => void;
  questionsState: any;
}

export const ConfirmModal = ({
  onClose,
  onSubmit,
  revisitSkippedHandler,
  questionsState,
}: GoalModalProps) => {
  const TotalAttemptedQuestion = questionsState.filter(
    (question) => question.isSubmitted
  );
  const [langKey, getText] = useLanguageObject();

  return (
    <CustomModal
      closeModal={onClose}
      isOpen={true}
      customClass={{
        modalContainer: '!max-w-[581px] mx-auto',
        modal: '!p-[24px]',
      }}
    >
      <div className=''>
        {/* Header */}
        <div className='flex justify-between items-center mb-[24px]'>
          <h2 className='text-[20px] md:text-[24px] leading-[31px] font-semibold'>
            {getText('APP_CONFIRM_SUBMIT')}
          </h2>
          <button onClick={onClose}>
            <img src={CloseSvg} className='h-[20px]' />
          </button>
        </div>

        <div className='border border-[#D9DBDB] p-[8px] flex flex-col gap-[]8px rounded-[12px]'>
          <div className='flex justify-between items-center'>
            <span className='text-[#797979] font-medium'>
              {getText('K_QUIZ_ATTEMPTED')}
            </span>{' '}
            <span className='text-[#4B5F83] font-semibold'>
              {TotalAttemptedQuestion.length} {getText('APP_QUESTIONS')}
            </span>
          </div>
          <div className='flex justify-between items-center'>
            <span className='text-[#797979] font-medium'>
              {getText('APP_SKIPPED')}
            </span>{' '}
            <span className='text-[#4B5F83] font-semibold'>
              {questionsState.length - TotalAttemptedQuestion.length}{' '}
              {getText('APP_QUESTIONS')}
            </span>
          </div>
          <div className='flex justify-between items-center'>
            <span className='text-[#797979] font-medium'>
              {getText('APP_OUT_OF_TOTAL')}
            </span>{' '}
            <span className='text-[#4B5F83] font-semibold'>
              {questionsState.length} {getText('APP_QUESTIONS')}
            </span>
          </div>
        </div>

        {/* footer */}
        <div className='mt-[24px] flex flex-col gap-[8px]'>
          <KnowledgeQuizButton
            onClick={onSubmit}
            className='min-w-[135px] rounded-[32px]'
          >
            {getText('APP_SUBMIT')}
          </KnowledgeQuizButton>
          {questionsState.filter((question) => question.isSubmitted == false)
            .length > 0 && (
            <OutLineBtn
              onClick={revisitSkippedHandler}
              color='gary'
              customClassName='w-full'
            >
              {getText('K_QUIZ_REVISIT_SKIPPED')}
            </OutLineBtn>
          )}
        </div>
      </div>
    </CustomModal>
  );
};
