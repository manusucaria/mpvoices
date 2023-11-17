import React from 'react'
import Wrapper from '@/app/components/wrapper/Wrapper'
import { playfair600 } from '@/utils/fonts/fonts'

import './SectionInsta.scss'
import Link from 'next/link'
import Image from 'next/image'

const fetchData = async () => {
  const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,media_type,permalink&access_token=${process.env.INSTAGRAM_KEY}`
  const data = await fetch(url)
  const res = await data.json()
  const images = res.data.filter((item) => item.media_type === 'IMAGE')
  return images.slice(0, 2)
}

async function SectionInsta () {
  const feed = await fetchData()

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
            >
              <Image
                className="Insta-image"
                src={item.media_url}
                loading="lazy"
                alt={item.caption}
                width={1000}
                height={1000}
              />
            </Link>
          ))}
        </div>
      </Wrapper>
    </div>
  )
}
export default SectionInsta
