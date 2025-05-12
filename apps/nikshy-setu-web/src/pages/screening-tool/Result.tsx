import { useLocation, useNavigate } from 'react-router-dom';
import CheckSvg from '../../assets/svg/CheckSvg';
import NextStepPresumptiveCaseSvg from '../../assets/svg/NextStepPresumptiveCaseSvg';
import NutritionalOutcomeSvg from '../../assets/svg/NutritionalOutcomeSvg';
import { PrimaryBtn } from '../../components/Buttons/Btns';
import { ArrowRight } from '../../components/Icon/ArrowRight';
import { useLanguageObject } from '../../utils/HelperHooks';
import Breadcrumb from './Breadcrumb';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [langKey, getText, objectToValue] = useLanguageObject();

  const data = location?.state;
  console.log({ data });

  return (
    <>
      <Breadcrumb />
      <section className='py-12'>
        <div className='max-w-screen-lg mx-auto'>
          {/* Main Card */}
          <div className='bg-[#F3F5F6] p-4 rounded-2xl mt-7'>
            <div className='bg-white p-6 rounded-2xl flex flex-col space-y-5'>
              {/* Thank you message */}
              <div className='flex items-center space-x-3'>
                <div className='bg-[#0CA74B] p-2 rounded-full'>
                  <CheckSvg />
                </div>
                <h6 className='font-semibold text-[#4B5F83]'>
                  {getText('APP_MESSAGE_WE_APPRECIATE_RES')}
                </h6>
              </div>
              <p className='text-gray-600'>
                {getText('APP_SCREENING_INFO_ACCURATE_PERSON_MIGHT_HAVE')}
              </p>
              {/* Presumptive TB Button */}
              <PrimaryBtn
                title={data && data.nutritionTitle}
                customClassName='mt-12 w-fit'
                rightImg={<ArrowRight height='20' />}
                onClick={() => {
                  // Navigation logic (if any)
                  navigate(
                    `/algorithmsView/${data?.tbId.toString()}?name=Diagnosis%20Algorithm`
                  );
                }}
              />
            </div>
          </div>

          {/* Options Cards */}
          <div className='flex gap-5 mt-7'>
            {/* Nutritional Outcome Card */}
            <div
              onClick={() => {
                navigate('/screening-tool/result/nutrition', { state: data });
              }}
              className='flex-1 bg-gradient-to-r from-[#F3F5F6] to-white p-5 rounded-xl border border-[#F3F5F6] flex flex-col items-center space-y-3 cursor-pointer'
            >
              <NutritionalOutcomeSvg />

              <p className='font-medium text-[#4B5F83]'>
                {getText('APP_SCREENING_NUTRITION_OUTCOME')}
              </p>
            </div>

            {/* Next Step for Presumptive Case Card */}
            <div
              onClick={() => {
                navigate('/screening-tool/result/next_step_for_pre_case', {
                  state: data,
                });
              }}
              className='flex-1 bg-gradient-to-r from-[#F3F5F6] to-white p-5 rounded-xl border border-[#F3F5F6] flex flex-col items-center space-y-3 cursor-pointer'
            >
              <NextStepPresumptiveCaseSvg />
              <p className='font-medium text-[#4B5F83]'>
                {getText('APP_SCREENING_NEXT_FOR_PRES_CASE')}{' '}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Result;
