import {
  Alumno,
  Profesor,
  Rol,
  Usuario
} from './schemas'

export const RolConverter = {
  toFirestore: (rol) => {
    return {
      nombre: rol.nombre
    }
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options)
    return new Rol({ nombre: data.nombre })
  }
}

export const UsuarioConverter = {
  toFirestore: (usuario) => {
    return {
      full_name: usuario.full_name,
      email: usuario.email,
      telefono: usuario.telefono,
      rol: usuario.rol
    }
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options)
    return new Usuario({
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      telefono: data.telefono,
      rol: data.rol
    })
  }
}

export const ProfesorConverter = {
  toFirestore: (profesor) => {
    return {
      usuarioUid: profesor.usuarioUid,
      instrumento: profesor.instrumento
    }
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options)
    return new Profesor({
      usuarioUid: data.usuarioUid,
      instrumento: data.instrumento
    })
  }
}

export const AlumnoConverter = {
  toFirestore: (alumno) => {
    return {
      usuarioUid: alumno.usuarioUid,
      profesorId: alumno.profesorId,
      instrumento: alumno.instrumento
    }
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options)
    return new Alumno({
      usuarioUid: data.usuarioUid,
      profesorId: data.profesorId,
      instrumento: data.instrumento
    })
  }
}
