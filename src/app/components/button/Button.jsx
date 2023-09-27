import React from 'react'

import './Button.scss'

function Button ({ text, mode }) {
  return (
    <button className={`Button Button-${mode}`}>{ text }</button>
  )
}
export default Button
