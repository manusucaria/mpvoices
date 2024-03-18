import React, { useState, useEffect } from 'react'

import { updatePagosAlumno } from '@/lib/firebase/actions.admin'

const EditorPagos = ({ alumno, setSelectedAlumno }) => {
  const [saldo, setSaldo] = useState(0)
  const [originalSaldo, setOriginalSaldo] = useState(0)
  const [actualizacion, setActualizacion] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    if (alumno) {
      setSaldo(alumno.pagos.saldo || 0)
      setOriginalSaldo(alumno.pagos.saldo || 0)
      setActualizacion(alumno.pagos.actualizacion || '')
    }
  }, [alumno])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSending(true)
    try {
      const updatedAlumnoData = await updatePagosAlumno(alumno.id, {
        saldo,
        actualizacion
      })
      setSelectedAlumno(updatedAlumnoData)
      setEditMode(false)
      setShowConfirmation(true)
    } catch (error) {
      console.error('Error al actualizar los datos:', error)
    }
    setSending(false)
  }

  const handleEditClick = () => {
    setEditMode(true)
  }

  const cancelarClick = () => {
    setSaldo(originalSaldo)
    setEditMode(false)
  }

  const handleCloseConfirmation = () => {
    setShowConfirmation(false)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const utcDate = new Date(date.toUTCString())
    const day = utcDate.getUTCDate().toString().padStart(2, '0')
    const month = (utcDate.getUTCMonth() + 1).toString().padStart(2, '0')
    const year = utcDate.getUTCFullYear()
    return `${day}-${month}-${year}`
  }

  return (
    <div className="w-full">
      {editMode
        ? (
        <div className="flex flex-col w-full bg-black px-4 sm:px-8 p-8 pt-4">
          <form className="w-full mx-auto" onSubmit={handleSubmit}>
            <div className="flex mb-6">
              <label className="font-bold mr-auto w-2/6">Saldo:</label>
              <input
                className="text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto"
                type="number"
                name="saldo"
                value={saldo}
                onChange={(e) => setSaldo(parseFloat(e.target.value))}
              />
            </div>
            <div className="flex mb-6">
              <label className="font-bold mr-auto w-2/6">Actualización:</label>
              <input
                className="text-black rounded-3xl h-8 px-2 w-4/6 ml-auto"
                type="date"
                name="actualizacion"
                value={actualizacion}
                onChange={(e) => setActualizacion(e.target.value)}
              />
            </div>
            <div className="flex w-full mx-auto mt-8 gap-x-4">
              <button
                className={`font-botones font-bold rounded-3xl w-3/6 bg-orange-600 text-white px-3 h-12 sm:h-10 md:hover:bg-orange-300 ${
                  sending && 'opacity-50'
                }`}
                type="submit"
                disabled={sending}
              >
                {sending
                  ? (
                  <div
                    role="status"
                    className="w-full flex items-center justify-center"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6 text-gray-200 animate-spin fill-navy-blue-light"
                      viewBox="0 0 100 101"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                    )
                  : (
                      'Guardar'
                    )}
              </button>
              <button
                className="font-botones font-bold rounded-3xl w-3/6 ml-auto bg-white text-black md:hover:text-orange-600 border-2 border-orange-600 px-3 h-12 sm:h-10"
                onClick={cancelarClick}
                type="button"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
          )
        : (
        <div className="flex flex-col w-full mx-auto bg-black">
          <div className="px-4 sm:px-8 pb-8 w-full pt-4">
            <div className="mb-8 flex">
              <p className="mr-2 text-base font-bold">Saldo:</p>
              <p className="text-base">${saldo}</p>
            </div>
            <div className="flex">
              <p className="mr-2 text-base font-bold">Actualización:</p>
              <p className="text-base">{formatDate(actualizacion)}</p>
            </div>
          </div>
          <div className="bg-black flex flex-col mx-auto w-full">
            <button
              className="font-botones font-bold rounded-3xl w-4/6 sm:w-3/6 mx-auto h-12 sm:h-10 mb-8 bg-orange-600 md:hover:bg-orange-300"
              onClick={handleEditClick}
            >
              Editar pagos
            </button>
          </div>
        </div>
          )}
      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-12 rounded-lg text-center flex flex-col">
            <p className="text-black text-xl mb-4 font-bold">
              Los cambios se guardaron correctamente.
            </p>
            <button
              className="text-orange-600 md:hover:text-orange-300 ml-auto font-bold"
              onClick={handleCloseConfirmation}
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditorPagos
