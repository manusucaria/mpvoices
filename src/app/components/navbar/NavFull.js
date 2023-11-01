'use client'
import React from 'react'
import Link from 'next/link'
import { openSans600 } from '@/utils/fonts/fonts'
import { routes } from './routes'
import Image from 'next/image'

const NavFull = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0
    })
  }
  return (
    <nav className="bg-black text-white hidden lg:flex fixed top-0 left-0 right-0 py-2 h-[6rem]">
      <div className="my-auto flex w-[20%]">
        <Link onClick={() => scrollToTop()} className="ml-auto hover:scale-110 transition ease-in-out" href="/">
          <Image
            src='/assets/logo/logo.svg'
            width={140}
            height={73}
          />
        </Link>
      </div>
      <div className="flex w-[60%] justify-center my-auto mx-auto">
        {
          routes.map((route) => (
            <div key={route.id} className="flex min-[1024px]:mr-2 min-[1245px]:mr-4 my-auto">
              <Link
                href={route.href}
                className={`mr-auto hover:translate-y-cursor hover:text-[#E9500E] cursor-pointer font-[550] pr-3 text-base ${openSans600.className} text-base`}
              >
                {route.title}
              </Link>
            </div>
          ))
        }
      </div>
      <div className="flex flex-col my-auto w-[20%]">
        <Link className='flex mr-auto min-[1024px]:ml-6' href="/login">
          <div className="relative group">
            <svg
              className="flex w-auto cursor-pointer fill-current text-white hover:text-[#E9500E] mr-auto min-[1024px]:ml-6 min-[1245px]:ml-0"
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="19"
              viewBox="0 0 17 19"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.5 0.500004C7.22256 0.498417 5.98755 0.92772 5.0225 1.70882C4.05744 2.48991 3.42738 3.57017 3.24839 4.75057C3.06941 5.93096 3.35355 7.13196 4.04848 8.13228C4.74341 9.13259 5.80229 9.86484 7.03005 10.1941C5.28539 10.3918 3.78913 10.9673 2.66110 12.005C1.22621 13.3236 0.5 15.2886 0.5 17.8523C0.5 18.0241 0.573124 18.1888 0.703286 18.3103C0.833449 18.4318 1.00999 18.5 1.19406 18.5C1.37814 18.5 1.55468 18.4318 1.68484 18.3103C1.81500 18.1888 1.88813 18.0241 1.88813 17.8523C1.88813 15.5068 2.55005 13.925 3.63571 12.9268C4.72283 11.9273 6.34767 11.4091 8.5 11.4091C10.6523 11.4091 12.2772 11.9273 13.3658 12.9268C14.4500 13.9264 15.1119 15.5068 15.1119 17.8523C15.1119 18.0241 15.1850 18.1888 15.3152 18.3103C15.4453 18.4318 15.6219 18.5 15.8059 18.5C15.9900 18.5 16.1665 18.4318 16.2967 18.3103C16.4269 18.1888 16.5 18.0241 16.5 17.8523C16.5 15.2886 15.7738 13.3250 14.3374 12.005C13.2123 10.9686 11.7146 10.3918 9.96995 10.1941C11.1936 9.86113 12.2477 9.12777 12.9390 8.12842C13.6303 7.12907 13.9125 5.93068 13.7339 4.75290C13.5553 3.57513 12.9279 2.49687 11.9666 1.71577C11.0053 0.934661 9.7746 0.503036 8.5 0.500004ZM4.59132 5.44319C4.59132 4.47575 5.00313 3.54793 5.73615 2.86385C6.46917 2.17977 7.46335 1.79546 8.5 1.79546C9.53664 1.79546 10.5308 2.17977 11.2639 2.86385C11.9969 3.54793 12.4087 4.47575 12.4087 5.44319C12.4087 6.41062 11.9969 7.33844 11.2639 8.02252C10.5308 8.70660 9.53664 9.09091 8.5 9.09091C7.46335 9.09091 6.46917 8.70660 5.73615 8.02252C5.00313 7.33844 4.59132 6.41062 4.59132 5.44319Z"
                fill="currentColor"
              />
            </svg>
            <span className="tooltip text-xs text-[#0D0D0D] absolute top-10 w-36 text-center ml-6 min-[1024px]:ml-0 p-2 bg-white rounded opacity-0 group-hover:opacity-100">Plataforma alumnos</span>
          </div>
        </Link>
      </div>
    </nav>
  )
}

export default NavFull
