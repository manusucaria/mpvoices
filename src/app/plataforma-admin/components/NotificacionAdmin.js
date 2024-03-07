import React, { useState } from 'react'
import { updateAlumno, fetchAlumno } from '../../api/api.js'

const NotificacionAdmin = ({ alumno, notification, setSelectedAlumno, notas, setNotification, setShowNotification }) => {
  const [editingNotes, setEditingNotes] = useState(false)
  const [newNote, setNewNote] = useState('')
  const [updatedNotas, setUpdatedNotas] = useState(alumno.Notas || [])

  const closeNotification = () => {
    setNotification([])
    setShowNotification(false)
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = async () => {
    if (newNote.trim() === '') {
      return
    }
    const updatedNotes = [...notas, newNote]
    await updateAlumno(alumno.id, { ...alumno, Notas: updatedNotes })
    const updatedAlumnoData = await fetchAlumno(alumno.id)
    setSelectedAlumno(updatedAlumnoData)
    setUpdatedNotas([...updatedNotas, newNote])
    setEditingNotes(false)
    setNewNote('')
  }

  const deleteNote = async (index) => {
    const updatedNotes = updatedNotas.filter((_, i) => i !== index)
    await updateAlumno(alumno.id, { ...alumno, Notas: updatedNotes })
    const updatedAlumnoData = await fetchAlumno(alumno.id)
    setSelectedAlumno(updatedAlumnoData)
    setUpdatedNotas(updatedNotes)
  }

  const toggleEditing = () => {
    setEditingNotes(!editingNotes)
  }

  return (
    <div>
      <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-[100]'>
        <div className='p-12 w-[90%] min-[490px]:w-4/6 md:w-3/6 lg:w-2/6 rounded-lg mx-auto flex flex-col bg-[#FFFFFF] border-1 border-[#0D0D0D]'>
          <svg className='cursor-pointer mx-auto mb-6' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.55 2.08L4.12 0.65C1.72 2.48 0.14 5.3 0 8.5H2C2.15 5.85 3.51 3.53 5.55 2.08ZM17.94 8.5H19.94C19.79 5.3 18.21 2.48 15.82 0.65L14.4 2.08C16.42 3.53 17.79 5.85 17.94 8.5ZM15.97 9C15.97 5.93 14.33 3.36 11.47 2.68V2C11.47 1.17 10.8 0.5 9.97 0.5C9.14 0.5 8.47 1.17 8.47 2V2.68C5.6 3.36 3.97 5.92 3.97 9V14L1.97 16V17H17.97V16L15.97 14V9ZM9.97 20C10.11 20 10.24 19.99 10.37 19.96C11.02 19.82 11.55 19.38 11.81 18.78C11.91 18.54 11.96 18.28 11.96 18H7.96C7.97 19.1 8.86 20 9.97 20Z" fill="#D0242A"/>
          </svg>
          <p className='text-[#0D0D0D] font-bold text-xl mx-auto mb-6'>Notificaciones</p>
          <div className='flex flex-col w-full mx-auto'>
            {notification.map((item, index) => (
              <div key={index} className='text-[#0D0D0D] font-bold mx-auto'>- {item}</div>
            ))}
          </div>
          <p className='text-[#0D0D0D] font-bold text-xl mx-auto my-6'>Notas</p>
          <div className='flex flex-col mx-auto w-full mb-6'>
            {updatedNotas.map((item, index) => (
              <div key={index} className='flex mx-auto gap-x-6'>
                <div className='text-[#0D0D0D] text-base my-auto'>- {item}</div>
                {editingNotes && <p className='text-[#E9500E] my-auto text-base font-bold md:hover:text-[#DB9B6D]' onClick={() => deleteNote(index)}>X</p>}
              </div>
            ))}
          </div>
          {editingNotes && (
            <div className='flex flex-col mx-auto mb-6'>
              <input className='text-[#0D0D0D] px-2 mb-4' type="text" value={newNote} onChange={handleNoteChange} placeholder="Ingrese una nueva nota" />
              <button className='text-[#E9500E] text-base font-bold md:hover:text-[#DB9B6D]' onClick={addNote}>Agregar Nota</button>
            </div>
          )}
          <div className='flex justify-center gap-x-12 mt-4'>
            <button className='text-[#E9500E] font-bold md:hover:text-[#DB9B6D]' onClick={toggleEditing}>
              {editingNotes ? 'Cancelar' : 'Editar Notas'}
            </button>
            <button className='text-[#E9500E] font-bold md:hover:text-[#DB9B6D]' onClick={closeNotification}>
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificacionAdmin
