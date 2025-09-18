// components/Nav.js
'use client'
import Link from 'next/link'
import { useState } from 'react'
import styles from './nav.module.css'
import NavLink from './Links/nav-link'

export default function Nav(){
  const [open, setOpen] = useState(false)
  return (
    <nav className={styles.nav}>
      <div className={styles.brand}><Link href="/">Genesis Eco-Power sysytems</Link></div>
      <button className={styles.hamburger} onClick={()=>setOpen(!open)} aria-label="menu">☰</button>
      <div className={`${styles.links} ${open?styles.open:''}`}>
        <NavLink href="/#home" onClick={()=>setOpen(false)}>Home</NavLink>
        <NavLink href="/#solutions" onClick={()=>setOpen(false)}>Solutions</NavLink>
        <NavLink href="/#packages" onClick={()=>setOpen(false)}>Packages</NavLink>
        {/* <NavLink href="/blog">Blog</NavLink> */}
        <NavLink href="/shop">Shop</NavLink>
        <NavLink href="/calculator">Calculator</NavLink>
        <Link href="/#contact" className={styles.cta} onClick={()=>setOpen(false)}>Get Quote</Link>
      </div>
    </nav>
  )
}
