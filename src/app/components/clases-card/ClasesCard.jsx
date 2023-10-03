import React from 'react'

import Image from 'next/image'
import { Playfair } from 'next/font/google'
import './ClasesCard.scss'

const playfair = Playfair({ subsets: ['latin'], weight: '400' })

function ClasesCard ({ title, imageSrc }) {
  return (
    <div className='Card'>
      <h3 className={`Card-title ${playfair.className}`}>{ title }</h3>

      <div className="Card-illustration">
        <Image
          className="Card-image"
          src={ imageSrc }
          alt={ title }
          width={ 1000 }
          height={ 1000 }
        />
      </div>
    </div>
  )
}
export default ClasesCard
