import Wrapper from '@/app/components/wrapper/Wrapper'
import { playfair600 } from '@/utils/fonts/fonts'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

import './SectionInsta.scss'

function SectionInsta () {
  return (
    <div className="Insta">
      <Wrapper className="flex flex-col items-center justify-center gap-10">
        <h3 className={`Insta-title ${playfair600.className}`}>
          ¡Voices en movimiento!
        </h3>

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
