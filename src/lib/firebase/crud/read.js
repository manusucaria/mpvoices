import { collection, where, query, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { RolConverter } from '../schemas.converters'

export const getRolByName = async ({ nombre }) => {
  try {
    const rolesRef = collection(db, 'roles')
    const q = query(rolesRef, where('nombre', '==', nombre)).withConverter(
      RolConverter
    )
    const querySnapshot = await getDocs(q)
    const rol = querySnapshot.docs[0]

    if (rol.exists()) {
      return { ...rol.data(), id: rol.id }
    } else {
      throw new Error('Rol no encontrado')
    }
  } catch (error) {
    return null
  }
}
