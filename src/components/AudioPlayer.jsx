export default function AudioPlayer({ src }) {
  return (
    <audio
      controls
      src={src}
      className="w-full mt-2"
    />
  );
}
