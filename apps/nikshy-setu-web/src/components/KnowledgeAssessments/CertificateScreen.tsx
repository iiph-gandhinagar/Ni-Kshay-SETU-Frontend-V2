import { BASE_URL, Urls } from '@nikshay-setu-v3-monorepo/constants';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useLanguageObject, useURLHook } from '../../utils/HelperHooks';

const CertificateScreen = () => {
  // hooks
  const { getSearchParams } = useURLHook();
  const [id, title] = getSearchParams(['id', 'title']);
  const [langKey, getText] = useLanguageObject();

  //
  const cookie = new Cookies();
  const _url = BASE_URL + Urls.PDF + id;

  // state
  const [loader, setLoader] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const token = cookie.get('token');

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        const response = await axios.get(_url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: 'blob',
        });

        // Create a Blob URL from the PDF data
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      } catch (error) {
        console.error('Error fetching PDF:', error);
      }
    };

    fetchPDF();

    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [token]);

  const downloadPdf = async () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <div className='flex-1 flex justify-center items-center p-4'>
        {pdfUrl && (
          <iframe
            src={pdfUrl}
            title='PDF Viewer'
            className='w-full max-w-4xl h-[70vh] border border-gray-300 rounded-xl'
          />
        )}

        {!pdfUrl && (
          <div className='flex items-center justify-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900'></div>
          </div>
        )}
      </div>
      <button
        title='Download'
        disabled={loader}
        onClick={downloadPdf}
        className={`px-6 py-3 rounded-lg text-white font-semibold shadow-lg transition-transform transform ${
          loader
            ? 'bg-gray-500 cursor-not-allowed'
            : 'bg-blue-700 hover:bg-blue-800'
        }`}
      >
        {getText('APP_DOWNLOAD')}
      </button>
    </div>
  );
};

export default CertificateScreen;
