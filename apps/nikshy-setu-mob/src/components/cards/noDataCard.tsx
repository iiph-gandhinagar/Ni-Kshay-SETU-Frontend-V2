import {
  loaderAnimation,
  noDataAnimation,
} from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles } from '@nikshay-setu-v3-monorepo/constants';
import { RootReducerStates } from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';

interface NoDataCardProps {
  containerStyle?: StyleProp<ViewStyle>;
  status?: 'noData' | 'loading';
  text?: string;
}

const NoDataCard: React.FC<NoDataCardProps> = ({
  containerStyle = {
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: RFValue(50),
    padding: RFValue(20),
  },
  status = 'noData',
  text = '',
}) => {
  const appTranslations = useSelector(
    (state: RootReducerStates) => state.appContext?.data?.appTranslations
  );
  const metaData = {
    noData: {
      text: (text && text) || appTranslations?.APP_NO_DATA_FOUND,
      animation: noDataAnimation,
    },
    loading: {
      text: (text && text) || appTranslations?.APP_LOADING,
      animation: loaderAnimation,
    },
  };

  return (
    <View style={containerStyle}>
      <LottieView
        autoPlay
        source={metaData?.[status].animation}
        loop={true}
        style={{
          height: RFValue(250),
          width: RFValue(250),
          marginVertical: -RFValue(20),
        }}
      />
      <Text style={[fontStyles.Maison_400_16PX_25LH, { textAlign: 'center' }]}>
        {metaData?.[status].text}
      </Text>
    </View>
  );
};
export default NoDataCard;
