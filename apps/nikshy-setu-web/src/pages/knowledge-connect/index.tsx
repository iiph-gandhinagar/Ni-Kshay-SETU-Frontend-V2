import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  CourseApiResponse,
  KnowledgeBaseCourseApiResponse,
} from '@nikshay-setu-v3-monorepo/types';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createActivityPayloadAndSendActivity } from 'shared/store/src/user-activity/UserActivity';
import { CoursesCard } from '../../components/Cards/CoursesCard';
import { KnowledgeConnectCard } from '../../components/Cards/KnowledgeConnectCard';
import { useLanguageObject } from '../../utils/HelperHooks';

const KnowledgeConnect = () => {
  const dispatch = useDispatch();
  const [courseTitle, setCourseTitle] = useState<string | undefined>('---');
  const [courseId, setCourseId] = useState<number | undefined>();
  const [data, setData] = useState();
  const dataRef = useRef({ data: [] });
  dataRef.current.data = data;
  const [langKey, getText] = useLanguageObject();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        await dispatch(
          createAction<null, CourseApiResponse>(
            {
              method: 'GET',
              url: 'KBASE_COURSE',
            },
            (status, res: any) => {
              if (status === 200 && Boolean(res?.[0])) {
                setCourseTitle(res?.[0]?.courseTitle);
                fetchChapterContent(res?.[0]?._id.toString());
                setCourseId(res?.[0]?._id.toString());
              } else {
                console.error('Failed to fetch course data');
              }
            }
          )
        );
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    const fetchChapterContent = async (CourseId: string) => {
      try {
        await dispatch(
          createAction<null, KnowledgeBaseCourseApiResponse>(
            {
              method: 'GET',
              url: 'KBASE_CHAPTER_WITH_CONTENT',
              query: CourseId,
            },
            (status, response: any) => {
              if (status === 200) {
                setData(response?.module);
              } else {
                console.error('Failed to fetch chapter content');
              }
            }
          )
        );
      } catch (error) {
        console.error('Error fetching chapter content:', error);
      }
    };

    fetchCourseData();
    // start time interval
    let timeIntervalSubmoduleId;
    clearInterval(timeIntervalSubmoduleId);

    // timer count
    let modal_time = 0;
    timeIntervalSubmoduleId = setInterval(() => {
      modal_time = modal_time + 1;
    }, 1000);

    return () => {
      clearInterval(timeIntervalSubmoduleId);
      const pageData = dataRef.current.data as any;
      const sendData =
        pageData.reduce((acc, { chapter = [] }) => {
          chapter.map(({ contentPage = [] }) => {
            contentPage.map((contentPage) => {
              if (contentPage.isReadContent) acc.push(contentPage);
            });
          });

          return acc;
        }, []) ?? [];

      createActivityPayloadAndSendActivity({
        module: 'Knowledge Connect',
        action: 'Kbase Course Fetched',
        data: { readContent: sendData, timeSpent: modal_time },
      });
    };
  }, []);

  return (
    <React.Fragment>
      <KnowledgeConnectCard title={getText('APP_KNOWLEDGE_CONNECT')} />
      <CoursesCard title={courseTitle} data={data} courseId={courseId} />
    </React.Fragment>
  );
};

export default KnowledgeConnect;
