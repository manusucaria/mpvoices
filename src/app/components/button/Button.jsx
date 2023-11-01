import React from 'react'

import './Button.scss'
import Link from 'next/link'
import { openSans700 } from '@/utils/fonts/fonts'

function Button ({ text, mode, alterColor, path }) {
  return <Link href={path} target='_blank' className={`Button ${mode ? `Button-${mode}` : ''} ${openSans700.className} ${alterColor ? 'Button-alter' : ''}`}>{ text }</Link>
}
export default Button
