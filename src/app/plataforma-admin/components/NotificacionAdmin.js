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
      <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center z-[100]'>
          {showingNotifications
            ? <div className='p-12 h-auto w-[90%] min-[490px]:w-4/6 md:w-3/6 lg:w-2/6 rounded-lg mx-auto flex flex-col bg-[#FFFFFF] border-1 border-[#0D0D0D]'>
              <svg className='mx-auto mb-4 w-6 h-6' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.55 2.08L4.12 0.65C1.72 2.48 0.14 5.3 0 8.5H2C2.15 5.85 3.51 3.53 5.55 2.08ZM17.94 8.5H19.94C19.79 5.3 18.21 2.48 15.82 0.65L14.4 2.08C16.42 3.53 17.79 5.85 17.94 8.5ZM15.97 9C15.97 5.93 14.33 3.36 11.47 2.68V2C11.47 1.17 10.8 0.5 9.97 0.5C9.14 0.5 8.47 1.17 8.47 2V2.68C5.6 3.36 3.97 5.92 3.97 9V14L1.97 16V17H17.97V16L15.97 14V9ZM9.97 20C10.11 20 10.24 19.99 10.37 19.96C11.02 19.82 11.55 19.38 11.81 18.78C11.91 18.54 11.96 18.28 11.96 18H7.96C7.97 19.1 8.86 20 9.97 20Z" fill="#0D0D0D"/>
              </svg>
            <p className='text-[#0D0D0D] font-bold text-xl mx-auto mb-8'>Notificaciones</p>
            <div className='flex flex-col w-full mx-auto gap-y-2'>
              {notification.map((item, index) => (
                <div key={index} className='text-[#0D0D0D] font-bold mx-auto'>- {item}</div>
              ))}
            </div>
            <div className='flex justify-center gap-x-12 sm:gap-x-16 mt-8'>
              <button className='text-[#A33100] font-bold md:hover:text-[#F57B48]' onClick={toggleView}>
                Ver notas
              </button>
              <button className='text-[#A33100] font-bold md:hover:text-[#F57B48]' onClick={closeNotification}>
                Salir
              </button>
            </div>
          </div>
            : <div className='p-12 h-auto w-[90%] min-[490px]:w-4/6 md:w-3/6 lg:w-2/6 rounded-lg mx-auto flex flex-col bg-[#FFFFFF] border-1 border-[#0D0D0D]'>
            <svg className='mx-auto mb-4' width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.6377 7.30139L22.2969 6.60706C22.6309 6.2555 22.6572 5.7721 22.3232 5.43811L22.0947 5.20081C21.7959 4.90198 21.2949 4.94593 20.9697 5.27112L20.2842 5.93909L21.6377 7.30139ZM11.2314 16.653L13.0332 15.8971L20.9961 7.93421L19.6426 6.58948L11.6797 14.5612L10.8887 16.3014C10.8008 16.5035 11.0293 16.7321 11.2314 16.653ZM7.8916 22.5504H18.1309C19.8184 22.5504 20.8115 21.566 20.8115 19.6852V10.4039L19.0537 12.153V19.527C19.0537 20.3707 18.6055 20.7926 18.0166 20.7926H8.00586C7.19727 20.7926 6.75781 20.3707 6.75781 19.527V9.76233C6.75781 8.91858 7.19727 8.49671 8.00586 8.49671H15.4678L17.2168 6.73889H7.8916C5.99316 6.73889 5 7.72327 5 9.60413V19.6852C5 21.566 5.99316 22.5504 7.8916 22.5504Z" fill="#080808"/>
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
                    <p className='text-[#A33100] md:cursor-pointer my-auto text-base font-bold md:hover:text-[#F57B48]' onClick={() => deleteNoteLocally(index)}>X</p>
                  )}
                </div>
              ))}
            </div>
            {editingNotes && (
              <div className='flex flex-col mx-auto mt-4'>
                <input className='text-[#0D0D0D] px-2 mx-auto mb-2' type="text" value={newNote} onChange={handleNoteChange} placeholder="Ingrese una nueva nota" />
                <div className='text-[#A33100] text-base font-bold md:hover:text-[#F57B48]'>
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
            <div className='flex justify-center gap-x-12 sm:gap-x-16 mt-8'>
              {editingNotes
                ? (
                <>
                  <button className='text-[#A33100] font-bold md:hover:text-[#F57B48]' onClick={updateNotes}>
                    Guardar
                  </button>
                  <button className='text-[#A33100] md:hover:text-[#F57B48] font-bold' onClick={toggleEditing}>
                    Cancelar
                  </button>
                </>
                  )
                : (
                <>
                  <button className='text-[#A33100] font-bold md:hover:text-[#F57B48]' onClick={toggleEditing}>
                    Editar notas
                  </button>
                  <button className='text-[#A33100] font-bold md:hover:text-[#F57B48]' onClick={toggleView}>
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
