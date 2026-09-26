function StatCard({
  title,
  value,
  icon,
}) {
  return (
    <div className="stat-card">
      <div className="stat-icon">
        {icon}
      </div>

      <div className="stat-content">
        <span>{title}</span>

        <strong>{value}</strong>
      </div>
    </div>
  );
}

export default StatCard;