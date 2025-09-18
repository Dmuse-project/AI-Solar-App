// Project: Photon Solar (Next.js App Router) - Mobile-first
// Files included below. Drop them into your Next.js 13+ app/ project.


// app/page.js (Landing)
'use client'
import styles from './app.module.css'
import * as gtag from "../lib/gtag"





export default function Home() {

    const handleQuoteClick = () => {
    gtag.event({
      action: "click_get_quote",   // custom action name
      category: "engagement",      // GA event category
      label: "Get Quote Button",   // useful for reports
      value: 1,                    // optional, e.g. number of clicks
    });

    // do your normal action here (open form, redirect, etc.)
    // alert("Quote request triggered!");
  };

    const handleCalculatorClick = () => {
    gtag.event({
      action: "click_solar_calculator",
      category: "engagement",
      label: "Solar Calculator Button",
    });

    // your calculator logic
    // alert("Solar Calculator opened");
  };


  return (
    <div className={styles.container}>
      <header className={styles.hero} id="home">
        <video className={styles.backgroundVideo} autoPlay muted loop playsInline>
          <source src="/solar_bg.mp4" type="video/mp4" />
      
                Your browser does not support the video tag.
        </video>
        <div className={styles.heroInner}>
          <h1>Reliable Solar Power for Every Nigerian Home & Business</h1>
          <p>Say goodbye to blackouts and high fuel costs. Switch to clean, affordable solar today.</p>
          <div className={styles.ctaWrap}>
          <button className={styles.button} onClick={handleQuoteClick}> <a href="#contact" className={styles.ctaBtn}>Get a Free Quote</a></button>
          <button className={styles.button} onClick={handleCalculatorClick}> <a href="/calculator" className={styles.ctaOutline}>Solar Calculator</a> </button> 
          </div>
        </div>
      </header>

      <section className={styles.section} id="problems">
        <h2>Tired of NEPA failures and generator expenses?</h2>
        <ul className={styles.list}>
          <li>⚡ Constant blackouts disrupting your life</li>
          <li>⛽ Rising fuel & generator maintenance costs</li>
          <li>😩 Noise and fumes from generators</li>
          <li>📉 Unstable power slowing down businesses</li>
        </ul>
      </section>

      <section className={styles.sectionAlt} id="solutions">
        <h2>We Bring You Solar Energy That Works — Day & Night</h2>
        <p>Affordable, reliable, and tailored systems designed for Nigerian homes and businesses.</p>
        <ul className={styles.bulletGrid}>
          <li>✅ Long-lasting solar panels (25+ years)</li>
          <li>✅ Battery backup for night use</li>
          <li>✅ Safe, stable inverters</li>
          <li>✅ Professional local installation & support</li>
        </ul>
        <a href="#contact" className={styles.ctaBtn}>Book a Free Consultation</a>
      </section>

      <section className={styles.section} id="benefits">
        <h2>Why Nigerians Choose Us</h2>
        <div className={styles.grid}>
          <div className={styles.card}><h3>💰 Save Money</h3><p>Reduce bills by up to 70%.</p></div>
          <div className={styles.card}><h3>🔋 Reliable Power</h3><p>24/7 energy for home & business.</p></div>
          <div className={styles.card}><h3>🌍 Eco-Friendly</h3><p>Cleaner, quieter energy.</p></div>
          <div className={styles.card}><h3>🤝 Trusted Experts</h3><p>Local technicians & warranty.</p></div>
        </div>
      </section>

      <section className={styles.sectionAlt} id="packages">
        <h2>Our Packages</h2>
        <div className={styles.grid}>
          <div className={styles.card}><h3>Home Starter</h3><p>1.5–3kW array + battery backup</p><a href="#contact" className={styles.smallBtn}>Get Quote</a></div>
          <div className={styles.card}><h3>Business Pro</h3><p>3–10kW scalable systems</p><a href="#contact" className={styles.smallBtn}>Get Quote</a></div>
          <div className={styles.card}><h3>Custom & Industrial</h3><p>Full design & project management</p><a href="#contact" className={styles.smallBtn}>Schedule Assessment</a></div>
        </div>
      </section>

      <section className={styles.section} id="testimonials">
        <h2>What Our Clients Say</h2>
        <div className={styles.testimonials}>
          <blockquote>"No more generator noise — my family sleeps better."<span>— Chinedu, Abuja</span></blockquote>
          <blockquote>"Our shop runs POS and freezers 24/7."<span>— Aisha, Lagos</span></blockquote>
        </div>
      </section>

      <section className={styles.finalCta} id="contact">
        <h2>Ready to Enjoy 24/7 Power?</h2>
        <p>Take the first step — our team will design the perfect solar solution for you.</p>
        <div className={styles.ctaWrap}>
          <a href="tel:+2348073353857" className={styles.ctaBtn}>Call Now</a>
          <a href="https://wa.me/2348073353857" className={styles.ctaOutline}>Chat on WhatsApp</a>
        </div>
      </section>
    </div>
  )
}



