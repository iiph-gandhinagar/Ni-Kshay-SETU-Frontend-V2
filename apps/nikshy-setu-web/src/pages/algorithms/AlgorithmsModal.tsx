import Modal, { ModalProps } from 'react-responsive-modal';

const styleModal: ModalProps['styles'] = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modal: {
    borderRadius: '20px',
    padding: '24px',
    height: 'auto',
    overflowY: 'auto',
    width: 'auto',
  },
  closeButton: {
    backgroundColor: 'white',
    borderColor: 'transparent',
  },
};

type AlgorithmsModalProps = {
  title: string;
  description: string;
  onClose: () => void;
};

export const AlgorithmsModal = ({
  title,
  description,
  onClose,
}: AlgorithmsModalProps) => {
  return (
    <Modal
      open={true}
      onClose={onClose}
      center
      blockScroll={true}
      styles={styleModal}
    >
      <h2 className='text-[#394F89] font-semibold text-[20px] pr-4 flex items-center space-x-2'>
        {title}
      </h2>
      <div
        className='prose'
        style={{
          listStyleType: 'decimal',
        }}
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </Modal>
  );
};
