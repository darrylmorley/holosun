export default function CategoriesDesktop() {
  return (
    <div className="flex justify-around">
      <div className="flex flex-col items-center w-96">
        <img src="/images/category/magnifiers-1080x1350.jpg" alt="Manifiers" />
        <a href="#" className="relative bottom-24 btn bg-white">MAGNIFIERS</a>
      </div>
      <div className="flex flex-col items-center w-96">
        <img src="/images/category/mounts-1080x1350.jpg" alt="Mounts & Rails" />
        <a href="#" className="relative bottom-24 btn bg-white">MOUNTS</a>
      </div>
      <div className="flex flex-col items-center w-96">
        <img src="/images/category/lasers-1080x1350.jpg" alt="Lasers" />
        <a href="#" className="relative bottom-24 btn bg-white">LASERS</a>
      </div>
      <div className="flex flex-col items-center w-96">
        <img src="/images/category/red-dot-1080x1350.jpg" alt="Red Dots" />
        <a href="#" className="relative bottom-24 btn bg-white">RED DOTS</a>
      </div>
    </div>
  )
}