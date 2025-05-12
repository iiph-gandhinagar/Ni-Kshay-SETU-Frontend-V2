import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { useLanguageObject } from 'apps/nikshy-setu-web/src/utils/HelperHooks';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconButton, OutLineBtn } from '../../../components/Buttons/Btns';

const KnowledgeConnectDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [langKey, getText, objectToValue] = useLanguageObject();

  const contentData = location?.state?.currentChapter;
  const index = location?.state?.ind;
  const courseId = location?.state?.courseId;
  const chapterId = location?.state?.chapterId;
  const moduleId = location?.state?.moduleId;

  useEffect(() => {
    if (!contentData) {
      navigate('/knowledge-connect');
    }
  }, []);

  const [currentIndex, setCurrentIndex] = useState<number>(index);
  const currentContent = contentData?.[currentIndex];

  const nextContent = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % contentData.length);
  };

  const prevContent = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + contentData.length) % contentData.length
    );
  };

  useEffect(() => {
    dispatch(
      createAction({
        method: 'POST',
        url: 'KBASE_READ_CONTENT',
        data: {
          courseId: courseId,
          moduleId: moduleId,
          chapterId: chapterId,
          contentId: currentContent?.contentId,
        },
      })
    );
  }, [currentContent]);

  if (!contentData) return null;

  return (
    <section className='py-[48px]'>
      <div className='lg:max-w-[1012px] mx-auto'>
        <div className='flex gap-3 flex-wrap items-center'>
          <OutLineBtn
            onClick={() => {
              navigate('/knowledge-connect');
            }}
            customClassName='!border-[#B0B0B0] mb-2 text-[20px] font-medium !text-[#4D4D4D]'
          >
            {getText('APP_BACK')}
          </OutLineBtn>
          <div
            className='content mb-4 text-gray-700 mx-auto'
            dangerouslySetInnerHTML={{
              __html: contentData?.[currentIndex]?.contentTitle,
            }}
          ></div>
        </div>

        <div className='relative mb-6'>
          <iframe
            src={`https://ntep.in/h5p/${currentContent.h5pIds}/embed`}
            className='w-full h-[600px] mx-auto rounded-xl shadow-lg border-2 border-gray-300'
            frameBorder='0'
            allowFullScreen
          ></iframe>
        </div>

        <div className='flex justify-between mt-6'>
          <IconButton
            previousBtn
            onClick={prevContent}
            disabled={currentIndex === 0}
            className='btn btn-purple btn-outline'
            title={getText('APP_PREVIOUS')}
          />

          <IconButton
            nextBtn
            onClick={nextContent}
            disabled={currentIndex === contentData.length - 1}
            className='btn btn-purple'
            title={getText('APP_NEXT')}
          />
        </div>
      </div>
    </section>
  );
};

export default KnowledgeConnectDetails;
