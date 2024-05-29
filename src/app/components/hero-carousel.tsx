'use client';
import { useKeenSlider } from "keen-slider/react"
import { getImageProps } from 'next/image'

import "keen-slider/keen-slider.min.css"

export default function HeroCarousel() {
  const [ref] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
    },
    // [
    //   (slider) => {
    //     let timeout: ReturnType<typeof setTimeout>
    //     let mouseOver = false
    //     function clearNextTimeout() {
    //       clearTimeout(timeout)
    //     }
    //     function nextTimeout() {
    //       clearTimeout(timeout)
    //       if (mouseOver) return
    //       timeout = setTimeout(() => {
    //         slider.next()
    //       }, 5000)
    //     }
    //     slider.on("created", () => {
    //       slider.container.addEventListener("mouseover", () => {
    //         mouseOver = true
    //         clearNextTimeout()
    //       })
    //       slider.container.addEventListener("mouseout", () => {
    //         mouseOver = false
    //         nextTimeout()
    //       })
    //       nextTimeout()
    //     })
    //     slider.on("dragStarted", clearNextTimeout)
    //     slider.on("animationEnded", nextTimeout)
    //     slider.on("updated", nextTimeout)
    //   },
    // ]
  )

  const common = { alt: 'AEMS Red Dot Sight', sizes: '100vw' }
  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    width: 1440,
    height: 875,
    quality: 80,
    src: '/images/hero-carousel/aems-banner-1920x860.jpg',
  })
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    width: 750,
    height: 1334,
    quality: 70,
    src: '/images/hero-carousel/aems-banner-1080x1350.jpg',
  })

  return (
    <div ref={ref} className="keen-slider">
      <div className="keen-slider__slide number-slide1">
        <picture>
          <source media="(min-width: 1000px)" srcSet={desktop} />
          <source media="(min-width: 500px)" srcSet={mobile} />
          <img {...rest} style={{ width: '100%', height: 'auto' }} />
        </picture>
      </div>
      <div className="keen-slider__slide number-slide2">Mounts</div>
      <div className="keen-slider__slide number-slide3">Red Dot</div>
      <div className="keen-slider__slide number-slide4">Lasers</div>
    </div >
  )
}