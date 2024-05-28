'use client';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

export default function HeroCarousel() {
  const [ref] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>
        let mouseOver = false
        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 5000)
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on("dragStarted", clearNextTimeout)
        slider.on("animationEnded", nextTimeout)
        slider.on("updated", nextTimeout)
      },
    ]
  )

  return (
    <div ref={ref} className="keen-slider">
      <div className="keen-slider__slide number-slide1">Magnifiers</div>
      <div className="keen-slider__slide number-slide2">Mounts</div>
      <div className="keen-slider__slide number-slide3">Red Dot</div>
      <div className="keen-slider__slide number-slide4">Lasers</div>
    </div>
  )
}