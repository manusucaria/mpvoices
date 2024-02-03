import React, { useState, useEffect } from 'react'
import { getAlumnos, getProfesores } from '../../api/api.js'
import { useAuth } from '../../../lib/auth.js'

const Agenda2 = () => {
  const user = useAuth()
  const [alumnos, setAlumnos] = useState([])
  const [profesores, setProfesores] = useState([])

  useEffect(() => {
    getAlumnos().then((data) => {
      setAlumnos(data)
    })
    getProfesores().then((data) => {
      setProfesores(data)
    })
  }, [user])

  const generateHorarios = () => {
    const horarios = []
    let hora = 12
    let minutos = 0
    while (hora < 22) {
      horarios.push(`${hora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`)
      minutos += 15
      if (minutos === 60) {
        minutos = 0
        hora += 1
      }
    }

    return horarios
  }

  const renderTabla = () => {
    const horarios = generateHorarios()
    return (
      <table className="border-collapse border border-white mx-auto">
        <thead>
          <tr>
            <th className="border border-white px-4 py-2">Horario</th>
            {profesores.map((profesor) => (
              <th key={profesor.id} className="border border-white px-4 py-2">{profesor.Nombre}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {horarios.map((horario) => (
            <tr key={horario}>
              <td className="border border-white px-4 py-2">{horario}</td>
              {profesores.map((profesor) => {
                const alumnosProfesor = alumnos.filter((alumno) => alumno.Profesor === profesor.Nombre && alumno.Horario === horario)
                return (
                  <td key={profesor.id} className="border border-white px-4 py-2">
                    {alumnosProfesor.map((alumno) => (
                      <div key={alumno.id}>{alumno.Nombre} {alumno.Apellido}</div>
                    ))}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  return (
    <div>
      <h2 className="text-center text-3xl sm:text-5xl mb-4 text-white">Días y horarios</h2>
      {renderTabla()}
    </div>
  )
}

export default Agenda2
