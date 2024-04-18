'use client'

import React, { useEffect, useState } from 'react'

import { getAlumnoById } from '@/lib/firebase/crud/read'
import { useAuth } from '@/lib/firebase/useAuth'
import { signOut } from '@/lib/firebase/auth'

import { playfair600 } from '@/utils/fonts/fonts'

import Loader from '@/app/components/loader/Loader'
import Button from '@/app/components/button/Button'
import Modal from '@/app/components/modal/Modal'

import useClasesSubscription from '../useClasesSubscription'

const User = ({ children }) => {
  const user = useAuth()
  const { clases } = useClasesSubscription(user?.uid)

  const [alumno, setAlumno] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setModalOpen] = useState(false)
  const [clasesCanceladasQuantity, setClasesCanceladasQuantity] = useState(0)
  const [clasesAgendadasQuantity, setClasesAgendadasQuantity] = useState(0)

  const handleLogout = async () => {
    setLoading(true)
    await signOut()
    setModalOpen(false)
    window.location.reload()
    setLoading(false)
  }

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        window.scrollTo(0, 0)
        if (user && clases) {
          const dataAlumno =
            user?.uid && (await getAlumnoById(user?.uid, { getUsuario: true }))
          if (!dataAlumno) {
            await signOut()
            window.location.reload()
          }
          setAlumno(dataAlumno)
          setClasesCanceladasQuantity(
            clases?.canceladas || 0
          )
          setClasesAgendadasQuantity(
            clases?.agendadas || 0
          )
          setLoading(false)
        }
      } catch (error) {
        await signOut()
        window.location.reload()
      }
    })()
  }, [user, clases])

  if (loading) return <Loader />

  return (
    <>
      <div className="w-full py-12">
        <h1
          className={`text-3xl sm:text-5xl text-center mb-4 ${playfair600.className}`}
        >
          ¡Hola {alumno?.usuario?.full_name?.nombre}!
        </h1>
        <h2 className="text-[1.6rem] sm:text-4xl text-center px-4">
          Te damos la bienvenida a la Plataforma Voices
        </h2>
      </div>
      <div className="bg-black-light w-full">{children}</div>
      <div className="bg-black-light w-full grid grid-cols-1">
        <div className="w-full py-10 flex flex-col lg:flex-row items-center lg:items-stretch justify-center text-lg sm:text-xl lg:text-2xl gap-10">
          <div className="bg-white-dark text-black w-2/3 lg:w-1/3 rounded-md flex flex-col items-center justify-start gap-5 py-10">
            <p className={`${playfair600.className}`}>
              Saldo deudor: ${alumno?.pagos?.saldo}
            </p>
          </div>
          <div className="bg-white-dark text-black w-2/3 lg:w-1/3 rounded-md flex flex-col items-center justify-start gap-5 py-10">
            <p
              className={`${playfair600.className} ${
                clasesCanceladasQuantity > clasesAgendadasQuantity &&
                'text-orange-600'
              }`}
            >
              Clases a recuperar:{' '}
              {clasesCanceladasQuantity - clasesAgendadasQuantity}
            </p>
            {clasesCanceladasQuantity > clasesAgendadasQuantity
              ? (
              <Button
                text="Agendar clase"
                path="/plataforma/alumnos/clases/agendar"
                disabled={clasesCanceladasQuantity > clasesAgendadasQuantity}
                isFull
              />
                )
              : (
              <Button
                text="Agendar clase"
                mode="disabled-light"
                path="/plataforma/alumnos/clases/agendar"
                disabled={clasesCanceladasQuantity > clasesAgendadasQuantity}
                isFull
              />
                )}
          </div>
        </div>
        <div className="bg-black-light w-full p-10 pb-32 flex items-center justify-center">
          <Button
            text="Cerrar sesión"
            mode="signOut"
            hasACallback
            onClick={() => setModalOpen(true)}
          />
        </div>
      </div>
      <Modal
        leggend="¿Seguro querés cerrar sesión?"
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        callback={handleLogout}
      />
    </>
  )
}
export default User
