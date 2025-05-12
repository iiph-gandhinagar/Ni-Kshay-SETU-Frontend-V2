import { BotAvatarsSvg, ExpandSvg } from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles, uiStyles } from '@nikshay-setu-v3-monorepo/constants';
import {
  ChatBoatChatCardProps,
  ThemeProps,
} from '@nikshay-setu-v3-monorepo/types';
import {
  CustomRFValue as RFValue,
  timeAgo,
} from '@nikshay-setu-v3-monorepo/utils';
import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import WebView from 'react-native-webview';
import { useDispatch } from 'react-redux';
import Button from '../buttons/primaryButtons';
import { Row } from '../commonComponents/row_column';
import TypingAnimation from '../commonComponents/typingText';

const AvatarWithName = ({ name, avatarStyle, textStyle }) => (
  <Row style={{ alignItems: 'center' }}>
    <BotAvatarsSvg style={avatarStyle} />
    <Text numberOfLines={1} ellipsizeMode='tail' style={textStyle}>
      {name}
    </Text>
  </Row>
);

const MessageTime = ({ time, self, colors }) => {
  return (
    <Text
      style={{
        textAlign: self ? 'right' : 'left',
        marginStart: self ? 0 : RFValue(15),
        ...fontStyles.Maison_400_12PX_16LH,
        color: colors.GREY_797979,
      }}
    >
      {time}
    </Text>
  );
};

const ChatOptions = ({
  data,
  self,
  onPressSubCard,
  showH5P,
  loadDataLength,
  colors,
  isSubNode,
}) => {
  return (
    <View>
      {data.slice(0, loadDataLength).map((item, index) => (
        <TouchableHighlight
          key={index + 'typeAnimation'}
          underlayColor={colors.LIGHT_BLUE_D4EDF7}
          style={[
            self ? uiStyles.chatTextSelfCard : uiStyles.chatTextDrCard,
            {
              backgroundColor: colors.WHITE_FFFF,
              borderWidth: 1,
              flex: 1,
              width: '75%',
              marginTop: RFValue(5),
              borderColor: colors.LIGHT_BLUE_61C9EF,
              marginStart: showH5P ? 0 : RFValue(10),
              elevation: RFValue(6),
              shadowColor: colors.LIGHT_BLUE_D4EDF7,
            },
          ]}
          onPress={() => {
            onPressSubCard(item);
          }}
        >
          <TypingAnimation
            text={item?.title}
            typingSpeed={10}
            style={{
              textAlign: self ? 'right' : 'left',
              color: isSubNode ? colors.LIGHT_BLUE_61C9EF : colors.BLACK_000000,
            }}
          />
        </TouchableHighlight>
      ))}
    </View>
  );
};

const H5PContent = ({ h5pId, navigation, self }) => (
  <View style={{}}>
    <WebView
      useWebView2
      source={{ uri: `https://ntep.in/h5p/${h5pId}/embed` }}
      style={{ flex: 1, height: RFValue(170), minWidth: '100%' }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      startInLoadingState={true}
      mediaPlaybackRequiresUserAction={false}
      showsVerticalScrollIndicator={false}
      allowsInlineMediaPlayback={true}
      scalesPageToFit={true}
    />
    {!self && (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('contentView', {
            contentType: 'h5p',
            id: h5pId,
          });
        }}
      >
        <ExpandSvg
          style={{
            alignSelf: 'flex-end',
            marginTop: 10,
            transform: [{ rotate: '90deg' }],
          }}
        />
      </TouchableOpacity>
    )}
  </View>
);

