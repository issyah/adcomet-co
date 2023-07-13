/**
 * This is a redirect page for auth actions*/
import { Backdrop, CircularProgress } from "@mui/material"
import { useRouter } from "next/router"
import { useEffect } from "react";
 


export default function AuthActions(props) {
  const router = useRouter(); 
  const {mode, oobCode} = router.query;

  useEffect(() => {
    if(router.isReady) { 
      console.log(mode);
      console.log(oobCode);
    }
  }, [router]);
  return (
    <Backdrop open={true}>
      <CircularProgress />
    </Backdrop>
  )
}