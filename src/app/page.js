import React from 'react'
import Wrapper from './components/wrapper/Wrapper'
import SectionClases from './sections/section-clases/SectionClases'

export default async function Home () {
  return (
    <main>
      <Wrapper>
        <SectionClases />
      </Wrapper>
    </main>
  )
}
