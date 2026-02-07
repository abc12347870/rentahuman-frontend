'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify'; // 新增
import request from '@/app/utils/request';

export default function RegisterPage() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [isCodeBtnDisabled, setIsCodeBtnDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isRegLoading, setIsRegLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [confirmError, setConfirmError] = useState('');
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

  useEffect(() => {
    if (password) {
      if (!/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(password)) {
        setPwdError('密码需至少6位，含字母+数字');
      } else {
        setPwdError('');
      }
    } else {
      setPwdError('');
    }
  }, [password]);

  useEffect(() => {
    if (confirmPwd) {
      if (confirmPwd !== password) {
        setConfirmError('两次密码不一致');
      } else {
        setConfirmError('');
      }
    } else {
      setConfirmError('');
    }
  }, [confirmPwd, password]);

  const handleGetCode = async () => {
    if (phoneError) {
      toast.error(phoneError);
      return;
    }
    try {
      await request.post('/api/send-code', { phone });
      toast.success('验证码发送成功！请查收');
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
      toast.error('获取验证码失败：' + (error.response?.data?.msg || '后端未启动'));
    }
  };

  const handleRegister = async () => {
    if (phoneError) {
      toast.error(phoneError);
      return;
    }
    if (!code) {
      toast.error('请输入验证码');
      return;
    }
    if (pwdError) {
      toast.error(pwdError);
      return;
    }
    if (confirmError) {
      toast.error(confirmError);
      return;
    }
    setIsRegLoading(true);
    try {
      await request.post('/api/register', { phone, code, password });
      toast.success('注册成功！即将跳转到登录页');
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (error) {
      toast.error('注册失败：' + (error.response?.data?.msg || '验证码错误/手机号已注册'));
    } finally {
      setIsRegLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-4 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-xl sm:text-3xl font-bold tracking-tight text-gray-900">
          账号注册
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
              {phoneError && <p className="mt-1 text-xs sm:text-sm text-red-600">{phoneError}</p>}
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                设置密码
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请设置密码（6位以上）"
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm
                    ${pwdError ? 'border-red-500' : 'border-gray-300'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-xs sm:text-sm"
                >
                  {showPwd ? '隐藏' : '显示'}
                </button>
              </div>
              {pwdError && <p className="mt-1 text-xs sm:text-sm text-red-600">{pwdError}</p>}
            </div>

            <div>
              <label htmlFor="confirmPwd" className="block text-sm font-medium text-gray-700">
                确认密码
              </label>
              <div className="mt-1">
                <input
                  id="confirmPwd"
                  type={showPwd ? 'text' : 'password'}
                  value={confirmPwd}
                  onChange={(e) => setConfirmPwd(e.target.value)}
                  placeholder="请再次输入密码"
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm
                    ${confirmError ? 'border-red-500' : 'border-gray-300'}`}
                />
              </div>
              {confirmError && <p className="mt-1 text-xs sm:text-sm text-red-600">{confirmError}</p>}
            </div>

            <div>
              <button
                type="button"
                onClick={handleRegister}
                disabled={isRegLoading}
                className="w-full flex justify-center py-3 sm:py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isRegLoading ? '注册中...' : '注册'}
              </button>
            </div>

            <div className="text-center text-xs sm:text-sm text-gray-500">
              已有账号？{' '}
              <a
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                立即登录
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}