import React, { useState } from 'react'
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'

const InicioSesion = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    const auth = getAuth()

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      console.log('Usuario autenticado: ', user)
    } catch (error) {
      const errorMessage = error.message
      console.error('Error de autenticación: ', errorMessage)
    }
  }

  return (
    <div>
      <form>
        <input
          type="email"
          placeholder="Usuario"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Iniciar sesión</button>
      </form>
    </div>
  )
}

export default InicioSesion
