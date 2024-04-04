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
  constructor ({ nombre, apellido, email, telefono = '', rolUid, birthdate }) {
    this.full_name = this.parseFullName({ nombre, apellido })
    this.email = Utils.toTrim(email)
    this.telefono = Utils.toTrim(telefono)
    this.birthdate = birthdate
    this.rol = this.parseRolRef({ rolUid })
  }

  parseFullName ({ nombre, apellido }) {
    nombre = Utils.toTrim(nombre)
    apellido = Utils.toTrim(apellido)
    return { nombre, apellido }
  }

  parseRolRef ({ rolUid }) {
    return doc(db, 'roles', rolUid)
  }
}

export class Profesor {
  constructor ({ usuarioUid, instrumento, dias }) {
    this.usuario = this.parseUsuarioRef({ usuarioUid })
    this.instrumento = instrumento
    this.dias = dias
  }

  parseUsuarioRef ({ usuarioUid }) {
    return doc(db, 'usuarios', usuarioUid)
  }
}

export class Alumno {
  constructor ({
    usuarioUid,
    profesorUid,
    instrumento,
    clase_dia,
    clase_duracion,
    clase_hora_inicio,
    pagos_saldo,
    pagos_actualizacion
  }) {
    this.usuario = this.parseUsuarioRef({ usuarioUid })
    this.profesor = this.parseProfesorRef({ profesorUid })
    this.instrumento = instrumento
    this.clases = {
      dia: clase_dia,
      hora_inicio: clase_hora_inicio,
      duracion: clase_duracion,
      agendadas: [],
      canceladas: [],
      notificaciones: []
    }
    this.pagos = { saldo: pagos_saldo, actualizacion: pagos_actualizacion }
    this.notas = []
  }

  parseUsuarioRef ({ usuarioUid }) {
    return doc(db, 'usuarios', usuarioUid)
  }

  parseProfesorRef ({ profesorUid }) {
    return doc(db, 'profesores', profesorUid)
  }
}
