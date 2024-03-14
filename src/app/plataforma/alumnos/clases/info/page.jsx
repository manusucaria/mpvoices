import React from 'react'

import Wrapper from '@/app/components/wrapper/Wrapper'
import HeaderPlataform from '@/app/components/header-plataform/HeaderPlataform'

const Page = () => {
  return (
    <section className="bg-white text-black w-full">
      <HeaderPlataform title="Información clases" />
      <Wrapper className="flex flex-col items-center h-screen"></Wrapper>
    </section>
  )
}
export default Page
