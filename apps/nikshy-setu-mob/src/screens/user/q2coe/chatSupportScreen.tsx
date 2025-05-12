import {
  ArrowSvg,
  CloseSvg,
  DropdownArrowSvg,
  SortingArrow,
} from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles, uiStyles } from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  RootReducerStates,
  ScreenProps,
  ThemeProps,
} from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { useTheme } from '@react-navigation/native';
import Button from 'apps/nikshy-setu-mob/src/components/buttons/primaryButtons';
import { ChatTextCard } from 'apps/nikshy-setu-mob/src/components/cards/chatTextCard';
import { Row } from 'apps/nikshy-setu-mob/src/components/commonComponents/row_column';
import { useToast } from 'apps/nikshy-setu-mob/src/components/commonComponents/toastProvider';
import { storeSubscriberActivity } from 'apps/nikshy-setu-mob/src/utils/functions';
import { useEffect, useRef, useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { TransferQueryBYSubApiRequest } from 'shared/types/src/screens/Query2COETypes';
import { InputField } from '../../../components/inputComponents';

export const ChatSupport: React.FC<ScreenProps<'chatSupport'>> = ({
  navigation,
  route,
}) => {
  const { colors } = useTheme() as ThemeProps;
  const scrollViewRef = useRef<ScrollView>(null);
  const dispatch = useDispatch();
  const {
    query,
    userType,
    disableOption,
    queryRespondedInstitute,
    queryRespondedRole,
    respondedBy,
  } = route?.params;
  const dateOfAdmission =
    query.dateOfAdmission && new Date(query.dateOfAdmission);
  const [modal, setModal] = useState(false);
  const [transferDetails, setTransferDetails] = useState({ instituteId: '' });
  function closeModal() {
    setModal(false);
  }
  const { showToast } = useToast();
  const { error, data } = useSelector(
    (state: RootReducerStates) => state.appContext
  );
  const queryCreatedAt = new Date(query?.createdAt);
  const queryUpdatedAt = new Date(query?.updatedAt);
  const queryCreatedAtFormattedDate = `${queryCreatedAt?.getUTCDate()}/${
    queryCreatedAt?.getUTCMonth() + 1
  }/${queryCreatedAt.getUTCFullYear()}`;
  const queryUpdatedAtFormattedDate = `${queryUpdatedAt?.getUTCDate()}/${
    queryUpdatedAt?.getUTCMonth() + 1
  }/${queryUpdatedAt.getUTCFullYear()}`;
  const isQueryClosed = query?.status === 'completed';
  const showInstitute =
    !disableOption && !(userType === 'DRTB') && !isQueryClosed;
  useEffect(() => {
    if (showInstitute)
      dispatch(
        createAction({
          method: 'GET',
          url: 'INSTITUTE_LIST',
        })
      );
  }, []);
  const scrollDown = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };
  const [massages, setMassages] = useState([
    {
      massage: (
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: 'bold' }}>Summary{'\n'}</Text>
          <Text style={{}}>
            <Text style={{ fontWeight: 'bold', flex: 1, flexWrap: 'wrap' }}>
              Age:{' '}
            </Text>
            {query.age || '---'}
            {'\n'}
            <Text style={{ fontWeight: 'bold', flex: 1, flexWrap: 'wrap' }}>
              Gender:{' '}
            </Text>
            {query.sex || '---'}
            {'\n'}
            <Text style={{ fontWeight: 'bold', flex: 1, flexWrap: 'wrap' }}>
              Current diagnosis:{' '}
            </Text>
            {query.diagnosis || '---'}
            {'\n'}
            <Text style={{ fontWeight: 'bold', flex: 1, flexWrap: 'wrap' }}>
              Date of admission:{' '}
            </Text>
            {dateOfAdmission.getUTCDate() +
              '/' +
              (dateOfAdmission.getUTCMonth() + 1) +
              '/' +
              dateOfAdmission.getUTCFullYear() || '---'}
            {'\n'}
            <Text style={{ fontWeight: 'bold', flex: 1, flexWrap: 'wrap' }}>
              Chief complaint:{' '}
            </Text>
            {query.chiefComplaint || '---'}
            {'\n'}
            <Text style={{ fontWeight: 'bold', flex: 1, flexWrap: 'wrap' }}>
              Concerns and issues:{' '}
            </Text>
            {query.query || '---'}
            {'\n'}
            <Text style={{ fontWeight: 'bold', flex: 1, flexWrap: 'wrap' }}>
              History of present illness:{' '}
            </Text>
            {query.illness || '---'}
            {'\n'}
            <Text style={{ fontWeight: 'bold', flex: 1, flexWrap: 'wrap' }}>
              Past history/follow-up:{' '}
            </Text>
            {query.pastHistory || '---'}
            {'\n'}
            <Text
              style={{ fontWeight: 'bold' }}
              ellipsizeMode='tail'
              numberOfLines={1}
            >
              pre Treatment Evaluation:{' '}
            </Text>
            {query.preTreatmentEvaluation || '---'}
            {'\n'}
            <Text style={{ fontWeight: 'bold', flex: 1, flexWrap: 'wrap' }}>
              Current Treatment Plan:{' '}
            </Text>
            {query.currentTreatmentPlan || '---'}
            {'\n'}
          </Text>
        </View>
      ),
      time: queryCreatedAtFormattedDate,
      self: userType === 'DRTB',
    },
  ]);
  useEffect(() => {
    if (isQueryClosed) {
      setMassages((prev) => [
        ...prev,
        {
          massage: query?.response,
          time: queryUpdatedAtFormattedDate,
          self: userType === 'COE' || userType === 'NODAL' ? true : false,
        },
      ]);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: 'white',
          height: RFValue(50),
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomWidth: 1,
          marginHorizontal: RFValue(15),
          borderColor: colors.LIGHT_GREY_F4F4F4,
          flexDirection: 'row',
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <ArrowSvg
            width={RFValue(25)}
            height={RFValue(25)}
            style={{ transform: [{ rotate: '180deg' }] }}
          />
          <Text
            numberOfLines={1}
            ellipsizeMode='tail'
            style={{
              ...fontStyles.Maison_500_20PX_25LH,
              marginStart: RFValue(5),
              color: colors.DARK_BLUE_394F89,
            }}
          >
            Back
          </Text>
        </TouchableOpacity>
        {!(userType === 'COE') && showInstitute && (
          <Button
            title='transfer Query'
            containerStyle={{
              borderWidth: 0.5,
              alignSelf: 'flex-end',
              marginBottom: RFValue(5),
            }}
            textStyle={{ color: 'black' }}
            leftIcon={<SortingArrow style={uiStyles.rotate90deg} />}
            onPress={() => {
              setModal(true);
            }}
          />
        )}
      </View>
      <View style={{ padding: RFValue(10), flex: 1 }}>
        <Modal
          transparent
          visible={modal}
          animationType='none'
          onDismiss={closeModal}
          onRequestClose={closeModal}
          style={{ flex: 1 }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
            }}
          >
            <View
              style={{
                position: 'absolute',
                backgroundColor: 'white',
                borderRadius: RFValue(10),
                elevation: 5,
                shadowColor: '#000',
                flex: 1,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
              }}
            >
              <InputField.DropDown
                label='Select institute'
                value={{ value: transferDetails.instituteId, label: '' }}
                containerStyle={{ width: 300, margin: RFValue(10) }}
                options={data?.query2coe?.institute_list
                  ?.filter((v) => !(v._id === queryRespondedInstitute))
                  ?.map((item) => {
                    return { label: item.title, value: item._id };
                  })}
                touched={false}
                onChange={(v) => {
                  setTransferDetails({ instituteId: v?.value });
                }}
              />
              <Row
                style={{ justifyContent: 'space-between', margin: RFValue(10) }}
              >
                <Button
                  title='Cancel '
                  bgColor={colors.RED_DB3611}
                  onPress={closeModal}
                  leftIcon={<CloseSvg stroke={'white'} fill={'white'} />}
                />
                <Button
                  title=' Transfer'
                  bgColor={colors.BLUE_00739B}
                  disabled={Boolean(!transferDetails.instituteId)}
                  rightIcon={
                    <DropdownArrowSvg
                      style={{ transform: [{ rotate: '270deg' }] }}
                      stroke={'white'}
                    />
                  }
                  onPress={() => {
                    dispatch(
                      createAction<TransferQueryBYSubApiRequest, unknown>(
                        {
                          method: 'POST',
                          url: 'TRANSFER_QUERY_BY_SUBS',
                          data: {
                            instituteId: transferDetails.instituteId,
                            questions: [route.params.query?._id],
                          },
                        },
                        (code, res) => {
                          if (code === 200) {
                            storeSubscriberActivity({
                              module: 'Query2COE',
                              action: 'transfer query',
                              dispatch: dispatch,
                            });
                            showToast('Query Transfer Successfully!!');
                            closeModal();
                            navigation?.goBack();
                          }
                        }
                      )
                    );
                  }}
                />
              </Row>
            </View>
          </View>
        </Modal>
        <View style={{ padding: RFValue(10) }}>
          <Text
            style={{
              color: colors.LIGHT_BLUE_409BBB,
              ...fontStyles.Maison_400_16PX_25LH,
            }}
          >
            Query id ({query?.queryId})
          </Text>
        </View>
        <ScrollView
          contentContainerStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
          ref={scrollViewRef}
        >
          {massages.map((item, index) => {
            return (
              <ChatTextCard
                key={index + 'ChatTextCard'}
                text={item.massage}
                time={item.time}
                self={item.self}
              />
            );
          })}
        </ScrollView>

        {!disableOption && !isQueryClosed && (
          <InputField.MessageInput
            error='ChatSupport'
            hideAttachmentsIcon
            hideCameraIcon
            onSendClick={(text) => {
              dispatch(
                createAction(
                  {
                    data: {
                      response: text,
                      respondedBy: respondedBy,
                      queryRespondedRole: queryRespondedRole,
                      queryRespondedInstitute: queryRespondedInstitute,
                    },
                    method: 'PATCH',
                    url: 'QUERY',
                    query: '/' + route.params.query?._id,
                  },
                  (code, res) => {
                    if (code === 200) {
                      storeSubscriberActivity({
                        module: 'Query2COE',
                        action: 'query Responded',
                        dispatch: dispatch,
                      });

                      scrollDown();
                      setMassages([
                        ...massages,
                        { massage: text, time: 'now', self: true },
                      ]);
                      setTimeout(() => {
                        navigation.goBack();
                      }, 3000);
                    } else if (code === 400) {
                      showToast(res.errors?.[0]?.Response);
                    }
                  }
                )
              );
            }}
          />
        )}
      </View>
    </View>
  );
};
