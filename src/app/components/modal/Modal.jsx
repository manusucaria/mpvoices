import { openSans600, openSans800 } from '@/utils/fonts/fonts'
import React from 'react'

const Modal = ({ isOpen, leggend, onClose, callback }) => {
  return (
    <>
      {isOpen && (
        <div className="bg-black bg-opacity-50 w-screen h-screen fixed top-0 left-0 flex items-center justify-center z-50">
          <div className="w-2/3 sm:w-1/2 md:w-1/3 h-auto p-10 rounded-md bg-white text-black">
            <p className={`text-center text-xl pb-5 ${openSans600.className}`}>
              {leggend}
            </p>
            <div className={`text-orange-600 flex justify-end gap-14 mt-4 ${openSans800.className}`}>
              <button onClick={callback}>Si</button>
              <button onClick={onClose}>No</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default Modal
