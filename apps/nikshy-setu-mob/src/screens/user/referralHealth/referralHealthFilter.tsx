import { CheckSvg } from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles, uiStyles } from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  BlockApiResponse,
  DistrictsApiResponse,
  ScreenProps,
  StateApiResponse,
} from '@nikshay-setu-v3-monorepo/types';
import {
  CustomRFValue as RFValue,
  transformText,
} from '@nikshay-setu-v3-monorepo/utils';
import Button from 'apps/nikshy-setu-mob/src/components/buttons/primaryButtons';
import SkeletonLoader from 'apps/nikshy-setu-mob/src/components/cards/skeletonLoader';
import { Row } from 'apps/nikshy-setu-mob/src/components/commonComponents/row_column';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
type FilterTypes = 'state' | 'district' | 'block' | 'facilities';
const tabName: { id: number; title: FilterTypes }[] = [
  {
    id: 1,
    title: 'state',
  },
  {
    id: 2,
    title: 'district',
  },
  {
    id: 3,
    title: 'block',
  },
  {
    id: 4,
    title: 'facilities',
  },
];
const facilities = [
  {
    _id: 'DMC',
    title: 'DMC',
  },
  {
    _id: 'TRUNAT',
    title: 'TRUNAT',
  },
  {
    _id: 'CBNAAT',
    title: 'CBNAAT',
  },
  {
    _id: 'X Ray',
    title: 'X Ray',
  },
  {
    _id: 'ICTC',
    title: 'ICTC',
  },
  {
    _id: 'LPA Lab',
    title: 'LPA Lab',
  },
  {
    _id: 'Confirmation Center',
    title: 'Confirmation Center',
  },
  {
    _id: 'Tobacco Cessation Clinic',
    title: 'Tobacco Cessation Clinic',
  },
  {
    _id: 'ANC Clinic',
    title: 'ANC Clinic',
  },
  {
    _id: 'Nutritional Rehabilitation Center',
    title: 'Nutritional Rehabilitation Center',
  },
  {
    _id: 'De Addiction Centres',
    title: 'De Addiction Centres',
  },
  {
    _id: 'ART Center',
    title: 'ART Center',
  },
  {
    _id: 'Center',
    title: 'Center',
  },
  {
    _id: 'District DRTB Centre',
    title: 'District DRTB Centre',
  },
  {
    _id: 'Nodal DRTB Center',
    title: 'Nodal DRTB Center',
  },
  {
    _id: 'IRL',
    title: 'IRL',
  },
  {
    _id: 'Child Health Care Center',
    title: 'Child Health Care Center',
  },
];
const Loader = () => {
  const [renderedLoaders, setRenderedLoaders] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRenderedLoaders((prev) => {
        if (prev < 10) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 50);

    return () => clearInterval(interval); // Cleanup
  }, []);
  return (
    <View>
      {Array?.from({ length: renderedLoaders }).map((_, index) => {
        return (
          <View
            key={'loader' + index}
            style={{
              height: RFValue(40),
              marginVertical: RFValue(8),
              marginHorizontal: RFValue(10),
            }}
          >
            <SkeletonLoader />
          </View>
        );
      })}
    </View>
  );
};
const ReferralHealthFilter: React.FC<ScreenProps<'referralHealthFilter'>> = ({
  navigation,
  route,
}) => {
  const colors = route?.params?.theme?.colors;
  const [selectedMenu, setSelectedMenu] = useState<FilterTypes>('state');
  const [selectedValue, setSelectedValue] = useState({
    state: null,
    district: null,
    block: null,
    facilities: [],
  });
  const [listItem, setListItem] = useState({
    state: [],
    district: [],
    block: [],
    facilities: facilities,
  });
  function clearFilter() {
    setSelectedMenu('state');
    setSelectedValue({
      state: null,
      district: null,
      block: null,
      facilities: [],
    });
  }
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      createAction<null, StateApiResponse>(
        {
          method: 'GET',
          url: 'STATES',
        },
        (status: number, response) => {
          if (status === 200) {
            const filterData = response?.map((v) => {
              return { _id: v._id, title: v?.title };
            });
            setListItem({
              state: filterData,
              district: [],
              block: [],
              facilities: facilities,
            });
          }
        }
      )
    );
  }, []);
  function isCheckedValue(_selectedMenu, selectedValue) {
    if (selectedMenu === 'facilities') {
      return _selectedMenu?.includes(selectedValue);
    } else {
      return _selectedMenu === selectedValue;
    }
  }
  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <Row style={{ justifyContent: 'space-evenly' }}>
        <Button
          title='✘'
          bgColor={colors?.DARK_BLUE_394F89}
          containerStyle={{ flex: 0.2, margin: RFValue(10) }}
          onPress={() => navigation.goBack()}
        />
        <Button
          title={'Clear All'}
          onPress={clearFilter}
          bgColor={colors?.DARK_BLUE_394F89}
          containerStyle={{
            flex: 1,
            margin: RFValue(10),
          }}
        />
        <Button
          title='Apply'
          disabled={!selectedValue?.state}
          bgColor={
            selectedValue?.state
              ? colors?.DARK_BLUE_394F89
              : colors.LIGHT_GREY_CCC
          }
          containerStyle={uiStyles?.flex1Margin10}
          onPress={() => {
            const query = `stateId=${selectedValue?.state}${
              ((selectedValue?.district &&
                '&districtId=' + selectedValue?.district) ||
                '') +
              ((selectedValue?.block && '&blockId=' + selectedValue?.block) ||
                '') +
              ((!(selectedValue?.facilities.length === 0) &&
                '&health_facility=' + selectedValue?.facilities.toString()) ||
                '')
            }`;
            navigation.replace('referralHealthList', {
              theme: route.params?.theme,
              query: query,
            });
          }}
        />
      </Row>
      <View style={{ flex: 1 }}>
        <Row style={{ flex: 1 }}>
          <View style={{ flex: 0.5 }}>
            {tabName.map((item) => {
              const isDisabled =
                item?.title === 'block'
                  ? Boolean(selectedValue.state && selectedValue.district)
                  : item?.title === 'district'
                  ? selectedValue.state
                  : true;
              return (
                <Button
                  key={item?.title}
                  disabled={!isDisabled}
                  onPress={() => {
                    setSelectedMenu(item?.title);

                    if (item?.title === 'district') {
                      dispatch(
                        createAction<null, DistrictsApiResponse>(
                          {
                            method: 'GET',
                            url: 'DISTRICTS',
                            query: selectedValue?.state,
                          },
                          (status, response) => {
                            if (status === 200)
                              setListItem((prevData) => {
                                return {
                                  ...prevData,
                                  district: response,
                                  block: [],
                                  facilities: facilities,
                                };
                              });
                          }
                        )
                      );
                    } else if (item?.title === 'block') {
                      dispatch(
                        createAction<null, BlockApiResponse>(
                          {
                            method: 'GET',
                            url: 'BLOCKS',
                            query: selectedValue?.district,
                          },
                          (status: number, response) => {
                            const filterData = response?.map((v) => {
                              return { _id: v?._id, title: v?.title };
                            });
                            if (status === 200) {
                              setListItem((prevData) => {
                                return {
                                  ...prevData,
                                  block: filterData,
                                  facilities: facilities,
                                };
                              });
                            }
                          }
                        )
                      );
                    }
                  }}
                  title={transformText(item?.title, 'capitalizeFirstLetter')}
                  bgColor={colors?.WHITE_FFFF}
                  containerStyle={{
                    flex: 1,
                    margin: RFValue(10),
                    borderWidth: item?.title === selectedMenu ? 3 : 1,
                    elevation: 9,
                    borderColor:
                      item?.title === selectedMenu
                        ? 'green'
                        : colors?.BLUE_62C6E5,
                  }}
                  textStyle={{
                    color:
                      item?.title === selectedMenu
                        ? 'green'
                        : colors?.DARK_BLUE_394F89,
                  }}
                />
              );
            })}
          </View>
          <View
            style={{
              flex: 1,
              borderStartWidth: 1,
              elevation: 9,
              backgroundColor: 'white',
            }}
          >
            <ScrollView>
              {listItem?.[selectedMenu].length === 0 ? (
                <Loader />
              ) : (
                listItem?.[selectedMenu]?.map((item, index) => {
                  return (
                    <TouchableHighlight
                      underlayColor={'green'}
                      key={index + '-' + selectedMenu}
                      style={{
                        margin: RFValue(5),
                        borderRadius: RFValue(10),
                        padding: RFValue(10),
                        borderColor: isCheckedValue(
                          selectedValue?.[selectedMenu],
                          item?._id
                        )
                          ? 'green'
                          : 'black',
                        backgroundColor: 'white',
                      }}
                      onPress={() => {
                        if (selectedMenu === 'facilities') {
                          setSelectedValue((prevVal) => {
                            let newVal;
                            if (prevVal.facilities?.includes(item?._id)) {
                              newVal = prevVal.facilities.filter(
                                (v) => v !== item?._id
                              );
                            } else {
                              newVal = [...prevVal.facilities, item?._id];
                            }

                            return { ...prevVal, facilities: newVal };
                          });
                        } else if (selectedMenu === 'state') {
                          setSelectedValue({
                            state: item?._id,
                            block: null,
                            district: null,
                            facilities: [],
                          });
                          setListItem((prevData) => {
                            return {
                              ...prevData,
                              district: [],
                              block: [],
                              facilities: facilities,
                            };
                          });
                        } else if (selectedMenu === 'district') {
                          setSelectedValue((prevVal) => {
                            return {
                              ...prevVal,
                              district: item?._id,
                              block: null,
                            };
                          });
                          setListItem((prevData) => {
                            return {
                              ...prevData,
                              block: [],
                              facilities: facilities,
                            };
                          });
                        } else if (selectedMenu === 'block') {
                          setSelectedValue((prevVal) => {
                            return { ...prevVal, block: item?._id };
                          });
                        }
                      }}
                    >
                      <Row>
                        <View
                          style={{
                            height: RFValue(23),
                            width: RFValue(23),
                            borderRadius: RFValue(20),
                            borderColor: 'green',
                            borderWidth: 2,
                            alignItems: 'center',
                            marginEnd: RFValue(10),
                            alignContent: 'center',
                            backgroundColor: isCheckedValue(
                              selectedValue?.[selectedMenu],
                              item?._id
                            )
                              ? 'green'
                              : 'transparent',
                          }}
                        >
                          <CheckSvg />
                        </View>
                        <Text
                          style={[
                            fontStyles.Maison_400_12PX_16LH,
                            { flex: 1, textAlignVertical: 'center' },
                          ]}
                        >
                          {item?.title}
                        </Text>
                      </Row>
                    </TouchableHighlight>
                  );
                })
              )}
            </ScrollView>
          </View>
        </Row>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ReferralHealthFilter;
