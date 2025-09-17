// app/calculator/page.js
'use client'
import { useState } from 'react'
import styles from './calculator.module.css'

export default function Calculator() {
  const [appliances, setAppliances] = useState([
    { name: 'LED Bulb', watt: 10, hours: 5 },
  ])
  const [result, setResult] = useState(null)

  function update(i, key, val) {
    const copy = [...appliances]
    copy[i][key] = key==='name'? val : Number(val)
    setAppliances(copy)
  }
  function add() { setAppliances(prev=>[...prev, {name:'New', watt:50, hours:2}]) }
  function remove(i){ setAppliances(prev=>prev.filter((_,idx)=>idx!==idx)) }

  function calculate(e){
    e.preventDefault()
    // total daily Wh
    const totalWh = appliances.reduce((s,a)=> s + (a.watt||0) * (a.hours||0), 0)
    // recommend inverter (kVA) approx = peak watts / 1000 simplified
    const peak = Math.max(...appliances.map(a=>a.watt||0))
    const inverterKva = Math.ceil((peak)/1000) || 1
    // battery capacity (Ah) assuming 48V system: Ah = Wh / V / DoD(0.5)
    const systemVoltage = 48
    const dod = 0.5
    const batteryAh = Math.ceil(totalWh / systemVoltage / dod)
    // panels: assume panel 330W, 4 sun-hours => daily energy per panel = 330*4 = 1320Wh
    const panelDaily = 330 * 4
    const panels = Math.ceil(totalWh / panelDaily) || 1

    setResult({ totalWh, inverterKva, batteryAh, panels })
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}><h1>Solar Calculator</h1><p>Enter appliances and usage to get a recommendation.</p></header>
      <form className={styles.form} onSubmit={calculate}>
        {appliances.map((a,i)=> (
          <div className={styles.row} key={i}>
            <input value={a.name} onChange={e=>update(i,'name',e.target.value)} className={styles.input} />
            <input value={a.watt} onChange={e=>update(i,'watt',e.target.value)} className={styles.input} />
            <input value={a.hours} onChange={e=>update(i,'hours',e.target.value)} className={styles.input} />
          </div>
        ))}
        <div className={styles.actions}>
          <button type="button" onClick={add} className={styles.add}>+ Add appliance</button>
          <button type="submit" className={styles.calc}>Calculate</button>
        </div>
      </form>

      {result && (
        <section className={styles.result}>
          <h2>Recommendation</h2>
          <p>Total daily consumption: <strong>{result.totalWh} Wh</strong></p>
          <p>Suggested inverter: <strong>{result.inverterKva} kVA</strong></p>
          <p>Battery capacity (approx): <strong>{result.batteryAh} Ah @48V</strong></p>
          <p>Solar panels recommended: <strong>{result.panels} x 330W</strong></p>
          <p className={styles.note}>This is an estimate. For accurate sizing we do a professional site survey.</p>
        </section>
      )}
    </div>
  )
}

