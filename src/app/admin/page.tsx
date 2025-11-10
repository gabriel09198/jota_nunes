"use client";

import { useState } from "react";
import { Combobox } from "@headlessui/react";
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
