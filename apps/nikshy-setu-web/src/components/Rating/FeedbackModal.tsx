import {
  AppStoreShareSvg,
  CloseSvg,
  FeedbackPng,
  GoogleShareSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import { CustomModal } from '../Layouts/CustomModal';

export const FeedbackModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <CustomModal
      isOpen={isOpen}
      customClass={{
        modalContainer: '!max-w-[642px] mx-auto',
        modal: '!py-[24px] !px-[12px]',
      }}
      closeModal={onClose}
    >
      <div className=''>
        {/* Header */}
        <div className='flex justify-between items-start mb-[28px]'>
          <div className='flex gap-[8px]'>
            <div className='mt-[8px]'>
              <div className='h-[10px] w-[10px] rounded-full bg-[#394F89]'></div>
            </div>
            <h2 className='text-[20px] text-[#394F89] md:text-[25px] leading-[31px] font-semibold'>
              Thank You for your feedback
            </h2>
          </div>
          <button className='mt-[8px]' onClick={onClose}>
            <img src={CloseSvg} className='h-[20px]' />
          </button>
        </div>

        <div className=''>
          <div className='flex justify-center mb-[28px]'>
            <img src={FeedbackPng} alt='FeedbackPng' />
          </div>
          <div className=''>
            <h6 className='text-[16px] font-semibold text-center text-[#8F9797] mb-[12px]'>
              Please share review on
            </h6>
            <div className='flex justify-center gap-[9px]'>
              <img src={GoogleShareSvg} alt='' />
              <img src={AppStoreShareSvg} alt='' />
            </div>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};
