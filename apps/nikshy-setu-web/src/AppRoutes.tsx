import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { AppConfigDetails } from '@nikshay-setu-v3-monorepo/types';
import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import ContentViewer from './components/ContentViewer/ContentViewer';
import CertificateScreen from './components/KnowledgeAssessments/CertificateScreen';
import { QuizViewResult } from './components/KnowledgeAssessments/QuizViewResult';
import { SetGoalAskModal } from './components/KnowledgeAssessments/SetGoalAskModal';
import { PageLayOut } from './components/Layouts/SideBar/PageLayOut';
import LandingPage from './pages';
import { AboutUs } from './pages/about-us';
import Account from './pages/account';
import Algorithm from './pages/algorithms';
import AlgorithmView from './pages/algorithms/[slug]';
import { ApplicationLanguage } from './pages/ApplicationLanguage/ApplicationLanguage';
import { Blogs } from './pages/blogs';
import { BlogsDetails } from './pages/blogs/[slug]';
import ChatPage from './pages/chatbot';
import { AskSetu } from './pages/chatbot/ask-setu';
import { ChatHistory } from './pages/chatbot/History';
import ContactUs from './pages/contactUs/Index';
import { Dashboard } from './pages/dashboard';
import { DeleteAccount } from './pages/DeleteAccount/DeleteAccount';
import { DeleteAccountPublic } from './pages/deleteAccountPublic/deleteAccountPublic';
import { Disclaimer } from './pages/disclaimer';
import Home from './pages/home';
import KnowledgeAssessments from './pages/knowledge-assessments';
import KnowledgeAssessmentsQuizQuestion from './pages/knowledge-assessments-quiz-question/index';
import KnowledgeQuiz from './pages/knowledge-assessments-quiz-welcome/index';
import Quiz from './pages/knowledge-assessments-quiz/index';
import KnowledgeConnect from './pages/knowledge-connect';
import KnowledgeConnectDetails from './pages/knowledge-connect/[slug]';
import { LabInvestigationResult } from './pages/LabInvestigation/LabInvestigationResult';
import Leaderboard from './pages/leaderboard';
import ManageTB from './pages/manage-tb';
import ManageTBForm from './pages/manage-tb-form';
import ManageTBPrescription from './pages/manage-tb-prescription';
import MoreTools from './pages/moreTools/Index';
import { PrivacyPolicy } from './pages/privacy-policy';
import QueryResponseManagement from './pages/query-response-management ';
import { Query } from './pages/query-response-management /Query/Query';
import { RaiseClinicalQuery } from './pages/query-response-management /raise-clinical-query/RaiseClinicalQuery';
import { TrackQuery } from './pages/query-response-management /TrackQuery/TrackQuery';
import ReferralHealthFacilities from './pages/referral-health-facilities';
import ReferralHealthFacilitiesList from './pages/referral-health-facilities/list';
import Index from './pages/resource-material/Index';
import { ScreeningTool } from './pages/screening-tool';
import NextStepForPresCase from './pages/screening-tool/NextStepForPreCase';
import NutritionOutcome from './pages/screening-tool/NutritionOutcome';
import Result from './pages/screening-tool/Result';
import { Survey } from './pages/survey-form';

