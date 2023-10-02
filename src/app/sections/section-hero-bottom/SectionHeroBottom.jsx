import React from 'react'

import Image from 'next/image'

import './SectionHeroBottom.scss'

function SectionHeroBottom () {
  return (
    <div className='Hero'>
      <Image
        className='Hero-image'
        src='/assets/static/hero-bottom.png'
        alt='hero-bottom'
        loading='lazy'
        width={1000}
        height={1000}
      />
      <div className="Hero-gradient">
        <div className="Hero-gradient--content"></div>
      </div>
    </div>
  )
}
export default SectionHeroBottom
