import { uiStyles } from '@nikshay-setu-v3-monorepo/constants';
import {
  RootReducerStates,
  RootStackParamList,
  ThemeProps,
} from '@nikshay-setu-v3-monorepo/types';
import { getDataFromAsyncStorage } from '@nikshay-setu-v3-monorepo/utils';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { ParamListBase, useTheme } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { AppModalsAndPermissions } from '../components/AppModalsAndPermissions';
import BottomBarComponent from '../components/commonComponents/bottomBar';
import { DrawerComponent } from '../components/commonComponents/drawer';
import HeaderComponent from '../components/commonComponents/header';
import ErrorBoundary from '../components/errorBoundary';
import { LogsView } from '../components/topLogs/logView';
import { AboutUs } from '../screens/user/aboutUs';
import AccountScreen from '../screens/user/account';
import DeleteAccount from '../screens/user/account/deleteAccount';
import AlgorithmView from '../screens/user/algorithms/algorithmView';
import { CmsNewPage } from '../screens/user/algorithms/cmsNewPage';
import DynamicAlgorithm from '../screens/user/algorithms/dynamicAlgorithm';
import { AlgorithmScreen } from '../screens/user/algorithms/index';
import LabInvestigation from '../screens/user/algorithms/LabInvestigation';
import LabInvestigationResult from '../screens/user/algorithms/LabInvestigationResult';
import { ChatScreen } from '../screens/user/chatScreen';
import AskSetu from '../screens/user/chatScreen/askSetu';
import { HistoryScreen } from '../screens/user/chatScreen/historyScreen';
import { ContactUsScreen } from '../screens/user/contactUs';
import { ContentView } from '../screens/user/content/ContentView';
import { Feedback } from '../screens/user/feedback';
import { HomeScreen } from '../screens/user/home';
import { CourseInfoScreen } from '../screens/user/knowledgeConnect';
import ChapterScreen from '../screens/user/knowledgeConnect/chapterScreen';
import { H5pView } from '../screens/user/knowledgeConnect/h5pView';
import KnowledgeAssessmentScreen from '../screens/user/knowledgeQuiz';
import AssessmentResultScreen from '../screens/user/knowledgeQuiz/assessmentResultScreen';
import CertificateScreen from '../screens/user/knowledgeQuiz/certificateScreen';
import CurrentAssessmentScreen from '../screens/user/knowledgeQuiz/currentAssessmentScreen';
import KnowledgeQuizScreen from '../screens/user/knowledgeQuiz/knowledgeQuizScreen';
import QuestionsScreen from '../screens/user/knowledgeQuiz/questionsScreen';
import RulesScreen from '../screens/user/knowledgeQuiz/rulesScreen';
import { LanguageScreen } from '../screens/user/language';
import LeaderboardScreen from '../screens/user/leaderboard';
import { LogsScreen } from '../screens/user/logs';
import ManageTBScreen from '../screens/user/manageTB';
import ManageTBForm from '../screens/user/manageTB/ManageTBForm';
import { PrescriptionScreen } from '../screens/user/manageTB/prescriptionScreen';
import { MoreTools } from '../screens/user/moreTools/moreToolsScreen';
import NotificationScreen from '../screens/user/notification';
import QRMScreen from '../screens/user/q2coe';
import { ChatSupport } from '../screens/user/q2coe/chatSupportScreen';
import { RaiseQuery } from '../screens/user/q2coe/raiseQueryScreen';
import { TrackQuery } from '../screens/user/q2coe/trackQueryScreen';
import ReferralHealth from '../screens/user/referralHealth';
import ReferralHealthFilter from '../screens/user/referralHealth/referralHealthFilter';
import ReferralHealthList from '../screens/user/referralHealth/referralHealthList';
import { ResourceMaterial } from '../screens/user/resourceMaterial';
import { ContentScreen } from '../screens/user/resourceMaterial/contentView';
import { PDFView } from '../screens/user/resourceMaterial/PDFView';
import { VideoView } from '../screens/user/resourceMaterial/VideoView';
import { NextStepForPresCase } from '../screens/user/screeningTools/nextStepForPresCase';
import { NutritionOutcome } from '../screens/user/screeningTools/nutritionOutcome';
import { ScreeningResult } from '../screens/user/screeningTools/screeningResult';
import ScreeningScreen from '../screens/user/screeningTools/screeningScreen';
import { ScreeningTool } from '../screens/user/screeningTools/screeningTool';
import SurveyFormScreen from '../screens/user/surveyForm/surveyFormScreen';
import SurveyFormStepper from '../screens/user/surveyForm/surveyFormStepper';
import SurveyFromListScreen from '../screens/user/surveyForm/surveyTool';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootStackParamList>();
const Bottom = createBottomTabNavigator<RootStackParamList>();

