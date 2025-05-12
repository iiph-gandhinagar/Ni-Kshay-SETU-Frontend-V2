import React, { useEffect, useState } from 'react';

import { rocketAnimation } from '@nikshay-setu-v3-monorepo/assets';
import {
  AppConfigType,
  ColorProps,
  fontStyles,
  langKeyForPlugin,
  uiStyles,
} from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { Row } from 'apps/nikshy-setu-mob/src/components/commonComponents/row_column';
import LottieView from 'lottie-react-native';
import { ScrollView, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import AchievementCardComponent from './AchievementCardComponent';
const AchievementsFragments: React.FC<{
  colors: ColorProps;
  currentLevel: string;
  appTranslations: AppConfigType;
}> = React.memo(({ colors, currentLevel, appTranslations }) => {
  const [achievement, setAchievement] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      createAction(
        {
          method: 'GET',
          url: 'ALL_ACHIEVEMENT_BY_LEVEL',
        },
        (code, res) => {
          if (code === 200) {
            const result = res?.reduce((acc, curr) => {
              const badge = acc.find(
                (item) => item.badgeName === curr.badgeName
              );
              if (badge) {
                badge.totalAchievements += curr.totalAchievements;
              } else {
                acc.push({
                  badgeName: curr.badgeName,
                  totalAchievements: curr.totalAchievements,
                });
              }
              return acc;
            }, []);
            setAchievement(result);
          }
        }
      )
    );
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        padding: RFValue(10),
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}
    >
      <View style={uiStyles?.marginTop10}>
        <Text
          style={[
            fontStyles.Maison_600_18PX_20LH,
            { color: colors.BLACK_000000, textAlign: 'center' },
          ]}
          numberOfLines={1}
          ellipsizeMode='tail'
        >
          {appTranslations?.CURRENT_LEVEL}
        </Text>
        <LottieView
          autoPlay
          source={rocketAnimation}
          loop={false}
          style={{
            height: RFValue(230),
            width: RFValue(230),
            marginVertical: -RFValue(15),
          }}
        />
        <Text
          style={[
            fontStyles.Maison_600_18PX_20LH,
            { color: colors.BLACK_000000, textAlign: 'center' },
          ]}
          numberOfLines={2}
          ellipsizeMode='tail'
        >
          {appTranslations?.[langKeyForPlugin[currentLevel || 'APP_LOADING']]}
        </Text>
      </View>
      <Row
        style={{ marginVertical: RFValue(5), justifyContent: 'space-around' }}
      >
        {achievement
          ?.sort((a, b) => {
            const badgeOrder = ['Bronze', 'Silver', 'Gold'];
            return (
              badgeOrder.indexOf(a.badgeName) - badgeOrder.indexOf(b.badgeName)
            );
          })
          .map((achievement, key) => (
            <AchievementCardComponent
              colors={colors}
              key={key}
              achievement={achievement}
              appTranslations={appTranslations}
            />
          ))}
      </Row>
    </ScrollView>
  );
});
AchievementsFragments.displayName = 'AchievementsFragments';
export default AchievementsFragments;
