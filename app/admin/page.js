// import styles from "./dashboard.module.css";

// export default function DashboardPage() {
//   return (
//     <div className={styles.grid}>
//       <div className={styles.card}>
//         <h2>Total Leads</h2>
//         <p>120</p>
//       </div>
//       <div className={styles.card}>
//         <h2>Proposals Sent</h2>
//         <p>48</p>
//       </div>
//       <div className={styles.card}>
//         <h2>Orders</h2>
//         <p>32</p>
//       </div>
//     </div>
//   );
// }
////////////////////////////////


// "use client";
// import styles from "./dashboard.module.css";
// import { useState, useEffect } from "react";

// export default function DashboardPage() {
//   const [stats, setStats] = useState({
//     visitors: 0,
//     returning: 0,
//     leads: 0,
//     proposals: 0,
//     sales: 0,
//     blogs: 0,
//     chats: 0,
//   });

//   useEffect(() => {
//     // Mock example — later connect to Vercel Analytics & DB
//     setStats({
//       visitors: 1200,
//       returning: 340,
//       leads: 56,
//       proposals: 24,
//       sales: 15,
//       blogs: 10,
//       chats: 38,
//     });
//   }, []);

//   return (
//     <div className={styles.container}>
//       {/* <h2 className={styles.heading}>Admin Dashboard</h2> */}

//       {/* Traffic */}
//       <div className={styles.section}>
//         <h3>Traffic</h3>
//         <div className={styles.statsGrid}>
//           <div className={styles.card}>
//             <h4>Total Visitors</h4>
//             <p>{stats.visitors}</p>
//           </div>
//           <div className={styles.card}>
//             <h4>Returning Users</h4>
//             <p>{stats.returning}</p>
//           </div>
//           <div className={styles.card}>
//             <h4>Returning Users</h4>
//             <p>{stats.returning}</p>
//           </div>
//         </div>
//       </div>

//       {/* Leads */}
//       <div className={styles.section}>
//         <h3>Leads</h3>
//         <div className={styles.card}>
//           <h4>Leads Collected</h4>
//           <p>{stats.leads}</p>
//         </div>
//       </div>

//       {/* Proposals */}
//       <div className={styles.section}>
//         <h3>Proposals</h3>
//         <div className={styles.card}>
//           <h4>Proposals Sent</h4>
//           <p>{stats.proposals}</p>
//         </div>
//       </div>

//       {/* Sales */}
//       <div className={styles.section}>
//         <h3>Sales</h3>
//         <div className={styles.card}>
//           <h4>Total Sales</h4>
//           <p>{stats.sales}</p>
//         </div>
//       </div>

//       {/* AI Stats */}
//       <div className={styles.section}>
//         <h3>AI Usage</h3>
//         <div className={styles.statsGrid}>
//           <div className={styles.card}>
//             <h4>Blogs Generated</h4>
//             <p>{stats.blogs}</p>
//           </div>
//           <div className={styles.card}>
//             <h4>Chatbot Conversations</h4>
//             <p>{stats.chats}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



///////////////////////////////////

// VERCEL TRACKING
"use client";
import styles from "./dashboard.module.css";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    visitors: 0,
    returning: 0,
    leads: 0,
    proposals: 0,
    sales: 0,
    blogs: 0,
    chats: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/analytics");
        const data = await res.json();

        setStats((prev) => ({
          ...prev,
          visitors: data.visitors || 0,
          returning: data.returning || 0,
        }));
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className={styles.container}>
      {/* Traffic */}
      <div className={styles.section}>
        <h3>Traffic</h3>
        <div className={styles.statsGrid}>
          <div className={styles.card}>
            <h4>Total Visitors</h4>
            <p>{stats.visitors}</p>
          </div>
          <div className={styles.card}>
            <h4>Returning Users</h4>
            <p>{stats.returning}</p>
          </div>
        </div>
      </div>
    </div>
  );
}