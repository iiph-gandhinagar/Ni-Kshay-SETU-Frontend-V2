import { ScreeningToolSvg } from '@nikshay-setu-v3-monorepo/assets';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { PrimaryBtn } from '../../components/Buttons/Btns';
import { ArrowRight } from '../../components/Icon/ArrowRight';
import { useLanguageObject } from '../../utils/HelperHooks';

const Screening = () => {
  const [_, getText] = useLanguageObject();
  return (
    <section className='pt-[48px]'>
      <div className='lg:max-w-[1012px] mx-auto'>
        <Breadcrumbs />
        <div className='bg-[#F3F5F6] p-4 rounded-2xl mt-[28px]'>
          <div className='bg-white p-4 rounded-2xl '>
            <div className='flex flex-col space-y-2'>
              <img
                src={ScreeningToolSvg}
                alt='Screening tool'
                className='w-14 h-14'
              />
              <p>{getText('APP_SCREENING_FIRST_DEC')}</p>
              <p>{getText('APP_SCREENING_SEC_DEC')}</p>
            </div>
            <PrimaryBtn
              title={getText('APP_START_NOW')}
              customClassName='text-xs md:text-base leading-normal w-full h-[68px] rounded-2xl mt-12'
              rightImg={<ArrowRight />}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Screening;
