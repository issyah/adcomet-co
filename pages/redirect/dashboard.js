
import { useContextProvider } from "@/context/ContextProvider"
import { Backdrop, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { handleRedirectAuth } from "@/src/common";
const Dashboard = () => {
  const { accessToken, user } = useContextProvider();
  const router = useRouter();
  useEffect(() => {
    if (user === null) {
      router.push('/login');
    }
    if (accessToken) {
      router.push(handleRedirectAuth(accessToken));
    }

  }, [accessToken, user]);
  return (
    <Backdrop open={true}>
      <CircularProgress color='primary' />
    </Backdrop>
  )
}


export default Dashboard;