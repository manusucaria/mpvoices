'use client'

import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

export const useAuth = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser)
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  return user
}
