import { ProfileSvg } from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles, uiStyles } from '@nikshay-setu-v3-monorepo/constants';
import { ChatTextCardProps, ThemeProps } from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { useTheme } from '@react-navigation/native';
import { Text, View } from 'react-native';

export const ChatTextCard: React.FC<ChatTextCardProps> = ({
  text,
  time,
  self,
  chatBotChatting,
}) => {
  const { colors } = useTheme() as ThemeProps;
  return (
    <View
      style={{
        flexDirection: self ? 'column' : 'row',
        marginTop: RFValue(10),
        flex: 1,
      }}
    >
      {!self && !chatBotChatting && (
        <ProfileSvg
          style={{ alignSelf: 'flex-end', marginBottom: RFValue(20) }}
          height={RFValue(25)}
          width={RFValue(25)}
        />
      )}
      <View>
        <View
          style={[
            self ? uiStyles.chatTextSelfCard : uiStyles.chatTextDrCard,
            {
              backgroundColor:
                !self && chatBotChatting
                  ? colors.WHITE_FFFF
                  : self
                  ? colors.LIGHT_BLUE_D4EDF7
                  : colors.LIGHT_GREY_F2F2F2,
              borderWidth: !self && chatBotChatting ? 1 : 0,
              borderColor: 'gray',
              marginStart: RFValue(10),
              flex: 1,
            },
          ]}
        >
          {typeof text === 'string' ? (
            <Text style={{ textAlign: self ? 'right' : 'left' }}>{text}</Text>
          ) : (
            text
          )}
        </View>
        <Text
          style={{
            textAlign: self ? 'right' : 'left',
            marginStart: self && chatBotChatting ? 0 : RFValue(15),
            ...fontStyles.Maison_400_12PX_16LH,
            color: colors.GREY_797979,
          }}
        >
          {time}
        </Text>
      </View>
    </View>
  );
};
