/**
 * Owner overview dashboard*/
import AuthOwnerLayout from "@/src/layout/AuthOwnerLayout";
import { Typography } from "@mui/material";

export default function Dashboard({}) {
  return <Typography variant="h3" fontWeight={'bold'}>Welcome</Typography>;
}

Dashboard.getLayout = (page) => <AuthOwnerLayout>{page}</AuthOwnerLayout>;
