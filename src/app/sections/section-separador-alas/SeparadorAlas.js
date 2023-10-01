import React from 'react';
import Image from 'next/image';
import alas from '../../assets/alas.jpg';

const SeparadorAlas = () => {
    return (
        <div>
            <Image width={500} height={500} className="w-full h-full" src={alas} alt='Separador Alas' />      
        </div>
    )
}

export default SeparadorAlas
