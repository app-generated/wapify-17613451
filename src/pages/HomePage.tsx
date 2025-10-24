import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { AlertCircle, CheckSquare, Clock, Plus, Settings, TrendingUp } from 'lucide-react'

interface Task {
  id: string
  title: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  dueDate: string
  category: string
}

const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete project proposal',
      completed: false,
      priority: 'high',
      dueDate: '2024-01-20',
      category: 'Work'
    },
    {
      id: '2',
      title: 'Review team presentations',
      completed: true,
      priority: 'medium',
      dueDate: '2024-01-18',
      category: 'Work'
    },
    {
      id: '3',
      title: 'Buy groceries for dinner',
      completed: false,
      priority: 'low',
      dueDate: '2024-01-19',
      category: 'Personal'
    },
    {
      id: '4',
      title: 'Schedule dentist appointment',
      completed: false,
      priority: 'medium',
      dueDate: '2024-01-22',
      category: 'Health'
    },
    {
      id: '5',
      title: 'Finish reading React documentation',
      completed: true,
      priority: 'high',
      dueDate: '2024-01-17',
      category: 'Learning'
    },
    {
      id: '6',
      title: 'Plan weekend trip',
      completed: false,
      priority: 'low',
      dueDate: '2024-01-25',
      category: 'Personal'
    },
    {
      id: '7',
      title: 'Update portfolio website',
      completed: false,
      priority: 'high',
      dueDate: '2024-01-21',
      category: 'Work'
    },
    {
      id: '8',
      title: 'Call insurance company',
      completed: true,
      priority: 'medium',
      dueDate: '2024-01-16',
      category: 'Administrative'
    }
  ])

  const completedTasks = tasks.filter(task => task.completed).length
  const pendingTasks = tasks.filter(task => !task.completed).length
  const highPriorityTasks = tasks.filter(task => task.priority === 'high' && !task.completed).length
  const todayTasks = tasks.filter(task => {
    const today = new Date().toISOString().split('T')[0]
    return task.dueDate === today && !task.completed
  }).length

  const recentTasks = tasks.slice(0, 5)

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your tasks today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasks.length}</div>
            <p className="text-xs text-muted-foreground">
              {completedTasks} completed, {pendingTasks} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due Today</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayTasks}</div>
            <p className="text-xs text-muted-foreground">
              Tasks scheduled for today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{highPriorityTasks}</div>
            <p className="text-xs text-muted-foreground">
              Urgent tasks remaining
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round((completedTasks / tasks.length) * 100)}%</div>
            <p className="text-xs text-muted-foreground">
              Tasks completed this week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
            <CardDescription>Your latest tasks and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        task.completed
                          ? 'bg-primary border-primary text-white'
                          : 'border-gray-300 hover:border-primary'
                      }`}
                    >
                      {task.completed && <CheckSquare className="w-3 h-3" />}
                    </button>
                    <div>
                      <p className={`font-medium ${
                        task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                      }`}>
                        {task.title}
                      </p>
                      <p className="text-sm text-gray-500">{task.category} • Due: {task.dueDate}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    task.priority === 'high' ? 'bg-red-100 text-red-800' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get things done faster</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Link to="/tasks">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Task
                </Button>
              </Link>
              <Link to="/tasks">
                <Button className="w-full justify-start" variant="outline">
                  <CheckSquare className="mr-2 h-4 w-4" />
                  View All Tasks
                </Button>
              </Link>
              <Link to="/stats">
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  View Statistics
                </Button>
              </Link>
              <Link to="/settings">
                <Button className="w-full justify-start" variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Manage Settings
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default HomePage