import {
  checkGreenSvg,
  RightArrowWhiteSvg,
  SurveyFormSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  RootReducerStates,
  Survey,
  SurveyList,
} from '@nikshay-setu-v3-monorepo/types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLanguageObject } from '../../utils/HelperHooks';
import { PrimaryBtn } from '../Buttons/Btns';

const SurveyFormList = ({ onClick, setQuestion, setSurveyId }: any) => {
  const dispatch = useDispatch();
  const [surveyForms, setSurveyForms] = useState<Survey[] | any[]>([]);
  const { error, data, loadingApis } = useSelector(
    (state: RootReducerStates) => state.appContext
  );
  const [langKey, getText, objectToValue] = useLanguageObject();
  useEffect(() => {
    dispatch(
      createAction<null, SurveyList>(
        {
          method: 'GET',
          url: 'SURVEY_DETAILS',
        },
        (code, res) => {
          if (code === 200) {
            const completed = res?.doneSurveyList?.map((v) => {
              return { ...v, completed: true };
            });
            setSurveyForms([...res?.surveyList, ...completed]);
          }
        }
      )
    );
  }, []);
  return (
    <section className='pt-[48px] pb-[58px]'>
      <div className='lg:max-w-[1012px] mx-auto'>
        <div className='bg-[#F3F5F6] rounded-[20px] p-[20px]'>
          <div className='flex flex-col gap-[28px]'>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2'>
              {surveyForms?.map((survey, index) => {
                return (
                  <div
                    key={index}
                    className='bg-white rounded-[20px] px-[24px] py-[12px] flex flex-col gap-[20px]'
                  >
                    <div className='flex gap-[10px]'>
                      <img
                        src={SurveyFormSvg}
                        className='h-[32px] w-[32px]'
                        alt=''
                      />
                      <h5 className='text-[20px] text-[#394F89] font-medium fix-line-text'>
                        {objectToValue(survey?.surveyId?.title) ||
                          objectToValue(survey?.title)}
                      </h5>
                    </div>

                    <div className='flex justify-end'>
                      {!survey?.completed ? (
                        <PrimaryBtn
                          onClick={() => {
                            setQuestion(survey?.questions);
                            setSurveyId(survey?._id);
                            onClick();
                          }}
                          title={getText('APP_START_NOW')}
                          rightImg={
                            <img src={RightArrowWhiteSvg} className='h-5' />
                          }
                          customClassName='w-full py-[0.8rem]'
                        />
                      ) : (
                        <div className='flex gap-[12px] items-center'>
                          <p className='text-[#30D03F] text-[20px] font-medium'>
                            {getText('APP_COMPLETED')}
                          </p>
                          <img src={checkGreenSvg} alt='' />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {surveyForms && surveyForms.length == 0 && (
            <div className='p-3 rounded-md bg-white'>
              <p className='text-center'>{getText('APP_NO_DATA_FOUND')}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
export default SurveyFormList;
