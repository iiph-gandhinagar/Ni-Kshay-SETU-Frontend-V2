import { ImagePlaceholderPng } from '@nikshay-setu-v3-monorepo/assets';
import { uiStyles } from '@nikshay-setu-v3-monorepo/constants';
import { ThemeProps } from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
const NewsCard = ({ item, navigation }) => {
  const { colors } = useTheme() as ThemeProps;
  const title =
    typeof item?.title === 'object'
      ? item?.title?.en || item?.title?.mr || item?.title?.hi
      : item?.title;
  return (
    <Pressable
      onPress={() => {
        if (item?.href)
          navigation.navigate('contentView', {
            contentType: 'WebPage',
            url: item?.href,
          });
      }}
      style={[
        styles.container,
        uiStyles.iosShadow,
        { backgroundColor: colors.WHITE_FFFF },
      ]}
    >
      <View style={styles.iconContainer}>
        {/* <ApplicationInteractionSvg height={RFValue(70)} width={RFValue(70)} /> */}
        <Image
          source={{
            uri:
              item?.image_url ||
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQkZEEdZ-nF4cGbfz3dMHMg0ZvkJ9PrHKmaw&s',
            // cache: 'only-if-cached',
            ...(Platform.OS === 'android'
              ? { cache: 'only-if-cached' }
              : {
                  headers: {
                    'Cache-Control': 'no-cache',
                    Pragma: 'no-cache',
                  },
                }),
          }}
          style={{
            height: RFValue(60),
            width: RFValue(60),
            borderRadius: RFValue(5),
          }}
          resizeMode={'stretch'}
          progressiveRenderingEnabled={true}
          defaultSource={ImagePlaceholderPng}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text
          style={[styles.source, { color: colors.GREY_888 }]}
          numberOfLines={1}
        >
          Source: {item?.source}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: RFValue(5),
    marginHorizontal: RFValue(3),
    elevation: RFValue(3),
    borderWidth: 1,
    borderColor: '#ffffff98',
    borderRadius: RFValue(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    padding: 0,
    marginEnd: RFValue(10),
    margin: RFValue(5),
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: RFValue(16),
    paddingEnd: RFValue(10),
    marginBottom: RFValue(5),
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: RFValue(16),
  },
  source: {
    fontSize: RFValue(12),
  },
});

export default NewsCard;
