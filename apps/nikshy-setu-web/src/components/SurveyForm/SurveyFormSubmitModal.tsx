import { CircleCheckSvg, CloseSvg } from '@nikshay-setu-v3-monorepo/assets';
import { useNavigate } from 'react-router-dom';
import { useLanguageObject } from '../../utils/HelperHooks';
import { PrimaryBtn } from '../Buttons/Btns';
import { CustomModal } from '../Layouts/CustomModal';

export const SurveyFormSubmitModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const navigate = useNavigate();
  const [langKey, getText, objectToValue] = useLanguageObject();
  return (
    <CustomModal
      isOpen={isOpen}
      customClass={{
        modalContainer: '!max-w-[551px] mx-auto',
        modal: '!py-[24px] !px-[12px]',
      }}
      closeModal={onClose}
    >
      <div className=''>
        {/* Header */}
        <div className='flex justify-end'>
          <button onClick={onClose}>
            <img src={CloseSvg} className='h-[20px]' />
          </button>
        </div>
        <div className='flex gap-[8px] mb-[28px]'>
          <span>
            <img src={CircleCheckSvg} alt='' />
          </span>
          <h2 className='text-[20px] md:text-[25px] leading-[31px] font-medium'>
            {getText('SURVEY_FORM_COMPLETION_MESSAGE')}
          </h2>
        </div>

        <div className=''>
          <div className='border border-[#D9DBDB] p-2 rounded-[12px] mb-[24px]'>
            <p className='font-medium  text-[#797979] text-[18px] leading-[27px]'>
              {getText('SURVEY_FORM_APPRECIATION_NOTE')}
            </p>
          </div>

          <PrimaryBtn
            title={getText('APP_OK')}
            customClassName='w-full'
            onClick={() => {
              window.location.reload();
              navigate('/survey');
            }}
          />
        </div>
      </div>
    </CustomModal>
  );
};
