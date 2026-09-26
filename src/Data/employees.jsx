const STORAGE_KEY = "employees";

export const ADMIN_CREDENTIALS = {
  employeeId: "ADMIN-001",
  password: "admin123",
  name: "Admin",
};

export function getEmployees() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

export function saveEmployees(employees) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
}

export function addEmployee(employee) {
  const updated = [...getEmployees(), employee];
  saveEmployees(updated);
  return updated;
}

export function updateEmployee(employeeId, changes) {
  const updated = getEmployees().map((emp) =>
    emp.employeeId === employeeId ? { ...emp, ...changes } : emp
  );
  saveEmployees(updated);
  return updated;
}

export function deleteEmployee(employeeId) {
  const updated = getEmployees().filter(
    (emp) => emp.employeeId !== employeeId
  );
  saveEmployees(updated);
  return updated;
}

export function findEmployee(employeeId, password) {
  return getEmployees().find(
    (emp) => emp.employeeId === employeeId && emp.password === password
  );
}

export function employeeIdExists(employeeId) {
  return getEmployees().some((emp) => emp.employeeId === employeeId);
}

export function signupEmployee(employee) {
  if (employeeIdExists(employee.employeeId)) {
    throw new Error("This Employee ID is already registered.");
  }
  return addEmployee(employee);
}