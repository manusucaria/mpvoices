import React from 'react'

import AgendaFull from '../components/AgendaFull'
import AgendaSmall from '../components/AgendaSmall'

const Agenda = ({ cambios }) => {
  return (
    <div>
      <AgendaFull cambios={cambios} />
      <AgendaSmall cambios={cambios} />
    </div>
  )
}

export default Agenda
