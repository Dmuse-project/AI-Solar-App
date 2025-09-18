// components/Footer.js
import styles from './footer.module.css'

export default function Footer(){
  return (
    <footer className={styles.footer}>
      <div>© {new Date().getFullYear()} Photon Solar Nigeria</div>
      <div className={styles.row}>
        <a href="tel:+2348073353857">+234 8073-353-857</a>
        <a href="mailto:lordmuse057@gmail.com">genesispowersystem@gmail.com</a>
      </div>
    </footer>
  )
}
