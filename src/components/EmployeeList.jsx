'use client'

import { useEffect, useState } from 'react'
import { employeeApi } from '@/lib/api'
import { toast } from 'react-toastify'

export default function EmployeeList() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      setLoading(true)
      const response = await employeeApi.getAll()
      setEmployees(response.data)
    } catch (error) {
      toast.error('Failed to fetch employees')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this employee?')) return

    try {
      await employeeApi.delete(id)
      toast.success('Employee deleted successfully')
      fetchEmployees()
    } catch (error) {
      toast.error('Failed to delete employee')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (employees.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No employees</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating a new employee.</p>
        <div className="mt-6">
          <a href="/employees/add" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            Add Employee
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.employee_id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.full_name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.department}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => handleDelete(employee.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}