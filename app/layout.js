
// app/layout.js
import './globals.css'

import Script from "next/script";
import Nav from '../components/nav'
import Footer from '../components/footer'
import Chatbot from '@/components/chatbot'
// import {Analytics} from "@vercel/analytics"
// import { Analytics } from '@vercel/analytics/react'
import { Inter, Poppins } from "next/font/google";

import ClientAnalytics from '@/components/clientAnalytics';


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
  title: "Genesis Eco-Power Systems | Reliable Solar Energy in Nigeria",
  description:
    "Genesis Eco-Power Systems delivers affordable, reliable solar solutions for Nigerian homes and businesses. Explore inverters, batteries, and solar panels with expert installation.",
  keywords: [
    "solar energy Nigeria",
    "solar panels Nigeria",
    "inverters",
    "batteries",
    "renewable energy",
    "Genesis Eco-Power Systems",
  ],
  openGraph: {
    title: "Genesis Eco-Power Systems | Reliable Solar Energy in Nigeria",
    description:
      "Affordable and reliable solar solutions tailored for Nigerian homes and businesses. Let Genesis Eco-Power Systems power your future sustainably.",
    url: "https://ai-solar-app.vercel.app/",
    siteName: "Genesis Eco-Power Systems",
    images: [
      {
        url: "/image.png", // replace with an actual image in /public
        width: 1200,
        height: 630,
        alt: "Genesis Eco-Power Systems - Reliable Solar Energy in Nigeria",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Genesis Eco-Power Systems | Reliable Solar Energy in Nigeria",
    description:
      "Affordable, reliable solar systems for Nigerian homes and businesses. Explore inverters, batteries, and solar panels with expert installation.",
    images: ["/image.png"], // same as above
  },
};


export default function RootLayout({ children }) {

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
      
        <ClientAnalytics /> 
        <Chatbot />
        <Footer className="footer-container" />
      </body>
    </html>
  )
}


