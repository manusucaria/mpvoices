import './globals.css'
import Navigation from './components/Navigation.js';
import Footer from './components/Footer.js';
import WaButton from './components/WaButton';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
  themeColor: '#175A34'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='flex flex-col h-screen mt-12 lg:mt-20'>
        <Navigation />
        <WaButton />
        {children}
        <Footer />
      </body>
    </html>
  )
}