export const StackNavigation = () => {
  const theme = useTheme() as ThemeProps;
  const [appLang, setAppLang] = useState('en');
  getDataFromAsyncStorage('lang').then((value) => {
    if (value) setAppLang(value);
  });
  const appTranslations = useSelector(
    (state: RootReducerStates) => state.appContext?.data?.appTranslations
  );
  return (
    <Stack.Navigator
      initialRouteName='homeScreen'
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.WHITE_FFFF },
        header: ({ navigation, route }) => (
          <HeaderComponent
            navigation={
              navigation as NativeStackNavigationProp<ParamListBase> &
                DrawerNavigationHelpers
            }
            route={route}
          />
        ),
      }}
    >
      <Stack.Screen
        name='homeScreen'
        component={HomeScreen}
        options={{
          headerShown: true,
        }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='logsScreen'
        component={LogsScreen}
        options={{
          headerShown: true,
        }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='dynamicAlgorithm'
        component={DynamicAlgorithm}
        options={{
          headerShown: true,
        }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='deleteAccount'
        component={DeleteAccount}
        options={{
          headerShown: true,
        }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='QRMScreen'
        component={QRMScreen}
        options={{
          headerShown: true,
        }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='h5pView'
        component={H5pView}
        options={{
          headerShown: true,
        }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='feedback'
        component={Feedback}
        options={{
          headerShown: true,
        }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='videoView'
        component={VideoView}
        options={{
          headerShown: true,
        }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='pdfView'
        component={PDFView}
        options={{
          headerShown: true,
        }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='certificateScreen'
        component={CertificateScreen}
        options={{
          headerShown: true,
        }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='rulesScreen'
        component={RulesScreen}
        options={{
          headerShown: true,
        }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='raiseQuery'
        component={RaiseQuery}
        options={{ headerShown: true }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='chatSupport'
        component={ChatSupport}
        options={{ headerShown: true }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='referralHealth'
        component={ReferralHealth}
        options={{ headerShown: true }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='referralHealthList'
        component={ReferralHealthList}
        options={{ headerShown: true }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='trackQuery'
        component={TrackQuery}
        options={{ headerShown: true }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='language'
        component={LanguageScreen}
        options={{
          headerShown: true,
        }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='contactUs'
        component={ContactUsScreen}
        options={{
          headerShown: true,
        }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='algorithmView'
        component={AlgorithmView}
        options={{ headerShown: true }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='chapterScreen'
        component={ChapterScreen}
        options={{ headerShown: true }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='algorithmScreen'
        component={AlgorithmScreen}
        options={{ headerShown: true }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='questionsScreen'
        component={QuestionsScreen}
        options={{ headerShown: true }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='assessmentResultScreen'
        component={AssessmentResultScreen}
        options={{ headerShown: true }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='moreTools'
        component={MoreTools}
        options={{ headerShown: true }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='courseInfo'
        component={CourseInfoScreen}
        options={{
          headerShown: true,
        }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='chatScreen'
        component={ChatScreen}
        options={{
          headerShown: true,
        }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='historyScreen'
        component={HistoryScreen}
        options={{
          headerShown: true,
        }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='manageTBScreen'
        component={ManageTBScreen}
        options={{
          headerShown: true,
        }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='knowledgeAssessmentScreen'
        component={KnowledgeAssessmentScreen}
        options={{
          headerShown: true,
        }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='knowledgeQuizScreen'
        component={KnowledgeQuizScreen}
        options={{ headerShown: true }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='currentAssessmentScreen'
        component={CurrentAssessmentScreen}
        options={{ headerShown: true }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='notificationScreen'
        component={NotificationScreen}
        options={{
          headerShown: true,
        }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='labInvestigation'
        component={LabInvestigation}
        options={{
          headerShown: true,
        }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='labInvestigationResult'
        component={LabInvestigationResult}
        options={{
          headerShown: true,
        }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='resourceMaterial'
        component={ResourceMaterial}
        options={{
          headerShown: true,
        }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='screeningScreen'
        component={ScreeningScreen}
        options={{
          headerShown: true,
        }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='surveyFormScreen'
        component={SurveyFormScreen}
        options={{
          headerShown: true,
        }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='surveyTool'
        component={SurveyFromListScreen}
        options={{
          headerShown: true,
        }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='referralHealthFilter'
        component={ReferralHealthFilter}
        options={{
          headerShown: true,
        }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='surveyFormStepper'
        component={SurveyFormStepper}
        options={{
          headerShown: true,
        }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='screeningTool'
        component={ScreeningTool}
        options={{
          headerShown: true,
        }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='manageTBForm'
        component={ManageTBForm}
        options={{
          headerShown: true,
        }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='screeningResult'
        component={ScreeningResult}
        options={{
          headerShown: true,
        }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='askSetu'
        component={AskSetu}
        options={{ headerShown: true }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='accountScreen'
        component={AccountScreen}
        options={{
          headerShown: true,
        }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='leaderBoardScreen'
        component={LeaderboardScreen}
        options={{
          headerShown: true,
        }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='nutritionOutcome'
        component={NutritionOutcome}
        options={{
          headerShown: true,
        }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='nextStepForPresCase'
        component={NextStepForPresCase}
        options={{
          headerShown: true,
        }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='contentView'
        component={ContentView}
        options={{
          headerShown: false,
        }}
        initialParams={{ theme }}
      />
      <Stack.Screen
        name='contentScreen'
        component={ContentScreen}
        options={{
          headerShown: false,
        }}
        initialParams={{ theme }}
      />
      <Stack.Screen
        name='prescriptionScreen'
        component={PrescriptionScreen}
        options={{
          headerShown: true,
        }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='CmsNewPage'
        component={CmsNewPage}
        options={{
          headerShown: true,
        }}
        initialParams={{ theme, appLang, appTranslations }}
      />
      <Stack.Screen
        name='aboutUs'
        component={AboutUs}
        options={{
          headerShown: true,
        }}
        initialParams={{ theme, appLang, appTranslations }}
      />
    </Stack.Navigator>
  );
};

export const BottomNavigator = () => {
  return (
    <View style={uiStyles?.flex1BgWhite}>
      <Bottom.Navigator
        initialRouteName='stackNavigation'
        tabBar={(props: BottomTabBarProps) => {
          return <BottomBarComponent {...props} />;
        }}
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}
      >
        <Bottom.Screen name='stackNavigation' component={StackNavigation} />
      </Bottom.Navigator>
    </View>
  );
};

export const AppNavigationUser = () => {
  const [ShowLogsInfo, setShowLogsInfo] = useState(false);

  getDataFromAsyncStorage('showLogsOnTop').then((v) => {
    if (v === 'showLogsOnTop') {
      setShowLogsInfo(true);
    }
  });

  return (
    <ErrorBoundary>
      <AppModalsAndPermissions />
      {ShowLogsInfo && <LogsView />}
      <Drawer.Navigator
        initialRouteName={'bottomNavigator'}
        screenOptions={{ headerShown: false }}
        drawerContent={(props) => <DrawerComponent {...props} />}
      >
        <Drawer.Screen name='bottomNavigator' component={BottomNavigator} />
      </Drawer.Navigator>
    </ErrorBoundary>
  );
};
