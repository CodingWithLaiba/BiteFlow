import hero from "../assets/hero.png"

export default function Hero() {
  return (
    <div>
        <img src={hero} alt="heroimg" className=" w-full max-h-150 object-cover" />
    </div>
  )
}
