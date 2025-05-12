import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { RootReducerStates } from '@nikshay-setu-v3-monorepo/types';
import React, { useEffect } from 'react';
import { Cookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { UserProfileApiResponse } from 'shared/types/src/screens/UserTypes';
import { Query2Coe } from '../../components/Cards/Query2Coe';
import { QueryResponseAccordionCard } from '../../components/Cards/QueryResponseAccordionCard';
import { useLanguageObject } from '../../utils/HelperHooks';

const QueryResponseManagement = () => {
  const [langKey, getText, objectToValue] = useLanguageObject();
  const cookies = new Cookies();
  const { error, data, loadingApis } = useSelector(
    (state: RootReducerStates) => state.appContext
  );
  const userType =
    data?.user_profile?.userContext?.queryDetails?.type?.name || 'Default';
  const dispatch = useDispatch();
  const metaData = {
    COE: {
      hideRaiseQueryBtn: true,
      subHeader: 'Q2COE_ANSWER_QUERY_FROM_JUNIOR',
      queryListTitle: 'Q2COE_AWAITING_RESPONSE',
      queryListButtonText: 'Q2COE_AWAITING_RESPONSE',
      trackQueryParams: {
        subscriberId: data?.user_profile?._id,
        userType: userType,
        showHistory: true,
      },
    },
    NODAL: {
      subHeader: 'Q2COE_RAISING_QUERY_ANSWER_JUNIOR',
      queryListTitle: 'Q2COE_AWAITING_RESPONSE',
      queryListButtonText: 'Q2COE_AWAITING_RESPONSE',
      trackQueryParams: {
        Q2COE_INFO_TRANSFERREDInstitute:
          data?.user_profile?.userContext?.queryDetails?.instituteId,
        subscriberId: data?.user_profile?._id,
        userType: userType,
      },
    },
    DRTB: {
      subHeader: 'Q2COE_RAISE_QUERY_TO_SENIOR_DR',
      queryListTitle: 'Q2COE_MY_QUERY',
      queryListButtonText: 'Q2COE_CHECK_QUERY',
      trackQueryParams: {
        subscriberId: data?.user_profile?._id,
        userType: userType,
      },
    },
    Subscriber: {
      subHeader: 'Q2COE_RAISE_QUERY_TO_SENIOR_DR',
      queryListTitle: 'Q2COE_LATEST_QUERY',
      queryListButtonText: 'Q2COE_CHECK_QUERY',
      trackQueryParams: {
        subscriberId: data?.user_profile?._id,
        userType: userType,
      },
    },
    Default: {
      hideRaiseQueryBtn: true,
      hideTrackQueryBtn: true,
      subHeader: 'You Are Not Elidible',
      queryListTitle: 'Latest Query',
      queryListButtonText: 'Check Query',
      trackQueryParams: {
        subscriberId: data?.user_profile?._id,
        userType: userType,
      },
    },
  };
  useEffect(() => {
    dispatch(
      createAction<null, UserProfileApiResponse>(
        {
          method: 'GET',
          url: 'USER_PROFILE',
          query: cookies.get('userId'),
        },
        (code, res) => {
          const userType =
            res.userContext?.queryDetails?.type?.name || 'Default';
          const IsCOE_NODAL =
            !(userType === 'DRTB') &&
            Boolean(res?.userContext?.queryDetails?.instituteId);
          if (code === 200 && !(userType === 'Default')) {
            dispatch(
              createAction({
                method: 'GET',
                url: 'QUERY_LIST',
                query: IsCOE_NODAL
                  ? '?sortOrder=desc&sortBy=createdAt&queryRespondedInstitute=' +
                    res?.userContext?.queryDetails?.instituteId
                  : `?raisedBy=${cookies.get('userId')}`,
              })
            );
          }
        }
      )
    );
  }, []);
  return (
    <React.Fragment>
      <Query2Coe metaData={metaData} data={data} userType={userType} />
      <QueryResponseAccordionCard
        metaData={metaData}
        data={data}
        loadingApis={loadingApis}
        userType={userType}
      ></QueryResponseAccordionCard>
    </React.Fragment>
  );
};

export default QueryResponseManagement;
