import React from 'react'

import { Open_Sans as OpenSans } from 'next/font/google'
import './Button.scss'
import Link from 'next/link'

const openSans = OpenSans({ subsets: ['latin'], weight: '700' })

function Button ({ text, mode, alterColor, path }) {
  return (
    <>
      <Link href={path} target='_blank' className={`Button Button-${mode} ${openSans.className} ${alterColor ? 'Button-alter' : ''}`}>{ text }</Link>
    </>
  )
}
export default Button
