import { OutLineBtn, PrimaryBtn } from '../../components/Buttons/Btns';
import { CustomModal } from '../../components/Layouts/CustomModal';

type DeleteAccountModalProps = {
  onClose(): void;
  onDelete: () => void;
};
export const DeleteAccountModal = ({
  onClose,
  onDelete,
}: DeleteAccountModalProps) => {
  return (
    <CustomModal
      closeModal={onClose}
      isOpen={true}
      customClass={{
        modalContainer: '!max-w-[463px] mx-auto',
        modal: '!py-[36px] !px-[28px]',
      }}
    >
      <div className='text-center'>
        {/* Header */}
        <div className='mb-[36px]'>
          <h2 className='md:text-[20px] mb-[12px] font-semibold'>
            Are you sure you want to delete your account?
          </h2>
          <p className='text-darkGray666666 text-[18px] font-normal'>
            We're sad to see you go, but we understand that sometimes it's
            necessary. Please take a moment to consider the consequences before
            proceeding.
          </p>
        </div>

        <div className=''>
          <PrimaryBtn
            customClassName='w-full mb-[12px]'
            onClick={onClose}
            title='Cancel'
          ></PrimaryBtn>
          <OutLineBtn
            color='blue'
            customClassName='w-full !bg-red-600 !border-red-600 !text-white'
            onClick={onDelete}
            title='Delete'
          ></OutLineBtn>
        </div>
      </div>
    </CustomModal>
  );
};
