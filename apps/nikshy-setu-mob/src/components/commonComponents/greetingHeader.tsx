// components/GreetingHeader.tsx

import { botHeyAnimation } from '@nikshay-setu-v3-monorepo/assets';
import { uiStyles } from '@nikshay-setu-v3-monorepo/constants';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GradientText } from '../textComponent/gradientText';
import { Column, Row } from './row_column';

type GreetingHeaderProps = {
  appTranslations?: {
    CHAT_HOW_MAY_HELP?: string;
    CHAT_GREETINGS_MORNING?: string;
    CHAT_GREETINGS_AFTERNOON?: string;
    CHAT_GREETINGS_EVENING?: string;
  };
  colors: {
    TRANSPARENT_PURPLE_9C5ED740: string;
    TRANSPARENT_PURPLE_635AD940: string;
    TRANSPARENT_PINK_E8A0A040: string;
    PINK_E8A0A0: string;
    PURPLE_9C5ED7: string;
    PURPLE_635AD9: string;
  };
};

const styles = StyleSheet.create({
  lottie: {
    height: RFValue(120),
    width: RFValue(120),
    marginHorizontal: -RFValue(20),
  },
});
const GreetingHeader: React.FC<GreetingHeaderProps> = ({
  appTranslations,
  colors,
}) => {
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return appTranslations?.CHAT_GREETINGS_MORNING;
    } else if (currentHour < 18) {
      return appTranslations?.CHAT_GREETINGS_AFTERNOON;
    } else {
      return appTranslations?.CHAT_GREETINGS_EVENING;
    }
  };
  return (
    <LinearGradient
      colors={[
        colors.TRANSPARENT_PURPLE_9C5ED740,
        colors.TRANSPARENT_PURPLE_635AD940,
        colors.TRANSPARENT_PINK_E8A0A040,
      ]}
      style={uiStyles.gradientContainer}
    >
      <Row style={uiStyles.homePageAnimationContainer}>
        <LottieView
          autoPlay
          source={botHeyAnimation}
          loop
          style={styles.lottie}
        />
        <Column style={{ flex: 1 }}>
          <View>
            <GradientText
              text={getGreeting()}
              fontSize={RFValue(30)}
              fontWeight={700}
              locations={{ x: 0, y: RFValue(30) }}
              height={RFValue(40)}
              width={'100%'}
              isGradientFill
              gradientColors={[
                colors.PINK_E8A0A0,
                colors.PURPLE_9C5ED7,
                colors.PURPLE_635AD9,
              ]}
            />
          </View>
          <Text style={uiStyles.howMayHelpYou}>
            {appTranslations?.CHAT_HOW_MAY_HELP}
          </Text>
        </Column>
      </Row>
    </LinearGradient>
  );
};

export default GreetingHeader;
