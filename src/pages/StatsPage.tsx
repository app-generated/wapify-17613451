import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { BarChart, PieChart, TrendingUp, CheckSquare, Clock, AlertCircle, Calendar, Target } from 'lucide-react'

interface Task {
  id: string
  title: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  dueDate: string
  category: string
  createdAt: string
}

const StatsPage: React.FC = () => {
  const [tasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete project proposal',
      completed: false,
      priority: 'high',
      dueDate: '2024-01-20',
      category: 'Work',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Review team presentations',
      completed: true,
      priority: 'medium',
      dueDate: '2024-01-18',
      category: 'Work',
      createdAt: '2024-01-14'
    },
    {
      id: '3',
      title: 'Buy groceries for dinner',
      completed: false,
      priority: 'low',
      dueDate: '2024-01-19',
      category: 'Personal',
      createdAt: '2024-01-16'
    },
    {
      id: '4',
      title: 'Schedule dentist appointment',
      completed: false,
      priority: 'medium',
      dueDate: '2024-01-22',
      category: 'Health',
      createdAt: '2024-01-15'
    },
    {
      id: '5',
      title: 'Finish reading React documentation',
      completed: true,
      priority: 'high',
      dueDate: '2024-01-17',
      category: 'Learning',
      createdAt: '2024-01-12'
    },
    {
      id: '6',
      title: 'Plan weekend trip',
      completed: false,
      priority: 'low',
      dueDate: '2024-01-25',
      category: 'Personal',
      createdAt: '2024-01-16'
    },
    {
      id: '7',
      title: 'Update portfolio website',
      completed: false,
      priority: 'high',
      dueDate: '2024-01-21',
      category: 'Work',
      createdAt: '2024-01-13'
    },
    {
      id: '8',
      title: 'Call insurance company',
      completed: true,
      priority: 'medium',
      dueDate: '2024-01-16',
      category: 'Administrative',
      createdAt: '2024-01-10'
    },
    {
      id: '9',
      title: 'Organize home office',
      completed: true,
      priority: 'low',
      dueDate: '2024-01-14',
      category: 'Personal',
      createdAt: '2024-01-11'
    },
    {
      id: '10',
      title: 'Prepare monthly report',
      completed: false,
      priority: 'high',
      dueDate: '2024-01-23',
      category: 'Work',
      createdAt: '2024-01-17'
    }
  ])

  // Calculate statistics
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.completed).length
  const pendingTasks = totalTasks - completedTasks
  const completionRate = Math.round((completedTasks / totalTasks) * 100)

  // Priority breakdown
  const priorityStats = {
    high: tasks.filter(task => task.priority === 'high').length,
    medium: tasks.filter(task => task.priority === 'medium').length,
    low: tasks.filter(task => task.priority === 'low').length
  }

  // Category breakdown
  const categoryStats = tasks.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Overdue tasks
  const today = new Date().toISOString().split('T')[0]
  const overdueTasks = tasks.filter(task => !task.completed && task.dueDate < today).length

  // Tasks due this week
  const getWeekEnd = () => {
    const date = new Date()
    const day = date.getDay()
    const diff = date.getDate() - day + (day === 0 ? -6 : 1) + 6
    return new Date(date.setDate(diff)).toISOString().split('T')[0]
  }
  
  const tasksThisWeek = tasks.filter(task => 
    task.dueDate >= today && task.dueDate <= getWeekEnd()
  ).length

  // Most productive category
  const completedByCategory = tasks
    .filter(task => task.completed)
    .reduce((acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1
      return acc
    }, {} as Record<string, number>)

  const mostProductiveCategory = Object.entries(completedByCategory)
    .sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Statistics</h1>
        <p className="text-gray-600">Analyze your productivity and task completion patterns.</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTasks}</div>
            <p className="text-xs text-muted-foreground">
              {completedTasks} completed, {pendingTasks} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completionRate}%</div>
            <p className="text-xs text-muted-foreground">
              {completedTasks} out of {totalTasks} tasks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Tasks</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overdueTasks}</div>
            <p className="text-xs text-muted-foreground">
              Tasks past their due date
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasksThisWeek}</div>
            <p className="text-xs text-muted-foreground">
              Tasks due this week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Priority Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="mr-2 h-5 w-5" />
              Priority Distribution
            </CardTitle>
            <CardDescription>Breakdown of tasks by priority level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm font-medium">High Priority</span>
                </div>
                <div className="text-sm text-gray-600">
                  {priorityStats.high} tasks ({Math.round((priorityStats.high / totalTasks) * 100)}%)
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full" 
                  style={{width: `${(priorityStats.high / totalTasks) * 100}%`}}
                ></div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-sm font-medium">Medium Priority</span>
                </div>
                <div className="text-sm text-gray-600">
                  {priorityStats.medium} tasks ({Math.round((priorityStats.medium / totalTasks) * 100)}%)
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full" 
                  style={{width: `${(priorityStats.medium / totalTasks) * 100}%`}}
                ></div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm font-medium">Low Priority</span>
                </div>
                <div className="text-sm text-gray-600">
                  {priorityStats.low} tasks ({Math.round((priorityStats.low / totalTasks) * 100)}%)
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{width: `${(priorityStats.low / totalTasks) * 100}%`}}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="mr-2 h-5 w-5" />
              Category Breakdown
            </CardTitle>
            <CardDescription>Tasks organized by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(categoryStats).map(([category, count], index) => {
                const colors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-orange-500', 'bg-pink-500']
                const color = colors[index % colors.length]
                const percentage = Math.round((count / totalTasks) * 100)
                
                return (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 ${color} rounded-full mr-2`}></div>
                        <span className="text-sm font-medium">{category}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {count} tasks ({percentage}%)
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${color} h-2 rounded-full`} 
                        style={{width: `${percentage}%`}}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Most Productive Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary mb-2">{mostProductiveCategory}</div>
            <p className="text-sm text-gray-600">
              {completedByCategory[mostProductiveCategory] || 0} completed tasks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Average Daily Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary mb-2">
              {Math.round(totalTasks / 7)}
            </div>
            <p className="text-sm text-gray-600">
              Based on current task load
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Productivity Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary mb-2">
              {Math.round((completionRate + (100 - (overdueTasks / totalTasks * 100))) / 2)}/100
            </div>
            <p className="text-sm text-gray-600">
              Based on completion rate and timeliness
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default StatsPage