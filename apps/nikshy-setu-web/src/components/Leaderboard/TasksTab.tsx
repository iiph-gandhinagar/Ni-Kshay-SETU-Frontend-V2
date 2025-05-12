import {
  AdvancedBeginnerActiveSvg,
  AdvancedBeginnerDisableSvg,
  AdvancedBronzeSvg,
  AdvancedGoldSvg,
  AdvancedSilverSvg,
  BeginnerActiveSvg,
  BeginnerBronzeSvg,
  BeginnerDisableSvg,
  BeginnerGoldSvg,
  BeginnerSilverSvg,
  CompetentActiveSvg,
  CompetentBronzeSvg,
  CompetentDisableSvg,
  CompetentGoldSvg,
  CompetentSilverSvg,
  ExpertActiveSvg,
  ExpertBronzeSvg,
  ExpertDisableSvg,
  ExpertGoldSvg,
  ExpertSilverSvg,
  PendingTaskSvg,
  ProficientActiveSvg,
  ProficientBronzeSvg,
  ProficientDisableSvg,
  ProficientGoldSvg,
  ProficientSilverSvg,
  TaskSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { RootReducerStates } from '@nikshay-setu-v3-monorepo/types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLanguageObject } from '../../utils/HelperHooks';
import { TasksAccordion } from '../Accordion/Accordion';
import { LeaderboardTaskCard } from '../Cards/LeaderboardTaskCard';

const levelOrder = [
  'Beginner',
  'Advanced Beginner',
  'Competent',
  'Proficient',
  'Expert',
];
const badges = ['Bronze', 'Silver', 'Gold'];
const langKeyBadge = {
  Bronze: 'LEVEL_BRONZE',
  Silver: 'LEVEL_SILVER',
  Gold: 'LEVEL_GOLD',
};

type Level =
  | 'Beginner'
  | 'Advanced Beginner'
  | 'Competent'
  | 'Proficient'
  | 'Expert';

type Task = {
  [key in Level]: {
    activeIcon: string;
    disableIcon: string;
    Silver: string;
    Bronze: string;
    Gold: string;
    activeLogoWhen: string[];
    label: string;
  };
};

const taskData: Task = {
  Beginner: {
    activeIcon: BeginnerActiveSvg,
    disableIcon: BeginnerDisableSvg,
    activeLogoWhen: [
      'Beginner',
      'Advanced Beginner',
      'Competent',
      'Proficient',
      'Expert',
    ],
    Bronze: BeginnerBronzeSvg,
    Silver: BeginnerSilverSvg,
    Gold: BeginnerGoldSvg,
    label: 'LEVEL_BEGINNER',
  },
  'Advanced Beginner': {
    activeIcon: AdvancedBeginnerActiveSvg,
    disableIcon: AdvancedBeginnerDisableSvg,
    activeLogoWhen: ['Advanced Beginner', 'Competent', 'Proficient', 'Expert'],
    Bronze: AdvancedBronzeSvg,
    Silver: AdvancedSilverSvg,
    Gold: AdvancedGoldSvg,
    label: 'LEVEL_ADVANCED',
  },
  Competent: {
    activeIcon: CompetentActiveSvg,
    disableIcon: CompetentDisableSvg,
    activeLogoWhen: ['Competent', 'Proficient', 'Expert'],
    Bronze: CompetentBronzeSvg,
    Silver: CompetentSilverSvg,
    Gold: CompetentGoldSvg,
    label: 'LEVEL_COMPETENT',
  },
  Proficient: {
    activeIcon: ProficientActiveSvg,
    disableIcon: ProficientDisableSvg,
    activeLogoWhen: ['Proficient', 'Expert'],
    Bronze: ProficientBronzeSvg,
    Silver: ProficientSilverSvg,
    Gold: ProficientGoldSvg,
    label: 'LEVEL_PROFICIENT',
  },
  Expert: {
    activeIcon: ExpertActiveSvg,
    disableIcon: ExpertDisableSvg,
    activeLogoWhen: ['Expert'],
    Bronze: ExpertBronzeSvg,
    Silver: ExpertSilverSvg,
    Gold: ExpertGoldSvg,
    label: 'LEVEL_EXPERT',
  },
};

const TasksTab: React.FC<any> = ({ profile }) => {
  const [openSectionIndex, setOpenSectionIndex] = useState<number | null>(null);
  const [langKey, getText, objectToValue] = useLanguageObject();
  const { data } = useSelector((state: RootReducerStates) => state.appContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(createAction({ method: 'GET', url: 'SUBSCRIBER_PROGRESS' }));
  }, [dispatch]);

  const handleToggle = (index: number) => {
    setOpenSectionIndex(openSectionIndex === index ? null : index);
  };

  const sortedData = data?.leaderboard?.subscriber_progress?.sort(
    (a: any, b: any) =>
      levelOrder.indexOf(a.level) - levelOrder.indexOf(b.level)
  );
  const activeLevel =
    (data?.user_profile?.currentLevel as string) || 'Beginner';
  const activeBadge = data?.user_profile?.currentBadge || 'Bronze';

  const isActiveLevelIndex = levelOrder.findIndex(
    (level) => level == activeLevel
  );
  const isActiveBadgeIndex = badges.findIndex((badge) => badge == activeBadge);

  return (
    <div className='space-y-8'>
      <div className='flex flex-wrap gap-6 mt-3'>
        <div className='bg-white p-4 rounded-lg shadow-md flex items-center gap-4'>
          <div className='bg-green-500 p-3 rounded-full'>
            <img src={TaskSvg} alt='Tasks Completed' />
          </div>
          <div>
            <h6 className='text-lg font-semibold'>{profile?.completedTasks}</h6>
            <p className='text-gray-500 text-sm'>{getText('APP_COMPLETED')}</p>
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg shadow-md flex items-center gap-4'>
          <div className='bg-red-500 p-3 rounded-full'>
            <img src={PendingTaskSvg} alt='Pending Tasks' />
          </div>
          <div>
            <h6 className='text-lg font-semibold'>{profile?.pendingTasks}</h6>
            <p className='text-gray-500 text-sm'>{getText('APP_PENDING')}</p>
          </div>
        </div>
      </div>

      <div className='bg-gray-200 p-6 rounded-lg space-y-4'>
        {sortedData?.map((section: any, index: number) => {
          let isActiveLevel = isActiveLevelIndex < index ? false : true;

          return (
            <TasksAccordion
              key={index}
              title={getText(taskData[section.level].label)}
              isActive={isActiveLevel}
              onClick={() => handleToggle(index)}
              isOpen={openSectionIndex === index}
              imgSrc={
                taskData[section?.level]?.activeLogoWhen?.includes(activeLevel)
                  ? taskData[section.level]?.activeIcon
                  : taskData[section?.level]?.disableIcon
              }
            >
              {openSectionIndex === index && (
                <div
                  style={{
                    opacity: isActiveLevel ? 1 : 0.5,
                  }}
                  className='flex gap-4 overflow-x-scroll hide-scrollbar py-4'
                >
                  {section?.tasksProgress
                    ?.sort((a, b) => {
                      return (
                        badges.indexOf(a.badge_name) -
                        badges.indexOf(b.badge_name)
                      );
                    })
                    .map((task) => {
                      // disable badge
                      let isActiveBadge =
                        isActiveLevelIndex == index
                          ? isActiveBadgeIndex >=
                            badges.findIndex(
                              (badge) => badge == task.badge_name
                            )
                          : isActiveLevelIndex < index
                          ? false
                          : true;
                      console.log({ task, taskData });
                      return (
                        <LeaderboardTaskCard
                          data={task?.progress}
                          key={task?.badge_name}
                          name={getText(langKeyBadge[task?.badge_name])}
                          fromBgColor={
                            task?.badge_name === 'Bronze'
                              ? '#CD7F32'
                              : task?.badge_name === 'Silver'
                              ? '#C0C0C0'
                              : task?.badge_name === 'Gold'
                              ? '#E29B2F'
                              : ''
                          }
                          toBgColor={
                            task?.badge_name === 'Bronze'
                              ? '#CD7F3280'
                              : task?.badge_name === 'Silver'
                              ? '#C0C0C080'
                              : task?.badge_name === 'Gold'
                              ? '#E29B2F80'
                              : ''
                          }
                          medalIcon={
                            taskData[section?.level]?.[task?.badge_name]
                          }
                          fromOffset='43%'
                          toOffset='85%'
                          isActiveBadge={isActiveBadge}
                        />
                      );
                    })}
                </div>
              )}
            </TasksAccordion>
          );
        })}
      </div>
    </div>
  );
};

export default TasksTab;
