import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  UserCircle,
  BarChart3,
  LogOut,
  ArrowRight,
  CheckSquare,
  Square,
} from "lucide-react";

import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import AttendanceTable from "../components/AttendanceTable";
import { getTodayTasksForEmployee, updateTaskStatus } from "../Data/tasks";

function Dashboard({
  user,
  activeSession,
  currentTime,
  attendance,
  onSignIn,
  onSignOut,
  setCurrentPage,
}) {
  const workingTime = activeSession
    ? formatDuration(
        currentTime - activeSession.timestamp
      )
    : "00h 00m";

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(getTodayTasksForEmployee(user.employeeId));
  }, [user.employeeId]);

  function toggleTask(taskId, currentStatus) {
    const newStatus =
      currentStatus === "Completed" ? "Pending" : "Completed";
    setTasks(updateTaskStatus(taskId, newStatus));
  }

  return (
    <>
      <PageHeader
        eyebrow={formatDate(new Date())}
        title={`Good morning, ${
          user.name.split(" ")[0]
        } 👋`}
        description="Here's your work overview for today."
      />

      <div className="stats-grid">
        <StatCard
          title="Today's Status"
          value={
            activeSession
              ? "Active"
              : "Not Started"
          }
          icon={<CheckCircle2 size={20} />}
        />

        <StatCard
          title="Sign In Time"
          value={
            activeSession
              ? activeSession.signIn
              : "—"
          }
          icon={<Clock3 size={20} />}
        />

        <StatCard
          title="Working Time"
          value={workingTime}
          icon={<BarChart3 size={20} />}
        />

        <StatCard
          title="Employee ID"
          value={user.employeeId}
          icon={<UserCircle size={20} />}
        />
      </div>

      <div className="dashboard-grid">
        <section className="panel">
          <div className="panel-heading">
            <div>
              <span className="panel-kicker">
                TODAY
              </span>

              <h3>Attendance</h3>
            </div>
          </div>

          <div className="attendance-box">
            <div>
              <span className="muted">
                CURRENT STATUS
              </span>

              <div className="current-status">
                <span
                  className={`status-dot ${
                    activeSession ? "online" : ""
                  }`}
                />

                {activeSession
                  ? "You are signed in"
                  : "You are signed out"}
              </div>
            </div>

            <div className="sign-time">
              <strong>
                {activeSession
                  ? activeSession.signIn
                  : "—"}
              </strong>

              <small>Sign in</small>
            </div>
          </div>

          <div className="progress-section">
            <div className="progress-header">
              <span>Today's progress</span>

              <strong>{workingTime}</strong>
            </div>

            <div className="progress-bar">
              <div
                style={{
                  width: activeSession
                    ? "55%"
                    : "0%",
                }}
              />
            </div>

            <small>
              Standard workday · 8 hours
            </small>
          </div>

          <button
            className={`primary-button ${
              activeSession ? "signout-button" : ""
            }`}
            onClick={
              activeSession
                ? onSignOut
                : onSignIn
            }
          >
            {activeSession ? (
              <>
                <LogOut size={18} />
                Sign Out
              </>
            ) : (
              <>
                <CheckCircle2 size={18} />
                Sign In
              </>
            )}
          </button>
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <span className="panel-kicker">
                THIS WEEK
              </span>

              <h3>Work Summary</h3>
            </div>
          </div>

          <div className="summary-list">
            <div>
              <span>Monday</span>
              <strong>8h 20m</strong>
            </div>

            <div>
              <span>Tuesday</span>
              <strong>8h 32m</strong>
            </div>

            <div>
              <span>Wednesday</span>
              <strong>8h 28m</strong>
            </div>

            <div>
              <span>Thursday</span>
              <strong>
                {activeSession
                  ? "In progress"
                  : "—"}
              </strong>
            </div>

            <div>
              <span>Friday</span>
              <strong>Upcoming</strong>
            </div>
          </div>

          <div className="week-total">
            <span>Total this week</span>

            <strong>25h 20m</strong>
          </div>
        </section>
      </div>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <span className="panel-kicker">TODAY</span>
            <h3>Your Tasks</h3>
          </div>
        </div>

        {tasks.length === 0 && (
          <p className="muted">No tasks assigned for today.</p>
        )}

        <div className="task-list">
          {tasks.map((task) => (
            <div key={task.id} className="task-item">
              <button onClick={() => toggleTask(task.id, task.status)}>
                {task.status === "Completed" ? (
                  <CheckSquare size={18} />
                ) : (
                  <Square size={18} />
                )}
              </button>

              <div>
                <strong
                  className={
                    task.status === "Completed" ? "task-done" : ""
                  }
                >
                  {task.title}
                </strong>
                {task.description && <p>{task.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="panel recent-panel">
        <div className="panel-heading">
          <div>
            <span className="panel-kicker">
              RECENT
            </span>

            <h3>Attendance History</h3>
          </div>

          <button
            className="link-button"
            onClick={() =>
              setCurrentPage("attendance")
            }
          >
            See all

            <ArrowRight size={15} />
          </button>
        </div>

        <AttendanceTable
          attendance={attendance.slice(0, 4)}
        />
      </section>
    </>
  );
}

function formatDate(date) {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDuration(milliseconds) {
  const minutes = Math.floor(
    milliseconds / 60000
  );

  const hours = Math.floor(minutes / 60);

  const remainingMinutes = minutes % 60;

  return `${hours}h ${remainingMinutes}m`;
}

export default Dashboard;