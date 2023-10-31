'use client'
import React from 'react'

import NavSmall from './navigation/NavSmall'
import NavFull from './navigation/NavFull'

export default function Header () {
  return (
    <header className="z-50">
      <NavFull />
      <NavSmall />
    </header>
  )
}
