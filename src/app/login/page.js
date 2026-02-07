'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify'; // 新增
import request from '@/app/utils/request';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [isCodeBtnDisabled, setIsCodeBtnDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (phone) {
      if (!/^1[3-9]\d{9}$/.test(phone)) {
        setPhoneError('请输入正确的11位手机号');
      } else {
        setPhoneError('');
      }
    } else {
      setPhoneError('');
    }
  }, [phone]);

  const handleGetCode = async () => {
    if (phoneError) {
      toast.error(phoneError); // 替换alert
      return;
    }
    try {
      await request.post('/api/send-code', { phone });
      toast.success('验证码发送成功！请查收'); // 替换alert
      setIsCodeBtnDisabled(true);
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev === 1) {
            clearInterval(timer);
            setIsCodeBtnDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      toast.error('获取验证码失败：' + (error.response?.data?.msg || '后端未启动')); // 替换alert
    }
  };

  const handleLogin = async () => {
    if (phoneError) {
      toast.error(phoneError); // 替换alert
      return;
    }
    if (!code) {
      toast.error('请输入验证码'); // 替换alert
      return;
    }
    setIsLoginLoading(true);
    try {
      const res = await request.post('/api/login', { phone, code });
      localStorage.setItem('token', res.token);
      toast.success('登录成功！'); // 替换alert
      router.push('/'); // 自动跳首页，不用手动刷新
    } catch (error) {
      toast.error('登录失败：' + (error.response?.data?.msg || '验证码错误/后端未启动')); // 替换alert
    } finally {
      setIsLoginLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-4 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-xl sm:text-3xl font-bold tracking-tight text-gray-900">
          账号登录
        </h2>
      </div>

      <div className="mt-4 sm:mt-8 w-full sm:max-w-md sm:mx-auto">
        <div className="bg-white py-6 sm:py-8 px-4 sm:px-6 shadow sm:rounded-lg">
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                手机号
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="请输入手机号"
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm
                    ${phoneError ? 'border-red-500' : 'border-gray-300'}`}
                  maxLength={11}
                />
              </div>
              {phoneError && (
                <p className="mt-1 text-xs sm:text-sm text-red-600">{phoneError}</p>
              )}
            </div>

            <div className="grid grid-cols-12 gap-2 sm:gap-4">
              <div className="col-span-7">
                <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                  验证码
                </label>
                <div className="mt-1">
                  <input
                    id="code"
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="请输入6位验证码"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    maxLength={6}
                  />
                </div>
              </div>
              <div className="col-span-5 flex items-end">
                <button
                  type="button"
                  onClick={handleGetCode}
                  disabled={isCodeBtnDisabled || phoneError}
                  className={`w-full px-2 py-2 text-xs sm:text-sm font-medium rounded-md
                    ${isCodeBtnDisabled || phoneError
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    }`}
                >
                  {countdown > 0 ? `${countdown}s后重发` : '获取验证码'}
                </button>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={handleLogin}
                disabled={isLoginLoading}
                className="w-full flex justify-center py-3 sm:py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoginLoading ? '登录中...' : '登录'}
              </button>
            </div>

            <div className="text-center text-xs sm:text-sm text-gray-500">
              还没有账号？{' '}
              <a
                href="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                立即注册
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}