const PrivetRotes = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const userID = cookies.get('userId');
  const userGoal = cookies.get('goal');

  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    if (!userID) {
      navigate('/');
    }

    dispatch(
      createAction<null, AppConfigDetails>({
        method: 'GET',
        url: 'APP_CONFIG_DETAILS',
      })
    );
    let IntervalID = undefined;
    IntervalID = setInterval(() => {
      if (userGoal) {
        clearInterval(IntervalID);
      } else if (!isModalVisible) {
        setIsModalVisible(true);
      }
    }, 15 * 60 * 1000);

    return () => {
      clearInterval(IntervalID);
    };
  }, []);
  return (
    <>
      {userID && <Outlet />}
      <SetGoalAskModal
        isOpen={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      ></SetGoalAskModal>
    </>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/blogs' element={<Blogs />} />
      <Route path='/blogs/:slug' element={<BlogsDetails />} />
      <Route path='/about-us' element={<AboutUs />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/disclaimer' element={<Disclaimer />} />
      <Route path='/privacy-policy' element={<PrivacyPolicy />} />
      <Route path='/delete-account' element={<DeleteAccountPublic />} />

      <Route element={<PrivetRotes />}>
        <Route
          path='/home'
          element={
            <PageLayOut>
              <Home />
            </PageLayOut>
          }
        />
        <Route
          path='/account'
          element={
            <PageLayOut>
              <Account />
            </PageLayOut>
          }
        />
        <Route
          path='/ask-setu'
          element={
            <div className='bg-chatBg'>
              <PageLayOut>
                <AskSetu />
              </PageLayOut>
            </div>
          }
        />
        <Route
          path='/chat-history'
          element={
            <PageLayOut>
              <ChatHistory />
            </PageLayOut>
          }
        />
        <Route
          path='/chat'
          element={
            <div className='bg-chatBg'>
              <PageLayOut>
                <ChatPage />
              </PageLayOut>
            </div>
          }
        />

        <Route
          path='/knowledge-connect'
          element={
            <PageLayOut>
              <KnowledgeConnect />
            </PageLayOut>
          }
        />
        <Route
          path='/knowledge-connect/:slug'
          element={
            <PageLayOut>
              <KnowledgeConnectDetails />
            </PageLayOut>
          }
        />
        <Route
          path='/manage-tb'
          element={
            <PageLayOut>
              <ManageTB />
            </PageLayOut>
          }
        />
        <Route
          path='/manage-tb-prescription'
          element={
            <PageLayOut>
              <ManageTBPrescription />
            </PageLayOut>
          }
        />
        <Route
          path='/query-response-management'
          element={
            <PageLayOut>
              <QueryResponseManagement />
            </PageLayOut>
          }
        />
        <Route
          path='/raise-clinical-query'
          element={
            <PageLayOut>
              <RaiseClinicalQuery />
            </PageLayOut>
          }
        />
        <Route
          path='/Query'
          element={
            <PageLayOut>
              <Query />
            </PageLayOut>
          }
        />
        <Route
          path='/track-query'
          element={
            <PageLayOut>
              <TrackQuery />
            </PageLayOut>
          }
        />
        <Route
          path='/KnowledgeAssessments'
          element={
            <PageLayOut>
              <KnowledgeAssessments />
            </PageLayOut>
          }
        />
        <Route
          path='/knowledge-quiz'
          element={
            <PageLayOut>
              <KnowledgeQuiz />
            </PageLayOut>
          }
        />
        <Route
          path='/quiz'
          element={
            <PageLayOut>
              <Quiz />
            </PageLayOut>
          }
        />
        <Route
          path='/quiz-question'
          element={
            <PageLayOut>
              <KnowledgeAssessmentsQuizQuestion />
            </PageLayOut>
          }
        />
        <Route
          path='/quiz-certificate'
          element={
            <PageLayOut>
              <CertificateScreen />
            </PageLayOut>
          }
        />
        <Route
          path='/quiz-result'
          element={
            <PageLayOut>
              <QuizViewResult />
            </PageLayOut>
          }
        />
        <Route
          path='/manage-tb-form'
          element={
            <PageLayOut>
              <ManageTBForm />
            </PageLayOut>
          }
        />
        <Route
          path='/algorithms'
          element={
            <PageLayOut>
              <Algorithm />
            </PageLayOut>
          }
        />
        <Route
          path='/algorithmsView/:slug'
          element={
            <PageLayOut>
              <AlgorithmView />
            </PageLayOut>
          }
        />
        <Route
          path='/labInvestigation-result'
          element={
            <PageLayOut>
              <LabInvestigationResult />
            </PageLayOut>
          }
        />
        <Route
          path='/leaderboard'
          element={
            <PageLayOut>
              <Leaderboard />
            </PageLayOut>
          }
        />
        <Route
          path='/screening-tool'
          element={
            <PageLayOut>
              <ScreeningTool />
            </PageLayOut>
          }
        />
        <Route
          path='/screening-tool/result'
          element={
            <PageLayOut>
              <Result />
            </PageLayOut>
          }
        />

        <Route
          path='/screening-tool/result/nutrition'
          element={
            <PageLayOut>
              <NutritionOutcome />
            </PageLayOut>
          }
        />
        <Route
          path='/screening-tool/result/next_step_for_pre_case'
          element={
            <PageLayOut>
              <NextStepForPresCase />
            </PageLayOut>
          }
        />
        <Route
          path='/resource-material'
          element={
            <PageLayOut>
              <Index />
            </PageLayOut>
          }
        />
        <Route
          path='/content'
          element={
            <PageLayOut>
              <ContentViewer />
            </PageLayOut>
          }
        />

        <Route
          path='/more'
          element={
            <PageLayOut>
              <MoreTools />
            </PageLayOut>
          }
        />

        <Route
          path='/leaderboard'
          element={
            <PageLayOut>
              <Leaderboard />
            </PageLayOut>
          }
        />

        <Route
          path='/survey'
          element={
            <PageLayOut>
              <Survey />
            </PageLayOut>
          }
        />
        <Route
          path='/contact-us'
          element={
            <PageLayOut>
              <ContactUs />
            </PageLayOut>
          }
        />
        <Route
          path='/referral-health-facilities'
          element={
            <PageLayOut>
              <ReferralHealthFacilities />
            </PageLayOut>
          }
        />
        <Route
          path='/referral-health-facilities/list'
          element={
            <PageLayOut>
              <ReferralHealthFacilitiesList />
            </PageLayOut>
          }
        />
        <Route
          path='/user-delete-account'
          element={
            <PageLayOut>
              <DeleteAccount />
            </PageLayOut>
          }
        />
        <Route
          path='/ApplicationLanguage'
          element={
            <PageLayOut>
              <ApplicationLanguage />
            </PageLayOut>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
