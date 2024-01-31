import React, { useState } from 'react'
import EditorDatos from './EditorDatos'
import EditorClases from './EditorClases'
import EditorPagos from './EditorPagos'

const EditorAlumnos = ({ alumno }) => {
  const [tab, setTab] = useState('datos')

  const handleTabChange = (tabName) => {
    setTab(tabName)
  }

  return (
    <div className='w-full'>
      <div className='flex justify-between w-4/6 mx-auto mb-8'>
        <button
          className={`py-2 mr-4 rounded-t-lg ${tab === 'datos' ? 'text-orange-300' : 'text-white'}`}
          onClick={() => handleTabChange('datos')}
        >
          Datos
        </button>
        <button
          className={`py-2 mx-4 rounded-t-lg ${tab === 'clases' ? 'text-orange-300' : 'text-white'}`}
          onClick={() => handleTabChange('clases')}
        >
          Clases
        </button>
        <button
          className={`py-2 ml-4 rounded-t-lg ${tab === 'pagos' ? 'text-orange-300' : 'text-white'}`}
          onClick={() => handleTabChange('pagos')}
        >
          Pagos
        </button>
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
