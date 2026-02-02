'use client'

import { useEffect, useState } from 'react'
import { attendanceApi, employeeApi } from '@/lib/api'
import { toast } from 'react-toastify'

export default function AttendanceManager() {
  const [employees, setEmployees] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [status, setStatus] = useState('present')
  const [loading, setLoading] = useState(false)
  const [attendanceRecords, setAttendanceRecords] = useState([])
  const [loadingAttendance, setLoadingAttendance] = useState(false)

  useEffect(() => {
    fetchEmployees()
    fetchAttendance()
  }, [])

  const fetchEmployees = async () => {
    try {
      const response = await employeeApi.getAll()
      setEmployees(response.data)
    } catch (error) {
      toast.error('Failed to fetch employees')
    }
  }

  const fetchAttendance = async () => {
    try {
      setLoadingAttendance(true)
      const response = await attendanceApi.getAll()
      setAttendanceRecords(response.data)
    } catch (error) {
      toast.error('Failed to fetch attendance records')
    } finally {
      setLoadingAttendance(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedEmployee) {
      toast.error('Please select an employee')
      return
    }

    setLoading(true)
    try {
      await attendanceApi.create({
        employee: selectedEmployee,
        date,
        status,
      })
      toast.success('Attendance marked successfully')
      setSelectedEmployee('')
      setDate(new Date().toISOString().split('T')[0])
      setStatus('present')
      fetchAttendance()
    } catch (error) {
      if (error.response?.data) {
        Object.values(error.response.data).forEach((messages) => {
          if (Array.isArray(messages)) {
            messages.forEach((message) => toast.error(message))
          }
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="space-y-8">
      <div className="bg-white shadow sm:rounded-lg p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Mark Attendance</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="employee" className="block text-sm font-medium text-gray-700">
                Employee *
              </label>
              <select
                id="employee"
                name="employee"
                required
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select Employee</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.employee_id} - {employee.full_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date *
              </label>
              <input
                type="date"
                id="date"
                name="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status *
              </label>
              <select
                id="status"
                name="status"
                required
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="present">Present</option>
                <option value="absent">Absent</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              {loading ? 'Marking...' : 'Mark Attendance'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Attendance Records</h3>
          
          {loadingAttendance ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : attendanceRecords.length === 0 ? (
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No attendance records</h3>
              <p className="mt-1 text-sm text-gray-500">Mark attendance to see records here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {attendanceRecords.map((record) => (
                    <tr key={record.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.employee_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(record.date)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          record.status === 'present' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}