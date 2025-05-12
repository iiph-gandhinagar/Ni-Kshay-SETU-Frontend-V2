import { useLanguageObject } from '../../utils/HelperHooks';

export const CommonPluginInfoModal = ({ closeModal, text }) => {
  const [langKey, getText, objectToValue] = useLanguageObject();
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-gray-800 text-white p-6 mx-4 rounded-lg shadow-lg w-full max-w-lg'>
        <h2 className='text-lg font-bold mb-4'>
          {getText('K_QUIZ_PLUGIN_INFORMATION')}
        </h2>
        <p className='text-sm leading-6 mb-6 whitespace-pre-wrap'>{text}</p>

        <div className='flex justify-end items-center mt-8'>
          <button
            type='button'
            onClick={closeModal}
            className='btn p-2 text-white bg-gray-500 rounded-lg'
          >
            {getText('APP_CLOSE')}
          </button>
        </div>
      </div>
    </div>
  );
};
