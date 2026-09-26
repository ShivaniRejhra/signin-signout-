import { useState, useEffect } from "react";
import "./EmployeeModal.css";
function EmployeeModal({ employee, onSave, onClose }) {
  const [form, setForm] = useState({
    employeeId: "",
    name: "",
    email: "",
    password: "",
    department: "",
    designation: "",
  });

  useEffect(() => {
    if (employee) setForm(employee);
  }, [employee]);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>{employee ? "Edit Employee" : "Add Employee"}</h3>

        <form onSubmit={handleSubmit}>
          <label>
            Employee ID
            <input
              type="text"
              value={form.employeeId}
              disabled={Boolean(employee)}
              onChange={(e) => handleChange("employeeId", e.target.value)}
              required
            />
          </label>

          <label>
            Full Name
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
          </label>

          <label>
            Work Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="text"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              required
            />
          </label>

          <label>
            Department
            <input
              type="text"
              value={form.department}
              onChange={(e) => handleChange("department", e.target.value)}
              required
            />
          </label>

          <label>
            Designation
            <input
              type="text"
              value={form.designation}
              onChange={(e) => handleChange("designation", e.target.value)}
              required
            />
          </label>

          <div className="modal-actions">
            <button type="button" className="secondary-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-button">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeModal;