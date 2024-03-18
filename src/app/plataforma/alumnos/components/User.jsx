'use client'

import React, { useEffect, useState } from 'react'

import { getAlumnoById } from '@/lib/firebase/crud/read'
import { useAuth } from '@/lib/firebase/useAuth'
import { signOut } from '@/lib/firebase/auth'

import { playfair600 } from '@/utils/fonts/fonts'

import Loader from '@/app/components/loader/Loader'
import Button from '@/app/components/button/Button'
import Modal from '@/app/components/modal/Modal'

const User = ({ children }) => {
  const user = useAuth()

  const [alumno, setAlumno] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setModalOpen] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    await signOut()
    window.location.reload()
    setLoading(false)
  }

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        window.scrollTo(0, 0)
        if (user) {
          const dataAlumno =
            user?.uid && (await getAlumnoById(user?.uid, { getUsuario: true }))
          if (!dataAlumno) {
            await signOut()
            window.location.reload()
          }
          setAlumno(dataAlumno)
          setLoading(false)
        }
      } catch (error) {
        await signOut()
        window.location.reload()
      }
    })()
  }, [user])

  if (loading) return <Loader />

  return (
    <>
      <div className="w-full py-12">
        <h1
          className={`text-3xl sm:text-5xl text-center ${playfair600.className}`}
        >
          ¡Hola {alumno.usuario.full_name.nombre}!
        </h1>
      </div>
      <div className="bg-black-light w-full">{children}</div>
      <div className="bg-black-light w-full grid grid-cols-1">
        <div className="w-full py-10 flex flex-col lg:flex-row items-center lg:items-stretch justify-center text-lg sm:text-xl lg:text-2xl gap-10">
          <div className="bg-white-dark text-black w-2/3 lg:w-1/3 rounded-md flex flex-col items-center justify-start gap-5 py-10">
            <p className={`${playfair600.className}`}>
              Saldo: ${alumno?.pagos?.saldo}
            </p>
          </div>
          <div className="bg-white-dark text-black w-2/3 lg:w-1/3 rounded-md flex flex-col items-center justify-start gap-5 py-10">
            <p
              className={`${playfair600.className} ${
                alumno.clases.canceladas > 0 && 'text-orange-600'
              }`}
            >
              Clases a recuperar: {alumno.clases.canceladas}
            </p>
            <Button
              text="Agendar clase"
              mode={!alumno.clases.canceladas > 0 && 'disabled-light'}
              path="/plataforma/alumnos/clases/agendar"
              disabled={!alumno.clases.canceladas > 0}
              isFull
            />
          </div>
        </div>
        <div className="bg-black-light w-full pt-10 pb-32 flex items-center justify-center">
          <Button
            text="Cerrar sesión"
            mode="signOut"
            hasACallback={true}
            onClick={() => setModalOpen(true)}
          />
        </div>
      </div>
      <Modal
        leggend="¿Estás seguro que deseas cerrar sesión?"
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        callback={handleLogout}
      />
    </>
  )
}
export default User
