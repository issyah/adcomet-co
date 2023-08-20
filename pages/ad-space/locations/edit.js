/**
 * Edit the adspace location 
**/

import { useContextProvider } from "@/context/ContextProvider";
import AuthOwnerLayout from "@/src/layout/AuthOwnerLayout";
import { Box } from "@mui/material"
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from 'react-hook-form';
const Edit = ({ }) => {
  const router = useRouter();
  const { setLoading, setAlert } = useContextProvider();
  const { id } = router.query;
  const fetchData = async () => {
    setLoading(true);
    const { error, result } = await getData('locations', id);
    if (error) {
      setLoading(false);
      setAlert({
        open: true,
        message: error.message,
        status: 'error'
      });
      return;
    }
    // success 


  }
  useEffect(() => {
    if (router.isReady) {
      fetchData();
    }
  }, [router.isReady])


  return (
    <Box>
      <Typography variant='h3' fontWeight='bold'></Typography>
    </Box>
  )
}

export default Edit;
Edit.getLayout = (page) => <AuthOwnerLayout>{page}</AuthOwnerLayout>