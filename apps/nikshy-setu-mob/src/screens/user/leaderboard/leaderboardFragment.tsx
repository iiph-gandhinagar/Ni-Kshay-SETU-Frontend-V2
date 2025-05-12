import { ImagePlaceholderPng } from '@nikshay-setu-v3-monorepo/assets';
import {
  AppConfigType,
  ColorProps,
  fontStyles,
  langKeyForPlugin,
  STORE_URL,
} from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  AllSubscriberListResponse,
  AllSubscriberProgress,
  TopThreeUserType,
} from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import NoDataCard from 'apps/nikshy-setu-mob/src/components/cards/noDataCard';
import DelayedSkeletonLoaders from 'apps/nikshy-setu-mob/src/components/cards/skeletonCards';
import { Row } from 'apps/nikshy-setu-mob/src/components/commonComponents/row_column';
import { ProgressBar } from 'apps/nikshy-setu-mob/src/components/progressBar/ProgressBar';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import TopThreeUserBar from './TopThreeUserBar';
import TopThreeUserProfileCard from './TopThreeUserProfileCard';
const TotalWidth = Dimensions?.get('window')?.width;
const totalHeight = Dimensions?.get('window')?.height;

const UserProgressiveCard: React.FC<{
  item: {
    cadreTitle: string;
    name: string;
    profileImage: string;
    cadreType: string;
    percentageCompleted: string;
  };
  level: string;
  index: number;
}> = React.memo(({ item, index, level }) => {
  return (
    <Row
      style={{
        padding: RFValue(10),
        alignItems: 'center',
        borderRadius: RFValue(10),
        marginBottom: RFValue(10),
        elevation: 2,
        backgroundColor: 'white',
      }}
    >
      <Text
        style={{
          borderRadius: RFValue(100),
          height: RFValue(30),
          width: RFValue(30),
          textAlign: 'center',
          textAlignVertical: 'center',
          borderWidth: 1,
          ...fontStyles.Maison_500_18PX_26LH,
        }}
      >
        {index}
      </Text>
      <Image
        source={{
          uri:
            (item?.profileImage && STORE_URL + item?.profileImage) ||
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6nhCkw4XFXUxIvH4VjOEXEpyqq0Z7Yb8YeQ&s',
        }}
        height={RFValue(55)}
        width={RFValue(55)}
        style={{
          borderRadius: RFValue(100),
          marginStart: RFValue(5),
          borderWidth: 0.5,
          borderColor: 'gray',
          opacity: !(item?.profileImage && STORE_URL + item?.profileImage)
            ? 0.5
            : 1,
        }}
        progressiveRenderingEnabled={true}
        defaultSource={ImagePlaceholderPng}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          marginStart: RFValue(5),
        }}
      >
        <View>
          <Text
            style={[fontStyles.Maison_400_14PX_17LH, {}]}
            numberOfLines={1}
            ellipsizeMode='tail'
          >
            {item?.name || '--'}
          </Text>
          <Text
            style={[fontStyles.Maison_300_13PX_15LH, { fontSize: RFValue(12) }]}
            numberOfLines={1}
            ellipsizeMode='tail'
          >
            {item.cadreType.replace('_', ' ')}, {item.cadreTitle}
          </Text>
        </View>

        <View style={{ marginTop: RFValue(5) }}>
          <Row
            style={{
              justifyContent: 'space-between',
              marginBottom: RFValue(2),
            }}
          >
            <Text
              style={fontStyles.Maison_400_10PX_12LH}
              numberOfLines={1}
              ellipsizeMode='tail'
            >
              {level}
            </Text>
            <Text style={fontStyles.Maison_400_10PX_12LH}>
              {item?.percentageCompleted || 0}%
            </Text>
          </Row>
          <ProgressBar
            progress={parseInt(item?.percentageCompleted || '0') / 100}
            height={RFValue(4)}
            gradientColor={['#FFC837', '#FF8008']}
          />
        </View>
      </View>
    </Row>
  );
});

