'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

// 【关键修复】删除 metadata 导出

// 模拟任务数据
const mockTasks = [
  { id: 1, title: '完成个人资料完善', status: 'pending', time: '2026-02-01' },
  { id: 2, title: '提交实名认证', status: 'completed', time: '2026-01-28' },
  { id: 3, title: '完成首单任务', status: 'pending', time: '2026-02-10' },
];

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 校验登录状态 + 获取任务列表
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.warning('请先登录！');
      router.push('/login');
      return;
    }

    // 模拟加载任务列表
    setTimeout(() => {
      setTasks(mockTasks);
      setLoading(false);
    }, 800);
  }, [router]);

  // 模拟更新任务状态
  const handleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: 'completed' } : task
      )
    );
    toast.success('任务已完成！');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载任务中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-indigo-600 text-white">
            <h2 className="text-lg font-medium">我的任务列表</h2>
          </div>

          <div className="px-4 py-5 sm:p-6">
            {tasks.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">暂无任务，快去领取吧～</p>
              </div>
            ) : (
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="border rounded-lg p-4 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900">{task.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">创建时间：{task.time}</p>
                      <span
                        className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
                          task.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {task.status === 'completed' ? '已完成' : '待完成'}
                      </span>
                    </div>
                    {task.status === 'pending' && (
                      <button
                        onClick={() => handleComplete(task.id)}
                        className="px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        标记完成
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6">
              <button
                onClick={() => router.push('/')}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                返回首页
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}