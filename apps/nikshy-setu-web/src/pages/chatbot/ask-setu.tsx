import { typingAnimation } from '@nikshay-setu-v3-monorepo/assets';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import Lottie from 'lottie-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createActivityPayloadAndSendActivity } from 'shared/store/src/user-activity/UserActivity';
import { ChatMessage } from '../../components/AskSetu/ChatMessage';
import { ChatMessageInput } from '../../components/AskSetu/ChatMessageInput';
import { useLanguageObject } from '../../utils/HelperHooks';

export type chatQuestionType = {
  questionTime: Date;
  message: string | undefined;
  self: boolean;
  data: chatQuestionType[] | undefined;
  link: string | undefined;
  questionId: string | undefined;
  H5PID: string | number | undefined;
  subNode: undefined | (number | string)[];
};

export type OptionalChatQuestionType = {
  [K in keyof chatQuestionType]?: chatQuestionType[K];
};

type ActionTypes = 'SEARCH_BY_QUERY' | 'SEARCH_SYST_QUES' | 'GET_SUB_NODE_DATA';

function alphanumericID(length = 10) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const timestamp = Date.now().toString(20);

  // Generate random characters
  const randomPart = Array.from({ length }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join('');

  // Combine timestamp and random part
  return timestamp + randomPart;
}

