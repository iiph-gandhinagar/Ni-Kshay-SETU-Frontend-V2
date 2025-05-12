import { DropdownArrowSvg } from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles, uiStyles } from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  ActiveTourApiResponse,
  ThemeProps,
} from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { useTheme } from '@react-navigation/native';
import TourGradientCard from 'apps/nikshy-setu-mob/src/components/cards/tourLinearGradientCard';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import Button from '../../../components/buttons/primaryButtons';
import { Row } from '../../../components/commonComponents/row_column';
import { ProgressBar } from '../../../components/progressBar/ProgressBar';

const data = {
  1: { first: 0, second: 0, progress: 0.2 },
  2: { first: 1, second: 2, progress: 0.5 },
  3: { first: 3, second: 4, progress: 0.8 },
  4: { first: 5, second: 6, progress: 1 },
};

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
  },
  lineargradient: {
    flex: 1,
    padding: RFValue(15),
    justifyContent: 'space-between',
  },
  row: {
    marginHorizontal: RFValue(40),
    alignItems: 'center',
    gap: RFValue(10),
    paddingHorizontal: RFValue(15),
    paddingVertical: RFValue(20),
  },
  centerContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  textContainer: {
    paddingHorizontal: RFValue(30),
  },
  tourScreenBackButtonIcon: {
    transform: [{ rotate: '90deg' }],
  },
  tourScreenStepCounterTextBase: {
    ...fontStyles.Maison_400_12PX_16LH,
  },
  tourScreenProgressBarContainerBase: {},
  tourScreenSkipTextBase: {
    margin: RFValue(5),
    ...fontStyles.Maison_400_12PX_16LH,
  },
  tourScreenDotsContainer: {
    marginVertical: RFValue(15),
  },
  tourScreenPaginationDotBase: {
    width: RFValue(8),
    height: RFValue(8),
    borderRadius: RFValue(4),
    margin: RFValue(4),
  },
  tourScreenNextButtonTextBase: {
    paddingVertical: RFValue(5),
    width: '80%',
    textAlign: 'center',
  },
  tourScreenNextButtonContainerBase: {},
  tourItemsGradientOverlay: {
    borderRadius: RFValue(20),
    padding: RFValue(10),
    flex: 1,
    width: '100%',
  },
  tourItemsCardImage_step1: {
    height: RFValue(170),
    width: RFValue(170),
  },
  tourItemsCardContainer_step1: {
    paddingHorizontal: RFValue(25),
  },
});

const TourItems = ({ currentStep, tourData, colors }) => {
  const sortedData = tourData?.sort((a, b) => a.orderIndex - b.orderIndex);

  return (
    <LinearGradient
      colors={[
        Platform.OS === 'ios' ? '#eee' : 'transparent',
        colors?.LIGHT_GREY_F3F5F6,
      ]}
      style={[
        uiStyles.gradientContainer,
        styles.lineargradient,
        styles.tourItemsGradientOverlay,
        { backgroundColor: colors?.LIGHT_GREY_F3F5F6 },
      ]}
    >
      <View key={currentStep + 'currentStepTour'}>
        {currentStep === 1 ? (
          <TourGradientCard
            item={data?.[currentStep]?.first}
            sortedData={sortedData}
            ImageStyle={styles.tourItemsCardImage_step1}
            containerStyle={styles.tourItemsCardContainer_step1}
          />
        ) : (
          <>
            <TourGradientCard
              item={data?.[currentStep]?.first}
              sortedData={sortedData}
            />
            <TourGradientCard
              item={data?.[currentStep]?.second}
              sortedData={sortedData}
            />
          </>
        )}
      </View>
    </LinearGradient>
  );
};
const getNewLength = (arrayLength) => Math.ceil(arrayLength / 2);

export const TourScreen = ({ navigation }) => {
  const { colors } = useTheme() as ThemeProps;
  const [currentStep, setCurrentStep] = useState(1);
  const [tourData, setTourData] = useState([]);
  const dispatch = useDispatch();
  const totalStep = getNewLength(tourData?.length);

  useEffect(() => {
    dispatch(
      createAction<null, ActiveTourApiResponse>(
        {
          method: 'GET',
          url: 'ACTIVE_TOUR',
        },
        (code, res) => {
          if (code === 200) setTourData(res);
        }
      )
    );
  }, []);

  const onNextClick = () => {
    if (currentStep < totalStep) setCurrentStep(currentStep + 1);
    else navigation.navigate('logIn');
  };
  const onBackButtonClick = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };
  const onSkip = () => {
    navigation.navigate('logIn');
  };

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX } = event.nativeEvent;
      if (translationX > 50) {
        onBackButtonClick();
      } else if (translationX < -50) {
        onNextClick();
      }
    }
  };

  const array = Array.from({ length: totalStep }, (_, index) => index + 1);

  return (
    <PanGestureHandler onHandlerStateChange={onHandlerStateChange}>
      <View style={styles.topContainer}>
        <View style={[uiStyles.gradientContainer, styles.lineargradient]}>
          <Row style={styles.row}>
            <TouchableOpacity
              disabled={currentStep === 1}
              onPress={onBackButtonClick}
            >
              <DropdownArrowSvg
                stroke={
                  currentStep === 1
                    ? colors.WHITE_FFFF
                    : colors.DARK_BLUE_394F89
                }
                height={RFValue(15)}
                width={RFValue(15)}
                style={uiStyles.rotate90deg}
              />
            </TouchableOpacity>
            <Text
              style={[
                styles.tourScreenStepCounterTextBase,
                { color: colors.DARK_BLUE_394F89 },
              ]}
            >
              {currentStep}/{totalStep}
            </Text>
            <ProgressBar
              fillColor={colors.DARK_BLUE_394F89}
              containerStyle={[
                styles.tourScreenProgressBarContainerBase,
                { backgroundColor: colors.GREY_D9DBDB },
              ]}
              progress={data?.[currentStep]?.progress}
            />
            <Text
              onPress={onSkip}
              style={[
                styles.tourScreenSkipTextBase,
                { color: colors.DARK_BLUE_394F89 },
              ]}
            >
              Skip
            </Text>
          </Row>
          {tourData?.length === 0 ? (
            <View style={[uiStyles.jusContentAlignItem_center_flex1]}>
              <ActivityIndicator size={'large'} />
            </View>
          ) : (
            <TourItems
              colors={colors}
              key={currentStep + 'TourItems'}
              currentStep={currentStep}
              tourData={tourData}
            />
          )}
          <Row style={styles.tourScreenDotsContainer}>
            {array?.map((item, index) => (
              <View
                key={index + '-Dots'}
                style={[
                  styles.tourScreenPaginationDotBase, // Base style for dots
                  {
                    // Dynamic backgroundColor applied inline
                    backgroundColor:
                      currentStep === 1 + index
                        ? colors.GREY_797979
                        : colors.GREY_D9DBDB,
                  },
                ]}
              />
            ))}
          </Row>
          <Button
            title='Next'
            onPress={onNextClick}
            textStyle={[
              styles.tourScreenNextButtonTextBase,
              { color: colors.WHITE_FFFF },
            ]}
            containerStyle={[
              styles.tourScreenNextButtonContainerBase,
              { backgroundColor: colors.DARK_BLUE_394F89 },
            ]}
          />
        </View>
      </View>
    </PanGestureHandler>
  );
};
