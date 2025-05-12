import { loaderAnimation } from '@nikshay-setu-v3-monorepo/assets';
import { CustomRFValue } from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  HealthFacility,
  HealthFacilityList,
  RootReducerStates,
  ScreenProps,
} from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import FacilityCard from 'apps/nikshy-setu-mob/src/components/cards/facilityCard';
import SkeletonLoader from 'apps/nikshy-setu-mob/src/components/cards/skeletonLoader';
import { UniversalCard } from 'apps/nikshy-setu-mob/src/components/cards/universalCard';
import SearchBarWithFilterAndSort from 'apps/nikshy-setu-mob/src/components/inputComponents/searchBarWithFilterAndSort';
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import { FlatList, Linking, Text, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
const NotificationSkeleton = () => {
  return (
    <UniversalCard
      style={{ margin: RFValue(5) }}
      styleName='bgFFFMargin10PaddingV8paddingH24'
    >
      <View>
        <View style={{ height: RFValue(25), marginEnd: RFValue(90) }}>
          <SkeletonLoader />
        </View>
        <View style={{ height: RFValue(50) }}>
          <SkeletonLoader />
        </View>
        <View style={{ height: RFValue(20), marginStart: RFPercentage(25) }}>
          <SkeletonLoader />
        </View>
      </View>
    </UniversalCard>
  );
};
const openGoogleMaps = (latitude: string, longitude: string) => {
  const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  Linking.openURL(url).catch((err) => console.error('An error occurred', err));
};

const InfiniteScroll = (initialQuery) => {
  // state
  const [data, setData] = useState<HealthFacility[][]>([[]]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState((initialQuery && initialQuery) || null);
  console.log(query ? query : `?page=${page}`);

  // get hook
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    // get chat history api
    dispatch(
      createAction<null, HealthFacilityList>(
        {
          method: 'GET',
          url: 'REFERRAL_HEALTH_FACILITY',
          query: query
            ? `${query}&page=${page}&limit=10`
            : `page=${page}&limit=10`,
        },
        (statusCode, response) => {
          if (statusCode == 200) {
            const { list, currentPage, totalPages } = response;
            // refactor response
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
  }, [page, query]);

  function loadMore(query) {
    if (hasMore && loading == false) {
      setPage((old) => old + 1);
      if (query) {
        setData([]);
        setQuery(query);
      }
    }
  }

  return { data: data.flat(1), loadMore, loading };
};

const ReferralHealthList: React.FC<ScreenProps<'referralHealthList'>> = ({
  navigation,
  route,
}) => {
  const { theme, query } = route.params;
  const loadingApis = useSelector(
    (state: RootReducerStates) => state.appContext?.loadingApis
  );
  const appTranslations = useSelector(
    (state: RootReducerStates) => state.appContext?.data?.appTranslations
  );
  const [sortOrder, setSortOrder] = useState(null);

  const { data, loading, loadMore } = InfiniteScroll(query);
  const loadMoreData = () => {
    if (!loading) {
      loadMore(null);
    }
  };
  return (
    <View style={{ padding: RFValue(15), backgroundColor: '#ffff', flex: 1 }}>
      <SearchBarWithFilterAndSort
        navigation={navigation}
        sortOrder={sortOrder}
        onFilterPress={() => {
          navigation.navigate('referralHealthFilter');
        }}
        onSortChange={(sortOrder) => {
          if (!loading) {
            loadMore(`?${query}&sortOrder=${sortOrder}`);
            setSortOrder(sortOrder);
          }
        }}
        onSearchPress={(v) => {
          if (!loading) {
            loadMore(`healthFacilityCode=${v}`);
          }
        }}
      />

      {/* <UniversalCard
        style={{ marginTop: RFValue(10), padding: RFValue(0), margin: RFValue(0) }}
        styleName='bgGrayRadius20padding20flex1'
      > */}
      <View
        style={{
          marginTop: RFValue(10),
          padding: CustomRFValue(10),
          borderRadius: CustomRFValue(20),
          backgroundColor: '#F3F5F6',
        }}
      >
        {!loading && data?.length === 0 ? (
          <Text
            style={{
              textAlignVertical: 'center',
              textAlign: 'center',
              alignSelf: 'center',
            }}
          >
            {appTranslations?.APP_NO_DATA_FOUND}
          </Text>
        ) : data?.length === 0 ? (
          Array.from({ length: 4 }).map((_, k) => {
            return <NotificationSkeleton key={k} />;
          })
        ) : (
          <FlatList
            data={data}
            scrollEnabled={true}
            keyExtractor={(tem, index) => index + '-FacilityCard-'}
            ListEmptyComponent={
              <Text
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  marginTop: RFValue(40),
                }}
              >
                No Data Found
              </Text>
            }
            renderItem={({ item }) => (
              <FacilityCard
                key={item?._id}
                appTranslations={appTranslations}
                hospitalName={item?.healthFacilityCode}
                locations={[
                  item?.stateId.title,
                  item?.districtId.title,
                  item?.blockId.title,
                ]}
                item={item}
                onDirectionPress={() => {
                  openGoogleMaps(item?.latitude, item?.longitude);
                }}
              />
            )}
            onEndReached={loadMoreData}
            onEndReachedThreshold={1}
            refreshing={loading}
            ListFooterComponent={
              (loading && (
                <React.Fragment>
                  <LottieView
                    autoPlay
                    source={loaderAnimation}
                    loop={true}
                    style={{
                      alignSelf: 'center',
                      height: RFValue(90),
                      width: RFValue(90),
                    }}
                  />
                </React.Fragment>
              )) || <View />
            }
          />
        )}
      </View>
      {/* </UniversalCard> */}
    </View>
  );
};

export default ReferralHealthList;
