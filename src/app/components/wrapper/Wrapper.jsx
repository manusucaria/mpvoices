import React from 'react'
import './Wrapper.scss'

function Wrapper ({ children }) {
  return (
    <div className="Wrapper">
      { children }
    </div>
  )
}
export default Wrapper
