import React from 'react'

import Aside from './components/Aside'
import User from './components/User'

export const metadata = {
  title: 'Plataforma voices'
}

const layout = ({ children }) => {
  return (
    <div className="w-full flex items-start">
      <div className="w-2/12 py-24">
        <Aside />
      </div>
      <div className="w-full flex flex-col items-center justify-center border-l-1">
        <User>
          <div className="w-full">{children}</div>
        </User>
      </div>
      <div className="w-2/12"></div>
    </div>
  )
}
export default layout
