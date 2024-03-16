import React from 'react'

import Image from 'next/image'

import alasImg from '@/app/assets/alas.jpg'

const page = () => {
  return (
    <>
      <Image
        src={alasImg}
        width="auto"
        height="auto"
        alt="Separador alas voices"
        priority
        objectFit="contain"
      />
    </>
  )
}
export default page
