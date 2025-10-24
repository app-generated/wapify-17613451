import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CheckSquare, Home, BarChart, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const Header: React.FC = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/tasks', label: 'Tasks', icon: CheckSquare },
    { path: '/stats', label: 'Statistics', icon: BarChart },
    { path: '/settings', label: 'Settings', icon: Settings },
  ]

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <CheckSquare className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-xl font-bold text-gray-900">TaskMaster</h1>
          </div>
          <nav className="flex space-x-8">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={cn(
                  'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  location.pathname === path
                    ? 'text-primary bg-primary/10'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                <Icon className="h-4 w-4 mr-2" />
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header