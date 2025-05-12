import {
  HistorySvg,
  LinkArrow,
  loaderAnimation,
} from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles, uiStyles } from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  ConversationRecord,
  RootReducerStates,
  ScreenProps,
  ThemeProps,
} from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { useTheme } from '@react-navigation/native';
import NoDataCard from 'apps/nikshy-setu-mob/src/components/cards/noDataCard';
import { Row } from 'apps/nikshy-setu-mob/src/components/commonComponents/row_column';
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
type historyQuestionType = {
  sessionId: string;
  message: string;
};
const InfiniteScroll = () => {
  // state
  const [data, setData] = useState<historyQuestionType[][]>([[]]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  // get hook
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    // get chat history api
    dispatch(
      createAction<null, ConversationRecord>(
        {
          method: 'GET',
          url: 'CHAT_CONVERSION',
          query: `?page=${page}`,
        },
        (statusCode, response: ConversationRecord) => {
          if (statusCode == 200) {
            const { list, currentPage, totalPages } = response;
            // refactor response
            const newData = list.map((messageArray): historyQuestionType => {
              const { message, sessionId } = messageArray;
              const FirstMessage = message[0];
              const FirstQuestion = FirstMessage.question[0];
              const messageText =
                FirstQuestion && typeof FirstQuestion == 'object'
                  ? FirstQuestion.en
                  : (FirstQuestion as string);
              // new data
              return { sessionId, message: messageText };
            });
            // set list index wise array
            setData((oldList) => {
              const newList = [...oldList];
              newList[currentPage] = newData;
              return newList;
            });

            setLoading(false);
            setHasMore(totalPages > currentPage);
          }
        }
      )
    );
  }, [page]);

  function loadMore() {
    if (hasMore && loading == false) {
      setPage((old) => old + 1);
    }
  }

  return { data: data.flat(1), loadMore, loading };
};

export const HistoryScreen: React.FC<ScreenProps<'historyScreen'>> = ({
  navigation,
  route,
}) => {
  const appTranslations = useSelector(
    (state: RootReducerStates) => state.appContext?.data?.appTranslations
  );
  const { data, loading, loadMore } = InfiniteScroll();
  const { colors } = useTheme() as ThemeProps;
  const loadMoreData = () => {
    if (!loading) {
      loadMore();
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: RFValue(10),
      backgroundColor: colors?.LIGHT_GREY_F3F5F6,
    },
    loaderAnimation: {
      ...uiStyles.loaderAnimation,
      alignSelf: 'center',
      flex: 1,
      alignContent: 'center',
    },
    noDataText: {
      marginTop: RFValue(50),
      alignSelf: 'center',
      ...fontStyles.Maison_500_15PX_21LH,
    },
    rowStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 0.5,
      padding: RFValue(10),
      flex: 1,
      borderColor: colors.GREY_797979,
    },
    questionTxt: {
      flex: 1,
      paddingHorizontal: RFValue(15),
      marginLeft: RFValue(5),
      ...fontStyles.Maison_400_16PX_25LH,
      color: colors.GREY_797979,
    },
    loaderAnimation2: {
      alignSelf: 'center',
      height: RFValue(90),
      width: RFValue(90),
    },
    loadMore: {
      alignSelf: 'center',
      ...fontStyles.Maison_400_12PX_16LH,
    },
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={!loading && <NoDataCard />}
        renderItem={({ item, index }) => {
          return (
            <Pressable
              key={index + 'history'}
              onPress={() => {
                navigation.navigate('askSetu', {
                  fromHistory: { sessionId: item.sessionId },
                  appLang: route?.params?.appLang,
                  appTranslations: appTranslations,
                });
              }}
            >
              <Row style={styles.rowStyle}>
                <HistorySvg
                  stroke={colors.GREY_797979}
                  strokeWidth={0.5}
                  style={uiStyles.historyIc}
                />
                <Text
                  style={styles.questionTxt}
                  numberOfLines={2}
                  ellipsizeMode='tail'
                >
                  {item?.message}
                </Text>
                <LinkArrow
                  stroke={colors.GREY_797979}
                  strokeWidth={0.5}
                  style={uiStyles.historyIc}
                />
              </Row>
            </Pressable>
          );
        }}
        onEndReached={loadMoreData}
        onEndReachedThreshold={1}
        refreshing={loading}
        ListFooterComponent={
          (loading && (
            <LottieView
              autoPlay
              source={loaderAnimation}
              loop={true}
              style={styles.loaderAnimation2}
            />
          )) || <View />
        }
      />
    </View>
  );
};
