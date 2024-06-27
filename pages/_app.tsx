import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from 'next/router';
import NavBar from "@/components/NavBar";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import {Toaster} from "sonner";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isHero = () => router.pathname === "/";
  return(
    <UserProvider>
      <Toaster richColors/>
      {!isHero() && <NavBar/>}
      <Component {...pageProps}/>
    </UserProvider>
  )
}
