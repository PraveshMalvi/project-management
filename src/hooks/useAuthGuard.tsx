import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

const publicRoutes = ["/login", "/sign-up", "/forgot-password"];

export const useAuthGuard = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const isPublicRoute = publicRoutes.includes(pathname);

      if (!user && !isPublicRoute) {
        router.replace("/login");
      } else if (user && isPublicRoute) {
        router.replace("/projects");
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);
};
