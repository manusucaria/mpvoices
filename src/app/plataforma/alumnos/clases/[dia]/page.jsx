'use client'

import React from 'react'

import { useParams } from 'next/navigation'

const page = () => {
  const { dia } = useParams()

  return (
    <div>Este es el dia {dia}</div>
  )
}
export default page
