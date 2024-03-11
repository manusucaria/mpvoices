import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

export const getRolByName = async ({ nombre }) => {
  try {
    const docRef = doc(db, 'roles', nombre)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) return { id: docSnap.id, ...docSnap.data() }
    else throw new Error('Rol no encontrado')
  } catch (error) {
    return null
  }
}
