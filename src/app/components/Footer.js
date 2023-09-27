'use client';
import Link from "next/link";
import Image from "next/image";

const redes = [
    {
        label: 'Logo de Instagram',
        img: "/instagram.svg",
        route: 'https://www.instagram.com/mpvoices/?hl=es',
    },
    {
        label: 'Logo de Facebook',
        img: "/facebook.svg",
        route: 'https://www.facebook.com/mpvoices.com.ar/',
    }
]
const email = "info@mpvoices.com.ar";
const tel = "5491133825678";
const dir = "Blanco Encalada 2405, Béccar."

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
        });
    };
    return (
        <div className="flex flex-col mt-auto ">
            <Link className="mx-auto my-12" href="/" onClick={scrollToTop} scroll={false}>
                <p className="mx-auto hover:translate-y-cursor transition-all duration-200 ease-in-out">LOGO</p>
            </Link>
            <div className="flex flex-col w-full mx-auto mb-6 border-b pb-4 border-b-[#ffffff]">
                <div className="mb-2 mx-auto flex">
                    <p className="mx-auto font-semibold text-sm">E-Mail:&nbsp;</p>
                    <a className="mx-auto text-sm" href="mailto:info@mpvoices.com.ar" target="_blank">{email}</a>
                </div>
                <div className="mb-2 mx-auto flex">
                    <p className="mx-auto font-semibold text-sm">Teléfono:&nbsp;</p>
                    <a className="mx-auto text-sm" href="https://wa.me/15551234567" target="_blank">{tel}</a>
                </div>
                <div className="mb-2 mx-auto flex">
                    <p className="mx-auto font-semibold text-sm">Dirección:&nbsp;</p>
                    <a className="mx-auto text-sm" href="https://maps.app.goo.gl/ERhpKbwzmMoBBZLy9" target="_blank">{dir}</a>
                </div>
            </div>
            <div className="flex mx-auto mb-2">                      
                {redes.map(({label, route, img}) => (
                    <div key={route}>
                        <Link href={route} target='_blank'>
                            <Image width={500} height={500} className="w-6 h-6 mx-2 hover:translate-y-cursor transition-all duration-150 ease-in-out" src={img} alt={label} />
                        </Link>
                    </div>
                ))}
            </div>
            <div className="flex flex-col lg:hidden">
                <div className="flex mx-auto justify-center">
                    <Image width={50} height={50} className="w-6 h-6 mx-1 my-auto" src="" alt="Copyright"></Image>
                    <p className="mx-1 my-auto text-xs">MP Voices 2022.</p>
                </div>
                <p className="mx-auto text-xs">Todos los derechos reservados.</p>
            </div>
            <div className="hidden lg:flex lg:flex-col">
                <div className="flex mx-auto justify-center">
                    <Image width={50} height={50} className="w-6 h-6 mr-2 my-auto" src="" alt="Copyright"></Image>
                    <p className="m-auto text-xs">MP Voices 2022.&nbsp;</p>
                    <p className="m-auto text-xs">Todos los derechos reservados.</p>
                </div>
            </div>
            <Image onClick={scrollToTop} width={100} height={100} className="w-6 h-6 mx-auto my-6" src="" alt="Scroll to Top"></Image>
        </div>
    )
}