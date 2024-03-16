'use client'

import React from 'react'

import { playfair600 } from '@/utils/fonts/fonts'
import CardContainer from '../../components/CardContainer'
import ButtonReturn from '../../components/ButtonReturn'
import Button from '@/app/components/button/Button'

const page = () => {
  const handleCancelarClase = () => {
    console.log('cancelar clase')
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full py-10 text-center flex items-center justify-center relative">
        <ButtonReturn />
        <h2 className={`text-xl sm:text-2xl ${playfair600.className}`}>
          Cancelar clase
        </h2>
      </div>
      <CardContainer
        title="Seleccionar clase a cancelar"
        warning
        top
        button={
          <Button
            text="Cancelar clase"
            hasACallback
            onClick={handleCancelarClase}
          />
        }
      ></CardContainer>
    </div>
  )
}
export default page
