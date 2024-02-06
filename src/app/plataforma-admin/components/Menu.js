import React from 'react'

const Menu = ({ handleLogOut }) => {
  const handleClick = (event, id) => {
    event.preventDefault()
    const targetElement = document.getElementById(id)
    if (targetElement) {
      const targetPosition = targetElement.offsetTop - 100 // Ajuste de 10rem hacia arriba
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className='flex flex-col gap-y-24 mt-24'>
      <a className='mx-auto text-white text-base' href='/plataforma-admin/#Agenda' onClick={(e) => handleClick(e, 'Agenda')}>
        Dias y horarios
      </a>
      <a className='mx-auto text-white text-base' href='/plataforma-admin/#Buscar' onClick={(e) => handleClick(e, 'Buscar')}>
        Buscar usuarios
      </a>
      <a className='mx-auto text-white text-base' href='/plataforma-admin/#Crear' onClick={(e) => handleClick(e, 'Crear')}>
        Nuevos usuarios
      </a>
      <div className='mx-auto'>
        <p onClick={handleLogOut} className='cursor-pointer text-white text-base'>Cerrar sesión</p>
      </div>
    </div>
  )
}

export default Menu
