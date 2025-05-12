import {
  AndroidApkSvg,
  AppleApkSvg,
  ImagePlaceholderPng,
} from '@nikshay-setu-v3-monorepo/assets';
import {
  fontStyles,
  STORE_URL,
  uiStyles,
} from '@nikshay-setu-v3-monorepo/constants';
import { ThemeProps, ToolsCardProps } from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { useTheme } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

interface ToolsCardContainerProps {
  children: ReactNode;
}

const ToolsCardContainer: React.FC<ToolsCardContainerProps> = ({
  children,
}) => {
  const { colors } = useTheme() as ThemeProps;
  return (
    <View
      style={[
        styles.container,
        uiStyles.iosShadow,
        { backgroundColor: colors.WHITE_FFFF },
      ]}
    >
      {children}
    </View>
  );
};

const ToolsCardTitle: React.FC<{ Title: string }> = ({ Title }) => (
  <Text
    style={{
      textAlign: 'center',
      marginTop: RFValue(5),
      ...fontStyles.Maison_500_12PX_15LH,
    }}
  >
    {Title}
  </Text>
);

const ToolsCard: React.FC<ToolsCardProps> = React.memo(
  ({ ImageSrc, Title, SvgImg, onPress }) => {
    return (
      <TouchableHighlight
        style={{
          flex: 1,
          margin: RFValue(5),
        }}
        underlayColor={null}
        onPress={onPress}
      >
        <View style={styles.card}>
          <ToolsCardContainer>
            {ImageSrc ? (
              <Image
                source={{
                  uri:
                    (ImageSrc && STORE_URL + ImageSrc) ||
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNunprY7nsdLVMbu85pfFSvj4so9VE7GPCCA&s',

                  ...(Platform.OS === 'android'
                    ? { cache: 'only-if-cached' }
                    : {
                        headers: {
                          'Cache-Control': 'no-cache',
                          Pragma: 'no-cache',
                        },
                      }),
                }}
                style={styles.img}
                progressiveRenderingEnabled={true}
                defaultSource={ImagePlaceholderPng}
                resizeMode={'stretch'} // cover or contain its upto you view look
              />
            ) : SvgImg ? (
              <SvgImg
                height={RFValue(35)}
                width={RFValue(35)}
                onPress={onPress}
              />
            ) : Platform.OS === 'android' ? (
              <AndroidApkSvg
                height={RFValue(35)}
                width={RFValue(35)}
                onPress={onPress}
              />
            ) : (
              <AppleApkSvg
                height={RFValue(35)}
                width={RFValue(35)}
                onPress={onPress}
              />
            )}
          </ToolsCardContainer>
          <ToolsCardTitle Title={Title} />
        </View>
      </TouchableHighlight>
    );
  }
);
ToolsCard.displayName = 'ToolsCard';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: RFValue(10),
    borderRadius: RFValue(100),
    margin: RFValue(5),
    alignContent: 'center',
    alignSelf: 'center',
    flex: 1,
    elevation: RFValue(5),
    overflow: Platform.OS == 'android' ? 'hidden' : 'visible',
  },
  iosShadow: {
    shadowOffset: { width: 0, height: RFValue(1.5) },
    shadowOpacity: 0.5,
    shadowRadius: 1.5,
  },
  card: {
    alignItems: 'center', // Align items in the center (or flex-start)
    justifyContent: 'center',
  },
  img: {
    height: RFValue(35),
    width: RFValue(35),
    // borderRadius: RFValue(100)
  },
});

export default ToolsCard;
