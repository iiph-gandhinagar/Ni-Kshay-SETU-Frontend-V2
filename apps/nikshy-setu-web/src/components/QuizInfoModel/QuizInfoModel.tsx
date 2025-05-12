import React from 'react';
import { useLanguageObject } from '../../utils/HelperHooks';
import IconCross from '../Icon/IconCross';

interface QuizInfoModelProps {
  closeModal: () => void;
  isOpen: boolean;
}

const QuizInfoModel: React.FC<QuizInfoModelProps> = ({
  closeModal,
  isOpen,
}) => {
  const [langKey, getText] = useLanguageObject();

  return (
    <div
      className={`fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto ${
        isOpen ? 'block' : 'hidden'
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeModal(); // Close the modal when clicking on the backdrop
        }
      }}
    >
      <div className='flex items-start justify-center min-h-screen px-4'>
        <div className='panel bg-black border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8'>
          {/* Modal Header */}
          <div className='flex items-center justify-between text-white px-5 py-3'>
            <h5 className='font-bold text-lg'>
              {getText('K_QUIZ_PLUGIN_INFORMATION')}
            </h5>
            <button
              onClick={closeModal}
              type='button'
              className='text-white hover:text-dark'
            >
              <IconCross />
            </button>
          </div>
          {/* Modal Body */}
          <div className='p-5'>
            <div className=' font-medium text-white'>
              <ul className='flex flex-col gap-2 list-disc list-inside'>
                <li>{getText('K_QUIZ_NTEP_KNOWLEDGE_ASSESSMENTS')}</li>
                <li>{getText('K_QUIZ_TRENDING_SUGGESTED_ASSESSMENTS')}</li>
                <li>{getText('K_QUIZ_EXCLUSIVE_CREATED_BY_OFFICIALS')}</li>
                <li>{getText('K_QUIZ_STAY_UPDATED_APPLY_KNOWLEDGE')}</li>
              </ul>
            </div>
            <div className='flex justify-end items-center mt-8'>
              <button
                type='button'
                onClick={closeModal}
                className='btn p-2 text-white bg-gray-500 rounded-lg'
              >
                {getText('APP_CLOSE')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizInfoModel;
