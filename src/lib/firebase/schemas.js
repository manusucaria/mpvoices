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
  constructor ({ usuario, profesor, instrumento }) {
    this.usuario = this.parseUsuarioRef({ usuario })
    this.profesor = this.parseProfesorRef({ profesor })
    this.instrumento = instrumento
  }

  parseUsuarioRef ({ usuario }) {
    return doc(db, 'usuarios', usuario)
  }

  parseProfesorRef ({ profesor }) {
    return doc(db, 'profesores', profesor)
  }
}

export class AlumnoClase {
  constructor ({ dia, horaInicio, horaFin, profesor }) {
    this.dia = dia
    this.horaInicio = horaInicio
    this.horaFin = horaFin
    this.profesor = this.parseProfesorRef({ profesor })
  }

  parseProfesorRef ({ profesor }) {
    return doc(db, 'profesores', profesor)
  }
}
