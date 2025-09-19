"use client";
import Link from "next/link";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subtitle}>Page Not Found</h2>
      <p className={styles.text}>
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>
      <div className={styles.actions}>
        <Link href="/" className={styles.homeBtn}>
          Go Back Home
        </Link>
        <Link href="/#contact" className={styles.contactBtn}>
          Contact Support
        </Link>
      </div>
    </div>
  );
}

