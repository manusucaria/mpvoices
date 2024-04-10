import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'

import { db } from '@/lib/firebase/firebase'

const useClasesSubscription = (userId) => {
  const [clases, setClases] = useState({
    canceladas: 0,
    agendadas: 0
  })

  useEffect(() => {
    if (!userId) return
    const unsubscribe = onSnapshot(
      doc(db, 'alumnos', userId),
      (snapshot) => {
        const data = snapshot.data()
        const clasesCanceladasQuantity = data.clases.canceladas.length
        const clasesAgendadasQuantity = data.clases.agendadas.length
        setClases({
          canceladas: clasesCanceladasQuantity,
          agendadas: clasesAgendadasQuantity
        })
      }
    )

    return () => unsubscribe()
  }, [userId])

  return { clases }
}

export default useClasesSubscription
