import QuadImage from "../public/wpi-full-quad.jpg";
import Image from "next/image";
import Link from "next/link";
export default function Home(){
  return(
    <Link href="/todo">
    <div className="bg-white relative w-full h-screen overflow-hidden">
      <Image src={QuadImage} alt="WPI Quad" className="w-full h-screen z-0"/>
      <div className="absolute flex items-center justify-center inset-0 bg-gradient-to-b from-blue-500 to-blue-900 opacity-40 z-85"/>
    </div>
  <div className="absolute inset-0 flex flex-col justify-center items-center    z-20">
    <h1 className="font-bold text-center text-white font-mono text-6xl ">Organize School, Work, and
      free time -- all in one place </h1>

    <h1 className="font-bold text-black text-center text-white font-mono text-4xl  animate-pulse mb-20">Click Anywhere to Get Started </h1>
  </div>
    </Link>
)
}