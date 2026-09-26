import { useState, useEffect, useRef } from "react";
import { Bell, Search } from "lucide-react";
import {
  getNotificationsForUser,
  getUnreadCount,
  markAllAsRead,
} from "../Data/notifications";

function Topbar({ user }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (user.employeeId) {
      setNotifications(getNotificationsForUser(user.employeeId));
      setUnreadCount(getUnreadCount(user.employeeId));
    }
  }, [user.employeeId]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggleDropdown() {
    const opening = !showDropdown;
    setShowDropdown(opening);

    if (opening && unreadCount > 0) {
      markAllAsRead(user.employeeId);
      setUnreadCount(0);
      setNotifications(getNotificationsForUser(user.employeeId));
    }
  }

  return (
    <header className="topbar">
      <div className="search-box">
        <Search size={18} />

        <input
          type="text"
          placeholder="Search anything..."
        />
      </div>

      <div className="topbar-right">
        <div className="notification-wrapper" ref={dropdownRef}>
          <button className="notification" onClick={toggleDropdown}>
            <Bell size={19} />
            {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
          </button>

          {showDropdown && (
            <div className="notification-dropdown">
              <div className="notification-dropdown-header">
                Notifications
              </div>

              {notifications.length === 0 && (
                <div className="notification-empty">No notifications yet.</div>
              )}

              {notifications.map((n) => (
                <div key={n.id} className="notification-item">
                  <p>{n.message}</p>
                  <small>{new Date(n.timestamp).toLocaleString()}</small>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="user-mini">
          <div className="avatar">
            {user.name.charAt(0)}
          </div>

          <div>
            <strong>{user.name}</strong>

            <small>{user.designation || (user.role === "admin" ? "Administrator" : "")}</small>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;