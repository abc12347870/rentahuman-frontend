import axios from 'axios';

// ❌ 原来的本地/Render地址
// const service = axios.create({
//   baseURL: 'http://localhost:3001',
//   timeout: 5000
// });

// ✅ 改成相对路径（Vercel同域名，不用跨域）
const service = axios.create({
  baseURL: '/', // 关键：相对路径，自动对接同域名的/api接口
  timeout: 5000
});

// 请求拦截器（不用改）
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器（不用改）
service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;