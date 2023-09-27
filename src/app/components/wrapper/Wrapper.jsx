import React from 'react'
import './Wrapper.scss'

function Wrapper ({ children, className }) {
  return (
    <div className={`Wrapper ${className}`}>
      { children }
    </div>
  )
}
export default Wrapper
