import { ArrowSvg } from '@nikshay-setu-v3-monorepo/assets';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  AssessmentProgressApiResponse,
  StoreAssessmentResponseApiPayload,
} from '@nikshay-setu-v3-monorepo/types';
import { useEffect, useMemo, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { KnowledgeQuizButton, OutLineBtn } from '../../components/Buttons/Btns';
import { ConfirmModal } from '../../components/KnowledgeAssessments/ConfirmModal';
import { QuizQuestionCard } from '../../components/KnowledgeAssessments/QuizQuestionCard';
import { QuizQuestionHeader } from '../../components/KnowledgeAssessments/QuizQuestionHeader';
import { useLanguageObject } from '../../utils/HelperHooks';

const KnowledgeAssessmentsQuizQuestion = () => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [langKey, getText] = useLanguageObject();

  // route state
  const {
    assessmentType,
    duration,
    id: assessmentId,
    questions = [],
  } = location.state ?? {};
  const isProAssessment = assessmentType == undefined ? true : false;

  // helper
  const AnswerStringToIndex = (answer) => {
    return answer ? Number(answer.slice(-1)) - 1 : undefined;
  };

  // new
  const questionsNew = useMemo(() => {
    return questions.map((questionObject) => {
      // write answer
      const correctAnsweredIndex = questionObject.correct_choice
        ? AnswerStringToIndex(questionObject.correct_choice)
        : AnswerStringToIndex(questionObject.correctAnswer);

      // modified object
      return {
        question: questionObject.question,
        options: [
          questionObject.option1,
          questionObject.option2,
          questionObject.option3,
          questionObject.option4,
        ].filter((value) => value),
        selectedOptionsIndex: undefined,
        correctAnsweredIndex: correctAnsweredIndex,
        isSubmitted: false,
        nid: questionObject?.nid,
        questionId: questionObject._id,
      };
    });
  }, []);

  // fetch data
  useEffect(() => {
    if (!location.state) {
      navigate('/quiz');
    }

    if (!isProAssessment && location.state) {
      const callBack = (
        statusCode: number,
        response: AssessmentProgressApiResponse
      ) => {
        if (statusCode == 200) {
          setUserQuizId(response._id);
          console.log(response.remainingTime, 'response.remainingTime');
          setTimerState((old) => ({
            ...old,
            remainingTime: Number(response.remainingTime),
          }));

          const answersQuestions = response.answers.reduce((acc, obj) => {
            acc[obj.questionId] = obj;
            return acc;
          }, {});

          // update question state
          setQuestionState((oldSate) =>
            oldSate.map((question, questionIndex) => {
              if (answersQuestions[question.questionId]) {
                const submittedQuestion = answersQuestions[question.questionId];
                question.isSubmitted = true;
                question.selectedOptionsIndex = AnswerStringToIndex(
                  submittedQuestion.selectedOption
                );
              }

              return question;
            })
          );
        } else {
          navigate('/quiz');
        }
      };

      dispatch(
        createAction<null, AssessmentProgressApiResponse>(
          {
            method: 'GET',
            url: 'SUBSCRIBER_ASSESSMENT_PROGRESS',
            query: `?userId=${cookies.get(
              'userId'
            )}&assessmentId=${assessmentId}`,
          },
          callBack
        )
      );
    }
  }, []);

  // states
  const [questionsState, setQuestionState] = useState(questionsNew);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submitModal, openSubmitModal] = useState(false);
  const [userQuizId, setUserQuizId] = useState(assessmentId);
  const [TimerSate, setTimerState] = useState({
    remainingTime: duration ? duration * 60 : undefined,
    TimeOver: false,
  });

  // if state not found
  if (!location.state) return null;

  // view skip questions handlers
  const revisitSkippedHandler = () => {
    const firstSkiedQuestionIndex = questionsState.findIndex(
      (question) => question.isSubmitted == false
    );
    if (firstSkiedQuestionIndex !== -1) {
      // set question first skip
      setCurrentQuestionIndex(firstSkiedQuestionIndex);
      openSubmitModal(false);
    }
  };

  // options onchange handler
  const optionOnchangeHandler = (optionsIndex: number | undefined) => {
    setQuestionState((oldSate) =>
      oldSate.map((question, questionIndex) => {
        if (questionIndex == currentQuestionIndex) {
          question.selectedOptionsIndex = optionsIndex;
        }
        return question;
      })
    );
  };

  // next question handler
  const nextQuestionHandler = () => {
    if (questionsState.length - 1 > currentQuestionIndex) {
      setCurrentQuestionIndex((oldIndex) => oldIndex + 1);
    } else {
      openSubmitModal(true);
    }
  };

  // Previous question handler
  const previousQuestionHandler = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((oldIndex) => oldIndex - 1);
    }
  };

  // single question submit handler
  const singleQuestionSubmitHandler = () => {
    const currentQuestion = questionsState[currentQuestionIndex];

    const callBack = (statusCode) => {
      if (statusCode === 200) {
        setQuestionState((oldState) =>
          oldState.map((question, questionIndex) => {
            if (questionIndex == currentQuestionIndex) {
              question.isSubmitted = true;
            }
            return question;
          })
        );
      }
    };

    if (isProAssessment) {
      callBack(200);
    } else {
      const data = {
        assessmentId,
        answer: {
          questionId: currentQuestion.questionId,
          answer: currentQuestion.options[currentQuestion.selectedOptionsIndex],
          isSubmit: true,
          selectedOption: `option${currentQuestion.selectedOptionsIndex + 1}`,
          isCorrect:
            currentQuestion.correctAnsweredIndex ==
            currentQuestion.selectedOptionsIndex,
        },
      } as StoreAssessmentResponseApiPayload;

      dispatch(
        createAction<StoreAssessmentResponseApiPayload, null>(
          {
            data,
            query: userQuizId ? `?idFilter=${userQuizId}` : '',
            method: 'POST',
            url: 'STORE_ASSESSMENT_RESPONSE',
          },
          callBack
        )
      );
    }
  };

  // submit quiz handler
  const submitQuizHandler = () => {
    const callBack = (code) => {
      if (code == 200) {
        navigate(
          `/quiz-result?assessmentId=${userQuizId}&isProAssessment=${isProAssessment}`,
          {
            replace: true,
          }
        );
      }
    };

    if (isProAssessment) {
      const data = {
        payload: {
          user_id: cookies.get('userId'),
          assessment_id: assessmentId,
          user_responses: questionsState.map((question, index) => {
            return {
              nid: question.nid,
              user_answer: question.isSubmitted
                ? `option${question.selectedOptionsIndex + 1}`
                : '',
            };
          }),
        },
      };

      dispatch(
        createAction(
          {
            method: 'POST',
            url: 'STORE_PRO_ASSESSMENT_RESULT',
            data,
          },
          callBack
        )
      );
    } else {
      callBack(200);
    }
  };

  const showNextButton = questionsState[currentQuestionIndex].isSubmitted;
  const showQuestionSubmit =
    questionsState[currentQuestionIndex].selectedOptionsIndex !== undefined;
  const showSkipButton = !showQuestionSubmit;
  const quizSubmit =
    questionsState.length - 1 == currentQuestionIndex && showNextButton;

  return (
    <section className='pt-[48px] pb-[58px] h-full'>
      <div className='lg:max-w-[1012px] mx-auto'>
        <div className='flex flex-col gap-[24px] mb-[58px]'>
          <QuizQuestionHeader
            {...{
              questionsState,
              currentQuestionIndex,
              remainingTime: TimerSate.remainingTime,
              setTimerState,
            }}
          />
          <div className='bg-[#F3F5F6] rounded-[20px] p-[12px]'>
            <QuizQuestionCard
              key={currentQuestionIndex}
              {...{
                questionsState,
                currentQuestionIndex,
                optionOnchangeHandler,
              }}
            />
          </div>
        </div>

        <div className='flex justify-between items-center'>
          <div>
            <OutLineBtn
              color='gary'
              customClassName='w-full min-w-[135px]'
              onClick={previousQuestionHandler}
              disabled={currentQuestionIndex === 0}
            >
              {getText('APP_PREVIOUS')}
            </OutLineBtn>
          </div>
          <div>
            <KnowledgeQuizButton
              className='min-w-[135px]'
              onClick={
                showNextButton || showSkipButton
                  ? nextQuestionHandler
                  : showQuestionSubmit
                  ? singleQuestionSubmitHandler
                  : submitQuizHandler
              }
            >
              {showSkipButton
                ? getText('APP_SKIP')
                : showNextButton && !quizSubmit
                ? getText('APP_NEXT')
                : getText('APP_SUBMIT')}
              {showNextButton && !quizSubmit && (
                <img src={ArrowSvg} alt='Right Arrow' />
              )}
            </KnowledgeQuizButton>
          </div>
        </div>
      </div>

      {/* modal */}
      {(submitModal || TimerSate.TimeOver) && (
        <ConfirmModal
          {...{ questionsState }}
          onClose={() => openSubmitModal(false)}
          onSubmit={submitQuizHandler}
          revisitSkippedHandler={revisitSkippedHandler}
        />
      )}
    </section>
  );
};

export default KnowledgeAssessmentsQuizQuestion;
