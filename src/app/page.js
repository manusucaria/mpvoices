import React from 'react'
import SectionClases from './sections/section-clases/SectionClases'
import SectionTalleres from './sections/section-talleres/SectionTalleres'
import SectionNuevosProyectos from './sections/section-nuevos-proyectos/SectionNuevosProyectos'
import SectionNovedades from './sections/section-novedades/SectionNovedades'

export default async function Home () {
  return (
    <main>
      <SectionTalleres />
      <SectionClases />
      <SectionNuevosProyectos />
      <SectionNovedades />
    </main>
  )
}