export const AskSetu = () => {
  // url data
  const pageUrl = new URL(location.href);
  const questionIdParam = pageUrl.searchParams.get('questionId');
  const questionParam = pageUrl.searchParams.get('question');
  const sessionIdParam = pageUrl.searchParams.get('sessionId');
  const fromHistoryParam = pageUrl.searchParams.get('fromHistory') == 'true';

  // get hooks
  const dispatch = useDispatch();
  const [langKey, getText, objectToValue] = useLanguageObject();

  // hooks
  const [loader, setLoader] = useState(false);
  const [questionState, setQuestionState] = useState([]);
  const divRef = useRef<HTMLDivElement>(null);

  // response api
  const handleResponse = (
    statusCode: number,
    response,
    actionUrl: ActionTypes,
    addSate = true
  ) => {
    if (statusCode !== 200) return;
    let newQuestion: chatQuestionType | undefined = undefined;

    if (actionUrl == 'SEARCH_SYST_QUES' && Array.isArray(response)) {
      // re assign
      response = response[0];
      // message
      const answerMessage = Array.isArray(response.answers)
        ? objectToValue(response.answers[0])
        : response.title;
      newQuestion = createChatListQuestion({
        message: answerMessage,
        self: false,
      });
      // setQuestionState((oldQuestions) => [...oldQuestions, newQuestion]);
    } else if (actionUrl == 'SEARCH_BY_QUERY') {
      const answerTypeIsArray = Array.isArray(response.answer);
      if (answerTypeIsArray) {
        const questionId = alphanumericID();
        const data: chatQuestionType[] = response.answer.map(
          ({ title: message, ...answer }): OptionalChatQuestionType => ({
            message,
            H5PID: answer['H5P-id'],
            subNode: answer?.sub_node.length > 0 ? answer.sub_node : undefined,
            questionId,
            self: false,
          })
        );
        newQuestion = createChatListQuestion({ self: false, data });
      } else {
        const nestedAnswer = objectToValue(response.answer) as any;
        const isArrayNestedAnswer = Array.isArray(nestedAnswer);
        const message = isArrayNestedAnswer
          ? nestedAnswer[0]
          : nestedAnswer.result[0];
        // if redirect url
        const link = isArrayNestedAnswer ? undefined : nestedAnswer.link[0];

        newQuestion = createChatListQuestion({ message, self: false, link });
      }
    } else if (actionUrl == 'GET_SUB_NODE_DATA') {
      const questionId = alphanumericID();
      const data: chatQuestionType[] = response.map(
        ({ title: message, ...answer }): OptionalChatQuestionType => ({
          message,
          H5PID: answer['H5P-id'],
          questionId,
          self: false,
        })
      );
      newQuestion = createChatListQuestion({ self: false, data });
    }

    // set in state
    if (newQuestion && addSate)
      setQuestionState((oldQuestions) => [...oldQuestions, newQuestion]);
    if (!addSate) return newQuestion;
  };

  const getHistoryDataList = () => {
    if (sessionIdParam) {
      setLoader(true);
      dispatch(
        createAction(
          {
            method: 'GET',
            url: 'GET_CHAT_CONVERSION',
            query: sessionIdParam,
          },
          (statusCode, response: any) => {
            const storeHistoryQuestions = [];
            // create question for state
            response.message.map((obj) => {
              try {
                // create user question
                const userQuestionMessage =
                  typeof obj.question[0] == 'object'
                    ? objectToValue(obj.question[0])
                    : obj.question[0];
                const userQuestion = createChatListQuestion({
                  message: userQuestionMessage,
                  self: true,
                  time: new Date(obj.createdAt),
                });

                // create answer
                const url: ActionTypes =
                  obj.type == 'By Search Query'
                    ? 'SEARCH_BY_QUERY'
                    : obj.type == 'By Question'
                    ? 'SEARCH_SYST_QUES'
                    : 'GET_SUB_NODE_DATA';
                let answer = undefined;
                if (url == 'SEARCH_BY_QUERY' && Array.isArray(obj.answer)) {
                  if (objectToValue(obj.answer[0])) {
                    answer = { answer: obj.answer[0] };
                  } else {
                    answer = { answer: obj.answer };
                  }
                } else if (url == 'SEARCH_SYST_QUES') {
                  answer = [{ answers: obj.answer }];
                }
                // getQuestionAnswer(url, obj, storeHistoryQuestions)
                const chatBoatAnswer = handleResponse(200, answer, url, false);

                // append in state
                if (chatBoatAnswer && userQuestion) {
                  storeHistoryQuestions.push(userQuestion);
                  // set as question answer
                  chatBoatAnswer.questionTime = userQuestion.questionTime;
                  storeHistoryQuestions.push(chatBoatAnswer);
                } else {
                  console.log({ chatBoatAnswer, answer, url });
                }
              } catch (error) {
                console.log({ error });
              }
            });
            setQuestionState(storeHistoryQuestions);
            setLoader(false);
          }
        )
      );
    }
  };

  // call api
  const handleSend = (
    inputValue: string,
    actionUrl: ActionTypes = 'SEARCH_BY_QUERY',
    questionId = undefined
  ) => {
    if (loader == false) {
      // start loader
      setLoader(true);
      // create question
      const newQuestion = createChatListQuestion({ message: inputValue });
      setQuestionState((oldQuestions) => [...oldQuestions, newQuestion]);

      // get answer api
      const callBack = (statusCode, response) => {
        if (statusCode == 200) {
          handleResponse(statusCode, response, actionUrl);
          // stop loader
          setLoader(false);
        }
      };

      dispatch(
        createAction(
          {
            method: 'POST',
            url: actionUrl,
            data: {
              sessionId: sessionIdParam,
              query: inputValue,
              id: questionId,
            },
          },
          callBack
        )
      );
    }
  };

  // fetch data
  useEffect(() => {
    if (fromHistoryParam) {
      // if form history
      getHistoryDataList();
    } else if (questionParam) {
      // system question or user question
      const url = questionIdParam ? 'SEARCH_SYST_QUES' : 'SEARCH_BY_QUERY';
      handleSend(questionParam, url, questionIdParam);
    }
  }, []);

  useEffect(() => {
    scrollToViewChat();
  }, [questionState.length]);

  // helper
  const scrollToViewChat = (questionID: string = undefined) => {
    const lastElement = questionID
      ? divRef.current?.querySelector(`[id="${questionID}"]`)
      : (divRef.current?.lastChild as HTMLElement);
    if (lastElement) {
      lastElement.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  const showH5PQuestion = (newQuestion: chatQuestionType) => {
    // user activity
    createActivityPayloadAndSendActivity({
      module: 'Chatbot',
      action: 'Chat Content Read',
      data: {
        readContent: [newQuestion],
      },
    });
    handleSetQuestion(newQuestion);
  };

  const handleSetQuestion = (newQuestion: chatQuestionType) => {
    const isAvailableInList = questionState.findIndex(
      (question) => question.questionId == newQuestion.questionId
    );
    if (isAvailableInList !== -1) {
      setQuestionState((oldQuestions) => {
        const newList = structuredClone(oldQuestions);
        newList[isAvailableInList] = { ...newQuestion };
        return newList;
      });
    } else {
      setQuestionState((oldQuestions) => [...oldQuestions, newQuestion]);
    }

    setTimeout(() => scrollToViewChat(newQuestion.questionId));
  };

  // create chat question
  const createChatListQuestion = ({
    time = null,
    message = undefined,
    self = true,
    data = undefined,
    link = undefined,
    questionId = alphanumericID(),
    H5PID = undefined,
    subNode = undefined,
  }) => {
    const questionObject: chatQuestionType = {
      questionTime: time ? new Date(time) : new Date(),
      message,
      self,
      data,
      link,
      questionId,
      H5PID,
      subNode,
    };
    return questionObject;
  };

  return (
    <section className='pt-[48px] lg:max-w-[1000px] mx-auto'>
      <div
        ref={divRef}
        className='flex flex-col h-[690px] overflow-y-auto hide-scrollbar'
        style={{ height: 'calc(100vh - 200px)' }}
      >
        {/* question list  */}
        {questionState.map((question, index) => {
          return (
            <ChatMessage
              key={index}
              handleResponse={handleResponse}
              question={question}
              showH5PQuestion={showH5PQuestion}
            />
          );
        })}
        {/* loader */}
        {loader && (
          <div className={`flex gap-2 self-start items-start`}>
            <div
              className={`flex flex-col gap-[6px] mb-2 self-start items-start`}
            >
              <Lottie
                animationData={typingAnimation}
                loop={true}
                style={{ width: '100%', height: '100%', marginTop: '10px' }}
              />
            </div>
          </div>
        )}
      </div>
      <ChatMessageInput
        onSendMessage={(v) => {
          handleSend(v);
        }}
        disabled={loader}
      />
    </section>
  );
};
