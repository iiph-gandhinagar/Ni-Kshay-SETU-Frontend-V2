import {
  ArrowRightSvg,
  InfoIconSvg,
  ManageTBIcon,
} from '@nikshay-setu-v3-monorepo/assets';
import { STORE_URL } from '@nikshay-setu-v3-monorepo/constants';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryBtn } from '../../components/Buttons/Btns';
import { CommonPluginInfoModal } from '../../components/PluginInfoModal/CommonPluginInfoModal';
import { useLanguageObject } from '../../utils/HelperHooks';

const ManageTB = () => {
  const navigate = useNavigate();
  const [infoModal, setInfoModal] = useState(false);
  const [langKey, getText, objectToValue] = useLanguageObject();
  return (
    <section className='py-[48px]'>
      <div className='lg:max-w-[1012px] mx-auto'>
        <div className='flex flex-col items-center space-y-1'>
          <div className='flex w-full justify-end mb-2'>
            <img
              src={InfoIconSvg}
              alt='Info'
              onClick={() => {
                setInfoModal(true);
              }}
              className='w-4 h-4 md:w-[28px] cursor-pointer md:h-[28px]'
            />
          </div>
          <img
            src={ManageTBIcon}
            alt='Manage TB'
            className='w-24 h-w-24 md:w-36 md:h-36'
          />
          <div className='flex gap-[12px] items-center'>
            <h1 className='text-2xl lg:text-[50px] font-medium -tracking-[0.16px] md:leading-[58.52px] bg-clip-text text-transparent bg-gradient-to-r from-RED_DB3611 to-BLUE_4681FF'>
              {getText('APP_MANAGE_TB_INDIA')}
            </h1>
          </div>
          <h4 className='text-lg md:text-[28px] !my-2 font-medium -tracking-[0.16px] text-DARK_BLUE_0C3896 leading-[37.18px]'>
            {getText('MANAGE_TB_UNION_IIPHG_NITRD')}
          </h4>
          <p className='text-[18px] text-DARK_BLUE_0C3896 text-center leading-[23.9px] lg:mx-[120px]'>
            {getText('MANAGE_TB_DEC')}
          </p>
        </div>
        <div className='text-center max-w-[760px] mt-[64px] mx-auto'>
          <PrimaryBtn
            title={getText('MANAGE_TB_CREATE_PRESCRIPTION')}
            customClassName='w-full btn-outline'
            bgColor='bg-white'
            rightImg={
              <img src={ArrowRightSvg} alt='Arrow Right' className='w-4 h-4' />
            }
            onClick={() => navigate('/manage-tb-form')}
          />
        </div>
        <div className='flex justify-center max-w-[760px] mt-10 mx-auto'>
          <img
            src={STORE_URL + getText('MANAGE_TB_LOGO')}
            className='max-h-[300px]'
            alt=''
          />
        </div>
      </div>
      {infoModal && (
        <CommonPluginInfoModal
          closeModal={() => {
            setInfoModal(false);
          }}
          text={getText('MANAGE_TB_INFO')}
        ></CommonPluginInfoModal>
      )}
    </section>
  );
};

export default ManageTB;
