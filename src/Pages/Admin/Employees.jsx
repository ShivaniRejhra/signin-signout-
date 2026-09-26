import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

import PageHeader from "../../components/PageHeader";
import EmployeeModal from "../../components/EmployeeModal";

import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../../data/employees";

function Employees() {
  const [employees, setEmployees] = useState(getEmployees());
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  function openAddModal() {
    setEditingEmployee(null);
    setShowModal(true);
  }

  function openEditModal(employee) {
    setEditingEmployee(employee);
    setShowModal(true);
  }

  function handleSave(form) {
    let updated;

    if (editingEmployee) {
      updated = updateEmployee(form.employeeId, form);
    } else {
      if (employees.some((emp) => emp.employeeId === form.employeeId)) {
        alert("An employee with this ID already exists.");
        return;
      }
      updated = addEmployee(form);
    }

    setEmployees(updated);
    setShowModal(false);
  }

  function handleDelete(employeeId) {
    if (!confirm(`Remove employee ${employeeId}?`)) return;
    setEmployees(deleteEmployee(employeeId));
  }

  return (
    <>
      <PageHeader
        eyebrow="ADMIN"
        title="Employees"
        description="Add, edit or remove employee accounts."
      />

      <section className="panel">
        <div className="panel-heading">
          <div>
            <span className="panel-kicker">TEAM</span>
            <h3>All Employees</h3>
          </div>

          <button className="primary-button" onClick={openAddModal}>
            <Plus size={18} />
            Add Employee
          </button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((emp) => (
                <tr key={emp.employeeId}>
                  <td><strong>{emp.employeeId}</strong></td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.department}</td>
                  <td>{emp.designation}</td>
                  <td>
                    <button className="icon-button" onClick={() => openEditModal(emp)}>
                      <Pencil size={16} />
                    </button>
                    <button className="icon-button danger" onClick={() => handleDelete(emp.employeeId)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {showModal && (
        <EmployeeModal
          employee={editingEmployee}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default Employees;