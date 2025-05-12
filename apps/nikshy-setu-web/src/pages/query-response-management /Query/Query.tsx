import { mingCuteTransfer } from '@nikshay-setu-v3-monorepo/assets';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { RootReducerStates } from '@nikshay-setu-v3-monorepo/types';
import { ChatMessageQuery } from 'apps/nikshy-setu-web/src/components/AskSetu/ChatMessage';
import {
  OutLineBtn,
  SendBtn,
} from 'apps/nikshy-setu-web/src/components/Buttons/Btns';
import { MessageInput } from 'apps/nikshy-setu-web/src/components/Inputs/FormInput';
import TransferQueryModal from 'apps/nikshy-setu-web/src/components/QueryResponseManagement /TransferQueryModal';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { TransferQueryBYSubApiRequest } from 'shared/types/src/screens/Query2COETypes';

export const Query = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const scrollViewRef = useRef(null);
  const { error, data } = useSelector(
    (state: RootReducerStates) => state.appContext
  );
  const [transferDetails, setTransferDetails] = useState({ instituteId: '' });
  const [transferQuery, setTransferQuery] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const query = location.state?.query || {};
  const userType = location.state?.userType || '';
  const disableOption = location.state?.disableOption || false;
  const queryCreatedAt = new Date(query?.createdAt);
  const queryUpdatedAt = new Date(query?.updatedAt);
  const queryCreatedAtFormattedDate = `${queryCreatedAt?.getUTCDate()}/${
    queryCreatedAt?.getUTCMonth() + 1
  }/${queryCreatedAt.getUTCFullYear()}`;
  const queryUpdatedAtFormattedDate = `${queryUpdatedAt?.getUTCDate()}/${
    queryUpdatedAt?.getUTCMonth() + 1
  }/${queryUpdatedAt.getUTCFullYear()}`;
  const dateOfAdmission =
    query.dateOfAdmission && new Date(query.dateOfAdmission);

  const [messages, setMessages] = useState([
    {
      message: (
        <div className='flex flex-col p-4 bg-white shadow-md rounded-lg'>
          <p className='font-bold text-lg mb-2'>Summary</p>
          <p className='mb-1'>
            <strong>Age: </strong>
            {query.age || '---'}
          </p>
          <p className='mb-1'>
            <strong>Gender: </strong>
            {query.sex || '---'}
          </p>
          <p className='mb-1'>
            <strong>Current diagnosis: </strong>
            {query.diagnosis || '---'}
          </p>
          <p className='mb-1'>
            <strong>Date of admission: </strong>
            {dateOfAdmission
              ? `${dateOfAdmission.getUTCDate()}/${
                  dateOfAdmission.getUTCMonth() + 1
                }/${dateOfAdmission.getUTCFullYear()}`
              : '---'}
          </p>
          <p className='mb-1'>
            <strong>Chief complaint: </strong>
            {query.chiefComplaint || '---'}
          </p>
          <p className='mb-1'>
            <strong>Concerns and issues: </strong>
            {query.query || '---'}
          </p>
          <p className='mb-1'>
            <strong>History of present illness: </strong>
            {query.illness || '---'}
          </p>
          <p className='mb-1'>
            <strong>Past history/follow-up: </strong>
            {query.pastHistory || '---'}
          </p>
          <p className='mb-1'>
            <strong>Pre Treatment Evaluation: </strong>
            {query.preTreatmentEvaluation || '---'}
          </p>
          <p className='mb-1'>
            <strong>Current Treatment Plan: </strong>
            {query.currentTreatmentPlan || '---'}
          </p>
        </div>
      ),
      time: queryCreatedAtFormattedDate,
      self: userType === 'DRTB',
      status: 'Sent',
    },
  ]);

  useEffect(() => {
    if (
      query.status === 'completed' &&
      !messages.some((m) => m.status === 'completed')
    ) {
      setMessages((prev) => [
        ...prev,
        {
          message: query?.response,
          time: queryUpdatedAtFormattedDate,
          self: userType === 'COE' || userType === 'NODAL',
          status: 'completed',
        },
      ]);
    }
  }, [
    query.status,
    query.response,
    queryUpdatedAtFormattedDate,
    messages,
    userType,
  ]);

  const handleSendMessage = useCallback(() => {
    if (newMessage.trim()) {
      dispatch(
        createAction(
          {
            method: 'PATCH',
            url: 'QUERY',
            query: '/' + location?.state?.query?._id,
            data: {
              response: newMessage,
              respondedBy: location.state?.respondedBy,
              queryRespondedRole: location.state?.queryRespondedRole,
              queryRespondedInstitute: location.state?.queryRespondedInstitute,
            },
          },
          (code, res) => {
            if (code === 200) {
              setMessages((prev) => [
                ...prev,
                {
                  message: <span>{newMessage}</span>,
                  time: 'Just now',
                  self: true,
                  status: 'sent',
                },
              ]);
              setNewMessage('');
              scrollViewRef.current?.scrollTo(
                0,
                scrollViewRef.current.scrollHeight
              );

              navigate('/query-response-management');
            }
          }
        )
      );
    }
  }, [newMessage, dispatch, location]);

  const isQueryClosed = query?.status === 'completed';
  const showInstitute =
    !disableOption && !(userType === 'DRTB') && !isQueryClosed;
  useEffect(() => {
    if (showInstitute)
      dispatch(
        createAction({
          method: 'GET',
          url: 'INSTITUTE_LIST',
        })
      );
  }, []);
  const userId = new Cookies().get('userId');
  const uniqueMessages = Array.from(
    new Map(messages.map((msg) => [msg.status, msg])).values()
  );

  const isSelf = query?.raisedBy?._id == userId;
  return (
    <section className='pt-[48px] pb-[58px] h-full'>
      <div className='lg:max-w-[1012px] mx-auto h-full flex flex-col'>
        <div className='flex-1 flex flex-col gap-[24px]'>
          {/* Header */}
          <div className='h-[72px] flex items-center justify-between'>
            <h6 className='text-[#409BBB] font-normal text-[18px]'>
              Query id ({query.queryId})
            </h6>
            <div className='relative'>
              {!(userType === 'COE') && showInstitute && (
                <OutLineBtn
                  color='gary'
                  customClassName='gap-[8px] h-[52px] px-[28px] py-[14px]'
                  onClick={() => setTransferQuery(!transferQuery)}
                >
                  <img src={mingCuteTransfer} alt='Transfer Icon' /> Transfer
                  Query
                </OutLineBtn>
              )}
              <TransferQueryModal
                options={data?.query2coe?.institute_list
                  ?.filter(
                    (v) => !(v._id === location.state?.queryRespondedInstitute)
                  )
                  ?.map((item) => {
                    return { label: item.title, value: item._id };
                  })}
                value={{ value: transferDetails.instituteId, label: '' }}
                onChange={(v) => {
                  setTransferDetails({ instituteId: v?.value });
                }}
                isOpen={transferQuery}
                onClose={() => setTransferQuery(false)}
                onSubmit={() => {
                  dispatch(
                    createAction<TransferQueryBYSubApiRequest, unknown>(
                      {
                        method: 'POST',
                        url: 'TRANSFER_QUERY_BY_SUBS',
                        data: {
                          instituteId: transferDetails.instituteId,
                          questions: [location.state?.query?._id],
                        },
                      },
                      (code, res) => {
                        if (code === 200) {
                          setTransferQuery(false);
                          navigate('/query-response-management');
                        }
                      }
                    )
                  );
                }}
              />
            </div>
          </div>

          {/* Chat Messages */}
          <div
            className='flex-1 max-h-[560px] overflow-auto hide-scrollbar flex flex-col gap-[24px]'
            ref={scrollViewRef}
          >
            {uniqueMessages.map((message, index) => (
              <ChatMessageQuery
                key={index}
                sender={message.self ? 'You' : 'Responder'}
                timestamp={message.time}
              >
                {message.message}
              </ChatMessageQuery>
            ))}
          </div>

          {/* Message Input */}
          {query.status !== 'completed' && userType !== 'DRTB' && !isSelf && (
            <div className='flex items-center gap-[16px] sticky bottom-0 bg-white p-4'>
              <MessageInput
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder='Type your message here...'
              />
              <SendBtn onClick={handleSendMessage} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
