import React, { useState } from 'react'

import { udpateNotasAlumno } from '@/lib/firebase/actions.admin'

const NotificacionAdmin = ({
  alumno,
  notification,
  setSelectedAlumno,
  setNotification,
  setShowNotification
}) => {
  const [editingNotes, setEditingNotes] = useState(false)
  const [newNote, setNewNote] = useState('')
  const [localNotas, setLocalNotas] = useState(alumno.notas || [])
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
    const updatedAlumnoData = await udpateNotasAlumno(alumno.id, {
      notas: localNotas
    })
    setSelectedAlumno(updatedAlumnoData)
    setEditingNotes(false)
  }

  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-[100]">
        <div className="p-12 w-[90%] min-[490px]:w-4/6 md:w-3/6 lg:w-2/6 rounded-lg mx-auto flex flex-col bg-white border-1 border-black">
          <p className="text-black font-bold text-xl mx-auto mb-6">
            Notificaciones
          </p>
          <div className="flex flex-col w-full mx-auto">
            {notification.map((item, index) => (
              <div key={index} className="text-black font-bold mx-auto">
                - {item}
              </div>
            ))}
          </div>
          <p className="text-black font-bold text-xl mx-auto my-6">Notas</p>
          <div className="flex flex-col mx-auto w-full mb-6">
            {localNotas.map((item, index) => (
              <div key={index} className="flex mx-auto gap-x-6 mb-2">
                {editingNotes
                  ? (
                  <input
                    className="text-black px-2"
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
                  <div className="text-black text-base my-auto">
                    - {item}
                  </div>
                    )}
                {editingNotes && (
                  <p
                    className="text-orange-600 md:cursor-pointer my-auto text-base font-bold md:hover:text-orange-300"
                    onClick={() => deleteNoteLocally(index)}
                  >
                    X
                  </p>
                )}
              </div>
            ))}
          </div>
          {editingNotes && (
            <div className="flex flex-col mx-auto mb-6">
              <input
                className="text-black px-2 mb-4"
                type="text"
                value={newNote}
                onChange={handleNoteChange}
                placeholder="Ingrese una nueva nota"
              />
              <button
                className="text-orange-600 text-base font-bold md:hover:text-orange-300"
                onClick={addNoteLocally}
              >
                Agregar Nota
              </button>
            </div>
          )}
          <div className="flex justify-center gap-x-12 mt-4">
            {editingNotes && (
              <>
                <button
                  className="text-orange-600 font-bold md:hover:text-orange-300"
                  onClick={toggleEditing}
                >
                  Cancelar
                </button>
                <button
                  className="text-orange-600 font-bold md:hover:text-orange-300"
                  onClick={updateNotes}
                >
                  Guardar
                </button>
              </>
            )}
            {!editingNotes && (
              <>
                <button
                  className="text-orange-600 font-bold md:hover:text-orange-300"
                  onClick={toggleEditing}
                >
                  Editar Notas
                </button>
                <button
                  className="text-orange-600 font-bold md:hover:text-orange-300"
                  onClick={closeNotification}
                >
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
