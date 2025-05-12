import React from 'react';
import { useLanguageObject } from '../../utils/HelperHooks';
import { ChatOptions } from './ChatOptions';
interface MessageListProps {
  messages?: Array<{
    id: number;
    text: string;
    sender: string;
    timestamp: Date;
  }>;
  messagesEndRef?: React.LegacyRef<HTMLDivElement> | undefined;
}
export const MessageList: React.FC<MessageListProps> = ({
  messages,
  messagesEndRef,
}) => {
  const [langKey, getText, objectToValue] = useLanguageObject();
  return (
    <div className='message-list flex flex-col mb-10 overflow-y-auto overflow-x-hidden hide-scrollbar'>
      <ChatOptions
        text={getText('APP_CHATBOT_CHOOSE_TOPIC_OR_YOUR_QUEST_HERE')}
      />
      <div ref={messagesEndRef} />
    </div>
  );
};
