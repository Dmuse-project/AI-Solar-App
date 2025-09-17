import Link from "next/link";
import styles from "./adminLayout.module.css";

export default function AdminLayout({ children }) {
  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>⚡ Photon Admin</div>
        <nav className={styles.nav}>
          <Link href="/admin" className={styles.link}>Dashboard</Link>
          <Link href="/admin/blogs" className={styles.link}> AI Blog </Link>
          <Link href="/admin/chats" className={styles.link}> AI Chatbot </Link>
          <Link href="/admin/proposals" className={styles.link}>AI Proposals </Link>
          <Link href="/admin/ecommerce" className={styles.link}>E-commerce Manager</Link>
              <Link href="/admin/leads" className={styles.link}>Leads & Contracts</Link>
          <Link href="/admin/analytics" className={styles.link}>Analytics</Link>
          <Link href="/admin/settings" className={styles.link}>Settings</Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className={styles.main}>
        <header className={styles.topbar}>
          <h1 className={styles.title}>Admin Dashboard</h1>
          <div className={styles.user}>
            <span>Welcome, Admin</span>
            <img src="/admin-avatar.png" alt="admin" className={styles.avatar} />
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}