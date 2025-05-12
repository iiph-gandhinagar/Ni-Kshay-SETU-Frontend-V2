import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguageObject } from '../../utils/HelperHooks';
import { LabInvestigationFormObject } from './LabInvestigationForm';

export const LabInvestigationResult = () => {
  const [langKey, getText, objectToValue] = useLanguageObject();
  return (
    <section className='pt-[48px] pb-[58px]'>
      <RiskAssessmentCard />
      {getText('LAB_DETAILED_SCORE')}
      <LabInvestigationResultScoreCards />
    </section>
  );
};

const Result = {
  '0': {
    title: 'No Risk',
    color: '#51F16B',
  },
  '1': {
    title: 'Low Risk',
    color: '#F8E74F',
  },
  '2': {
    title: 'Moderate Risk',
    color: '#FFC56D',
  },
  '3': {
    title: 'High Risk',
    color: '#FF5F5F',
  },
};

const LabInvestigationResultScoreCards = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [langKey, getText, objectToValue] = useLanguageObject();

  useEffect(() => {
    if (!state) {
      navigate('/home');
    }
  }, []);
  const cardsArray = Object.values(LabInvestigationFormObject.formField);
  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3 my-3'>
      {state &&
        cardsArray.map((field) => {
          const score = state.scoreValues[field.name];
          const value = state.formState[field.name];
          const borderColor = Result[score] ? Result[score].color : '';
          return (
            <div
              className='border-2 shadow-md rounded-md p-3'
              style={{ borderColor: borderColor }}
            >
              <p className='text-green-600 font-semibold text-center text-xl mb-4'>
                {getText(field.langKey as Parameters<typeof getText>[0])}
              </p>
              <p>
                {getText('APP_SCORE')} :{' '}
                <span className={`${score ? '' : 'text-danger'}`}>
                  {score ?? getText('LAB_NO_DATA')}
                </span>
              </p>
              <p>
                {getText('APP_VALUE')} :{' '}
                <span className={`${value ? '' : 'text-danger'}`}>
                  {value ?? getText('LAB_NO_DATA')}
                </span>
              </p>
            </div>
          );
        })}
    </div>
  );
};

const RiskAssessmentCard = () => {
  // get local state
  const { state } = useLocation();
  const [langKey, getText, objectToValue] = useLanguageObject();

  if (!state) return null;
  const scores = Object.values(state.scoreValues as number[]);
  let maxValue = Math.max(...scores);

  // If the maximum score is 1, apply further logic
  if (maxValue == 1) {
    // Create a lookup object to count occurrences of each score
    const lookup: { [key: string]: number } = scores.reduce((acc, score) => {
      acc[score] = (acc[score] || 0) + 1;
      return acc;
    }, {});

    // If more than 2 occurrences of the maximum score, consider it as a 'Moderate Risk'
    if (Object.values(lookup).filter((count) => count > 2).length > 0) {
      maxValue = 2;
    }
  }

  const riskLevels = [
    {
      level: 'No Risk',
      color: 'bg-green-400',
      type: 0,
      langKey: 'LAB_NO_RISK',
    },
    {
      level: 'Low Risk',
      color: 'bg-yellow-300',
      type: 1,
      langKey: 'LAB_LOW_RISK',
    },
    {
      level: 'Moderate Risk',
      color: 'bg-orange-300',
      type: 2,
      langKey: 'LAB_MODERATE_RISK',
    },
    {
      level: 'High Risk',
      color: 'bg-red-400',
      type: 3,
      langKey: 'LAB_HIGH_RISK',
    },
  ] as const;

  return (
    <div className='lg:w-1/2 p-4 mx-auto bg-white shadow-lg rounded-lg'>
      {/* Header */}
      <div className='pb-2'>
        <h2 className='text-xl text-center text-blue-600 font-semibold'>
          {getText('LAB_THANK_YOU_ASSESSMENT')}
        </h2>
      </div>

      {/* Content */}
      <div className='p-4'>
        <div className='mb-6'>
          {/* Risk Level Indicator */}
          <div>
            {riskLevels.map((risk, index) => (
              <div
                key={risk.level}
                className={`${risk.color} p-2 relative ${
                  index === 0 ? 'rounded-t-md' : ''
                } ${index === riskLevels.length - 1 ? 'rounded-b-md' : ''}`}
              >
                <span className='text-gray-800 font-medium'>
                  {getText(risk.langKey)}
                </span>
                {index === maxValue && (
                  <div className='absolute -right-4 top-1/2 -translate-y-1/2'>
                    <div className='w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-blue-600'></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Assessment Message */}
        <p className='text-center text-gray-700'>
          {getText('LAB_INTERMEDIATE_CARE')}
        </p>
      </div>
    </div>
  );
};
