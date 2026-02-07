'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
// 引入图标 (react-icons)
import { 
  FiHome, FiCompass, FiUser, FiLogIn, FiMenu, FiX, FiDollarSign
} from 'react-icons/fi'
import { useStore } from '../providers'

// 移动端导航项
const mobileNavItems = [
  { name: '首页', href: '/', icon: <FiHome size={24} /> },
  { name: '任务', href: '/tasks', icon: <FiCompass size={24} /> },
  { name: '我的', href: '/profile', icon: <FiUser size={24} /> },
]

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isLogin } = useStore()

  // 监听屏幕尺寸，判断是否为移动端
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="flex flex-col h-full">
      {/* 1. PC端导航栏 (>= 768px 显示) */}
      {!isMobile && (
        <header className="bg-white shadow-sm py-4 px-8">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-2xl font-bold text-black">租个真人</Link>
              <Link href="/tasks" className="hidden md:inline-block hover:text-gray-600">浏览任务</Link>
              <Link href="/publish" className="hidden md:inline-block hover:text-gray-600">发布任务</Link>
            </div>
            <div className="flex items-center space-x-4">
              {isLogin ? (
                <Link href="/profile" className="bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200">
                  个人中心
                </Link>
              ) : (
                <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">
                  登录 / 注册
                </Link>
              )}
            </div>
          </div>
        </header>
      )}

      {/* 2. 移动端顶部栏 (< 768px 显示) */}
      {isMobile && (
        <header className="bg-white shadow-sm py-3 px-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">租个真人</Link>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          
          {/* 移动端侧边菜单 */}
          {menuOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col">
              <div className="bg-white w-64 h-full p-4">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-lg font-bold">菜单</h2>
                  <button onClick={() => setMenuOpen(false)}><FiX size={20} /></button>
                </div>
                {!isLogin ? (
                  <Link 
                    href="/login" 
                    className="block bg-blue-600 text-white text-center py-3 rounded-lg mb-4"
                    onClick={() => setMenuOpen(false)}
                  >
                    登录 / 注册
                  </Link>
                ) : (
                  <div className="mb-4">
                    <p className="text-center text-gray-500 mb-2">已登录</p>
                    <button className="block w-full text-center py-2 text-red-500">退出登录</button>
                  </div>
                )}
                <div className="space-y-2">
                  <Link 
                    href="/publish" 
                    className="flex items-center p-2 rounded-lg hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    <FiDollarSign size={20} className="mr-2" /> 发布任务
                  </Link>
                </div>
              </div>
            </div>
          )}
        </header>
      )}

      {/* 3. 页面主内容区 */}
      <div className="flex-1 container mx-auto px-4 py-6">
        {children}
      </div>

      {/* 4. 移动端底部导航 (< 768px 显示) */}
      {isMobile && (
        <footer className="bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] py-3 px-6 safe-area-bottom">
          <div className="flex justify-between items-center">
            {mobileNavItems.map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center ${
                  pathname === item.href ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                {item.icon}
                <span className="text-xs mt-1">{item.name}</span>
              </Link>
            ))}
          </div>
        </footer>
      )}
    </div>
  )
}