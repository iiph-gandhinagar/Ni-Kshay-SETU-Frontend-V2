import { useLanguageObject } from '../../utils/HelperHooks';

export const PluginInfoModal = ({
  isOpen,
  text,
  statuses,
  closeModal,
}: any) => {
  const [langKey, getText, objectToValue] = useLanguageObject();
  if (!isOpen) return null;

  const getBorderColor = (status: string) => {
    return status === 'In Progress'
      ? 'bg-yellow-500'
      : status === 'Completed'
      ? 'bg-green-500'
      : 'bg-blue-500';
  };

  const storeName = {
    'In Progress': 'Q2COE_INFO_INPROGRESS',
    Completed: 'APP_COMPLETED',
    Transferred: 'Q2COE_INFO_TRANSFERRED',
  } as const;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-gray-800 text-white p-6 mx-4 rounded-lg shadow-lg w-full max-w-lg'>
        <h2 className='text-lg font-bold mb-4'>
          {getText('K_QUIZ_PLUGIN_INFORMATION')}
        </h2>
        <p className='text-sm leading-6 mb-6 whitespace-pre-wrap'>{text}</p>
        <div className='space-y-2'>
          {statuses.map((status: string) => (
            <div key={status} className='flex items-center'>
              <div
                className={`h-4 w-4 mr-2 rounded-full ${getBorderColor(
                  status
                )}`}
              ></div>
              <span className='text-sm'>{getText(storeName[status])}</span>
            </div>
          ))}
        </div>
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
