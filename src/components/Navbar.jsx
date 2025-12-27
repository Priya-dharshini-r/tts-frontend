export default function Navbar({ onLogout }) {
  return (
    <header className="flex items-center justify-between px-8 py-5 border-b border-zinc-800">
      <h1 className="text-2xl font-semibold tracking-tight">
        Text to Speech
      </h1>

      <button
        onClick={onLogout}
        className="text-sm text-zinc-400 hover:text-white transition"
      >
        Logout
      </button>
    </header>
  );
}
