'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

const ButtonReturn = ({ idVisible = true }) => {
  const router = useRouter()

  if (!idVisible) return null

  return (
    <div className="absolute top-0 left-10 sm:left-1/4 md:left-1/3 h-full flex items-center">
      <button
        className="p-2 text-white hover:text-orange-600 flex items-center justify-center"
        onClick={() => router.back()}
      >
        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          fill="currentColor"
        >
          <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
        </svg>
      </button>
    </div>
  )
}
export default ButtonReturn
