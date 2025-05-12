import {
  GradientArrowSvg,
  InfoSvg,
  loaderAnimation,
  QueryResSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles } from '@nikshay-setu-v3-monorepo/constants';
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
import { useFocusEffect, useTheme } from '@react-navigation/native';
import NoDataCard from 'apps/nikshy-setu-mob/src/components/cards/noDataCard';
import ModalComponent from 'apps/nikshy-setu-mob/src/components/commonComponents/modal';
import PluginInfoModal from 'apps/nikshy-setu-mob/src/components/pluginInfoModal';
import LottieView from 'lottie-react-native';
import moment from 'moment';
import React, { useCallback, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { UserProfileApiResponse } from 'shared/types/src/screens/UserTypes';
import Button from '../../../components/buttons/primaryButtons';
import { QueryItem } from '../../../components/cards/queryCard';
import { Row } from '../../../components/commonComponents/row_column';

const QRMScreen: React.FC<ScreenProps<'QRMScreen'>> = ({
  navigation,
  route,
}) => {
  const { colors } = useTheme() as ThemeProps;
  const [showQueries, setShowQueries] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState({
    x: 0,
    y: 0,
    isOpen: false,
  });
  const { error, data, loadingApis } = useSelector(
    (state: RootReducerStates) => state.appContext
  );
  const appTranslations = useSelector(
    (state: RootReducerStates) => state.appContext?.data?.appTranslations
  );
  const [isExitModal, setExitModal] = useState(true);
  const dispatch = useDispatch();
  const handlePress = (e) => {
    const { pageX, pageY } = e.nativeEvent;
    setIsModalVisible({ x: 0, y: pageY + 10, isOpen: true });
  };
  const userType =
    data?.user_profile?.userContext?.queryDetails?.type?.name || 'Default';
  const closeModal = () => {
    setIsModalVisible({ x: 0, y: 0, isOpen: false });
  };
  useFocusEffect(
    useCallback(() => {
      getDataFromAsyncStorage('userId').then((v) => {
        if (v) {
          dispatch(
            createAction<null, UserProfileApiResponse>(
              {
                method: 'GET',
                url: 'USER_PROFILE',
                query: v,
              },
              (code, res) => {
                const userType =
                  res.userContext?.queryDetails?.type?.name || 'Default';
                const IsCOE_NODAL =
                  !(userType === 'DRTB') &&
                  Boolean(res?.userContext?.queryDetails?.instituteId);
                if (code === 200 && !(userType === 'Default')) {
                  dispatch(
                    createAction({
                      method: 'GET',
                      url: 'QUERY_LIST',
                      query: IsCOE_NODAL
                        ? '?sortOrder=desc&sortBy=createdAt&queryRespondedInstitute=' +
                          res?.userContext?.queryDetails?.instituteId
                        : `?raisedBy=${v}`,
                    })
                  );
                }
                setShowQueries(true);
              }
            )
          );
        }
      });
    }, [])
  );
  const metaData = {
    COE: {
      hideRaiseQueryBtn: true,
      subHeader: 'Q2COE_ANSWER_QUERY_FROM_JUNIOR',
      queryListTitle: 'Q2COE_AWAITING_RESPONSE',
      queryListButtonText: 'Q2COE_AWAITING_RESPONSE',
      trackQueryParams: {
        subscriberId: data?.user_profile?._id,
        userType: userType,
        showHistory: true,
      },
    },
    NODAL: {
      subHeader: 'Q2COE_RAISING_QUERY_ANSWER_JUNIOR',
      queryListTitle: 'Q2COE_AWAITING_RESPONSE',
      queryListButtonText: 'Q2COE_AWAITING_RESPONSE',
      trackQueryParams: {
        Q2COE_INFO_TRANSFERREDInstitute:
          data?.user_profile?.userContext?.queryDetails?.instituteId,
        subscriberId: data?.user_profile?._id,
        userType: userType,
      },
    },
    DRTB: {
      subHeader: 'Q2COE_RAISE_QUERY_TO_SENIOR_DR',
      queryListTitle: 'Q2COE_MY_QUERY',
      queryListButtonText: 'Q2COE_CHECK_QUERY',
      trackQueryParams: {
        subscriberId: data?.user_profile?._id,
        userType: userType,
      },
    },
    Subscriber: {
      subHeader: 'Q2COE_RAISE_QUERY_TO_SENIOR_DR',
      queryListTitle: 'Q2COE_LATEST_QUERY',
      queryListButtonText: 'Q2COE_CHECK_QUERY',
      trackQueryParams: {
        subscriberId: data?.user_profile?._id,
        userType: userType,
      },
    },
    Default: {
      hideRaiseQueryBtn: true,
      hideTrackQueryBtn: true,
      subHeader: 'You Are Not Elidible',
      queryListTitle: 'Latest Query',
      queryListButtonText: 'Check Query',
      trackQueryParams: {
        subscriberId: data?.user_profile?._id,
        userType: userType,
      },
    },
  };
  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={colors.DARK_BLUE_0B4E67}
        barStyle='light-content'
      />
      <View style={[styles.container, { backgroundColor: colors.WHITE_FFFF }]}>
        <ModalComponent
          closeModal={() => {
            setExitModal(false);
          }}
          isOpen={isExitModal}
          closeable={false}
          containerStyle={{
            backgroundColor: 'white',
            padding: RFValue(15),
            margin: RFValue(10),
          }}
        >
          <Text
            style={[
              fontStyles.Maison_400_17PX_27LH,
              { marginBottom: RFValue(10), color: colors?.DARK_BLUE_0B4E67 },
            ]}
          >
            {appTranslations?.APP_CONFIRMATION}
          </Text>
          <Text
            style={[
              fontStyles.Maison_500_14PX_18LH,
              { marginBottom: RFValue(10) },
            ]}
          >
            {appTranslations?.QUERY_RECOMMEND}
          </Text>
          <Row
            style={{
              justifyContent: 'flex-end',
              flex: 1,
            }}
          >
            <View style={{ flex: 1 }} />
            <Button
              title={appTranslations?.APP_CANCEL}
              containerStyle={{ flex: 1, marginEnd: RFValue(10) }}
              bgColor={colors.DARK_BLUE_0B4E67}
              onPress={() => {
                navigation?.goBack();
              }}
            />
            <Button
              title={appTranslations?.APP_YES}
              containerStyle={{ flex: 1 }}
              bgColor={colors.DARK_BLUE_0B4E67}
              onPress={() => {
                setExitModal(false);
              }}
            />
          </Row>
        </ModalComponent>
        <LinearGradient
          colors={[colors.DARK_BLUE_0B4E67, colors.LIGHT_BLUE_61C9EF]}
          style={{}}
        >
          <View style={styles.topContainer}>
            <Row
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <QueryResSvg height={RFValue(40)} width={RFValue(40)} />
              <InfoSvg
                onPress={handlePress}
                height={RFValue(17)}
                width={RFValue(17)}
              />
            </Row>
            <Text
              style={[
                fontStyles.Maison_500_22PX_29LH,
                { color: '#FFE7AA', marginTop: RFValue(15) },
              ]}
            >
              {appTranslations?.APP_QUERY2COE}
            </Text>
            <Text
              style={[
                fontStyles.Maison_500_14PX_18LH,
                { color: colors.WHITE_FFFF },
              ]}
            >
              {''}
            </Text>
            {!metaData?.[userType]?.hideRaiseQueryBtn && (
              <Button
                title={appTranslations?.Q2COE_RAISE_C_QUERY}
                bgColor={colors.WHITE_FFFF}
                disabled={!Boolean(data?.user_profile?._id && userType)}
                rightIcon={<GradientArrowSvg />}
                onPress={() =>
                  navigation.navigate('raiseQuery', {
                    queryRaisedInstitute:
                      data?.user_profile?.userContext?.queryDetails
                        ?.instituteId,
                    queryRaisedRole:
                      data?.user_profile?.userContext?.queryDetails?.type?._id,
                    subscriberId: data?.user_profile?._id,
                  })
                }
                containerStyle={[
                  styles.button1,
                  { backgroundColor: colors.WHITE_FFFF },
                ]}
                textStyle={[
                  fontStyles.Maison_500_17PX_20LH,
                  { color: '#0B4E6799' },
                ]}
                iconStyle={{ marginStart: RFValue(5) }}
              />
            )}
            {!metaData?.[userType]?.hideTrackQueryBtn && (
              <Button
                title={appTranslations?.Q2COE_TRACK_QUERY}
                bgColor={colors.WHITE_FFFF}
                onPress={() =>
                  navigation.navigate(
                    'trackQuery',
                    metaData?.[userType]?.trackQueryParams
                  )
                }
                containerStyle={[
                  styles.button,
                  { borderColor: colors.WHITE_FFFF, marginTop: RFValue(10) },
                ]}
                textStyle={[
                  fontStyles.Maison_500_18PX_24LH,
                  { color: colors.WHITE_FFFF },
                ]}
              />
            )}
          </View>
        </LinearGradient>
        {userType === 'Default' ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              alignContent: 'center',
              marginTop: RFValue(20),
              padding: RFValue(10),
            }}
          >
            <NoDataCard />
            <Text style={fontStyles.Maison_500_17PX_20LH}>
              {appTranslations?.Q2COE_INFO_CONTACT_IIPHG_TEAM}
            </Text>
          </View>
        ) : (
          <React.Fragment>
            <Row style={{ margin: RFValue(10) }}>
              <Text
                style={{
                  backgroundColor: colors.TRANSPARENT_BLUE_2A7B9842,
                  borderRadius: RFValue(90),
                  color: colors.LIGHT_BLUE_409BBB,
                  paddingHorizontal: RFValue(5),
                  paddingVertical: RFValue(3),
                  marginEnd: RFValue(10),
                }}
              >
                {data?.query2coe?.query_list?.list?.length}
              </Text>
              <Text style={fontStyles.Maison_500_14PX_18LH}>
                {
                  appTranslations[
                    (metaData?.[userType]?.queryListTitle &&
                      metaData?.[userType]?.queryListTitle) ||
                      'APP_LOADING'
                  ]
                }
              </Text>
            </Row>
            <ScrollView
              style={styles.queriesContainer}
              showsVerticalScrollIndicator={false}
            >
              {loadingApis.includes('USER_PROFILE') ||
              loadingApis.includes('QUERY_LIST') ? (
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
              ) : data?.query2coe?.query_list?.list.length === 0 ? (
                <Text
                  style={[
                    fontStyles.Maison_500_13PX_20LH,
                    { alignSelf: 'center', marginTop: RFValue(20) },
                  ]}
                >
                  No Query
                </Text>
              ) : (
                data?.query2coe?.query_list?.list?.map((query, index) => {
                  const createdDate = moment(query?.createdAt).format(
                    'DD MMM, YY'
                  );

                  return (
                    <QueryItem
                      handleAddQuery={() => {}}
                      handleRespondToQuery={() => {
                        navigation.navigate('chatSupport', {
                          query: query,
                          userType: userType,
                          disableOption: userType === 'DRTB',
                          respondedBy: data?.user_profile?._id,
                          queryRespondedInstitute:
                            data?.user_profile?.userContext?.queryDetails
                              ?.instituteId,
                          queryRespondedRole:
                            data?.user_profile?.userContext?.queryDetails?.type
                              ?._id,
                        });
                      }}
                      index={index}
                      query={query.diagnosis}
                      status={query.status}
                      queryDate={`${createdDate}`}
                      buttonText={
                        appTranslations[
                          (metaData?.[userType]?.queryListButtonText &&
                            metaData?.[userType]?.queryListButtonText) ||
                            'APP_LOADING'
                        ]
                      }
                      subject={
                        query?.raisedBy?.name + ` (${query?.queryId})` || ''
                      }
                      key={index + 'QueryItem'}
                    />
                  );
                })
              )}
            </ScrollView>
          </React.Fragment>
        )}
        <PluginInfoModal
          header={appTranslations?.APP_INFO_ABOUT_PLUGIN}
          isOpen={isModalVisible.isOpen}
          text={
            appTranslations?.Q2COE_INFO_INDEX1 +
            '\n\n' +
            appTranslations?.Q2COE_INFO_INDEX2 +
            '\n\n' +
            appTranslations?.Q2COE_INFO_INDEX3 +
            '\n\n' +
            appTranslations?.Q2COE_INFO_INDEX4 +
            '\n\n' +
            appTranslations?.Q2COE_INFO_INDEX5 +
            '\n'
          }
          yPosition={isModalVisible?.y}
          Children={[
            'Q2COE_INFO_INPROGRESS',
            'Q2COE_INFO_COMPLETED',
            'Q2COE_INFO_TRANSFERRED',
          ]?.map((status) => {
            const borderColor =
              status === 'Q2COE_INFO_INPROGRESS'
                ? '#FFAA00'
                : status === 'Q2COE_INFO_COMPLETED'
                ? '#4CAF50'
                : '#2196F3';
            return (
              <Row style={{ alignItems: 'center' }} key={status}>
                <View
                  style={{
                    height: RFValue(15),
                    width: RFValue(15),
                    margin: RFValue(5),
                    backgroundColor: borderColor,
                    borderRadius: RFValue(20),
                  }}
                />
                <Text
                  style={[fontStyles.Maison_400_13PX_20LH, { color: 'white' }]}
                >
                  {appTranslations[status]}
                </Text>
              </Row>
            );
          })}
          closeModal={closeModal}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    padding: RFValue(20),
    borderRadius: RFValue(20),
  },
  title: {
    fontSize: RFValue(24),
    fontWeight: 'bold',
    marginBottom: RFValue(10),
  },
  subtitle: {
    fontSize: RFValue(16),
    marginBottom: RFValue(20),
  },
  button: {
    backgroundColor: 'transparent',
    borderRadius: RFValue(15),
    borderWidth: 1,
    width: '100%',
    padding: RFValue(10),
    alignItems: 'center',
  },
  button1: {
    borderRadius: RFValue(15),
    marginVertical: RFValue(10),
    width: '100%',
    padding: RFValue(13),
    alignItems: 'center',
  },
  queriesContainer: {
    flex: 1,
    marginHorizontal: RFValue(10),
  },
  querySubjectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  addQueryButtonText: {
    justifyContent: 'center',
    flex: 1,
    fontSize: RFValue(20),
    fontWeight: '500',
  },
  respondButton: {
    backgroundColor: 'transparent',
    padding: RFValue(12),
    borderRadius: RFValue(18),
    borderWidth: RFValue(1),
    alignItems: 'center',
  },
});

export default QRMScreen;
