import AddEmployeeForm from '@/components/AddEmployeeForm'

export default function AddEmployeePage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Add Employee</h1>
        <p className="text-gray-600">Add a new employee to the system</p>
      </div>
      <AddEmployeeForm />
    </div>
  )
}