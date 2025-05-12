import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { Cookies } from 'react-cookie';
import { Platform } from 'react-native';
import { getDataFromAsyncStorage } from './function';

// Define options for the network client
interface NetworkClientOptions {
  headers?: { [key: string]: string };
  onUploadProgress?: (progressEvent: ProgressEvent) => void;
}

// Define the structure of the callback response
interface CallbackResponse<T> {
  status: number;
  data: T;
}

// Network client class
class NetworkClient {
  private service: AxiosInstance;

  constructor() {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const service = axios.create({
      headers,
    });

    // Set up request and response interceptors
    service.interceptors.request.use(this.handleRequest.bind(this));
    service.interceptors.response.use(
      this.handleSuccess.bind(this),
      this.handleError.bind(this)
    );

    this.service = service;
  }

  // Handle request to include token in headers
  private async handleRequest(
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> {
    const cookies = new Cookies();
    const mobileToken = await getDataFromAsyncStorage('token');
    const langKey = await getDataFromAsyncStorage('lang');
    let token: string | null =
      Platform.OS === 'web' ? cookies.get('token') : mobileToken;
    const lang: string | 'en' =
      (Platform.OS === 'web' ? cookies.get('lang') : langKey) || 'en';
    if (!token) {
      try {
        token = cookies.get('token') || mobileToken || null;
      } catch (error) {
        token = null;
      }
    }

    config.headers = {
      lang,
      ...config.headers,
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
    } as AxiosRequestHeaders & { lang: string };
    return config;
  }

  // Handle successful response
  private handleSuccess(response: AxiosResponse): AxiosResponse {
    return response;
  }

  // Handle response error
  private async handleError(error: AxiosError): Promise<AxiosError> {
    //main request
    const cookies = new Cookies();
    const isWeb = Platform.OS === 'web';
    const webToken = await cookies.get('token');
    const webUserId = await cookies.get('userId');
    // if token expire
    if (error.status == 401 && (webToken || webUserId) && isWeb) {
      cookies.remove('token');
      cookies.remove('userId');
      cookies.remove('lang');
      cookies.remove('goal');
      window.location.reload();
    }
    return Promise.reject(error);
  }

  // HTTP GET request
  public get<T>(
    path: string,
    callback: (response: CallbackResponse<T>) => void,
    options?: NetworkClientOptions
  ) {
    return this.service
      .get<T>(path, { headers: options?.headers })
      .then((response) =>
        callback({ status: response.status, data: response.data })
      )
      .catch((error) => {
        console.error('Network request failed:', error);
        callback({
          status: error?.response?.status || 500,
          data: error.response?.data || error,
        });
        // throw error;
      });
  }

  // HTTP PATCH request
  public patch<T>(
    path: string,
    payload: unknown,
    callback: (response: CallbackResponse<T>) => void,
    options?: NetworkClientOptions
  ) {
    return this.service
      .patch<T>(path, payload, { headers: options?.headers })
      .then((response) =>
        callback({ status: response.status, data: response.data })
      )
      .catch((error) => {
        console.error('Network request failed:', error);
        callback({
          status: error?.response?.status || 500,
          data: error.response?.data || error,
        });
        // throw error;
      });
  }

  // HTTP POST request
  public post<T>(
    path: string,
    payload: unknown,
    callback: (response: CallbackResponse<T>) => void,
    options?: NetworkClientOptions
  ) {
    return this.service
      .post<T>(path, payload, {
        headers: options?.headers,
        // onUploadProgress: options?.onUploadProgress,
      })
      .then((response) =>
        callback({ status: response.status, data: response.data })
      )
      .catch((error) => {
        console.error('Network request failed:', error);
        callback({
          status: error?.response?.status || 500,
          data: error.response?.data || error,
        });
        // throw error;
      });
  }

  // HTTP PUT request
  public put<T>(
    path: string,
    payload: unknown,
    callback: (response: CallbackResponse<T>) => void,
    options?: NetworkClientOptions
  ) {
    return this.service
      .put<T>(path, payload, { headers: options?.headers })
      .then((response) =>
        callback({ status: response.status, data: response.data })
      )
      .catch((error) => {
        console.error('Network request failed:', error);
        callback({
          status: error?.response?.status || 500,
          data: error.response?.data || error,
        });
        // throw error;
      });
  }

  // HTTP DELETE request
  public delete<T>(
    path: string,
    payload: unknown,
    callback: (response: CallbackResponse<T>) => void,
    options?: NetworkClientOptions
  ) {
    return this.service
      .delete<T>(path, {
        data: payload,
        headers: options?.headers,
      })
      .then((response) =>
        callback({ status: response.status, data: response.data })
      )
      .catch((error) => {
        console.error('Network request failed:', error);
        callback({
          status: error?.response?.status || 500,
          data: error.response?.data || error,
        });
        // throw error;
      });
  }

  // HTTP POST request with FormData payload
  public postAsFormData<T>(
    path: string,
    payload: FormData,
    callback: (response: CallbackResponse<T>) => void,
    options?: NetworkClientOptions
  ) {
    return this.service
      .post<T>(path, payload, { headers: options?.headers })
      .then((response) =>
        callback({ status: response.status, data: response.data })
      )
      .catch((error) => {
        console.error('Network request failed:', error);
        callback({
          status: error?.response?.status || 500,
          data: error.response?.data || error,
        });
        // throw error;
      });
  }
}

export default new NetworkClient();
