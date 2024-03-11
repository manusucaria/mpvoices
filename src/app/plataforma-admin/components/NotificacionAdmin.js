import React, { useState } from 'react'
import { updateAlumno, fetchAlumno } from '../../api/api.js'

const NotificacionAdmin = ({ alumno, notification, setSelectedAlumno, setNotification, setShowNotification }) => {
  const [editingNotes, setEditingNotes] = useState(false)
  const [newNote, setNewNote] = useState('')
  const [localNotas, setLocalNotas] = useState(alumno.Notas || [])
  const [previousNotas, setPreviousNotas] = useState([])
  const [showingNotifications, setShowingNotifications] = useState(true)

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

  const toggleView = () => {
    setShowingNotifications(!showingNotifications)
  }

  return (
      <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[#0D0D0D] bg-opacity-30 z-[100]'>
          {showingNotifications
            ? <div className='p-12 h-auto w-[90%] min-[490px]:w-4/6 md:w-3/6 lg:w-2/6 rounded-lg mx-auto flex flex-col bg-[#FFFFFF] border-1 border-[#0D0D0D]'>
              <svg className='mx-auto mb-4 w-6 h-6' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.55 2.08L4.12 0.65C1.72 2.48 0.14 5.3 0 8.5H2C2.15 5.85 3.51 3.53 5.55 2.08ZM17.94 8.5H19.94C19.79 5.3 18.21 2.48 15.82 0.65L14.4 2.08C16.42 3.53 17.79 5.85 17.94 8.5ZM15.97 9C15.97 5.93 14.33 3.36 11.47 2.68V2C11.47 1.17 10.8 0.5 9.97 0.5C9.14 0.5 8.47 1.17 8.47 2V2.68C5.6 3.36 3.97 5.92 3.97 9V14L1.97 16V17H17.97V16L15.97 14V9ZM9.97 20C10.11 20 10.24 19.99 10.37 19.96C11.02 19.82 11.55 19.38 11.81 18.78C11.91 18.54 11.96 18.28 11.96 18H7.96C7.97 19.1 8.86 20 9.97 20Z" fill="#D0242A"/>
              </svg>
            <p className='text-[#0D0D0D] font-bold text-xl mx-auto mb-8'>Notificaciones</p>
            <div className='flex flex-col w-full mx-auto gap-y-2'>
              {notification.map((item, index) => (
                <div key={index} className='text-[#0D0D0D] font-bold mx-auto'>- {item}</div>
              ))}
            </div>
            <div className='flex justify-center gap-x-8 mt-8'>
              <button className='text-[#E9500E] font-bold md:hover:text-[#DB9B6D]' onClick={toggleView}>
                Ver notas
              </button>
              <button className='text-[#E9500E] font-bold md:hover:text-[#DB9B6D]' onClick={closeNotification}>
                Salir
              </button>
            </div>
          </div>
            : <div className='p-12 h-auto w-[90%] min-[490px]:w-4/6 md:w-3/6 lg:w-2/6 rounded-lg mx-auto flex flex-col bg-[#FFFFFF] border-1 border-[#0D0D0D]'>
              <svg className='mx-auto mb-4 w-6 h-6' width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="icon-45-note-list" fill="#000000">
                        <path d="M21.5,28 L7.00010618,28 C5.89547804,28 5,27.0983727 5,25.9991358 L5,7.00086422 C5,5.89581743 5.90162726,5 7.00086422,5 L25.9991358,5 C27.1041826,5 28,5.89451376 28,6.99406028 L28,20.5 L28,21 L22,28 L21.5,28 L21.5,28 L21.5,28 Z M6,11 L6,26.0012539 C6,26.5613852 6.45106594,27 7.00748397,27 L21,27 L21,22.0059191 C21,20.8865548 21.8944962,20 22.9979131,20 L27,20 L27,11 L6,11 L6,11 L6,11 Z M6,10 L6,6.99874609 C6,6.44715386 6.43861485,6 6.99874609,6 L26.0012539,6 C26.5528461,6 27,6.44994876 27,7.00684547 L27,10 L6,10 L6,10 Z M22,26.5 L22,22.0087848 C22,21.4516483 22.4506511,21 22.9967388,21 L26.6999512,21 L22,26.5 L22,26.5 Z M13,18 L13,19 L20,19 L20,18 L13,18 L13,18 Z M8,17 L8,20 L11,20 L11,17 L8,17 L8,17 Z M9,18 L9,19 L10,19 L10,18 L9,18 L9,18 Z M13,14 L13,15 L25,15 L25,14 L13,14 L13,14 Z M8,13 L8,16 L11,16 L11,13 L8,13 L8,13 Z M9,14 L9,15 L10,15 L10,14 L9,14 L9,14 Z M13,22 L13,23 L19,23 L19,22 L13,22 L13,22 Z M8,21 L8,24 L11,24 L11,21 L8,21 L8,21 Z M9,22 L9,23 L10,23 L10,22 L9,22 L9,22 Z" id="note-list" fill="#D0242A"></path>
                    </g>
                </g>
            </svg>
            <p className='text-[#0D0D0D] font-bold text-xl mx-auto mb-8'>Notas</p>
            <div className='flex flex-col mx-auto w-full gap-y-2'>
              {localNotas.map((item, index) => (
                <div key={index} className='flex mx-auto gap-x-6'>
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
                    <div className='text-[#0D0D0D] text-base my-auto font-bold'>- {item}</div>
                      )}
                  {editingNotes && (
                    <p className='text-[#E9500E] md:cursor-pointer my-auto text-base font-bold md:hover:text-[#DB9B6D]' onClick={() => deleteNoteLocally(index)}>X</p>
                  )}
                </div>
              ))}
            </div>
            {editingNotes && (
              <div className='flex flex-col mx-auto mt-4'>
                <input className='text-[#0D0D0D] px-2 mx-auto mb-2' type="text" value={newNote} onChange={handleNoteChange} placeholder="Ingrese una nueva nota" />
                <div className='text-[#E9500E] text-base font-bold md:hover:text-[#DB9B6D]'>
                  <svg onClick={addNoteLocally} className='md: cursor-pointer h-4 w-4 mx-auto' version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 137.144 137.144" enableBackground="new 0 0 137.144 137.144">
                    <g>
                      <g>
                        <path d="M75.429,34.286H61.715v27.429H34.286v13.714h27.429v27.43h13.714v-27.43h27.429V61.715H75.429V34.286z M109.715,0H27.429    C12.28,0,0,12.281,0,27.429v82.286c0,15.149,12.28,27.429,27.429,27.429h82.286c15.149,0,27.429-12.28,27.429-27.429V27.429    C137.144,12.281,124.864,0,109.715,0z M123.43,102.858c0,11.361-9.21,20.572-20.571,20.572H34.286    c-11.361,0-20.571-9.21-20.571-20.572V34.286c0-11.361,9.21-20.572,20.571-20.572h68.573c11.361,0,20.571,9.21,20.571,20.572    V102.858z"/>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
            )}
            <div className='flex justify-center gap-x-8 mt-8'>
              {editingNotes
                ? (
                <>
                  <button className='text-[#E9500E] font-bold md:hover:text-[#DB9B6D]' onClick={updateNotes}>
                    Guardar
                  </button>
                  <button className='text-[#E9500E] md:hover:text-[#DB9B6D] font-bold' onClick={toggleEditing}>
                    Cancelar
                  </button>
                </>
                  )
                : (
                <>
                  <button className='text-[#E9500E] font-bold md:hover:text-[#DB9B6D]' onClick={toggleEditing}>
                    Editar notas
                  </button>
                  <button className='text-[#E9500E] font-bold md:hover:text-[#DB9B6D]' onClick={toggleView}>
                    Volver
                  </button>
                </>
                  )}
            </div>
          </div>
          }
        </div>
  )
}

export default NotificacionAdmin
