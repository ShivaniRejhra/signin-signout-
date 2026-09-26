import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { ADMIN_CREDENTIALS, findEmployee } from "../Data/employees";

function Login({ onLogin }) {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!employeeId || !password) {
      setError("Please enter your Employee ID and password.");
      return;
    }

    if (
      employeeId === ADMIN_CREDENTIALS.employeeId &&
      password === ADMIN_CREDENTIALS.password
    ) {
      onLogin({
        role: "admin",
        name: ADMIN_CREDENTIALS.name,
        employeeId: ADMIN_CREDENTIALS.employeeId,
      });
      return;
    }

    const employee = findEmployee(employeeId, password);

    if (!employee) {
      setError("Invalid Employee ID or password.");
      return;
    }

    onLogin({ role: "employee", ...employee });
  }

  return (
    <div className="login-page">
      <section className="login-left">
        <div className="login-logo">
          <div className="logo">S</div>
          <span>STARTUP</span>
        </div>

        <div className="login-intro">
          <span className="eyebrow">EMPLOYEE WORKSPACE</span>
          <h1>Work smarter.<br />Stay connected.</h1>
          <p>A simple workspace for your daily attendance, profile and work overview.</p>
        </div>

        <div className="quote">
          <span>"</span>
          <p>Great work starts with a great team.</p>
        </div>
      </section>

      <section className="login-right">
        <div className="login-container">
          <span className="eyebrow">WELCOME BACK</span>
          <h2>Sign in to your workspace</h2>
          <p className="login-description">Enter your Employee ID and password to continue.</p>

          <form onSubmit={handleSubmit}>
            <label>
              Employee ID
              <input
                type="text"
                placeholder="e.g. ST-024"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
              />
            </label>

            <label>
              Password
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            {error && <div className="error">{error}</div>}

            <button type="submit" className="primary-button">
              Sign In
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="demo-login">
            <strong>Demo credentials</strong>
            <span>Admin: ADMIN-001 / admin123</span>
            <span>Employee: ST-024 / startup123</span>
          </div>

          <p className="login-footer">Need access? Contact your company administrator.</p>
        </div>
      </section>
    </div>
  );
}

export default Login;