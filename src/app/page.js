import React from 'react'
import SectionClases from './sections/section-clases/SectionClases'
import SectionTalleres from './sections/section-talleres/SectionTalleres'
import SectionNuevosProyectos from './sections/section-nuevos-proyectos/SectionNuevosProyectos'
import SectionNovedades from './sections/section-novedades/SectionNovedades'
import SectionHeroBottom from './sections/section-hero-bottom/SectionHeroBottom'

export default async function Home () {
  return (
    <main>
      <SectionTalleres />
      <SectionClases />
      <SectionNuevosProyectos />
      <SectionHeroBottom />
      <SectionNovedades />
    </main>
  )
}
