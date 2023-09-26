import { firestore } from '@/firebase'
import { collection, getDocs } from 'firebase/firestore'

export const handlerGetAllClases = async () => {
  const snapshot = await getDocs(collection(firestore, 'clases'))
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))
}
