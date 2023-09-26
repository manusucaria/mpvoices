

const NavFull = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
        });
    };
    return (
        <nav className="hidden lg:flex fixed top-0 left-0 right-0 py-6">
            <div className="my-auto flex ml-auto" onClick={() => scrollToTop()}>
                <h4>PORTADA</h4>
            </div>
            <div className="flex my-auto mx-auto">
                
                {/* Espacio Voices */}
                <div className="flex flex-col pl-2">
                    <div className="flex">
                        <div className="flex my-auto">
                            <h4 className="mr-auto hover:translate-y-cursor cursor-pointer font-[500] transition-all duration-150 ease-in-out pr-3">Espacio voices</h4>
                        </div>
                    </div>                           
                </div>

                {/* Maria Peña */}
                <div className="flex flex-col px-2">
                    <div className="flex">
                        <div className="flex my-auto">
                            <h4 className="mr-auto hover:translate-y-cursor cursor-pointer font-[500] transition-all duration-150 ease-in-out pr-3">Maria Peña</h4>
                        </div>
                    </div>                           
                </div>

                {/* Clases */}
                <div className="flex flex-col px-2">
                    <div className="flex">
                        <div className="flex my-auto">
                            <h4 className="mr-auto hover:translate-y-cursor cursor-pointer font-[500] transition-all duration-150 ease-in-out pr-3">Clases</h4>
                        </div>
                    </div>                           
                </div>

                {/* Nuevos Proyectos */}
                <div className="flex flex-col px-2">
                    <div className="flex">
                        <div className="flex my-auto">
                            <h4 className="mr-auto hover:translate-y-cursor cursor-pointer font-[500] transition-all duration-150 ease-in-out pr-3">Nuevos Proyectos</h4>
                        </div>
                    </div>                           
                </div>

                {/* Contacto */}
                <div className="flex flex-col pr-2">
                    <div className="flex">
                        <div className="flex my-auto">
                            <h4 className="mr-auto hover:translate-y-cursor cursor-pointer font-[500] transition-all duration-150 ease-in-out">Contacto</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex my-auto mr-auto">
                <p>USARIO</p>
            </div>
    </nav>
    )
}

export default NavFull