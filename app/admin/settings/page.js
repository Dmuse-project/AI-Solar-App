"use client";
import { useState } from "react";
import styles from "./setting.module.css";

export default function SettingsPage() {
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [logo, setLogo] = useState(null);
  const [openAiKey, setOpenAiKey] = useState("");
  const [stableDiffusionKey, setStableDiffusionKey] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [scheduler, setScheduler] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();

    const settings = {
      companyName,
      companyEmail,
      logo,
      openAiKey,
      stableDiffusionKey,
      whatsapp,
      facebook,
      instagram,
      scheduler,
    };

    console.log("Saved settings:", settings);
    alert("Settings saved (mock). Connect to backend to persist.");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Settings</h2>

      <form onSubmit={handleSave} className={styles.form}>
        {/* Company Info */}
        <section className={styles.section}>
          <h3>Company Info</h3>
          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className={styles.input}
          />
          <input
            type="email"
            placeholder="Company Email"
            value={companyEmail}
            onChange={(e) => setCompanyEmail(e.target.value)}
            className={styles.input}
          />
          <input
            type="file"
            onChange={(e) => setLogo(e.target.files[0])}
            className={styles.input}
          />
        </section>

        {/* AI Keys */}
        <section className={styles.section}>
          <h3>AI Settings</h3>
          <input
            type="password"
            placeholder="OpenAI API Key"
            value={openAiKey}
            onChange={(e) => setOpenAiKey(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Stable Diffusion API Key"
            value={stableDiffusionKey}
            onChange={(e) => setStableDiffusionKey(e.target.value)}
            className={styles.input}
          />
        </section>

        {/* Social Media */}
        <section className={styles.section}>
          <h3>Social Media</h3>
          <input
            type="text"
            placeholder="WhatsApp Number"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Facebook Page URL"
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Instagram Handle"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            className={styles.input}
          />
        </section>

        {/* Scheduler */}
        <section className={styles.section}>
          <h3>Blog Auto-Scheduler</h3>
          <label className={styles.toggle}>
            <input
              type="checkbox"
              checked={scheduler}
              onChange={() => setScheduler(!scheduler)}
            />
            <span>Enable auto-generation of blogs</span>
          </label>
        </section>

        <button type="submit" className={styles.button}>
          Save Settings
        </button>
      </form>
    </div>
  );
}