const InfiniteScroll = () => {
  // state
  const [data, setData] = useState<AllSubscriberProgress[][]>([[]]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  // get hook
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    // get chat history api
    dispatch(
      createAction<null, AllSubscriberListResponse>(
        {
          method: 'GET',
          url: 'ALL_SUBSCRIBER_PROGRESS',
          query: `?page=${page}&limit=10`,
        },
        (statusCode: number, response) => {
          if (statusCode == 200) {
            const { list, currentPage, totalPages } = response as any;
            // set list index wise array
            setData((oldList) => {
              const newList = [...oldList];
              newList[currentPage] = list;
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

const LeaderboardFragment: React.FC<{
  colors: ColorProps;
  appTranslations: AppConfigType;
  loadingApis: string[];
}> = React.memo(({ colors, appTranslations, loadingApis }) => {
  const animations = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];
  const [users, setUsers] = useState<TopThreeUserType>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    // Start animations sequentially
    Animated.stagger(
      300,
      animations.map((anim) =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        })
      )
    ).start();
  }, []);
  const { data, loading, loadMore } = InfiniteScroll();
  useEffect(() => {
    dispatch(
      createAction<null, TopThreeUserType>(
        {
          method: 'GET',
          url: 'TOP_3_SUB_RANK',
        },
        (code, res: TopThreeUserType) => {
          if (code === 200) {
            const sortedRes = [...res].sort(
              (a, b) => a.completedTasks - b.completedTasks
            );
            // Extract and reorder the top three users
            const user1 = sortedRes[1] || {};
            const user2 = sortedRes[2] || {};
            const user0 = sortedRes[0] || {};
            const reorderedUsers = [user1, user2, user0] as TopThreeUserType;
            setUsers(reorderedUsers);
          }
        }
      )
    );
  }, []);

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={{ padding: 10 }}>
        <ActivityIndicator size='small' color='#0000ff' />
      </View>
    );
  };
  const spliceData = data?.splice(3);

  return (
    <View style={styles.container}>
      {loadingApis?.includes('TOP_3_SUB_RANK') && users.length === 0 ? (
        <View
          style={{
            width: '100%',
            flex: 1,
            alignItems: 'center',
            padding: RFValue(20),
          }}
        >
          <DelayedSkeletonLoaders />
        </View>
      ) : (
        <FlatList
          data={spliceData}
          nestedScrollEnabled={true}
          contentContainerStyle={{
            padding: RFValue(5),
            backgroundColor: 'white',
          }}
          ListHeaderComponent={
            !(spliceData.length === 0) && (
              <View
                style={{
                  height: RFValue(totalHeight * 0.4),
                  alignItems: 'center',
                  backgroundColor: 'white',
                  marginTop: RFValue(20),
                  marginBottom: -RFValue(totalHeight / 25),
                }}
              >
                <Row
                  style={{
                    position: 'absolute',
                    alignItems: 'center',
                  }}
                >
                  {users?.map((item, index) => {
                    const translateY = animations[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [-10, 0], // Start 50 units above its position
                    });
                    const opacity = animations[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1], // Start from 0 opacity
                    });
                    return (
                      <TopThreeUserProfileCard
                        key={index}
                        containerStyle={{
                          top: index === 1 ? -RFValue(20) : RFValue(25),
                          zIndex: 10,
                          transform: [{ translateY }],
                          opacity,
                        }}
                        name={item?.name}
                        appTranslations={appTranslations}
                        performance={item?.level}
                        carder={item?.cadreTitle}
                        profileImage={item.profileImage}
                      />
                    );
                  })}
                </Row>
                <View
                  style={{
                    borderRadius: RFValue(200),
                    borderWidth: 1,
                    height: RFValue(TotalWidth - 10),
                    width: RFValue(TotalWidth - 10),
                    alignItems: 'center',
                    borderColor: '#DFDFDF',
                    justifyContent: 'center',
                    zIndex: -1,
                  }}
                >
                  <View
                    style={{
                      borderRadius: RFValue(200),
                      borderWidth: 1,
                      height: RFValue(TotalWidth - 70),
                      width: RFValue(TotalWidth - 70),
                      alignItems: 'center',
                      borderColor: '#DFDFDF',
                      justifyContent: 'center',
                    }}
                  >
                    {Boolean(users) && <TopThreeUserBar item={users} />}
                  </View>
                </View>
              </View>
            )
          }
          keyExtractor={(item, index) => item.userId.toString() + index}
          ListEmptyComponent={loadingApis?.length === 0 && <NoDataCard />}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View
              style={{
                paddingHorizontal: RFValue(10),
                paddingTop: index === 0 ? RFValue(10) : 0,
                paddingBottom:
                  index + 1 === spliceData.length ? RFValue(20) : 0,
                elevation: RFValue(7),
                backgroundColor: '#EDEFFB',
                borderColor: '#EDEFFB',
                marginHorizontal: RFValue(5),
                borderTopRightRadius: index === 0 ? RFValue(10) : 0,
                borderTopLeftRadius: index === 0 ? RFValue(10) : 0,
              }}
            >
              <UserProgressiveCard
                key={item.userId}
                item={item}
                level={`${appTranslations?.LEADERBOARD_LEVEL} : ${
                  appTranslations[
                    langKeyForPlugin[item.level || 'APP_LOADING'] ||
                      'APP_LOADING'
                  ]
                }`}
                index={index + 4}
              />
            </View>
          )}
          onEndReached={() => {
            if (!loading) {
              loadMore();
            }
          }}
          onEndReachedThreshold={0.7}
          ListFooterComponent={renderFooter}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    width: RFValue(75),
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  card1: {
    backgroundColor: '#9087E4',
    height: RFValue(90),
  },
  card2: {
    backgroundColor: '#e74c3c',
    height: RFValue(120),
  },
  card3: {
    backgroundColor: '#8e44ad',
    height: RFValue(80),
  },
  cardTopLayer: {
    width: RFValue(75),
    height: 0,
    borderBottomWidth: RFValue(13),
    borderBottomColor: '#ACA6EC',
    borderLeftWidth: RFValue(20),
    borderLeftColor: 'transparent',
    borderRightWidth: RFValue(20),
    borderRightColor: 'transparent',
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    ...fontStyles.Maison_500_24PX_28LH,
    fontSize: RFValue(70),
    lineHeight: RFValue(80),
    fontWeight: '800',
    color: 'white',
  },
  button: {
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#2980b9',
    borderRadius: RFValue(10),
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
export default LeaderboardFragment;
