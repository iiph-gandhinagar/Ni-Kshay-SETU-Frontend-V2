import {
  CheckSvg,
  DropdownArrowSvg,
  ImagePlaceholderPng,
} from '@nikshay-setu-v3-monorepo/assets';
import {
  fontStyles,
  STORE_URL,
  uiStyles,
} from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  RootReducerStates,
  ScreenProps,
  ThemeProps,
  UserScreeningApiResponse,
  UserScreeningPayload,
} from '@nikshay-setu-v3-monorepo/types';
import {
  getDataFromAsyncStorage,
  CustomRFValue as RFValue,
} from '@nikshay-setu-v3-monorepo/utils';
import { useTheme } from '@react-navigation/native';
import { AlgorithmSkeletonCard } from 'apps/nikshy-setu-mob/src/components/cards/skeletonCards';
import { useToast } from 'apps/nikshy-setu-mob/src/components/commonComponents/toastProvider';
import { storeSubscriberActivity } from 'apps/nikshy-setu-mob/src/utils/functions';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../components/buttons/primaryButtons';
import { Card } from '../../../components/cards/MainCard';
import { Breadcrumb } from '../../../components/commonComponents/breadcrumb';
import { Column, Row } from '../../../components/commonComponents/row_column';
import { CustomSlider } from '../../../components/progressBar/ProgressBar';

