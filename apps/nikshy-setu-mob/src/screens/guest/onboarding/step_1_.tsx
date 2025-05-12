import { ImagePlaceholderPng } from '@nikshay-setu-v3-monorepo/assets';
import {
  CadreStateTypes,
  fontStyles,
  STORE_URL,
  uiStyles,
} from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  BlockApiResponse,
  CadresByTypesApiResponse,
  CadreTypesApiResponse,
  CountryOptionTypesApiResponse,
  DefaultCadreTypesApiResponse,
  DistrictsApiResponse,
  DropDownObj,
  RootReducerStates,
  StateApiResponse,
  StepProps,
} from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { Row } from 'apps/nikshy-setu-mob/src/components/commonComponents/row_column';
import { ImagePicker } from 'apps/nikshy-setu-mob/src/components/ImagePickerModal';
import { InputContainer } from 'apps/nikshy-setu-mob/src/components/inputComponents/inputContainer';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { InputField } from '../../../components/inputComponents';
import ToggleSwitch from '../../../components/toggleSwitch';
const Step1: React.FC<StepProps> = React.memo(
  ({
    setFieldValue,
    values,
    errors,
    _values,
    touched,
    handleToggleChange,
    translateY,
    opacity,
    loading,
    dispatch,
    setValues,
    colors,
    setFieldTouched,
  }) => {
    const registerWithEmail =
      _values?.isNumOrEmail === 'Email' && !_values?.isLogin;
    const appTranslations = useSelector(
      (state: RootReducerStates) => state.appContext?.data?.appTranslations
    );
    const dropdownOptions = useSelector(
      (state: RootReducerStates) => state.appContext?.data?.dropdownOptions
    );
    const styles = StyleSheet.create({
      toggleSwitch: {
        alignSelf: 'flex-start',
        marginBottom: 10,
      },
      profileImage: {
        height: RFValue(30),
        width: RFValue(30),
        borderRadius: RFValue(5),
      },
      paddingBottom30: { paddingBottom: RFValue(30) },
      scrollView: {
        flex: 1,
        justifyContent: 'center',
      },
      profileRow: {
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: Platform.OS === 'android' ? RFValue(13) : 0,
      },
      plusSign: {
        backgroundColor: colors.LIGHT_BLUE_E8F1FF,
        alignSelf: 'flex-start',
        paddingHorizontal: RFValue(15),
        fontSize: RFValue(20),
        fontWeight: '400',
        borderRadius: RFValue(5),
      },
      alignSelfEnd: { alignSelf: 'flex-end' },
    });
    const [imageModal, setImageModal] = useState(false);
    const [isInternational, setInternational] = useState(false);
    const [pickedImage, setImage] = useState('');
    const ref = useRef<ScrollView>(null);
    const forUpdate = _values?.updateProfile;
    function fetchGeoGraphFields() {
      if (values?.stateId) {
        dispatch(
          createAction<null, DistrictsApiResponse>(
            {
              method: 'GET',
              url: 'DISTRICTS',
              query: values?.stateId,
            },
            (code, res) => {
              if (values?.districtId && code && res) {
                dispatch(
                  createAction<null, BlockApiResponse>(
                    {
                      method: 'GET',
                      url: 'BLOCKS',
                      query: values?.districtId,
                    },
                    () => {
                      if (values?.blockId) {
                        dispatch(
                          createAction({
                            method: 'GET',
                            url: 'HEALTH_FACILITIES',
                            query: values?.blockId,
                          })
                        );
                      }
                    }
                  )
                );
              }
            }
          )
        );
      }
    }

    function fetchBasicFields() {
      dispatch(
        createAction<null, StateApiResponse>(
          {
            method: 'GET',
            url: 'STATES',
          },
          () => {
            dispatch(
              createAction<null, CadresByTypesApiResponse>(
                {
                  method: 'GET',
                  url: 'CADRES_TYPES',
                },
                () => {
                  dispatch(
                    createAction<null, CountryOptionTypesApiResponse>(
                      {
                        method: 'GET',
                        url: 'COUNTRY',
                      },
                      (code, res) => {
                        if (Array.isArray(res) && code) {
                          const INDIA = res?.filter(
                            (v) => v?.title === 'INDIA'
                          )?.[0];
                          setFieldValue('country', INDIA?._id, true);
                        }
                        fetchGeoGraphFields();
                      }
                    )
                  );
                }
              )
            );
          }
        )
      );
    }

    function fetchOtherFields() {
      dispatch(
        createAction<null, CadreTypesApiResponse>(
          {
            method: 'GET',
            url: 'CADRES_TYPES',
          },
          () => {
            if (values?.cadreType) {
              dispatch(
                createAction<null, CadresByTypesApiResponse>(
                  {
                    method: 'GET',
                    query: values?.cadreType,
                    url: 'CADRES_BY_TYPES',
                  },
                  () => {
                    fetchGeoGraphFields();
                  }
                )
              );
            }
          }
        )
      );
    }
    useEffect(() => {
      if (dispatch && forUpdate) {
        fetchOtherFields();
      } else {
        fetchBasicFields();
      }
    }, [values?.cadreType, dispatch]);
    const isProfileImage = Boolean(values?.profileImage);
    const ProfileImageUrl =
      (pickedImage && pickedImage) || STORE_URL + values?.profileImage;
    const uploadImage = async (pickedImage) => {
      if (!pickedImage) {
        Alert.alert('Please select an pickedImage first');
        return;
      }
      const filename =
        pickedImage?.split('/')[pickedImage.split('/')?.length - 1];
      const [_, type] = filename?.split('.');
      const formData = new FormData();
      formData.append('isUserProfile', 'true');
      formData.append('file', {
        uri: pickedImage,
        name: filename,
        filename: filename,
        type: (type && 'image/' + type) || 'image/png',
      });
      dispatch(
        createAction<unknown, string[]>(
          {
            method: 'POST',
            url: 'UPLOAD',
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
          (code, res) => {
            if (code === 200 && Array.isArray(res)) {
              setFieldValue('profileImage', res[0], true);
            }
          }
        )
      );
    };

    return (
      <Animated.View
        style={{
          ...uiStyles.onBoardingCenterView,
          opacity: opacity,
          transform: [{ translateY: translateY }],
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={ref}
          contentContainerStyle={
            (_values?.isLogin && !forUpdate && styles?.scrollView) ||
            styles?.paddingBottom30
          }
        >
          {!forUpdate && (
            <React.Fragment>
              <ToggleSwitch
                options={['Mobile', 'Email']}
                onChange={(v) => {
                  handleToggleChange(v);
                }}
                sliderWidth={0.5}
                containerStyle={styles.toggleSwitch}
              />
              {_values.isNumOrEmail === 'Email' ? (
                <InputField.Input
                  error={errors?.email as string}
                  touched={touched?.email as boolean}
                  name={'email'}
                  isRequired={true}
                  label={appTranslations?.LABEL_EMAIL}
                  keyboardType='email-address'
                  value={values.email}
                  editable={!loading}
                  onBlur={() => {
                    setFieldTouched('email', true);
                  }}
                  onChange={(v) => setFieldValue('email', v, true)}
                />
              ) : (
                <InputField.InputWithCountryCode
                  error={errors?.phoneNo as string}
                  touched={touched?.phoneNo as boolean}
                  label={appTranslations?.LABEL_MOBILE_NUM}
                  value={values.phoneNo}
                  countryCode={values.countryCode}
                  editable={!loading}
                  countryCodeDisable
                  isRequired={true}
                  keyboardType='phone-pad'
                  onCodeChange={(v) => {
                    setFieldValue('countryCode', v, true);
                  }}
                  onChange={(v) => {
                    setFieldValue('phoneNo', v, true);
                  }}
                  onBlur={() => {
                    setFieldTouched('phoneNo', true);
                  }}
                />
              )}
            </React.Fragment>
          )}

          {/* edit Profile */}

          {forUpdate && (
            <InputField.InputWithCountryCode
              error={errors?.phoneNo as string}
              touched={touched?.phoneNo as boolean}
              label={appTranslations?.LABEL_MOBILE_NUM}
              value={values.phoneNo}
              countryCode={values.countryCode}
              editable={!loading && !forUpdate}
              countryCodeDisable={true}
              isRequired={true}
              keyboardType='phone-pad'
              onCodeChange={(v) => {
                setFieldValue('countryCode', v, true);
              }}
              onChange={(v) => {
                setFieldValue('phoneNo', v, true);
              }}
              onBlur={() => {
                setFieldTouched('phoneNo', true);
              }}
            />
          )}
          {(forUpdate || !_values?.isLogin) && (
            <View>
              <ImagePicker
                colors={colors}
                modalVisible={imageModal}
                onClose={() => {
                  setImageModal(false);
                }}
                setPickedImage={(img) => {
                  uploadImage(img);
                  setImage(img);
                }}
              />
              <InputContainer
                error={''}
                touched={false}
                label={
                  !isProfileImage
                    ? appTranslations?.LABEL_ADD_PROFILE
                    : appTranslations?.LABEL_EDIT_PROFILE
                }
                onPressContainer={() => {
                  setImageModal(true);
                }}
              >
                <Row style={styles?.profileRow}>
                  <Text
                    style={[{ color: 'gray' }, fontStyles.Maison_400_13PX_20LH]}
                  >
                    {!isProfileImage
                      ? appTranslations?.APP_CLICK_UPLOAD_NEW_IMG
                      : appTranslations?.APP_MODIFY_EXISTING_IMG}
                  </Text>
                  <View style={styles?.alignSelfEnd}>
                    {!isProfileImage ? (
                      <Text style={styles?.plusSign}>+</Text>
                    ) : (
                      <Image
                        source={{ uri: ProfileImageUrl }}
                        style={styles?.profileImage}
                        progressiveRenderingEnabled={true}
                        defaultSource={ImagePlaceholderPng}
                      />
                    )}
                  </View>
                </Row>
              </InputContainer>
              <InputField.Input
                label={appTranslations?.LABEL_FULL_NAME}
                error={errors.name as string}
                touched={touched.name as boolean}
                isRequired={true}
                value={values.name}
                onBlur={() => {
                  setFieldTouched('name', true);
                }}
                keyboardType='name-phone-pad'
                onChange={(v) => setFieldValue('name', v, true)}
              />
              {!forUpdate && registerWithEmail ? (
                <InputField.InputWithCountryCode
                  error={errors?.phoneNo as string}
                  touched={touched?.phoneNo as boolean}
                  label={appTranslations?.LABEL_MOBILE_NUM}
                  value={values.phoneNo}
                  countryCode={values.countryCode}
                  isRequired={true}
                  onCodeChange={(countryCode) => {
                    if (countryCode === '+91') {
                      setInternational(false);
                      const INDIA = dropdownOptions?.country?.filter(
                        (v: DropDownObj) => v?.title === 'INDIA'
                      )?.[0];
                      setValues({
                        ...values,
                        districtId: null,
                        blockId: null,
                        healthFacilityId: null,
                        stateId: null,
                        country: INDIA?._id,
                        cadreId: null,
                        countryCode: countryCode,
                        cadreType: null,
                      });
                    } else {
                      setInternational(true);
                      dispatch(
                        createAction<null, DefaultCadreTypesApiResponse>(
                          {
                            method: 'GET',
                            url: 'GET_DEFAULT_CADRE',
                          },
                          (code, res) => {
                            if (code === 200) {
                              const INTERNATIONAL =
                                dropdownOptions?.country?.filter(
                                  (v: DropDownObj) =>
                                    v?.title === 'INTERNATIONAL'
                                )?.[0];
                              setValues({
                                ...values,
                                districtId: res?.districtId?._id,
                                blockId: null,
                                healthFacilityId: null,
                                stateId: res?.stateId?._id,
                                country: INTERNATIONAL?._id,
                                cadreId: res?.cadreId?._id,
                                countryCode: countryCode,
                                cadreType: res?.cadreType?.cadreType,
                              });
                            }
                          }
                        )
                      );
                    }
                  }}
                  keyboardType='phone-pad'
                  onChange={(v) => {
                    setFieldValue('phoneNo', v, true);
                  }}
                  onBlur={() => {
                    setFieldTouched('phoneNo', true);
                  }}
                />
              ) : (
                <InputField.Input
                  label={appTranslations?.LABEL_EMAIL}
                  error={errors.email as string}
                  touched={touched.email as boolean}
                  value={values.email}
                  isRequired={false}
                  onBlur={() => {
                    setFieldTouched('email', true);
                  }}
                  editable={!registerWithEmail}
                  keyboardType='email-address'
                  onChange={(v) => setFieldValue('email', v, true)}
                />
              )}
              {!isInternational && (
                <React.Fragment>
                  <InputField.DropDown
                    label={appTranslations?.LABEL_CADRE_TYPE}
                    options={dropdownOptions?.cadresTypes.filter(
                      (v: DropDownObj) =>
                        !registerWithEmail
                          ? !(v?.label === 'International Level')
                          : true
                    )}
                    isRequired={true}
                    dropdownPosition='top'
                    error={errors.cadreType as string}
                    touched={touched.cadreType as boolean}
                    value={values?.cadreType}
                    onBlur={() => {
                      setFieldTouched('cadreType', true);
                    }}
                    onChange={(v) => {
                      setValues({
                        ...values,
                        districtId: null,
                        blockId: null,
                        healthFacilityId: null,
                        stateId: null,
                        cadreId: null,
                        cadreType: v?.value,
                      });
                      dispatch(
                        createAction<null, CadresByTypesApiResponse>(
                          {
                            method: 'GET',
                            query: v?.value,
                            url: 'CADRES_BY_TYPES',
                          },
                          (code, res) => {
                            if (
                              code === 200 &&
                              v?.value === 'International_Level'
                            ) {
                              setFieldValue('cadreId', res?.[0]?._id, true);
                            }
                          }
                        )
                      );
                      ref.current.scrollTo({ y: 400, animated: true });
                    }}
                  />
                  {values?.cadreType &&
                    !(values?.cadreType === 'International_Level') && (
                      <InputField.DropDown
                        label={appTranslations?.LABEL_CADRE}
                        search
                        options={dropdownOptions?.cadresByTypes}
                        isRequired={true}
                        error={errors.cadreId as string}
                        touched={touched.cadreId as boolean}
                        value={values.cadreId}
                        dropdownPosition='top'
                        onBlur={() => {
                          setFieldTouched('cadreId', true);
                        }}
                        onChange={(v) => {
                          ref.current.scrollToEnd();
                          setFieldValue('cadreId', v?.value, true);
                        }}
                        disable={dropdownOptions?.cadresByTypes?.length === 0}
                      />
                    )}
                </React.Fragment>
              )}

              {values?.cadreType &&
                CadreStateTypes?.[values?.cadreType].includes(
                  'State_Level'
                ) && (
                  <InputField.DropDown
                    label={appTranslations?.LABEL_STATE}
                    search={true}
                    isRequired={true}
                    options={dropdownOptions?.states}
                    error={errors.stateId as string}
                    touched={touched.stateId as boolean}
                    value={values.stateId}
                    dropdownPosition='top'
                    onChange={(v) => {
                      setValues({
                        ...values,
                        districtId: '',
                        blockId: '',
                        healthFacilityId: '',
                        stateId: v?.value,
                      });
                      dispatch(
                        createAction({
                          method: 'GET',
                          url: 'DISTRICTS',
                          query: v?.value,
                        })
                      );
                      ref.current.scrollToEnd();
                    }}
                  />
                )}
              {values?.cadreType &&
                CadreStateTypes?.[values?.cadreType].includes(
                  'District_Level'
                ) && (
                  <InputField.DropDown
                    label={appTranslations?.LABEL_DISTRICT}
                    search={true}
                    isRequired={true}
                    options={dropdownOptions?.districts}
                    error={errors?.districtId as string}
                    touched={touched?.districtId as boolean}
                    value={values.districtId}
                    dropdownPosition='top'
                    onChange={(v) => {
                      setValues({
                        ...values,
                        blockId: '',
                        healthFacilityId: '',
                        districtId: v?.value,
                      });
                      dispatch(
                        createAction({
                          method: 'GET',
                          url: 'BLOCKS',
                          query: v?.value,
                        })
                      );
                      ref.current.scrollToEnd();
                    }}
                    disable={dropdownOptions?.districts?.length === 0}
                  />
                )}

              {values?.cadreType &&
                CadreStateTypes?.[values?.cadreType]?.includes(
                  'Block_Level'
                ) && (
                  <InputField.DropDown
                    label={appTranslations?.LABEL_TU}
                    search
                    isRequired={true}
                    options={dropdownOptions?.blocks}
                    dropdownPosition='top'
                    error={errors?.blockId as string}
                    touched={touched?.blockId as boolean}
                    disable={dropdownOptions?.blocks?.length === 0}
                    value={values?.blockId}
                    onChange={(v) => {
                      setValues({
                        ...values,
                        healthFacilityId: '',
                        blockId: v?.value,
                      });
                      dispatch(
                        createAction({
                          method: 'GET',
                          url: 'HEALTH_FACILITIES',
                          query: v?.value,
                        })
                      );
                    }}
                  />
                )}

              {values?.cadreType &&
                CadreStateTypes?.[values?.cadreType].includes(
                  'Health-facility_Level'
                ) && (
                  <InputField.DropDown
                    label={appTranslations?.LABEL_HEALTH_FACILITY}
                    search={true}
                    isRequired={true}
                    dropdownPosition='top'
                    options={dropdownOptions?.healthFacilities}
                    error={errors?.healthFacilityId as string}
                    touched={touched?.healthFacilityId as boolean}
                    disable={dropdownOptions?.healthFacilities?.length === 0}
                    value={values.healthFacilityId}
                    onChange={(v) => {
                      setFieldValue('healthFacilityId', v?.value, true);
                    }}
                  />
                )}
            </View>
          )}
        </ScrollView>
      </Animated.View>
    );
  }
);
Step1.displayName = 'Step1';
export default Step1;
