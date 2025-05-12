import { SearchIcon } from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles } from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { storeSubscriberActivity } from 'apps/nikshy-setu-mob/src/utils/functions';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import {
  BlockApiResponse,
  DistrictsApiResponse,
  RootReducerStates,
  ScreenProps,
  StateApiResponse,
} from '../../../../../../shared/types/src';
import Button from '../../../components/buttons/primaryButtons';
import { InputField } from '../../../components/inputComponents';

const ReferralHealth: React.FC<ScreenProps<'referralHealth'>> = ({
  navigation,
  route,
}) => {
  const { colors } = route.params.theme;
  const dispatch = useDispatch();
  const appTranslations = useSelector(
    (state: RootReducerStates) => state.appContext?.data?.appTranslations
  );
  const [dropDownOptions, setDropDownOptions] = useState({
    healthFacilities: [],
    stateOption: [],
    districtOption: [],
    blockOption: [],
  });

  useEffect(() => {
    dispatch(
      createAction<null, StateApiResponse>(
        {
          method: 'GET',
          url: 'STATES',
        },
        (v, res) => {
          if (v === 200 && Array.isArray(res)) {
            storeSubscriberActivity({
              module: 'Referral Health Facility',
              action: 'Referral Health Facility Fetched',
              dispatch: dispatch,
            });
            setDropDownOptions((previousVal) => ({
              ...previousVal,
              stateOption: res,
            }));
          }
        }
      )
    );
  }, []);
  const validation = Yup.object().shape({
    stateId: Yup.string().required('state is required'),
  });
  return (
    <Formik
      initialValues={{
        stateId: '',
        districtId: '',
        blockId: '',
        health_facility: [],
        cadreType: '',
      }}
      validationSchema={validation}
      onSubmit={(values) => {
        const query = `stateId=${values.stateId}${
          ((values?.districtId && '&districtId=' + values?.districtId) || '') +
          ((values?.blockId && '&blockId=' + values?.blockId) || '') +
          ((!(values?.health_facility.length === 0) &&
            '&health_facility=' + values?.health_facility.toString()) ||
            '')
        }`;
        navigation.navigate('referralHealthList', {
          theme: route.params?.theme,
          query: query,
        });
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        setValues,
        handleSubmit,
        setFieldValue,
      }) => {
        return (
          <View style={{ padding: RFValue(15), flex: 1 }}>
            <Text
              style={{
                fontSize: RFValue(20),
                fontWeight: '500',
                marginBottom: RFValue(2),
                color: colors.DARK_BLUE_394F89,
              }}
            >
              {appTranslations?.APP_LOCATE_HEALTH_CENTERS}
            </Text>
            <ScrollView>
              <InputField.DropDown
                label={appTranslations?.LABEL_STATE}
                search={true}
                options={
                  (dropDownOptions?.stateOption &&
                    dropDownOptions?.stateOption?.map((v) => {
                      return { label: v?.title, value: v?._id };
                    })) ||
                  []
                }
                error={errors.stateId as string}
                touched={touched.stateId as boolean}
                value={{ label: values.stateId, value: values.stateId }}
                onChange={(v) => {
                  setValues({
                    ...values,
                    stateId: v?.value,
                    districtId: '',
                    blockId: '',
                    health_facility: [],
                  });
                  dispatch(
                    createAction<null, DistrictsApiResponse>(
                      {
                        method: 'GET',
                        url: 'DISTRICTS',
                        query: v?.value,
                      },
                      (v, res) => {
                        if (Array.isArray(res)) {
                          setDropDownOptions({
                            ...dropDownOptions,
                            districtOption: (Array.isArray(res) && res) || [],
                            blockOption: [],
                            healthFacilities: [],
                          });
                        }
                      }
                    )
                  );
                }}
                placeholder='Select State'
              />
              <InputField.DropDown
                label={appTranslations?.LABEL_DISTRICT}
                search={true}
                options={
                  (dropDownOptions?.districtOption &&
                    dropDownOptions?.districtOption?.map((v) => {
                      return { label: v?.title, value: v?._id };
                    })) ||
                  []
                }
                error={errors?.districtId as string}
                touched={touched?.districtId as boolean}
                value={{ label: values.districtId, value: values.districtId }}
                onChange={(v) => {
                  setValues({
                    ...values,
                    districtId: v?.value,
                    blockId: '',
                    health_facility: [],
                  });
                  dispatch(
                    createAction<null, BlockApiResponse>(
                      {
                        method: 'GET',
                        url: 'BLOCKS',
                        query: v?.value,
                      },
                      (v, res) => {
                        if (v === 200 && Array.isArray(res)) {
                          setDropDownOptions({
                            ...dropDownOptions,
                            blockOption: (Array.isArray(res) && res) || [],
                            healthFacilities: [],
                          });
                        }
                      }
                    )
                  );
                }}
                disable={dropDownOptions?.districtOption?.length === 0}
                placeholder='Select District'
              />
              <InputField.DropDown
                label={appTranslations?.LABEL_TU}
                search={true}
                options={
                  (dropDownOptions?.blockOption &&
                    dropDownOptions?.blockOption?.map((v) => {
                      return { label: v?.title, value: v?._id };
                    })) ||
                  []
                }
                error={errors?.blockId as string}
                touched={touched?.blockId as boolean}
                disable={dropDownOptions?.blockOption?.length === 0}
                value={{ label: values.blockId, value: values.blockId }}
                onChange={(v) => {
                  setValues({
                    ...values,
                    blockId: v?.value,
                    health_facility: [],
                  });
                }}
                placeholder='Select TU'
              />
              <InputField.MultiSelect
                label={appTranslations?.LABEL_HEALTH_FACILITY}
                options={[
                  'DMC',
                  'TRUNAT',
                  'CBNAAT',
                  'X Ray',
                  'ICTC',
                  'LPA Lab',
                  'Confirmation Center',
                  'Tobacco Cessation Clinic',
                  'ANC Clinic',
                  'Nutritional Rehabilitation Center',
                  'De Addiction Centres',
                  'ART Center',
                  'District DRTB Centre',
                  'Nodal DRTB Center',
                  'IRL',
                  'Child Health Care Center',
                ].map((v) => {
                  return { label: v, value: v };
                })}
                error={errors?.health_facility as string}
                touched={touched?.health_facility as boolean}
                value={values.health_facility}
                onChange={(v) => {
                  setFieldValue('health_facility', v, true);
                }}
                // health_facility=DMC,TRUNAT,CBNAAT
                placeholder='Select Health Facility'
              />
            </ScrollView>
            <View style={{ alignContent: 'flex-end' }}>
              <Button
                onPress={() => {
                  handleSubmit();
                }}
                title={appTranslations?.APP_SEARCH}
                textStyle={fontStyles.Maison_500_13PX_20LH}
                bgColor={colors.DARK_BLUE_394F89}
                containerStyle={{ margin: RFValue(5), padding: RFValue(10) }}
                leftIcon={<SearchIcon stroke={'white'} />}
              />
              <Button
                onPress={() => {
                  navigation.navigate('referralHealthList', {
                    theme: route.params?.theme,
                    query: '',
                  });
                }}
                title={appTranslations?.APP_VIEW_ALL}
                textStyle={[
                  fontStyles.Maison_500_13PX_20LH,
                  { color: 'black' },
                ]}
                bgColor={colors.WHITE_FFFF}
                containerStyle={{
                  margin: RFValue(5),
                  borderWidth: 1,
                  padding: RFValue(10),
                }}
              />
            </View>
          </View>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({});

export default ReferralHealth;
