import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useAuthGuard();

  const noNavbarRoutes = ["/login", "/sign-up", "/forgot-password"];
  const loginRoutesMatch = noNavbarRoutes.includes(router.pathname);

  return (
    <>
      {!loginRoutesMatch && <Navbar />}
      <Toaster />
      <Component {...pageProps} />
    </>
  );
}
