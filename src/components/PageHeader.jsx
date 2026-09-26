function PageHeader({
  eyebrow,
  title,
  description,
}) {
  return (
    <div className="page-header">
      <div>
        <span className="eyebrow">
          {eyebrow}
        </span>

        <h1>{title}</h1>

        <p>{description}</p>
      </div>
    </div>
  );
}

export default PageHeader;