import { useEffect, useState } from "react";
import { ApiRoutes } from "@/enum/apiRoutes";

export const useServerPing = () => {
  const [isServerReady, setIsServerReady] = useState(false);

  useEffect(() => {
    fetch(ApiRoutes.HEALTH)
      .then((res) => res.json())
      .then((data) => {
        if (data?.payload?.status === "ok") setIsServerReady(true);
      })
      .catch(() => setIsServerReady(false));
  }, []);

  return { isServerReady };
};
