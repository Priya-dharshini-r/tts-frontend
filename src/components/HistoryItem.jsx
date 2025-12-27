import AudioPlayer from "./AudioPlayer";

export default function HistoryItem({ item }) {
  const date = new Date(item.created_at);

  return (
    <div className="bg-zinc-900 rounded-lg p-4 space-y-2">
      <p className="text-sm text-zinc-300">{item.text}</p>

      <AudioPlayer src={item.audio_url} />

      <p className="text-xs text-zinc-500">
        Generated on {date.toLocaleString()}
      </p>
    </div>
  );
}
