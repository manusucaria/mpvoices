import React from 'react'

import Image from 'next/image'
import { Playfair, Open_Sans as OpenSans } from 'next/font/google'
import Button from '@/app/components/button/Button'
import Wrapper from '@/app/components/wrapper/Wrapper'

import './SectionNovedades.scss'

const playfair = Playfair({ subsets: ['latin'], weight: '400' })
const openSans = OpenSans({ subsets: ['latin'], weight: '500' })

function SectionNovedades () {
  return (
    <>
      <section className="Novedades">
        <Wrapper className="flex flex-col justify-center items-center gap-10">
          <h2 className={`Novedades-title ${playfair.className}`}>Novedades</h2>
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
          <p className={`Novedades-sub ${playfair.className}`}>Voices World</p>
          <p className={`Novedades-p ${openSans.className}`}>Te acompañamos con clases online donde estés, en cualquier parte del mundo</p>

          <Button text="Enterate en Instagram"/>
        </Wrapper>
      </section>

      <div className='News'>
        <Wrapper className="flex flex-col items-center justify-center gap-10">
          <p className='News-title'>¡Voices en movimiento!</p>

          <div className='News-images'>
            <div className="News-illustration">
              <Image
                className='News-image'
                src="/assets/static/mpvso.png"
                loading='lazy'
                alt='maríapeña voices simplemente orquesta'
                width={1000}
                height={1000}
              />
            </div>
            <div className="News-illustration">
              <Image
                className='News-image'
                src="/assets/static/mpvvi.png"
                loading='lazy'
                alt='maríapeña voices video'
                width={1000}
                height={1000}
              />
            </div>
          </div>
        </Wrapper>
      </div>
    </>
  )
}
export default SectionNovedades
