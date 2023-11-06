import React from 'react'
import Image from 'next/image'
import alas from '../../assets/alas.jpg'
import { playfair600 } from '@/utils/fonts/fonts'

const SeparadorAlas = () => {
  return (
    <div className='grid grid-cols-1 grid-rows-1 w-auto h-auto'>
      <div className='bg-black col-start-1 col-end-1 row-start-1 row-end-1 z-40 border-2 lg:border-4 border-white opacity-30 h-[90%] w-[90%] m-auto'></div>
      <div className={`col-start-1 col-end-1 row-start-1 row-end-1 m-auto z-40 flex flex-col ${playfair600.className}`}>
        <h2 className='text-3xl xl:text-5xl z-40 m-auto mb-2 lg:mb-4'>Voices le pone</h2>
        <h2 className='text-3xl xl:text-5xl z-40 m-auto'>alas a tu música</h2>
      </div>
      <Image
        width={500}
        height={500}
        className='col-start-1 col-end-1 row-start-1 row-end-1 w-full h-full'
        src={alas}
        alt="Separador Alas"
        priority
      />
    </div>
  )
}

export default SeparadorAlas
