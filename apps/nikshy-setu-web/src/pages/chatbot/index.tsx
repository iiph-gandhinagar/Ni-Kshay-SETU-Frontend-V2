import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { RootReducerStates } from '@nikshay-setu-v3-monorepo/types';
import { useEffect } from 'react';
import { Cookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createActivityPayloadAndSendActivity } from 'shared/store/src/user-activity/UserActivity';
import { UserProfileApiResponse } from 'shared/types/src/screens/UserTypes';
import { ChatMessageInput } from '../../components/AskSetu/ChatMessageInput';
import { MessageList } from '../../components/AskSetu/MessageList';
import { ChatBotHomeCard } from '../../components/Cards/ChatBotCard';
import { useLanguageObject } from '../../utils/HelperHooks';

const ChatPage = () => {
  const userName = useSelector(
    (state: RootReducerStates) => state.appContext.data?.user_profile?.name
  );
  const cookies = new Cookies();
  const userId = cookies.get('userId');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionId = useSelector(
    (state: RootReducerStates) => state.appContext.data?.chatScreen?.sessionId
  );
  const [langKey, getText, objectToValue] = useLanguageObject();

  const handleSendMessage = (text: string) => {
    if (text.trim()) {
      createActivityPayloadAndSendActivity({
        module: 'Chatbot',
        action: 'Search By Keyword Fetched',
      });
      navigate(`/ask-setu?sessionId=${sessionId}&question=${text.trim()}`);
    }
  };
  useEffect(() => {
    if (userId) {
      dispatch(
        createAction<null, UserProfileApiResponse>({
          method: 'GET',
          url: 'USER_PROFILE',
          query: userId,
        })
      );
    }
  }, []);
  return (
    <section className=''>
      <div className='chat-screen lg:max-w-[1012px] mx-auto flex flex-col h-[730px]'>
        <ChatBotHomeCard
          showHistoryIcon
          showSearchbar={false}
          title={`${getText('CHAT_GREETINGS_HELLO')} ${userName || ''} !`}
          chatBotText={getText('CHAT_DEC_ONE')}
          titleClassName='text-[38px] leading-7'
          chatBotTextClassName='text-base leading-[25.91px] mt-[12px]'
        />
        <MessageList />
        <ChatMessageInput onSendMessage={handleSendMessage} />
      </div>
    </section>
  );
};

export default ChatPage;
