'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'

import { openSans600, playfair600 } from '@/utils/fonts/fonts.js'
import { getAlumnoByEmail } from '../api/api.js'
import { useAuth } from '../../lib/auth'
import { auth } from '../../lib/firebase.js'
import Loader from '../components/loader/Loader.jsx'
import Button from '../components/button/Button.jsx'
import Wrapper from '../components/wrapper/Wrapper.jsx'

const page = () => {
  const user = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [alumno, setAlumno] = useState(null)
  const [isModalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const fetchAlumnoData = async () => {
      try {
        setLoading(true)
        window.scrollTo(0, 0)
        if (user === null && user?.displayName !== 'Alumno') {
          router.push('/login')
          return
        }
        if (user) {
          const dataAlumno = await getAlumnoByEmail({ email: user.email })
          if (dataAlumno === null) {
            router.push('/login')
            return
          }
          setAlumno(dataAlumno)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchAlumnoData()
  }, [user, router])

  const handleLogout = async () => {
    setLoading(true)
    await signOut(auth)
    router.push('/login')
    setLoading(false)
  }

  return (
    <section className={`w-full py-24 ${playfair600.className}`}>
      <Wrapper className="flex flex-col justify-center items-center gap-16">
        {loading
          ? (
          <Loader />
            )
          : (
          <>
            {alumno && (
              <div className="w-full flex flex-col justify-center items-center mx-auto gap-24">
                <p
                  className={`text-3xl sm:text-5xl text-center ${playfair600.className}`}
                >
                  ¡Hola {alumno.Nombre} {alumno.Apellido}!
                </p>

                <div className="w-2/3 grid place-items-center gap-8">
                  <Button
                    mode="light"
                    path="/plataforma-alumnos/clases"
                    text="Clases"
                  />
                  <Button
                    mode="light"
                    path="/plataforma-alumnos/pagos"
                    text="Pagos"
                  />
                  <Button
                    mode="light"
                    path="/plataforma-alumnos/notificaciones"
                    text="Notificaciones"
                  />
                </div>

                <button
                  className="transition-colors duration-300 hover:text-orange-600"
                  onClick={() => setModalOpen(true)}
                >
                  Cerrar sesión
                </button>

                <ModalLogOut isOpen={isModalOpen} onClose={() => setModalOpen(false)} handleLogout={handleLogout} />
              </div>
            )}
          </>
            )}
      </Wrapper>
    </section>
  )
}

export default page

const ModalLogOut = ({ isOpen, onClose, handleLogout }) => {
  return (
    <>
      {isOpen && (
        <div className="bg-black bg-opacity-50 w-screen h-screen fixed top-0 left-0 flex items-center justify-center">
          <div className="w-2/3 sm:w-1/2 md:w-1/3 h-auto p-5 rounded-md bg-white text-black">
            <p className={`text-center pb-5 ${openSans600.className}`}>
              ¿Estás segur@ que deseas cerrar tu sesión?
            </p>
            <div className="flex justify-end mt-4">
              <Button hasACallback mode="light" onClick={onClose} text="Cancelar" />
              <Button hasACallback mode="dark" onClick={handleLogout} text="Cerrar Sesión" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
