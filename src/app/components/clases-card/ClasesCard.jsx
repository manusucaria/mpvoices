import React from 'react'

import Image from 'next/image'
import './ClasesCard.scss'

function ClasesCard ({ title, imageSrc }) {
  return (
    <div className='Card'>
      <h3 className="Card-title">{ title }</h3>

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
