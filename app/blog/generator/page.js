"use client";
import { useState } from "react";
import styles from "./blogGenerator.module.css";

export default function BlogGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const enteredPass =process.env.ADMIN_PASS

  if (process.env.ADMIN_PASS !== enteredPass) {
  return alert("Unauthorized");
}

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setArticle(null);

    const res = await fetch("/api/generate-blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    });

    const data = await res.json();
    setArticle(data);
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h1>AI Blog Generator</h1>
      <form onSubmit={handleGenerate} className={styles.form}>
        <input
          type="text"
          placeholder="Enter blog topic (e.g. Best Solar Solutions for Nigerian Homes)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Blog"}
        </button>
      </form>

      {article && (
        <div className={styles.article}>
          <h2>{article.title}</h2>
          <p>{article.content}</p>
        </div>
      )}
    </div>
  );
}