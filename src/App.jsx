import { useEffect, useState } from "react";
import Auth from "./components/Auth";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUser(token ? true : false);
  }, []);

  if (!user) {
    return <Auth onAuthSuccess={() => setUser(true)} />;
  }

  return <Dashboard onLogout={() => {
    localStorage.removeItem("token");
    setUser(null);
  }} />;
}
