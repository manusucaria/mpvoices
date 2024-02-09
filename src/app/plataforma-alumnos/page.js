'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'

import { playfair600 } from '@/utils/fonts/fonts.js'
import { getAlumnoByEmail } from '../api/api.js'
import { useAuth } from '../../lib/auth'
import { auth } from '../../lib/firebase.js'
import Loader from '../components/loader/Loader.jsx'
import Button from '../components/button/Button.jsx'
import Wrapper from '../components/wrapper/Wrapper.jsx'
import Modal from '../components/modal/Modal.jsx'

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
                    path="/plataforma-alumnos/clases/info"
                    text="Información clases"
                  />
                  <Button
                    mode="light"
                    path="/plataforma-alumnos/clases/cancelar"
                    text="Cancelar clases"
                  />
                  <Button
                    mode="light"
                    path="/plataforma-alumnos/clases/reprogramar"
                    text="Reprogramar clases"
                  />
                </div>

                <button
                  className="transition-colors duration-300 hover:text-orange-600"
                  onClick={() => setModalOpen(true)}
                >
                  Cerrar sesión
                </button>

                <Modal
                  leggend="¿Estás segur@ que deseas cerrar tu sesión?"
                  isOpen={isModalOpen}
                  onClose={() => setModalOpen(false)}
                  callback={handleLogout}
                />
              </div>
            )}
          </>
            )}
      </Wrapper>
    </section>
  )
}

export default page
