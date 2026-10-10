export default function StatusBadge({ status }) {

  const className = status
    .toLowerCase()
    .replace(" ", "-");

  return (
    <span className={`status-badge ${className}`}>
      {status}
    </span>
  );
}