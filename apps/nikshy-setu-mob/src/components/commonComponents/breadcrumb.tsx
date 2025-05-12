import { ArrowSvg } from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles } from '@nikshay-setu-v3-monorepo/constants';
import {
  RootStackParamList,
  ThemeProps,
} from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import {
  NavigationProp,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { ScrollView, Text, TouchableHighlight, View } from 'react-native';

type BreadcrumbItem = {
  name: string;
  navigateTo: keyof RootStackParamList | 'goBack' | string;
};
type BreadcrumbProps = {
  breadcrumb: BreadcrumbItem[];
  onPress?: (i: BreadcrumbItem) => void;
};

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  breadcrumb,
  onPress,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { colors } = useTheme() as ThemeProps;
  const scrollViewRef = useRef(null); // Reference to the ScrollView
  const handleFocus = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 300, animated: true });
    }
  };
  useEffect(() => {
    handleFocus();
  }, [breadcrumb]);
  return (
    <View style={{ flexDirection: 'row' }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
      >
        {breadcrumb?.map((v, k) => {
          const isLastItem = k === breadcrumb?.length - 1;
          const isMidItem = k === breadcrumb?.length / 2 - 1;
          return (
            <React.Fragment key={k + v?.name + k}>
              <TouchableHighlight
                underlayColor='transparent'
                style={isLastItem && breadcrumb.length > 2 && { flex: 1 }}
                onPress={() => {
                  if (onPress) {
                    onPress(v);
                  } else {
                    !isLastItem &&
                      (v.navigateTo === 'goBack'
                        ? navigation?.goBack()
                        : navigation.navigate(v?.navigateTo));
                  }
                }}
              >
                <Text
                  numberOfLines={1}
                  ellipsizeMode='tail'
                  style={[
                    fontStyles.Maison_400_13PX_20LH,
                    {
                      textAlign: 'center',
                      alignSelf: 'center',
                      color: isLastItem
                        ? colors.DARK_BLUE_394F89
                        : colors.GREY_808080,
                      marginHorizontal: RFValue(5),
                    },
                  ]}
                >
                  {v?.name}
                </Text>
              </TouchableHighlight>
              {!isLastItem && (
                <ArrowSvg
                  width={RFValue(20)}
                  height={RFValue(20)}
                  opacity={0.7}
                />
              )}
            </React.Fragment>
          );
        })}
      </ScrollView>
    </View>
  );
};
