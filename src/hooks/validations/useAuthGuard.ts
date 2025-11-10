"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export function useAuthGuard() {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    
    const publicRoutes = ["/", "/login"]; // rotas que não precisam de autenticação
    const token = localStorage.getItem("access_token");
    
    if (publicRoutes.includes(pathname)) {
      setIsAuthChecked(true);
      return;
    }

    if (!token) {
      router.replace("/");
    } else {
      setIsAuthChecked(true);
    }
  }, [pathname, router]);

  return isAuthChecked;
}
