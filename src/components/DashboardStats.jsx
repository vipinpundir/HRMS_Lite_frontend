'use client'

import { useEffect, useState } from 'react'
import { employeeApi, attendanceApi } from '@/lib/api'

export default function DashboardStats() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    presentToday: 0,
    absentToday: 0,
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [employeesRes, attendanceRes] = await Promise.all([
        employeeApi.getAll(),
        attendanceApi.getAll(),
      ])

      const today = new Date().toISOString().split('T')[0]
      const todayAttendance = attendanceRes.data.filter((record) => 
        record.date === today
      )

      setStats({
        totalEmployees: employeesRes.data.length,
        presentToday: todayAttendance.filter((r) => r.status === 'present').length,
        absentToday: todayAttendance.filter((r) => r.status === 'absent').length,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center">
          <div className="bg-blue-100 p-3 rounded-lg">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.67 3.323l.71.71-3.82 3.82-3.09-3.09.71-.71 2.38 2.38 3.12-3.11z" />
            </svg>
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500">Total Employees</p>
            <p className="text-2xl font-semibold">{stats.totalEmployees}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center">
          <div className="bg-green-100 p-3 rounded-lg">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500">Present Today</p>
            <p className="text-2xl font-semibold">{stats.presentToday}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center">
          <div className="bg-red-100 p-3 rounded-lg">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500">Absent Today</p>
            <p className="text-2xl font-semibold">{stats.absentToday}</p>
          </div>
        </div>
      </div>
    </div>
  )
}