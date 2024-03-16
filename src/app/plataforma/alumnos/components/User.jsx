'use client'

import React, { useEffect, useState } from 'react'

import { useAuth } from '@/lib/firebase/useAuth'

import { getAlumnoById } from '@/lib/firebase/crud/read'
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
      <div className="w-full py-8">
        <h1
          className={`text-3xl sm:text-5xl text-center ${playfair600.className}`}
        >
          ¡Hola {alumno.usuario.full_name.nombre}!
        </h1>
      </div>
      {children}
      <div className="w-full grid grid-cols-1">
        <div className="bg-white-dark text-black w-full py-16 flex justify-around items-center text-2xl">
          <p className={`${playfair600.className}`}>Saldo: {alumno.pagos.saldo}</p>
          <p className={`${playfair600.className}`}>Clases a recuperar: 0</p>
        </div>
        <div className="bg-black-light w-full pt-10 pb-20 flex items-center justify-center">
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
