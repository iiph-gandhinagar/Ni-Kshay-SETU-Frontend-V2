import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguageObject } from '../../utils/HelperHooks';
import BmiResult from './BmiResult';
import Breadcrumb from './Breadcrumb';

const NutritionOutcome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [langKey, getText, objectToValue] = useLanguageObject();

  const data = location?.state;

  const handleNextButtonClick = () => {
    navigate('/screening-tool/result/next_step_for_pre_case', { state: data });
  };

  const handleNutritionManagementClick = () => {
    navigate(
      `/algorithmsView/${data?.treatmentId?.toString()}?name=Treatment%20Algorithm`
    );
  };

  return (
    <>
      <Breadcrumb data={data} />
      <section className='pt-12'>
        <div className='max-w-screen-lg mx-auto'>
          <div className='bg-white flex flex-col flex-1'>
            <div className='flex-1 m-2'>
              <BmiResult user_bmi={data?.userBmi} type={data?.BMI || 'Obese'} />
            </div>

            <div className='bg-[#f3f5f6] rounded-2xl p-6 flex flex-col gap-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-2xl shadow-sm'>
                <div className='bg-gradient-to-b from-[#f3f5f6] to-white rounded-xl border border-[#f3f5f6] flex flex-col justify-center items-center p-4'>
                  <p className='text-center font-semibold text-lg'>
                    {getText('APP_SCREENING_DESIRABLE_WEIGHT_GAIN')}
                  </p>
                  <p className='text-center text-gray-500 text-xl'>
                    {parseFloat(data?.desirableWeight).toFixed(2)} kg
                  </p>
                </div>
                <div className='bg-gradient-to-b from-[#f3f5f6] to-white rounded-xl border border-[#f3f5f6] flex flex-col justify-center items-center p-4'>
                  <p className='text-center font-semibold text-lg'>
                    {getText('APP_SCREENING_MINIMUM_ACCEPT_WEIGHT')}
                  </p>
                  <p className='text-center text-gray-500 text-xl'>
                    {parseFloat(data?.minimumAcceptableWeight).toFixed(2)} kg
                  </p>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-2xl shadow-sm'>
                <div className='bg-gradient-to-b from-[#f3f5f6] to-white rounded-xl border border-[#f3f5f6] flex flex-col justify-center items-center p-4'>
                  <p className='text-center font-semibold text-lg'>
                    {getText('APP_SCREENING_DESIRABLE_WEIGHT_GAIN')}
                  </p>
                  <p className='text-center text-gray-500 text-xl'>
                    {parseFloat(data?.desirableWeightGain).toFixed(2)} kg
                  </p>
                </div>
                <div className='bg-gradient-to-b from-[#f3f5f6] to-white rounded-xl border border-[#f3f5f6] flex flex-col justify-center items-center p-4'>
                  <p className='text-center font-semibold text-lg'>
                    {getText('APP_SCREENING_MINIMUM_WEIGHT_GAIN_REQ')}
                  </p>
                  <p className='text-center text-gray-500 text-xl'>
                    {parseFloat(data?.minimumWeightGainRequired).toFixed(2)} kg
                  </p>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-2xl shadow-sm'>
                <div className='bg-gradient-to-b from-[#f3f5f6] to-white rounded-xl border border-[#f3f5f6] flex flex-col justify-center items-center p-4'>
                  <p className='text-center font-semibold text-lg'>
                    {getText('APP_SCREENING_DESIRABLE_DAILY_CALORIC_INTAKE')}
                  </p>
                  <p className='text-center text-gray-500 text-xl'>
                    {parseFloat(data?.desirableDailyCaloricIntake).toFixed(2)}{' '}
                    Kcal
                  </p>
                </div>
                <div className='bg-gradient-to-b from-[#f3f5f6] to-white rounded-xl border border-[#f3f5f6] flex flex-col justify-center items-center p-4'>
                  <p className='text-center font-semibold text-lg'>
                    {getText('APP_SCREENING_DESIRABLE_DAILY_CALORIC_RANGE')}
                  </p>
                  <p className='text-center text-gray-500 text-xl'>
                    {parseFloat(data?.desirableDailyProteinIntake).toFixed(2)} g
                  </p>
                </div>
              </div>
            </div>

            <div className='mt-4 flex justify-between'>
              <button
                onClick={handleNutritionManagementClick}
                className='bg-white text-gray-500 border w-[40%] border-gray-300 px-6 py-3 rounded-2xl shadow-sm hover:bg-gray-100 transition'
              >
                {getText('APP_NUTRITION_MANAGEMENT')}
              </button>
              <button
                onClick={handleNextButtonClick}
                className='bg-[#394f89] text-white px-6 py-3 w-[40%] rounded-2xl shadow-sm hover:bg-[#2d3f6d] transition'
              >
                {getText('APP_NEXT')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NutritionOutcome;
