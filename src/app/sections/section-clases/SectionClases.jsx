import React from 'react'

import ClasesCard from '@/app/components/clases-card/ClasesCard'
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
    <section id='Clases' className='Clases'>
      <Wrapper className="flex flex-col items-center">
        <h1 className='Clases-title'>Clases</h1>

        <ul className="Clases-ul">
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
