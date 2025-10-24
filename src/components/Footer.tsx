import React from 'react'
import { CheckSquare } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CheckSquare className="h-6 w-6 text-primary mr-2" />
            <span className="text-sm font-medium text-gray-900">TaskMaster</span>
          </div>
          <div className="text-sm text-gray-500">
            © 2024 TaskMaster. Made with ❤️ for productivity.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer