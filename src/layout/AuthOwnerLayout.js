/**
 * The template for Owner dashboard*/
import { useContextProvider } from "@/context/ContextProvider";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { handlePermissionAuth } from "../common";
import { handleSignOut } from "../firebase-func";
import Private from "./Private";
import { useRouter } from "next/router";
export default function AuthOwnerLayout({ children }) {
  const router = useRouter();
  const { accessToken } = useContextProvider();
  useEffect(() => {
    if (accessToken) {
      console.log(accessToken);
      if (!handlePermissionAuth(accessToken, ["owner"])) {
        router.replace("/401");
      }
    }
  }, [accessToken]);

  return (
    <Private>
      <Typography variant="h2">I am a business owner!</Typography>
      {children}
    </Private>
  );
}
