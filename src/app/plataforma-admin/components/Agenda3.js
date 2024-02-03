import React, { useState, useEffect } from 'react'
import { getAlumnos, getProfesores } from '../../api/api.js'
import { useAuth } from '../../../lib/auth.js'

const Agenda3 = () => {
  const user = useAuth()
  const [alumnos, setAlumnos] = useState([])
  const [profesores, setProfesores] = useState([])
  const [horarios, setHorarios] = useState([])

  useEffect(() => {
    getAlumnos().then((data) => {
      setAlumnos(data)
    })
    getProfesores().then((data) => {
      setProfesores(data)
    })
    setHorarios(generateHorarios())
  }, [user])

  const generateHorarios = () => {
    const horarios = []
    let hora = 12
    let minutos = 0
    while (hora < 21) {
      horarios.push(`${hora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`)
      minutos += 15
      if (minutos === 60) {
        minutos = 0
        hora += 1
      }
    }
    return horarios
  }

  const numRows = horarios.length + 2

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `auto repeat(${profesores.length}, auto)`, gridTemplateRows: `auto repeat(${numRows + 1}, auto)` }}>
      <div className='col-start-1 col-end-2 row-start-1 row-end-2 border border-white'><p>Profesores</p></div>
      {/* Columna de horarios */}
      <div className="grid-col border border-white" style={{ gridColumn: '1', gridRow: `2 / ${numRows + 2}` }}>
        {horarios.map((horario, index) => (
          <div key={index} className="grid-row border border-white">
            {horario}
          </div>
        ))}
      </div>
      {/* Mostrar nombres de profesores */}
      {profesores.map((profesor, index) => (
        <div key={index + 1} className="grid-col border border-white" style={{ gridColumn: index + 2, gridRow: '1' }}>
          <div className="grid-row border border-white">
            {profesor.Nombre}
          </div>
        </div>
      ))}
      {/* Mostrar nombres de alumnos */}
      {alumnos.map((alumno, idx) => {
        const alumnoHorarioIndex = horarios.findIndex(horario => horario === alumno.Horario)
        const rowStart = alumnoHorarioIndex + 1
        const duracionFilas = alumno.Duracion / 15
        const rowEnd = alumnoHorarioIndex + duracionFilas + 1

        const profesorIndex = profesores.findIndex(profesor => profesor.Nombre === alumno.Profesor)
        const colStart = profesorIndex + 2
        const colEnd = colStart + 1

        const styles = {
          gridColumn: `${colStart} / ${colEnd}`,
          gridRowStart: rowStart,
          gridRowEnd: rowEnd
        }
        return (
          <div key={idx} className="border border-white bg-orange-300 flex flex-col" style={styles}>
            <p className='mx-auto'>{alumno.Nombre} {alumno.Apellido}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Agenda3
