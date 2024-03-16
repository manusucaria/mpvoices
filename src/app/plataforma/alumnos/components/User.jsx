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
  const [quantityNotificaciones, setQuantityNotificaciones] = useState(0)
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
          setQuantityNotificaciones(dataAlumno?.notificaciones.length)
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
        <div className="w-full py-10 flex justify-center text-2xl gap-10">
          <div className="bg-white-dark text-black w-1/3 rounded-md flex flex-col items-center justify-start gap-5 py-10">
            <p className={`${playfair600.className}`}>
              Saldo: {alumno.pagos.saldo}
            </p>
          </div>
          <div className="bg-white-dark text-black w-1/3 rounded-md flex flex-col items-center justify-start gap-5 py-10">
            <p className={`${playfair600.className} ${quantityNotificaciones > 0 && 'text-orange-600'}`}>Clases a recuperar: {quantityNotificaciones}</p>
            <Button
              text="Agendar clase"
              mode={!quantityNotificaciones > 0 && 'disabled-light'}
              path="/plataforma/alumnos/clases/agendar"
              disabled={!quantityNotificaciones > 0}
            />
          </div>
        </div>
        <div className="bg-black-light w-full pt-10 pb-32 flex items-center justify-center">
          <Button
            text="Cerrar sesión"
            mode="light"
            hasACallback={true}
            onClick={() => setModalOpen(true)}
          />
        </div>
      </div>
      <Modal
        leggend="¿Estás segur@ que deseas cerrar sesión?"
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        callback={handleLogout}
      />
    </>
  )
}
export default User
