import QuadImage from "../public/QuadImage.jpeg";
import wpiWide from "../public/wpi_wide.jpg.jpeg";
import Image from "next/image";
export default function Home(){
  return(
    <div className="bg-white relative w-full h-screen overflow-hidden">
      <Image src={QuadImage} alt="WPI Quad" className="w-full h-screen"/>

      <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-blue-900 opacity-40 z-85"></div>
    </div>
  )
}