export const ScreeningTool: React.FC<ScreenProps<'screeningTool'>> = ({
  navigation,
  route,
}) => {
  const { colors } = useTheme() as ThemeProps;
  const dispatch = useDispatch();
  const appTranslations = useSelector(
    (state: RootReducerStates) => state.appContext?.data?.appTranslations
  );
  const loadingApis = useSelector(
    (state: RootReducerStates) => state.appContext?.loadingApis
  );
  const { showToast } = useToast();
  const loading =
    loadingApis.includes('SCREENING') ||
    loadingApis.includes('MASTER_SYMPTOMS');
  const [heightValue, setHeightValue] = useState(0);
  const [weightValue, setWeightValue] = useState(0);
  const [ageValue, setAgeValue] = useState(0);
  const [stepOne, setStepOne] = useState(0);
  const [symptomsData, SetSymptomsData] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  useEffect(() => {
    if (stepOne == 1) {
      dispatch(
        createAction(
          {
            method: 'GET',
            url: 'MASTER_SYMPTOMS',
          },
          (code, res) => {
            if (code == 200) {
              storeSubscriberActivity({
                module: 'Screening Tool',
                action: 'User Screening Fetched',
                dispatch: dispatch,
              });
              SetSymptomsData(res);
            } else {
              console.log('Error : Something went wrong');
            }
          }
        )
      );
    }
  }, [stepOne]);
  const onSymptomsSelect = (symptomsId) => {
    let symptomsArray = [...selectedSymptoms];
    if (selectedSymptoms.length > 0) {
      if (selectedSymptoms.includes(symptomsId))
        symptomsArray = selectedSymptoms.filter((item) => item !== symptomsId);
      else symptomsArray.push(symptomsId);
    } else symptomsArray.push(symptomsId);
    setSelectedSymptoms(symptomsArray);
  };
  const onSubmit = async () => {
    const userId = await getDataFromAsyncStorage('userId');
    const payload = {
      userId: userId,
      age: ageValue,
      height: heightValue,
      weight: weightValue,
      symptomSelected: selectedSymptoms,
    };
    if (selectedSymptoms.length < 2) {
      // ToastAndroid.showWithGravityAndOffset(
      //   'Select at least 2 options',
      //   ToastAndroid.TOP,
      //   ToastAndroid.TOP,
      //   30,
      //   60
      // );
      showToast('Select at least 2 options');
    } else {
      dispatch(
        createAction<UserScreeningPayload, UserScreeningApiResponse>(
          {
            method: 'POST',
            url: 'SCREENING',
            data: payload,
          },
          (code, res) => {
            if (code == 200) {
              navigation.navigate('screeningResult', res);
            } else {
              console.log('Error : Something went wrong');
            }
          }
        )
      );
    }
  };
  const breadcrumb = [
    {
      name: appTranslations?.APP_ALL_MODULE,
      navigateTo: 'moreTools',
    },
    {
      name: appTranslations?.APP_SCREENING,
      navigateTo: 'screeningScreen',
    },
    {
      name: appTranslations?.APP_SCREENING_TOOL,
      navigateTo: 'screeningTool',
    },
  ];
  return (
    <View style={{ backgroundColor: 'white', flex: 1, padding: RFValue(10) }}>
      <Breadcrumb breadcrumb={breadcrumb} />
      <Card.UniversalCard styleName='bgGrayRadius20padding20flex1'>
        <React.Fragment>
          <Row style={{ padding: RFValue(10) }}>
            <Button
              onPress={() => {
                setStepOne(0);
              }}
              title={appTranslations?.APP_ONE_BASIC_INFO}
              textStyle={fontStyles.Maison_500_13PX_20LH}
              containerStyle={{
                padding: RFValue(10),
                alignContent: 'center',
                alignItems: 'center',
              }}
              leftIcon={stepOne === 1 && <CheckSvg />}
              bgColor={
                stepOne === 0 ? colors.DARK_BLUE_394F89 : colors.GREEN_0CA74B
              }
            />
            <View
              style={{
                height: RFValue(2),
                flex: 1,
                backgroundColor:
                  stepOne === 0 ? colors.DARK_BLUE_394F89 : colors.GREEN_0CA74B,
                alignSelf: 'center',
              }}
            />
            <Button
              onPress={() => {
                navigation.navigate('screeningTool');
              }}
              title={appTranslations?.APP_SEC_SYMPTOMS}
              textStyle={[
                fontStyles.Maison_500_13PX_20LH,
                {
                  color:
                    stepOne === 0 ? colors.BLACK_000000 : colors.WHITE_FFFF,
                },
              ]}
              containerStyle={{
                borderColor: '#C3C3C3',
                paddingHorizontal: RFValue(10),
                padding: RFValue(12),
                borderWidth: stepOne === 0 ? 2 : 0,
              }}
              bgColor={
                stepOne === 0 ? colors.WHITE_FFFF : colors.DARK_BLUE_394F89
              }
            />
          </Row>
          <Card.UniversalCard styleName='bgFFFMargin10PaddingV12paddingH24'>
            <React.Fragment>
              <ScrollView
                contentContainerStyle={{ paddingHorizontal: RFValue(10) }}
              >
                <Text
                  style={[
                    fontStyles.Maison_600_16PX_21LH,
                    { color: colors.DARK_GREY_4B5F83 },
                  ]}
                >
                  {stepOne === 0
                    ? appTranslations?.APP_SELECT_AGE_WEIGHT_HEIGHT
                    : appTranslations?.APP_MARK_SYMPTOMS_DESC_BELOW}
                </Text>
                <Column
                  style={{
                    flex: 1,
                    gap: RFValue(30),
                    marginTop: RFValue(25),
                    paddingHorizontal: RFValue(5),
                  }}
                >
                  {stepOne === 0 ? (
                    <React.Fragment>
                      <CustomSlider
                        value={ageValue}
                        onValueChange={setAgeValue}
                        header={appTranslations?.APP_AGE_Y}
                        maximumValue={150}
                      />
                      <CustomSlider
                        value={weightValue}
                        onValueChange={setWeightValue}
                        header={appTranslations?.APP_WEIGHT_KG}
                        maximumValue={200}
                      />
                      <CustomSlider
                        value={heightValue}
                        onValueChange={setHeightValue}
                        header={appTranslations?.APP_HEIGHT_CM}
                        maximumValue={245}
                      />
                    </React.Fragment>
                  ) : (
                    <View
                      style={{
                        borderStartColor: colors.BLACK_000000,
                        borderStartWidth: 1,
                        paddingStart: RFValue(10),
                      }}
                    >
                      <ScrollView showsVerticalScrollIndicator={false}>
                        {loading && symptomsData.length === 0
                          ? Array.from({ length: 6 }).map((_, i) => {
                              return (
                                <AlgorithmSkeletonCard
                                  key={i}
                                  containerStyle={{
                                    margin: 0,
                                    marginStart: 0,
                                    alignItems: 'center',
                                    marginVertical: 0,
                                    elevation: 0,
                                  }}
                                  firstContainerStyle={{
                                    height: RFValue(30),
                                    width: RFValue(20),
                                    marginStart: 0,
                                  }}
                                />
                              );
                            })
                          : symptomsData
                              .sort((a, b) => a.id - b.id)
                              .map((value, key) => {
                                return (
                                  <Pressable
                                    key={key + 'screeningTool_item'}
                                    onPress={() => onSymptomsSelect(value._id)}
                                  >
                                    <Row
                                      key={key + 'screeningTool'}
                                      style={{
                                        gap: RFValue(10),
                                        alignItems: 'center',
                                        backgroundColor: 'white',
                                        ...uiStyles.iosShadow,
                                      }}
                                    >
                                      <View
                                        style={{
                                          height: RFValue(15),
                                          borderColor: 'gray',
                                          width: RFValue(15),
                                          borderRadius: RFValue(100),
                                          borderWidth: RFValue(1),
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                        }}
                                      >
                                        {selectedSymptoms.includes(
                                          value._id
                                        ) && (
                                          <View
                                            style={{
                                              height: RFValue(5),
                                              width: RFValue(5),
                                              borderRadius: RFValue(100),
                                              backgroundColor:
                                                colors.DARK_BLUE_394F89,
                                            }}
                                          />
                                        )}
                                      </View>
                                      <Image
                                        source={{ uri: STORE_URL + value.icon }}
                                        style={{
                                          height: RFValue(30),
                                          width: RFValue(30),
                                        }}
                                        progressiveRenderingEnabled={true}
                                        defaultSource={ImagePlaceholderPng}
                                      />
                                      <Text
                                        style={{
                                          padding: RFValue(10),
                                          flex: 1,
                                        }}
                                      >
                                        {(value.title[route?.params?.appLang] &&
                                          value.title[
                                            route?.params?.appLang
                                          ]) ||
                                          value.title?.en}
                                      </Text>
                                    </Row>
                                  </Pressable>
                                );
                              })}
                      </ScrollView>
                    </View>
                  )}
                </Column>
              </ScrollView>
              <Button
                loaderEnable={
                  (!(selectedSymptoms.length === 0) &&
                    stepOne === 1 &&
                    loading) ||
                  false
                }
                disabled={(stepOne === 1 && loading) || false}
                onPress={() => {
                  if (stepOne === 1) {
                    onSubmit();
                  } else if (stepOne === 0) {
                    if (heightValue == 0 || weightValue == 0 || ageValue == 0) {
                      // ToastAndroid.showWithGravityAndOffset(
                      //   appTranslations?.APP_FILL_VALID_INFO,
                      //   ToastAndroid.TOP,
                      //   ToastAndroid.TOP,
                      //   30,
                      //   60,
                      // );
                      showToast(appTranslations?.APP_FILL_VALID_INFO);
                    } else setStepOne(1);
                  } else {
                    navigation.navigate('screeningTool');
                  }
                }}
                title={
                  stepOne === 0
                    ? appTranslations?.APP_NEXT
                    : appTranslations?.APP_SUBMIT
                }
                textStyle={fontStyles.Maison_500_13PX_15LH}
                rightIcon={
                  <DropdownArrowSvg
                    width={RFValue(25)}
                    height={RFValue(25)}
                    stroke={'white'}
                    style={{
                      transform: [{ rotate: '270deg' }],
                    }}
                  />
                }
                bgColor={colors.DARK_BLUE_394F89}
                containerStyle={{
                  padding: RFValue(10),
                  alignContent: 'center',
                  alignItems: 'center',
                }}
              />
            </React.Fragment>
          </Card.UniversalCard>
        </React.Fragment>
      </Card.UniversalCard>
    </View>
  );
};
