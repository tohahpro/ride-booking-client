import config from '@/config/index.config';
import axios, {  type AxiosRequestConfig } from 'axios';


export const axiosInstance = axios.create({
  baseURL: config.baseURL,
  withCredentials: true,
  //   timeout: 1000
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // console.log("axios", config);
    return config;
  }, function (error) {
    return Promise.reject(error);
  }
);

let isRefreshing = false;

let pendingQueue : {
  resolve : (value: unknown)=> void;
  reject : (value: unknown)=> void;
}[] = [];

const processQueue = (error: unknown) => {
  pendingQueue.forEach((promise) => {
    if(error){
      promise.reject(error);
    }else{
      promise.resolve(null);
    }
  });
  pendingQueue = [];
};


axiosInstance.interceptors.response.use(
  (response)=> {
    return response;
  },
  async (error)=> {
    const originalRequest = error.config as AxiosRequestConfig;

    console.log("original Request", originalRequest)
    if(error.response.status === 500 && 
      error.response.data.message === "jwt expired") {
      console.log("Your Token is expired");

      if (!isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        })
        .then(() => axiosInstance(originalRequest))
        .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        await axiosInstance.get('/auth/refresh-token');

        processQueue(null);

        return axiosInstance(originalRequest);
      } catch (error) {
        processQueue(error);
        return Promise.reject(error);
      }finally {
        isRefreshing = false;
      }
    }
    // for  Everything
    return Promise.reject(error);
  });


//   axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("accessToken");
//   if (token) {
//     config.headers = {
//       ...config.headers,
//       Authorization: `${token}`
//     } as unknown as AxiosRequestHeaders;
//   }
//   return config;
// });