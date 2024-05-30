import Image from "next/image";

export default function Categories() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
      <div className="flex flex-col items-center w-full">
        <Image src="/images/category/magnifiers-1080x1350.jpg" alt="Manifiers" width={1080} height={1350} className="h-auto max-w-full" />
        <a href="#" className="relative bottom-24 btn bg-white">MAGNIFIERS</a>
      </div>
      <div className="flex flex-col items-center w-full">
        <Image src="/images/category/mounts-1080x1350.jpg" alt="Mounts & Rails" width={1080} height={1350} className="h-auto max-w-full" />
        <a href="#" className="relative bottom-24 btn bg-white">MOUNTS</a>
      </div>
      <div className="flex flex-col items-center w-full">
        <Image src="/images/category/lasers-1080x1350.jpg" alt="Lasers" width={1080} height={1350} className="h-auto max-w-full" />
        <a href="#" className="relative bottom-24 btn bg-white">LASERS</a>
      </div>
      <div className="flex flex-col items-center w-full">
        <Image src="/images/category/red-dot-1080x1350.jpg" alt="Red Dots" width={1080} height={1350} className="h-auto max-w-full" />
        <a href="#" className="relative bottom-24 btn bg-white">RED DOTS</a>
      </div>
    </div>
  )
}