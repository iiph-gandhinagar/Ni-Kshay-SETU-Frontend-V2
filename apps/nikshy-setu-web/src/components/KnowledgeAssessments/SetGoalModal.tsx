import { CloseSvg } from '@nikshay-setu-v3-monorepo/assets';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useLanguageObject } from '../../utils/HelperHooks';
import { KnowledgeQuizButton } from '../Buttons/Btns';
import { CustomModal } from '../Layouts/CustomModal';

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoalModal = ({ onClose, isOpen }: GoalModalProps) => {
  const [count, setCount] = useState(5);
  const [langKey, getText] = useLanguageObject();
  const cookies = new Cookies();

  const maxCount = 7;

  const increment = () => {
    if (count < maxCount) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const dispatch = useDispatch();
  const onSetGoals = async (value: number) => {
    try {
      dispatch(
        createAction(
          {
            method: 'POST',
            url: 'STORE_WEEKLY_GOAL',
            data: { goal: value },
          },
          (code, res) => {
            if (code === 200) {
              // store next 1 year
              const expires = new Date();
              expires.setFullYear(expires.getFullYear() + 1);
              cookies.set('goal', value, { expires });
              onClose();
              alert(getText('APP_MESSAGE_GOAL_EDITED'));
              window.location.reload();
            }
          }
        )
      );
    } catch (error) {
      console.error('Error setting goal:', error);
    }
  };

  useEffect(() => {
    const fetchGoal = async () => {
      const storedGoal = cookies.get('goal');
      if (storedGoal) {
        setCount(Number(storedGoal));
      }
    };

    fetchGoal();
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
        <div className='flex justify-between items-center mb-[24px]'>
          <h2 className='text-[20px] md:text-[24px] leading-[31px] font-bold'>
            {getText('K_QUIZ_SET_WEEKLY_TARGETS')}
          </h2>
          <button onClick={onClose}>
            <img src={CloseSvg} className='h-[20px]' />
          </button>
        </div>

        {/* Counter Section */}
        <div className=''>
          <div className='flex items-center justify-between px-[12px] py-[20px] rounded-[12px] border border-[#D9DBDB] mb-1'>
            <span className='text-[#797979] font-medium text-lg'>
              {getText('K_QUIZ_ASSESSMENT')}
            </span>
            <div className='flex items-center gap-[12px]'>
              <button onClick={decrement}>
                <svg
                  width='18'
                  height='4'
                  viewBox='0 0 18 4'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M17.1668 3.16341H10.1668H7.8335H0.833496V0.830078H7.8335H10.1668H17.1668V3.16341Z'
                    fill='#4B5F83'
                  />
                </svg>
              </button>
              <span className='text-[#4B5F83] font-semibold text-lg'>
                {count}
              </span>
              <button onClick={increment}>
                <svg
                  width='18'
                  height='18'
                  viewBox='0 0 18 18'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M17.1668 10.1634H10.1668V17.1634H7.8335V10.1634H0.833496V7.83008H7.8335V0.830078H10.1668V7.83008H17.1668V10.1634Z'
                    fill='#4B5F83'
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Max Assessment Warning */}
          <div className='flex items-center gap-1 justify-end text-[16px] font-medium leading-[24px] text-[#707070]'>
            <svg
              width='16'
              height='15'
              viewBox='0 0 16 15'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M8.64945 1.24997L15.7939 13.625C15.8598 13.739 15.8944 13.8683 15.8944 14C15.8944 14.1316 15.8598 14.2609 15.794 14.375C15.7281 14.489 15.6335 14.5837 15.5194 14.6495C15.4054 14.7153 15.2761 14.75 15.1444 14.75H0.85545C0.723799 14.75 0.594468 14.7153 0.480456 14.6495C0.366445 14.5837 0.271769 14.489 0.205945 14.375C0.140121 14.2609 0.105468 14.1316 0.105469 14C0.10547 13.8683 0.140124 13.739 0.20595 13.625L7.35045 1.24997C7.41628 1.13596 7.51096 1.04129 7.62497 0.975471C7.73898 0.909651 7.8683 0.875 7.99995 0.875C8.1316 0.875 8.26092 0.909651 8.37493 0.975471C8.48894 1.04129 8.58362 1.13596 8.64945 1.24997ZM2.15445 13.25H13.8454L7.99995 3.12497L2.15445 13.25ZM7.24995 11H8.74995V12.5H7.24995V11ZM7.24995 5.74997H8.74995V9.49997H7.24995V5.74997Z'
                fill='#707070'
              />
            </svg>
            <span>
              {getText('K_QUIZ_MAX_ASSESSMENT')} - {maxCount}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className='mt-7'>
          <KnowledgeQuizButton onClick={() => onSetGoals(count)}>
            {getText('KNOWLEDGE_QUIZ_SET_GOAL')}{' '}
          </KnowledgeQuizButton>
          {/* <OutLineBtn
            color='gary'
            onClick={onClose}
            customClassName='w-full mt-2'
          >
            {getText('APP_CANCEL')}
          </OutLineBtn> */}
        </div>
      </div>
    </CustomModal>
  );
};
