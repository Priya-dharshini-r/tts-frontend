export default function Header({ onLogout }) {
  return (
    <header className="border-b border-zinc-800 px-6 py-4 flex justify-between">
      <h1 className="text-2xl font-bold">Text to Speech</h1>
      <button
        onClick={onLogout}
        className="text-sm text-zinc-400 hover:text-white"
      >
        Logout
      </button>
    </header>
  );
}
