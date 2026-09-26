import { addNotification } from "./notifications";

const STORAGE_KEY = "tasks";

function getAllTasks() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveAllTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function getTasksForEmployee(employeeId) {
  return getAllTasks().filter((task) => task.employeeId === employeeId);
}

export function getTodayTasksForEmployee(employeeId) {
  const today = formatDate(new Date());
  return getAllTasks().filter(
    (task) => task.employeeId === employeeId && task.date === today
  );
}

export function addTask(task) {
  const newTask = {
    id: Date.now().toString(),
    date: formatDate(new Date()),
    status: "Pending",
    ...task,
  };

  const updated = [...getAllTasks(), newTask];
  saveAllTasks(updated);

  addNotification({
    employeeId: task.employeeId,
    message: `New task assigned: "${task.title}"`,
  });

  return updated;
}

export function updateTaskStatus(taskId, status) {
  const updated = getAllTasks().map((task) =>
    task.id === taskId ? { ...task, status } : task
  );
  saveAllTasks(updated);
  return updated;
}

export function deleteTask(taskId) {
  const updated = getAllTasks().filter((task) => task.id !== taskId);
  saveAllTasks(updated);
  return updated;
}

export function getAllTasksList() {
  return getAllTasks();
}

function formatDate(date) {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}