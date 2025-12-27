import StatusBadge from "./StatusBadge";

export default function TextInputCard({
  text,
  setText,
  onGenerate,
  status
}) {
  return (
    <div className="bg-zinc-900 rounded-xl p-6 shadow-lg space-y-4">
      <textarea
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to convert into speech..."
        className="w-full bg-zinc-800 text-zinc-100 rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <div className="flex items-center justify-between">
        <button
          onClick={onGenerate}
          disabled={!text || status === "pending"}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 px-5 py-2 rounded-lg font-medium transition"
        >
          Generate Voice
        </button>

        <StatusBadge status={status} />
      </div>
    </div>
  );
}
