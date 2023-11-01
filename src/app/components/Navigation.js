'use client'
import React from 'react'

import NavSmall from './navbar/NavSmall'
import NavFull from './navbar/NavFull'

export default function Header () {
  return (
    <header className="z-50">
      <NavFull />
      <NavSmall />
    </header>
  )
}
