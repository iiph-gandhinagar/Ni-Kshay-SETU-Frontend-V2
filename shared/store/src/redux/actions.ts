import { ActionTypes } from '@nikshay-setu-v3-monorepo/constants';
import {
  ApiRequestPayload,
  CallBack,
  RequestPayload,
  ResponsePayload,
} from '@nikshay-setu-v3-monorepo/types';

export function createAction<
  T extends RequestPayload,
  U extends ResponsePayload
>(payload: ApiRequestPayload<T>, callBack?: CallBack<U>) {
  return {
    type: ActionTypes?.[payload.method],
    payload,
    callBack,
  };
}
