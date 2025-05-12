import { CloseWhiteSvg } from '@nikshay-setu-v3-monorepo/assets';
import PageStyle from '../../styles/RaiseClinicalQuery.module.css';
import { PrimaryBtn } from '../Buttons/Btns';
import { FormSelect } from '../Inputs/FormSelect';

interface TransferQueryModalProps {
  isOpen: boolean;
  onClose: () => void;
  options?: any[];
  value?: any;
  onChange?: (value: any) => void;
  onSubmit?: () => void;
}

const TransferQueryModal: React.FC<TransferQueryModalProps> = ({
  isOpen,
  onClose,
  options,
  onChange,
  value,
  onSubmit,
}) => {
  return (
    isOpen && (
      <div
        className={`absolute top-full mt-[6px] right-0 bg-[#181818] rounded-[18px] p-[24px] w-[362px] text-start ${PageStyle.RaiseClinicalQueryForm}`}
      >
        <div className='flex justify-between items-center mb-2'>
          <h2 className='text-[#F5F5F5] text-lg font-semibold'>
            Transfer query
          </h2>
          <button type='button' onClick={onClose}>
            <img src={CloseWhiteSvg} alt='' />
          </button>
        </div>

        <div className='mb-[24px]'>
          <div className='text-white text-[16px] mb-1'>
            Select the institutes
          </div>
          <div className='bg-[#303030] '>
            <FormSelect
              options={options}
              value={value.value}
              onChange={onChange}
              label='institutes*'
              labelClass='!text-[#409BBB]'
              placeholderColor='#ACABAB'
              inputColor='#ACABAB'
              placeholder='Select'
            ></FormSelect>
          </div>
        </div>

        <div className=''>
          <PrimaryBtn
            onClick={onSubmit}
            type='submit'
            customClassName='w-full'
            title='Submit'
            bgColor='bg-gradient-to-b from-[#0B4E67] to-[#61C9EF]'
          />
          <button className='w-full text-[#BBBBBB] btn' onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    )
  );
};

export default TransferQueryModal;
