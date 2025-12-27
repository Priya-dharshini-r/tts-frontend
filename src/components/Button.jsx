export default function Button({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="
        bg-white text-black font-medium
        px-5 py-2 rounded-lg
        hover:bg-zinc-200
        disabled:opacity-50 disabled:cursor-not-allowed
        transition
      "
    >
      {children}
    </button>
  );
}
