import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from 'next/router';
import NavBar from "@/components/NavBar";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const isHero = () => router.pathname === "/";

  return(
    <>
      {!isHero() && <NavBar/>}
      <Component {...pageProps}/>
    </>
  )
}
