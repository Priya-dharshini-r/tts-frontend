import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import TextInputCard from "../components/TextInputCard";
import HistoryList from "../components/HistoryList";
import { generateVoice, getVoice, getHistory } from "../api";

export default function Dashboard() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("idle");
  const [history, setHistory] = useState([]);
  const pollRef = useRef(null);

  useEffect(() => {
    loadHistory();
    return () => pollRef.current && clearInterval(pollRef.current);
  }, []);

  async function loadHistory() {
    const data = await getHistory();
    setHistory(data);
  }

  async function handleGenerate() {
    setStatus("pending");
    const { id } = await generateVoice({ text, voice: "Rachel", language: "en-US" });

    pollRef.current = setInterval(async () => {
      const data = await getVoice(id);
      setStatus(data.status);

      if (data.status === "completed") {
        clearInterval(pollRef.current);
        loadHistory();
      }
    }, 2000);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.reload();
  }

  return (
    <div className="min-h-screen">
      <Navbar onLogout={handleLogout} />

      <main className="max-w-3xl mx-auto px-6 py-10 space-y-10">
        <TextInputCard
          text={text}
          setText={setText}
          onGenerate={handleGenerate}
          status={status}
        />

        <section>
          <h2 className="text-lg font-semibold mb-4">History</h2>
          <HistoryList history={history} />
        </section>
      </main>
    </div>
  );
}
