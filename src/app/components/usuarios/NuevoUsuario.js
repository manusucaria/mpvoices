'use client'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'
import { auth, firestore } from '@/firebase'

const RegisterAlumno = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nombre, setNombre] = useState('')
  const [otraInformacion, setOtraInformacion] = useState('')
  const [user, setUser] = useState(null)

  const handleRegister = async (e) => {
    e.preventDefault()
    console.log('object')
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const registeredUser = userCredential.user
      const alumnosCollection = collection(firestore, 'alumnos')
      const alumnoData = {
        nombre,
        otraInformacion
      }
      await addDoc(alumnosCollection, {
        [registeredUser.uid]: alumnoData
      })
      setUser(registeredUser)
    } catch (error) {
      console.error('Error al registrar al alumno: ', error)
    }
  }

  return (
    <div>
      <h1>Registro de Alumno</h1>
      <form>
        <input
          className='text-black'
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className='text-black'
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className='text-black'
          type="text"
          placeholder="Nombre del Alumno"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          className='text-black'
          type="text"
          placeholder="Otra información"
          value={otraInformacion}
          onChange={(e) => setOtraInformacion(e.target.value)}
        />
        <button onClick={handleRegister}>Registrar Alumno</button>
        {user && <p>Usuario autenticado: {user.email}</p>}
      </form>
    </div>

  )
}

export default RegisterAlumno
