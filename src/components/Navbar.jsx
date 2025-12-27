export default function Navbar({ user, onLogout }) {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-black text-white">
      <h1 className="text-lg font-semibold">Text to Speech</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-300">
          {user?.email || "Logged in"}
        </span>

        <button
          onClick={onLogout}
          className="text-sm hover:underline"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
