export default function Features() {
  return (
    <ul className="md:flex md:justify-around">
      <li className="flex flex-col items-center">
        <img src="/images/features/MultilayerCoatings.png" alt="Multilayer Coatings Badge" width={100} className="hover:brightness-125 transition duration-200 ease-in-out" />
        <h3 className="text-lg text-center mt-4 font-semibold">Multilayer Coatings</h3>
      </li>
      <li className="flex flex-col items-center">
        <img src="/images/features/MultiReticleSystem.png" alt="Multi Reticle System Badge" width={100} className="hover:brightness-125 transition duration-200 ease-in-out" />
        <h3 className="text-lg text-center mt-4 font-semibold">Multi Reticle System</h3>
      </li>
      <li className="flex flex-col items-center">
        <img src="/images/features/ShakeAwake.png" alt="Shake Awake Badge" width={100} className="hover:brightness-125 transition duration-200 ease-in-out" />
        <h3 className="text-lg text-center mt-4 font-semibold">Shake Awake</h3>
      </li>
      <li className="flex flex-col items-center">
        <img src="/images/features/SolarFailsafe.png" alt="Solar Failsafe Badge" width={100} className="hover:brightness-125 transition duration-200 ease-in-out" />
        <h3 className="text-lg text-center mt-4 font-semibold">Solar Failsafe</h3>
      </li>
      <li className="flex flex-col items-center">
        <img src="/images/features/SuperLED.png" alt="Super LED Badge" width={100} className="hover:brightness-125 transition duration-200 ease-in-out" />
        <h3 className="text-lg text-center mt-4 font-semibold">Super LED</h3>
      </li>
      <li className="flex flex-col items-center">
        <img src="/images/features/Titanium.png" alt="Titanium Badge" width={100} className="hover:brightness-125 transition duration-200 ease-in-out" />
        <h3 className="text-lg text-center mt-4 font-semibold">Titanium</h3>
      </li>
    </ul>
  )
}