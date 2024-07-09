import Image from "next/image";

export default function Features() {
  return (
    <ul className="w-full grid grid-cols-2 gap-y-12 md:flex md:justify-around uppercase">
      <li className="flex flex-col items-center">
        <Image
          src="/images/features/MultilayerCoatings.webp"
          alt="Multilayer Coatings Badge"
          width={100}
          height={100}
          className="hover:brightness-125 transition duration-200 ease-in-out"
        />
        <h3 className="text-sm text-center mt-4 font-bold">Multilayer Coatings</h3>
      </li>
      <li className="flex flex-col items-center">
        <Image
          src="/images/features/MultiReticleSystem.webp"
          alt="Multi Reticle System Badge"
          width={100}
          height={100}
          className="hover:brightness-125 transition duration-200 ease-in-out"
          sizes="(min-width: 200px) and (max-width: 800px) 100px, (min-width: 800px) 150px"
        />
        <h3 className="text-sm text-center mt-4 font-bold">Multi Reticle System</h3>
      </li>
      <li className="flex flex-col items-center">
        <Image
          src="/images/features/ShakeAwake.webp"
          alt="Shake Awake Badge"
          width={100}
          height={100}
          className="hover:brightness-125 transition duration-200 ease-in-out"
        />
        <h3 className="text-sm text-center mt-4 font-bold">Shake Awake</h3>
      </li>
      <li className="flex flex-col items-center">
        <Image
          src="/images/features/SolarFailsafe.webp"
          alt="Solar Failsafe Badge"
          width={100}
          height={100}
          className="hover:brightness-125 transition duration-200 ease-in-out"
        />
        <h3 className="text-sm text-center mt-4 font-bold">Solar Failsafe</h3>
      </li>
      <li className="flex flex-col items-center">
        <Image
          src="/images/features/SuperLED.webp"
          alt="Super LED Badge"
          width={100}
          height={100}
          className="hover:brightness-125 transition duration-200 ease-in-out"
        />
        <h3 className="text-sm text-center mt-4 font-bold">Super LED</h3>
      </li>
      <li className="flex flex-col items-center">
        <Image
          src="/images/features/Titanium.webp"
          alt="Titanium Badge"
          width={100}
          height={100}
          className="hover:brightness-125 transition duration-200 ease-in-out"
        />
        <h3 className="text-sm text-center mt-4 font-bold">Titanium</h3>
      </li>
    </ul>
  );
}
