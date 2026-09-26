import {
  LayoutDashboard,
  Clock3,
  UserCircle,
  Settings,
  LogOut,
  Users,
  BarChart3,
  ClipboardList,
  Bell,
} from "lucide-react";

function Sidebar({
  role,
  currentPage,
  setCurrentPage,
  onLogout,
}) {
  const employeeMenu = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "attendance",
      label: "Attendance",
      icon: Clock3,
    },
    {
      id: "profile",
      label: "My Profile",
      icon: UserCircle,
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
    },
  ];

 const adminMenu = [
  {
    id: "admin-dashboard",
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    id: "employees",
    label: "Employees",
    icon: Users,
  },
  {
    id: "tasks",
    label: "Assign Tasks",
    icon: ClipboardList,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    id: "admin-attendance",
    label: "Attendance",
    icon: BarChart3,
  },
];
  

  const menuItems = role === "admin" ? adminMenu : employeeMenu;

  return (
    <aside className="sidebar">
      <div className="logo-section">
        <div className="logo">S</div>

        <span>STARTUP</span>
      </div>

      <div className="menu-title">
        {role === "admin" ? "ADMIN PANEL" : "WORKSPACE"}
      </div>

      <nav>
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              className={`nav-item ${
                currentPage === item.id ? "active" : ""
              }`}
              onClick={() => setCurrentPage(item.id)}
            >
              <Icon size={19} />

              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <div className="help-box">
          <strong>Need help?</strong>

          <p>
            Contact your HR or administrator.
          </p>
        </div>

        <button
          className="nav-item logout"
          onClick={onLogout}
        >
          <LogOut size={19} />

          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;