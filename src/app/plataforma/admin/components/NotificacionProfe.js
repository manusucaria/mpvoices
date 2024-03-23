import React, { useState } from 'react'
import { format } from 'date-fns'

const NotificacionProfe = ({
  alumno,
  agendadas,
  canceladas,
  setAgendadas,
  setCanceladas,
  setShowNotification
}) => {
  const closeNotification = () => {
    setAgendadas([])
    setCanceladas([])
    setShowNotification(false)
  }
  const [showingNotifications, setShowingNotifications] = useState(true)
  const toggleView = () => {
    setShowingNotifications(!showingNotifications)
  }

  const sortedCanceladas = canceladas.sort((a, b) => {
    const dateA = a.fecha.toDate().getTime()
    const dateB = b.fecha.toDate().getTime()
    return dateA - dateB
  })
  const sortedAgendadas = agendadas.sort((a, b) => {
    const dateA = a.fecha.toDate().getTime()
    const dateB = b.fecha.toDate().getTime()
    return dateA - dateB
  })

  return (
      <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center px-3 bg-[#0D0D0D] bg-opacity-30 z-[100]'>
          {showingNotifications
            ? <div className='rounded-lg p-12 h-auto w-[90%] min-[490px]:w-4/6 md:w-3/6 lg:w-2/6 mx-auto flex flex-col bg-[#FFFFFF]'>
              <svg className='mx-auto mb-4 w-6 h-6' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.55 2.08L4.12 0.65C1.72 2.48 0.14 5.3 0 8.5H2C2.15 5.85 3.51 3.53 5.55 2.08ZM17.94 8.5H19.94C19.79 5.3 18.21 2.48 15.82 0.65L14.4 2.08C16.42 3.53 17.79 5.85 17.94 8.5ZM15.97 9C15.97 5.93 14.33 3.36 11.47 2.68V2C11.47 1.17 10.8 0.5 9.97 0.5C9.14 0.5 8.47 1.17 8.47 2V2.68C5.6 3.36 3.97 5.92 3.97 9V14L1.97 16V17H17.97V16L15.97 14V9ZM9.97 20C10.11 20 10.24 19.99 10.37 19.96C11.02 19.82 11.55 19.38 11.81 18.78C11.91 18.54 11.96 18.28 11.96 18H7.96C7.97 19.1 8.86 20 9.97 20Z" fill="#0D0D0D"/>
              </svg>
            <p className='text-[#0D0D0D] font-bold text-xl mx-auto mb-8'>Notificaciones</p>
            {sortedCanceladas.length > 0
              ? <div className='mb-8 mx-auto flex flex-col'>
                  <p className='text-[#0D0D0D] font-bold text-lg mx-auto mb-4'>Canceladas</p>
                  <div className='flex flex-col w-full mx-auto gap-y-2'>
                    {sortedCanceladas.map((item, index) => (
                      <div key={index} className='text-[#0D0D0D] font-bold mx-auto'>
                        <p>- {alumno.usuario.full_name.nombre} {alumno.usuario.full_name.apellido} no asistirá a la clase del {format(item.fecha.toDate(), 'dd/MM/yyyy')}</p>
                      </div>
                    ))}
                  </div>
                </div>
              : ''}
              {sortedAgendadas.length > 0
                ? <div className='mb-8 mx-auto flex flex-col'>
                    <p className='text-[#0D0D0D] font-bold text-lg mx-auto mb-4'>Agendadas</p>
                    <div className='flex flex-col w-full mx-auto gap-y-2'>
                      {sortedAgendadas.map((item, index) => (
                        <div key={index} className='text-[#0D0D0D] font-bold mx-auto'>
                          <p>- {item.alumno.full_name.nombre} {item.alumno.full_name.apellido} asistirá a la clase del {format(item.fecha.toDate(), 'dd/MM/yyyy')}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                : ''}
            <div className='flex justify-center gap-x-12 sm:gap-x-16 mt-8'>
              <button className='text-orange-600 font-bold md:hover:text-orange-300' onClick={toggleView}>
                Ver Notas
              </button>
              <button className='text-orange-600 font-bold md:hover:text-orange-300' onClick={closeNotification}>
                Salir
              </button>
            </div>
          </div>
            : <div className='rounded-lg p-12 h-auto w-[90%] min-[490px]:w-4/6 md:w-3/6 lg:w-2/6 mx-auto flex flex-col bg-[#FFFFFF]'>
            <svg className='mx-auto mb-4' width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.6377 7.30139L22.2969 6.60706C22.6309 6.2555 22.6572 5.7721 22.3232 5.43811L22.0947 5.20081C21.7959 4.90198 21.2949 4.94593 20.9697 5.27112L20.2842 5.93909L21.6377 7.30139ZM11.2314 16.653L13.0332 15.8971L20.9961 7.93421L19.6426 6.58948L11.6797 14.5612L10.8887 16.3014C10.8008 16.5035 11.0293 16.7321 11.2314 16.653ZM7.8916 22.5504H18.1309C19.8184 22.5504 20.8115 21.566 20.8115 19.6852V10.4039L19.0537 12.153V19.527C19.0537 20.3707 18.6055 20.7926 18.0166 20.7926H8.00586C7.19727 20.7926 6.75781 20.3707 6.75781 19.527V9.76233C6.75781 8.91858 7.19727 8.49671 8.00586 8.49671H15.4678L17.2168 6.73889H7.8916C5.99316 6.73889 5 7.72327 5 9.60413V19.6852C5 21.566 5.99316 22.5504 7.8916 22.5504Z" fill="#080808"/>
            </svg>
            <p className='text-[#0D0D0D] font-bold text-xl mx-auto mb-8'>Notas</p>
            <div className='flex flex-col mx-auto w-full gap-y-2'>
              {alumno.Notas.map((item, index) => (
                <div key={index} className='flex mx-auto gap-x-6'>
                    <div className='text-[#0D0D0D] text-base my-auto font-bold'>- {item}</div>
                </div>
              ))}
            </div>
            <div className='flex justify-center mt-8'>
              <button className='text-orange-600 font-bold md:hover:text-orange-300' onClick={toggleView}>
                Volver
              </button>
            </div>
          </div>
          }
        </div>
  )
}

export default NotificacionProfe
