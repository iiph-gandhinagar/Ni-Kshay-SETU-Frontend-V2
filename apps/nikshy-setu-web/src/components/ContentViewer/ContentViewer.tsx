import { STORE_URL } from '@nikshay-setu-v3-monorepo/constants';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ContentViewer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { contentType, url, fileType, header } = location.state || {};
  const [loading, setLoading] = useState(true); // Loading state for PDF

  const handleLoad = () => {
    setLoading(false); // Hide the loading spinner when content is loaded
  };

  const renderContent = () => {
    switch (contentType) {
      case 'pdfs': // PDFs
        return (
          <div className='relative w-full h-screen'>
            {loading && (
              <div className='absolute inset-0 flex justify-center items-center bg-white bg-opacity-50 z-10'>
                <div className='w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin'></div>
                <p className='text-lg text-gray-500 ml-3'>Loading...</p>
              </div>
            )}
            <iframe
              src={
                'https://mozilla.github.io/pdf.js/web/viewer.html?file=' +
                STORE_URL +
                url
              }
              className='w-full h-screen border-none'
              title={header}
              onLoad={handleLoad} // Hide loader when PDF is loaded
            ></iframe>
          </div>
        );
      case 'images': // PDFs
        return (
          <div className='relative w-full h-screen'>
            <img
              src={STORE_URL + url}
              className='h-max w-max m-10'
              alt='image'
              onError={(e) => console.error('Image failed to load:', e)}
              onLoad={handleLoad} // Hide loader when PDF is loaded
            />
          </div>
        );
      case 'pdf_office_orders': // PDFs
        return (
          <div className='relative w-full h-screen'>
            {loading && (
              <div className='absolute inset-0 flex justify-center items-center bg-white bg-opacity-50 z-10'>
                <div className='w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin'></div>
                <p className='text-lg text-gray-500 ml-3'>Loading...</p>
              </div>
            )}
            <iframe
              src={
                'https://mozilla.github.io/pdf.js/web/viewer.html?file=' +
                STORE_URL +
                url
              }
              className='w-full h-screen border-none'
              title={header}
              onLoad={handleLoad} // Hide loader when PDF is loaded
            ></iframe>
          </div>
        );
      case 'videos': // Videos
        return (
          <div className='flex justify-center mt-[100px]'>
            <video
              className='w-3/4 h-auto'
              controls
              src={STORE_URL + url}
              title={header}
            ></video>
          </div>
        );
      case 'ppt': // PowerPoint (embedded via Google Docs)
        return (
          <div className='relative w-full h-screen'>
            <iframe
              src={`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
                STORE_URL + url
              )}`}
              className='w-full h-screen border-none'
              title={header}
            ></iframe>
          </div>
        );
      default:
        return (
          <div className='flex justify-center items-center w-full h-screen text-center'>
            <p className='text-gray-500'>
              Unsupported file type or content. Please contact support.
            </p>
          </div>
        );
    }
  };

  return (
    <section className='pt-[48px] pb-[58px]'>
      <div className='lg:max-w-[1012px] mx-auto'>
        <div className='p-4 bg-white shadow'>
          <button
            onClick={() => navigate(-1)}
            className='text-blue-500 hover:underline'
          >
            Back
          </button>
          <h1 className='text-lg font-semibold text-gray-800'>{header}</h1>
        </div>
        {renderContent()}
      </div>
    </section>
  );
};

export default ContentViewer;
