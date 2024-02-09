'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import Wrapper from '../wrapper/Wrapper'
import { playfair600 } from '@/utils/fonts/fonts'

const HeaderPlataform = ({ title }) => {
  const router = useRouter()

  return (
    <div className="bg-black text-white w-full py-10 relative flex items-center justify-start">
    <div className="absolute top-0 left-0 w-full h-full">
      <Wrapper className="w-full h-full flex items-center justify-start">
        <button className="w-auto h-auto" onClick={() => router.back()}>
          <IconArrowLeft className="w-8 h-8" />
        </button>
      </Wrapper>
    </div>
    <h1
      className={`w-full text-3xl sm:text-5xl text-center ${playfair600.className}`}
    >
      {title}
    </h1>
  </div>
  )
}
export default HeaderPlataform

const IconArrowLeft = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15 6l-6 6l6 6" />
    </svg>
  )
}
