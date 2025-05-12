import {
  RightArrowWhiteSvg,
  SurveyFormSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import { useLanguageObject } from '../../utils/HelperHooks';
import { PrimaryBtn } from '../Buttons/Btns';

export const SurveyFormRules = ({ onClick }: { onClick: () => void }) => {
  const [langKey, getText, objectToValue] = useLanguageObject();
  return (
    <section className='pt-[48px] pb-[58px] text-center'>
      <div className='lg:max-w-[1012px] mx-auto'>
        <div className='bg-[#F3F5F6] rounded-[20px] p-[20px]'>
          <div className='bg-white rounded-[20px] py-[20px] px-[24px]'>
            <div className='flex justify-between flex-col'>
              <div className='flex flex-col items-center gap-[20px] md:px-[20%]'>
                <img src={SurveyFormSvg} className='h-[70px] w-[70px]' alt='' />
                <p className='md:text-[20px] leading-[26px]'>
                  {getText('SURVEY_FORM_DESCRIPTION')}
                </p>
                <p className='md:text-[20px] leading-[26px]'>
                  {getText('SURVEY_FORM_INVITATION')}
                </p>
              </div>
              <PrimaryBtn
                onClick={onClick}
                title={getText('APP_START_NOW')}
                rightImg={
                  <img src={RightArrowWhiteSvg} className='w-[20px] h-[20px]' />
                }
                customClassName='md:w-[33%] mx-auto mt-[30px]'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
