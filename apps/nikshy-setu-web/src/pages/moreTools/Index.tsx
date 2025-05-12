import {
  AdherenceManagementSvg,
  ContactUsSvg,
  CurrentAssessmentSvg,
  KnowledgeBaseBlackSvg,
  KnowledgeQuizSvg,
  ManageTbSvg,
  PastAssessmentSvg,
  QueryResSvg,
  SurveyFormSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import { langKeyForPlugin } from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { RootReducerStates } from '@nikshay-setu-v3-monorepo/types';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // For web navigation
import AdrSvg from '../../assets/svg/AdrSvg';
import DiagnosticCareCascadeSvg from '../../assets/svg/DiagnosticCareCascadeSvg';
import DocumentsSvg from '../../assets/svg/DocumentsSvg';
import GuidelinesSvg from '../../assets/svg/GuidelinesSvg';
import MoreSvg from '../../assets/svg/MoreSvg';
import PDFSvg from '../../assets/svg/PDFSvg';
import RefHealthFacilitiesSvg from '../../assets/svg/RefHealthFacilitiesSvg';
import ScreeningToolSvg from '../../assets/svg/screeningToolSvg';
import TreatmentCareCascadeSvg from '../../assets/svg/TreatmentCareCascadeSvg';
import VideoFileIconSvg from '../../assets/svg/VideoFileIconSvg';
import VideoSvg from '../../assets/svg/VideoSvg';
import { useLanguageObject } from '../../utils/HelperHooks';

const DATA = [
  {
    title: 'Patient Management',
    key: 'DRAWER_PATIENT_MANAGE',
    data: [
      {
        title: 'Screening Tool',
        icon: ScreeningToolSvg,
        navigateTo: '/screening-tool',
      },
      {
        title: 'Diagnostic Cascade',
        icon: DiagnosticCareCascadeSvg,
        navigateTo: '/algorithms?name=Diagnosis Algorithm',
      }, // Assuming this is the correct path; adjust as needed
      {
        title: 'Guidance on ADR',
        icon: AdrSvg,
        navigateTo: '/algorithms?name=Guidance on ADR',
      }, // Assuming this is the correct path; adjust as needed
      {
        title: 'Treatment Cascade',
        icon: TreatmentCareCascadeSvg,
        navigateTo: '/algorithms?name=Treatment Algorithm',
      }, // Assuming this is the correct path; adjust as needed
      {
        title: 'Differentiated Care',
        icon: <img src={AdherenceManagementSvg} />,
        navigateTo: '/algorithms?name=Differentiated Care',
      },
      {
        title: 'Referral Health Facilities',
        icon: RefHealthFacilitiesSvg,
        navigateTo: '/referral-health-facilities',
      }, // Assuming this is the correct path; adjust as needed
    ],
  },
  {
    title: 'Resource Material',
    key: 'DRAWER_RESOURCE_MATERIAL',
    data: [
      {
        title: 'Guidelines',
        icon: GuidelinesSvg,
        navigateTo: '/resource-material',
      },
      {
        title: 'Office Orders',
        icon: PDFSvg,
        navigateTo: '/resource-material',
      },
      { title: 'Videos', icon: VideoSvg, navigateTo: '/resource-material' },
      {
        title: 'Documents',
        icon: DocumentsSvg,
        navigateTo: '/resource-material',
      },
    ],
  },
  {
    title: 'Assessments',
    key: 'APP_ASSESSMENTS',
    data: [
      {
        title: 'Current Assessments',
        icon: <img src={PastAssessmentSvg} />,
        navigateTo: '/quiz',
      },
      {
        title: 'Completed Assessments',
        icon: <img src={CurrentAssessmentSvg} />,
        navigateTo: '/quiz',
      },
    ],
  },
  {
    title: 'Application Interaction',
    key: 'DRAWER_APPLICATION_INTERACTION',
    data: [
      {
        title: 'Survey Form',
        icon: <img src={SurveyFormSvg} />,
        navigateTo: '/survey',
      }, // Assuming this is the correct path; adjust as needed
      {
        title: 'Contact Us',
        icon: <img src={ContactUsSvg} />,
        navigateTo: '/contact-us',
      }, // Assuming this is the correct path; adjust as needed
    ],
  },
];

const MoreTools = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<any[]>([]);
  const dispatch = useDispatch();
  const [langKey, getText, objectToValue] = useLanguageObject();

  useEffect(() => {
    const mapData: any = {
      folder: { icon: GuidelinesSvg, navigateTo: '/resource-material' },
      pdf: { icon: PDFSvg, navigateTo: '/resource-material' },
      video: { icon: VideoSvg, navigateTo: '/resource-material' },
      ppt: { icon: VideoFileIconSvg, navigateTo: '/resource-material' },
      document: { icon: DocumentsSvg, navigateTo: '/resource-material' },
      image: { icon: MoreSvg, navigateTo: '/resource-material' },
    };

    dispatch(
      createAction(
        {
          method: 'GET',
          url: 'RESOURCE_MATERIAL',
        },
        (status, res: any[]) => {
          const resourceData = res?.map((v) => {
            return {
              _id: v?._id,
              title: objectToValue(v?.title),
              nameOfAlgo: objectToValue(v?.title),
              icon: mapData[v?.iconType || 'document'].icon,
              navigateTo: mapData[v?.iconType || 'document'].navigateTo,
            };
          });
          setState((prev) => {
            const newItem = DATA;
            newItem[1].data = resourceData;
            return newItem;
          });
        }
      )
    );

    dispatch(
      createAction<null, null>({
        method: 'GET',
        url: 'HOME_PAGE_INFO',
      })
    );
  }, []);

  const homeRoutes = useSelector(
    (state: RootReducerStates) =>
      state.appContext.data?.homeScreen?.home_page_info?.plugins
  );

  const homeRoutesObject = useMemo(() => {
    return (homeRoutes ?? []).reduce((acc, obj) => {
      acc[obj.title] = obj;
      return acc;
    }, {});
  }, [homeRoutes]);

  return (
    <section className='pt-[48px] pb-[58px]'>
      <div className='lg:max-w-[1012px] mx-auto'>
        <div className='flex flex-col bg-[#F3F5F6] rounded-[20px] p-[20px]'>
          {/* Top Modules */}
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6'>
            {[
              {
                title: 'Knowledge Connect',
                icon: <img src={KnowledgeBaseBlackSvg} />,
                navigateTo: '/knowledge-connect',
              },
              {
                title: 'ManageTB India',
                icon: <img src={ManageTbSvg} />,
                navigateTo: '/manage-tb',
              },
              {
                title: 'Query2COE',
                icon: <img src={QueryResSvg} />,
                navigateTo: '/query-response-management',
              },
              {
                title: 'Knowledge Quiz',
                icon: <img src={KnowledgeQuizSvg} />,
                navigateTo: '/KnowledgeAssessments',
              },
            ].map((item, index) => {
              if (!homeRoutesObject[item.title]) return null;

              return (
                <button
                  key={index}
                  className='flex flex-col items-center p-4 bg-white shadow-md rounded-lg hover:shadow-lg'
                  onClick={() => navigate(item?.navigateTo)}
                >
                  <div className='w-10 h-10  rounded-full flex items-center justify-center mb-2'>
                    {item.icon}
                  </div>
                  <span className='text-sm font-medium'>
                    {getText(langKeyForPlugin[item.title])}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Sections */}
          {state?.map((section, index) => (
            <div key={index} className='mb-6'>
              <h2 className='text-lg font-semibold mb-4 text-gray-700'>
                {getText(section.key)}
              </h2>
              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
                {section?.data?.map((item: any, subIndex: number) => (
                  <button
                    key={subIndex}
                    className='flex flex-col items-center p-4 bg-white shadow-md rounded-lg hover:shadow-lg'
                    onClick={() => {
                      if (section?.title == 'Resource Material') {
                        navigate(
                          `${item.navigateTo}?id=${item?._id}&name=${item?.nameOfAlgo}`
                        );
                      } else if (section?.title == 'Assessments') {
                        if (item?.title == 'Current Assessments') {
                          navigate(`${item?.navigateTo}`, {
                            state: 'Pending',
                          });
                        } else {
                          navigate(`${item?.navigateTo}`, {
                            state: 'Completed',
                          });
                        }
                      } else {
                        navigate(item.navigateTo);
                      }
                    }}
                  >
                    <div className='w-12 h-12 rounded-full flex items-center justify-center mb-2'>
                      {/* SVG Icon */}
                      {section?.title === 'Application Interaction' ? (
                        typeof item.icon === 'function' ? (
                          <item.icon />
                        ) : (
                          item.icon
                        )
                      ) : typeof item.icon === 'function' ? (
                        <item.icon />
                      ) : (
                        item.icon
                      )}
                    </div>
                    <span className='text-sm font-medium'>
                      {langKeyForPlugin[item.title]
                        ? getText(langKeyForPlugin[item.title])
                        : item.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoreTools;
