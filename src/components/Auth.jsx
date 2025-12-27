import { useState } from "react";
import { loginUser, signupUser } from "../api";

export default function Auth({ onAuthSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      if (mode === "login") {
        await loginUser(email, password);
      } else {
        await signupUser(email, password);
      }
      onAuthSuccess();
    } catch {
      setError("Invalid email or password");
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center bg-gray-100">
        <div className="w-[360px] bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-2 text-gray-500">Welcome</h2>
          <p className="text-sm text-gray-500 mb-6">
            Log in to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full px-3 py-2 border rounded-md
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full px-3 py-2 border rounded-md
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-md
                         hover:bg-blue-700 transition"
            >
              {mode === "login" ? "Continue" : "Create Account"}
            </button>
          </form>

          {error && (
            <p className="text-red-600 text-sm text-center mt-3">
              {error}
            </p>
          )}

          <div className="mt-4 text-center text-sm text-yellow-600">
            {mode === "login" ? (
              <>
                Don’t have an account?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="text-blue-600 hover:underline"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="text-blue-600 hover:underline"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT: Image Section */}
      <div
        className="hidden md:block bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')",
        }}
      />
    </div>
  );
}
