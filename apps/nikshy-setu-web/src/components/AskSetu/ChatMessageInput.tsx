import React, { useState } from 'react';
import { SendBtn } from '../Buttons/Btns';
import { MessageInput } from '../Inputs/FormInput';
import { VoiceSearchModal } from '../VoiceSearchModal/VoiceSearchModal';
interface ChatMessageInputProps {
  onSendMessage?: (v: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
}
export const ChatMessageInput: React.FC<ChatMessageInputProps> = ({
  onSendMessage = () => null,
  disabled = false,
  onBlur = () => null,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [microphoneModal, setMicrophoneModal] = useState(false);

  const handleSend = (event) => {
    event.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const microphoneHandleSubmit = (inputValue) => {
    let newInputValue = disabled ? inputValue : '';
    setMicrophoneModal(false);
    setInputValue(newInputValue);
    if (!disabled) {
      onSendMessage(inputValue);
    }
  };

  const microphoneClick = () => {
    setMicrophoneModal(true);
  };

  return (
    <form onSubmit={handleSend}>
      <div className='flex gap-[12px]'>
        <MessageInput
          placeholder=''
          value={inputValue}
          microphoneClick={microphoneClick}
          onChange={(event) => setInputValue(event.target.value)}
          onBlur={onBlur}
        />
        {microphoneModal && (
          <VoiceSearchModal
            handleSubmit={microphoneHandleSubmit}
            onClose={() => setMicrophoneModal(false)}
          ></VoiceSearchModal>
        )}
        <SendBtn type='submit' disabled={disabled} />
      </div>
    </form>
  );
};
