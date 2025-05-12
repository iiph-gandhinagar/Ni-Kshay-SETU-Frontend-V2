import { ActionTypes } from '@nikshay-setu-v3-monorepo/constants';
import {
  ApiRequestPayload,
  ApiResponsePayload,
  CallBack,
  RequestPayload,
  ResponsePayload,
  UnauthorizedResponsePayload,
} from '@nikshay-setu-v3-monorepo/types';
import { callApi, ToastMessage } from '@nikshay-setu-v3-monorepo/utils';
import { Platform, StatusBar } from 'react-native';
import { call, put, takeEvery } from 'redux-saga/effects';
import { submitUserActivity } from '../user-activity/UserActivity';

export interface CommonAction<
  T extends RequestPayload,
  U extends ResponsePayload
> {
  type: string;
  payload: ApiRequestPayload<T>;
  callBack?: CallBack<U>;
}
function* commonSaga<T extends RequestPayload, U extends ResponsePayload>(
  action: CommonAction<T, U>
) {
  try {
    yield put({
      type: ActionTypes.LOADING_START,
      payload: action?.payload.url,
    });
    const response: ApiResponsePayload<U> = yield call(() =>
      callApi(action?.payload)
    );
    yield put({ type: ActionTypes.LOADING_STOP, payload: action?.payload.url });

    // call user activity
    if (Platform.OS === 'web') {
      submitUserActivity(action);
    }

    if (response?.code === 401) {
      const unauthorized = response?.data as UnauthorizedResponsePayload;
      if (unauthorized?.errors?.[0]?.Unauthorized === 'Unauthorized') {
        yield put({
          type: ActionTypes.ACTION_FAILURE,
          payload: {
            statusCode: 401,
            message: 'Unauthorized User',
          },
        });
      }
    }
    //ERR_NETWORK
    if (response?.code === 'ERR_NETWORK') {
      ToastMessage('No Internet Connection');
      // alert('No Internet Connection');
      yield put({
        type: ActionTypes.ACTION_FAILURE,
        payload: {
          statusCode: 'ERR_NETWORK',
          message: 'No Internet Connection',
        },
      });
    }

    //statusCode 404
    else if (response?.statusCode === 404) {
      if (action.callBack) {
        action.callBack(404, response?.data);
      }
      yield put({
        type: ActionTypes.ACTION_FAILURE,
        payload: { statusCode: 404, message: response.data },
      });
    }
    //statusCode 403
    else if (response?.code === 403) {
      yield put({
        type: ActionTypes.ACTION_FAILURE,
        payload: { statusCode: 403, message: '403 Forbidden' },
      });
    }
    //statusCode 200
    else if (response?.code === 200) {
      if (action.callBack) {
        action.callBack(200, response?.data);
      }
      yield put({
        type: ActionTypes.ACTION_SUCCESS,
        payload: response?.data,
        url: action?.payload?.url,
      });
    }

    //statusCode 400
    else if (response?.code === 400) {
      console.error('Error in commonSaga--: status', response);
      if (action.callBack) {
        action.callBack?.(response.code, response.data);
      }
      yield put({
        type: ActionTypes.ACTION_FAILURE,
        payload: { statusCode: 400, message: response.data },
      });
    }
    //statusCode 429
    else if (response?.code === 429) {
      ToastMessage('Too Many Requests\nPlease try again later');
    }
    //statusCode 500
    else if (response?.statusCode === 500) {
      ToastMessage('Internal server error');
      yield put({
        type: ActionTypes.ACTION_FAILURE,
        payload: { statusCode: 500, message: 'Internal server error' },
      });
    }
  } catch (error: unknown) {
    yield put({ type: ActionTypes.LOADING_STOP, payload: action?.payload.url });
    yield put({
      type: ActionTypes.ACTION_FAILURE,
      payload: { statusCode: 500, message: 'Internal server error' },
    });
    StatusBar.setBackgroundColor('#f59a9a');
    let errorMessage = 'An unexpected error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    alert(errorMessage);
    console.error('Error in commonSaga--:', error);
  }
}

function* commonSagas() {
  yield takeEvery(ActionTypes.GET, commonSaga);
  yield takeEvery(ActionTypes.DELETE, commonSaga);
  yield takeEvery(ActionTypes.PATCH, commonSaga);
  yield takeEvery(ActionTypes.POST, commonSaga);
}

export function* rootSaga() {
  yield* commonSagas();
}
