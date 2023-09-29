'use client';
import React, { useState, useEffect } from 'react';
import hero from '../assets/hero.jpg';
import hero2 from '../assets/hero2.jpg';
import hero3 from '../assets/hero3.jpg';
import Image from 'next/image';

const Hero = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const images = [hero, hero2, hero3];

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
            }, 3000);
            return () => {
            clearTimeout(timer);
            };
        }, [currentImage, images.length]);

    return (
        <div id="carouselExampleSlidesOnly" className="relative" data-te-carousel-init data-te-ride="carousel">
            <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none ${
                        index === currentImage ? 'block' : 'hidden'
                        }`}
                        data-te-carousel-item={index === currentImage}
                    >
                        <Image height={500} width={500} src={image} className="block w-full" alt={`Foto Hero ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Hero;
