import React from 'react'

import { Open_Sans as OpenSans } from 'next/font/google'
import './Button.scss'

const openSans = OpenSans({ subsets: ['latin'], weight: '800' })

function Button ({ text, mode }) {
  return (
    <button className={`Button Button-${mode} ${openSans.className}`}>{ text }</button>
  )
}
export default Button
