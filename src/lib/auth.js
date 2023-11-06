import { useEffect, useState } from 'react'
import { auth } from './firebase'

export function useAuth () {
  const [user, setUser] = useState('')
  useEffect(() => {
    auth.onAuthStateChanged(function handleAuth (user) {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
  }, [user])
  return user
}
