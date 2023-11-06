import React from 'react'

import Wrapper from '@/app/components/wrapper/Wrapper'
import { playfair600 } from '@/utils/fonts/fonts'

import './SectionTalleres.scss'

function SectionTalleres () {
  return (
    <section className="Talleres">
      <Wrapper className={`flex flex-col items-center gap-6 sm:gap-12 ${playfair600.className}`}>
        <h3 className="Talleres-h3 flex flex-col">
          <span>Talleres de ensamble </span>
          <span>para tocar con otros alumnos</span>
        </h3>
        <div className='bg-white w-20 sm:w-36 h-0.5'></div>
        <h3 className="Talleres-h3 flex flex-col">
          Presentaciones en vivo
        </h3>
        <div className='bg-white w-20 sm:w-36 h-0.5'></div>
        <h3 className="Talleres-h3 flex flex-col">
        <span>Grabaciones en estudio </span>
        <span>profesional</span>
        </h3>
      </Wrapper>
    </section>
  )
}
export default SectionTalleres
