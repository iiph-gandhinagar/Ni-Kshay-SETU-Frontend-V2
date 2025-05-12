import { CircleCheckSvg } from '@nikshay-setu-v3-monorepo/assets';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguageObject } from '../../utils/HelperHooks';
import { FadeUpAnimation } from '../Animations/Animations';
import { ProgressBar } from '../progress/ProgressBar';

interface CoursesCardProps {
  title?: string;
  data?: any[];
  courseId?: number;
}

export const CoursesCard: React.FC<CoursesCardProps> = ({
  title = '',
  data = [],
  courseId,
}) => {
  const [openItems, setOpenItems] = useState<number[]>([]); // Tracks opened modules
  const [openChapters, setOpenChapters] = useState<number[]>([]); // Tracks opened chapters
  const navigate = useNavigate();
  const [currentChapter, setCurrenChapter] = useState<any>();
  const [langKey, getText, objectToValue] = useLanguageObject();
  // Toggle module visibility
  const toggleContent = (id: string) => {
    if (openItems.includes(Number(id))) {
      setOpenItems(openItems.filter((item) => item !== Number(id)));
    } else {
      setOpenItems([...openItems, Number(id)]);
    }
  };

  // Toggle chapter visibility
  const toggleChapter = (id: string) => {
    if (openChapters.includes(Number(id))) {
      setOpenChapters(openChapters.filter((chapter) => chapter !== Number(id)));
    } else {
      setOpenChapters([...openChapters, Number(id)]);
    }
  };

  // Handle chapter redirection
  const handleChapterClick = (chapterId: string) => {
    toggleChapter(chapterId); // Open or close the content page menu for the chapter
  };
  const [chapterId, setChapterId] = useState<number>();
  const [moduleId, setModuleId] = useState<number>();

  return (
    <section className='pb-4'>
      <div className='lg:max-w-[1012px] mx-auto'>
        {data.length == 0 && <NoDataCard />}
        {data.length > 0 && (
          <div className='bg-LIGHT_BLUE_E9F1FF p-5 rounded-2xl'>
            <div className='flex justify-between items-center mb-3'>
              <div className=''>
                <h6 className='font-semibold leading-[24px]'>
                  {getText('APP_KNOWLEDGE_CONNECT_TITLE')}
                </h6>
              </div>
              {/* <img src={ArrowRoundedSvg} alt='Arrow' /> */}
            </div>
            <ProgressBar data={data} />
            <div className='timeline-container pt-3 space-y-[12px]'>
              <AnimatePresence>
                {data.map((item: any, i: number) => (
                  <FadeUpAnimation delay={i * 0.1} key={item.moduleId}>
                    <div
                      className={`timeline-item ${
                        openItems.includes(Number(item.moduleId))
                          ? 'pb-[12px]'
                          : ''
                      }`}
                    >
                      <div className='flex items-center'>
                        {item.isModuleRead ? (
                          <div className='w-2 h-2 bg-[#48BB7C] rounded-full shrink-0'></div>
                        ) : (
                          <div className='w-2 h-2 bg-VIOLET_696CC3 rounded-full shrink-0'></div>
                        )}
                        <div className='ml-[8px] flex items-center'>
                          <h3
                            onClick={() => {
                              setModuleId(item.moduleId);
                              toggleContent(item.moduleId);
                            }}
                            className='text-[18px] font-medium cursor-pointer text-GREY_808080 leading-[25.2px]'
                          >
                            {item.moduleTitle?.split(':').slice(1)}
                          </h3>
                        </div>
                      </div>
                      {openItems.includes(Number(item.moduleId)) && (
                        <div className='mt-[12px] border-l-2 border-GREY_A2A2A2 pl-2 flex flex-col space-y-[12px]'>
                          {item.chapter.map((chapter: any, index: number) => (
                            <div key={chapter.chapterId}>
                              <span
                                className='text-[16px] text-VIOLET_696CC3 leading-[22.4px] cursor-pointer'
                                onClick={() => {
                                  setCurrenChapter(chapter.contentPage);
                                  setChapterId(chapter.chapterId);
                                  handleChapterClick(chapter.chapterId);
                                }}
                              >
                                <span className='flex items-center text-base font-medium text-gray-700 py-1 pl-4 transition-colors duration-300 cursor-pointer hover:text-blue-600'>
                                  {chapter.isChapterRead && (
                                    <img
                                      src={CircleCheckSvg}
                                      alt='Completed'
                                      className='mr-2 w-4 h-4'
                                    />
                                  )}
                                  {index + 1}.{' '}
                                  {chapter.chapterTitle?.split(':').slice(1)}
                                </span>
                              </span>
                              {openChapters.includes(
                                Number(chapter.chapterId)
                              ) && (
                                <div className='mt-[8px] pl-4 flex flex-col space-y-[8px]'>
                                  {chapter.contentPage.map(
                                    (content: any, ind: number) => (
                                      <span
                                        key={content.contentId}
                                        className='text-[14px] text-green-700 leading-[20px] cursor-pointer'
                                        onClick={() =>
                                          navigate(
                                            `/knowledge-connect/${content.h5pIds}`,
                                            {
                                              state: {
                                                currentChapter,
                                                ind,
                                                courseId,
                                                chapterId,
                                                moduleId,
                                              },
                                            }
                                          )
                                        }
                                      >
                                        <span
                                          style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            fontSize: '16px',
                                            fontWeight: '500',
                                            color: '#333',
                                          }}
                                        >
                                          {content.isReadContent ? (
                                            <img
                                              src={CircleCheckSvg}
                                              alt='Completed'
                                              style={{
                                                marginRight: '8px',
                                                width: '16px',
                                                height: '16px',
                                              }}
                                            />
                                          ) : (
                                            <span
                                              style={{
                                                marginRight: '8px',
                                                color: '#999',
                                              }}
                                            >
                                              -
                                            </span>
                                          )}
                                          {content.contentTitle}
                                        </span>
                                      </span>
                                    )
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </FadeUpAnimation>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const NoDataCard = () => {
  return (
    <div className='p-5'>
      <p className='md:text-xl text-center'>
        Thank you for your interest! The course for your cadre is currently
        under development. We are working hard to make it available soon. Stay
        tuned, and we appreciate your patience as we prepare this content for
        you.
      </p>
    </div>
  );
};
