import EmployeeList from '@/components/EmployeeList'

export default function EmployeesPage() {
  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
          <p className="text-gray-600">Manage your employee records</p>
        </div>
        <a
          href="/employees/add"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Employee
        </a>
      </div>
      <EmployeeList />
    </div>
  )
}