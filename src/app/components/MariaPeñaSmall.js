import React from 'react'

import Image from 'next/image'
import maria from '../assets/maria.png'
import usal from '../assets/usal.jpg'
import newfield from '../assets/newfield.jpg'
import ellipse from '../assets/ellipse.jpg'
import disco from '../assets/disco.jpg'

const MariaPeñaSmall = () => {
  return (
    <div className="bg-[#ffffff] flex flex-col lg:hidden py-6">
      <Image
        width={500}
        height={500}
        className="w-44 h-44 mx-auto rounded-full my-10"
        src={maria}
        alt="Foto Maria"
        priority
      />
      <h2 className="text-center text-2xl font-bold bg-[#ffffff] text-[#0D0D0D] mb-6">
        María Peña
      </h2>
      <ol className="flex flex-col bg-[#ffffff] mb-8 list-disc">
        <li className="mx-auto text-sm font-semibold bg-[#ffffff] text-[#0D0D0D] mb-4">
          <span className="w-1 h-1 bg-black rounded-full"></span>
          En 2003 crea Voices
        </li>
        <li className="mx-auto text-sm font-semibold bg-[#ffffff] text-[#0D0D0D] mb-4">
          <span className="w-1 h-1 bg-black rounded-full"></span>
          Es cantante
        </li>
        <li className="mx-auto text-sm font-semibold bg-[#ffffff] text-[#0D0D0D] mb-4">
          <span className="w-1 h-1 bg-black rounded-full"></span>
          Fonoaudióloga especializada en voz
        </li>
        <li className="mx-auto text-sm font-semibold bg-[#ffffff] text-[#0D0D0D] mb-4">
          <span className="w-1 h-1 bg-black rounded-full"></span>
          Coach Ontológico
        </li>
        <li className="mx-auto text-sm font-semibold bg-[#ffffff] text-[#0D0D0D] mb-4">
          <span className="w-1 h-1 bg-black rounded-full"></span>
          Master en PNL
        </li>
        <li className="mx-auto text-sm font-semibold bg-[#ffffff] text-[#0D0D0D] mb-4">
          <span className="w-1 h-1 bg-black rounded-full"></span>
          Formadora de pedagogía del canto
        </li>
        <li className="mx-auto text-sm font-semibold bg-[#ffffff] text-[#0D0D0D]">
          <span className="w-1 h-1 bg-black rounded-full"></span>
          Creadora de su disco{' '}
          <a
            className="text-sm font-semibold bg-[#ffffff] text-[#E9500E]"
            href="https://open.spotify.com/intl-es/album/3VyyDvIRBzhZnJDSu3up08"
            target="_blank"
            rel="noreferrer"
          >
            Sol Fuerte de Mayo
          </a>
        </li>
      </ol>
      <Image
        width={500}
        height={500}
        className="mx-auto w-16 h-auto mb-6"
        src={disco}
        alt="Foto Tapa Disco"
      />
      <Image
        width={500}
        height={500}
        className="mx-auto w-28 h-auto mb-6"
        src={usal}
        alt="Foto Usal"
      />
      <Image
        width={500}
        height={500}
        className="mx-auto w-28 h-auto mb-6"
        src={newfield}
        alt="Foto Newfield"
      />
      <Image
        width={500}
        height={500}
        className="mx-auto w-14 h-auto mb-6"
        src={ellipse}
        alt="Foto Ellipse"
      />
    </div>
  )
}

export default MariaPeñaSmall
