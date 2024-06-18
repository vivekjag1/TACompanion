import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from 'next/router';
import NavBar from "@/components/NavBar";

import { registerLicense } from '@syncfusion/ej2-base';
registerLicense('Ngo9BigBOggjHTQxAR8/V1NCaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXlfd3VSRmZdUkV/XEo=');

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
