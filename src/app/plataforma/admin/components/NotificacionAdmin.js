import React, { useState } from 'react'

import { updateAlumno, fetchAlumno } from '@/app/api/api'

const NotificacionAdmin = ({ alumno, notification, setSelectedAlumno, setNotification, setShowNotification }) => {
  const [editingNotes, setEditingNotes] = useState(false)
  const [newNote, setNewNote] = useState('')
  const [localNotas, setLocalNotas] = useState(alumno.Notas || [])
  const [previousNotas, setPreviousNotas] = useState([])

  const closeNotification = () => {
    setNotification([])
    setShowNotification(false)
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNoteLocally = () => {
    if (newNote.trim() === '') {
      return
    }
    const updatedLocalNotes = [...localNotas, newNote]
    setLocalNotas(updatedLocalNotes)
    setNewNote('')
  }

  const deleteNoteLocally = (index) => {
    const updatedLocalNotes = [...localNotas]
    updatedLocalNotes.splice(index, 1)
    setLocalNotas(updatedLocalNotes)
  }

  const toggleEditing = () => {
    if (editingNotes) {
      setLocalNotas(previousNotas)
    } else {
      setPreviousNotas(localNotas)
    }
    setEditingNotes(!editingNotes)
  }

  const updateNotes = async () => {
    await updateAlumno(alumno.id, { ...alumno, Notas: localNotas })
    const updatedAlumnoData = await fetchAlumno(alumno.id)
    setSelectedAlumno(updatedAlumnoData)
    setEditingNotes(false)
  }

  return (
    <div>
      <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-[100]'>
        <div className='p-12 w-[90%] min-[490px]:w-4/6 md:w-3/6 lg:w-2/6 rounded-lg mx-auto flex flex-col bg-[#FFFFFF] border-1 border-[#0D0D0D]'>
          <p className='text-[#0D0D0D] font-bold text-xl mx-auto mb-6'>Notificaciones</p>
          <div className='flex flex-col w-full mx-auto'>
            {notification.map((item, index) => (
              <div key={index} className='text-[#0D0D0D] font-bold mx-auto'>- {item}</div>
            ))}
          </div>
          <p className='text-[#0D0D0D] font-bold text-xl mx-auto my-6'>Notas</p>
          <div className='flex flex-col mx-auto w-full mb-6'>
            {localNotas.map((item, index) => (
              <div key={index} className='flex mx-auto gap-x-6 mb-2'>
                {editingNotes
                  ? (
                  <input
                    className='text-[#0D0D0D] px-2'
                    type="text"
                    value={localNotas[index]}
                    onChange={(event) => {
                      const updatedLocalNotes = [...localNotas]
                      updatedLocalNotes[index] = event.target.value
                      setLocalNotas(updatedLocalNotes)
                    }}
                  />
                    )
                  : (
                  <div className='text-[#0D0D0D] text-base my-auto'>- {item}</div>
                    )}
                {editingNotes && (
                  <p className='text-[#E9500E] md:cursor-pointer my-auto text-base font-bold md:hover:text-[#DB9B6D]' onClick={() => deleteNoteLocally(index)}>X</p>
                )}
              </div>
            ))}
          </div>
          {editingNotes && (
            <div className='flex flex-col mx-auto mb-6'>
              <input className='text-[#0D0D0D] px-2 mb-4' type="text" value={newNote} onChange={handleNoteChange} placeholder="Ingrese una nueva nota" />
              <button className='text-[#E9500E] text-base font-bold md:hover:text-[#DB9B6D]' onClick={addNoteLocally}>Agregar Nota</button>
            </div>
          )}
          <div className='flex justify-center gap-x-12 mt-4'>
            {editingNotes && (
              <>
                <button className='text-[#E9500E] font-bold md:hover:text-[#DB9B6D]' onClick={toggleEditing}>
                  Cancelar
                </button>
                <button className='text-[#E9500E] font-bold md:hover:text-[#DB9B6D]' onClick={updateNotes}>
                  Guardar
                </button>
              </>
            )}
            {!editingNotes && (
              <>
                <button className='text-[#E9500E] font-bold md:hover:text-[#DB9B6D]' onClick={toggleEditing}>
                  Editar Notas
                </button>
                <button className='text-[#E9500E] font-bold md:hover:text-[#DB9B6D]' onClick={closeNotification}>
                  Entendido
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificacionAdmin
