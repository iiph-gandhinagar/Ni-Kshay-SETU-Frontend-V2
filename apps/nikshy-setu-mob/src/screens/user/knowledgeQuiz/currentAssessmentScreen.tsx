import { fontStyles } from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  RootReducerStates,
  ScreenProps,
  ThemeProps,
} from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { useFocusEffect, useTheme } from '@react-navigation/native';
import { Card } from 'apps/nikshy-setu-mob/src/components/cards/MainCard';
import NoDataCard from 'apps/nikshy-setu-mob/src/components/cards/noDataCard';
import { AssessmentSkeletonCard } from 'apps/nikshy-setu-mob/src/components/cards/skeletonCards';
import { Row } from 'apps/nikshy-setu-mob/src/components/commonComponents/row_column';
import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AssessmentCardComponent from '../../../components/cards/assessmentCardComponent';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: RFValue(5),
    paddingVertical: RFValue(10),
  },
  tabRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: RFValue(20),
  },
  assessmentView: { flex: 1, marginBottom: RFValue(25) },
  title: {
    fontSize: RFValue(24),
    fontWeight: 'bold',
    marginBottom: RFValue(10),
  },
  subtitle: {
    fontSize: RFValue(16),
    marginBottom: RFValue(20),
  },
  tabTxt: {
    marginHorizontal: RFValue(10),
    textDecorationStyle: 'solid',
    paddingBottom: RFValue(5),
    borderBottomWidth: 2,
    lineHeight: RFValue(25),
  },
  activeTab: {
    ...fontStyles.Maison_600_18PX_20LH,
    color: '#F18282',
    borderColor: '#F18282',
  },
  inactiveTab: {
    ...fontStyles.Maison_400_14PX_17LH,
    color: '#737376',
    borderColor: 'transparent',
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
    marginVertical: RFValue(15),
    width: '100%',
    padding: RFValue(13),
    alignItems: 'center',
  },
  colorIndicator: {
    width: 25,
    height: 12,
    borderRadius: RFValue(10), // half of width/height to make it oval
    marginRight: 8,
  },
  infoContainer: {
    alignItems: 'center',
    borderRadius: RFValue(10),
    paddingVertical: RFValue(2),
    paddingHorizontal: RFValue(5),
    marginRight: RFValue(5),
  },
});
const CurrentAssessmentScreen: React.FC<
  ScreenProps<'currentAssessmentScreen'>
> = ({ route }) => {
  const { colors } = useTheme() as ThemeProps;
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(
    route.params.ActiveTab || 'APP_PENDING'
  );
  const [assessmentData, setAssessmentData] = useState([]);
  const assessmentType = ['APP_PENDING', 'APP_COMPLETED'];
  const loadingApis = useSelector(
    (state: RootReducerStates) => state.appContext?.loadingApis
  );
  const appTranslations = route?.params?.appTranslations;
  useFocusEffect(
    useCallback(() => {
      if (activeTab === 'APP_PENDING') {
        dispatch(
          createAction(
            {
              method: 'GET',
              url: 'GET_ALL_ASSESSMENT',
            },
            (v, res) => {
              if (v == 200 && Array.isArray(res)) {
                setAssessmentData(res);
              }
            }
          )
        );
      } else if (activeTab === 'APP_COMPLETED') {
        dispatch(
          createAction(
            {
              method: 'GET',
              url: 'GET_PAST_ASSESSMENT',
            },
            (v, res) => {
              if (v == 200 && Array.isArray(res)) {
                const formattedData = res?.map((item) => {
                  return {
                    title: item?.assessmentDetails?.title || item?.title,
                    ...(item?.userAssessmentId
                      ? { _id: item?.userAssessmentId }
                      : { assessment_id: item?.assessment_id }),
                    timeToComplete: item?.assessmentDetails?.timeToComplete,
                    questions:
                      item?.assessmentDetails?.questions || item?.questions,
                    active: item?.assessmentDetails?.active || false,
                  };
                });
                setAssessmentData(formattedData);
              }
            }
          )
        );
      }
    }, [activeTab])
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.WHITE_FFFF }]}>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Row style={styles?.tabRow}>
            {assessmentType?.map((data, index) => (
              <Text
                onPress={() => {
                  setActiveTab(data);
                }}
                key={index}
                style={[
                  styles?.tabTxt,
                  activeTab === data ? styles?.activeTab : styles?.inactiveTab,
                ]}
              >
                {appTranslations[data] && appTranslations[data]}
              </Text>
            ))}
          </Row>
        </ScrollView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Card.UniversalCard styleName='bgGrayRadius20padding4flex1'>
            <View style={styles?.assessmentView}>
              {loadingApis.includes('GET_ALL_ASSESSMENT') ||
              loadingApis.includes('GET_PAST_ASSESSMENT') ? (
                Array?.from({ length: 3 }).map((_, k) => {
                  return (
                    <AssessmentSkeletonCard
                      key={k + '-AssessmentSkeletonCard'}
                    />
                  );
                })
              ) : assessmentData.length === 0 ? (
                <NoDataCard />
              ) : (
                assessmentData.map((itm, index) => {
                  const type = {
                    APP_PENDING: 'Pending',
                    APP_COMPLETED: 'Completed',
                  };
                  return (
                    <AssessmentCardComponent
                      itm={itm}
                      assessmentType={type[activeTab]}
                      key={index + '-assessment'}
                    />
                  );
                })
              )}
            </View>
          </Card.UniversalCard>
        </ScrollView>
      </View>
    </View>
  );
};

export default CurrentAssessmentScreen;
