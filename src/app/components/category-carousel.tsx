export default function CategoryCarousel() {
  return (
    <div className="carousel carousel-center max-w-md p-1 space-x-4">
      <div id="item1" className="carousel-item w-full">
        <div className="flex flex-col items-center">
          <img src="/images/category/magnifiers-1080x1350.jpg" alt="Manifiers" width={350} />
          <a href="#" className="relative bottom-24 btn bg-white">MAGNIFIERS</a>
        </div>
      </div>
      <div id="item2" className="carousel-item w-full">
        <div className="flex flex-col items-center">
          <img src="/images/category/mounts-1080x1350.jpg" alt="Mounts" width={350} />
          <a href="#" className="relative bottom-24 btn bg-white text-lg">MOUNTS</a>
        </div>
      </div>
      <div id="item3" className="carousel-item w-full">
        <div className="flex flex-col items-center">
          <img src="/images/category/lasers-1080x1350.jpg" alt="Lasers" width={350} />
          <a href="#" className="relative bottom-24 btn bg-white text-lg">LASERS</a>
        </div>
      </div>
      <div id="item4" className="carousel-item w-full">
        <div className="flex flex-col items-center">
          <img src="/images/category/red-dot-1080x1350.jpg" alt="Red Dots" width={350} />
          <a href="#" className="relative bottom-24 btn bg-white text-lg">RED DOTS</a>
        </div>
      </div>
    </div>
  )
}

