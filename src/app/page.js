import DashboardStats from '@/components/DashboardStats'

export default function Home() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to HRMS Lite</p>
      </div>
      <DashboardStats />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <a href="/employees/add" className="block w-full bg-blue-600 text-white py-2 px-4 rounded text-center hover:bg-blue-700">
              Add New Employee
            </a>
            <a href="/attendance" className="block w-full bg-green-600 text-white py-2 px-4 rounded text-center hover:bg-green-700">
              Manage Attendance
            </a>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <p className="text-gray-600">No recent activity to display.</p>
        </div>
      </div>
    </div>
  )
}