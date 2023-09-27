'use client';
import { useState } from "react";
import Link from "next/link";


const NavSmall = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
        });
    };

    return (
        <nav className="flex lg:hidden flex-col fixed top-0 left-0 right-0">
            <div className="flex items-center">
                {isNavOpen === false ?
                <div className="flex items-center w-full py-4">
                    <div className="flex flex-col mr-auto pl-6">
                        <div className="space-y-1 cursor-pointer" onClick={() => setIsNavOpen((prev) => !prev)}>
                            <span className="block h-[.1rem] w-3 animate-pulse bg-[#ffffff]"></span>
                            <span className="block h-[.1rem] w-3 animate-pulse bg-[#ffffff]"></span>
                            <span className="block h-[.1rem] w-3 animate-pulse bg-[#ffffff]"></span>
                        </div>
                    </div>
                    <div className="flex ml-auto pr-6">
                        <div className="flex" onClick={() =>  scrollToTop()}>
                            <Link href='/' className="">LOGO</Link>
                        </div>
                    </div>
                </div>
                :
                <div className="flex items-center w-full pl-8 py-4 bg-[#ffffff]">
                    <svg
                        onClick={() => setIsNavOpen((prev) => !prev)}
                        className="h-4 w-4 bg-[#ffffff] mr-auto cursor-pointer animate-pulse"
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
                }
            </div>
            {isNavOpen === true ?
                <div className="flex flex-col justify-between h-auto mb-3 pl-6 animate-display bg-[#ffffff]">
                    
                    {/* Espacio Voices */}
                    <div className="flex w-4/6 my-2 bg-[#ffffff]">
                        <div onClick={() => setIsNavOpen(false)} className="font-botones bg-[#ffffff] text-[#0D0D0D] hover:translate-y-cursor font-bold transition-all duration-150 ease-in-out">
                            <Link href='/' className="bg-[#ffffff] text-[#0D0D0D] mr-auto font-[550] transition-all duration-150 ease-in-out">Espacio voices</Link>
                        </div>
                    </div>

                    {/* Maria Peña */}
                    <div className="flex justify-between items-center bg-[#ffffff]">
                        <div onClick={() => setIsNavOpen(false)} className="mr-2 flex flex-col my-2 w-3/6 bg-[#ffffff]">
                            <Link href='/' className="bg-[#ffffff] text-[#0D0D0D] mr-auto font-[550] transition-all duration-150 ease-in-out">Maria Peña</Link>
                        </div>
                    </div>  

                    {/* Clases */}
                    <div className="flex justify-between items-center bg-[#ffffff]">
                        <div onClick={() => setIsNavOpen(false)} className="mr-2 flex flex-col my-2 w-3/6 bg-[#ffffff]">
                            <Link href='/' className="bg-[#ffffff] text-[#0D0D0D] mr-auto font-[550] transition-all duration-150 ease-in-out">Clases</Link>
                        </div>
                    </div>  

                    {/* Nuevos Proyectos */}
                    <div className="flex justify-between items-center bg-[#ffffff]">
                        <div onClick={() => setIsNavOpen(false)} className="mr-2 flex flex-col my-2 w-3/6 bg-[#ffffff]">
                            <Link href='/' className="bg-[#ffffff] text-[#0D0D0D] mr-auto font-[550] transition-all duration-150 ease-in-out">Nuevos proyectos</Link>
                        </div>
                    </div>  

                    {/* Contacto */}
                    <div className="flex justify-between items-center bg-[#ffffff]">
                        <div onClick={() => setIsNavOpen(false)} className="mr-2 flex flex-col my-2 w-3/6 bg-[#ffffff]">
                            <Link href='/' className="bg-[#ffffff] text-[#0D0D0D] mr-auto font-[550] transition-all duration-150 ease-in-out">Contacto</Link>
                        </div>
                    </div>  

                    {/* Plataforma Alumnos */}
                    <div className="flex justify-between items-center bg-[#ffffff] pb-4">
                        <div onClick={() => setIsNavOpen(false)} className="mr-2 flex flex-col my-2 w-3/6 bg-[#ffffff]">
                            <Link href='/' className="bg-[#ffffff] text-[#0D0D0D] mr-auto font-[550] transition-all duration-150 ease-in-out">Plataforma alumnos</Link>
                        </div>
                    </div>  
                </div>
            : ""}
        </nav>
    )
}

export default NavSmall