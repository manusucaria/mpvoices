import React from 'react'

import Wrapper from '@/app/components/wrapper/Wrapper'
import { playfair600 } from '@/utils/fonts/fonts'

import './SectionTalleres.scss'

function SectionTalleres () {
  return (
    <section className="Talleres">
      <Wrapper className={`flex flex-col items-center gap-6 sm:gap-12 ${playfair600.className}`}>
        <div className="Talleres-h3 flex flex-col">
          <h2>Talleres de ensamble </h2>
          <h2>para tocar con otros alumnos</h2>
        </div>
        <div className='bg-white w-20 sm:w-36 h-0.5'></div>
          <h2 className="Talleres-h3 flex flex-col">
            Presentaciones en vivo
          </h2>
        <div className='bg-white w-20 sm:w-36 h-0.5'></div>
        <div className="Talleres-h3 flex flex-col">
          <h2>Grabaciones en estudio </h2>
          <h2>profesional</h2>
        </div>
      </Wrapper>
    </section>
  )
}
export default SectionTalleres
