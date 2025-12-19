import { useState } from "react";

export default function App() {
  const backgrounds = [
    { name: "Dark", value: "#0f172a" },
    { name: "Midnight", value: "#020617" },
    { name: "Ocean", value: "linear-gradient(135deg,#0ea5e9,#1e3a8a)" },
    { name: "Sunset", value: "linear-gradient(135deg,#f97316,#be123c)" },
    { name: "Forest", value: "linear-gradient(135deg,#166534,#052e16)" }
  ];

  const [bg, setBg] = useState(backgrounds[0].value);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi 👋 I am wizy AI" }
  ]);
  const [input, setInput] = useState("");

  return (
    <div
      className="chat"
      style={{ background: bg, padding: 20, minHeight: "100vh" }}
    >
      <header>wizy AI</header>

      {/* Background Picker */}
      <div className="bg-picker">
        {backgrounds.map((b, i) => (
          <button
            key={i}
            title={b.name}
            onClick={() => setBg(b.value)}
            style={{ background: b.value }}
          />
        ))}
      </div>

      {/* Messages */}
      <div className="messages">
        {messages.map((m, i) => (
          <div key={i} className={m.role}>
            {m.content}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="input">
        <input
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={() => {
            if (!input.trim()) return;
            setMessages([...messages, { role: "user", content: input }]);
            setInput("");
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}