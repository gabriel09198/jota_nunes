"use client";

import { useAuthGuard } from "@/hooks/validations/useAuthGuard";

export default function Admin() {
  const isAuthChecked = useAuthGuard();

  if (!isAuthChecked) {
    return ;
  }

  return (
    <div></div>
  )
}
