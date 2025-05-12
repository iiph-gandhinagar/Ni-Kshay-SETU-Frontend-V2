import {
  RightArrowWhiteSvg,
  ScreeningToolSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import { useLanguageObject } from '../../utils/HelperHooks';
import { PrimaryBtn } from '../Buttons/Btns';

export const Screening = ({ setTab }: any) => {
  const [_, getText] = useLanguageObject();
  return (
    <div className='bg-[#F3F5F6] p-[20px] rounded-[20px] text-center'>
      <div className='bg-white p-[24px] rounded-[20px]'>
        <div className='mb-[30px] md:mb-[60px] items-center md:px-[20%] flex flex-col gap-[10px]'>
          <img
            src={ScreeningToolSvg}
            className='h-[70px] w-[70px]'
            alt='ScreeningToolSvg'
          />
          <p className='md:text-[20px] leading-[30px]'>
            {getText('APP_SCREENING_FIRST_DEC')}
          </p>
          <p className='md:text-[20px] leading-[30px]'>
            {getText('APP_SCREENING_SEC_DEC')}
          </p>
        </div>

        <PrimaryBtn
          onClick={() => setTab(2)}
          title={getText('APP_START_NOW')}
          customClassName='md:w-[33%] mx-auto'
          rightImg={
            <img src={RightArrowWhiteSvg} className='w-[20px] h-[20px]'></img>
          }
        ></PrimaryBtn>
      </div>
    </div>
  );
};
