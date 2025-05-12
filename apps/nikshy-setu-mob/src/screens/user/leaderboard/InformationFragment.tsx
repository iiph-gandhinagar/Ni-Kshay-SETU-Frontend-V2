import {
  AdvancedBronzeSvg,
  AdvancedGoldSvg,
  AdvancedSilverSvg,
  BeginnerBronzeSvg,
  BeginnerGoldSvg,
  BeginnerSilverSvg,
  CompetentBronzeSvg,
  CompetentGoldSvg,
  CompetentSilverSvg,
  ExpertBronzeSvg,
  ExpertGoldSvg,
  ExpertSilverSvg,
  ProficientBronzeSvg,
  ProficientGoldSvg,
  ProficientSilverSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import {
  AppConfigType,
  ColorProps,
  fontStyles,
} from '@nikshay-setu-v3-monorepo/constants';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LevelInfoCarComponent from './LevelInfoCarComponent';

type Task = {
  levelName: string;
  level: string;
  desc: string;
  backgroundColor: [string, string];
  icon1: JSX.Element;
  icon2: JSX.Element;
  icon3: JSX.Element;
};

const taskData: Task[] = [
  {
    levelName: 'Beginner',
    level: 'Level 1',
    desc: 'LEADERBOARD_MEDAL_TASKS_DESCRIPTION',
    icon1: <BeginnerBronzeSvg />,
    icon2: <BeginnerSilverSvg />,
    icon3: <BeginnerGoldSvg />,
    backgroundColor: ['#D9E242', '#84C400'],
  },
  {
    levelName: 'Advanced',
    level: 'Level 2',
    desc: 'LEADERBOARD_MEDAL_TASKS_DESCRIPTION',
    icon1: <AdvancedBronzeSvg />,
    icon2: <AdvancedSilverSvg />,
    icon3: <AdvancedGoldSvg />,
    backgroundColor: ['#59CBF2', '#40A7E8'],
  },
  {
    levelName: 'Competent',
    level: 'Level 3',
    desc: 'LEADERBOARD_MEDAL_TASKS_DESCRIPTION',
    icon1: <CompetentBronzeSvg />,
    icon2: <CompetentSilverSvg />,
    icon3: <CompetentGoldSvg />,
    backgroundColor: ['#6F61EC', '#3D2CD4'],
  },
  {
    levelName: 'Proficient',
    level: 'Level 4',
    desc: 'LEADERBOARD_MEDAL_TASKS_DESCRIPTION',
    icon1: <ProficientBronzeSvg />,
    icon2: <ProficientSilverSvg />,
    icon3: <ProficientGoldSvg />,
    backgroundColor: ['#AE66FF', '#7E07E0'],
  },
  {
    levelName: 'Expert',
    level: 'Level 5',
    desc: 'LEADERBOARD_MEDAL_TASKS_DESCRIPTION',
    icon1: <ExpertBronzeSvg />,
    icon2: <ExpertSilverSvg />,
    icon3: <ExpertGoldSvg />,
    backgroundColor: ['#FF7F7D', '#EC2E4A'],
  },
];
const InformationFragment: React.FC<{
  colors: ColorProps;
  appTranslations: AppConfigType;
}> = React.memo(({ colors, appTranslations }) => {
  // const appTranslations = useSelector(
  //   (state: RootReducerStates) => state.appContext?.data?.appTranslations
  // );
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={fontStyles.Maison_500_13PX_20LH}>
            {appTranslations?.LEADERBOARD_DESCRIPTION}
          </Text>
        </View>
        {taskData.map((task, key) => (
          <LevelInfoCarComponent task={task} key={key} colors={colors} />
        ))}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    elevation: 2,
    backgroundColor: 'white',
    margin: RFValue(10),
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(20),
    borderRadius: RFValue(10),
  },
});
export default InformationFragment;
