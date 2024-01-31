import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import Wrapper from '@/app/components/wrapper/Wrapper'
import { playfair600 } from '@/utils/fonts/fonts'

import './SectionInsta.scss'
import Link from 'next/link'
import Image from 'next/image'

async function SectionInsta () {
  const feed = [
    {
      id: uuidv4(),
      permalink: 'https://www.instagram.com/mpvoices/',
      caption: '+SHOW +Alumnos @mpvoices',
      media_url: '/assets/static/insta/image1.jpeg'
    },
    {
      id: uuidv4(),
      permalink: 'https://www.instagram.com/mpvoices/',
      caption: 'CANTO y COACHING escénico individual',
      media_url: '/assets/static/insta/image2.jpeg'
    }
  ]

  return (
    <div className="Insta">
      <Wrapper className="flex flex-col items-center justify-center gap-10">
        <h3 className={`Insta-title ${playfair600.className}`}>
          ¡Voices en movimiento!
        </h3>

        <div className="Insta-images">
          {feed.map((item) => (
            <Link
              key={item.id}
              className="Insta-illustration"
              target="_blank"
              href={item.permalink}
              title={item.caption}
            >
              <Image
                className="Insta-image"
                src={item.media_url}
                alt={item.caption}
                width={1000}
                height={1000}
                loading="lazy"
                unoptimized={true}
              />
            </Link>
          ))}
        </div>
      </Wrapper>
    </div>
  )
}
export default SectionInsta
