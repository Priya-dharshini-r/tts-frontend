import { useEffect, useState, useRef } from "react";
import Auth from "./components/Auth";
import { generateVoice, getVoice, getHistory, logoutUser } from "./api";

function App() {
  const [user, setUser] = useState(null);

  const [text, setText] = useState("");
  const [status, setStatus] = useState("idle");
  const [audioUrl, setAudioUrl] = useState(null);
  const [history, setHistory] = useState([]);

  const pollRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ loggedIn: true });
    }
  }, []);

  useEffect(() => {
    if (!user) return;

    loadHistory();

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [user]);

  async function handleGenerate() {
    setStatus("pending");
    setAudioUrl(null);

    const { id } = await generateVoice({
      text,
      voice: "Rachel",
      language: "en-US",
    });

    startPolling(id);
  }

  function startPolling(id) {
    if (pollRef.current) clearInterval(pollRef.current);

    pollRef.current = setInterval(async () => {
      try {
        const data = await getVoice(id);
        setStatus(data.status);

        if (data.status === "completed") {
          clearInterval(pollRef.current);
          setAudioUrl(data.audio_url);
          loadHistory();
        }

        if (data.status === "failed") {
          clearInterval(pollRef.current);
        }
      } catch {
        clearInterval(pollRef.current);
        setStatus("error");
      }
    }, 2000);
  }

  function handleLogout() {
    logoutUser();
    window.location.reload(); 
  }

  async function loadHistory() {
    const data = await getHistory();
    setHistory(data);
  }

  if (!user) {
    return <Auth onAuthSuccess={() => setUser({ loggedIn: true })} />;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <button
          onClick={handleLogout}
          style={{ position: "absolute", top: 20, right: 20 }}
        >
        Logout
      </button>
      
      <h1>Text to Speech</h1>

      <textarea
        rows="4"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
      />

      <br /><br />

      <button onClick={handleGenerate}>Generate Voice</button>

      <p>Status: {status}</p>

      {status === "completed" && audioUrl && (
        <audio controls src={audioUrl} autoPlay />
      )}

      <hr />

      <h2>History</h2>
      <ul>
        {history.map((vg) => (
          <li key={vg.id}>
            {vg.text}
            {vg.audio_url && <audio controls src={vg.audio_url} />}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
