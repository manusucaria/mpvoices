import React from 'react'
import SectionClases from './sections/section-clases/SectionClases'
import SectionTalleres from './sections/section-talleres/SectionTalleres'
import SectionNuevosProyectos from './sections/section-nuevos-proyectos/SectionNuevosProyectos'
import SectionNovedades from './sections/section-novedades/SectionNovedades'
import SectionHeroBottom from './sections/section-hero-bottom/SectionHeroBottom'
import SectionMaps from './sections/section-maps/SectionMaps'
import SectionHero from './sections/section-hero/Hero'
import SectionEspacioVoices from './sections/section-espacio-voices/SectionEspacioVoices'
import SectionMariaPeña from './sections/section-maria-peña/SectionMariaPeña'
import SectionSeparadorVoices from './sections/section-separador-voices/SeparadorVoices'
import SectionSeparadorAlas from './sections/section-separador-alas/SeparadorAlas'
import SectionInsta from './sections/section-insta/SectionInsta'

export default function Home () {
  return (
    <main>
      <SectionHero />
      <SectionEspacioVoices />
      <SectionMariaPeña />
      <SectionSeparadorVoices />
      <SectionSeparadorAlas />
      <SectionTalleres />
      <SectionClases />
      <SectionNuevosProyectos />
      <SectionHeroBottom />
      <SectionNovedades />
      <SectionInsta />
      <SectionMaps />
    </main>
  )
}
