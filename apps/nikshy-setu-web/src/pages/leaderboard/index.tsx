import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { RootReducerStates } from '@nikshay-setu-v3-monorepo/types';
import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { UserProfileApiResponse } from 'shared/types/src/screens/UserTypes';
import { LeaderboardCard } from '../../components/Cards/LeaderboardCard';
import { AchievementsTab } from '../../components/Leaderboard/AchievementsTab';
import { InformationTab } from '../../components/Leaderboard/InformationTab';
import { LeaderboardTab } from '../../components/Leaderboard/LeaderboardTab';
import TasksTab from '../../components/Leaderboard/TasksTab';
import { LeaderboardTabs } from '../../components/Tabs/Tabs';
import { useLanguageObject } from '../../utils/HelperHooks';

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const { error, data, loadingApis } = useSelector(
    (state: RootReducerStates) => state.appContext
  );
  const profile = data?.user_profile;
  const [langKey, getText, objectToValue] = useLanguageObject();
  const tabs = [
    getText('APP_LEADERBOARD'),
    getText('LEADERBOARD_TASKS'),
    getText('LEADERBOARD_ACHIEVEMENTS'),
    getText('LEADERBOARD_INFORMATION'),
  ];

  useEffect(() => {
    const cookie = new Cookies();
    const userId = cookie.get('userId');
    if (userId) {
      dispatch(
        createAction<null, UserProfileApiResponse>({
          method: 'GET',
          url: 'USER_PROFILE',
          query: userId,
        })
      );
    }
  }, []);

  return (
    <section className='pt-[48px]'>
      <div className='lg:max-w-[1012px] mx-auto'>
        <LeaderboardCard
          profile={profile}
          progress={
            ((profile?.completedTasks / profile?.totalTasks) * 100).toFixed(2) +
            ' ' +
            '%'
          }
          name={profile?.name}
          appPerformanceLevel={profile?.currentLevel}
        />
        <div className='flex flex-wrap text-center mt-4 lg:mt-[58px] space-x-4 lg:space-x-[68px]'>
          {tabs.map((tab, index) => (
            <LeaderboardTabs
              label={tab}
              key={index}
              activeTab={activeTab === index}
              onClick={() => setActiveTab(index)}
            />
          ))}
        </div>
        {activeTab === 0 ? (
          <LeaderboardTab profile={profile} />
        ) : activeTab === 1 ? (
          <TasksTab profile={profile} />
        ) : activeTab === 2 ? (
          <AchievementsTab />
        ) : activeTab === 3 ? (
          <InformationTab />
        ) : null}
      </div>
    </section>
  );
};

export default Leaderboard;
