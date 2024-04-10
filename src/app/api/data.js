export const horarios = (() => {
  const horarios = []
  let hora = 10
  let minutos = 0

  while (!(hora === 21 && minutos === 0)) {
    const horaStr = hora.toString().padStart(2, '0')
    const minStr = minutos.toString().padStart(2, '0')
    horarios.push(`${horaStr}:${minStr}`)
    minutos += 15
    if (minutos === 60) {
      minutos = 0
      hora += 1
    }
  }

  return horarios
})()

export const duracionOptions = [30, 45, 60, 75, 90, 105, 120]

export const diasSemana = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes']

export const instrumentos = [
  'Violin', 'Viola', 'Cello', 'Contrabajo', 'Bajo', 'Piano', 'Guitarra',
  'Batería', 'Ukelele', 'Canto', 'Inic. musical', 'Ensamble vocal', 'Ensamble',
  'Dúo de canto', 'Trío de canto', 'Cuarteto de canto', 'Bandoneón', 'Saxo',
  'Trompeta', 'Composición', 'Producción', 'Prof. de canto', 'Arpa'
].sort()
