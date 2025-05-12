import { ArrowSvg } from '@nikshay-setu-v3-monorepo/assets';
import { BmiResultProps } from '@nikshay-setu-v3-monorepo/types';
import { useLocation } from 'react-router-dom';
import { useLanguageObject } from '../../utils/HelperHooks';

const BmiResult = ({ user_bmi, type = '' }: BmiResultProps) => {
  const location = useLocation();
  const [langKey, getText, objectToValue] = useLanguageObject();

  const bmi = [
    {
      name: getText('APP_SCREENING_EXTREMELY_UNDERWEIGHT'),
      color: '#FF6666',
      type: 'Extremely Underweight',
      width: '95%',
    },
    {
      name: getText('APP_SCREENING_SEVERELY_UNDERWEIGHT'),
      color: '#AF7B2D',
      type: 'Severely Underweight',
      width: '85%',
    },
    {
      name: getText('APP_SCREENING_MODERATELY_UNDERWEIGHT'),
      color: '#FFC56D',
      type: 'Moderately Underweight',
      width: '75%',
    },
    {
      name: getText('APP_SCREENING_MILD_UNDERWEIGHT'),
      color: '#62C6E5',
      type: 'Mild Underweight',
      width: '65%',
    },
    {
      name: getText('APP_SCREENING_NORMAL'),
      color: '#51F16B',
      type: 'Normal',
      width: '55%',
    },
    {
      name: getText('APP_SCREENING_OVERWEIGHT'),
      color: '#F8E74F',
      type: 'Overweight',
      width: '45%',
    },
    {
      name: getText('APP_SCREENING_OBESE'),
      color: '#FF906D',
      type: 'Obese',
      width: '35%',
    },
  ];

  const bmiType = bmi.find((v) => v.type === type);

  return (
    <div className='flex flex-col p-6 bg-white shadow-md rounded-lg mx-auto'>
      <div className='flex justify-between'>
        <div>
          <div className='flex items-center'>
            <span
              className='text-3xl mr-2 mb-[3px]'
              style={{ color: bmiType?.color }}
            >
              ●
            </span>
            <span className='text-lg text-center'>
              {getText('LAB_TEXT_BMI')}
            </span>
          </div>
          <span className='text-sm text-gray-600'>
            {getText('APP_SCREENING_BODY_MASS_INDEX')}
          </span>
        </div>

        <div>
          <span className='text-lg mr-3' style={{ color: bmiType?.color }}>
            {parseFloat(user_bmi?.toString()).toPrecision(4) || '00'} kg/m2
          </span>
          <span className='text-sm text-gray-600 text-right'>
            {bmiType?.name}
          </span>
        </div>
      </div>

      <div className='mt-5 px-8 py-4 space-y-2'>
        {bmi.map((data, i) => (
          <div
            key={i}
            className={`flex items-center h-10 p-2 rounded-lg mb-2`}
            style={{
              width: data.width,
              backgroundColor: data.color,
              borderBottomRightRadius: '12px',
              borderTopLeftRadius: i === 0 ? '12px' : '0',
              borderTopRightRadius: i === 0 ? '12px' : '0',
              borderWidth: data.type === type ? '1px' : '0',
              borderColor: data.type === type ? '#000000' : 'transparent',
            }}
          >
            <img src={ArrowSvg} />
            <span
              className={`text-sm ${
                data.type === type ? 'text-black' : 'text-gray-700'
              }`}
            >
              {data.type === type && '●'} {data.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BmiResult;
