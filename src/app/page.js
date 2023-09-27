import React from 'react'
import SectionClases from './sections/section-clases/SectionClases'
import SectionTalleres from './sections/section-talleres/SectionTalleres'

export default async function Home () {
  return (
    <main>
      <SectionTalleres />
      <SectionClases />
    </main>
  )
}
