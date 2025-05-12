import { CloseSvg } from '@nikshay-setu-v3-monorepo/assets';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguageObject } from '../../utils/HelperHooks';
import { KnowledgeQuizButton } from '../Buttons/Btns';
import { CustomModal } from '../Layouts/CustomModal';

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SetGoalAskModal = ({ onClose, isOpen }: GoalModalProps) => {
  const [langKey, getText, objectToValue] = useLanguageObject();
  const navigate = useNavigate();
  useEffect(() => {
    const setGoalButtonElement: HTMLButtonElement | undefined =
      document.querySelector('.set--goal');
    if (setGoalButtonElement && setGoalButtonElement.focus) {
      setGoalButtonElement.focus();
    }
  }, []);
  return (
    <CustomModal
      isOpen={isOpen}
      customClass={{
        modalContainer: '!max-w-[578px] mx-auto',
        modal: '!p-[28px]',
      }}
      closeModal={onClose}
    >
      <div className=''>
        {/* Header */}
        <div className='flex justify-end items-center'>
          <button onClick={onClose}>
            <img src={CloseSvg} className='h-[20px]' />
          </button>
        </div>

        {/* Counter Section */}
        <div className=''>
          <pre className='text-wrap font-family-maison'>
            {getText('APP_SET_GOAL_TEXT')}
          </pre>
        </div>

        {/* Buttons */}
        <div className='mt-7'>
          <KnowledgeQuizButton
            onClick={() => {
              navigate('/knowledge-quiz?set-goal=true');
              onClose();
            }}
            className='set--goal'
          >
            {getText('K_QUIZ_SET_GOAL')}
          </KnowledgeQuizButton>
        </div>
      </div>
    </CustomModal>
  );
};
