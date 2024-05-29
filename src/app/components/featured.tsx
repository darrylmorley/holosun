export default function Featured({ featuredItems }) {
  return (
    <ul className="grid grid-cols-2 grid-rows-2 gap-2 lg:flex lg:justify-around">
      {featuredItems.map((item) => (
        <li key={item.id} className="bg-red-500"><div className="card w-96 h-[480px] bg-base-100 shadow-md rounded-none hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <figure><img src={item.Images.Image.baseImageURL + item.Images.Image.publicID} alt={item.name} width={300} /></figure>
          <div className="card-body">
            <h2 className="card-title font-bold">{item.name}</h2>
            <div className="card-actions justify-start">
              <button className="btn btn-accent text-white">Buy Now</button>
            </div>
          </div>
        </div></li>
      ))}
    </ul>
  )
}