// app/shop/page.js
'use client'
import { useState } from 'react'
import styles from './shop.module.css'

const sampleProducts = [
  { id: 'panel-330', name: '330W Solar Panel', price: 65000 },
  { id: 'inverter-3k', name: '3kVA Inverter', price: 120000 },
  { id: 'battery-200ah', name: '200Ah Battery', price: 90000 },
]

export default function Shop() {
  const [cart, setCart] = useState([])
  function add(p) { setCart(prev => [...prev, p]) }
  function remove(idx) { setCart(prev => prev.filter((_,i)=>i!==idx)) }

  const total = cart.reduce((s,p)=>s+p.price,0)

  return (
    <div className={styles.container}>
      <header className={styles.header}><h1>Shop</h1><p>Buy solar products & kits</p></header>
      <section className={styles.products}>
        {sampleProducts.map(p=> (
          <div key={p.id} className={styles.product}>
            <h3>{p.name}</h3>
            <p>₦{p.price.toLocaleString()}</p>
            <button onClick={()=>add(p)} className={styles.addBtn}>Add to cart</button>
          </div>
        ))}
      </section>

      <aside className={styles.cart}>
        <h3>Cart</h3>
        {cart.length===0 && <p>Your cart is empty.</p>}
        <ul>
          {cart.map((c, i)=> (
            <li key={i}>{c.name} — ₦{c.price.toLocaleString()} <button onClick={()=>remove(i)} className={styles.remove}>Remove</button></li>
          ))}
        </ul>
        {cart.length>0 && <div className={styles.checkout}>Total: ₦{total.toLocaleString()} <button className={styles.buy}>Checkout (placeholder)</button></div>}
      </aside>
    </div>
  )
}


