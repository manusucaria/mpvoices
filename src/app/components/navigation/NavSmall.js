'use client'
import { openSans600 } from '@/utils/fonts/fonts'
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'

const NavSmall = () => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const appContainerRef = useRef(null)
  const [usuario, setUsuario] = useState()
  useEffect(() => {
    const usuario = localStorage.getItem('usuario')
    setUsuario(usuario)
  })

  useEffect(() => {
    const handleLinkClick = (event) => {
      event.preventDefault()
      const targetId = event.target.getAttribute('href').substring(1)
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        const targetOffsetTop = targetElement.offsetTop
        if (targetOffsetTop + window.innerHeight >= document.body.scrollHeight) {
          window.scrollTo(0, document.body.scrollHeight)
        } else {
          window.scrollTo({
            top: targetOffsetTop,
            behavior: 'smooth'
          })
        }
        setIsNavOpen(false)
      }
    }

    const handleClickOutside = (event) => {
      if (appContainerRef.current && !appContainerRef.current.contains(event.target)) {
        setIsNavOpen(false)
      }
    }

    if (isNavOpen) {
      document.addEventListener('click', handleClickOutside)
    } else {
      document.removeEventListener('click', handleClickOutside)
    }

    const links = document.querySelectorAll('Link[href^="#"]')
    links.forEach((link) => {
      link.addEventListener('click', handleLinkClick)
    })

    return () => {
      document.removeEventListener('click', handleClickOutside)
      links.forEach((link) => {
        link.removeEventListener('click', handleLinkClick)
      })
    }
  }, [isNavOpen])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0
    })
  }

  const routes = [
    {
      label: 'Espacio Voices',
      link: '/#EspacioVoices'
    },
    {
      label: 'María Peña',
      link: '/#MariaPeña'
    },
    {
      label: 'Clases',
      link: '/#Clases'
    },
    {
      label: 'Nuevos Proyectos',
      link: '/#NuevosProyectos'
    },
    {
      label: 'Contacto',
      link: '/#Footer'
    },
    {
      label: 'Plataforma Alumnos',
      link: usuario === 'profesor'
        ? '/plataforma-profes'
        : usuario === 'alumno'
          ? '/plataforma-alumnos'
          : usuario === 'admin'
            ? '/plataforma-admin'
            : '/login'
    }
  ]

  return (
    <nav className="bg-black flex lg:hidden flex-col fixed top-0 left-0 right-0 h-[3rem]">
      <div className="flex items-center">
        {isNavOpen === false
          ? (
          <div className="flex items-center w-full h-auto py-4">
            <div className="flex flex-col mr-auto pl-6">
              <div
                className="space-y-1 cursor-pointer"
                onClick={() => setIsNavOpen((prev) => !prev)}
              >
                <span className="block h-[.1rem] w-3 animate-pulse bg-white"></span>
                <span className="block h-[.1rem] w-3 animate-pulse bg-white"></span>
                <span className="block h-[.1rem] w-3 animate-pulse bg-white"></span>
              </div>
            </div>
            <div className="flex ml-auto my-auto pr-6">
              <div className="flex" onClick={() => scrollToTop()}>
                <a href={usuario === 'profesor'
                  ? '/plataforma-profes'
                  : usuario === 'alumno'
                    ? '/plataforma-alumnos'
                    : usuario === 'admin'
                      ? '/plataforma-admin'
                      : '/login'} className="flex my-auto"
                >
                  <svg
                    className="cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="19"
                    viewBox="0 0 17 19"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.5 0.500004C7.22256 0.498417 5.98755 0.92772 5.0225 1.70882C4.05744 2.48991 3.42738 3.57017 3.24839 4.75057C3.06941 5.93096 3.35355 7.13196 4.04848 8.13228C4.74341 9.13259 5.80229 9.86484 7.03005 10.1941C5.28539 10.3918 3.78913 10.9673 2.6611 12.005C1.22621 13.3236 0.5 15.2886 0.5 17.8523C0.5 18.0241 0.573124 18.1888 0.703286 18.3103C0.833449 18.4318 1.00999 18.5 1.19406 18.5C1.37814 18.5 1.55468 18.4318 1.68484 18.3103C1.815 18.1888 1.88813 18.0241 1.88813 17.8523C1.88813 15.5068 2.55005 13.925 3.63571 12.9268C4.72283 11.9273 6.34767 11.4091 8.5 11.4091C10.6523 11.4091 12.2772 11.9273 13.3658 12.9268C14.45 13.9264 15.1119 15.5068 15.1119 17.8523C15.1119 18.0241 15.185 18.1888 15.3152 18.3103C15.4453 18.4318 15.6219 18.5 15.8059 18.5C15.99 18.5 16.1665 18.4318 16.2967 18.3103C16.4269 18.1888 16.5 18.0241 16.5 17.8523C16.5 15.2886 15.7738 13.325 14.3374 12.005C13.2123 10.9686 11.7146 10.3918 9.96995 10.1941C11.1936 9.86113 12.2477 9.12777 12.939 8.12842C13.6303 7.12907 13.9125 5.93068 13.7339 4.7529C13.5553 3.57513 12.9279 2.49687 11.9666 1.71577C11.0053 0.934661 9.7746 0.503036 8.5 0.500004ZM4.59132 5.44319C4.59132 4.47575 5.00313 3.54793 5.73615 2.86385C6.46917 2.17977 7.46335 1.79546 8.5 1.79546C9.53664 1.79546 10.5308 2.17977 11.2639 2.86385C11.9969 3.54793 12.4087 4.47575 12.4087 5.44319C12.4087 6.41062 11.9969 7.33844 11.2639 8.02252C10.5308 8.7066 9.53664 9.09091 8.5 9.09091C7.46335 9.09091 6.46917 8.7066 5.73615 8.02252C5.00313 7.33844 4.59132 6.41062 4.59132 5.44319Z"
                      fill="white"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
            )
          : (
          <div ref={appContainerRef} className="flex items-center w-[60%] sm:w-1/2 pl-8 py-6 bg-white">
            <svg
              onClick={() => setIsNavOpen((prev) => !prev)}
              className="h-4 w-4 bg-white mr-auto cursor-pointer animate-pulse"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0D0D0D"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="24" y1="6" x2="6" y2="24" />
              <line x1="6" y1="6" x2="24" y2="24" />
            </svg>
          </div>
            )}
      </div>
      {isNavOpen === true
        ? <div ref={appContainerRef} className="flex flex-col w-[60%] sm:w-1/2 pb-28 justify-between h-auto pl-6 animate-display bg-white">
          {routes.map((route) => (
            <div key={route.label} className="flex bg-white">
              <div className="flex mb-2 bg-white">
                <Link
                  onClick={() => setIsNavOpen(false)}
                  href={route.link}
                  className={`bg-white text-black mr-auto text-base ${openSans600.className}`}
                >
                  {route.label}
                </Link>
              </div>
            </div>
          ))}
        </div>
        : ''}
    </nav>
  )
}

export default NavSmall
