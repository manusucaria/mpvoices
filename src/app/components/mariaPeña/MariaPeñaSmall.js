import React from 'react'
import Image from 'next/image'
import maria from '../../assets/maria.png'
import usal from '../../assets/usal.jpg'
import newfield from '../../assets/newfield.jpg'
import ellipse from '../../assets/ellipse.jpg'
import disco from '../../assets/disco.jpg'
import { list } from './list'
import { openSans600, playfair600 } from '@/utils/fonts/fonts'

const MariaPeñaSmall = () => {
  return (
    <div className="bg-white text-black flex flex-col lg:hidden pt-8 pb-6">
      <Image
        width={500}
        height={500}
        className="w-44 h-44 mx-auto rounded-full my-6"
        src={maria}
        alt="Foto Maria"
        priority
      />
      <h2 className={`text-center mb-6 text-3xl sm:text-5xl ${playfair600.className}`}>
        María Peña
      </h2>
      <ol className={`flex flex-col gap-4 mb-8 list-disc text-base mx-4 ${openSans600.className}`}>
        {
          list.map((item) => (
            <li key={item.id} className="mx-auto text-base">
              <span className="w-1 h-1 bg-black rounded-full"></span>
              {item.title} {item.link && ' '}
              {
                item.link &&
                  <a
                    className="text-base text-[#E9500E]"
                    href={item.link.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.link.title}
                  </a>
              }
            </li>
          ))
        }
      </ol>
      <Image
        width={500}
        height={500}
        className="mx-auto w-20 h-auto mb-6"
        src={disco}
        alt="Foto Tapa Disco"
      />
      <Image
        width={500}
        height={500}
        className="mx-auto w-36 h-auto mb-6"
        src={usal}
        alt="Foto Usal"
      />
      <Image
        width={500}
        height={500}
        className="mx-auto w-36 h-12 mb-6"
        src={newfield}
        alt="Foto Newfield"
      />
      <Image
        width={500}
        height={500}
        className="mx-auto w-16 h-auto"
        src={ellipse}
        alt="Foto Ellipse"
      />
    </div>
  )
}

export default MariaPeñaSmall
