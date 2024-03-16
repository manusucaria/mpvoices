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
  constructor ({ nombre, apellido, email, telefono = '', rol, birthdate }) {
    this.full_name = this.parseFullName({ nombre, apellido })
    this.email = Utils.toTrim(email)
    this.telefono = Utils.toTrim(telefono)
    this.birthdate = birthdate
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
  constructor ({ usuario, instrumento, dias }) {
    this.usuario = this.parseUsuarioRef({ usuario })
    this.instrumento = instrumento
    this.dias = dias
  }

  parseUsuarioRef ({ usuario }) {
    return doc(db, 'usuarios', usuario)
  }
}

export class Alumno {
  constructor ({ usuarioUid, profesorUid, instrumento, clase_dia, clase_duracion, clase_hora_inicio, pagos_saldo, pagos_actualizacion }) {
    this.usuario = this.parseUsuarioRef({ usuarioUid })
    this.profesor = this.parseProfesorRef({ profesorUid })
    this.instrumento = instrumento
    this.clases = { dia: clase_dia, hora_inicio: clase_hora_inicio, duracion: clase_duracion }
    this.pagos = { saldo: pagos_saldo, actualizacion: pagos_actualizacion }
    this.notas = []
    this.notificaciones = []
  }

  parseUsuarioRef ({ usuarioUid }) {
    return doc(db, 'usuarios', usuarioUid)
  }

  parseProfesorRef ({ profesorUid }) {
    return doc(db, 'profesores', profesorUid)
  }
}
