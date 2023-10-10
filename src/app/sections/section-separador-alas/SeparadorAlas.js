import React from 'react'
import Image from 'next/image'
import alas from '../../assets/alas.jpg'

const SeparadorAlas = () => {
  return (
    <div className='grid grid-cols-1 grid-rows-1 w-full'>
      <div className='col-start-1 col-end-1 row-start-1 row-end-1 m-auto z-40 flex flex-col'>
        <h2 className='text-lg md:text-2xl lg:text-3xl xl:text-5xl font-bold z-40 m-auto mb-2 lg:mb-4'>Voices le pone</h2>
        <h2 className='text-lg md:text-2xl lg:text-3xl xl:text-5xl font-bold z-40 m-auto'>alas a tu música</h2>
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
