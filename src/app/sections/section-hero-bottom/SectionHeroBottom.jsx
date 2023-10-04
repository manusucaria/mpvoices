'use client'
import React from 'react'

import { v4 as uuidv4 } from 'uuid'
import Image from 'next/image'
import './SectionHeroBottom.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const images = [
  {
    id: uuidv4(),
    src: '/assets/static/slide/Imagen1Bottom-Desktop.jpg',
    alt: 'Imagen 1',
    isVisible: false
  },
  {
    id: uuidv4(),
    src: '/assets/static/slide/Imagen2Bottom-Desktop.jpg',
    alt: 'Imagen 2',
    isVisible: false
  },
  {
    id: uuidv4(),
    src: '/assets/static/slide/Imagen3Bottom-Desktop.jpg',
    alt: 'Imagen 3',
    isVisible: false
  }
]

function SectionHeroBottom () {
  return (
    <div className='Hero'>
    <Swiper
        spaceBetween={30}
        effect="fade"
        loop="true"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}
        modules={[EffectFade, Autoplay]}
        className="mySwiper"
    >
      {
        images.map((image) => (
          <SwiperSlide
            key={image.id}
          >
            <Image
              src={image.src}
              alt={image.alt}
              className='Hero-img'
              loading='lazy'
              width={1000}
              height={1000}
            />
          </SwiperSlide>
        ))
      }
    </Swiper>
    </div>
  )
}
export default SectionHeroBottom
