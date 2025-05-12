export const OverlayLoader = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-white z-50'>
      <div className='loader' />
      {/* <div className='flex flex-col items-center space-y-4 h-100'>
        <div className='w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin'></div>
        <p className='text-gray-700 font-medium'>Loading, please wait...</p>
      </div> */}
    </div>
  );
};
