import React from 'react'

const CardContainer = ({ children, title }) => {
  return (
    <div className="bg-black w-1/2 p-10 text-base flex flex-col items-center gap-10">
      <h3 className="w-full text-start border-b-1 pb-1 text-xl">{title}</h3>
      {children}
    </div>
  )
}
export default CardContainer
