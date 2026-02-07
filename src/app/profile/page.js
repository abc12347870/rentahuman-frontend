'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

// 【关键修复】删除 metadata 导出

export default function Profile() {
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 校验登录状态
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.warning('请先登录！');
      router.push('/login');
      return;
    }
    // 解析手机号
    const mockPhone = token.replace('mock_token_', '');
    setPhone(mockPhone);
    // 模拟获取用户名
    setUsername(`用户${mockPhone.slice(-4)}`);
  }, [router]);

  // 模拟保存资料
  const handleSave = (e) => {
    e.preventDefault();
    if (!username) {
      toast.error('用户名不能为空！');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      toast.success('资料保存成功！');
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 bg-indigo-600 text-white">
          <h2 className="text-lg font-medium">个人资料</h2>
        </div>

        <div className="px-4 py-5 sm:p-6">
          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                手机号
              </label>
              <div className="mt-1">
                <input
                  type="tel"
                  value={phone}
                  readOnly
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">手机号不可修改</p>
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                用户名
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="请输入用户名"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.push('/')}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                返回首页
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? '保存中...' : '保存修改'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}