import React from 'react'

import Image from 'next/image'
import './ClasesCard.scss'
import { playfair700 } from '@/utils/fonts/fonts'

function ClasesCard ({ title, imageSrc }) {
  return (
    <div className='Card relative'>
      <h3 className={`Card-title ${playfair700.className}`}>{ title }</h3>

      <div className="Card-illustration">
        <Image
          className="Card-image"
          src={ imageSrc }
          alt={ title }
          width={ 1000 }
          height={ 1000 }
        />
        <span className="absolute bottom-10 left-0 w-full border border-b-orange-600"></span>
      </div>
    </div>
  )
}
export default ClasesCard
