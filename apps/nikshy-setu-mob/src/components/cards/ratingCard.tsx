import {
  CloseSvg,
  StarBlankSvg,
  StarSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles, STORE_URL } from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { RootReducerStates, ThemeProps } from '@nikshay-setu-v3-monorepo/types';
import {
  getDataFromAsyncStorage,
  CustomRFValue as RFValue,
} from '@nikshay-setu-v3-monorepo/utils';
import { useTheme } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { UserProfileApiResponse } from 'shared/types/src/screens/UserTypes';
import Button from '../buttons/primaryButtons';
import { Row } from '../commonComponents/row_column';
import { useToast } from '../commonComponents/toastProvider';

const RatingCard: React.FC = () => {
  const { colors } = useTheme() as ThemeProps;
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState([]);
  const [isSubmitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const { data, loadingApis } = useSelector(
    (state: RootReducerStates) => state.appContext
  );
  const all_feedback = data?.feedback?.all_feedback;
  useEffect(() => {
    if (all_feedback?.length) {
      const initialRatings = all_feedback.map((v) => ({
        id: v?._id,
        rating: 0,
        skip: false,
        icon: v?.feedbackIcon,
        header: v?.question?.en,
        description: v?.description?.en,
      }));
      setRating(initialRatings);
    }
  }, [all_feedback]);

  const handleRatingChange = (itemId, increment) => {
    setSubmitting(false);
    setRating((prevVal) =>
      prevVal.map((r) => (r.id === itemId ? { ...r, rating: increment } : r))
    );
  };

  const handleSubmit = () => {
    setSubmitting(true);
    const newArray = rating.map(
      ({ feedbackIcon, description, question, header, icon, ...rest }) => rest
    );
    const allRatingsAboveZero = newArray.every((item) => item.rating > 0);

    if (allRatingsAboveZero) {
      dispatch(
        createAction(
          {
            method: 'POST',
            url: 'FEEDBACK_HISTORY',
            data: {
              ratings: newArray,
            },
          },
          (code, res) => {
            setShowRating(false);

            if (code === 200) {
              showToast('We appreciate your response.');
            } else {
              showToast('Oops! An error occurred. Please try again shortly.');
            }
          }
        )
      );
    } else {
    }
  };
  useEffect(() => {
    getDataFromAsyncStorage('userId').then((v) => {
      if (v) {
        dispatch(
          createAction<null, UserProfileApiResponse>(
            {
              method: 'GET',
              url: 'USER_PROFILE',
              query: v,
            },
            (status, res) => {
              const isAttempted = Boolean(
                res?.userContext?.feedbackHistory?.[0]?.isCompleted
              );
              const dateToCheck =
                res?.userContext?.feedbackHistory?.[0]?.createdAt;
              const parsedDate = moment(dateToCheck).format('DD-MM-YYYY');
              const isToday = moment().format('DD-MM-YYYY');
              if (
                status === 200 &&
                ((!isAttempted && !(parsedDate === isToday)) || !dateToCheck)
              ) {
                dispatch(
                  createAction(
                    {
                      method: 'GET',
                      url: 'ALL_FEEDBACK',
                    },
                    (code, res) => {
                      if (code === 200 && !(res?.length === 0))
                        setShowRating(true);
                    }
                  )
                );
              }
            }
          )
        );
      }
    });
  }, []);
  const noData = !(rating?.length && loadingApis.includes('ALL_FEEDBACK'));

  return (
    <React.Fragment>
      <Modal
        animationType='slide'
        visible={showRating}
        transparent
        onRequestClose={() => setShowRating(false)}
      >
        <View style={styles.modalWrapper}>
          <View style={styles.modalView}>
            <Row style={{ justifyContent: 'space-around' }}>
              <Text
                style={[
                  fontStyles.Maison_500_17PX_20LH,
                  { color: colors.DARK_BLUE_394F89, flex: 1 },
                ]}
              >
                ● We are keep improving your feedback is important for us
              </Text>
              <TouchableOpacity
                style={{ flex: 0.2, alignItems: 'flex-end' }}
                onPress={() => setShowRating(false)}
              >
                <CloseSvg style={{ padding: RFValue(7) }} />
              </TouchableOpacity>
            </Row>
            <ScrollView>
              {rating.map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.contentWrapper,
                    { borderColor: colors.LIGHT_GREY_F4F4F4 },
                  ]}
                >
                  <Row style={{ marginVertical: RFValue(5) }}>
                    <Image
                      source={{
                        uri: `${STORE_URL}${item.icon}`,
                        cache: 'only-if-cached',
                      }}
                      style={{ height: RFValue(30), width: RFValue(30) }}
                      resizeMode='stretch'
                    />
                    <Text
                      style={[
                        fontStyles.Maison_500_15PX_21LH,
                        {
                          color: colors.DARK_BLUE_394F89,
                          textAlign: 'center',
                          textAlignVertical: 'center',
                        },
                      ]}
                    >
                      {' ' + item.header}
                    </Text>
                  </Row>
                  <Text
                    style={[
                      fontStyles.Maison_500_13PX_20LH,
                      { color: colors.GREY_797979, textAlign: 'justify' },
                    ]}
                  >
                    {item.description}
                  </Text>
                  <Text
                    style={[
                      fontStyles.Maison_500_15PX_21LH,
                      {
                        color: colors.DARK_BLUE_394F89,
                        marginTop: RFValue(10),
                      },
                    ]}
                  >
                    {'Rate Our ' + item.header}
                  </Text>
                  <Row
                    style={{
                      ...styles.star,
                      borderColor:
                        isSubmitting && item.rating === 0
                          ? colors.RED_DB3611
                          : colors.LIGHT_GREY_F4F4F4,
                    }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <TouchableOpacity
                        key={i}
                        style={{ flex: 0.2, alignItems: 'flex-end' }}
                        onPress={() =>
                          handleRatingChange(
                            item.id,
                            i < item.rating ? i : i + 1
                          )
                        }
                      >
                        {i < item.rating ? <StarSvg /> : <StarBlankSvg />}
                      </TouchableOpacity>
                    ))}
                  </Row>
                </View>
              ))}
            </ScrollView>
            <Row>
              <Button
                bgColor='#FFFF'
                title='Skip'
                textStyle={{ color: '#394F89' }}
                containerStyle={{
                  borderColor: '#394F89',
                  marginHorizontal: RFValue(10),
                  flex: 1,
                }}
                onPress={() => {
                  setSubmitting(true);
                  const newArray = rating.map(
                    ({
                      feedbackIcon,
                      description,
                      question,
                      header,
                      icon,
                      ...rest
                    }) => {
                      return { ...rest, rating: 0, skip: true };
                    }
                  );
                  dispatch(
                    createAction(
                      {
                        method: 'POST',
                        url: 'FEEDBACK_HISTORY',
                        data: {
                          ratings: newArray,
                        },
                      },
                      (code, res) => {
                        setShowRating(false);
                      }
                    )
                  );
                }}
              />
              <Button
                bgColor='#FFFF'
                title='Submit'
                disabled={loadingApis.includes('FEEDBACK_HISTORY')}
                textStyle={{ color: '#394F89' }}
                containerStyle={{
                  borderColor: '#394F89',
                  marginHorizontal: RFValue(10),
                  flex: 1,
                }}
                onPress={handleSubmit}
              />
            </Row>
          </View>
        </View>
      </Modal>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: RFValue(10),
  },
  scrollContainer: {
    flex: 1,
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contentWrapper: {
    padding: RFValue(10),
    borderBottomWidth: 2,
  },
  modalView: {
    margin: RFValue(20),
    backgroundColor: 'white',
    borderRadius: RFValue(12),
    shadowOffset: {
      width: 0,
      height: RFValue(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: RFValue(4),
    elevation: RFValue(5),
    padding: RFValue(20),
    alignItems: 'center',
    maxHeight: '80%',
  },
  star: {
    marginTop: RFValue(10),
    flex: 1,
    justifyContent: 'space-between',
    padding: RFValue(10),
    borderRadius: RFValue(10),
    borderWidth: 1,
  },
});
export default RatingCard;
