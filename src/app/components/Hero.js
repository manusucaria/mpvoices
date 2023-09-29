import React from 'react';
import img from '../assets/hero.jpg';
import Image from 'next/image';

const Hero = () => {
    return (
        <div className='flex w-[100%] h-auto'>
            <Image width={500} height={500} className="w-full h-full" src={img} alt='Imagen Hero' priority />
        </div>
    )
}

export default Hero
