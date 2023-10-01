import './globals.css'
import Navigation from './components/Navigation.js';
import Footer from './components/Footer.js';
import WaButton from './components/WaButton';

export const metadata = {
  title: 'MP Voices',
  description: 'Maria Peña Voices',
  themeColor: '#0D0D0D'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='flex flex-col h-screen mt-[3rem] lg:mt-[6rem]'>
        <Navigation />
        <WaButton />
        {children}
        <Footer />
      </body>
    </html>
  )
}
