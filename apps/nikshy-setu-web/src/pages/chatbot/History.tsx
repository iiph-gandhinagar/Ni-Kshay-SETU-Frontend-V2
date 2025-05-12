import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { ConversationRecord } from '@nikshay-setu-v3-monorepo/types';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLanguageObject } from '../../utils/HelperHooks';
import { AlgorithmsBreadcrumb } from '../algorithms/AlgorithmsBreadcrumb';

export function ChatHistory() {
  // get hook
  const navigate = useNavigate();
  const [langKey, getText, objectToValue] = useLanguageObject();

  // state
  const { data, loading, loadMore } = InfiniteScroll();
  const observer = useRef<IntersectionObserver | null>(null);

  // helper
  const lastElementRef = (node: any) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });
    if (node) observer.current.observe(node);
  };

  return (
    <div className='p-6'>
      <AlgorithmsBreadcrumb
        tabs={[{ label: getText('APP_HISTORY') }]}
      ></AlgorithmsBreadcrumb>
      <div className='p-3 rounded-[20px] bg-lightGreyF8F8F8'>
        <div className='bg-white rounded-[20px] py-3 px-4'>
          <div className='divide-y'>
            {data.map((question, index) => {
              return (
                <div
                  ref={data.length - 1 == index ? lastElementRef : null}
                  key={index}
                  className='py-2'
                >
                  <span
                    onClick={() =>
                      navigate(
                        `/ask-setu?sessionId=${question.sessionId}&fromHistory=true`
                      )
                    }
                    className='text-blue-400 ms-2 cursor-pointer'
                  >
                    {question.message}
                  </span>
                </div>
              );
            })}
          </div>
          {data.length == 0 && !loading && <p>No data Found</p>}
          {loading && <h6 className='my-2 ms-3'>Loading ...</h6>}
        </div>
      </div>
    </div>
  );
}

type historyQuestionType = {
  sessionId: string;
  message: string;
};

const InfiniteScroll = () => {
  // state
  const [data, setData] = useState<historyQuestionType[][]>([[]]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  // get hook
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    // get chat history api
    dispatch(
      createAction<null, ConversationRecord>(
        {
          method: 'GET',
          url: 'CHAT_CONVERSION',
          query: `?page=${page}`,
        },
        (statusCode, response: ConversationRecord) => {
          if (statusCode == 200) {
            const { list, currentPage, totalPages } = response;
            console.log({ list });

            // refactor response
            const newData = list.map((messageArray): historyQuestionType => {
              const { message, sessionId } = messageArray;
              const FirstMessage = message[0];
              const FirstQuestion = FirstMessage.question[0];
              const messageText =
                FirstQuestion && typeof FirstQuestion == 'object'
                  ? FirstQuestion.en
                  : (FirstQuestion as string);
              // new data
              return { sessionId, message: messageText };
            });
            // set list index wise array
            setData((oldList) => {
              const newList = structuredClone(oldList);
              newList[currentPage] = newData;
              return newList;
            });

            setLoading(false);
            setHasMore(totalPages > currentPage);
          }
        }
      )
    );
  }, [page]);

  function loadMore() {
    if (hasMore && loading == false) {
      setPage((old) => old + 1);
    }
  }

  return { data: data.flat(1), loadMore, loading };
};
