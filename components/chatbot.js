"use client";
import { useState } from "react";
import styles from "./chatbot.module.css"
import ReactMarkdown from "react-markdown";


export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "bot", text: "Hello! 👋 I’m your Solar Assistant. How can I help today?" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setMessages([...newMessages, { role: "bot", text: data.reply }]);
    setLoading(false);
  };

  return (
    <div className={styles.chatbot}>
      {open && (
        <div className={styles.chatWindow}>
          <div className={styles.messages}>
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? styles.userMsg : styles.botMsg}>
                <ReactMarkdown>{m.text}</ReactMarkdown> 
              </div>
            ))}
            {loading && <div className={styles.botMsg}>Thinking...</div>}
          </div>
          <div className={styles.inputArea}>
            <input
              type="text"
              placeholder="Ask me about solar..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
      <button className={styles.chatButton} onClick={() => setOpen(!open)}>
        💬
      </button>
    </div>
  );
}