import React, { useEffect, useRef, useState } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { CustomModal } from '../Layouts/CustomModal';

type VoiceSearchModalPops = {
  onClose(): void;
  handleSubmit(value: string): void;
};

export const VoiceSearchModal: React.FC<VoiceSearchModalPops> = ({
  onClose,
  handleSubmit,
}) => {
  const { transcript, listening, resetTranscript, ...other } =
    useSpeechRecognition();
  const [isPermissionGranted, setIsPermissionGranted] = useState<
    boolean | null
  >(null);
  const CounterTranscriptRef = useRef({
    submitCount: 0,
    listeningCounter: 0,
    handleSubmitText: () => {},
  });

  // helper
  const checkMicroPhonePermission = () => {
    navigator.permissions
      .query({ name: 'microphone' as any })
      .then((result) => {
        if (result.state === 'granted') {
          setIsPermissionGranted(true);
        } else if (result.state === 'denied') {
          setIsPermissionGranted(false);
        }
      });
  };

  useEffect(() => {
    stopListening();
    startListening();

    return () => {
      stopListening();
    };
  }, []);

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
    checkMicroPhonePermission();
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  //
  useEffect(() => {
    if (isPermissionGranted == false || !listening) return undefined;
    let id = undefined;
    // reset counter
    CounterTranscriptRef.current.submitCount = 0;
    CounterTranscriptRef.current.listeningCounter = 0;

    // stat new counter
    id = setInterval(() => {
      if (transcript) {
        if (CounterTranscriptRef.current.submitCount == 1) {
          clearInterval(id);
          CounterTranscriptRef.current.handleSubmitText();
        }
        // increment counter
        CounterTranscriptRef.current.submitCount =
          CounterTranscriptRef.current.submitCount + 1;
      } else {
        if (CounterTranscriptRef.current.listeningCounter == 3) {
          stopListening();
          clearInterval(id);
        }
        // increment counter
        CounterTranscriptRef.current.listeningCounter =
          CounterTranscriptRef.current.listeningCounter + 1;
      }
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [transcript, listening]);

  CounterTranscriptRef.current.handleSubmitText = () => {
    console.log({ transcript }, 'inside');
    handleSubmit(transcript);
    stopListening();
  };

  return (
    <CustomModal
      showCloseIcon={true}
      closeModal={onClose}
      isOpen={true}
      customClass={{
        modalContainer: '!max-w-[463px] mx-auto',
        modal: '!py-[36px] !px-[28px]',
      }}
    >
      <div className=''>
        <div className='flex justify-center'></div>
        {isPermissionGranted == false && (
          <p className='text-danger text-center'>
            To Ask by voice, go to your browser settings and allow access to
            microphone
          </p>
        )}
        {isPermissionGranted && (
          <>
            {listening && <p>{transcript ? transcript : 'Listening…'}</p>}
            {!listening && <p>Didn't hear that. Try again.</p>}
          </>
        )}

        {/* microphone button */}
        <div className='flex flex-col items-center gap-2 p-4'>
          <div className='relative'>
            {/* Ripple effect circles when listening */}
            {listening && (
              <>
                <div className='absolute inset-0 rounded-full bg-blue-500 opacity-20 animate-ping' />
                <div className='absolute inset-0 rounded-full bg-blue-500 opacity-10 animate-pulse' />
              </>
            )}
            {/* Main button */}
            <div
              className={`relative w-14 h-14 rounded-full flex items-center justify-center cursor-pointer ${
                listening && isPermissionGranted !== false
                  ? 'bg-gray-200'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
              onClick={
                isPermissionGranted == false
                  ? () => null
                  : listening
                  ? stopListening
                  : startListening
              }
            >
              <svg
                viewBox='0 0 24 24'
                className={`w-5 h-5 ${
                  listening ? 'text-gray-600' : 'text-white'
                }`}
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z' />
                <path d='M19 10v2a7 7 0 0 1-14 0v-2' />
                <line x1='12' y1='19' x2='12' y2='23' />
                <line x1='8' y1='23' x2='16' y2='23' />
              </svg>
            </div>
          </div>
        </div>
        {!listening && (
          <p className='text-center'>Tap the microphone to try again</p>
        )}
      </div>
    </CustomModal>
  );
};
