import { RootReducerStates } from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import React, { useEffect, useState } from 'react';

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
  DropdownArrowSvg,
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
import {
  AppConfigType,
  ColorProps,
  fontStyles,
  langKeyForPlugin,
  uiStyles,
} from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { Row } from 'apps/nikshy-setu-mob/src/components/commonComponents/row_column';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { UserProfileApiResponse } from 'shared/types/src/screens/UserTypes';
import MedalCardComponent from './MedalCardComponent';
type Level =
  | 'Beginner'
  | 'Advanced Beginner'
  | 'Competent'
  | 'Proficient'
  | 'Expert';
const badgeOrder = ['Bronze', 'Silver', 'Gold'];
const levelOrder = [
  'Beginner',
  'Advanced Beginner',
  'Competent',
  'Proficient',
  'Expert',
];

const disableBox = {
  Bronze: ['Silver', 'Gold'],
  Silver: ['Gold'],
  Gold: [],
  default: ['Silver', 'Gold', 'Bronze'],
};
type Task = {
  [key in Level]: {
    activeIcon: JSX.Element;
    disableIcon: JSX.Element;
    Silver: JSX.Element;
    Bronze: JSX.Element;
    Gold: JSX.Element;
    activeLogoWhen: string[];
  };
};

const hw = { height: RFValue(45), width: RFValue(45) };
const taskData: Task = {
  Beginner: {
    activeIcon: <BeginnerActiveSvg {...hw} />,
    disableIcon: <BeginnerDisableSvg {...hw} />,
    activeLogoWhen: [
      'Beginner',
      'Advanced Beginner',
      'Competent',
      'Proficient',
      'Expert',
    ],
    Bronze: <BeginnerBronzeSvg {...hw} />,
    Silver: <BeginnerSilverSvg {...hw} />,
    Gold: <BeginnerGoldSvg {...hw} />,
  },
  'Advanced Beginner': {
    activeIcon: <AdvancedBeginnerActiveSvg {...hw} />,
    disableIcon: <AdvancedBeginnerDisableSvg {...hw} />,
    activeLogoWhen: ['Advanced Beginner', 'Competent', 'Proficient', 'Expert'],
    Bronze: <AdvancedBronzeSvg {...hw} />,
    Silver: <AdvancedSilverSvg {...hw} />,
    Gold: <AdvancedGoldSvg {...hw} />,
  },
  Competent: {
    activeIcon: <CompetentActiveSvg {...hw} />,
    disableIcon: <CompetentDisableSvg {...hw} />,
    activeLogoWhen: ['Competent', 'Proficient', 'Expert'],
    Bronze: <CompetentBronzeSvg {...hw} />,
    Silver: <CompetentSilverSvg {...hw} />,
    Gold: <CompetentGoldSvg {...hw} />,
  },
  Proficient: {
    activeIcon: <ProficientActiveSvg {...hw} />,
    disableIcon: <ProficientDisableSvg {...hw} />,
    activeLogoWhen: ['Proficient', 'Expert'],
    Bronze: <ProficientBronzeSvg {...hw} />,
    Silver: <ProficientSilverSvg {...hw} />,
    Gold: <ProficientGoldSvg {...hw} />,
  },
  Expert: {
    activeIcon: <ExpertActiveSvg {...hw} />,
    disableIcon: <ExpertDisableSvg {...hw} />,
    activeLogoWhen: ['Expert'],
    Bronze: <ExpertBronzeSvg {...hw} />,
    Silver: <ExpertSilverSvg {...hw} />,
    Gold: <ExpertGoldSvg {...hw} />,
  },
};
const TaskFragment: React.FC<{
  colors: ColorProps;
  userInfo: UserProfileApiResponse;
  appTranslations: AppConfigType;
  loadingApis: string[];
}> = React.memo(({ colors, userInfo, appTranslations, loadingApis }) => {
  const [openLevelName, setOpenLevelName] = useState<string>('');
  // const appTranslations = useSelector(
  //   (state: RootReducerStates) => state.appContext?.data?.appTranslations
  // );
  const onTaskClick = (level) => {
    if (level == openLevelName) setOpenLevelName('');
    else setOpenLevelName(level);
  };
  const dispatch = useDispatch();
  const { error, data } = useSelector(
    (state: RootReducerStates) => state.appContext
  );
  useEffect(() => {
    dispatch(
      createAction({
        method: 'GET',
        url: 'SUBSCRIBER_PROGRESS',
      })
    );
  }, []);

  const sortedData = data?.leaderboard?.subscriber_progress?.sort((a, b) => {
    return levelOrder.indexOf(a.level) - levelOrder.indexOf(b.level);
  });
  return (
    <ScrollView
      contentContainerStyle={{ padding: RFValue(10) }}
      showsVerticalScrollIndicator={false}
    >
      <Row
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: RFValue(10),
          ...uiStyles.iosShadow,
        }}
      >
        <Row style={styles.rowContainer}>
          <View
            style={{
              backgroundColor: colors.GREEN_30D03F,
              borderRadius: RFValue(15),
              overflow: 'hidden',
              padding: RFValue(3),
            }}
          >
            <TaskSvg
              style={{ margin: RFValue(5), borderRadius: RFValue(10) }}
            />
          </View>
          <View style={{ paddingLeft: RFValue(5) }}>
            <Text
              style={[fontStyles.Maison_400_14PX_17LH]}
              numberOfLines={1}
              ellipsizeMode='tail'
            >
              {data?.user_profile?.completedTasks || 0}
            </Text>
            <Text
              style={[
                fontStyles.Maison_300_13PX_15LH,
                { fontSize: RFValue(12) },
              ]}
              numberOfLines={1}
              ellipsizeMode='tail'
            >
              {appTranslations?.Q2COE_INFO_COMPLETED}
            </Text>
          </View>
        </Row>
        <Row style={styles.rowContainer}>
          <View
            style={{
              backgroundColor: '#FF6A60',
              borderRadius: RFValue(15),
              overflow: 'hidden',
              padding: RFValue(3),
            }}
          >
            <PendingTaskSvg
              style={{ margin: RFValue(5), borderRadius: RFValue(10) }}
            />
          </View>
          <View style={{ paddingLeft: RFValue(5) }}>
            <Text
              style={[fontStyles.Maison_400_14PX_17LH, {}]}
              numberOfLines={1}
              ellipsizeMode='tail'
            >
              {data?.user_profile?.pendingTasks || 0}
            </Text>
            <Text
              style={[
                fontStyles.Maison_300_13PX_15LH,
                { fontSize: RFValue(12) },
              ]}
              numberOfLines={1}
              ellipsizeMode='tail'
            >
              {appTranslations?.APP_PENDING}
            </Text>
          </View>
        </Row>
      </Row>
      {sortedData?.map((task, index) => {
        const isLevelIsActive = taskData?.[
          task?.level
        ]?.activeLogoWhen?.includes(userInfo?.currentLevel);

        return (
          <View
            key={index + '-LevelCard'}
            style={{
              elevation: 2,
              backgroundColor: 'white',
              borderRadius: RFValue(15),
              marginVertical: RFValue(10),
              ...uiStyles.iosShadow,
            }}
          >
            <TouchableHighlight
              key={index + '-task'}
              onPress={() => onTaskClick(task?.level)}
              underlayColor={null}
            >
              <Row style={styles.cardContainer}>
                <Row style={{ alignItems: 'center' }}>
                  {isLevelIsActive
                    ? taskData?.[task?.level]?.activeIcon
                    : taskData?.[task?.level]?.disableIcon}
                  <Text
                    style={[
                      fontStyles.Maison_500_17PX_20LH,
                      {
                        color: isLevelIsActive
                          ? colors.DARK_BLUE_394F89
                          : colors?.GREY_D9DBDB,
                        marginStart: RFValue(10),
                        textAlignVertical: 'center',
                      },
                    ]}
                  >
                    {appTranslations?.LEADERBOARD_LEVEL} :{' '}
                    {(Object?.keys(langKeyForPlugin).includes(task?.level) &&
                      appTranslations[langKeyForPlugin[task?.level]]) ||
                      task?.level}
                  </Text>
                </Row>
                <DropdownArrowSvg
                  style={{
                    transform: [
                      {
                        rotate:
                          task?.level == openLevelName ? '180deg' : '360deg',
                      },
                    ],
                  }}
                  stroke={colors.BLACK_000000}
                />
              </Row>
            </TouchableHighlight>
            {task?.level == openLevelName && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  margin: RFValue(10),
                  marginTop: 0,
                  paddingEnd: RFValue(20),
                }}
              >
                {task?.tasksProgress
                  ?.sort((a, b) => {
                    return (
                      badgeOrder.indexOf(a.badge_name) -
                      badgeOrder.indexOf(b.badge_name)
                    );
                  })
                  .map((tasksProgress, index) => {
                    const isActive =
                      task?.level === userInfo?.currentLevel
                        ? !disableBox?.[
                            userInfo?.currentBadge || 'default'
                          ]?.includes(tasksProgress?.badge_name)
                        : isLevelIsActive;
                    return (
                      <MedalCardComponent
                        appTranslations={appTranslations}
                        key={index + '-TaskProgress'}
                        colors={colors}
                        isCardActive={isActive}
                        badgeLogo={
                          isActive
                            ? taskData?.[task?.level]?.[
                                tasksProgress?.badge_name
                              ]
                            : taskData?.[task?.level]?.disableIcon
                        }
                        tasksProgress={tasksProgress}
                      />
                    );
                  })}
              </ScrollView>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  rowContainer: {
    padding: RFValue(10),
    alignItems: 'center',
    borderRadius: RFValue(10),
    marginBottom: RFValue(10),
    elevation: 2,
    backgroundColor: 'white',
    flex: 1,
    marginRight: RFValue(5),
  },
  cardContainer: {
    padding: RFValue(10),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tab: {
    paddingHorizontal: RFValue(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {},

  contentContainer: {
    flex: 1,
  },
  screenText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default TaskFragment;
