'use client'

import React, { useState } from 'react'

import Link from 'next/link'

import Modal from '@/app/components/modal/Modal'
import Loader from '@/app/components/loader/Loader'

import { signOut } from '@/lib/firebase/auth'

const Aside = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    await signOut()
    window.location.reload()
    setLoading(false)
  }

  if (loading) return <Loader />

  return (
    <>
      <ul className="flex flex-col items-center gap-12">
        <li>
          <Link
            href="/plataforma/alumnos"
            className="flex flex-col items-center justify-center gap-2 hover:text-orange-600"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7.99613 16C12.3809 16 16 12.3791 16 8C16 3.62089 12.3731 0 7.9884 0C3.61141 0 0 3.62089 0 8C0 12.3791 3.61914 16 7.99613 16ZM7.99613 14.4062C4.44659 14.4062 1.60851 11.5513 1.60851 8C1.60851 4.44874 4.44659 1.60155 7.9884 1.60155C11.5379 1.60155 14.3915 4.44874 14.3992 8C14.407 11.5513 11.5457 14.4062 7.99613 14.4062ZM4.0986 8.97486H7.9884C8.34413 8.97486 8.61479 8.70406 8.61479 8.3559V3.29594C8.61479 2.94778 8.34413 2.67698 7.9884 2.67698C7.64814 2.67698 7.37748 2.94778 7.37748 3.29594V7.73694H4.0986C3.7506 7.73694 3.47994 8.00774 3.47994 8.3559C3.47994 8.70406 3.7506 8.97486 4.0986 8.97486Z" />
            </svg>
            <p className="mx-auto text-base">Dias y horarios</p>
          </Link>
        </li>
        <li>
          <button
            className="flex flex-col items-center justify-center gap-2 hover:text-orange-600"
            onClick={() => setModalOpen(true)}
          >
            <svg
              width="16"
              height="18"
              viewBox="0 0 16 18"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0.475586 1.70833C0.475586 0.903333 1.12892 0.25 1.93392 0.25H6.51725C6.68301 0.25 6.84198 0.315848 6.95919 0.433058C7.0764 0.550269 7.14225 0.70924 7.14225 0.875C7.14225 1.04076 7.0764 1.19973 6.95919 1.31694C6.84198 1.43415 6.68301 1.5 6.51725 1.5H1.93392C1.87867 1.5 1.82568 1.52195 1.78661 1.56102C1.74754 1.60009 1.72559 1.65308 1.72559 1.70833V16.2917C1.72559 16.4067 1.81892 16.5 1.93392 16.5H6.51725C6.68301 16.5 6.84198 16.5658 6.95919 16.6831C7.0764 16.8003 7.14225 16.9592 7.14225 17.125C7.14225 17.2908 7.0764 17.4497 6.95919 17.5669C6.84198 17.6842 6.68301 17.75 6.51725 17.75H1.93392C1.54715 17.75 1.17621 17.5964 0.902722 17.3229C0.629231 17.0494 0.475586 16.6784 0.475586 16.2917V1.70833ZM13.8139 9.625H6.93392C6.76816 9.625 6.60919 9.55915 6.49198 9.44194C6.37477 9.32473 6.30892 9.16576 6.30892 9C6.30892 8.83424 6.37477 8.67527 6.49198 8.55806C6.60919 8.44085 6.76816 8.375 6.93392 8.375H13.8139L11.0639 5.47167C10.9544 5.35064 10.8966 5.19157 10.9028 5.02846C10.909 4.86536 10.9788 4.71115 11.0972 4.59882C11.2156 4.48649 11.3733 4.42494 11.5365 4.42734C11.6997 4.42975 11.8555 4.4959 11.9706 4.61167L15.7206 8.57C15.8307 8.68611 15.892 8.84001 15.892 9C15.892 9.15999 15.8307 9.31389 15.7206 9.43L11.9706 13.3883C11.8555 13.5041 11.6997 13.5703 11.5365 13.5727C11.3733 13.5751 11.2156 13.5135 11.0972 13.4012C10.9788 13.2888 10.909 13.1346 10.9028 12.9715C10.8966 12.8084 10.9544 12.6494 11.0639 12.5283L13.8139 9.625Z" />
            </svg>
            <p className="cursor-pointer text-base">Cerrar sesión</p>
          </button>
        </li>
      </ul>
      <Modal
        leggend="¿Estás segur@ que deseas cerrar sesión?"
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        callback={handleLogout}
      />
    </>
  )
}
export default Aside
