import Link from "next/link";

const NavFull = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
        });
    };
    return (
        <nav className="hidden lg:flex fixed top-0 left-0 right-0 py-6">
            <div className="my-auto flex ml-auto" onClick={() => scrollToTop()}>
                <Link href='/'>PORTADA</Link>
            </div>
            <div className="flex my-auto mx-auto">
                
                {/* Espacio Voices */}
                <div className="flex pl-2 my-auto">
                    <Link href='/' className="mr-auto hover:translate-y-cursor cursor-pointer font-[500] pr-3 text-base">Espacio voices</Link>                   
                </div>

                {/* Maria Peña */}
                <div className="flex px-2 my-auto">
                    <Link href='/' className="mr-auto hover:translate-y-cursor cursor-pointer font-[500] pr-3 text-base">Maria Peña</Link>                    
                </div>

                {/* Clases */}
                <div className="flex flex-col px-2 my-auto">
                    <Link href='/' className="mr-auto hover:translate-y-cursor cursor-pointer font-[500] pr-3 text-base">Clases</Link>                      
                </div>

                {/* Nuevos Proyectos */}
                <div className="flex px-2 my-auto">
                    <Link href='/' className="mr-auto hover:translate-y-cursor cursor-pointer font-[500] pr-3 text-base">Nuevos Proyectos</Link>                   
                </div>

                {/* Contacto */}
                <div className="flex pr-2 my-auto">
                    <Link href='/' className="mr-auto hover:translate-y-cursor cursor-pointer font-[500] text-base">Contacto</Link>
                </div>
            </div>
            <div className="flex my-auto mr-auto">
                <Link href='/' className="">USARIO</Link>
            </div>
    </nav>
    )
}

export default NavFull