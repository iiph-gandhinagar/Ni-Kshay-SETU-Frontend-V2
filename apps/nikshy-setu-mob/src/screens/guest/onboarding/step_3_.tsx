import { PenSvg } from '@nikshay-setu-v3-monorepo/assets';
import {
  fontStyles,
  STORE_URL,
  uiStyles,
} from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  BlockApiResponse,
  CadresByTypesApiResponse,
  DistrictsApiResponse,
  HealthFacilityApiResponse,
  RootReducerStates,
  RootStackParamList,
  StateApiResponse,
  StepProps,
} from '@nikshay-setu-v3-monorepo/types';
import {
  isEmpty,
  CustomRFValue as RFValue,
} from '@nikshay-setu-v3-monorepo/utils';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Button from 'apps/nikshy-setu-mob/src/components/buttons/primaryButtons';
import { AccountSkeletonCard } from 'apps/nikshy-setu-mob/src/components/cards/skeletonCards';
import ModalComponent from 'apps/nikshy-setu-mob/src/components/commonComponents/modal';
import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import AnimationView from '../../../components/animationView';
import { Column, Row } from '../../../components/commonComponents/row_column';
import { InputField } from '../../../components/inputComponents';

type Values = {
  cadreType?: string;
  cadreId?: string;
  stateId?: string;
  districtId?: string;
  blockId?: string;
  healthFacilityId?: string;
};
const Step3: React.FC<StepProps> = React.memo(
  ({
    _values,
    errors,
    touched,
    translateY,
    values,
    setFieldValue,
    opacity,
    onPressEdit,
    isAccount,
    dispatch,
    colors,
  }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const appTranslations = useSelector(
      (state: RootReducerStates) => state.appContext?.data?.appTranslations
    );
    const [loader, setLoader] = useState<[string, boolean]>(['-', false]);
    const [isDeleteModal, showDeleteModal] = useState<boolean>(false);
    const [dropDownValues, setDropDownValues] = useState<Partial<Values>>({});
    const fetchData = async () => {
      if (dispatch) {
        try {
          setLoader(['first', true]);
          const updatedValues: Partial<Values> = {};
          const cadreResponse: CadresByTypesApiResponse = await new Promise(
            (resolve) => {
              dispatch(
                createAction<null, CadresByTypesApiResponse>(
                  {
                    method: 'GET',
                    url: 'CADRES_BY_TYPES',
                    query: values?.cadreType,
                  },
                  (status: number, response) => {
                    if (status === 200) resolve(response);
                  }
                )
              );
            }
          );
          const selectedCadre =
            Array.isArray(cadreResponse) &&
            !isEmpty(values?.cadreId) &&
            cadreResponse?.find((cadre) => cadre?._id === values?.cadreId);
          if (selectedCadre) {
            setLoader(['second', true]);
            updatedValues.cadreId = selectedCadre?.title;
            const stateResponse: StateApiResponse = await new Promise(
              (resolve) => {
                dispatch(
                  createAction<null, StateApiResponse>(
                    {
                      method: 'GET',
                      url: 'STATES',
                    },
                    (status: number, response) => {
                      if (status === 200) resolve(response);
                    }
                  )
                );
              }
            );

            const selectedState =
              Array.isArray(stateResponse) &&
              !isEmpty(values?.stateId) &&
              stateResponse?.find((state) => state?._id === values?.stateId);
            if (selectedState) {
              updatedValues.stateId = selectedState?.title;
              const districtResponse: DistrictsApiResponse = await new Promise(
                (resolve) => {
                  dispatch(
                    createAction<null, DistrictsApiResponse>(
                      {
                        method: 'GET',
                        url: 'DISTRICTS',
                        query: selectedState?._id,
                      },
                      (status, response) => {
                        resolve(response);
                      }
                    )
                  );
                }
              );
              const selectedDistrict =
                Array.isArray(districtResponse) &&
                !isEmpty(values?.districtId) &&
                districtResponse?.find(
                  (district) => district?._id === values?.districtId
                );
              if (selectedDistrict) {
                updatedValues.districtId = selectedDistrict?.title;
                const blockResponse: BlockApiResponse = await new Promise(
                  (resolve) => {
                    dispatch(
                      createAction<null, BlockApiResponse>(
                        {
                          method: 'GET',
                          url: 'BLOCKS',
                          query: selectedDistrict?._id,
                        },
                        (status: number, response) => {
                          if (status === 200) {
                            resolve(response);
                          }
                        }
                      )
                    );
                  }
                );
                const selectedBlock =
                  Array.isArray(blockResponse) &&
                  !isEmpty(values?.blockId) &&
                  blockResponse?.find(
                    (block) => block?._id === values?.blockId
                  );
                if (selectedBlock) {
                  updatedValues.blockId = selectedBlock?.title;
                  const healthFacilitiesResponse: HealthFacilityApiResponse =
                    await new Promise((resolve) => {
                      dispatch(
                        createAction<null, HealthFacilityApiResponse>(
                          {
                            method: 'GET',
                            url: 'HEALTH_FACILITIES',
                            query: selectedBlock?._id,
                          },
                          (v: number, HFres) => {
                            resolve(HFres);
                          }
                        )
                      );
                    });

                  if (
                    Array.isArray(healthFacilitiesResponse) &&
                    !isEmpty(values?.healthFacilityId)
                  ) {
                    const selectedHealthFacilities =
                      healthFacilitiesResponse?.find(
                        (hf) => hf?._id === values?.healthFacilityId
                      );
                    updatedValues.healthFacilityId =
                      selectedHealthFacilities?.healthFacilityCode;
                  }
                }
              }
            }
          }
          setDropDownValues(updatedValues);
        } catch (error) {
          console.error('Error fetching data ', error);
        } finally {
          setLoader(['', false]);
        }
      }
    };

    const styles = StyleSheet.create({
      plusSign: {
        backgroundColor: colors.LIGHT_BLUE_E8F1FF,
        alignSelf: 'flex-start',
        padding: RFValue(20),
        paddingHorizontal: RFValue(30),
        fontSize: RFValue(20),
        fontWeight: '200',
        borderRadius: RFValue(5),
      },
      Image: {
        height: RFValue(70),
        width: RFValue(70),
        borderRadius: RFValue(5),
      },
      resendOTPText: {
        ...fontStyles.resendOTPText,
        textAlign: 'left',
        marginStart: RFValue(5),
      },
      deleteAccountText: {
        ...fontStyles.Maison_500_12PX_15LH,
        alignSelf: 'flex-end',
        marginVertical: RFValue(15),
        textDecorationLine: 'underline',
        color: colors?.RED_DB3611,
      },
      modalContainer: {
        backgroundColor: 'white',
        padding: RFValue(10),
        width: '90%',
      },
      text2: {
        ...fontStyles?.Maison_400_16PX_25LH,
        color: 'gray',
        textAlign: 'center',
      },
      text1: {
        ...fontStyles?.Maison_400_17PX_27LH,
        textAlign: 'center',
        marginVertical: RFValue(10),
      },
      touchableHighlight: {
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
      },
      row: { justifyContent: 'space-around', margin: RFValue(10) },
    });
    const isProfileImage = Boolean(values?.profileImage);
    const isUserInternational = Boolean(
      values?.cadreType === 'International_Level'
    );
    useEffect(() => {
      fetchData();
    }, []);
    return (
      <AnimationView
        progress={_values.progress}
        opacity={opacity}
        translateY={translateY}
      >
        <TouchableHighlight
          disabled={isUserInternational}
          style={styles?.touchableHighlight}
          onPress={() => {
            onPressEdit('personalDetails');
          }}
          underlayColor={'white'}
        >
          <View
            style={{
              display: !isProfileImage && isUserInternational ? 'none' : 'flex',
            }}
          >
            {!isProfileImage ? (
              <Text style={styles?.plusSign}>+</Text>
            ) : (
              <Image
                source={{ uri: STORE_URL + values?.profileImage }}
                style={styles?.Image}
              />
            )}
            <Text style={styles?.resendOTPText}>
              {!isProfileImage
                ? appTranslations?.LABEL_ADD_PROFILE
                : appTranslations?.LABEL_EDIT_PROFILE}
            </Text>
          </View>
        </TouchableHighlight>
        <InputField.Input
          label={appTranslations?.LABEL_EMAIL}
          placeholder={appTranslations?.APP_NOT_AVAILABLE}
          error={errors?.email as string}
          touched={touched?.email as boolean}
          keyboardType='email-address'
          value={values.email}
          edit={!isUserInternational}
          onPressEdit={() => {
            onPressEdit('personalDetails');
          }}
          editable={false}
          onChange={(v) =>
            setFieldValue(
              'email',
              typeof v === 'string' && v?.toLowerCase(),
              true
            )
          }
        />
        <Row style={uiStyles.justifyContentSb_Mv15}>
          <Text
            style={[
              fontStyles.Maison_500_16PX_21LH,
              { color: colors.DARK_BLUE_394F89 },
            ]}
          >
            {appTranslations?.LABEL_PERSONAL_DETAILS}
          </Text>
          {!isUserInternational && (
            <TouchableOpacity onPress={() => onPressEdit('personalDetails')}>
              <PenSvg />
            </TouchableOpacity>
          )}
        </Row>
        {loader[1] && loader[0] === 'first' ? (
          <AccountSkeletonCard />
        ) : (
          <Column style={uiStyles.fillBoxOnboarding}>
            <Row style={uiStyles.justifyContentSB}>
              <InputField.Input
                containerStyle={uiStyles.withoutBorderInputText}
                label={appTranslations?.LABEL_FULL_NAME}
                placeholder={appTranslations?.APP_NOT_AVAILABLE}
                error={errors?.name as string}
                touched={false}
                numberOfLines={1}
                multiline={true}
                value={values.name}
                editable={false}
                onChange={(v) => setFieldValue('name', v, true)}
              />
              <InputField.Input
                containerStyle={uiStyles.inputTextWithBorderEnd}
                placeholder={appTranslations?.APP_NOT_AVAILABLE}
                label={appTranslations?.LABEL_MOBILE_NUM}
                error={errors?.phoneNo as string}
                touched={false}
                numberOfLines={1}
                multiline={true}
                keyboardType='phone-pad'
                value={values.phoneNo}
                editable={false}
                onChange={(v) => setFieldValue('phoneNo', v, true)}
              />
            </Row>
            <InputField.Input
              containerStyle={uiStyles.fillInputTextBW0P0MT0}
              label={appTranslations?.LABEL_CADRE_TYPE}
              error={errors?.phoneNo as string}
              placeholder={appTranslations?.APP_NOT_AVAILABLE}
              touched={false}
              value={values?.cadreType?.replace(/_/g, ' ')}
              editable={false}
              onChange={(v) => setFieldValue('cadreType', v, true)}
            />
            <InputField.Input
              containerStyle={uiStyles.fillInputTextBW0P0MT0}
              placeholder={appTranslations?.APP_NOT_AVAILABLE}
              label={appTranslations?.LABEL_CADRE}
              error={errors?.phoneNo as string}
              editable={false}
              touched={false}
              value={dropDownValues.cadreId}
              onChange={(v) => setFieldValue('cadreId', v, true)}
            />
          </Column>
        )}
        <Row style={uiStyles.justifyContentSb_Mv15}>
          <Text
            style={[
              fontStyles.Maison_500_16PX_21LH,
              { color: colors.DARK_BLUE_394F89 },
            ]}
          >
            {appTranslations?.LABEL_GEOGRAPHIC_DETAILS}
          </Text>
          {!isUserInternational && (
            <TouchableOpacity
              onPress={() => {
                if (values?.cadreType === 'National_Level') {
                  alert(appTranslations?.APP_MSG_NEED_CHANGE_CADRE_TYPE);
                } else {
                  onPressEdit('geographicDetails');
                }
              }}
            >
              <PenSvg />
            </TouchableOpacity>
          )}
        </Row>
        {(loader[0] === 'second' && loader[1]) ||
        (loader[0] === 'first' && loader[1]) ? (
          <AccountSkeletonCard />
        ) : (
          <Column style={uiStyles.fillBoxOnboarding}>
            <Row style={uiStyles.justifyContentSB}>
              <InputField.Input
                containerStyle={uiStyles.withoutBorderInputText}
                placeholder={appTranslations?.APP_NOT_AVAILABLE}
                label={appTranslations?.LABEL_STATE}
                error={errors?.stateId as string}
                touched={false}
                numberOfLines={1}
                multiline={true}
                value={dropDownValues.stateId}
                editable={false}
                onChange={(v) => setFieldValue('stateId', v, true)}
              />
              <InputField.Input
                containerStyle={uiStyles.inputTextWithBorderEnd}
                placeholder={appTranslations?.APP_NOT_AVAILABLE}
                label={appTranslations?.LABEL_DISTRICT}
                numberOfLines={1}
                multiline={true}
                error={errors?.districtId as string}
                touched={false}
                value={dropDownValues.districtId}
                editable={false}
                onChange={(v) => setFieldValue('districtId', v, true)}
              />
            </Row>
            <InputField.Input
              containerStyle={uiStyles.fillInputTextBW0P0MT0}
              placeholder={appTranslations?.APP_NOT_AVAILABLE}
              label={appTranslations?.LABEL_TU}
              numberOfLines={1}
              multiline={true}
              error={errors?.blockId as string}
              touched={false}
              value={dropDownValues.blockId}
              editable={false}
              onChange={(v) => setFieldValue('blockId', v, true)}
            />
            <InputField.Input
              containerStyle={uiStyles.fillInputTextBW0P0MT0}
              placeholder={appTranslations?.APP_NOT_AVAILABLE}
              label={appTranslations?.LABEL_HEALTH_FACILITY}
              error={errors?.healthFacilityId as string}
              touched={false}
              value={dropDownValues.healthFacilityId}
              editable={false}
              onChange={(v) => setFieldValue('healthFacilityId', v, true)}
            />
          </Column>
        )}
        <ModalComponent
          closeModal={() => {
            showDeleteModal(false);
          }}
          isOpen={isDeleteModal}
          containerStyle={styles?.modalContainer}
        >
          <View style={uiStyles?.flex1BgWhite}>
            <Text style={styles?.text1}>
              {appTranslations?.APP_MSG_NEED_SURE_DELETE_ACCOUNT}
            </Text>
            <Text style={styles.text2}>
              {appTranslations?.APP_MSG_WE_SAD_BEFORE_PROCEEDING}
            </Text>
            <Row style={styles?.row}>
              <Button
                title={appTranslations?.APP_CANCEL}
                onPress={() => {
                  showDeleteModal(false);
                }}
                bgColor={colors?.DARK_BLUE_394F89}
                containerStyle={uiStyles?.flex1Margin10}
              />
              <Button
                title={appTranslations?.APP_DELETE}
                onPress={() => {
                  navigation?.navigate('deleteAccount');
                }}
                bgColor={colors?.RED_DB3611}
                containerStyle={uiStyles?.flex1Margin10}
              />
            </Row>
          </View>
        </ModalComponent>

        {isAccount && (
          <Text
            onPress={() => {
              showDeleteModal(true);
            }}
            style={styles.deleteAccountText}
          >
            {appTranslations?.APP_DELETE_ACCOUNT}
          </Text>
        )}
      </AnimationView>
    );
  }
);
Step3.displayName = 'Step3';
export default Step3;
