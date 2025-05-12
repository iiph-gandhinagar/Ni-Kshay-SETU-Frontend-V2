import { botHeyAnimation, ChatbotWPng } from '@nikshay-setu-v3-monorepo/assets';
import { RootStackParamList } from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import { Image, Platform, Pressable } from 'react-native';

export const ChatBotLogo = () => {
  const [count, setCount] = useState(0);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [style, setStyle] = useState({
    bottom: '5%',
    right: 5,
  });
  useEffect(() => {
    if (count % 4 == 0) {
      setStyle({
        bottom: '5%',
        right: 5,
      });
    } else if (count % 4 == 1) {
      setStyle({
        top: '5%',
        right: 5,
      });
    } else if (count % 4 == 2) {
      setStyle({
        top: '5%',
        left: 5,
      });
    } else {
      setStyle({
        bottom: '5%',
        left: 5,
      });
    }
  }, [count]);
  return (
    <Pressable
      style={[
        {
          zIndex: Platform.OS == 'android' ? 10000000000000000000 : 100,
          position: 'absolute',
          marginVertical: RFValue(35),
        },
        style,
      ]}
      onLongPress={() => {
        setCount((old) => old + 1);
      }}
      onPress={() => {
        navigation?.navigate('chatScreen');
      }}
    >
      <Image
        style={{
          height: RFValue(60),
          width: RFValue(60),
          position: 'absolute',
        }}
        source={ChatbotWPng}
      />
      <LottieView
        autoPlay
        source={botHeyAnimation}
        loop={true}
        style={{
          height: RFValue(60),
          width: RFValue(60),
          overflow: 'hidden',
        }}
      />
    </Pressable>
  );
};
