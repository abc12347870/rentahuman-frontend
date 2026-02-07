'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

// 【关键修复】删除 metadata 导出

export default function Login() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 模拟获取验证码
  const handleGetCode = () => {
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      toast.error('请输入正确的手机号！');
      return;
    }
    toast.success('验证码已发送：123456');
  };

  // 模拟登录
  const handleLogin = (e) => {
    e.preventDefault();
    if (!phone || !code) {
      toast.error('手机号和验证码不能为空！');
      return;
    }
    if (code !== '123456') {
      toast.error('验证码错误！');
      return;
    }

    setLoading(true);
    // 模拟接口请求
    setTimeout(() => {
      localStorage.setItem('token', `mock_token_${phone}`);
      toast.success('登录成功！');
      // 通知其他页面刷新登录状态
      window.dispatchEvent(new Event('storage'));
      router.push('/');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">登录账号</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                手机号
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="请输入手机号"
                />
              </div>
            </div>

            <div className="flex space-x-2">
              <div className="flex-1">
                <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                  验证码
                </label>
                <div className="mt-1">
                  <input
                    id="code"
                    name="code"
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="请输入验证码"
                  />
                </div>
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={handleGetCode}
                  disabled={loading}
                  className="px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  获取验证码
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? '登录中...' : '登录'}
              </button>
            </div>

            <div className="text-center">
              <a
                href="/register"
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                还没有账号？去注册
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}