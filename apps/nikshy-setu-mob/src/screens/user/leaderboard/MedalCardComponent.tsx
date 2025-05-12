import {
  AppConfigType,
  ColorProps,
  fontStyles,
  gradientColor,
  uiStyles,
} from '@nikshay-setu-v3-monorepo/constants';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { Row } from 'apps/nikshy-setu-mob/src/components/commonComponents/row_column';
import React from 'react';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
type ProgressAction = {
  action: string;
  current: number;
  isComplete: boolean;
  target: number;
};
type MedalCardComponent = {
  colors: ColorProps;
  appTranslations: AppConfigType;
  tasksProgress: { badge_name: string; progress: ProgressAction[] };
  isCardActive: boolean;
  badgeLogo: JSX.Element;
};

const MedalCardComponent: React.FC<MedalCardComponent> = React.memo(
  ({ colors, tasksProgress, badgeLogo, isCardActive, appTranslations }) => {
    const badge_name = tasksProgress?.badge_name || 'APP_LOADING';

    const correctName = {
      appOpenedCount: 'APP_OPENED',
      minSpent: 'MIN_SPENT',
      subModuleUsageCount: 'SUB_MOD_VISITED',
      chatbotUsageCount: 'CHATBOT_USAGE',
      kbaseCompletion: 'KNOWLEDGE_CONNECT_USAGE',
      totalAssessments: 'TOTAL_ASSESS',
      correctnessOfAnswers: 'ASSESSMENT_ACCURACY',
      Gold: 'LEVEL_GOLD',
      Silver: 'LEVEL_SILVER',
      Bronze: 'LEVEL_BRONZE',
      default: 'APP_LOADING',
    } as const;

    return (
      <View
        style={{
          elevation: 5,
          backgroundColor: 'white',
          margin: RFValue(10),
          borderRadius: RFValue(10),
          minWidth: RFValue(210),
          ...uiStyles.iosShadow,
          opacity: isCardActive ? 1 : 0.3,
        }}
      >
        <LinearGradient
          end={{ x: 1, y: 0 }}
          start={{ x: 0.5, y: 1 }}
          colors={gradientColor?.[badge_name] || ['#fefeef', '#54545466']}
          style={{
            borderRadius: RFValue(10),
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
          }}
        >
          <Row style={{ alignItems: 'center', padding: RFValue(5) }}>
            {badgeLogo}
            <Text
              style={[
                fontStyles.Maison_600_16PX_21LH,
                {
                  color: isCardActive ? colors.WHITE_FFFF : 'gray',
                  marginStart: RFValue(10),
                },
              ]}
            >
              {appTranslations[correctName[badge_name]]}
            </Text>
          </Row>
        </LinearGradient>
        <View style={{ padding: RFValue(10) }}>
          <Text
            style={[
              fontStyles.Maison_500_17PX_20LH,
              { color: colors.DARK_BLUE_394F89 },
            ]}
          >
            {appTranslations?.LEADERBOARD_TASKS}
          </Text>
          {tasksProgress?.progress
            ?.filter((filterValue) => !(filterValue?.target == 0))
            .map((v, key) => {
              return (
                <Row
                  style={{
                    justifyContent: 'space-between',
                    padding: RFValue(2),
                  }}
                  key={key + '-progress'}
                >
                  <Text
                    style={[
                      fontStyles.Maison_500_12PX_15LH,
                      { color: isCardActive ? '#707070' : 'black' },
                    ]}
                  >
                    {appTranslations[correctName[v?.action || 'default']]} :
                  </Text>
                  <Text
                    style={[
                      fontStyles.Maison_500_12PX_15LH,
                      { color: isCardActive ? '#707070' : 'black' },
                    ]}
                  >
                    {v?.isComplete ? v?.target : Math.floor(v?.current)}/
                    {v?.target}
                  </Text>
                </Row>
              );
            })}
        </View>
      </View>
    );
  }
);

export default MedalCardComponent;
