import React, { useState } from 'react'
import EditorDatos from './EditorDatos'
import EditorClases from './EditorClases'
import EditorPagos from './EditorPagos'

const EditorAlumnos = ({ alumno, setSelectedAlumno, setSelectedProfesor, profesores }) => {
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
      <div className='flex flex-col w-full mx-auto'>
        <div className='w-full flex justify-center pb-6 sm:pb-8 mx-auto gap-x-4 sm:gap-x-6'>
          <div className="my-auto ml-auto pt-[0.5px] xl:pt-1">
            <svg className='hover:cursor-pointer stroke-white md:hover:stroke-orange-300' onClick={() => volver()} width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="iconamoon:arrow-up-2-light">
                <path id="Vector" d="M19.8333 9.22572L12.75 15.8155L19.8333 22.4053" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
            </svg>
          </div>
          <h3 className="text-white my-auto text-xl sm:text-2xl">Alumno</h3>
          <p className='my-auto'>|</p>
          <p className='text-orange-300 my-auto md:mt-1 text-xl sm:text-2xl mr-auto'>{alumno?.usuario.full_name.nombre} {alumno?.usuario.full_name.apellido}</p>
        </div>
        <div className='flex justify-between w-full mx-auto bg-black px-4 sm:px-8 py-8'>
          <div className={`w-2/6 border-b-1 ${tab === 'datos' ? 'border-b-orange-300' : 'border-b-white'}`}>
            <button
              className={`font-botones font-bold py-2 mr-4 ${tab === 'datos' ? '' : 'hover:text-orange-300'} rounded-t-lg ${tab === 'datos' ? 'text-orange-300' : 'text-white'}`}
              onClick={() => handleTabChange('datos')}
            >
              Datos
            </button>
          </div>
          <div className={`w-2/6 border-b-1 ${tab === 'clases' ? 'border-b-orange-300' : 'border-b-white'}`}>
            <button
              className={`font-botones font-bold py-2 ${tab === 'clases' ? '' : 'hover:text-orange-300'} rounded-t-lg ${tab === 'clases' ? 'text-orange-300' : 'text-white'}`}
              onClick={() => handleTabChange('clases')}
            >
              Clases
            </button>
          </div>
          <div className={`w-2/6 border-b-1 ${tab === 'pagos' ? 'border-b-orange-300' : 'border-b-white'}`}>
            <button
              className={`font-botones font-bold py-2 ${tab === 'pagos' ? '' : 'hover:text-orange-300'} rounded-t-lg ${tab === 'pagos' ? 'text-orange-300' : 'text-white'}`}
              onClick={() => handleTabChange('pagos')}
            >
              Pagos
            </button>
          </div>
        </div>
      </div>
      <div className=''>
        {tab === 'datos' && <EditorDatos alumno={alumno} setSelectedAlumno={setSelectedAlumno} />}
        {tab === 'clases' && <EditorClases profesores={profesores} alumno={alumno} setSelectedAlumno={setSelectedAlumno} />}
        {tab === 'pagos' && <EditorPagos alumno={alumno} setSelectedAlumno={setSelectedAlumno} />}
      </div>
    </div>
  )
}

export default EditorAlumnos
