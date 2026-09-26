import { useState } from "react";
import { Send } from "lucide-react";

import PageHeader from "../../components/PageHeader";
import { getEmployees } from "../../Data/employees";
import { addNotification } from "../../Data/notifications";

function Notifications() {
  const employees = getEmployees();

  const [target, setTarget] = useState("all");
  const [message, setMessage] = useState("");
  const [sentMessage, setSentMessage] = useState("");

  function handleSend(e) {
    e.preventDefault();

    if (!message.trim()) return;

    if (target === "all") {
      employees.forEach((emp) => {
        addNotification({ employeeId: emp.employeeId, message });
      });
    } else {
      addNotification({ employeeId: target, message });
    }

    setSentMessage("Notification sent successfully.");
    setMessage("");

    setTimeout(() => setSentMessage(""), 3000);
  }

  return (
    <>
      <PageHeader
        eyebrow="ADMIN"
        title="Notifications"
        description="Send announcements or reminders to your team."
      />

      <section className="panel">
        <div className="panel-heading">
          <div>
            <span className="panel-kicker">NEW MESSAGE</span>
            <h3>Send a Notification</h3>
          </div>
        </div>

        <form onSubmit={handleSend} className="task-form">
          <label>
            Send To
            <select value={target} onChange={(e) => setTarget(e.target.value)}>
              <option value="all">All Employees</option>
              {employees.map((emp) => (
                <option key={emp.employeeId} value={emp.employeeId}>
                  {emp.name} ({emp.employeeId})
                </option>
              ))}
            </select>
          </label>

          <label>
            Message
            <textarea
              placeholder="e.g. Office will be closed tomorrow for maintenance."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              required
            />
          </label>

          {sentMessage && <div className="success">{sentMessage}</div>}

          <button
            type="submit"
            className="primary-button"
            disabled={!employees.length}
          >
            <Send size={18} />
            Send Notification
          </button>
        </form>
      </section>
    </>
  );
}

export default Notifications;