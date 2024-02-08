import React, { useState } from 'react'
import EditorDatos from './EditorDatos'
import EditorClases from './EditorClases'
import EditorPagos from './EditorPagos'

const EditorAlumnos = ({ alumno, setSelectedAlumno, setSelectedProfesor }) => {
  const [tab, setTab] = useState('datos')

  const handleTabChange = (tabName) => {
    setTab(tabName)
  }

  const volver = () => {
    setSelectedAlumno(false)
    setSelectedProfesor(false)
  }

  return (
    <div className='w-full'>
      <div className='flex flex-col w-full mx-auto mb-8'>
        <div className='w-full flex justify-center mx-auto mb-6 gap-x-4 sm:gap-x-6'>
          <div className="my-auto ml-auto">
            <svg className='hover:cursor-pointer' onClick={() => volver()} width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="iconamoon:arrow-up-2-light">
              <path id="Vector" d="M19.8333 9.22572L12.75 15.8155L19.8333 22.4053" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
            </svg>
          </div>
          <h3 className="text-[#FFFFFF] my-auto text-xl sm:text-2xl">Alumno</h3>
          <p className='my-auto'>|</p>
          <p className='text-[#E9500E] my-auto mt-1 md:mt-2 text-lg mr-auto'>{alumno.Nombre} {alumno.Apellido}</p>
        </div>
        <div className='flex justify-between w-full mx-auto mb-4'>
          <div className={`w-2/6 border-b-1 ${tab === 'datos' ? 'border-b-orange-300' : 'border-b-[#FFFFFF]'}`}>
            <button
              className={`font-botones font-bold py-2 mr-4 rounded-t-lg ${tab === 'datos' ? 'text-orange-300' : 'text-[#FFFFFF]'}`}
              onClick={() => handleTabChange('datos')}
            >
              Datos
            </button>
          </div>
          <div className={`w-2/6 border-b-1 ${tab === 'clases' ? 'border-b-orange-300' : 'border-b-[#FFFFFF]'}`}>
            <button
              className={`font-botones font-bold py-2 rounded-t-lg ${tab === 'clases' ? 'text-orange-300' : 'text-[#FFFFFF]'}`}
              onClick={() => handleTabChange('clases')}
            >
              Clases
            </button>
          </div>
          <div className={`w-2/6 border-b-1 ${tab === 'pagos' ? 'border-b-orange-300' : 'border-b-[#FFFFFF]'}`}>
            <button
              className={`font-botones font-bold py-2 rounded-t-lg ${tab === 'pagos' ? 'text-orange-300' : 'text-[#FFFFFF]'}`}
              onClick={() => handleTabChange('pagos')}
            >
              Pagos
            </button>
          </div>
        </div>

      </div>
      <div className='mt-4'>
        {tab === 'datos' && <EditorDatos alumno={alumno} />}
        {tab === 'clases' && <EditorClases alumno={alumno} />}
        {tab === 'pagos' && <EditorPagos alumno={alumno} />}
      </div>
    </div>
  )
}

export default EditorAlumnos
