import React from 'react'

import AgendaFull from '../components/AgendaFull'
import AgendaSmall from '../components/AgendaSmall'
import AgendaFullScreen from '../components/AgendaFullScreen'

const Agenda = ({ cambios }) => {
  return (
    <div>
      <AgendaFullScreen cambios={cambios} />
      <AgendaFull cambios={cambios} />
      <AgendaSmall cambios={cambios} />
    </div>
  )
}

export default Agenda
