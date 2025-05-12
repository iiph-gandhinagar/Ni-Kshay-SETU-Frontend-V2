import {
  botHeyAnimation,
  chatBgPng,
  HistorySvg,
} from '@nikshay-setu-v3-monorepo/assets';
import { ColorProps, fontStyles } from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  RootReducerStates,
  ScreenProps,
  ThemeProps,
} from '@nikshay-setu-v3-monorepo/types';
import {
  getDataFromAsyncStorage,
  CustomRFValue as RFValue,
} from '@nikshay-setu-v3-monorepo/utils';
import { useTheme } from '@react-navigation/native';
import { InputField } from 'apps/nikshy-setu-mob/src/components/inputComponents';
import { GradientText } from 'apps/nikshy-setu-mob/src/components/textComponent/gradientText';
import { storeSubscriberActivity } from 'apps/nikshy-setu-mob/src/utils/functions';
import LottieView from 'lottie-react-native';
import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useRef,
} from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Easing } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { UserProfileApiResponse } from 'shared/types/src/screens/UserTypes';
import { Column, Row } from '../../../components/commonComponents/row_column';

export const ChatScreen: React.FC<ScreenProps<'chatScreen'>> = ({
  navigation,
}) => {
  const { colors } = useTheme() as ThemeProps;
  const user_profile = useSelector(
    (state: RootReducerStates) => state.appContext?.data?.user_profile
  );
  const appTranslations = useSelector(
    (state: RootReducerStates) => state.appContext?.data?.appTranslations
  );
  const topQuestion = useSelector(
    (state: RootReducerStates) =>
      state.appContext?.data?.chatScreen?.chat_top_question
  );
  const chunkSize = Math.ceil(topQuestion?.length / 3);
  const dispatch = useDispatch();
  const part1 = topQuestion?.slice(0, chunkSize);
  const part2 = topQuestion?.slice(chunkSize, chunkSize * 2);
  const part3 = topQuestion?.slice(chunkSize * 2);
  const screenWidth = Dimensions.get('window').width;
  const scrollAnim1 = useRef(new Animated.Value(0)).current;
  const scrollAnim2 = useRef(new Animated.Value(0)).current;
  const scrollAnim3 = useRef(new Animated.Value(0)).current;

  const styles = StyleSheet.create({
    chatBgPng: {
      flex: 1,
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      paddingHorizontal: RFValue(10),
    },
    gradient: {
      padding: RFValue(10),
      marginVertical: RFValue(10),
      borderRadius: RFValue(10),
      borderWidth: RFValue(0.5),
      borderColor: '#635AD970',
      backgroundColor: colors.WHITE_FFFF,
    },
    botAnimation: {
      height: RFValue(120),
      width: RFValue(160),
      marginStart: -RFValue(50),
      margin: -RFValue(15),
      alignSelf: 'flex-start',
    },
    row: { flex: 1, justifyContent: 'space-between' },
    text: {
      padding: RFValue(10),
      margin: RFValue(5),
      borderRadius: RFValue(10),
      borderWidth: 1,
      alignSelf: 'flex-start',
      backgroundColor: '#F9F9F9',
    },
    inputTextContainerStyle: {
      backgroundColor: colors.LIGHT_GREY_F4F4F4,
    },
    chatDecOne: {
      ...fontStyles.Maison_500_13PX_20LH,
      color: colors.DARK_GREY_495555,
    },
    chatTopicTxt: {
      ...fontStyles.Maison_500_15PX_21LH,
      color: colors.BLACK_000000,
      marginVertical: RFValue(10),
    },
  });

  const renderText = (
    textArray: any[],
    keyPrefix: string,
    scrollAnim: Animated.Value,
    colors: ColorProps
  ) => (
    <Animated.View
      style={{ flexDirection: 'row', transform: [{ translateX: scrollAnim }] }}
    >
      {textArray?.map(
        (
          v: {
            id: any;
            question:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal;
          },
          k: any
        ) => (
          <TouchableHighlight
            key={k + v?.id}
            onPress={() => {
              storeSubscriberActivity({
                module: 'Chatbot',
                action: 'chatKeyword-click',
                dispatch: dispatch,
              });
              navigation.navigate('askSetu', { questionInfo: v });
            }}
            underlayColor={null}
          >
            <Text
              key={k + v?.id}
              style={[
                styles.text,
                {
                  color: colors.GREY_797979,
                  borderColor: colors.DARK_BLUE_394F89,
                },
              ]}
            >
              {v?.question}
            </Text>
          </TouchableHighlight>
        )
      )}
    </Animated.View>
  );

  useEffect(() => {
    const startAnimation = (
      scrollAnim: Animated.Value | Animated.ValueXY,
      duration: number
    ) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scrollAnim, {
            toValue: -screenWidth,
            duration: duration,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(scrollAnim, {
            toValue: 0,
            duration: duration,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
        { iterations: -1 }
      ).start();
    };
    chunkSize > 2 && startAnimation(scrollAnim1, 7700);
    chunkSize > 2 && startAnimation(scrollAnim2, 6500);
    chunkSize > 2 && startAnimation(scrollAnim3, 8500);
  }, [scrollAnim1, scrollAnim2, scrollAnim3, screenWidth, topQuestion]);

  useEffect(() => {
    dispatch(
      createAction(
        {
          method: 'GET',
          url: 'CHAT_TOP_QUESTION',
        },
        (code, res) => {
          if (code === 200 && res) {
            storeSubscriberActivity({
              module: 'Chatbot',
              action: 'Chat Keyword Fetched',
              dispatch: dispatch,
            });
          }
        }
      )
    );
    getDataFromAsyncStorage('userId').then((v) => {
      if (v) {
        dispatch(
          createAction<null, UserProfileApiResponse>({
            method: 'GET',
            url: 'USER_PROFILE',
            query: v,
          })
        );
      }
    });
  }, [screenWidth]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={chatBgPng}
        resizeMode='cover'
        style={styles.chatBgPng}
      >
        <ScrollView showsVerticalScrollIndicator={false} scrollsToTop>
          <LinearGradient
            colors={[
              colors.TRANSPARENT_PURPLE_9C5ED740,
              colors.TRANSPARENT_PURPLE_635AD940,
              colors.TRANSPARENT_PINK_E8A0A040,
            ]}
            style={styles.gradient}
          >
            <Column>
              <Row style={styles.row}>
                <LottieView
                  autoPlay
                  source={botHeyAnimation}
                  loop={true}
                  style={styles.botAnimation}
                />
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('historyScreen');
                  }}
                >
                  <HistorySvg height={RFValue(25)} width={RFValue(25)} />
                </TouchableOpacity>
              </Row>
              <Column>
                <View>
                  <GradientText
                    text={`${appTranslations?.CHAT_GREETINGS_HELLO} ${
                      user_profile?.name || ''
                    } !`}
                    fontSize={RFValue(32)}
                    fontWeight={700}
                    locations={{ x: 0, y: RFValue(30) }}
                    height={RFValue(40)}
                    isGradientFill
                    width={'100%'}
                    gradientColors={[
                      colors.PINK_E8A0A0,
                      colors.PURPLE_9C5ED7,
                      colors.PURPLE_635AD9,
                    ]}
                  />
                </View>
                <Text style={styles?.chatDecOne}>
                  {appTranslations?.CHAT_DEC_ONE}
                </Text>
              </Column>
            </Column>
          </LinearGradient>
          <Text style={styles?.chatTopicTxt}>
            {appTranslations?.APP_CHATBOT_CHOOSE_TOPIC_OR_YOUR_QUEST_HERE}
          </Text>
          <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Column>
                <Row>{renderText(part1, 'text1', scrollAnim1, colors)}</Row>
                <Row>{renderText(part2, 'text2', scrollAnim2, colors)}</Row>
                <Row>{renderText(part3, 'text3', scrollAnim3, colors)}</Row>
              </Column>
            </ScrollView>
          </View>
        </ScrollView>
        <InputField.MessageInput
          error=''
          hideCameraIcon
          hideAttachmentsIcon
          onSendClick={(v) => {
            navigation.navigate('askSetu', {
              questionInfo: { searchByQuery: true, question: v },
            });
            storeSubscriberActivity({
              module: 'Chatbot',
              action: 'Search By Keyword Fetched',
              dispatch: dispatch,
            });
          }}
          inputTextContainerStyle={styles?.inputTextContainerStyle}
        />
      </ImageBackground>
    </View>
  );
};
