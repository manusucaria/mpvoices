import { deleteDoc, doc } from 'firebase/firestore'
import { db } from './firebase'

export const deleteUserAsAdmin = async ({ uid }) => {
  try {
    const data = await (
      await fetch('/api/admin/users', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-uid': uid
        }
      })
    ).json()

    if (data.error && data.code === 'auth/user-not-found') {
      throw new Error('User not found')
    }

    switch (data.collection) {
      case 'profesores':
        await deleteDoc(doc(db, 'profesores', uid))
        break
      case 'alumnos':
        await deleteDoc(doc(db, 'alumnos', uid))
        break
      default:
        return
    }

    await deleteDoc(doc(db, 'usuarios', uid))
  } catch (error) {
    throw new Error(error)
  }
}
