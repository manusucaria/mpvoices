import { openSans600 } from '@/utils/fonts/fonts'
import React from 'react'
import Button from '../button/Button'

const Modal = ({ isOpen, leggend, onClose, callback }) => {
  return (
    <>
      {isOpen && (
        <div className="bg-black bg-opacity-50 w-screen h-screen fixed top-0 left-0 flex items-center justify-center">
          <div className="w-2/3 sm:w-1/2 md:w-1/3 h-auto p-5 rounded-md bg-white text-black">
            <p className={`text-center pb-5 ${openSans600.className}`}>
              {leggend}
            </p>
            <div className="flex justify-end mt-4">
            <Button hasACallback mode="light" onClick={onClose} text="Cancelar" />
            <Button hasACallback mode="dark" onClick={callback} text="Aceptar" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default Modal
