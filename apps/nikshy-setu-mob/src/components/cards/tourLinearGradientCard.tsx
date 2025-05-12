import { fontStyles, STORE_URL } from '@nikshay-setu-v3-monorepo/constants';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import React from 'react';
import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface GradientCardProps {
  item: number; // Replace this with the actual key type of `sortedData`
  sortedData: Record<
    number,
    {
      colorGradient?: string[];
      icon?: string;
      title?: { en?: string };
      shortDescription?: { en?: string };
      description?: { en?: string };
      textColor?: string[];
    }
  >;
  ImageStyle?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

const TourGradientCard: React.FC<GradientCardProps> = ({
  item,
  sortedData,
  containerStyle,
  ImageStyle,
}) => {
  const data = sortedData[item];

  // Ensure all cards look the same by applying default values if content is missing
  const defaultTitle = '---';
  const defaultShortDescription = '---';
  const defaultDescription = '---';
  const defaultTextColor = '#000000';
  const textColor = data?.textColor?.[0] || '#ffffff';
  return (
    <LinearGradient
      colors={
        (data?.colorGradient?.length >= 2 && data?.colorGradient) || [
          '#FFFFFF',
          '#FFFFFF',
        ]
      }
      style={[styles.linearGradient, { borderRadius: RFValue(20) }]}
    >
      <View style={[styles.container, containerStyle]}>
        {data?.icon && (
          <Image
            source={{ uri: `${STORE_URL}${data?.icon || ''}` }}
            style={[styles.image, ImageStyle]}
            resizeMode='stretch'
            progressiveRenderingEnabled={true}
          />
        )}
        <Text style={[styles.title, { color: textColor || defaultTextColor }]}>
          {data?.title?.en || defaultTitle}
        </Text>
        {data?.shortDescription?.en.length > 2 && (
          <Text
            style={[
              styles.shortDescription,
              { color: textColor || defaultTextColor },
            ]}
          >
            {data?.shortDescription?.en || defaultShortDescription}
          </Text>
        )}
        {data?.description?.en.length > 2 && (
          <Text
            style={[
              styles.description,
              {
                color: textColor || defaultTextColor,
              },
            ]}
            numberOfLines={4}
          >
            {data?.description?.en || defaultDescription}
          </Text>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    // width: "90%",
    minWidth: '90%',
    margin: RFValue(5),
  },
  container: {
    flex: 1,
    padding: RFValue(5),
    // width: '100%',
    justifyContent: 'space-between',
  },
  image: {
    height: RFValue(70),
    width: RFValue(70),
    // flex: 1,
    marginVertical: RFValue(5),
    marginTop: RFValue(25),
    alignSelf: 'center',
  },
  title: {
    textAlign: 'center',
    ...fontStyles.Maison_500_24PX_28LH,
    marginHorizontal: RFValue(30),
    flex: 1,
    textAlignVertical: 'center',
  },
  shortDescription: {
    textAlign: 'center',
    textAlignVertical: 'center',
    ...fontStyles?.Maison_500_16PX_21LH,
    flex: 1,
    marginHorizontal: RFValue(10),
  },
  description: {
    marginTop: RFValue(20),
    textAlign: 'center',
    ...fontStyles.Maison_500_16PX_21LH,
    flex: 1,
  },
});

export default TourGradientCard;
