import {
  ChatbotSvg,
  CloseSvg,
  MobileSvg,
  ModuleSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import { useState } from 'react';
import { PrimaryBtn } from '../Buttons/Btns';
import { FormTextarea } from '../Inputs/FormInput';
import { CustomModal } from '../Layouts/CustomModal';

export const RatingModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [star, setStar] = useState<number>(0);

  const ratingData = [
    {
      header: 'User Interface',
      headerIcon: MobileSvg,
      desc: 'The user interface (UI) is the point of human-computer interaction and communication in a device. This can include display screens and appearance. It is also the way through which a user interacts with an application or a website.',
      ratingHeader: 'Rate the Application UI',
      rating: 4,
    },
    {
      header: 'Module Content',
      headerIcon: ModuleSvg,
      desc: 'The user interface (UI) is the point of human-computer interaction and communication in a device. This can include display screens and appearance. It is also the way through which a user interacts with an application or a website.',
      ratingHeader: 'Rate the Application UI',
      rating: 4,
    },
    {
      header: 'Chatbot',
      headerIcon: ChatbotSvg,
      desc: 'The user interface (UI) is the point of human-computer interaction and communication in a device. This can include display screens and appearance. It is also the way through which a user interacts with an application or a website.',
      ratingHeader: 'Rate the Application UI',
      rating: 4,
    },
  ];

  return (
    <CustomModal
      isOpen={isOpen}
      styles={{ modal: { padding: '24px !important' } }}
      customClass={{
        modalContainer: '!max-w-[642px] mx-auto',
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
              We are keep improving.. your feedback is important for us
            </h2>
          </div>
          <button className='mt-[8px]' onClick={onClose}>
            <img src={CloseSvg} className='h-[20px]' alt='Close' />
          </button>
        </div>

        <div className='overflow-auto h-[594px] hide-scrollbar'>
          {ratingData.map((item, index) => {
            return (
              <div
                className='p-[12px] flex flex-col gap-[12px] border-b border-[#B0B0B0] mb-[12px]'
                key={index + 'ratingItem'}
              >
                <div className=' flex gap-[10px] items-center'>
                  <img src={item.headerIcon} alt='UserInterfaceSvg' />
                  <h6 className='text-[#394F89] lg:text-base font-semibold'>
                    {item.header}
                  </h6>
                </div>
                <p className='font-medium  text-[#797979] text-[18px] leading-[27px] text-justify'>
                  {item.desc}
                </p>
                <div className=''>
                  <h6 className='text-[#394F89] lg:text-base font-semibold '>
                    {item.ratingHeader}
                  </h6>
                </div>

                <div className=''>
                  <div className='border border-[#F4F4F4] rounded-[12px] flex gap-[30px] p-[8px]'>
                    {Array.from({ length: 5 }, (_, i) => {
                      return (
                        <div
                          key={i}
                          className='cursor-pointer'
                          onClick={() => setStar(i + 1)}
                        >
                          <svg
                            width='35'
                            height='33'
                            viewBox='0 0 35 33'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M16.7745 0.927051C17.0739 0.00574017 18.3773 0.00574017 18.6766 0.927051L21.9914 11.1287C22.1252 11.5407 22.5092 11.8197 22.9424 11.8197H33.669C34.6378 11.8197 35.0405 13.0593 34.2568 13.6287L25.5788 19.9336C25.2283 20.1883 25.0817 20.6396 25.2155 21.0517L28.5302 31.2533C28.8296 32.1746 27.7751 32.9407 26.9914 32.3713L18.3134 26.0664C17.9629 25.8117 17.4883 25.8117 17.1378 26.0664L8.45978 32.3713C7.67607 32.9407 6.62159 32.1746 6.92094 31.2533L10.2356 21.0517C10.3695 20.6396 10.2229 20.1883 9.87238 19.9336L1.19435 13.6287C0.41064 13.0593 0.813416 11.8197 1.78214 11.8197H12.5088C12.942 11.8197 13.3259 11.5407 13.4598 11.1287L16.7745 0.927051Z'
                              fill={star < i + 1 ? '#F0F0F0' : '#FFD12D'}
                            />
                          </svg>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
          <div className='border border-D9DBDB px-4 py-3 rounded-[12px]'>
            <FormTextarea label='Other suggestions*' placeholder='Write...' />
          </div>
          <PrimaryBtn title='Submit' customClassName='w-full mt-6' />
        </div>
      </div>
    </CustomModal>
  );
};
