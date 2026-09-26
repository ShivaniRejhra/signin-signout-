const STORAGE_KEY = "attendanceData";

function getAllAttendance() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : {};
}

function saveAllAttendance(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getEmployeeAttendance(employeeId) {
  const all = getAllAttendance();
  return all[employeeId] || { records: [], activeSession: null };
}

export function saveEmployeeAttendance(employeeId, data) {
  const all = getAllAttendance();
  all[employeeId] = data;
  saveAllAttendance(all);
}

export function getAllEmployeesAttendance() {
  return getAllAttendance();
}