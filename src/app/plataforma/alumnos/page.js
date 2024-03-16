'use client'

import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import alasImg from '@/app/assets/alas.jpg'
import { useAuth } from '@/lib/firebase/useAuth'
import { getAlumnoById } from '@/lib/firebase/crud/read'
import { signOut } from 'firebase/auth'
import Loader from '@/app/components/loader/Loader'
import Button from '@/app/components/button/Button'
import { playfair600 } from '@/utils/fonts/fonts'

const page = () => {
  const user = useAuth()

  const [alumno, setAlumno] = useState(null)
  const [loading, setLoading] = useState(true)

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
      <div className="w-full h-full flex relative">
        <Image
          src={alasImg}
          width="auto"
          height="auto"
          alt="Separador alas voices"
          priority
        />
        <div className="bg-black bg-opacity-20 absolute w-full h-full p-12 top-0 left-0">
          <div className="bg-black bg-opacity-60 w-full h-full flex flex-col items-center justify-center gap-8 border-1 border-white border-opacity-50">
            <h2 className={`text-3xl ${playfair600.className}`}>
              Días y horarios
            </h2>
            <div className="flex flex-col gap-6">
              <Button
                text={alumno.clases.dia}
                mode="light"
                path={`/plataforma/alumnos/clases/${alumno.clases.dia}`}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default page
