import React from 'react'
import Image from 'next/image'
import maria from '../../assets/maria.png'
import usal from '../../assets/usal.jpg'
import newfield from '../../assets/newfield.jpg'
import ellipse from '../../assets/ellipse.jpg'
import disco from '../../assets/disco.jpg'
import { openSans600, playfair600 } from '@/utils/fonts/fonts'
import { list } from './list'

const MariaPeñaFull = () => {
  return (
    <div className="bg-white text-black hidden lg:flex pt-24 pb-12">
      <div className="flex w-auto ml-auto">
        <Image
          width={800}
          height={800}
          className="w-60 h-60 rounded-full mt-6"
          src={maria}
          alt="Foto Maria"
          priority
        />
      </div>
      <div className="w-[50%] mr-auto flex flex-col">
        <h2 className={`text-center pb-6 text-3xl sm:text-5xl ${playfair600.className}`}>
          María Peña
        </h2>
        <ol className={`flex flex-col gap-4 mb-10 list-disc text-base ${openSans600.className}`}>
          {
            list.map((item) => (
              <li key={item.id} className='mx-auto'>
                <span className="w-1 h-1 bg-black rounded-full"></span>
                {item.title} { item.link && ' ' }
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
        <div className="flex mx-auto">
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
            className="h-10 w-32 mr-10 my-auto"
            src={usal}
            alt="Foto Usal"
          />
          <Image
            width={500}
            height={500}
            className="h-10 w-32 mr-10 my-auto"
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
