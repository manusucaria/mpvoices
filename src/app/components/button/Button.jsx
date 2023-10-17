import React from 'react'

import { Open_Sans as OpenSans } from 'next/font/google'
import './Button.scss'

const openSans = OpenSans({ subsets: ['latin'], weight: '700' })

function Button ({ text, mode, alterColor }) {
  return (
    <>
      <button className={`Button Button-${mode} ${openSans.className} ${alterColor ? 'Button-alter' : ''}`}>{ text }</button>
    </>
  )
}
export default Button
