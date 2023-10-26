import React from 'react'

import Image from 'next/image'
import { playfair700, openSans600, playfair400 } from '@/utils/fonts/fonts'
import Button from '@/app/components/button/Button'
import Wrapper from '@/app/components/wrapper/Wrapper'

import './SectionNovedades.scss'

function SectionNovedades () {
  return (
    <>
      <section className="Novedades">
        <Wrapper className="flex flex-col justify-center items-center gap-5">
          <h2 className={`Novedades-title ${playfair700.className}`}>Novedades</h2>
          <div className="Novedades-ilustration">
            <Image
              className="Novedades-image"
              src="/assets/static/Voices_World-c1.png"
              loading='lazy'
              alt='maríapeña voices world'
              width={1000}
              height={1000}
            />
          </div>
          <p className={`Novedades-sub ${playfair400.className} text-2xl`}>Voices World</p>
          <p className={`Novedades-p ${openSans600.className}`}>Te acompañamos con clases online donde estés, en cualquier parte del mundo</p>

          <Button text="Enterate en Instagram" path='https://www.instagram.com/voicesworld/' />
        </Wrapper>
      </section>
    </>
  )
}
export default SectionNovedades
