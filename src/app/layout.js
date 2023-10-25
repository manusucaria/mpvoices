import React from 'react'
import './globals.css'
import './globals.scss'
import Navigation from './components/Navigation.js'
import Footer from './components/Footer.js'
import WaButton from './components/WaButton'

export const metadata = {
  title: 'MP Voices',
  description: 'Maria Peña Voices',
  themeColor: '#0D0D0D'
}

export default function RootLayout ({ children }) {
  return (
    <html>
      <head>
        <link rel="shortcut icon" href="/voices.svg" type="image/x-icon" />
      </head>
      <body className="flex flex-col min-h-screen mt-[3rem] lg:mt-[6rem]">
        <Navigation />
        <WaButton />
        {children}
        <Footer />
      </body>
    </html>

  )
}
