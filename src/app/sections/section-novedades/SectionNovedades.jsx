import React from 'react'

import './SectionNovedades.scss'
import Image from 'next/image'
import Button from '@/app/components/button/Button'
import Wrapper from '@/app/components/wrapper/Wrapper'

function SectionNovedades () {
  return (
    <section className="Novedades">
      <Wrapper className="flex flex-col justify-center items-center gap-10">
        <h2 className="Novedades-title">Novedades</h2>
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
        <p className="Novedades-sub">Voices World</p>
        <p className="Novedades-p">Te acompañamos con clases online donde estés, en cualquier parte del mundo</p>

        <Button text="Enterate en Instagram"/>
      </Wrapper>
    </section>
  )
}
export default SectionNovedades
