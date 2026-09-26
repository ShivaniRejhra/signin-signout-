import PageHeader from "../../components/PageHeader";
import { getEmployees } from "../../Data/employees";
import { getAllEmployeesAttendance } from "../../Data/attendance";

function AdminAttendance() {
  const employees = getEmployees();
  const attendanceData = getAllEmployeesAttendance();

  const rows = employees.flatMap((emp) => {
    const records = attendanceData[emp.employeeId]?.records || [];
    return records.map((record) => ({ ...record, employee: emp }));
  });

  return (
    <>
      <PageHeader
        eyebrow="ADMIN"
        title="Attendance"
        description="Attendance history across all employees."
      />

      <section className="panel">
        <div className="panel-heading">
          <div>
            <span className="panel-kicker">HISTORY</span>
            <h3>All Attendance Records</h3>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Date</th>
                <th>Sign In</th>
                <th>Sign Out</th>
                <th>Working Hours</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {rows.length === 0 && (
                <tr><td colSpan={6}>No attendance records yet.</td></tr>
              )}

              {rows.map((record, index) => (
                <tr key={index}>
                  <td>
                    <strong>{record.employee.name}</strong>
                    <div className="muted">{record.employee.employeeId}</div>
                  </td>
                  <td>{record.date}</td>
                  <td>{record.signIn}</td>
                  <td>{record.signOut}</td>
                  <td>{record.hours}</td>
                  <td>
                    <span className={`badge ${record.status.toLowerCase()}`}>
                      {record.status}
                    </span>
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

export default AdminAttendance;