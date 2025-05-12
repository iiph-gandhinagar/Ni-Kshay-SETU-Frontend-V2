import {
  AttentionHeaderText,
  discordanceMessages,
} from '../../pages/manage-tb-form/questionData';
import { PrimaryBtn } from '../Buttons/Btns';
import { CustomModal } from '../Layouts/CustomModal';
interface ErrorMessageModalProps {
  isOpen: boolean;
  onClick: () => void;
  conditionName: string;
}
export const ErrorMessageModal: React.FC<ErrorMessageModalProps> = ({
  isOpen,
  conditionName,
  onClick,
}) => {
  const isAttention = AttentionHeaderText.includes(conditionName);

  return (
    <CustomModal
      isOpen={isOpen}
      closeModal={() => {}}
      styles={{ modal: { maxWidth: 510, padding: '24px !important' } }}
    >
      <div>
        <div className='flex gap-[12px] items-start'>
          <h5
            className={`md:text-[24px] md:leading-[31.87px] -tracking-[0.16px] font-semibold ${
              isAttention ? 'text-[#FFA500]' : 'text-[#FF4500]'
            }`}
          >
            {isAttention ? 'Attention' : 'Discordance'}
          </h5>
        </div>
        <p className='mt-[28px] text-GREY_808080 font-medium -tracking-[0.64px] text-sm md:text-base md:leading-[26.56px]'>
          {discordanceMessages[conditionName]}
        </p>
        <PrimaryBtn
          type='button'
          title='Ok'
          onClick={onClick}
          customClassName='w-full mt-[24px]'
        />
      </div>
    </CustomModal>
  );
};
