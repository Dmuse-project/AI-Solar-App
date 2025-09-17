// // app/blog/page.js
// import Link from 'next/link'
// import styles from './blog.module.css'

// export default function Blog() {
//   // placeholder posts (replace with CMS or markdown later)
//   const posts = [
//     { id: 'how-to-size', title: 'How to Size a Home Solar System', excerpt: 'Step-by-step guide to calculate your needs.' },
//     { id: 'battery-care', title: 'Battery Care & Maintenance', excerpt: 'Make your battery last longer with simple tips.' },
//   ]

//   return (
//     <div className={styles.container}>
//       <header className={styles.header}><h1>Solar Insights — Blog</h1><p>Expert articles, guides, and case studies.</p></header>
//       <main className={styles.grid}>
//         {posts.map(p => (
//           <article key={p.id} className={styles.card}>
//             <h3>{p.title}</h3>
//             <p>{p.excerpt}</p>
//             <Link href={`/blog/${p.id}`} className={styles.read}>Read article</Link>
//           </article>
//         ))}
//       </main>
//     </div>
//   )
// }


//Blog 2 modification with dataBase
//////////////////////////////
import { createClient } from "@supabase/supabase-js";
import classes from "./blog.module.css"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY);

export default async function BlogPage() {
  const { data: blogs } = await supabase.from("blogs").select("*").order("created_at", { ascending: false });

  return (
    <div  className={classes.container} >
      <h1>Our Solar Blog</h1>
  
      {blogs?.map((blog) => (
        <div key={blog.id} style={{ marginBottom: "2rem" }}>
        <img src={blog.image_url} alt={blog.title} style={{ width: "100%", borderRadius: "0.5rem" }} />
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
          <div className={styles.shareButtons}>
  <a
    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(blog.title + " - " + blog.content.slice(0,150) + "... Read more on yourwebsite.com/blog/" + blog.id)}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    Share on WhatsApp
  </a>

  <a
    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://yourwebsite.com/blog/" + blog.id)}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    Share on Facebook
  </a>
</div>
        </div>
      ))}
    </div>
  );
}