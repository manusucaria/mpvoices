import React from 'react'

import Image from 'next/image'
import { Playfair } from 'next/font/google'
import './ClasesCard.scss'

const playfair = Playfair({ subsets: ['latin'], weight: '400' })

function ClasesCard ({ title, imageSrc }) {
  return (
    <div className='Card relative'>
      <h3 className={`Card-title ${playfair.className}`}>{ title }</h3>

      <div className="Card-illustration">
        <Image
          className="Card-image"
          src={ imageSrc }
          alt={ title }
          width={ 1000 }
          height={ 1000 }
        />
        <span className="absolute bottom-14 left-0 w-full border border-b-orange-600"></span>
      </div>
    </div>
  )
}
export default ClasesCard
