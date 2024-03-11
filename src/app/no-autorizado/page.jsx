'use client'

import React, { useEffect, useState } from 'react'

import Button from '../components/button/Button'
import Loader from '../components/loader/Loader'

import { useAuth } from '@/lib/firebase/useAuth'
import { signOut } from '@/lib/firebase/auth'

export default function Unauthorized () {
  const user = useAuth()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) setLoading(false)
    return () => setLoading(false)
  }, [user])

  const handleLogout = async () => {
    await signOut()
    window.location.reload()
  }

  if (loading) return <Loader />

  return (
    <div className="w-full min-h-screen flex items-center justify-center sm:px-6 lg:px-8">
      <div className="w-full flex flex-col items-center justify-center space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="/voices.svg"
            alt="Workflow"
          />
          <p className="text-center font-black text-5xl mt-6">401</p>
          <h2 className="mt-6 text-center text-3xl">No autorizado</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            No tienes permiso para acceder a esta página.
          </p>
        </div>
        <Button text="Volver a la página principal" path="/" />

        {user && (
          <button
            className="text-sm hover:text-orange-600"
            onClick={() => handleLogout()}
          >
            Cerrar sesión
          </button>
        )}
      </div>
    </div>
  )
}
