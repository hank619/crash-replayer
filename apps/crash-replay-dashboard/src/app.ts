import {
  AxiosRequestConfig,
  AxiosResponse,
  RequestConfig,
  RequestError,
} from '@umijs/max';
import { message, notification } from 'antd';
import { setDefaultColorPlateToRoot } from './utils/theme';

export async function getInitialState(): Promise<any> {
  setDefaultColorPlateToRoot();
  return {};
}

// error show type
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}
// biz response structure
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}

export const request: RequestConfig = {
  baseURL: API_HOST,

  // errorThrower => errorHandler
  errorConfig: {
    errorThrower: (res: ResponseStructure) => {
      // when axiosResponse.data.success = false
      // res here is pure biz response, not axiosResponse
      const { success, data, errorCode, errorMessage, showType } = res;
      if (!success) {
        const error: any = new Error(errorMessage);
        error.name = 'BizError';
        error.info = { errorCode, errorMessage, showType, data };
        throw error; // throw biz error, will be handled in errorHandler
      }
    },
    // including both biz error and Axios Error
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      if (error.name === 'BizError') {
        // biz error
        const errorInfo: ResponseStructure | undefined = error.info;
        if (errorInfo) {
          const { errorMessage, errorCode } = errorInfo;
          switch (errorInfo.showType) {
            case ErrorShowType.SILENT:
              // do nothing
              break;
            case ErrorShowType.WARN_MESSAGE:
              message.warning(errorMessage);
              break;
            case ErrorShowType.ERROR_MESSAGE:
              message.error(errorMessage);
              break;
            case ErrorShowType.NOTIFICATION:
              notification.open({
                description: errorMessage,
                message: errorCode,
              });
              break;
            case ErrorShowType.REDIRECT:
              // TODO: redirect
              break;
            default:
              message.error(errorMessage);
          }
        }
      } else if (error.response) {
        // axios error with response, not within 2xx
        message.error(`Response status:${error.response.status}`);
      } else if (error.request) {
        // request send, but there is not response
        message.error('None response! Please retry.');
      } else {
        // error when sending request
        message.error('Request error, please retry.');
      }
    },
  },
  requestInterceptors: [
    (config: AxiosRequestConfig) => {
      return { ...config };
    },
  ],
  responseInterceptors: [
    [
      // axios success
      (response: AxiosResponse) => {
        // response refer to https://raw.githubusercontent.com/matrixyf/pictureRepo/main/axiosReponse.png
        // will trigger errorConfig.errorThrower when response.data.success = false
        return response;
      },
      // axios error
      (error: RequestError) => {
        // error refer to https://raw.githubusercontent.com/matrixyf/pictureRepo/main/axiosError.png
        return Promise.reject(error);
      },
    ],
  ],
};
