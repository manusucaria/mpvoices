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
  constructor ({ nombre, apellido, email, telefono, rol }) {
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
  constructor ({ usuario, instrumentos }) {
    this.usuario = this.parseUsuarioRef({ usuario })
    this.instrumentos = this.parseInstrumentosRef({ instrumentos })
  }

  parseUsuarioRef ({ usuario }) {
    return doc(db, 'usuarios', usuario)
  }

  parseInstrumentosRef ({ instrumentos }) {
    return instrumentos.map((instrumentoId) => {
      return doc(db, 'instrumentos', instrumentoId)
    })
  }
}

export class Alumno {
  constructor ({ usuarioUid, profesorId, instrumentosId }) {
    this.usuarioUid = this.parseUsuarioRef({ usuarioUid })
    this.profesorId = this.parseProfesorRef({ profesorId })
    this.instrumentosId = this.parseInstrumentosRef({ instrumentosId })
  }

  parseUsuarioRef ({ usuarioUid }) {
    return doc(db, 'usuarios', usuarioUid)
  }

  parseProfesorRef ({ profesorId }) {
    return doc(db, 'profesores', profesorId)
  }

  parseInstrumentosRef ({ instrumentosId }) {
    return instrumentosId.map((instrumentoId) => {
      return doc(db, 'instrumentos', instrumentoId)
    })
  }
}
