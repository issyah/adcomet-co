/**
 * Only allow auth users to enter
 **/
import { useContextProvider } from "../context/ContextProvider";
import { useRouter } from "next/router";
import { useEffect, Fragment, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

export default function Private(props) {
  const { children } = props;
  const { user } = useContextProvider();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
  }, []);
  useEffect(() => {
    if(user === null) {
      router.push('/login')
    };
    setLoading(false);
  }, [user]);
  return (
    <>
      {!user ? (
        <Backdrop open={loading} variant="transparent">
          <CircularProgress color="primary" />
        </Backdrop>
      ) : (
        <Fragment>{children}</Fragment>
      )}
    </>
  );
}
