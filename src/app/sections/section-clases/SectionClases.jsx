import React from 'react'

import ClasesCard from '@/app/components/clases-card/ClasesCard'
import './SectionClases.scss'
import Link from 'next/link'

const getAllClases = async () => {
  const res = await fetch('http://localhost:3000/api/clases')
  const data = await res.json()
  return data
}

async function SectionClases () {
  const clases = await getAllClases()

  return (
    <section className='Clases'>
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
                  <ClasesCard key={clase.id} title={clase.nombre} imageSrc={''} />
                ))
              )
            : ''
        }
      </div>

      <Link className='Clases-link' href="">
        Quiero saber más
      </Link>
    </section>
  )
}
export default SectionClases
