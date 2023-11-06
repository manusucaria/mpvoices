import React from 'react'

import ClasesCard from '@/app/components/clases-card/ClasesCard'
import { playfair400, openSans600, playfair600 } from '@/utils/fonts/fonts'
import './SectionClases.scss'
import Wrapper from '@/app/components/wrapper/Wrapper'
import Button from '@/app/components/button/Button'
import { handler } from '@/app/api/get-clases-data'

const getAllClases = async () => {
  const res = await handler()
  return res
}

async function SectionClases () {
  const clases = await getAllClases()

  return (
    <section id='Clases' className={`Clases ${playfair400.className}`}>
      <Wrapper className="flex flex-col items-center">
        <h1 className={`Clases-title ${playfair600.className}`}>Clases</h1>

        <ul className={`Clases-ul ${openSans600.className}`}>
          <li className="Clases-li">
            <p className="Clases-p">Personalizadas a medida</p>
          </li>
          <li className="Clases-li">
            <p className="Clases-p">Online o presenciales</p>
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

        <Button text="Quiero saber más" path='https://wa.me/5491133825678' />
      </Wrapper>
    </section>
  )
}
export default SectionClases
