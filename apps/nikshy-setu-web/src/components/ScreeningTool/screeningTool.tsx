import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  UserScreeningApiResponse,
  UserScreeningPayload,
} from '@nikshay-setu-v3-monorepo/types';
import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../assets/customCss/customRange.css';
import Breadcrumb from '../../pages/screening-tool/Breadcrumb';
import { useLanguageObject } from '../../utils/HelperHooks';

export interface Symptom {
  _id: string; // Unique identifier for the symptom
  category: string; // Category ID or classification for the symptom
  title: {
    en: string; // Symptom title in English
  };
  deletedAt: string | null; // Nullable field for deletion timestamp
  createdAt: string; // Timestamp for creation date
  updatedAt: string; // Timestamp for last update date
  id: number; // Numeric ID, likely for sorting or referencing
  icon: string; // Path or URL to the symptom's icon
}

const ScreeningToolSymptom = () => {
  const navigate = useNavigate();
  const [stepOne, setStepOne] = useState<number>(0);
  const [ageValue, setAgeValue] = useState<number>(0);
  const [weightValue, setWeightValue] = useState<number>(0);
  const [heightValue, setHeightValue] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [selectedSymptoms, setSelectedSymptoms] = useState<any[]>([]);
  const dispatch = useDispatch();
  const [symptomsData, SetSymptomsData] = useState<Symptom[]>([]);

  const [langKey, getText, objectToValue] = useLanguageObject();

  const onSymptomsSelect = (id: string) => {
    setSelectedSymptoms((prev: any) =>
      prev.includes(id)
        ? prev.filter((symptom: any) => symptom !== id)
        : [...prev, id]
    );
  };

  const onSubmit = () => {
    const cookies = new Cookies();
    if (selectedSymptoms?.length >= 2) {
      dispatch(
        createAction<UserScreeningPayload, UserScreeningApiResponse>(
          {
            method: 'POST',
            url: 'SCREENING',
            data: {
              userId: cookies.get('userId'),
              age: ageValue,
              height: heightValue,
              weight: weightValue,
              symptomSelected: selectedSymptoms,
            },
          },
          (code, res: any) => {
            if (code == 200) {
              navigate('/screening-tool/result', { state: res });
            } else {
              console.log('Error : Something went wrong');
            }
          }
        )
      );
    } else {
      alert('Please select more than two symptoms');
    }
  };

  useEffect(() => {
    if (stepOne === 1) {
      dispatch(
        createAction(
          {
            method: 'GET',
            url: 'MASTER_SYMPTOMS',
          },
          (code, res: any) => {
            if (code === 200) {
              SetSymptomsData(res);
              setLoading(false);
            } else {
              console.log('Error: Something went wrong');
            }
          }
        )
      );
    }
  }, [stepOne]);

  return (
    <>
      <Breadcrumb />
      <div className='bg-gray-100 rounded-2xl p-4 md:p-6 shadow-md'>
        <div className='flex items-center space-x-4 mb-6'>
          <button
            className={`px-4 py-2 rounded-md text-white ${
              stepOne === 0 ? 'bg-[#394F89]' : 'bg-green-500'
            }`}
            onClick={() => setStepOne(0)}
          >
            {getText('APP_ONE_BASIC_INFO')}
          </button>
          <div
            className={`flex-grow h-1 ${
              stepOne === 0 ? 'bg-[#394F89]' : 'bg-green-500'
            }`}
          ></div>
          <button
            className={`px-4 py-2 border rounded-md ${
              stepOne === 0
                ? 'border-gray-300 bg-white text-black'
                : 'bg-[#394F89] text-white border-transparent'
            }`}
            onClick={() => console.log('Navigate to screeningTool')}
          >
            {getText('APP_SEC_SYMPTOMS')}
          </button>
        </div>
        <div className='bg-white rounded-lg p-4 md:p-6 shadow'>
          <h3 className='text-lg font-semibold text-gray-700 mb-4'>
            {stepOne === 0
              ? getText('APP_SELECT_AGE_WEIGHT_HEIGHT')
              : getText('APP_MARK_SYMPTOMS_DESC_BELOW')}
          </h3>
          <div className='space-y-8'>
            {stepOne === 0 ? (
              <>
                <div className='mb-6'>
                  <div className='flex mb-3 justify-between items-center'>
                    <label className='block text-sm font-medium text-gray-600'>
                      {getText('APP_AGE_Y')}
                    </label>
                    <span className='text-sm font-medium text-gray-600'>
                      {ageValue}
                    </span>
                  </div>
                  <input
                    type='range'
                    value={ageValue}
                    onChange={(e) => setAgeValue(Number(e.target.value))}
                    className='custom-range'
                    style={
                      {
                        '--selected-percent': `${(ageValue / 150) * 100}%`,
                      } as React.CSSProperties
                    }
                    max={150}
                  />
                </div>
                <div className='mb-6'>
                  <div className='flex mb-3 justify-between items-center'>
                    <label className='block text-sm font-medium text-gray-600'>
                      {getText('APP_WEIGHT_KG')}
                    </label>
                    <span className='text-sm font-medium text-gray-600'>
                      {weightValue}
                    </span>
                  </div>
                  <input
                    type='range'
                    value={weightValue}
                    onChange={(e) => setWeightValue(Number(e.target.value))}
                    className='custom-range'
                    style={
                      {
                        '--selected-percent': `${(weightValue / 200) * 100}%`,
                      } as React.CSSProperties
                    }
                    max={200}
                  />
                </div>
                <div className='mb-6'>
                  <div className='flex mb-3 justify-between items-center'>
                    <label className='block text-sm font-medium text-gray-600'>
                      {getText('APP_HEIGHT_CM')}
                    </label>
                    <span className='text-sm font-medium text-gray-600'>
                      {heightValue}
                    </span>
                  </div>
                  <input
                    type='range'
                    value={heightValue}
                    onChange={(e) => setHeightValue(Number(e.target.value))}
                    className='custom-range'
                    style={
                      {
                        '--selected-percent': `${(heightValue / 245) * 100}%`,
                      } as React.CSSProperties
                    }
                    max={245}
                  />
                </div>
              </>
            ) : (
              <div className='border-l-2 pl-4 max-h-[70vh] overflow-y-auto'>
                {loading && symptomsData.length === 0
                  ? Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className='animate-pulse bg-gray-200 h-6 w-full rounded-md mb-3'
                      ></div>
                    ))
                  : symptomsData
                      .sort((a, b) => a.id - b.id)
                      .map((value, key) => (
                        <div
                          key={key}
                          className='flex items-center space-x-4 p-2 hover:bg-gray-100 cursor-pointer'
                          onClick={() => onSymptomsSelect(value._id)}
                        >
                          <div
                            className={`h-4 w-4 border-2 rounded-full flex shrink-0 items-center justify-center ${
                              selectedSymptoms.includes(value._id)
                                ? 'border-[#394F89]'
                                : 'border-gray-400'
                            }`}
                          >
                            {selectedSymptoms.includes(value._id) && (
                              <div className='h-2 w-2 bg-[#394F89] rounded-full'></div>
                            )}
                          </div>
                          <img
                            src={`${process.env.NX_PUBLIC_STORE_URL}${value.icon}`}
                            alt='symptom icon'
                            className='h-8 w-8'
                          />
                          <p className='text-gray-700 flex-grow'>
                            {objectToValue(value.title)}
                          </p>
                        </div>
                      ))}
              </div>
            )}
          </div>
          <button
            className='mt-6 w-full py-2 bg-[#394F89] text-white font-semibold rounded-md hover:bg-[#33477b]'
            onClick={() => {
              if (stepOne === 1) {
                onSubmit();
              } else if (stepOne === 0) {
                if (heightValue === 0 || weightValue === 0 || ageValue === 0) {
                  alert(getText('APP_FILL_VALID_INFO'));
                } else {
                  setStepOne(1);
                }
              }
            }}
          >
            {stepOne === 0 ? getText('APP_NEXT') : getText('APP_SUBMIT')}
          </button>
        </div>
      </div>
    </>
  );
};

export default ScreeningToolSymptom;
