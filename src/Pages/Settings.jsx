import { useState } from "react";

import PageHeader from "../components/PageHeader";

function Settings() {
  const [notifications, setNotifications] =
    useState(true);

  const [compactMode, setCompactMode] =
    useState(false);

  return (
    <>
      <PageHeader
        eyebrow="PREFERENCES"
        title="Settings"
        description="Manage your employee portal preferences."
      />

      <section className="panel settings">
        <div className="setting">
          <div>
            <strong>
              Attendance Notifications
            </strong>

            <p>
              Receive reminders about signing
              in and out.
            </p>
          </div>

          <button
            className={`toggle ${
              notifications ? "on" : ""
            }`}
            onClick={() =>
              setNotifications(!notifications)
            }
          >
            <span />
          </button>
        </div>

        <div className="setting">
          <div>
            <strong>
              Compact Dashboard
            </strong>

            <p>
              Use a tighter layout for dashboard
              cards and tables.
            </p>
          </div>

          <button
            className={`toggle ${
              compactMode ? "on" : ""
            }`}
            onClick={() =>
              setCompactMode(!compactMode)
            }
          >
            <span />
          </button>
        </div>
      </section>
    </>
  );
}

export default Settings;