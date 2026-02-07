'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify'; // 新增

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // 1. 检查token，没有就强制跳登录
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('请先登录');
      router.push('/login');
      return;
    }

    // 2. 解析用户信息
    const phone = token.replace('mock_token_', '');
    setUser({ phone });

    // 3. 监听token变化（比如退出登录后，自动跳走）
    const handleStorageChange = () => {
      if (!localStorage.getItem('token')) {
        router.push('/login');
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('已退出登录');
    router.push('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">个人中心</h1>

          <div className="space-y-4">
            <div className="border-b pb-4">
              <p className="text-sm text-gray-500">当前登录手机号</p>
              <p className="text-lg font-medium">{user.phone}</p>
            </div>

            <div className="pt-4">
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition-colors"
              >
                退出登录
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}