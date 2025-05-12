import { toolsDataWeb } from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { RootReducerStates } from '@nikshay-setu-v3-monorepo/types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChatBotHomeCard } from '../../components/Cards/ChatBotCard';
import { NewsFeed } from '../../components/Home/NewsFeed';
import { RelatedApplications } from '../../components/Home/RelatedApplications';
import { Tools } from '../../components/Home/Tools';
import { TopModules } from '../../components/Home/TopModules';
import { RatingModal } from '../../components/Rating/RatingModal';
import { useLanguageObject } from '../../utils/HelperHooks';

const Home = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const homeRoutes = useSelector(
    (state: RootReducerStates) =>
      state.appContext.data?.homeScreen?.home_page_info?.plugins
  );
  const flashNews: any[] = useSelector(
    (state: RootReducerStates) =>
      state.appContext.data?.homeScreen?.home_page_info?.flashNews
  );
  const [langKey, getText, objectToValue] = useLanguageObject();

  useEffect(() => {
    dispatch(
      createAction({
        method: 'GET',
        url: 'HOME_PAGE_INFO',
      })
    );
  }, []);

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return getText('CHAT_GREETINGS_MORNING');
    } else if (currentHour < 18) {
      return getText('CHAT_GREETINGS_AFTERNOON');
    } else {
      return getText('CHAT_GREETINGS_EVENING');
    }
  };

  return (
    <React.Fragment>
      <ChatBotHomeCard
        title={getGreeting()}
        chatBotText={getText('CHAT_HOW_MAY_HELP')}
      />
      <TopModules topModulesData={homeRoutes ?? []} />
      <Tools toolsData={toolsDataWeb} />
      <RelatedApplications />
      <NewsFeed newsFeed={flashNews} />
      <RatingModal onClose={() => setShowModal(false)} isOpen={showModal} />
    </React.Fragment>
  );
};

export default Home;
