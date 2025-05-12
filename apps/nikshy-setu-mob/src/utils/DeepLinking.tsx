import { utils } from '@react-native-firebase/app';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { Linking } from 'react-native';

// Deep linking configuration for React Navigation
export const deepLinksConf = {
  screens: {
    bottomNavigator: {
      screens: {
        stackNavigation: {
          screens: {
            homeScreen: 'homeScreen',
            QRMScreen: 'QRMScreen',
            certificateScreen: 'certificateScreen',
            rulesScreen: 'rulesScreen',
            raiseQuery: 'raiseQuery',
            chatSupport: 'chatSupport',
            referralHealth: 'referralHealth',
            referralHealthList: 'referralHealthList',
            trackQuery: 'trackQuery',
            language: 'language',
            contactUs: 'contactUs',
            leaderBoardScreen: 'leaderBoardScreen',
            algorithmView: {
              path: 'algorithmView/:nameOfAlgorithm/:parentNodeId',
              parse: {
                nameOfAlgorithm: (nameOfAlgorithm) =>
                  decodeURIComponent(nameOfAlgorithm),
                parentNodeId: (nameOfAlgorithm) =>
                  decodeURIComponent(nameOfAlgorithm),
              },
            },
            chapterScreen: 'chapterScreen',
            algorithmScreen: {
              path: 'algorithmScreen/:nameOfAlgorithm',
              parse: {
                nameOfAlgorithm: (nameOfAlgorithm) =>
                  decodeURIComponent(nameOfAlgorithm),
              },
            },
            resourceMaterial: {
              path: 'resourceMaterial/:nameOfMaterial/:id',
              parse: {
                nameOfMaterial: (nameOfMaterial) =>
                  decodeURIComponent(nameOfMaterial),
                id: (id) => decodeURIComponent(id),
              },
            },
            questionsScreen: 'questionsScreen',
            assessmentResultScreen: 'assessmentResultScreen',
            moreTools: 'moreTools',
            courseInfo: 'courseInfo',
            chatScreen: 'chatScreen',
            historyScreen: 'historyScreen',
            manageTBScreen: 'manageTBScreen',
            knowledgeAssessmentScreen: 'knowledgeAssessmentScreen',
            knowledgeQuizScreen: 'knowledgeQuizScreen',
            currentAssessmentScreen: 'currentAssessmentScreen',
            notificationScreen: 'notificationScreen',
            screeningScreen: 'screeningScreen',
            surveyFormScreen: 'surveyFormScreen',
            surveyTool: 'surveyTool',
            surveyFormStepper: 'surveyFormStepper',
            screeningTool: 'screeningTool',
            manageTBForm: 'manageTBForm',
            screeningResult: 'screeningResult',
            askSetu: {
              path: 'askSetu/:questionInfo',
              parse: {
                questionInfo: (value) => {
                  const parsed = JSON.parse(decodeURIComponent(value));
                  return {
                    searchByQuery: parsed.searchByQuery === 'true',
                    question: parsed.question,
                  };
                },
              },
              stringify: {
                questionInfo: (value) =>
                  encodeURIComponent(JSON.stringify(value)),
              },
            },
            accountScreen: 'accountScreen',
            nutritionOutcome: 'nutritionOutcome',
            nextStepForPresCase: 'nextStepForPresCase',
          },
        },
      },
    },
  },
};

export const linking = {
  prefixes: ['nikshay://'], // Adjust as per your app setup
  config: deepLinksConf,
  enabled: true,
  async getInitialURL() {
    const { isAvailable } = utils().playServicesAvailability;
    if (isAvailable) {
      try {
        const initialLink = await dynamicLinks().getInitialLink();
        if (initialLink) {
          return initialLink.url;
        }
      } catch (error) {
        console.error('Error fetching initial dynamic link:', error);
      }
    }
    const url = await Linking.getInitialURL();
    return url;
  },
  subscribe(listener) {
    const unsubscribeFirebase = dynamicLinks().onLink(({ url }) => {
      console.log('unsubscribeFirebase', url);
      listener(url);
    });
    const linkingSubscription = Linking.addEventListener('url', ({ url }) => {
      console.log('linkingSubscription', url);
      listener(url);
    });
    return () => {
      unsubscribeFirebase();
      linkingSubscription.remove();
    };
  },
};
