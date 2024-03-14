import React from 'react'

import HeaderPlataform from '@/app/components/header-plataform/HeaderPlataform'
import Wrapper from '@/app/components/wrapper/Wrapper'

const Page = () => {
  return (
    <section className="bg-white text-black w-full">
      <HeaderPlataform title="Reprogramar clases" />
      <Wrapper className="flex flex-col items-center h-screen"></Wrapper>
    </section>
  )
}
export default Page
