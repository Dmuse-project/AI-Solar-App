
// app/layout.js
import './globals.css'

import Script from "next/script";
import Nav from '../components/nav'
import Footer from '../components/footer'
import Chatbot from '@/components/chatbot'
// import {Analytics} from "@vercel/analytics"
// import { Analytics } from '@vercel/analytics/react'
import { Inter, Poppins } from "next/font/google";
import Analyticss from '@/components/analytics';
import { usePathname } from "next/navigation";

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
  title: 'Genesis Eco-Power systems',
  description: 'Reliable solar power solutions for Nigerian homes and businesses',
}

export default function RootLayout({ children }) {
    const pathname = usePathname();
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
        <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-D0Y9HQYB11`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-D0Y9HQYB11', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className='container'>
        <Nav className="nav-container" />
        <main className='main-container'>{children}</main>
      
        {pathname !== "/404" && <Analyticss />}
        <Chatbot />
        <Footer className="footer-container" />
      </body>
    </html>
  )
}


