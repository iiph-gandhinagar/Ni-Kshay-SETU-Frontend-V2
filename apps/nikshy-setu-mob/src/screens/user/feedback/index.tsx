import { StarBlankSvg, StarSvg } from '@nikshay-setu-v3-monorepo/assets';
import {
  fontStyles,
  STORE_URL,
  uiStyles,
} from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  RootReducerStates,
  ScreenProps,
} from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { useFocusEffect } from '@react-navigation/native';
import Button from 'apps/nikshy-setu-mob/src/components/buttons/primaryButtons';
import NoDataCard from 'apps/nikshy-setu-mob/src/components/cards/noDataCard';
import { Row } from 'apps/nikshy-setu-mob/src/components/commonComponents/row_column';
import { useToast } from 'apps/nikshy-setu-mob/src/components/commonComponents/toastProvider';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
export const Feedback: React.FC<ScreenProps<'feedback'>> = ({
  navigation,
  route,
}) => {
  const colors = route.params.theme.colors;
  const [rating, setRating] = useState([]);
  const [isSubmitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const loadingApis = useSelector(
    (state: RootReducerStates) => state.appContext?.loadingApis
  );
  const data = useSelector(
    (state: RootReducerStates) => state.appContext?.data
  );
  const appTranslations = useSelector(
    (state: RootReducerStates) => state.appContext?.data?.appTranslations
  );
  const { showToast } = useToast();
  const all_feedback = data?.feedback?.all_feedback;

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
            if (code === 200 && res) {
              showToast(appTranslations?.APP_MESSAGE_WE_APPRECIATE_RES);
              navigation?.goBack();
            } else {
              showToast(appTranslations?.APP_AN_ERROR_OCCURRED_MESSAGE);
            }
          }
        )
      );
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(
        createAction({
          method: 'GET',
          url: 'ALL_FEEDBACK',
        })
      );
    }, [])
  );

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

  const noData = !(rating?.length && loadingApis.includes('ALL_FEEDBACK'));
  const styles = StyleSheet.create({
    contentWrapper: {
      padding: RFValue(10),
      borderBottomWidth: 2,
      borderColor: colors.LIGHT_GREY_F4F4F4,
    },
    star: {
      marginTop: RFValue(10),
      flex: 1,
      justifyContent: 'space-between',
      padding: RFValue(10),
      borderRadius: RFValue(10),
      borderWidth: 1,
    },
    Image: {
      height: RFValue(24),
      width: RFValue(24),
    },
    improvementTxt: {
      ...fontStyles.Maison_500_17PX_20LH,
      color: colors.DARK_BLUE_394F89,
    },
    marginVertical5: { marginVertical: RFValue(5) },
    icon: { height: RFValue(30), width: RFValue(30) },
    headerTxt: {
      ...fontStyles.Maison_500_15PX_21LH,
      color: colors.DARK_BLUE_394F89,
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    descriptionTxt: {
      ...fontStyles.Maison_500_13PX_20LH,
      color: colors.GREY_797979,
      textAlign: 'justify',
    },
    submitBtn: {
      borderColor: '#394F89',
      marginHorizontal: RFValue(10),
      flex: 1,
    },
    starContainer: { flex: 0.2, alignItems: 'flex-end' },
    ratingTxt: {
      ...fontStyles.Maison_500_15PX_21LH,
      color: colors.DARK_BLUE_394F89,
      marginTop: RFValue(10),
    },
  });

  return (
    <View style={uiStyles?.flex1Padding10}>
      {!isSubmitting && rating.length === 0 ? (
        <NoDataCard status={noData ? 'noData' : 'loading'} />
      ) : (
        <View style={uiStyles?.flex1}>
          <Text style={styles?.improvementTxt}>
            {appTranslations?.CONTACT_WE_IMPROVE_YOUR_FEEDBACK_IMP_US}
          </Text>
          <ScrollView>
            {rating.map((item, index) => (
              <View key={index} style={styles.contentWrapper}>
                <Row style={styles?.marginVertical5}>
                  <Image
                    source={{
                      uri: `${STORE_URL}${item.icon}`,
                      cache: 'only-if-cached',
                    }}
                    style={styles?.icon}
                    resizeMode='stretch'
                  />
                  <Text style={styles?.headerTxt}>{' ' + item.header}</Text>
                </Row>
                <Text style={styles?.descriptionTxt}>{item.description}</Text>
                <Text style={styles?.ratingTxt}>
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
                      style={styles?.starContainer}
                      onPress={() =>
                        handleRatingChange(item.id, i < item.rating ? i : i + 1)
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
              title={appTranslations?.APP_SUBMIT}
              disabled={loadingApis.includes('FEEDBACK_HISTORY')}
              textStyle={{ color: '#394F89' }}
              containerStyle={styles?.submitBtn}
              onPress={handleSubmit}
            />
          </Row>
        </View>
      )}
    </View>
  );
};
