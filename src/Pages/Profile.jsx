import PageHeader from "../components/PageHeader";

function Profile({ user }) {
  return (
    <>
      <PageHeader
        eyebrow="ACCOUNT"
        title="My Profile"
        description="Your employee information and workspace details."
      />

      <div className="profile-grid">
        <section className="panel profile-card">
          <div className="profile-avatar">
            {user.name.charAt(0)}
          </div>

          <h2>{user.name}</h2>

          <p>{user.designation}</p>

          <span className="employee-badge">
            {user.employeeId}
          </span>
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <span className="panel-kicker">
                PERSONAL DETAILS
              </span>

              <h3>Employee Information</h3>
            </div>
          </div>

          <div className="details">
            <div>
              <span>Full Name</span>

              <strong>{user.name}</strong>
            </div>

            <div>
              <span>Work Email</span>

              <strong>{user.email}</strong>
            </div>

            <div>
              <span>Department</span>

              <strong>{user.department}</strong>
            </div>

            <div>
              <span>Designation</span>

              <strong>{user.designation}</strong>
            </div>

            <div>
              <span>Employee ID</span>

              <strong>{user.employeeId}</strong>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Profile;