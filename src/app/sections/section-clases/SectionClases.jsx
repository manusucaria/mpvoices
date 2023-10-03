import React from 'react'

import ClasesCard from '@/app/components/clases-card/ClasesCard'
import { Playfair, Open_Sans as OpenSans } from 'next/font/google'
import './SectionClases.scss'
import Wrapper from '@/app/components/wrapper/Wrapper'
import Button from '@/app/components/button/Button'
import { handler } from '@/app/api/get-clases-data'

export const playfair = Playfair({ subsets: ['latin'], weight: '400' })
export const openSans = OpenSans({ subsets: ['latin'], weight: '400' })

const getAllClases = async () => {
  const res = await handler()
  return res
}

async function SectionClases () {
  const clases = await getAllClases()

  return (
    <section id='Clases' className={`Clases ${playfair.className}`}>
      <Wrapper className="flex flex-col items-center">
        <h1 className='Clases-title'>Clases</h1>

        <ul className={`Clases-ul ${openSans.className}`}>
          <li className="Clases-li">
            <p className="Clases-p">Personalizadas a medida.</p>
          </li>
          <li className="Clases-li">
            <p className="Clases-p">Online o presenciales.</p>
          </li>
        </ul>

        <div className="Clases-container">
          {
            clases.lenght !== 0
              ? (
                  clases.map((clase) => (
                    <ClasesCard key={clase.id} title={clase.nombre} imageSrc={clase.imagen} />
                  ))
                )
              : ''
          }
        </div>

        <Button text="Quiero saber más" />
      </Wrapper>
    </section>
  )
}
export default SectionClases
