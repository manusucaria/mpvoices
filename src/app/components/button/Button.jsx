import React from 'react'

import './Button.scss'
import Link from 'next/link'
import { openSans700 } from '@/utils/fonts/fonts'

function Button ({
  target,
  text,
  mode,
  alterColor,
  path,
  hasACallback,
  isFull = false,
  ...props
}) {
  return (
    <>
      {hasACallback
        ? (
        <button
          className={`Button ${mode && `Button-${mode}`} ${
            openSans700.className
          } ${alterColor ? 'Button-alter' : ''} ${isFull && 'Button-full'}`}
          {...props}
        >
          {text}
        </button>
          )
        : (
        <Link
          href={path}
          target={target && '_blank'}
          className={`Button ${mode && `Button-${mode}`} ${
            openSans700.className
          } ${alterColor ? 'Button-alter' : ''} ${isFull && 'Button-full'}`}
          {...props}
        >
          {text}
        </Link>
          )}
    </>
  )
}
export default Button
