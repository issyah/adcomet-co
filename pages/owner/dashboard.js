/**
 * Owner overview dashboard*/
import AuthOwnerLayout from "@/src/layout/AuthOwnerLayout";
import { Typography } from "@mui/material";

 


export default function Dashboard({}){
  return (
    <AuthOwnerLayout>
      <Typography variant='h2'>Welcome</Typography>
    </AuthOwnerLayout>
  )
}