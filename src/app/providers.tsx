'use client'
import { createContext } from 'react'
import { create } from 'zustand'
import axios from 'axios'

// 定义全局状态类型
interface StoreState {
  isLogin: boolean
  userInfo: { id: string; name: string; avatar: string } | null
  login: (user: any) => void
  logout: () => void
}

// 创建Store
export const useStore = create<StoreState>((set) => ({
  isLogin: false,
  userInfo: null,
  login: (user) => set({ isLogin: true, userInfo: user }),
  logout: () => set({ isLogin: false, userInfo: null }),
}))

// 接口请求封装 (Axios)
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api', // 后端接口地址
  timeout: 5000,
  withCredentials: true, // 跨域携带Cookie（登录态）
})

// 请求拦截器：添加Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截器：统一处理错误
api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response?.status === 401) {
      // 未登录，跳转登录页
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

// 创建Context，方便全局使用api
export const ApiContext = createContext<typeof api>(api)

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  )
}