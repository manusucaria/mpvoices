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
      <div className='flex justify-between w-full mx-auto mb-8 '>
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
      <div className='mt-4'>
        {tab === 'datos' && <EditorDatos alumno={alumno} />}
        {tab === 'clases' && <EditorClases alumno={alumno} />}
        {tab === 'pagos' && <EditorPagos alumno={alumno} />}
      </div>
    </div>
  )
}

export default EditorAlumnos
