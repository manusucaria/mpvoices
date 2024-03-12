import { doc } from 'firebase/firestore'
import { db } from './firebase'

const Utils = {
  toTrimLowercase (string) {
    return string.trim().toLowerCase()
  },
  toTrimUppercase (string) {
    return string.trim().toUpperCase()
  },
  toTrim (string) {
    return string.trim()
  }
}

export class Rol {
  constructor ({ nombre }) {
    this.nombre = nombre
  }
}

export class Usuario {
  constructor ({ nombre, apellido, email, telefono = '', rol }) {
    this.full_name = this.parseFullName({ nombre, apellido })
    this.email = Utils.toTrim(email)
    this.telefono = Utils.toTrim(telefono)
    this.rol = this.parseRolRef({ rol })
  }

  parseFullName ({ nombre, apellido }) {
    nombre = Utils.toTrim(nombre)
    apellido = Utils.toTrim(apellido)
    return { nombre, apellido }
  }

  parseRolRef ({ rol }) {
    return doc(db, 'roles', rol.id)
  }
}

export class Profesor {
  constructor ({ usuarioUid, instrumento }) {
    this.usuarioUid = this.parseUsuarioRef({ usuarioUid })
    this.instrumento = instrumento
  }

  parseUsuarioRef ({ usuarioUid }) {
    return doc(db, 'usuarios', usuarioUid)
  }
}

export class Alumno {
  constructor ({ usuarioUid, profesorId, instrumento }) {
    this.usuarioUid = this.parseUsuarioRef({ usuarioUid })
    this.profesorId = this.parseProfesorRef({ profesorId })
    this.instrumento = instrumento
  }

  parseUsuarioRef ({ usuarioUid }) {
    return doc(db, 'usuarios', usuarioUid)
  }

  parseProfesorRef ({ profesorId }) {
    return doc(db, 'profesores', profesorId)
  }
}
