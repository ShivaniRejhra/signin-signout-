import { useState } from "react";
import { ClipboardList, Trash2 } from "lucide-react";

import PageHeader from "../../components/PageHeader";
import { getEmployees } from "../../Data/employees";
import { addTask, getAllTasksList, deleteTask } from "../../Data/tasks";
import "./AssignTasks.css";
function AssignTasks() {
  const employees = getEmployees();

  const [selectedEmployee, setSelectedEmployee] = useState(
    employees[0]?.employeeId || ""
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState(getAllTasksList());

  function handleAssign(e) {
    e.preventDefault();

    if (!selectedEmployee || !title) return;

    const updated = addTask({
      employeeId: selectedEmployee,
      title,
      description,
    });

    setTasks(updated);
    setTitle("");
    setDescription("");
  }

  function handleDelete(taskId) {
    setTasks(deleteTask(taskId));
  }

  function employeeName(employeeId) {
    return employees.find((e) => e.employeeId === employeeId)?.name || employeeId;
  }

  return (
    <>
      <PageHeader
        eyebrow="ADMIN"
        title="Assign Tasks"
        description="Give your team their tasks for the day."
      />

      <section className="panel">
        <div className="panel-heading">
          <div>
            <span className="panel-kicker">NEW TASK</span>
            <h3>Assign a Task</h3>
          </div>
        </div>

        <form onSubmit={handleAssign} className="task-form">
          <label>
            Employee
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
            >
              {employees.length === 0 && <option value="">No employees yet</option>}
              {employees.map((emp) => (
                <option key={emp.employeeId} value={emp.employeeId}>
                  {emp.name} ({emp.employeeId})
                </option>
              ))}
            </select>
          </label>

          <label>
            Task Title
            <input
              type="text"
              placeholder="e.g. Finish landing page copy"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          <label>
            Description (optional)
            <textarea
              placeholder="Any extra details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </label>

          <button type="submit" className="primary-button" disabled={!employees.length}>
            <ClipboardList size={18} />
            Assign Task
          </button>
        </form>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <span className="panel-kicker">ALL TASKS</span>
            <h3>Assigned Tasks</h3>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Task</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {tasks.length === 0 && (
                <tr>
                  <td colSpan={5}>No tasks assigned yet.</td>
                </tr>
              )}

              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>{employeeName(task.employeeId)}</td>
                  <td>
                    <strong>{task.title}</strong>
                    {task.description && <div className="muted">{task.description}</div>}
                  </td>
                  <td>{task.date}</td>
                  <td>
                    <span className={`badge ${task.status === "Completed" ? "present" : "leave"}`}>
                      {task.status}
                    </span>
                  </td>
                  <td>
                    <button className="icon-button danger" onClick={() => handleDelete(task.id)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default AssignTasks;