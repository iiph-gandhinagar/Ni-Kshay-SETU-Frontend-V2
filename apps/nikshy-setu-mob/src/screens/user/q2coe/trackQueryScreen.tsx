import {
  ArrowSvg,
  CheckSvg,
  loaderAnimation,
  ProfileSvg,
  SortingArrow,
} from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles } from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  RootReducerStates,
  ScreenProps,
  ThemeProps,
} from '@nikshay-setu-v3-monorepo/types';
import {
  generateQueryString,
  CustomRFValue as RFValue,
} from '@nikshay-setu-v3-monorepo/utils';
import { useFocusEffect, useTheme } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { useCallback, useRef, useState } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { Row } from '../../../components/commonComponents/row_column';

const FilterData = [
  { label: 'All', value: false },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Resolved', value: 'completed' },
  { label: 'Transfer Query', value: 'Transfer Query' },
  { label: 'My Response', value: 'My Response' },
];

const checkFilters = {
  DRTB: ['In Progress', 'Resolved', 'All'],
  NODAL: ['In Progress', 'Resolved', 'All', 'Transfer Query', 'My Response'],
  COE: ['In Progress', 'Resolved', 'All', 'Transfer Query', 'My Response'],
};
export const TrackQuery: React.FC<ScreenProps<'trackQuery'>> = ({
  navigation,
  route,
}) => {
  const { colors } = useTheme() as ThemeProps;

  const [query, setQuery] = useState({
    currentPage: 1,
    filterOption: null,
    isHistory: route?.params?.showHistory,
    userId: route?.params?.subscriberId,
  });
  const dispatch = useDispatch();
  const listRef = useRef<FlatList>(null);
  const lastScrollY = useRef(0);
  const { error, data, loadingApis } = useSelector(
    (state: RootReducerStates) => state.appContext
  );
  const loading = loadingApis.includes('QUERY_LIST');
  const loadMoreData = () => {
    if (!loading) {
      if (data?.query2coe?.query_list?.totalPages > query?.currentPage)
        setQuery((prev) => {
          return { ...prev, currentPage: query?.currentPage + 1 };
        });
    }
  };

  const renderItem = ({ item, index }) => {
    const cardColor = colors.LIGHT_BLUE_EEFBFF;

    const MetaData = {
      'In Progress': {
        color: '#FFAA00',
      },
      completed: {
        color: '#4CAF50',
      },
      'Query Transfer': {
        color: '#2196F3',
      },
      undefined: {
        color: 'gray',
      },
    };

    const isMyQuery = item?.raisedBy?._id === route?.params?.subscriberId;
    const isQueryTransfer = item?.status === 'Query Transfer';
    const isHistory =
      item?.respondedBy?._id === route?.params?.subscriberId &&
      item?.status === 'completed';
    return (
      <TouchableOpacity
        key={index + 'massages'}
        onPress={() => {
          navigation.navigate('chatSupport', {
            query: item,
            userType: route?.params?.userType,
            disableOption: true,
          });
        }}
      >
        <Row style={{ justifyContent: 'space-between' }}>
          <Text
            ellipsizeMode='tail'
            style={[
              fontStyles.Maison_400_12PX_16LH,
              {
                color: 'gray',
                padding: RFValue(5),
                margin: RFValue(2),
                backgroundColor: 'white',
                borderRadius: RFValue(10),
              },
            ]}
          >
            ({item.queryId})
          </Text>
          {(isHistory || isQueryTransfer) && (
            <Text
              style={{
                ...fontStyles.Maison_400_12PX_16LH,
                alignSelf: 'flex-end',
                borderBottomLeftRadius: RFValue(10),
                borderTopRightRadius: RFValue(10),
                padding: RFValue(5),
                margin: RFValue(2),
                backgroundColor: 'white',
              }}
            >
              {isQueryTransfer ? 'QUERY TRANSFER' : 'MY RESPONSE'}
            </Text>
          )}
        </Row>
        <Row
          style={{
            padding: RFValue(15),
            alignItems: 'center',
            borderBottomWidth: 1,
            borderColor: colors.LIGHT_GREY_F2F2F2,
          }}
          key={item.query + index}
        >
          <ProfileSvg height={RFValue(30)} width={RFValue(30)} />
          <View
            style={{ width: '100%', flex: 1, marginHorizontal: RFValue(15) }}
          >
            <Text ellipsizeMode='tail' style={fontStyles.Maison_400_14PX_17LH}>
              <Text style={fontStyles.Maison_300_13PX_15LH}>
                Name : {item?.raisedBy?.name + '\n'}
              </Text>
              {item.query}
            </Text>
            {item?.respondedBy?.name && (
              <Text style={fontStyles.Maison_300_13PX_15LH}>
                Responded By : {item?.respondedBy?.name + '\n'}
              </Text>
            )}
          </View>
          {isQueryTransfer ? (
            <SortingArrow
              height={RFValue(15)}
              width={RFValue(15)}
              fill={'white'}
              style={{
                transform: [{ rotate: '220deg' }],
                marginHorizontal: RFValue(5),
                backgroundColor: MetaData?.[item?.status]?.color || 'gray',
                alignSelf: 'center',
                padding: RFValue(8),
                borderRadius: RFValue(20),
              }}
            />
          ) : (
            <CheckSvg
              height={RFValue(15)}
              width={RFValue(15)}
              fill={'white'}
              style={{
                marginHorizontal: RFValue(5),
                backgroundColor: MetaData?.[item?.status]?.color || 'gray',
                alignSelf: 'center',
                padding: RFValue(8),
                borderRadius: RFValue(20),
              }}
            />
          )}
          {item.status === 'completed' ? (
            <View
              style={{
                padding: RFValue(2),
                backgroundColor: '#30D03F',
                marginEnd: RFValue(10),
                borderRadius: RFValue(20),
              }}
            />
          ) : (
            <ArrowSvg />
          )}
        </Row>
      </TouchableOpacity>
    );
  };

  const canRaisedFilterActive =
    !(query?.filterOption === 'My Response') ||
    route?.params?.userType === 'DRTB';
  const canRespondedByFilterActive =
    query?.filterOption === 'Transfer Query' ||
    query?.filterOption === 'My Response' ||
    route?.params?.userType === 'NODAL';
  const canStatusFilterActive =
    route?.params?.userType === 'DRTB' || !(query?.filterOption === 'All');

  const querySettings = {
    DRTB: {
      status: canStatusFilterActive && query?.filterOption,
      respondedBy: null,
      raisedBy: canRaisedFilterActive && route?.params?.subscriberId,
    },
    NODAL: {
      status:
        !(query?.filterOption === 'Transfer Query') &&
        canStatusFilterActive &&
        !(query?.filterOption === 'My Response') &&
        query?.filterOption,
      respondedBy:
        !(query?.filterOption === 'Transfer Query') &&
        canRespondedByFilterActive &&
        route?.params?.subscriberId,
      raisedBy:
        !(query?.filterOption === 'Transfer Query') &&
        canRaisedFilterActive &&
        route?.params?.subscriberId,
      transferredInstitute:
        query?.filterOption === 'Transfer Query' &&
        route?.params?.transferredInstitute,
    },
    COE: {
      status: canStatusFilterActive && query?.filterOption,
      respondedBy: route?.params?.subscriberId,
      raisedBy: null,
    },
  };

  const queryString = generateQueryString(
    ['page', query?.currentPage],
    ['status', querySettings?.[route?.params?.userType]?.status],
    ['respondedBy', querySettings?.[route?.params?.userType]?.respondedBy],
    ['raisedBy', querySettings?.[route?.params?.userType]?.raisedBy],
    [
      'transferredInstitute',
      querySettings?.[route?.params?.userType]?.transferredInstitute,
    ]
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(
        createAction({
          method: 'GET',
          url: 'QUERY_LIST',
          query: queryString,
        })
      );
    }, [query])
  );

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;

    if (
      currentScrollY < lastScrollY.current &&
      currentScrollY === 0 &&
      query.currentPage > 1 &&
      !loading
    ) {
      // Scrolling up and reaching the top
      setQuery((prev) => {
        return { ...prev, currentPage: query?.currentPage - 1 };
      });
    }
    // Update last scroll position
    lastScrollY.current = currentScrollY;
  };

  return (
    <View style={{ flex: 1 }}>
      <Row
        style={{
          padding: RFValue(15),
          backgroundColor: colors.BLUE_00739B,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Row style={{ flex: 1 }}>
          <Text
            style={{
              ...styles.circleText,
              ...fontStyles.Maison_400_14PX_17LH,
              color: colors.WHITE_FFFF,
              backgroundColor: colors.DARK_BLUE_0D4357,
            }}
          >
            {data?.query2coe?.query_list?.totalItems}
          </Text>
          {query?.isHistory ? (
            <Text
              style={{
                ...fontStyles.Maison_400_14PX_17LH,
                color: colors.WHITE_FFFF,
                alignSelf: 'center',
                marginStart: RFValue(5),
              }}
            >
              Query Answered: My Response
            </Text>
          ) : (
            <Dropdown
              data={FilterData?.filter((v) =>
                checkFilters?.[route?.params?.userType]?.includes(v?.label)
              )}
              labelField='label'
              valueField='value'
              value={query?.filterOption}
              placeholder='All Queries'
              style={{ flex: 0.5, marginHorizontal: RFValue(20) }}
              selectedTextStyle={{ color: 'white' }}
              placeholderStyle={{ color: 'white' }}
              onChange={(item) => {
                setQuery((prev) => {
                  return { ...prev, filterOption: item?.value };
                });
              }}
              iconColor='white'
            />
          )}
        </Row>
      </Row>
      <View style={{ flex: 1 }}>
        {loading ? (
          <Text style={{ alignSelf: 'center', marginTop: RFValue(20) }}>
            Loading....
          </Text>
        ) : (
          <FlatList
            ref={listRef}
            data={data?.query2coe?.query_list?.list}
            keyExtractor={(item, index) => item?._id}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.8}
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
            renderItem={renderItem}
            scrollEnabled={true}
            onScroll={handleScroll} // Detect scrolling
            ListFooterComponent={
              loading && (
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
                  <Text
                    style={[
                      {
                        alignSelf: 'center',
                      },
                      fontStyles.Maison_400_12PX_16LH,
                    ]}
                  >
                    Loading more...
                  </Text>
                </React.Fragment>
              )
            }
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  circleText: {
    borderRadius: RFValue(20),
    width: RFValue(25),
    height: RFValue(25),
    textAlign: 'center',
    textAlignVertical: 'center', // For Android
    lineHeight: 40, // For iOS
  },
});
