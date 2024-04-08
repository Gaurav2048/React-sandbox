import axios, { AxiosRequestConfig } from "axios";
// import cookieFns from 'js-cookie';

import { Dispatch } from "redux";
// import { setupCache } from 'axios-cache-adapter';
// import { snakeCase } from 'snake-case';
// import { stringify } from 'query-string';
// import { toast } from 'react-toastify';
const {
  NODE_ENV,
  REACT_APP_BACKEND_URL_BASE = "",
  REACT_APP_BACKEND_URL_POSTFIX = "",
  REACT_APP_COOKIE_DOMAIN,
} = import.meta.env;

export const backendBaseUrl = "http://localhost:3000/v1/";

// const cache = setupCache({
//   maxAge: 15 * 60 * 1000, // 15 mins
// });

const axiosInstance = axios.create({
  baseURL: backendBaseUrl,
  timeout: 30000,
  //   adapter: cache.adapter,
  withCredentials: true,
});

const axiosRequest = (props: AxiosRequestConfig) => {
  return axiosInstance
    .request(props)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};

const CALL_API = "CALL_API";

const reduxMiddleware =
  () =>
  (next: Dispatch<APIAction | ReduxAction>) =>
  (action: APIAction | ReduxAction): any => {
    const { type, actions, ...callApiFnProps } = action;

    if (type !== CALL_API) {
      return next({
        type: actions?.success,
        payload: actions?.payload,
      });
    }

    return callApi(callApiFnProps)
      .then((data) => {
        if (actions) {
          return next({
            type: actions?.success,
            ...data,
          });
        }
        return data;
      })
      .catch((error) => {
        if (actions) {
          throw next({
            type: actions?.error,
            error: error.data,
            status: error.status,
          }).error;
        }

        throw error;
      });
  };

export default reduxMiddleware;

export const callApi: CallApi = (action) => {
  const {
    shouldCache,
    // cache: localCacheOptions,
    headers,
    ...axiosRequestProps
  } = action;

  const mandatoryHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  /* --------------------------- Header Modification -------------------------- */

  const requestHeaders: Record<string, string> = {
    ...mandatoryHeaders,

    "x-access-token": localStorage.getItem("token") || "",
  };

  /* ---------------------------- URL Modification ---------------------------- */

  const axiosRequestConfig: AxiosRequestConfig = {
    ...axiosRequestProps,
    headers: requestHeaders,
    // cache: shouldCache
    //   ? localCacheOptions
    //   : {
    //       ignoreCache: true,
    //     },
  };

  return axiosRequest(axiosRequestConfig).then(
    ({ data, ...response }) => {
      const returnData = {
        payload: data,
        response,
      };

      return returnData;
    },
    (err) => {
      if (err?.response?.status === 401) {
        if (NODE_ENV !== "production") {
          //   toast.error(`ACCESS DENIED ${axiosRequestConfig.url}`);
        }
        window.location.reload();
      } else if (err?.response?.status === 500) {
        if (NODE_ENV !== "production") {
          //   toast.error(
          //     `Looks like there is some technical difficulties fetching the resources ${axiosRequestConfig.url}`,
          //   );
        }
      } else if (err?.response?.status === 403) {
        if (NODE_ENV !== "production") {
          //   toast.error(`FORBIDDEN ${axiosRequestConfig.url}`);
        }
      }

      if (axios.isCancel(err)) {
        throw { error: { status: "cancel" }, response: err };
      }

      // throw {
      //   data: err?.response?.data,
      //   status: err?.response?.status || 'UNKNOWN',
      // };
      throw err?.response?.data || err?.response;
    }
  );
};
