import {
  RadioCheckedSvg,
  RadioUncheckedSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles, uiStyles } from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  RootReducerStates,
  ScreenProps,
} from '@nikshay-setu-v3-monorepo/types';
import {
  getDataFromAsyncStorage,
  handleLogout,
  isEmpty,
  CustomRFValue as RFValue,
} from '@nikshay-setu-v3-monorepo/utils';
import Button from 'apps/nikshy-setu-mob/src/components/buttons/primaryButtons';
import ModalComponent from 'apps/nikshy-setu-mob/src/components/commonComponents/modal';
import { Row } from 'apps/nikshy-setu-mob/src/components/commonComponents/row_column';
import { useToast } from 'apps/nikshy-setu-mob/src/components/commonComponents/toastProvider';
import { InputField } from 'apps/nikshy-setu-mob/src/components/inputComponents';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
const styles = StyleSheet.create({
  container: {
    ...uiStyles?.flex1Padding10,
  },
  scrollViewStyle: {
    paddingBottom: RFValue(15),
  },
  reasonRow: {
    margin: RFValue(10),
    padding: RFValue(10),
    borderRadius: RFValue(10),
    backgroundColor: 'white',
    borderColor: 'white',
    elevation: RFValue(10),
  },
  reasonText: {
    marginStart: RFValue(10),
  },
  submitButton: {
    marginVertical: RFValue(20),
    padding: RFValue(15),
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: RFValue(10),
    width: '90%',
  },
  modalContent: {
    ...uiStyles?.flex1BgWhite,
  },
  modalTitle: {
    ...fontStyles?.Maison_400_17PX_27LH,
    textAlign: 'center',
    marginVertical: RFValue(10),
  },
  modalDescription: {
    ...fontStyles?.Maison_400_16PX_25LH,
    color: 'gray',
    textAlign: 'center',
  },
  modalButtons: {
    justifyContent: 'space-around',
    margin: RFValue(10),
  },
});
const DeleteAccount: React.FC<ScreenProps<'deleteAccount'>> = ({
  navigation,
  route,
}) => {
  const [selected, setSelected] = useState('');
  const [loading, setLoading] = useState(false);
  const [othersReason, setOthersReason] = useState<string | number>('');
  const [isDeleteModal, showDeleteModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const appTranslations = useSelector(
    (state: RootReducerStates) => state.appContext?.data?.appTranslations
  );
  function deleteAccount(selectedReason: string) {
    setTimeout(() => {
      showToast(appTranslations?.DELETE_ACC_SUCCESSFULLY);
      getDataFromAsyncStorage('token').then((token) => {
        getDataFromAsyncStorage('userId').then((userId) => {
          if (userId && token) {
            dispatch(
              createAction(
                {
                  method: 'POST',
                  url: 'LOGOUT',
                  data: { refreshToken: token, userId },
                },
                (code, res) => {
                  if (code === 200 && res) {
                    dispatch(
                      createAction(
                        {
                          data: { reason: selectedReason },
                          method: 'POST',
                          url: 'DELETE_ACCOUNT',
                        },
                        (statusCode, deleRes) => {
                          if (statusCode === 200 && deleRes) {
                            handleLogout((logoutCode) => {
                              if (logoutCode === 200) {
                                setLoading(false);
                                navigation.navigate('logIn', {
                                  tokenRefresher: 'tokenRefresh',
                                });
                              }
                            });
                          }
                        }
                      )
                    );
                  }
                }
              )
            );
          }
        });
      });
    }, 2000);
  }
  return (
    <View style={styles.container}>
      <Text>{appTranslations?.DELETE_ACC_IF_DELETE_ACC_PROVIDE_REASON}</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewStyle}
      >
        {[
          'No longer using the service/platform',
          'Found a better alternative',
          'Privacy concerns',
          'Too many emails/notifications',
          'Difficulty navigating the platform',
          'Account security concerns',
          'Personal reasons',
          'Others',
        ]?.map((item, index) => {
          return (
            <Pressable
              key={index}
              onPress={() => {
                if (!loading) {
                  setSelected(item);
                  if (item === 'Others') {
                    setOthersReason('');
                  }
                }
              }}
            >
              <Row style={styles.reasonRow}>
                {selected === item ? (
                  <RadioCheckedSvg />
                ) : (
                  <RadioUncheckedSvg />
                )}
                <Text
                  style={[fontStyles?.Maison_500_14PX_18LH, styles.reasonText]}
                >
                  {item}
                </Text>
              </Row>
            </Pressable>
          );
        })}
        {selected === 'Others' && (
          <InputField.Input
            label='Others Reasons'
            error={othersReason === null && 'Please Give Reason'}
            touched={othersReason === null}
            isRequired={true}
            value={othersReason}
            onChange={(v) => setOthersReason(v)}
          />
        )}
        {!isEmpty(selected) && (
          <Button
            title='Submit'
            loaderEnable={loading}
            disabled={loading}
            bgColor={route?.params?.theme?.colors?.DARK_BLUE_394F89}
            onPress={() => {
              let selectedReason = selected;
              if (selected === 'Others') {
                selectedReason = othersReason?.toString();
              }
              if (!isEmpty(selectedReason)) {
                showDeleteModal(true);
              } else {
                setOthersReason(null);
              }
            }}
            containerStyle={styles.submitButton}
          />
        )}
      </ScrollView>
      <ModalComponent
        closeModal={() => {
          showDeleteModal(false);
        }}
        isOpen={isDeleteModal}
        containerStyle={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {appTranslations?.APP_ARE_U_SURE}
          </Text>
          <Text style={styles.modalDescription}>
            {appTranslations?.DELETE_ACC_ONCE_DELETE_WILL_ERASED}
          </Text>
          <Text style={styles.modalDescription}>
            {'\n' + appTranslations?.DELETE_REVIEW_CAREFULLY_BEFORE_PRO}
          </Text>
          <Row style={styles.modalButtons}>
            <Button
              title={appTranslations?.APP_CANCEL}
              onPress={() => {
                showDeleteModal(false);
              }}
              bgColor={route?.params?.theme?.colors?.DARK_BLUE_394F89}
              containerStyle={uiStyles?.flex1Margin10}
            />
            <Button
              title={appTranslations?.APP_DELETE}
              onPress={() => {
                let selectedReason = selected;
                if (selected === 'Others') {
                  selectedReason = othersReason?.toString();
                }
                if (!isEmpty(selectedReason)) {
                  showDeleteModal(false);
                  setLoading(true);
                  deleteAccount(selectedReason);
                }
              }}
              bgColor={route?.params?.theme?.colors?.RED_DB3611}
              containerStyle={uiStyles?.flex1Margin10}
            />
          </Row>
        </View>
      </ModalComponent>
    </View>
  );
};

export default DeleteAccount;
