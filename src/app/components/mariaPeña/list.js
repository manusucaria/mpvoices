import { v4 as uuidv4 } from 'uuid'

export const list = [
  { id: uuidv4(), title: 'En 2003 crea Voices' },
  { id: uuidv4(), title: 'Es cantante' },
  { id: uuidv4(), title: 'Fonoaudióloga especializada en voz' },
  { id: uuidv4(), title: 'Coach Ontológico' },
  { id: uuidv4(), title: 'Master en PNL' },
  { id: uuidv4(), title: 'Formadora de pedagogía del canto' },
  {
    id: uuidv4(),
    title: 'Creadora de su disco',
    link: {
      href: 'https://open.spotify.com/intl-es/album/3VyyDvIRBzhZnJDSu3up08',
      title: 'Sol Fuerte de Mayo'
    }
  }
]
