import HistoryItem from "./HistoryItem";

export default function HistoryList({ history }) {
  if (!history.length) {
    return (
      <p className="text-zinc-500 text-sm">
        No voice generations yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {history.map((item) => (
        <HistoryItem key={item.id} item={item} />
      ))}
    </div>
  );
}
