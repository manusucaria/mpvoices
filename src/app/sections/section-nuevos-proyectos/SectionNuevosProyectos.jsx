import React from 'react'

import { v4 as uuidv4 } from 'uuid'
import './SectionNuevosProyectos.scss'
import Wrapper from '@/app/components/wrapper/Wrapper'
import Button from '@/app/components/button/Button'

const projects = [
  {
    id: uuidv4(),
    name: 'Taller de interpretación y puesta en escena.'
  },
  {
    id: uuidv4(),
    name: 'Taller de sonido en vivo.'
  },
  {
    id: uuidv4(),
    name: 'Curso de formación de profesores.'
  },
  {
    id: uuidv4(),
    name: 'Festejo de cumpleaños musicales.'
  },
  {
    id: uuidv4(),
    name: 'Regalar vouchers de clases.'
  }
]

function SectionNuevosProyectos () {
  return (
    <section className="Projects" id='NuevosProyectos'>
      <Wrapper className="flex flex-col justify-center items-center gap-16">
        <h2 className="Projects-title">Nuevos Proyectos</h2>
        <ul className="Projects-ul">
          {
            projects.map((project, i) => (
              <li key={project.id} className='Projects-li'>
                <div className='Projects-circle'>
                  { i + 1 }
                </div>
                <p className='w-64 font-serif text-2xl'>
                  { project.name }
                </p>
              </li>
            ))
          }
        </ul>
        <Button text="Más información" mode="light"/>
      </Wrapper>
    </section>

  )
}
export default SectionNuevosProyectos
