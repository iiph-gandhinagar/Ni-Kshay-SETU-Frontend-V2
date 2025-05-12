import { BASE_URL, Urls } from '@nikshay-setu-v3-monorepo/constants';
import {
  ApiRequestPayload,
  ApiResponsePayload,
  RequestPayload,
  ResponsePayload,
} from '@nikshay-setu-v3-monorepo/types';
import { logInfo } from './function';
import networkClient from './networkClient';

export async function callApi<
  T extends RequestPayload,
  R extends ResponsePayload
>(payload: ApiRequestPayload<T>): Promise<ApiResponsePayload<R>> {
  const url = `${BASE_URL + Urls[payload?.url] + (payload?.query || '')}`;

  try {
    let response: ApiResponsePayload<R>;
    switch (payload.method) {
      case 'GET':
        response = await new Promise<ApiResponsePayload<R>>(
          (resolve, reject) => {
            networkClient
              .get(
                url,
                (responseData) => {
                  resolve(responseData?.data as ApiResponsePayload<R>);
                },
                { headers: payload?.headers }
              )
              .catch(reject);
          }
        );
        break;
      case 'POST':
        response = await new Promise<ApiResponsePayload<R>>(
          (resolve, reject) => {
            networkClient
              .post(
                url,
                payload.data,
                (responseData) => {
                  resolve(responseData?.data as ApiResponsePayload<R>);
                },
                { headers: payload?.headers }
              )
              .catch(reject);
          }
        );
        break;

      case 'PATCH':
        response = await new Promise<ApiResponsePayload<R>>(
          (resolve, reject) => {
            networkClient
              .patch(
                url,
                payload.data,
                (responseData) => {
                  resolve(responseData?.data as ApiResponsePayload<R>);
                },
                { headers: payload?.headers }
              )
              .catch(reject);
          }
        );
        break;

      case 'DELETE':
        response = await new Promise<ApiResponsePayload<R>>(
          (resolve, reject) => {
            networkClient
              .delete(
                url,
                { data: payload.data },
                (responseData) => {
                  resolve(responseData?.data as ApiResponsePayload<R>);
                },
                { headers: payload?.headers }
              )
              .catch(reject);
          }
        );
        break;

      default:
        throw new Error(`Unsupported HTTP method: ${payload.method}`);
    }
    if (
      payload.url &&
      [
        'SUBSCRIBER_ACTIVITY',
        'MANAGE_TB',
        'USER_VALIDATION',
        'LOGOUT',
      ].includes(payload.url)
    )
      logInfo(url, payload, payload.method, response);
    return response;
  } catch (error: unknown) {
    console.log('error 254', error);
    throw error; // Ensure the error is thrown to be handled upstream
  }
}
