"use client";

import { useServerPing } from "@/hooks/useServerPing";
import { useEffect, useRef } from "react";

export const ServerPingClientWrapper = () => {
  const { isServerReady } = useServerPing();
  const hasPinged = useRef(false);

  useEffect(() => {
    if (!hasPinged.current && !sessionStorage.getItem("serverPinged")) {
      hasPinged.current = true;
      sessionStorage.setItem("serverPinged", "true");
    }
  }, [isServerReady]);

  return null;
};
