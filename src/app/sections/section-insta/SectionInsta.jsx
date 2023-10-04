import Wrapper from '@/app/components/wrapper/Wrapper'
import { playfair400 } from '@/utils/fonts/fonts'
import Image from 'next/image'
import React from 'react'

import './SectionInsta.scss'
import Link from 'next/link'

function SectionInsta () {
  return (
    <div className="Insta">
      <Wrapper className="flex flex-col items-center justify-center gap-10">
        <p className={`Insta-title ${playfair400.className}`}>
          ¡Voices en movimiento!
        </p>

        <div className="Insta-images">
          <Link
            className="Insta-illustration"
            target="_blank"
            href="https://www.instagram.com/mpvoices/"
          >
            <Image
              className="Insta-image"
              src="/assets/static/mpvso.png"
              loading="lazy"
              alt="maríapeña voices simplemente orquesta"
              width={1000}
              height={1000}
            />
          </Link>
          <Link
            className="Insta-illustration"
            target="_blank"
            href="https://www.instagram.com/p/Cxx19AyOnrT/"
          >
            <Image
              className="Insta-image"
              src="/assets/static/mpvvi.png"
              loading="lazy"
              alt="maríapeña voices video"
              width={1000}
              height={1000}
            />
          </Link>
        </div>
      </Wrapper>
    </div>
  )
}
export default SectionInsta
