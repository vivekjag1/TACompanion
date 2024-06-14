import QuadImage from "../public/wpi-full-quad.jpg";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import lib from "../public/lib.jpg";
import park from "../public/park.jpg"

const Home: NextPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    //the entire hero section should link to the todolist section

//force vercel redeploy
    <>
    <Link href="/todo" className="hidden md:flex">
      <div className="bg-white relative w-full h-screen overflow-hidden">
        <div className = "grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-screen">
            <Image src={lib} alt={"library"}/>
          </div>
          <div className = "relative h-screen">
            <Image src={park} alt = "park"/>
          </div>
        </div>
        <Image src={QuadImage} alt="WPI Quad" className="w-full h-screen z-0" />
        <div className="absolute flex items-center justify-center inset-0 bg-gradient-to-b from-blue-500 to-blue-900 opacity-40 z-10" />
      </div>
      <div className="absolute inset-0 flex flex-col justify-center items-center z-20">
        <h1 className="font-bold text-center text-white font-mono text-6xl">
          Organize School, Work, and free time in one place
        </h1>
        <h1 className="font-bold text-center text-white font-mono text-4xl animate-pulse mb-20">
          Click Anywhere to Get Started
        </h1>
      </div>
    </Link>
    <Link href="/todo" className = "md:hidden">
      <div className="flex flex-col h-screen w-screen">
        <div className="relative flex-1">
          <Image src={lib} alt="library" layout="fill" objectFit="cover"/>
        </div>
        <div className="relative flex-1">
          <Image src={park} alt="park" layout="fill" objectFit="cover"/>
        </div>
        <div
          className="absolute flex items-center justify-center inset-0 bg-gradient-to-b from-blue-500 to-blue-900 opacity-40 z-10"/>
        <div className="absolute inset-0 flex flex-col justify-center items-center z-20">
          <h1 className="font-bold text-center text-white font-mono text-5xl">
            Organize School, Work, and free time in one place
          </h1>
          <h1 className="font-bold text-center text-white font-mono text-2xl animate-pulse mb-20">
            Click Anywhere to Get Started
          </h1>
        </div>

      </div>


    </Link>

    </>


  );
};

// This page should be rendered statically, but there are no props so just return nothing in place of the props.
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default Home;
