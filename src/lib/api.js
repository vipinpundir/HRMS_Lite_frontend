import axios from 'axios'
import { toast } from 'react-toastify'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ' http://127.0.0.1:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Employee API calls
export const employeeApi = {
  getAll: () => api.get('/employees/'),
  getById: (id) => api.get(`/employees/${id}/`),
  create: (data) => api.post('/employees/', data),
  update: (id, data) => api.put(`/employees/${id}/`, data),
  delete: (id) => api.delete(`/employees/${id}/`),
}

// Attendance API calls
export const attendanceApi = {
  getAll: () => api.get('/attendance/'),
  getByEmployee: (employeeId) => api.get(`/attendance/employee/${employeeId}/`),
  create: (data) => api.post('/attendance/', data),
}

// Error handling interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const message = error.response.data.detail || error.response.data.message || 'An error occurred'
      toast.error(message)
    } else {
      toast.error('Network error. Please try again.')
    }
    return Promise.reject(error)
  }
)