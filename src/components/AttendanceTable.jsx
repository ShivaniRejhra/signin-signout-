function AttendanceTable({ attendance }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Sign In</th>
            <th>Sign Out</th>
            <th>Working Hours</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {attendance.map((record, index) => (
            <tr key={index}>
              <td>
                <strong>{record.date}</strong>
              </td>

              <td>{record.signIn}</td>

              <td>{record.signOut}</td>

              <td>{record.hours}</td>

              <td>
                <span
                  className={`badge ${record.status.toLowerCase()}`}
                >
                  {record.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceTable;