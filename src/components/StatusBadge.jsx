export default function StatusBadge({ status }) {
  const colors = {
    idle: "bg-zinc-700",
    pending: "bg-yellow-600",
    completed: "bg-green-600",
    failed: "bg-red-600",
  };

  return (
    <span
      className={`px-3 py-1 text-xs rounded-full capitalize ${colors[status]}`}
    >
      {status}
    </span>
  );
}
