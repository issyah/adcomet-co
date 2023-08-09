/**
 * Manage the permission on specific pages
 **/

import { useContextProvider } from "@/context/ContextProvider";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { handlePermissionAuth } from "../common";

export default function AuthManager({ roles, children }) {
  const { accessToken } = useContextProvider();
  const router = useRouter();
  useEffect(() => {
    if (accessToken) {
      if (!handlePermissionAuth(accessToken, roles)) {
        router.replace("/401");
      }
    }
  }, [accessToken]);
}
