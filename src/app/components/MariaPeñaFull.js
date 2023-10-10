import React from 'react'

import Image from 'next/image'
import maria from '../assets/maria.png'
import usal from '../assets/usal.jpg'
import newfield from '../assets/newfield.jpg'
import ellipse from '../assets/ellipse.jpg'
import disco from '../assets/disco.jpg'

const MariaPeñaFull = () => {
  return (
    <div className="bg-[#ffffff] hidden lg:flex py-12">
      <div className="flex w-auto ml-auto bg-[#ffffff] pt-6">
        <Image
          width={500}
          height={500}
          className="w-60 h-60 rounded-full"
          src={maria}
          alt="Foto Maria"
          priority
        />
      </div>
      <div className="w-[50%] bg-[#ffffff] mr-auto flex flex-col pt-6">
        <h2 className="text-center text-2xl font-bold bg-[#ffffff] text-[#0D0D0D] mb-4">
          María Peña
        </h2>
        <ol className="flex flex-col bg-[#ffffff] mb-10 list-disc">
          <li className="mx-auto text-sm font-semibold bg-[#ffffff] text-[#0D0D0D] mb-3">
            <span className="w-1 h-1 bg-black rounded-full"></span>
            En 2003 crea Voices
          </li>
          <li className="mx-auto text-sm font-semibold bg-[#ffffff] text-[#0D0D0D] mb-3">
            <span className="w-1 h-1 bg-black rounded-full"></span>
            Es cantante
          </li>
          <li className="mx-auto text-sm font-semibold bg-[#ffffff] text-[#0D0D0D] mb-3">
            <span className="w-1 h-1 bg-black rounded-full"></span>
            Fonoaudióloga especializada en voz
          </li>
          <li className="mx-auto text-sm font-semibold bg-[#ffffff] text-[#0D0D0D] mb-3">
            <span className="w-1 h-1 bg-black rounded-full"></span>
            Coach Ontológico
          </li>
          <li className="mx-auto text-sm font-semibold bg-[#ffffff] text-[#0D0D0D] mb-3">
            <span className="w-1 h-1 bg-black rounded-full"></span>
            Master en PNL
          </li>
          <li className="mx-auto text-sm font-semibold bg-[#ffffff] text-[#0D0D0D] mb-3">
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
        <div className="flex mx-auto bg-[#ffffff]">
          <Image
            width={500}
            height={500}
            className="h-16 w-16 mr-10"
            src={disco}
            alt="Foto Tapa Disco"
          />
          <Image
            width={500}
            height={500}
            className="h-10 w-28 mr-10 my-auto"
            src={usal}
            alt="Foto Usal"
          />
          <Image
            width={500}
            height={500}
            className="h-10 w-28 mr-10 my-auto"
            src={newfield}
            alt="Foto Newfield"
          />
          <Image
            width={500}
            height={500}
            className="h-14 w-14"
            src={ellipse}
            alt="Foto Ellipse"
          />
        </div>
      </div>
    </div>
  )
}

export default MariaPeñaFull
