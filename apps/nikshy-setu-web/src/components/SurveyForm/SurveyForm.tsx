import { CheckSvg } from '@nikshay-setu-v3-monorepo/assets';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  RootReducerStates,
  SurveySubmissionPayload,
} from '@nikshay-setu-v3-monorepo/types';
import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useLanguageObject } from '../../utils/HelperHooks';
import { OutLineBtn, PrimaryBtn } from '../Buttons/Btns';
import { BorderedInput } from '../Inputs/FormInput';
import CheckboxGroup from './CustomCheckboxGroup';
import { SurveyFormSubmitModal } from './SurveyFormSubmitModal';

export const SurveyForm = ({ question, surveyId }: any) => {
  const [step, setStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [questionAnswer, setQuestionAnswers] = useState<
    Record<string, string>[]
  >([]);
  const dispatch = useDispatch();
  const { error, loadingApis, data } = useSelector(
    (state: RootReducerStates) => state.appContext
  );

  const [langKey, getText, objectToValue] = useLanguageObject();
  useEffect(() => {
    setStep(0);
  }, []);

  const endOfQuestion = question?.length === step + 1;
  const questionStored = questionAnswer?.filter((obj) =>
    Object?.keys(obj)?.includes(question?.[step]?._id)
  )?.[0]?.[question?.[step]?._id];

  function submitSurvey() {
    const surveyQuestionAnswer = questionAnswer?.map((v) => {
      return {
        surveyQuestionId: Object?.keys(v)?.[0],
        answer: v?.[Object?.keys(v)?.[0]],
      };
    });
    const cookies = new Cookies();

    dispatch(
      createAction<SurveySubmissionPayload, null>(
        {
          method: 'POST',
          url: 'SURVEY_HISTORY',

          data: {
            userId: cookies.get('userId'),
            surveyId: surveyId,
            questionAnswer: surveyQuestionAnswer,
          },
        },
        (code, res) => {
          if (code === 200) {
            setOpen(true);
          }
        }
      )
    );
  }
  return (
    <section className='pt-[48px] pb-[58px]'>
      <div className='lg:max-w-[1012px] mx-auto'>
        <ProgressSteps steps={question} currentStep={step} />

        <div className='mt-[36px]'>
          <div className='mb-[28px]'>
            <h4 className='text-[#394F89] text-[20px] leading-[26px] font-medium'>
              {objectToValue(question?.[step]?.title)}
            </h4>
          </div>

          <div className=''>
            <div className='mb-[58px]'>
              {question?.[step]?.type === 'options' ? (
                <CheckboxGroup
                  options={['option1', 'option2', 'option3', 'option4']
                    .filter((v) => Object.keys(question?.[step]).includes(v))
                    .map((v) => {
                      return {
                        label: objectToValue(question?.[step]?.[v]),
                        value: objectToValue(question?.[step]?.[v]),
                      };
                    })}
                  label={'Options'}
                  value={questionStored}
                  onChange={(v) => {
                    setQuestionAnswers((prevAnswers) => {
                      const updatedAnswer = {
                        [question?.[step]?._id]: v.value,
                      };
                      const filteredAnswers = prevAnswers.filter(
                        (old) =>
                          !Object.keys(old).includes(question?.[step]?._id)
                      );
                      return [...filteredAnswers, updatedAnswer];
                    });
                  }}
                />
              ) : (
                <BorderedInput
                  touched={true}
                  label={objectToValue(question?.[step]?.title)}
                  value={questionStored || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    setQuestionAnswers((prevAnswers) => {
                      const updatedAnswer = {
                        [question?.[step]?._id]: value,
                      };
                      const filteredAnswers = prevAnswers.filter(
                        (old) =>
                          !Object.keys(old).includes(question?.[step]?._id)
                      );
                      return [...filteredAnswers, updatedAnswer];
                    });
                  }}
                />
              )}
            </div>
            <div className='mb-[58px] flex flex-col gap-[12px]'>
              <PrimaryBtn
                title={
                  !endOfQuestion ? getText('APP_NEXT') : getText('APP_SUBMIT')
                }
                onClick={() => {
                  if (!endOfQuestion) {
                    setStep(step + 1);
                  } else {
                    submitSurvey();
                  }
                }}
                customClassName=''
              />
              <OutLineBtn
                color='blue'
                onClick={() => {
                  if (!endOfQuestion) {
                    setStep(step + 1);
                  } else {
                    submitSurvey();
                  }
                }}
                customClassName='w-full'
              >
                {getText('APP_SKIP')}
              </OutLineBtn>
            </div>
          </div>
        </div>
      </div>
      <SurveyFormSubmitModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
      ></SurveyFormSubmitModal>
    </section>
  );
};

const ProgressSteps = ({
  steps,
  currentStep,
}: {
  steps: number[];
  currentStep: number;
}) => {
  return (
    <div className='flex items-center'>
      {steps.map((step, index) => (
        <div key={index} className='flex items-center'>
          {/* Circle */}
          <div
            className={`flex items-center justify-center w-9 h-9 md:w-12 md:h-12 font-[16px] ${
              index < currentStep
                ? 'bg-[#0CA74B]'
                : index == currentStep
                ? 'bg-[#394F89] text-white '
                : 'border-[2px] border-[#C3C3C3] text-black'
            } rounded-full`}
          >
            {index < currentStep ? (
              <img src={CheckSvg} alt='' />
            ) : (
              <span>{index + 1}</span>
            )}
          </div>
          {/* Line */}
          {index < steps.length - 1 && (
            <div
              className={`h-[2px] w-[20px] lg:w-[37px] ${
                index < currentStep ? 'bg-green-500' : 'bg-gray-300'
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};
