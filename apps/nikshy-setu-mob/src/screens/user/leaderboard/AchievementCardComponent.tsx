import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import React from 'react';

import {
  AchievementsBronzeSvg,
  AchievementsGoldSvg,
  AchievementsSilverSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import {
  AppConfigType,
  fontStyles,
  gradientColor,
  langKeyForPlugin,
  uiStyles,
} from '@nikshay-setu-v3-monorepo/constants';
import { Row } from 'apps/nikshy-setu-mob/src/components/commonComponents/row_column';
import CircularProgress from 'apps/nikshy-setu-mob/src/components/progressBar/CircularProgress';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type AchievementComponent = {
  badgeName: string;
  totalAchievements: number;
  pending: string;
  icon: JSX.Element;
  backgroundColor: [string, string];
};
type AchievementCardComponent = {
  colors: any;
  achievement: AchievementComponent;
  appTranslations: AppConfigType;
};

const achievementData = {
  Bronze: {
    icon: <AchievementsBronzeSvg height={RFValue(80)} width={RFValue(80)} />,
    backgroundColor: gradientColor?.Bronze,
  },
  Silver: {
    icon: <AchievementsSilverSvg height={RFValue(80)} width={RFValue(80)} />,
    backgroundColor: gradientColor?.Silver,
  },
  Gold: {
    icon: <AchievementsGoldSvg height={RFValue(80)} width={RFValue(80)} />,
    backgroundColor: gradientColor?.Gold,
  },
};
const AchievementCardComponent: React.FC<AchievementCardComponent> = ({
  colors,
  achievement,
  appTranslations,
}) => {
  const badge_name = achievement?.badgeName || 'Bronze';
  return (
    <View
      style={{
        elevation: 2,
        backgroundColor: 'white',
        margin: RFValue(5),
        flex: 1,
        ...uiStyles.iosShadow,
        borderRadius: RFValue(10),
      }}
    >
      <LinearGradient
        end={{ x: 1, y: 0 }}
        start={{ x: 0, y: 1 }}
        colors={achievementData?.[badge_name]?.backgroundColor}
        style={{
          borderRadius: RFValue(10),
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,
        }}
      >
        <Text
          style={[
            fontStyles.Maison_600_16PX_21LH,
            {
              color: colors.WHITE_FFFF,
              padding: RFValue(10),
              alignItems: 'center',
            },
          ]}
        >
          {appTranslations?.[langKeyForPlugin[badge_name || 'APP_LOADING']]}
        </Text>
      </LinearGradient>
      <View
        style={{
          padding: RFValue(5),
          marginVertical: RFValue(5),
          justifyContent: 'center',
        }}
      >
        <View style={{ alignSelf: 'center', marginBottom: RFValue(5) }}>
          <CircularProgress
            size={RFValue(75)}
            strokeWidth={7}
            outerProgress={(achievement?.totalAchievements || 0) / 5 || 0}
            innerProgress={null}
            outerGradientColors={achievementData?.[badge_name]?.backgroundColor}
            hideInnerProgressBar={true}
            duration={2000}
          >
            {achievementData?.[badge_name]?.icon}
          </CircularProgress>
        </View>
        <Row style={{ justifyContent: 'space-between', padding: RFValue(2) }}>
          <Text style={[fontStyles.Maison_500_12PX_15LH, { color: '#707070' }]}>
            {appTranslations?.APP_ACHIEVED}
          </Text>
          <Text
            style={[
              fontStyles.Maison_500_12PX_15LH,
              { color: colors.GREEN_30D03F },
            ]}
          >
            {achievement?.totalAchievements}
          </Text>
        </Row>
        <Row style={{ justifyContent: 'space-between', padding: RFValue(2) }}>
          <Text style={[fontStyles.Maison_500_12PX_15LH, { color: '#707070' }]}>
            {appTranslations?.APP_PENDING}
          </Text>
          <Text style={[fontStyles.Maison_500_12PX_15LH, { color: '#FF6A60' }]}>
            {5 - achievement?.totalAchievements}
          </Text>
        </Row>
      </View>
    </View>
  );
};

export default AchievementCardComponent;
