import AttendanceManager from '@/components/AttendanceManager'

export default function AttendancePage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
        <p className="text-gray-600">Manage employee attendance records</p>
      </div>
      <AttendanceManager />
    </div>
  )
}