'use client';
import Link from 'next/link';
import { toast } from 'react-toastify';

// 【关键修复】删除 metadata 导出

export default function NotFound() {
  // 提示用户
  toast.info('你访问的页面不存在');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-8">
          <span className="text-2xl font-bold text-red-600">404</span>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">页面未找到</h2>
        <p className="text-lg text-gray-500 mb-8">
          抱歉，你访问的页面不存在或已被删除，请检查网址是否正确
        </p>
        <div className="flex justify-center">
          <Link
            href="/"
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}