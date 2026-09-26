import { Users, CheckCircle2, Clock3 } from "lucide-react";

import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";

import { getEmployees } from "../../Data/employees";
import { getAllEmployeesAttendance } from "../../Data/attendance";

function AdminDashboard() {
  const employees = getEmployees();
  const attendanceData = getAllEmployeesAttendance();

  const activeCount = employees.filter(
    (emp) => attendanceData[emp.employeeId]?.activeSession
  ).length;

  return (
    <>
      <PageHeader
        eyebrow="ADMIN"
        title="Overview"
        description="A snapshot of your team's attendance today."
      />

      <div className="stats-grid">
        <StatCard title="Total Employees" value={employees.length} icon={<Users size={20} />} />
        <StatCard title="Currently Signed In" value={activeCount} icon={<CheckCircle2 size={20} />} />
        <StatCard title="Signed Out" value={employees.length - activeCount} icon={<Clock3 size={20} />} />
      </div>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <span className="panel-kicker">TEAM</span>
            <h3>Employee Status</h3>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((emp) => {
                const isActive = Boolean(attendanceData[emp.employeeId]?.activeSession);
                return (
                  <tr key={emp.employeeId}>
                    <td><strong>{emp.employeeId}</strong></td>
                    <td>{emp.name}</td>
                    <td>{emp.department}</td>
                    <td>
                      <span className={`badge ${isActive ? "present" : "leave"}`}>
                        {isActive ? "Signed In" : "Signed Out"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default AdminDashboard;