const ChatMessage = ({
  text,
  self,
  data,
  showH5P,
  h5pId,
  navigation,
  onPressLoad,
  colors,
  isMainNode,
  showLinkBtnText,
}) => {
  const dispatch = useDispatch();
  const NavigationButton = {
    '/manage-tb-tool': { text: 'ManageTB India', navigateTo: 'manageTBScreen' },
    '/assessment-tool': {
      text: 'Knowledge Quiz',
      navigateTo: 'knowledgeAssessmentScreen',
    },
    '/query-2coe-tool': { text: 'Query2COE', navigateTo: 'QRMScreen' },
  };
  return (
    <View
      style={[
        self ? uiStyles.chatTextSelfCard : uiStyles.chatTextDrCard,
        {
          backgroundColor: self ? colors.LIGHT_BLUE_D4EDF7 : colors.WHITE_FFFF,
          borderWidth: !self ? 1 : 0,
          borderColor: 'gray',
          marginStart: showH5P ? 0 : RFValue(10),
          elevation: RFValue(5),
          shadowColor: '#3EB6FF',
        },
      ]}
    >
      {showH5P ? (
        <View style={{ flex: 1 }}>
          <H5PContent h5pId={h5pId} navigation={navigation} self={self} />
          {data?.[0]?.sub_node?.length > 1 && isMainNode && (
            <Button
              title={isMainNode ? 'Load More' : 'Load Less'}
              textStyle={{
                color: '#3EB6FF',
                ...fontStyles.Maison_400_12PX_16LH,
              }}
              containerStyle={{ alignSelf: 'center' }}
              onPress={() => {
                onPressLoad(!isMainNode);
              }}
            />
          )}
        </View>
      ) : (
        <Row>
          {!self ? (
            <TypingAnimation
              text={
                text?.length === 0
                  ? "Sorry, I couldn't understand your input. Please try rephrasing your request."
                  : text || ''
              }
              typingSpeed={10}
              style={{ textAlign: self ? 'right' : 'left' }}
            />
          ) : (
            <Text
              style={[
                fontStyles.Maison_400_13PX_20LH,
                { textAlign: self ? 'right' : 'left' },
              ]}
            >
              {text}
            </Text>
          )}
        </Row>
      )}
      {showLinkBtnText && (
        <Button
          title={NavigationButton?.[showLinkBtnText]?.text}
          textStyle={{
            ...fontStyles.Maison_500_15PX_21LH,
            color: colors.DARK_BLUE_0C3896,
            textAlign: 'center',
          }}
          onPress={() => {
            navigation.navigate(
              NavigationButton?.[showLinkBtnText]?.navigateTo
            );
          }}
          bgColor='white'
          containerStyle={{
            alignContent: 'center',
            padding: RFValue(10),
            marginTop: RFValue(15),
            borderWidth: 1,
            borderColor: colors.DARK_BLUE_0C3896,
          }}
        />
      )}
    </View>
  );
};

export const ChatBoatChatCard: React.FC<ChatBoatChatCardProps> = ({
  item,
  scrollDown,
  navigation,
  onPressSubCard,
  stopScroll,
  OnH5PNodeLoad,
  itsHistory,
  isMainNode,
}) => {
  const { colors } = useTheme() as ThemeProps;
  const [loadDataLength, setLoadDataLength] = useState(5);
  const isSubNode = item?.type === 'SubNode';
  const showH5P = (!item?.multiAns && item?.data?.[0]?.['H5P-id']) || false;
  const text = item.message;
  const isMultiAns = item?.multiAns;
  const data = item?.data;
  const h5pId = item?.data?.[0]?.['H5P-id'] || 0;
  const time = timeAgo(item?.time);
  const self = item?.self;

  return (
    <View
      style={{
        flexDirection: self ? 'column' : 'row',
        marginTop: RFValue(10),
      }}
    >
      <View
        onTouchStart={() => {
          stopScroll(Boolean(showH5P));
        }}
        onTouchEnd={() => {
          stopScroll(false);
        }}
      >
        {!self && !isSubNode && (
          <AvatarWithName
            name={
              showH5P
                ? itsHistory
                  ? 'Setu'
                  : text
                : isSubNode
                ? 'Sub Node'
                : 'Setu'
            }
            avatarStyle={{ marginEnd: RFValue(10), marginBottom: RFValue(5) }}
            textStyle={[
              fontStyles.Maison_400_16PX_25LH,
              { color: colors.BLACK_000000, flex: 0.7 },
            ]}
          />
        )}
        {isMultiAns ? (
          <ChatOptions
            data={data}
            colors={colors}
            loadDataLength={loadDataLength}
            self={self}
            isSubNode={isSubNode}
            onPressSubCard={(item) => {
              OnH5PNodeLoad(true);
              onPressSubCard(item);
            }}
            showH5P={showH5P}
          />
        ) : (
          <ChatMessage
            colors={colors}
            data={data}
            text={text}
            self={self}
            isMainNode={isMainNode}
            onPressLoad={OnH5PNodeLoad}
            showH5P={showH5P}
            h5pId={h5pId}
            navigation={navigation}
            showLinkBtnText={item?.showLinkBtnText}
          />
        )}
        <MessageTime time={time} self={self} colors={colors} />
        {isMultiAns && loadDataLength < data.length && (
          <Button
            title='Load More'
            textStyle={{ color: '#3EB6FF', ...fontStyles.Maison_400_12PX_16LH }}
            containerStyle={{ alignSelf: 'center' }}
            onPress={() => {
              setLoadDataLength((prevLength) => prevLength + 5);
              scrollDown();
            }}
          />
        )}
      </View>
    </View>
  );
};
