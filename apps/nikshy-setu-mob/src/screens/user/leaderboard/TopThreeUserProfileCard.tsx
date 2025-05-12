import {
  AppConfigType,
  fontStyles,
  langKeyForPlugin,
  STORE_URL,
} from '@nikshay-setu-v3-monorepo/constants';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import React from 'react';
import {
  Animated,
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

interface TopThreeUserProfileCardProps {
  containerStyle?: StyleProp<ViewStyle>;
  name: string;
  carder: string;
  appTranslations: AppConfigType;
  profileImage: string;
  performance: string;
}

const TopThreeUserProfileCard: React.FC<TopThreeUserProfileCardProps> = ({
  containerStyle,
  performance,
  name,
  carder,
  profileImage,
  appTranslations,
}) => {
  // const appTranslations = useSelector(
  //   (state: RootReducerStates) => state.appContext?.data?.appTranslations
  // );
  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Image
        source={{
          uri:
            (profileImage && STORE_URL + profileImage) ||
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6nhCkw4XFXUxIvH4VjOEXEpyqq0Z7Yb8YeQ&s',
        }}
        height={RFValue(55)}
        width={RFValue(55)}
        style={[
          styles.userImage,
          {
            borderWidth: 0.8,
            borderColor: 'black',
          },
        ]}
      />
      <Text style={styles.userNameTxt} numberOfLines={1} ellipsizeMode='clip'>
        {name}
      </Text>
      <Text style={styles.decTxt} numberOfLines={1}>
        {carder}
      </Text>
      <View
        style={{
          backgroundColor: 'white',
          padding: RFValue(5),
          borderRadius: RFValue(10),
        }}
      >
        <Text style={styles.levelTxt} numberOfLines={2}>
          {appTranslations?.LEADERBOARD_LEVEL} :{' '}
          {appTranslations[langKeyForPlugin[performance || 'APP_LOADING']]}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { width: RFValue(110), alignItems: 'center' },
  userImage: {
    borderRadius: RFValue(100),
    margin: RFValue(3),
    backgroundColor: 'white',
  },
  userNameTxt: {
    ...fontStyles.Maison_400_14PX_17LH,
    color: '#394F89',
    backgroundColor: 'white',
    borderRadius: RFValue(10),
  },
  decTxt: {
    ...fontStyles.Maison_400_10PX_12LH,
    color: '#707070',
    backgroundColor: 'white',
    borderRadius: RFValue(10),
  },
  levelTxt: {
    ...fontStyles.Maison_500_12PX_15LH,
    color: '#FF8008',
    textAlign: 'center',
  },
});

export default TopThreeUserProfileCard;
