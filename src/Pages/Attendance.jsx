import {
  CalendarDays,
} from "lucide-react";

import PageHeader from "../components/PageHeader";
import AttendanceTable from "../components/AttendanceTable";

function Attendance({
  attendance,
  activeSession,
}) {
  return (
    <>
      <PageHeader
        eyebrow="TIME & ATTENDANCE"
        title="Attendance"
        description="Review your recent work hours and attendance history."
      />

      <div className="attendance-summary">
        <div>
          <span>Days Present</span>

          <strong>20</strong>

          <small>This month</small>
        </div>

        <div>
          <span>Average Hours</span>

          <strong>8h 21m</strong>

          <small>This month</small>
        </div>

        <div>
          <span>Leave Days</span>

          <strong>2</strong>

          <small>This month</small>
        </div>
      </div>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <span className="panel-kicker">
              HISTORY
            </span>

            <h3>Attendance History</h3>
          </div>

          <button className="date-button">
            <CalendarDays size={16} />

            September 2026
          </button>
        </div>

        {activeSession && (
          <div className="active-notice">
            You are currently signed in.
          </div>
        )}

        <AttendanceTable
          attendance={attendance}
        />
      </section>
    </>
  );
}

export default Attendance;