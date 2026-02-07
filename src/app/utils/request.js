// src/app/utils/request.js
import axios from 'axios';

// 创建axios实例，对接后端3001端口
const request = axios.create({
  baseURL: 'http://localhost:3001', // 后端地址+端口
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器：添加token（登录后自动带token）
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器：统一处理错误
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    alert(error.response?.data?.msg || '请求失败，请检查后端是否启动');
    return Promise.reject(error);
  }
);

export default request;