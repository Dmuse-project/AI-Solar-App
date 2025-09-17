"use client";

import { useState } from "react";
import styles from "./aiSolarCalulator.module.css";
import jsPDF from "jspdf";
import ReactMarkdown from "react-markdown";

export default function CalculatorClient() {
  const [appliances, setAppliances] = useState("");
  const [cilentInfo, setClientInfo] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [usage, setUsage] = useState("");
  const [budget, setBudget] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const nameHandler = (e) => setName(e.target.value);
  const phoneHandler = (e) => setPhone(e.target.value);
  const emailHandler = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    const formData = { name, email, phone, appliances, usage, budget };
    setClientInfo(formData);

    const res = await fetch("/api/solar-calculator", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setResult(data.recommendation);
    setLoading(false);

    // reset form
    setAppliances("");
    setName("");
    setEmail("");
    setPhone("");
    setUsage("");
    setBudget("");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Solar Proposal", 20, 20);
    doc.setFontSize(12);
    doc.text(`Client: ${cilentInfo.name || ""}`, 20, 40);
    doc.text(`Email: ${cilentInfo.email || ""}`, 20, 50);
    doc.text(`Phone: ${cilentInfo.phone || ""}`, 20, 60);
    doc.text(`Appliances: ${cilentInfo.appliances || ""}`, 20, 80);
    doc.text(`Usage: ${cilentInfo.usage || ""} hrs/day`, 20, 90);
    doc.text(`Budget: ₦${cilentInfo.budget || ""}`, 20, 100);
    doc.text("Recommendation:", 20, 120);
    doc.text(result, 20, 130, { maxWidth: 170 });
    doc.save("solar-proposal.pdf");
  };

  return (
    <div className={styles.container}>
      <h1>AI Solar Calculator</h1>
      <p>Get a personalized solar recommendation for your home or business.</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={nameHandler}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={emailHandler}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={phoneHandler}
          required
        />

        <textarea
          placeholder="List your appliances (e.g. 2 fans, 1 fridge, 4 bulbs)"
          value={appliances}
          onChange={(e) => setAppliances(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Average daily usage (hours)"
          value={usage}
          onChange={(e) => setUsage(e.target.value)}
          min="0"
          required
        />
        <input
          type="number"
          placeholder="Budget in Naira"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          min="0"
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Calculating..." : "Get Recommendation"}
        </button>
      </form>

      {result && (
        <div className={styles.result}>
          <h2>Recommended System:</h2>
          <ReactMarkdown>{result}</ReactMarkdown>
          <button onClick={downloadPDF} className={styles.pdfButton}>
            Download Proposal (PDF)
          </button>
        </div>
      )}
    </div>
  );
}
