'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify'; // 新增

// 【关键修复】删除 client 组件中的 metadata 导出
// export const metadata = { ... } 这部分全部删掉

export default function Home() {
  const [isLogin, setIsLogin] = useState(false);
  const [phone, setPhone] = useState('');
  const router = useRouter();

  // 1. 初始校验登录状态
  useEffect(() => {
    checkLoginStatus();

    // 2. 监听localStorage变化（比如登录/退出后自动刷新）
    const handleStorageChange = () => {
      checkLoginStatus();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // 封装登录状态检查函数
  const checkLoginStatus = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const mockPhone = token.replace('mock_token_', '');
      setIsLogin(true);
      setPhone(mockPhone);
    } else {
      setIsLogin(false);
      setPhone('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLogin(false);
    toast.success('退出登录成功！');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-indigo-600">Rentahuman</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              {isLogin ? (
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <span className="text-sm text-gray-700 hidden sm:inline">欢迎，{phone}</span>
                  <span className="text-sm text-gray-700 sm:hidden">@{phone.slice(-4)}</span>
                  <button
                    onClick={handleLogout}
                    className="px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    退出
                  </button>
                </div>
              ) : (
                <div className="space-x-1 sm:space-x-2">
                  <a
                    href="/login"
                    className="px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-indigo-600 rounded-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    登录
                  </a>
                  <a
                    href="/register"
                    className="px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    注册
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-4 sm:py-6 px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="px-4 py-6 sm:py-8 bg-white shadow rounded-lg">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">欢迎来到首页 🎉</h1>
          {isLogin ? (
            <div className="text-gray-700 space-y-3">
              <p className="text-sm sm:text-base">你已登录，手机号：{phone}</p>
              <p className="mt-2 text-sm sm:text-base">这是只有登录后才能看到的内容～</p>
              <a href="/profile" className="inline-block mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md">
                进入个人中心
              </a>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-700 mb-4 text-lg">你还未登录</p>
              <p className="text-gray-500 mb-6">登录后可体验更多功能</p>
              <a
                href="/login"
                className="px-4 py-3 sm:py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                去登录
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}