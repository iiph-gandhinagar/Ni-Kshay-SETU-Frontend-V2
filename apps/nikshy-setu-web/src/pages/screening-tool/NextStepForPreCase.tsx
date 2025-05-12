import { createAction } from '@nikshay-setu-v3-monorepo/store';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguageObject } from '../../utils/HelperHooks';
import Breadcrumb from './Breadcrumb';

const NextStepForPresCase: React.FC = () => {
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const data = location?.state;

  const [langKey, getText, objectToValue] = useLanguageObject();

  useEffect(() => {
    dispatch(
      createAction(
        {
          method: 'GET',
          url: 'APP_CONFIG_DETAILS',
        },
        (code, res: any) => {
          if (code === 200) {
            const filterObj = res?.masterCms?.filter(
              (v: any) => v.title === data.nutritionTitle
            );
            setContent(
              objectToValue(filterObj?.[0]?.description) ||
                filterObj?.[0]?.description
            );
          }
        }
      )
    );
  }, []);

  return (
    <>
      <Breadcrumb data={data} />
      <section className='pt-12'>
        <div className='max-w-screen-lg mx-auto'>
          <div className='bg-white p-4'>
            <div className='bg-white shadow-md border border-gray-200 rounded-lg p-6 mb-6'>
              <div
                className='text-gray-700 text-base leading-relaxed list-inside list-disc'
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>

            {/* Buttons */}
            <div className='mt-4 flex justify-between'>
              <button
                onClick={() =>
                  navigate(
                    `/algorithmsView/${data?.tbId.toString()}?name=Diagnosis%20Algorithm`
                  )
                }
                className='bg-white text-gray-500 border border-gray-300 px-6 py-3 rounded-2xl w-[40%] shadow-sm hover:bg-gray-100 transition'
              >
                {getText('APP_CHECK_DIAGNOSTIC_ALGO')}
              </button>
              <button
                className='bg-[#394f89] text-white px-6 py-3 rounded-2xl w-[40%] shadow-sm hover:bg-[#2d3f6d] transition'
                onClick={() => navigate('/home')}
              >
                {getText('NIKSHAY_SETU_NAME')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NextStepForPresCase;
