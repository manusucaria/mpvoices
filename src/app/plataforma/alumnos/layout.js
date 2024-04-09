import React from 'react'

import Aside from './components/Aside'
import User from './components/User'

export const metadata = {
  title: 'Plataforma voices'
}

const layout = ({ children }) => {
  return (
    <div className="w-full flex items-start">
      <aside className="w-2/12 py-24 hidden lg:grid">
        <Aside />
      </aside>
      <div className="w-full flex flex-col items-center justify-center lg:border-l-1">
        <User>{children}</User>
      </div>
      <div className="w-2/12 hidden lg:grid"></div>
    </div>
  )
}
export default layout
