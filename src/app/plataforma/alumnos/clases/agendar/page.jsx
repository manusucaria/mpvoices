import React from 'react'

import { playfair600 } from '@/utils/fonts/fonts'
import ButtonReturn from '../../components/ButtonReturn'

const page = () => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full py-10 text-center flex items-center justify-center relative">
        <ButtonReturn />
        <h2 className={`text-xl sm:text-2xl ${playfair600.className}`}>
          Agendar clase
        </h2>
      </div>
    </div>
  )
}
export default page
