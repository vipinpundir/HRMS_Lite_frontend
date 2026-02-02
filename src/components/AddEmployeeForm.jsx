'use client'

import { useState } from 'react'
import { employeeApi } from '@/lib/api'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export default function AddEmployeeForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    employee_id: '',
    full_name: '',
    email: '',
    department: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await employeeApi.create(formData)
      toast.success('Employee added successfully')
      router.push('/employees')
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

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Add New Employee</h3>
          <form onSubmit={handleSubmit} className="mt-5 space-y-6">
            <div>
              <label htmlFor="employee_id" className="block text-sm font-medium text-gray-700">
                Employee ID *
              </label>
              <input
                type="text"
                name="employee_id"
                id="employee_id"
                required
                value={formData.employee_id}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="EMP001"
              />
            </div>

            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                Full Name *
              </label>
              <input
                type="text"
                name="full_name"
                id="full_name"
                required
                value={formData.full_name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                Department *
              </label>
              <select
                name="department"
                id="department"
                required
                value={formData.department}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select Department</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Adding...' : 'Add Employee'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}