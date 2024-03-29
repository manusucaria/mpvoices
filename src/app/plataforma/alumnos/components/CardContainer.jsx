import { playfair600 } from '@/utils/fonts/fonts'
import React from 'react'

const CardContainer = ({
  children,
  button,
  title,
  isTitlePlayfair = false,
  warning,
  top,
  bottom,
  header,
  icon
}) => {
  return (
    <div className="bg-black w-full sm:w-2/3 md:w-1/2 p-10 text-base flex flex-col items-center gap-10">
      {icon}
      <div className="w-full">
        <h3 className={`w-full text-start border-b-1 pb-2 ${isTitlePlayfair ? 'text-2xl' : 'text-xl'} ${isTitlePlayfair && playfair600.className}`}>{title}</h3>
        {warning && top && (
          <p className="w-full border-b-1 py-2">
            Importante:{' '}
            <span className="text-orange-300">
              recordá que las clases sólo se pueden cancelar con más de 24 hs de
              antelación.
            </span>
          </p>
        )}
        {header}
      </div>
      {children}
      {warning && bottom && (
        <p className="w-full border-y-1 py-1">
          Importante:{' '}
          <span className="text-orange-300">
            recordá que las clases sólo se pueden cancelar con más de 24 hs de
            antelación.
          </span>
        </p>
      )}
      {button}
    </div>
  )
}
export default CardContainer
