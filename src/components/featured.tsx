import Image from "next/image"

export default function Featured({ featuredItems }) {
  return (
    <ul className="grid grid-cols-2 lg:grid-cols-4 gap-2">
      {featuredItems.map((item) => {
        const image = item.Images.Image[0] ? `${item.Images.Image[0].baseImageURL}${item.Images.Image[0].publicID}.webp` : `${item.Images.Image.baseImageURL}${item.Images.Image.publicID}.webp`

        return (
          <li key={item.id}>
            <div className="p-4 h-96 flex flex-col items-center text-center bg-gray-100 shadow-md rounded-none hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <picture className="flex justify-center items-center flex-shrink-0">
                <Image src={image} alt={item.name} width={200} height={200} />
              </picture>
              <div className="p-4 flex flex-col flex-grow justify-between w-full h-full"> {/* Ensure flex-grow and full height */}
                <h3 className="text-sm lg:text-base font-semibold">{item.name}</h3>
                <button className="btn btn-accent text-white self-center mt-auto">Buy Now</button>
              </div>
            </div>
          </li>

        )
      })}
    </ul>
  )
}