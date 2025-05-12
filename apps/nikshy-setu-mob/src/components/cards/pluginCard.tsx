import { EditSvg } from '@nikshay-setu-v3-monorepo/assets';
import {
  langKeyForPlugin,
  uiStyles,
} from '@nikshay-setu-v3-monorepo/constants';
import { RootReducerStates } from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';

interface Item {
  name: string;
  desc?: string;
  linkTo: string;
}

interface PluginCardProps {
  item: Item;
  index: number;
  colors: [string, string, string];
  handlePress: () => void;
  handleEditPress: null | ((event: GestureResponderEvent) => void) | undefined;
}

const PluginCard: React.FC<PluginCardProps> = ({
  item,
  index,
  colors,
  handlePress,
  handleEditPress,
}) => {
  const Image = item.image;
  const appTranslations = useSelector(
    (state: RootReducerStates) => state.appContext?.data?.appTranslations
  );
  return (
    <Pressable
      key={item.name}
      onPress={handlePress}
      style={uiStyles.flex1}
      onLongPress={handleEditPress}
    >
      <LinearGradient colors={colors} style={uiStyles.homeLinGradBox}>
        <TouchableOpacity onPress={handleEditPress}>
          <EditSvg
            style={{ ...uiStyles.self_end }}
            height={RFValue(16)}
            width={RFValue(16)}
          />
        </TouchableOpacity>
        <View
          style={{
            ...uiStyles.marginHorizontal2,
            marginTop: -RFValue(10),
          }}
        >
          <Image
            height={RFValue(35)}
            width={RFValue(35)}
            style={uiStyles.homeLinGradBox_IC}
          />
          <Text style={uiStyles.homeLinGradBoxTitle}>
            {
              appTranslations[
                langKeyForPlugin[(item.name && item.name) || 'APP_LOADING']
              ]
            }
          </Text>
          {item.desc && (
            <Text style={uiStyles.homeLinGradBoxDec}>{item.desc}</Text>
          )}
        </View>
      </LinearGradient>
    </Pressable>
  );
};

export default PluginCard;
