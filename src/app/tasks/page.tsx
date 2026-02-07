'use client'
import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import MainLayout from '../layouts/MainLayout'
import { ApiContext } from '../providers'

// 模拟任务数据
const mockTasks = [
  {
    id: 1,
    title: '帮忙取一份快递',
    budget: '50元',
    location: '北京市朝阳区',
    deadline: '2026-02-20',
    tags: ['同城', '简单']
  },
  {
    id: 2,
    title: '代买一杯奶茶',
    budget: '30元',
    location: '上海市浦东新区',
    deadline: '2026-02-18',
    tags: ['代购', '急单']
  },
  {
    id: 3,
    title: '线下协助拍摄短视频',
    budget: '200元',
    location: '广州市天河区',
    deadline: '2026-03-01',
    tags: ['拍摄', '长期']
  },
]

export default function TasksPage() {
  const api = useContext(ApiContext)
  const [tasks, setTasks] = useState(mockTasks) // 开发阶段用模拟数据

  // 真实环境下请求API
  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     const res = await api.get('/tasks')
  //     setTasks(res.data)
  //   }
  //   fetchTasks()
  // }, [api])

  return (
    <MainLayout>
      <div className="py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">浏览任务</h1>
          <div className="bg-gray-100 p-2 rounded-lg flex items-center">
            <input 
              type="text" 
              placeholder="搜索任务..." 
              className="bg-transparent outline-none px-2"
            />
          </div>
        </div>

        {/* 任务网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <Link href={`/tasks/${task.id}`} key={task.id}>
              <div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-lg font-semibold">{task.title}</h2>
                  <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs">{task.budget}</span>
                </div>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <span>{task.location}</span>
                  <span className="mx-2">•</span>
                  <span>截止: {task.deadline}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {task.tags.map((tag, idx) => (
                    <span key={idx} className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}