import React from 'react'

const ConfirmacionEdicion = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-[#FFFFFF] p-12 rounded-lg text-center flex flex-col">
        <p className="text-[#0D0D0D] text-xl mb-4 font-bold">Los cambios se guardaron correctamente.</p>
        <button
          className="text-[#E9500E] md:hover:text-[#DB9B6D] ml-auto font-bold"
          onClick={handleCloseConfirmation}
        >
          Entendido
        </button>
      </div>
    </div>
  )
}

export default ConfirmacionEdicion
