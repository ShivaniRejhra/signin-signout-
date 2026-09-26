import "./notifications.css";
const STORAGE_KEY = "notifications";

function getAllNotifications() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveAllNotifications(notifications) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
}

export function getNotificationsForUser(employeeId) {
  return getAllNotifications()
    .filter((n) => n.employeeId === employeeId)
    .sort((a, b) => b.timestamp - a.timestamp);
}

export function getUnreadCount(employeeId) {
  return getAllNotifications().filter(
    (n) => n.employeeId === employeeId && !n.read
  ).length;
}

export function addNotification({ employeeId, message }) {
  const newNotification = {
    id: Date.now().toString(),
    employeeId,
    message,
    read: false,
    timestamp: Date.now(),
  };

  const updated = [...getAllNotifications(), newNotification];
  saveAllNotifications(updated);
  return updated;
}

export function markAllAsRead(employeeId) {
  const updated = getAllNotifications().map((n) =>
    n.employeeId === employeeId ? { ...n, read: true } : n
  );
  saveAllNotifications(updated);
  return updated;
}