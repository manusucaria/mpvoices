import React from 'react'
import AgendaTablet from '../components/AgendaTablet'
import AgendaSmall from '../components/AgendaSmall'
import AgendaFullScreen from '../components/AgendaFullScreen'
import AgendaNotebook from '../components/AgendaNotebook'

const Agenda = ({ cambios }) => {
  return (
    <div>
      <AgendaFullScreen cambios={cambios} />
      <AgendaNotebook cambios={cambios} />
      <AgendaTablet cambios={cambios} />
      <AgendaSmall cambios={cambios} />
    </div>
  )
}

export default Agenda
