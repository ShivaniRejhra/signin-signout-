import { useEffect, useState } from "react";

import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Attendance from "./Pages/Attendance";
import Profile from "./Pages/Profile";
import Settings from "./Pages/Settings";

import AdminDashboard from "./Pages/Admin/AdminDashboard";
import Employees from "./Pages/Admin/Employees";
import AdminAttendance from "./Pages/Admin/AdminAttendance";
import AssignTasks from "./Pages/Admin/AssignTasks";
import Sidebar from "./components/sidebar";
import Topbar from "./components/Topbar";
import Notifications from "./Pages/Admin/Notifications";
import { getEmployeeAttendance, saveEmployeeAttendance } from "./Data/attendance";

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });

  const [currentPage, setCurrentPage] = useState("dashboard");

  const [attendance, setAttendance] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    if (currentUser?.role === "employee") {
      const data = getEmployeeAttendance(currentUser.employeeId);
      setAttendance(data.records);
      setActiveSession(data.activeSession);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser?.role === "employee") {
      saveEmployeeAttendance(currentUser.employeeId, {
        records: attendance,
        activeSession,
      });
    }
  }, [attendance, activeSession, currentUser]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(Date.now()), 30000);
    return () => clearInterval(timer);
  }, []);

  function login(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    setCurrentUser(user);
    setCurrentPage(user.role === "admin" ? "admin-dashboard" : "dashboard");
  }

  function logout() {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setCurrentPage("dashboard");
  }

  function signIn() {
    if (activeSession) return;

    const now = new Date();
    const session = {
      date: formatDate(now),
      signIn: formatTime(now),
      timestamp: now.getTime(),
    };

    setActiveSession(session);

    const newRecord = {
      date: formatDate(now),
      signIn: formatTime(now),
      signOut: "—",
      hours: "In progress",
      status: "Present",
    };

    setAttendance((previous) => [
      newRecord,
      ...previous.filter((item) => item.date !== formatDate(now)),
    ]);
  }

  function signOut() {
    if (!activeSession) return;

    const now = new Date();
    const hours = formatDuration(now.getTime() - activeSession.timestamp);

    setAttendance((previous) =>
      previous.map((item) =>
        item.date === activeSession.date
          ? { ...item, signOut: formatTime(now), hours }
          : item
      )
    );

    setActiveSession(null);
  }

  if (!currentUser) {
    return <Login onLogin={login} />;
  }

  const isAdmin = currentUser.role === "admin";

  return (
    <div className="app">
      <Sidebar
        role={currentUser.role}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onLogout={logout}
      />

      <div className="main">
        <Topbar user={currentUser} />

        <main className="content">
          {isAdmin ? (
            <>
              {currentPage === "admin-dashboard" && <AdminDashboard />}
              {currentPage === "employees" && <Employees />}
               {currentPage === "tasks" && <AssignTasks />}
               {currentPage === "notifications" && <Notifications />}
              {currentPage === "admin-attendance" && <AdminAttendance />}
            </>
          ) : (
            <>
              {currentPage === "dashboard" && (
                <Dashboard
                  user={currentUser}
                  activeSession={activeSession}
                  currentTime={currentTime}
                  attendance={attendance}
                  onSignIn={signIn}
                  onSignOut={signOut}
                  setCurrentPage={setCurrentPage}
                />
              )}

              {currentPage === "attendance" && (
                <Attendance attendance={attendance} activeSession={activeSession} />
              )}

              {currentPage === "profile" && <Profile user={currentUser} />}
              {currentPage === "settings" && <Settings />}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

function formatTime(date) {
  return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

function formatDate(date) {
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function formatDuration(milliseconds) {
  const minutes = Math.floor(milliseconds / 60000);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
}

export default App;