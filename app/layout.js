
// app/layout.js
import './globals.css'
import Nav from '../components/nav'
import Footer from '../components/footer'
import Chatbot from '@/components/chatbot'
// import {Analytics} from "@vercel/analytics"
import { Analytics } from '@vercel/analytics/react'
import { Inter, Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata = {
  title: 'Photon Solar Nigeria',
  description: 'Reliable solar power solutions for Nigerian homes and businesses',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className='container'>
        <Nav className="nav-container" />
        <main className='main-container'>{children}</main>
        <Analytics />
        <Chatbot />
        <Footer className="footer-container" />
      </body>
    </html>
  )
}

