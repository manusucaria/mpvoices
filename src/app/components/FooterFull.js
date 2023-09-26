import Link from "next/link";
import Image from "next/image";
import fotoPortada from "../assets/img/logo-negro.png";

const links = [
    {
        label: 'Lo que hacemos',
        route: '/actividades#actividades'
    },
    {
        label: 'Nosotros',
        route: '/nosotros#nosotros'
    },
    {
        label: 'Cómo ayudar',
        route: '/ayuda#ayuda'
    },
    {
        label: 'Directorio Ecosostenible',
        route: '/directorio',
    },
]
const redes = [
    {
        label: 'Logo de Facebook',
        img: "/facebook.svg",
        route: 'https://www.facebook.com/ProyectoVerdeo/'
    },
    {
        label: 'Logo de Instagram',
        img: "/instagram.svg",
        route: 'https://www.instagram.com/proyectoverdeo/'
    },
    {
        label: 'Logo de Linktree',
        img: "/linktree.svg",
        route: 'https://linktr.ee/proyectoverdeo'
    }
]
const email = "verdeoinformes@gmail.com";

const FooterFull = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
        });
    };
    return (
        <div className="hidden lg:flex items-end justify-evenly border border-t-neutral-400 mt-10">
            <Link className="my-3 ml-4" onClick={scrollToTop} href="/" scroll={false}>
                <Image width={500} height={500} className="w-auto h-20 hover:translate-y-cursor transition-all duration-200 ease-in-out" src={fotoPortada} alt="Foto de Portada" priority />
            </Link>
            <div className="flex my-auto flex-col ml-4"> 
                <ul className="flex mx-auto">                        
                    {redes.map(({label, route, img}) => (
                        <li key={route}>
                            <Link href={route} target='_blank'>
                                <Image width={500} height={500} className="w-12 h-12 hover:translate-y-cursor transition-all duration-150 ease-in-out" src={img} alt={label} />
                            </Link>
                        </li>
                    ))}
                </ul>
                <a href="mailto:verdeoinformes@gmail.com" className="font-botones text-xs m-auto">{email}</a>
            </div>
            <ul className="flex pt-5 pb-10">
                {links.map(({label, route}) => (
                    <li className="flex mx-8" key={label}>
                        <Link href={route} onClick={route === "/directorio" ? scrollToTop : ""} scroll={false} className="font-botones text-sm font-semibold hover:translate-y-cursor transition-all duration-150 ease-in-out">
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default FooterFull