import axios from 'axios';
import vue from 'vue';

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000,
});

// request拦截器
service.interceptors.request.use(config => {
  return config;
}, error => {
  console.log(error);
  Promise.reject(error);
});

// respone拦截器
service.interceptors.response.use(
    response => response,
    error => {
      console.log('err' + error);
      vue.$Message.error({
        message: error.message,
        duration: 5 * 1000,
        closable: true,
      });
      return Promise.reject(error);
    },
);

export default service;
