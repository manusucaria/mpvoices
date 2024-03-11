import React from 'react'
import Button from '../components/button/Button'

export default function Unauthorized () {
  return (
    <div className="w-full min-h-screen flex items-center justify-center sm:px-6 lg:px-8">
      <div className="w-full flex flex-col items-center justify-center space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="/voices.svg"
            alt="Workflow"
          />
          <p className='text-center font-black text-5xl mt-6'>
            401
          </p>
          <h2 className="mt-6 text-center text-3xl">
            No autorizado
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            No tienes permiso para acceder a esta página.
          </p>
        </div>
        <Button text="Volver a la página principal" path="/" />
      </div>
    </div>
  )
}
