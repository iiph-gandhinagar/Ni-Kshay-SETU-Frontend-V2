import { fontStyles, uiStyles } from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  RootReducerStates,
  ScreenProps,
} from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import NoDataCard from 'apps/nikshy-setu-mob/src/components/cards/noDataCard';
import SkeletonLoader from 'apps/nikshy-setu-mob/src/components/cards/skeletonLoader';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Linking,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { UniversalCard } from '../../../components/cards/universalCard';

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
const NotificationScreen: React.FC<ScreenProps<'notificationScreen'>> = ({
  route,
}) => {
  const colors = route?.params?.theme?.colors;
  const loadingApis = useSelector(
    (state: RootReducerStates) => state.appContext?.loadingApis
  );
  const dispatch = useDispatch();
  const [data, setNotifications] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const renderFooter = () => {
    if (!loadingApis.includes('AUTOMATIC_NOTIFICATION')) return null;
    return <ActivityIndicator size='large' color={colors.DARK_BLUE_394F89} />;
  };

  const fetchData = async (page) => {
    try {
      dispatch(
        createAction(
          {
            method: 'GET',
            url: 'AUTOMATIC_NOTIFICATION',
            query: `?page=${page}`,
          },
          (status, res) => {
            if (
              status == 200 &&
              res &&
              Array.isArray(res?.list) &&
              res?.list?.length > 0
            ) {
              setNotifications((prevData) => [
                ...(prevData || []),
                ...res?.list,
              ]);
              setTotalPages(res?.totalPages);
            } else {
              setNotifications([]);
            }
          }
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <View style={uiStyles?.flex1BgWhite}>
      <UniversalCard
        style={uiStyles?.marginTop10}
        styleName='bgGrayRadius20padding20flex1'
      >
        <View>
          {data === null && loadingApis.includes('AUTOMATIC_NOTIFICATION') ? (
            Array.from({ length: 4 }).map((_, k) => {
              return <NotificationSkeleton key={k} />;
            })
          ) : data?.length > 0 ? (
            <FlatList
              data={data}
              scrollEnabled
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
              keyExtractor={(tem, index) => index + '-Notification'}
              renderItem={({ item }) => (
                <UniversalCard
                  style={{ margin: RFValue(5) }}
                  key={item?.updatedAt}
                  styleName='bgFFFMargin10PaddingV8paddingH24'
                >
                  <TouchableHighlight
                    underlayColor={null}
                    onPress={async () => {
                      if (item?.link) {
                        console.log(item.link);

                        try {
                          // Check if the link can be opened
                          const supported = await Linking.canOpenURL(item.link);

                          if (supported) {
                            // Open the link
                            await Linking.openURL(item.link);
                          } else {
                            // Show an alert if the URL is not supported
                            Alert.alert(
                              'Invalid URL',
                              'The provided URL cannot be opened.'
                            );
                          }
                        } catch (error) {
                          console.error('Error opening URL:', error);
                          Alert.alert(
                            'Error',
                            'An error occurred while trying to open the link.'
                          );
                        }
                      } else {
                        Alert.alert('No URL', 'No link is available to open.');
                      }
                    }}
                  >
                    <>
                      <Text
                        style={{
                          color: colors.DARK_BLUE_394F89,
                          ...fontStyles.Maison_600_16PX_21LH,
                        }}
                      >
                        {item?.title}
                      </Text>
                      <Text
                        style={[
                          fontStyles.Maison_400_12PX_16LH,
                          {
                            paddingTop: RFValue(5),
                          },
                        ]}
                      >
                        {item?.description}
                      </Text>

                      <Text
                        style={[
                          fontStyles.Maison_400_12PX_16LH,
                          {
                            textAlign: 'right',
                            color: colors.GREY_797979,
                            marginTop: RFValue(5),
                          },
                        ]}
                      >
                        {(item?.updatedAt &&
                          moment(item?.updatedAt).format(
                            'DD MMM YY, HH:mm A'
                          )) ||
                          ''}
                      </Text>
                    </>
                  </TouchableHighlight>
                </UniversalCard>
              )}
              ListFooterComponent={renderFooter}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
            />
          ) : (
            <NoDataCard />
          )}
        </View>
      </UniversalCard>
    </View>
  );
};
export default NotificationScreen;
